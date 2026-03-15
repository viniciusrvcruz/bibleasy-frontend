<script setup lang="ts">

const props = defineProps<{
  referenceLabel: string
  copyFn: () => Promise<boolean>
}>()

const emit = defineEmits<{
  clear: []
}>()

const isCopying = ref(false)
const copySuccess = ref(false)

const handleCopy = async () => {
  isCopying.value = true
  copySuccess.value = false

  const success = await props.copyFn()

  isCopying.value = false
  copySuccess.value = success

  if (success) {
    setTimeout(() => { copySuccess.value = false }, 2000)
  }
}

const MARKER_COLORS = [
  '#AFFF90',
  '#FFFF00',
  '#7AC8FF',
  '#FFC37A',
  '#B4A6FF',
  '#FF9F9F',
  '#BBDFFF',
  '#FF7AE2',
  '#8A38F5',
]
</script>

<template>
  <div
    class="flex flex-col bg-base-100 border-t-2 border-base-300 lg:border-t-0 lg:border-s-2 lg:w-4/12 shrink-0 overflow-hidden fixed bottom-0 left-0 right-0 z-10 max-h-[50dvh] lg:sticky lg:top-header lg:bottom-auto lg:h-screen-header lg:max-h-none"
  >
    <div class="flex flex-col h-full overflow-y-auto p-4 lg:p-5">
      <!-- Header -->
      <div class="flex justify-between items-center mb-2">
        <span class="font-bold text-xl text-base-content flex-1 me-2 min-w-0 wrap-break-word">
          {{ referenceLabel }}
        </span>
        <button
          type="button"
          class="btn btn-circle btn-xl"
          aria-label="Fechar seleção"
          @click="emit('clear')"
        >
          <Icon icon="close" :size="20" />
        </button>
      </div>

      <!-- Marking (visual only) -->
      <div class="mb-4">
        <h3 class="text-sm font-semibold text-base-content/70 mb-2">
          Marcação
        </h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="color in MARKER_COLORS"
            :key="color"
            type="button"
            class="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:border-2 hover:border-base-content/30"
            :style="{ backgroundColor: color }"
            :aria-label="`Marcação ${color}`"
          />
        </div>
      </div>

      <!-- Copy button -->
      <div class="mb-5">
        <button
          type="button"
          class="btn btn-outline btn-sm gap-2"
          :class="{ 'btn-success': copySuccess }"
          :disabled="isCopying"
          @click="handleCopy"
        >
          <Icon icon="copy" :size="18" />
          {{ isCopying ? 'Copiando...' : copySuccess ? 'Copiado' : 'Copiar' }}
        </button>
      </div>

      <!-- Clear selection -->
      <button
        type="button"
        class="btn btn-outline w-full gap-1 max-lg:hidden"
        @click="emit('clear')"
      >
        <Icon icon="broom" :size="18" />
        Limpar seleção
      </button>
    </div>
  </div>
</template>
