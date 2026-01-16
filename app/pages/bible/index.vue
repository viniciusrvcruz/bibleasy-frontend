<script setup lang="ts">
import { BookAbbreviation } from '~/utils/book'

const { goToChapter } = useNavigateToBible()
const lastChapterStore = useLastChapterStore()

const lastChapter = lastChapterStore.parsedReference

if (lastChapter) {
  goToChapter(lastChapter.book, lastChapter.chapter, 1, true)
} else {
  goToChapter(BookAbbreviation.jhn, 1, 1, true)
}
</script>

<template>
  <div />
</template>