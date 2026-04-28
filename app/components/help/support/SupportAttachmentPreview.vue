<script setup lang="ts">
const props = defineProps<{
  file: File
}>()

const emit = defineEmits<{
  remove: []
}>()

const dialogRef = useTemplateRef('dialogRef')
const modalVideoRef = useTemplateRef('modalVideoRef')
const objectUrl = shallowRef<string | null>(null)

const isImage = computed(() => props.file.type.startsWith('image/'))
const isVideo = computed(() => props.file.type.startsWith('video/'))
const isPreviewableMedia = computed(() => isImage.value || isVideo.value)

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

  if (isVideo.value) {
    nextTick(() => {
      // play() here is triggered from a user gesture (click),
      // so browsers should allow it even with audio.
      modalVideoRef.value?.play().catch(() => {})
    })
  }
}

const stopModalVideo = () => {
  const videoElement = modalVideoRef.value
  if (!videoElement) return

  videoElement.pause()
  videoElement.currentTime = 0
}

const closeLightbox = () => {
  stopModalVideo()
  dialogRef.value?.close()
}

const openAttachment = () => {
  if (!objectUrl.value) return

  if (isPreviewableMedia.value) return openLightbox()

  window.open(objectUrl.value, '_blank', 'noopener,noreferrer')
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const previewTitleId = useId()
</script>

<template>
  <div
    class="flex items-center gap-3 p-2 px-3 rounded-lg bg-base-200 border border-base-300/70 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-base-100"
    role="button"
    tabindex="0"
    :aria-label="`Abrir ${file.name}`"
    @click="openAttachment"
    @keydown.enter.prevent="openAttachment"
    @keydown.space.prevent="openAttachment"
  >
    <div class="shrink-0 w-14 h-14 rounded-md overflow-hidden bg-base-100/70 border border-base-300/70 flex items-center justify-center">
      <img
        v-if="isImage && objectUrl"
        :src="objectUrl"
        :alt="file.name"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <video
        v-else-if="isVideo && objectUrl"
        :src="objectUrl"
        muted
        playsinline
        preload="metadata"
        class="w-full h-full object-cover"
      />
      <Icon v-else icon="attachment" :size="18" class="text-base-content/60" />
    </div>

    <div class="min-w-0 flex-1">
      <p class="text-sm font-medium truncate" :title="file.name">
        {{ file.name }}
      </p>
      <p class="text-xs text-base-content/60 mt-0.5">
        {{ formatFileSize(file.size) }}
        <span v-if="file.type" class="mx-1 text-base-content/40">•</span>
        <span v-if="file.type">{{ file.type }}</span>
      </p>
    </div>

    <div class="shrink-0 flex items-center gap-1.5">
      <button
        type="button"
        class="btn btn-ghost btn-xs btn-circle"
        aria-label="Remover arquivo"
        @click.stop="emit('remove')"
      >
        <Icon icon="close" :size="14" />
      </button>
    </div>
  </div>

  <Teleport to="body">
    <dialog
      v-if="isPreviewableMedia && objectUrl"
      ref="dialogRef"
      class="modal z-70"
      :aria-labelledby="previewTitleId"
      @close="stopModalVideo"
      @cancel="stopModalVideo"
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
            ref="modalVideoRef"
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
