<script setup lang="ts">
const fontSizes = [
  { label: 'Muito Pequeno', value: 'text-sm', size: 1 },
  { label: 'Pequeno', value: 'text-base', size: 2 },
  { label: 'Médio', value: 'text-lg', size: 3 },
  { label: 'Grande', value: 'text-xl', size: 4 },
  { label: 'Extra Grande', value: 'text-2xl', size: 5 },
  { label: 'Muito Grande', value: 'text-3xl', size: 6 },
]

const fontFamilies = [
  { label: 'Sans Serif', value: 'font-sans', style: 'system-ui, -apple-system, sans-serif' },
  { label: 'Serif', value: 'font-serif', style: 'Georgia, serif' },
  { label: 'Mono', value: 'font-mono', style: 'ui-monospace, monospace' },
  { label: 'Arial', value: 'font-arial', style: 'Arial, sans-serif' },
  { label: 'Times', value: 'font-times', style: 'Times New Roman, serif' },
  { label: 'Verdana', value: 'font-verdana', style: 'Verdana, sans-serif' },
  { label: 'Georgia', value: 'font-georgia', style: 'Georgia, serif' },
  { label: 'Courier', value: 'font-courier', style: 'Courier New, monospace' },
]

const selectedFontSize = defineModel<string>('fontSize', { default: 'text-lg' })
const selectedFontFamily = defineModel<string>('fontFamily', { default: 'font-sans' })

const popoverRef = ref()

const currentSizeIndex = computed(() => {
  return fontSizes.findIndex(f => f.value === selectedFontSize.value)
})

const increaseFontSize = () => {
  const currentIndex = currentSizeIndex.value
  if (currentIndex < fontSizes.length - 1) {
    selectedFontSize.value = fontSizes[currentIndex + 1].value
  }
}

const decreaseFontSize = () => {
  const currentIndex = currentSizeIndex.value
  if (currentIndex > 0) {
    selectedFontSize.value = fontSizes[currentIndex - 1].value
  }
}

const togglePopover = (event: Event) => {
  popoverRef.value.toggle(event)
}
</script>

<template>
  <div>
    <button 
      class="btn btn-sm"
      @click="togglePopover"
      title="Configurações de texto"
    >
      <Icon icon="letter_case" :size="20" />
    </button>
    
    <Popover ref="popoverRef" class="font-config-popover">
      <div class="p-4 w-80 bg-base-100">
        <h3 class="font-bold text-lg mb-4">Configurações de Texto</h3>
        
        <!-- Controles de tamanho -->
        <div class="mb-4">
          <label class="label">
            <span class="label-text font-semibold">Tamanho da Fonte</span>
          </label>
          <div class="flex gap-2 mb-3">
            <button
              class="btn btn-sm flex-1"
              :disabled="currentSizeIndex === 0"
              @click="decreaseFontSize"
            >
              <span class="text-sm">A-</span>
            </button>
            <button
              class="btn btn-sm flex-1"
              :disabled="currentSizeIndex === fontSizes.length - 1"
              @click="increaseFontSize"
            >
              <span class="text-lg font-semibold">A+</span>
            </button>
          </div>
          
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="size in fontSizes"
              :key="size.value"
              class="btn btn-sm justify-start hover:bg-base-200"
              :class="{
                'bg-base-200 ring-2 ring-primary/30': selectedFontSize === size.value
              }"
              @click="selectedFontSize = size.value"
            >
              <span :class="size.value" class="truncate">{{ size.label }}</span>
            </button>
          </div>
        </div>
        
        <!-- Seleção de fonte -->
        <div>
          <label class="label">
            <span class="label-text font-semibold">Fonte</span>
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="font in fontFamilies"
              :key="font.value"
              class="btn btn-sm justify-start hover:bg-base-200"
              :class="{
                'bg-base-200 ring-2 ring-primary/30': selectedFontFamily === font.value
              }"
              @click="selectedFontFamily = font.value"
            >
              <span :style="{ fontFamily: font.style }" class="truncate">{{ font.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </Popover>
  </div>
</template>

<style scoped>
.font-config-popover {
  max-width: 320px;
}
</style>

