<script setup lang="ts">

const props = defineProps<{
  referenceLabel: string
  copyFn: () => Promise<boolean>
}>()

const emit = defineEmits<{
  clear: []
}>()

const copySuccess = ref(false)

const handleCopy = async () => {
  copySuccess.value = false

  const success = await props.copyFn()

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
    class="selected-verses-panel flex flex-col overflow-y-auto overflow-x-hidden bg-base-100 border-t-2 border-base-300 shrink-0 fixed bottom-0 left-0 right-0 z-10 max-h-[50dvh] lg:border-t-0 lg:border-s-2 lg:w-4/12 lg:sticky lg:top-header lg:bottom-auto lg:h-screen-header lg:max-h-none p-4 lg:p-5"
  >
    <!-- Header -->
    <div class="stagger-item stagger-1 flex justify-between items-center mb-2">
      <span class="font-bold text-xl text-base-content flex-1 me-2 min-w-0 wrap-break-word">
        {{ referenceLabel }}
      </span>
      <button
        type="button"
        class="btn btn-circle btn-xl transition-transform duration-200 hover:scale-110 active:scale-95"
        aria-label="Fechar seleção"
        @click="emit('clear')"
      >
        <Icon icon="close" :size="20" />
      </button>
    </div>

    <!-- Marking (visual only) -->
    <div class="stagger-item stagger-2 mb-4">
      <h3 class="text-sm font-semibold text-base-content/70 mb-2">
        Marcação
      </h3>
      <div class="flex gap-2 overflow-x-auto overflow-y-hidden py-1 -mx-1 lg:flex-wrap lg:overflow-visible">
        <button
          v-for="color in MARKER_COLORS"
          :key="color"
          type="button"
          class="w-10 h-10 shrink-0 rounded-full flex items-center justify-center cursor-pointer hover:border-2 hover:border-base-content/30 transition-transform duration-150 hover:scale-110 active:scale-95"
          :style="{ backgroundColor: color }"
          :aria-label="`Marcação ${color}`"
        />
      </div>
    </div>

    <!-- Copy button -->
    <div class="stagger-item stagger-3 mb-5">
      <button
        type="button"
        class="btn btn-outline btn-sm gap-2 transition-all duration-200"
        :class="{ 'btn-success': copySuccess }"
        @click="handleCopy"
      >
        <Icon icon="copy" :size="18" />
        {{ copySuccess ? 'Copiado' : 'Copiar' }}
      </button>
    </div>

    <!-- Clear selection -->
    <button
      type="button"
      class="stagger-item stagger-4 btn btn-outline w-full gap-1 max-lg:hidden transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      @click="emit('clear')"
    >
      <Icon icon="broom" :size="18" />
      Limpar seleção
    </button>
  </div>
</template>

<style scoped>
/* Staggered reveal when panel opens (parent transition applies .selected-verses-enter-active to root) */
.selected-verses-panel.selected-verses-enter-active .stagger-item {
  animation: selected-verses-fade-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.selected-verses-panel.selected-verses-enter-active .stagger-1 { animation-delay: 0.05s; }
.selected-verses-panel.selected-verses-enter-active .stagger-2 { animation-delay: 0.12s; }
.selected-verses-panel.selected-verses-enter-active .stagger-3 { animation-delay: 0.19s; }
.selected-verses-panel.selected-verses-enter-active .stagger-4 { animation-delay: 0.26s; }

@keyframes selected-verses-fade-in {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
