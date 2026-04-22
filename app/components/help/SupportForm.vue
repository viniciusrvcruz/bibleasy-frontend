<script setup lang="ts">
const emit = defineEmits<{
  success: []
}>()

const typeOptions = [
  { value: 'bug', label: 'Bug / Erro', icon: 'bug', description: 'Algo não está funcionando como esperado' },
  { value: 'feature', label: 'Sugestão', icon: 'lightbulb', description: 'Ideia de melhoria ou novo recurso' },
  { value: 'question', label: 'Dúvida', icon: 'circle_question', description: 'Preciso de ajuda com algo' },
  { value: 'other', label: 'Outro', icon: 'message_circle', description: 'Feedback geral ou outro assunto' },
] as const

const type = ref<string>('')
const description = ref('')
const email = ref('')
const files = ref<File[]>([])
const loading = ref(false)
const errorMessage = ref('')

const MAX_FILE_SIZE = 20 * 1024 * 1024
const MAX_FILES = 5
const MAX_DESCRIPTION = 5000

const fileInputRef = useTemplateRef<HTMLInputElement>('fileInputRef')

const canSubmit = computed(() => type.value && description.value.trim().length > 0)

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files) return

  const newFiles = Array.from(input.files)

  for (const file of newFiles) {
    if (file.size > MAX_FILE_SIZE) {
      errorMessage.value = `O arquivo "${file.name}" excede o limite de 20MB.`
      input.value = ''
      return
    }
  }

  if (files.value.length + newFiles.length > MAX_FILES) {
    errorMessage.value = `Você pode anexar no máximo ${MAX_FILES} arquivos.`
    input.value = ''
    return
  }

  errorMessage.value = ''
  files.value.push(...newFiles)
  input.value = ''
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const reset = () => {
  type.value = ''
  description.value = ''
  email.value = ''
  files.value = []
  errorMessage.value = ''
}

const submit = async () => {
  if (!canSubmit.value || loading.value) return

  loading.value = true
  errorMessage.value = ''

  try {
    const api = useNuxtApp().$api as typeof $fetch

    const formData = new FormData()
    formData.append('type', type.value)
    formData.append('description', description.value.trim())

    if (email.value.trim()) {
      formData.append('email', email.value.trim())
    }

    for (const file of files.value) {
      formData.append('files', file)
    }

    await api('support', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': undefined as any,
      },
    })

    emit('success')
  } catch {
    errorMessage.value = 'Ocorreu um erro ao enviar. Tente novamente.'
  } finally {
    loading.value = false
  }
}

defineExpose({ reset, canSubmit, loading, submit })
</script>

<template>
  <form class="space-y-5" @submit.prevent="submit">
    <!-- Type selector -->
    <fieldset>
      <legend class="text-sm font-semibold mb-2">Tipo de solicitação <span class="text-error">*</span></legend>
      <div class="grid grid-cols-2 gap-2">
        <label
          v-for="opt in typeOptions"
          :key="opt.value"
          class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors"
          :class="type === opt.value
            ? 'border-primary bg-primary/5'
            : 'border-base-300 hover:bg-base-200'"
        >
          <input
            v-model="type"
            type="radio"
            name="support-type"
            :value="opt.value"
            class="radio radio-primary radio-sm"
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
    </fieldset>

    <!-- Description -->
    <div>
      <label for="support-description" class="text-sm font-semibold mb-2 block">
        Descrição <span class="text-error">*</span>
      </label>
      <textarea
        id="support-description"
        v-model="description"
        :maxlength="MAX_DESCRIPTION"
        rows="5"
        class="textarea textarea-bordered w-full text-sm leading-relaxed"
        placeholder="Descreva o que aconteceu, o que você esperava, ou sua sugestão..."
      />
      <div class="text-xs text-base-content/50 text-right mt-1">
        {{ description.length }} / {{ MAX_DESCRIPTION }}
      </div>
    </div>

    <!-- Files -->
    <div>
      <label class="text-sm font-semibold mb-2 block">
        Anexos <span class="text-base-content/50 font-normal">(opcional, Até 5 arquivos, com limite de 20 MB cada)</span>
      </label>

      <div v-if="files.length > 0" class="space-y-2 mb-3">
        <div
          v-for="(file, i) in files"
          :key="i"
          class="flex items-center gap-3 p-2 px-3 rounded-lg bg-base-200 text-sm"
        >
          <Icon icon="attachment" :size="16" class="text-base-content/60 shrink-0" />
          <span class="flex-1 truncate">{{ file.name }}</span>
          <span class="text-xs text-base-content/50 shrink-0">{{ formatFileSize(file.size) }}</span>
          <button
            type="button"
            class="btn btn-ghost btn-xs btn-circle"
            aria-label="Remover arquivo"
            @click="removeFile(i)"
          >
            <Icon icon="close" :size="14" />
          </button>
        </div>
      </div>

      <button
        v-if="files.length < MAX_FILES"
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
        @change="handleFileSelect"
      />
    </div>

    <!-- Email -->
    <div>
      <label for="support-email" class="text-sm font-semibold mb-2 block">
        Email <span class="text-base-content/50 font-normal">(opcional)</span>
      </label>
      <input
        id="support-email"
        v-model="email"
        type="email"
        class="input input-bordered w-full text-sm"
        placeholder="seu@email.com"
      />
      <p class="text-xs text-base-content/50 mt-1">
        Caso queira receber um retorno sobre sua solicitação.
      </p>
    </div>

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

    <!-- Error -->
    <div v-if="errorMessage" class="text-sm text-error flex items-center gap-2">
      <Icon icon="info" :size="16" />
      {{ errorMessage }}
    </div>
  </form>
</template>
