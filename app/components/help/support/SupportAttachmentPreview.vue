<script setup lang="ts">
const props = defineProps<{
  file: File
}>()

const emit = defineEmits<{
  remove: []
}>()

const dialogRef = useTemplateRef('dialogRef')
const objectUrl = shallowRef<string | null>(null)

const isImage = computed(() => props.file.type.startsWith('image/'))
const isVideo = computed(() => props.file.type.startsWith('video/'))

watch(() => props.file, (file) => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value)
    objectUrl.value = null
  }

  objectUrl.value = URL.createObjectURL(file)
}, { immediate: true })

onBeforeUnmount(() => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value)
  }
})

const openLightbox = () => {
  dialogRef.value?.showModal()
}

const closeLightbox = () => {
  dialogRef.value?.close()
}

const previewTitleId = useId()
</script>

<template>
  <div class="relative rounded-lg overflow-hidden border border-base-300 bg-base-200 aspect-square shadow-sm">
    <button
      type="button"
      class="absolute inset-0 z-1 flex items-center justify-center cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-base-100"
      :aria-label="`Ver ${file.name} em tamanho maior`"
      @click="openLightbox"
    >
      <img
        v-if="isImage && objectUrl"
        :src="objectUrl"
        :alt="file.name"
        class="w-full h-full object-cover pointer-events-none"
        loading="lazy"
      />
      <video
        v-else-if="isVideo && objectUrl"
        :src="objectUrl"
        muted
        playsinline
        preload="metadata"
        class="w-full h-full object-cover pointer-events-none"
      />
      <span v-else class="text-xs text-base-content/60 px-2 text-center">
        Preview indisponível
      </span>
    </button>

    <button
      type="button"
      class="btn btn-circle btn-xs btn-ghost bg-base-100/90 hover:bg-base-100 absolute top-1.5 right-1.5 z-2 shadow-sm"
      aria-label="Remover arquivo"
      @click.stop="emit('remove')"
    >
      <Icon icon="close" :size="14" />
    </button>

    <div
      class="pointer-events-none absolute bottom-0 left-0 right-0 z-1 px-2 py-1.5 bg-linear-to-t from-black/70 to-transparent"
    >
      <p class="text-[11px] text-white/95 truncate leading-tight" :title="file.name">
        {{ file.name }}
      </p>
    </div>
  </div>

  <Teleport to="body">
    <dialog
      ref="dialogRef"
      class="modal z-70"
      :aria-labelledby="previewTitleId"
    >
      <div class="modal-box max-w-5xl max-h-[90vh] p-4 flex flex-col gap-3 bg-base-100">
        <div class="flex items-start justify-between gap-3 shrink-0">
          <p
            :id="previewTitleId"
            class="text-sm font-medium truncate min-w-0 flex-1"
            :title="file.name"
          >
            {{ file.name }}
          </p>
          <button
            type="button"
            class="btn btn-sm btn-circle btn-ghost shrink-0"
            aria-label="Fechar visualização"
            @click="closeLightbox"
          >
            <Icon icon="close" :size="20" />
          </button>
        </div>
        <div class="min-h-0 flex-1 flex items-center justify-center overflow-auto rounded-lg bg-base-200/80">
          <img
            v-if="isImage && objectUrl"
            :src="objectUrl"
            :alt="file.name"
            class="max-h-[min(78vh,720px)] w-auto max-w-full object-contain mx-auto"
          />
          <video
            v-else-if="isVideo && objectUrl"
            :src="objectUrl"
            controls
            playsinline
            class="max-h-[min(78vh,720px)] w-full max-w-full mx-auto"
          />
        </div>
      </div>
      <form method="dialog" class="modal-backdrop bg-black/70">
        <button aria-label="Fechar">
          Fechar
        </button>
      </form>
    </dialog>
  </Teleport>
</template>
