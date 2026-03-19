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
  <div class="inline-flex relative -top-1" @click.stop>
    <button
      type="button"
      class="group inline-flex items-center justify-center align-middle mx-1.5 p-1.5 rounded-md bg-base-100 text-base-content/60 hover:text-base-content/90 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 cursor-pointer hover:bg-base-300 active:scale-95"
      :aria-label="`Ver referência bíblica: ${reference.text}`"
      @click="toggle"
    >
      <Icon icon="file_text" :size="16" class="transition-transform duration-200 group-hover:scale-110" />
      <span class="sr-only">Ver referência bíblica</span>
    </button>
    <Popover ref="popover">
      <p class="max-w-sm p-2 leading-relaxed whitespace-pre-line text-base-content text-start">
        {{ reference.text }}
      </p>
    </Popover>
  </div>
</template>
