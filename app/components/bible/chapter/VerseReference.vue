<script setup lang="ts">
import type { VerseReference } from '~/types/verseReference/VerseReference.type'

const props = defineProps<{
  reference: VerseReference
}>()

const popover = useTemplateRef('popover')

const toggle = (event: Event) => {
  popover.value?.toggle(event)
}
</script>

<template>
  <div class="inline-flex relative -top-1">
    <button
      type="button"
      class="inline-flex items-center justify-center align-middle mx-3 text-base-content/60 hover:text-base-content/90 transition-colors cursor-pointer"
      :aria-label="`Ver referência bíblica: ${reference.text}`"
      @click="toggle"
    >
      <Icon icon="file_text" :size="16" />
      <span class="sr-only">Ver referência bíblica</span>
    </button>
    <Popover ref="popover">
      <p class="max-w-sm p-2 leading-relaxed whitespace-pre-line text-base-content text-start">
        {{ reference.text }}
      </p>
    </Popover>
  </div>
</template>
