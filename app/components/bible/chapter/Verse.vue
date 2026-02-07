<script setup lang="ts">
import type { Verse } from '~/types/verse/Verse.type'
import type { VerseReference } from '~/types/verseReference/VerseReference.type'

const props = defineProps<{
  verse: Verse
  isFocused: boolean
}>()

type TextPart = { type: 'text'; content: string }
type ReferencePart = { type: 'reference'; reference: VerseReference }
type ProcessedPart = TextPart | ReferencePart

// Processes verse text and replaces {{slug}} with reference components
const processedText = computed<ProcessedPart[]>(() => {
  const { text, references } = props.verse

  if (!references?.length) {
    return [createTextPart(text)]
  }

  const referenceMap = buildReferenceMap(references)
  const pattern = /\{\{(\w+)\}\}/g
  const parts: ProcessedPart[] = []
  let lastIndex = 0

  for (const match of text.matchAll(pattern)) {
    const [fullMatch, slug] = match
    const matchIndex = match.index

    // Text before the match
    if (matchIndex > lastIndex) {
      parts.push(createTextPart(text.slice(lastIndex, matchIndex)))
    }

    // Add reference only if found
    const reference = slug ? referenceMap.get(slug) : undefined
    if (reference) {
      parts.push(createReferencePart(reference))
    }

    lastIndex = matchIndex + fullMatch.length
  }

  // Remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(createTextPart(text.slice(lastIndex)))
  }

  return parts
})

const buildReferenceMap = (references: VerseReference[]) => {
  return new Map(references.map(ref => [ref.slug, ref]))
}

const createTextPart = (content: string): TextPart => {
  return { type: 'text', content }
}

const createReferencePart = (reference: VerseReference): ReferencePart => {
  return { type: 'reference', reference }
}

</script>

<template>
  <div
    class="p-1 inline leading-[1.9] indent-0 transition-all duration-200 ease-in-out whitespace-pre-line"
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
        <BibleChapterVerseReference
          v-else
          :reference="part.reference"
        />
      </template>
    </div>
  </div>
</template>
