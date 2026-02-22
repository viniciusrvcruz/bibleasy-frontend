<script setup lang="ts">
import type { Chapter } from '~/types/chapter/Chapter.type'
import type { Version } from '~/types/version/Version.type'
import { useVerseFocus } from '~/composables/bible/useVerseFocus'
import { useChapterHistory } from '~/composables/bible/useChapterHistory'
import { useBookService } from '~/composables/services/useBookService'

const props = defineProps<{
  chapter: Chapter,
  isLoading: boolean,
}>()

const route = useRoute()
const { goToChapter, getChapterUrl } = useNavigateToBible()
const versionStore = useVersionStore()
const { addToHistory } = useChapterHistory()

const chapterContainerRef = ref<HTMLElement | null>(null)

// 1 year in seconds
const cookieMaxAge = 60 * 60 * 24 * 365
const fontSize = useCookie<string>('bible-font-size', {
  default: () => 'text-lg',
  maxAge: cookieMaxAge,
})
const fontFamily = useCookie<string>('bible-font-family', {
  default: () => 'font-sans',
  maxAge: cookieMaxAge,
})

const bookName = computed(() => {
  return props.chapter.book.name
})

const verseNumber = computed(() => {
  if (!route.hash) return null

  return parseInt(route.hash.slice(2))
})

// Returns the index of the current chapter
const currentChapterIndex = computed(() => {
  return versionStore.allChapters.findIndex(
    chapter => 
      chapter.book.abbreviation === props.chapter.book.abbreviation &&
      chapter.number === props.chapter.number
  )
})

// Returns the chapter by index
const getChapterByIndex = (index: number) => {
  return versionStore.allChapters[index] ?? null
}

// Returns the previous chapter data
const previousChapter = computed(() => {
  if (currentChapterIndex.value === -1) return null

  return getChapterByIndex(currentChapterIndex.value - 1)
})

// Returns the next chapter data
const nextChapter = computed(() => {
  if (currentChapterIndex.value === -1) return null

  return getChapterByIndex(currentChapterIndex.value + 1)
})

// Returns the link for the previous chapter
const previousChapterLink = computed(() => {
  if (!previousChapter.value) return null

  return getChapterUrl(
    previousChapter.value.book.abbreviation,
    previousChapter.value.number
  )
})

// Returns the link for the next chapter
const nextChapterLink = computed(() => {
  if (!nextChapter.value) return null

  return getChapterUrl(
    nextChapter.value.book.abbreviation,
    nextChapter.value.number
  )
})

const clearHash = () => {
  history.replaceState(history.state, '', route.path)
}

const {
  focusedVerseNumber,
  overlayHeight,
  handleScroll,
  handleVerseFocus,
  clearFocus
} = useVerseFocus(chapterContainerRef, verseNumber, clearHash)

onMounted(() => {
  if(!import.meta.client) return

  addCurrentChapterToHistory()
  handleVerseFocus()
})

const addCurrentChapterToHistory = () => {
  const verseNumber = route.hash ? parseInt(route.hash.slice(2)) : undefined

  addToHistory({
    book: props.chapter.book.abbreviation,
    chapter: props.chapter.number,
    verse: verseNumber,
    versionName: versionStore.currentVersion?.abbreviation ?? '',
    timestamp: Date.now()
  })
}

const handleVersionSelect = (version: Version) => {
  const bookService = useBookService()

  versionStore.setCurrentVersion(version)
  // Load books for the new version
  bookService.index(version.id).then((books) => {
    versionStore.setCurrentVersionBooks(books)

    goToChapter(
      props.chapter.book.abbreviation,
      props.chapter.number,
      verseNumber.value ?? undefined
    )
  })
}

</script>

<template>
  <section class="flex-1 flex flex-col h-screen-header overflow-hidden sticky top-header">
    <div
      ref="chapterContainerRef"
      class="flex flex-col overflow-y-auto flex-1 scroll-smooth relative"
      @scroll="handleScroll"
    >
      <BibleChapterHeader
        :book-name="bookName"
        :chapter-number="chapter.number"
        v-model:font-size="fontSize"
        v-model:font-family="fontFamily"
        @version-select="handleVersionSelect"
      />

      <!-- Focus overlay (only in chapter section) -->
      <div 
        v-if="focusedVerseNumber"
        class="absolute top-0 left-0 right-0 bg-black/20 z-1 cursor-pointer transition-opacity duration-300 ease-in-out"
        :style="{ height: `${overlayHeight}px` }"
        @click="clearFocus"
      />

      <!-- Main content -->
      <div
        class="flex-1 px-5 pb-52 sm:px-10 lg:px-20 lg:pb-52"
        :class="{
          'loading-shimmer blur-xs': isLoading,
        }"
      >
        <h1 class="text-xl font-bold text-center text-base-content/60 mt-6 mb-2">
          {{ bookName }}
        </h1>
        <h2 class="text-6xl font-bold text-center mb-8 sm:text-7xl">
          {{ chapter.number }}
        </h2>

        <div 
          :class="[
            'max-w-lg mx-auto px-2',
            fontSize,
            fontFamily
          ]"
        >
          <template v-for="verse in chapter.verses" :key="verse.id">
            <BibleChapterTitle
              v-for="(title, index) in verse.titles ?? []"
              :key="index"
              :title="title"
              :references="verse.references"
            />

            <BibleChapterVerse
              :id="`v${verse.number}`"
              :verse="verse"
              :is-focused="verse.number === focusedVerseNumber"
            />
          </template>
        </div>

        <!-- Version Copyright -->
        <div 
          v-if="versionStore.currentVersion?.copyright"
          v-html="versionStore.currentVersion.copyright"
          class="mt-8 mb-6 text-center text-sm text-base-content/60 max-w-lg mx-auto"
        />

        <div class="divider w-1/2 mx-auto" />

        <BibleChapterFooter />
      </div>
    </div>

    <!-- Navigation buttons -->
    <div class="flex justify-between w-full pointer-events-none z-2 absolute bottom-0 left-0 right-0">
      <RouterLink
        v-if="previousChapterLink"
        :to="previousChapterLink"
        class="btn btn-xl btn-circle mb-15 ms-5 border-2 border-base-300 shadow-sm pointer-events-auto lg:ms-10 lg:mb-48 xl:ms-48 2xl:ms-52"
        :aria-label="previousChapter ? `Ir para ${previousChapter.book.name} ${previousChapter.number}` : 'Capítulo anterior'"
      >
        <Icon icon="chevron_left" />
        <span class="sr-only">
          {{ previousChapter ? `${previousChapter.book.name} ${previousChapter.number}` : 'Capítulo anterior' }}
        </span>
      </RouterLink>

      <label
        for="select_verse_modal"
        class="btn text-sm flex-1 mx-2 px-0 py-7 border-2 border-base-300 pointer-events-auto sm:mx-5 sm:text-lg lg:hidden"
        aria-label="Selecionar versículo"
      >
        {{ bookName }} {{ chapter.number }}
      </label>

      <RouterLink
        v-if="nextChapterLink"
        :to="nextChapterLink"
        class="btn btn-xl btn-circle mb-15 me-5 border-2 border-base-300 shadow-sm pointer-events-auto lg:me-10 lg:ms-auto lg:mb-48 xl:me-48 2xl:me-52"
        :aria-label="nextChapter ? `Ir para ${nextChapter.book.name} ${nextChapter.number}` : 'Próximo capítulo'"
      >
        <Icon icon="chevron_right" />
        <span class="sr-only">
          {{ nextChapter ? `${nextChapter.book.name} ${nextChapter.number}` : 'Próximo capítulo' }}
        </span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.loading-shimmer * {
  color: transparent !important;
  background-image: linear-gradient(
    90deg,
    color-mix(in oklab, var(--color-base-content) 20%, transparent) 25%,
    color-mix(in oklab, var(--color-base-content) 80%, transparent) 50%,
    color-mix(in oklab, var(--color-base-content) 20%, transparent) 75%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  animation: shimmer 4s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>