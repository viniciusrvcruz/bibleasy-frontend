<script setup lang="ts">
import type { VerseReference } from '~/types/verseReference/VerseReference.type'

const props = defineProps<{
  reference: VerseReference
}>()
</script>

<template>
  <div class="tooltip tooltip-bottom inline-flex items-center justify-center align-middle mx-3 text-base-content/60 hover:text-base-content/90 transition-colors cursor-pointer relative -top-1">
    <button
      type="button"
      class="inline-flex items-center justify-center"
    >
      <Icon icon="file_text" :size="16" />
    </button>
    <div class="tooltip-content max-w-sm p-4">
      <p class="leading-relaxed whitespace-pre-line">
        {{ reference.text }}
      </p>
    </div>
  </div>
</template>
