<script setup lang="ts">
import { useChapterService } from '~/composables/services/useChapterService'
import { useBookService } from '~/composables/services/useBookService'
import { useBibleReference } from '~/composables/bible/useBibleReference'

const route = useRoute()
const versionStore = useVersionStore()
const lastChapterStore = useLastChapterStore()

const reference = route.params.reference?.toString() ?? ''
const { book, chapter, version } = useBibleReference(reference)

const chapterService = useChapterService()
const bookService = useBookService()

const { data: books, execute: executeBookIndex } = bookService.useIndex(version.id, false)

// Load books if the version is different from the current version
if (version.id !== versionStore.currentVersion?.id) {
  await executeBookIndex()

  if(!books.value) {
    throw createAppError('Os livros não foram encontrados')
  }

  versionStore.setCurrentVersionWithBooks(version, books.value)
}

// Load chapter data
const { data: chapterData } = await chapterService.useShow(book, chapter, version.id)

if (!chapterData.value) {
  lastChapterStore.clearLastChapter()
  throw createAppError('O capítulo não foi encontrado')
}

lastChapterStore.setLastChapter(book, chapter)
</script>

<template>
  <main class="flex-1 flex justify-between">
    <BibleVerseSelectorResponsivePanel :current-book="book" />

    <BibleChapter v-if="chapterData" :chapter="chapterData" />

    <!-- TODO: Add selected verses section -->
  </main>
</template>