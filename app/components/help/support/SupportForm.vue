<script setup lang="ts">
import { useSupportService, type SupportCreatePayload } from '~/composables/services/useSupportService'

const emit = defineEmits<{
  success: []
}>()

const error = defineModel<string>('error', { default: '' })

const typeOptions = [
  { value: 'bug', label: 'Bug / Erro', icon: 'bug', description: 'Algo não está funcionando como esperado' },
  { value: 'feature', label: 'Sugestão', icon: 'lightbulb', description: 'Ideia de melhoria ou novo recurso' },
  { value: 'question', label: 'Dúvida', icon: 'circle_question', description: 'Preciso de ajuda com algo' },
  { value: 'other', label: 'Outro', icon: 'message_circle', description: 'Feedback geral ou outro assunto' },
] as const

const form = reactive<SupportCreatePayload>({
  type: '',
  description: '',
  email: '',
  files: [],
})

const loading = ref(false)

const MAX_FILE_SIZE = 20 * 1024 * 1024
const MAX_FILES = 5
const MAX_DESCRIPTION = 5000

/** Tipos MIME iguais ao `File::types(...)` da API (Laravel). */
const API_FILE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/heic',
  'image/heif',
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.oasis.opendocument.text',
  'text/csv',
] as const

const ALLOWED_FILE_MIME_TYPES = new Set<string>(API_FILE_MIME_TYPES)

const fileInputAccept = API_FILE_MIME_TYPES.join(',')

const isAllowedAttachmentType = (file: File) => {
  const mime = file.type.trim().toLowerCase()

  if (!mime) return true

  return ALLOWED_FILE_MIME_TYPES.has(mime)
}

const fileInputRef = useTemplateRef('fileInputRef')
const formRef = useTemplateRef('formRef')

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files) return

  const newFiles = Array.from(input.files)

  for (const file of newFiles) {
    if (!isAllowedAttachmentType(file)) {
      error.value = `O arquivo "${file.name}" não é um tipo permitido (imagens, vídeo ou documentos PDF, Office, texto ou CSV).`
      input.value = ''
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      error.value = `O arquivo "${file.name}" excede o limite de 20MB.`
      input.value = ''
      return
    }
  }

  if (form.files.length + newFiles.length > MAX_FILES) {
    error.value = `Você pode anexar no máximo ${MAX_FILES} arquivos.`
    input.value = ''
    return
  }

  error.value = ''
  form.files.push(...newFiles)
  input.value = ''
}

const removeFile = (index: number) => {
  form.files.splice(index, 1)
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const isPreviewableMedia = (file: File) => {
  const type = file.type.toLowerCase()

  return type.startsWith('image/') || type.startsWith('video/')
}

const supportService = useSupportService()

const reset = () => {
  form.type = ''
  form.description = ''
  form.email = ''
  form.files = []
  error.value = ''
  formRef.value?.reset()
}

const requestSubmit = () => {
  formRef.value?.requestSubmit()
}

const submit = async () => {
  if (loading.value) return

  loading.value = true
  error.value = ''

  await supportService.create(form)
    .then(() => {
      error.value = ''
      emit('success')
    })
    .catch(() => {
      error.value = 'Ocorreu um erro ao enviar. Tente novamente mais tarde.'
    })
    .finally(() => loading.value = false)
}

defineExpose({ reset, requestSubmit, loading })
</script>

<template>
  <form ref="formRef" class="space-y-5" @submit.prevent="submit">
    <!-- Type selector -->
    <fieldset>
      <legend class="text-sm font-semibold mb-2">Tipo de solicitação <span class="text-error">*</span></legend>
      <div class="grid grid-cols-2 gap-2">
        <label
          v-for="opt in typeOptions"
          :key="opt.value"
          class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors"
          :class="form.type === opt.value
            ? 'border-primary bg-primary/5'
            : 'border-base-300 hover:bg-base-200'"
        >
          <input
            v-model="form.type"
            type="radio"
            name="support-type"
            :value="opt.value"
            class="radio radio-primary radio-sm user-invalid:validator"
            required
            title="Selecione um tipo de solicitação"
          />
          <div class="min-w-0">
            <div class="font-medium text-sm flex items-center gap-1.5">
              <Icon :icon="opt.icon" :size="16" />
              {{ opt.label }}
            </div>
            <div class="text-xs text-base-content/60 leading-tight mt-0.5">{{ opt.description }}</div>
          </div>
        </label>
      </div>
      <p class="validator-hint hidden mt-2 text-xs">Selecione um tipo de solicitação</p>
    </fieldset>

    <!-- Description -->
    <fieldset>
      <div class="flex items-baseline justify-between gap-2 mb-2">
        <label for="support-description" class="text-sm font-semibold">
          Descrição <span class="text-error">*</span>
        </label>
        <span class="text-xs text-base-content/50 shrink-0 tabular-nums">
          {{ form.description.length }} / {{ MAX_DESCRIPTION }}
        </span>
      </div>
      <textarea
        id="support-description"
        v-model="form.description"
        :maxlength="MAX_DESCRIPTION"
        required
        rows="5"
        class="textarea textarea-bordered user-invalid:validator w-full text-sm leading-relaxed"
        placeholder="Descreva o que aconteceu, o que você esperava, ou sua sugestão..."
      />
      <p class="hidden validator-hint">A descrição é obrigatória</p>
    </fieldset>

    <!-- Files -->
    <div>
      <label class="text-sm font-semibold mb-2 block">
        Anexos <span class="text-base-content/50 font-normal">(opcional, Até 5 arquivos, com limite de 20 MB cada)</span>
      </label>

      <div
        v-if="form.files.length > 0"
        class="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-3"
      >
        <template v-for="(file, index) in form.files" :key="`${file.name}-${file.size}-${file.lastModified}-${index}`">
          <HelpSupportAttachmentPreview
            v-if="isPreviewableMedia(file)"
            :file="file"
            @remove="removeFile(index)"
          />
          <div
            v-else
            class="col-span-2 lg:col-span-3 flex items-center gap-3 p-2 px-3 rounded-lg bg-base-200 text-sm"
          >
            <Icon icon="attachment" :size="16" class="text-base-content/60 shrink-0" />
            <span class="flex-1 truncate">{{ file.name }}</span>
            <span class="text-xs text-base-content/50 shrink-0">{{ formatFileSize(file.size) }}</span>
            <button
              type="button"
              class="btn btn-ghost btn-xs btn-circle"
              aria-label="Remover arquivo"
              @click="removeFile(index)"
            >
              <Icon icon="close" :size="14" />
            </button>
          </div>
        </template>
      </div>

      <button
        v-if="form.files.length < MAX_FILES"
        type="button"
        class="btn btn-outline btn-sm gap-2"
        @click="fileInputRef?.click()"
      >
        <Icon icon="attachment" :size="16" />
        Adicionar arquivo
      </button>
      <input
        ref="fileInputRef"
        type="file"
        multiple
        class="hidden"
        :accept="fileInputAccept"
        @change="handleFileSelect"
      />
    </div>

    <!-- Email -->
    <fieldset>
      <label for="support-email" class="text-sm font-semibold mb-2 block">
        Email <span class="text-base-content/50 font-normal">(opcional)</span>
      </label>
      <input
        id="support-email"
        v-model="form.email"
        type="email"
        class="input input-bordered user-invalid:validator w-full text-sm"
        placeholder="seu@email.com"
        title="Digite um email válido"
      />
      <p class="hidden validator-hint">Digite um email válido</p>
      <p class="text-xs text-base-content/50 mt-1">
        Caso queira receber um retorno sobre sua solicitação.
      </p>
    </fieldset>

    <!-- Tips -->
    <div class="p-3 rounded-lg bg-base-200/60 border border-base-300/50 text-xs text-base-content/70 space-y-1.5">
      <p class="font-semibold text-base-content/80 flex items-center gap-1.5">
        <Icon icon="lightbulb" :size="14" />
        Dicas para acelerar o atendimento
      </p>
      <ul class="list-disc list-inside space-y-0.5 ps-1">
        <li>Se for bug, explique o caminho que você fez antes do erro aparecer.</li>
        <li>Se for sugestão, diga o problema atual e como a mudança melhoraria o uso.</li>
        <li>Prints ajudam bastante quando o problema é visual.</li>
      </ul>
    </div>
  </form>
</template>
