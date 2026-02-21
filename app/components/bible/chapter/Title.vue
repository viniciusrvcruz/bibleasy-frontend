<script setup lang="ts">
import type { VerseTitle } from '~/types/verseTitle/verseTitle.type'
import type { VerseReference } from '~/types/verseReference/VerseReference.type'
import { useTextWithReferences } from '~/composables/bible/useTextWithReferences'
import { VerseTitleTypeEnum } from '~/types/verseTitle/verseTitle.schema'

const props = defineProps<{
  title: VerseTitle
  references?: VerseReference[]
}>()

const { processedText } = useTextWithReferences(
  () => props.title.text,
  () => props.references
)
</script>

<template>
  <h2
    :class="{
      'text-[1.18em] font-bold mb-8': title.type === VerseTitleTypeEnum.SECTION,
      'text-[0.850em] font-bold mb-8 italic': title.type === VerseTitleTypeEnum.REFERENCE,
    }"
  >
    <template v-for="(part, index) in processedText" :key="index">
      <template v-if="part.type === 'text'">
        {{ part.content }}
      </template>
      <BibleChapterVerseReference
        v-else
        :reference="part.reference"
      />
    </template>
  </h2>
</template>
