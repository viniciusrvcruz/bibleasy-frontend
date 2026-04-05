<script setup lang="ts">
import type { Version } from '~/types/version/Version.type'
import type { Chapter } from '~/types/chapter/Chapter.type'
import { chapterResourcePath } from '~/composables/services/useChapterService'
import { useVerseOfTheDay } from '~/composables/bible/useVerseOfTheDay'
import { stripVersePlaceholders } from '~/utils/bible/versePlaceholders'
import { useBookService } from '~/composables/services/useBookService'

const api = useApi()
const versionStore = useVersionStore()
const bookService = useBookService()
const { getChapterUrl, lastChapterUrl } = useNavigateToBible()
const { getTodayVerse, parsePassageId } = useVerseOfTheDay()

const todayVerse = getTodayVerse()
const parsedPassage = parsePassageId(todayVerse.passage_id)

const versionModalRef = useTemplateRef<{ open: () => void }>('versionModalRef')

const { data: chapter, status, error } = useAsyncData<Chapter>(
  'verse-of-the-day',
  () => {
    return api.get<Chapter>(
      chapterResourcePath(
        parsedPassage.book,
        parsedPassage.chapter,
        versionStore.currentVersion!.id
      )
    )
  },
  {
    watch: [() => versionStore.currentVersion?.id],
    server: false,
  }
)

const verseText = computed(() => {
  if (!chapter.value) return ''

  const verses = chapter.value.verses.filter(
    (verse) => verse.number >= parsedPassage.startVerse && verse.number <= parsedPassage.endVerse
  )

  return stripVersePlaceholders(verses.map((verse) => verse.text).join(' '))
})

const verseReference = computed(() => {
  if (!chapter.value) return ''

  const book = chapter.value.book.name
  const chapterNum = chapter.value.number
  const verseRange = parsedPassage.startVerse === parsedPassage.endVerse
    ? parsedPassage.startVerse
    : `${parsedPassage.startVerse}-${parsedPassage.endVerse}`

  return `${book} ${chapterNum}:${verseRange}`
})

const handleVersionSelect = (version: Version) => {
  bookService.index(version.id).then((books) => {
    versionStore.setCurrentVersionWithBooks(version, books)
  })
}

const chapterLink = computed(() => {
  if (!chapter.value) return lastChapterUrl.value

  return getChapterUrl(
    chapter.value.book.abbreviation,
    chapter.value.number,
    undefined,
    parsedPassage.startVerse,
  )
})
</script>

<template>
  <section class="relative mx-auto w-full max-w-3xl px-4 pb-10 pt-5 md:py-8">
    <h2 class="font-serif text-2xl italic text-base-content md:text-3xl">
      Versículo do dia
    </h2>

    <div class="relative mt-1">
      <div
        class="absolute -start-3 top-6 bottom-6 w-1 rounded-full bg-linear-to-b from-primary via-secondary to-primary/40 md:-start-4"
        aria-hidden="true"
      />

      <!-- Skeleton -->
      <div
        v-if="status === 'pending' || status === 'idle'"
        class="relative overflow-hidden rounded-2xl border border-base-300/80 bg-linear-to-br from-base-200/90 to-base-100 px-6 py-8 shadow-inner md:px-10 md:py-11"
      >
        <div class="space-y-4">
          <div class="skeleton h-6 w-full" />
          <div class="skeleton h-6 w-5/6" />
          <div class="skeleton h-6 w-4/6" />
          <div class="skeleton h-4 w-32 mt-8" />
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error || !chapter"
        class="relative overflow-hidden rounded-2xl border border-base-300/80 bg-linear-to-br from-base-200/90 to-base-100 p-5 shadow-inner"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <Icon icon="info" :size="48" class="text-base-content/30" />
          <div>
            <p class="text-base-content/70 mb-2">
              O versículo do dia pode não estar disponível na versão atual.
            </p>
            <p class="text-sm text-base-content/50">
              Tente selecionar outra versão da Bíblia.
            </p>
          </div>
          <button
            class="btn btn-sm btn-outline mt-2"
            @click="versionModalRef?.open()"
          >
            <Icon icon="swap_horiz" :size="18" />
            Trocar versão
          </button>
        </div>
      </div>

      <!-- Content -->
      <div
        v-else-if="chapter"
        class="relative overflow-hidden rounded-2xl border border-base-300/80 bg-linear-to-br from-base-200/90 to-base-100 px-6 py-8 shadow-inner md:px-10 md:py-11"
      >
        <p
          class="pointer-events-none absolute end-4 top-4 font-serif text-7xl leading-none text-primary/[0.07] md:text-8xl"
          aria-hidden="true"
        >
          "
        </p>
        <blockquote class="relative max-w-prose font-serif text-lg leading-relaxed text-base-content pe-5 md:text-xl">
          {{ verseText }}
        </blockquote>
        <p class="relative mt-5 text-sm tracking-widest text-base-content/45">
          {{ verseReference }} · {{ versionStore.currentVersion?.abbreviation }}
        </p>

        <div class="flex flex-wrap gap-3 mt-3">
          <NuxtLink
            :to="chapterLink"
            class="btn btn-sm btn-outline btn-primary"
          >
            <Icon icon="book" :size="18" />
            Ler capítulo completo
          </NuxtLink>
          <button
            class="btn btn-sm"
            @click="versionModalRef?.open()"
          >
            <Icon icon="swap_horiz" :size="18" />
            Trocar versão
          </button>
        </div>
      </div>
    </div>

    <BibleChapterVersionModal
      ref="versionModalRef"
      @select="handleVersionSelect"
    />
  </section>
</template>
