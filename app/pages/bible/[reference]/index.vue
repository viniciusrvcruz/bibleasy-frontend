<script setup lang="ts">
import { useChapterService } from '~/composables/services/useChapterService'
import { useBookService } from '~/composables/services/useBookService'
import { useBibleReference } from '~/composables/bible/useBibleReference'

const route = useRoute()
const router = useRouter()
const versionStore = useVersionStore()
const lastChapterStore = useLastChapterStore()

const isLoading = ref(true)

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

isLoading.value = false

// SEO - Dynamic meta tags based on chapter data
const bookName = chapterData.value.book.name
const chapterNumber = chapterData.value.number

const pageTitle = `${bookName} ${chapterNumber} | ${versionStore.currentVersion?.name ?? ''}`
const pageDescription = `Leia ${bookName} capítulo ${chapterNumber} na versão ${version.name}. Acesse a Bíblia online gratuitamente com interface fácil e intuitiva.`

watch(() => router.currentRoute.value.params?.reference, () => {
  isLoading.value = true
})

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'article',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})

useSchemaOrg([
  defineWebPage({
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
  }),
  defineArticle({
    '@type': 'Article',
    headline: pageTitle,
    description: pageDescription,
    articleSection: ['Bíblia'],
    inLanguage: 'pt-BR',
  }),
])
</script>

<template>
  <main class="flex-1 flex justify-between">
    <BibleVerseSelectorResponsivePanel :current-book="book" />

    <BibleChapter
      v-if="chapterData"
      :chapter="chapterData"
      :is-loading="isLoading"
    />

    <!-- TODO: Add selected verses section -->
  </main>
</template>