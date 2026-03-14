<script setup lang="ts">
import type { Verse } from '~/types/verse/Verse.type'
import { useProcessedVerseParts } from '~/composables/bible/useProcessedVerseParts'

const props = defineProps<{
  verse: Verse
  isFocused: boolean
}>()

// Processes verse text: {{slug}} → reference, [[slug]] → title
const { processedText } = useProcessedVerseParts(
  () => props.verse.text,
  () => props.verse.references,
  () => props.verse.titles
)
</script>

<template>
  <div
    class="p-1 inline leading-[1.9] indent-0 transition-all duration-200 ease-in-out whitespace-pre-line wrap-break-word"
    :class="{
      'relative bg-base-100 rounded shadow-lg z-1': isFocused,
    }"
  >
    <span class="text-[0.8em] align-super leading-0 font-bold text-base-content/50 me-2">
      {{ verse.number }}
    </span>
    <div class="inline leading-[1.9]">
      <template v-for="(part, index) in processedText" :key="index">
        <template v-if="part.type === 'text'">
          {{ part.content }}
        </template>
        <BibleChapterTitle
          v-else-if="part.type === 'title'"
          :title="part.title"
          :references="verse.references"
        />
        <BibleChapterVerseReference
          v-else-if="part.type === 'reference'"
          :reference="part.reference"
        />
      </template>
    </div>
  </div>
</template>
