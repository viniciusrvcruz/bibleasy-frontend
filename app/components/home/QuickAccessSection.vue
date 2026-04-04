<script setup lang="ts">
import { BookAbbreviation, getDefaultBookChapterCount, getDefaultBookName } from '~/utils/bible/book'

const versionStore = useVersionStore()
const { getChapterUrl } = useNavigateToBible()

const POPULAR_ABBRS = [
  BookAbbreviation.gen,
  BookAbbreviation.psa,
  BookAbbreviation.pro,
  BookAbbreviation.mat,
  BookAbbreviation.jhn,
  BookAbbreviation.rom,
  BookAbbreviation.rev,
  BookAbbreviation.isa,
] as const

const popularBooks = computed(() =>
  POPULAR_ABBRS.map((abbr) => {
    const fromStore = versionStore.getBookByAbbreviation(abbr)
    return {
      abbr,
      name: fromStore?.name ?? getDefaultBookName(abbr),
      chapters: fromStore?.chapters.length ?? getDefaultBookChapterCount(abbr),
    }
  }),
)
</script>

<template>
  <section class="relative mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="text-xs font-bold uppercase tracking-[0.25em] text-primary">
          Atalhos
        </h2>
        <p class="mt-2 text-2xl font-semibold tracking-tight text-base-content md:text-3xl">
          Por onde começar a leitura
        </p>
        <p class="mt-2 max-w-md text-sm text-base-content/60">
          Selecione um livro para começar a ler.
        </p>
      </div>
      <BibleLastChapterLink
        class="btn btn-outline btn-sm gap-1 rounded-full border-base-300 transition-[transform,border-color,background-color] duration-200 hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
      >
        Abrir a Bíblia
        <Icon icon="chevron_right" :size="16" />
      </BibleLastChapterLink>
    </div>

    <!-- Uniform grid: same footprint for every book -->
    <div
      class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
    >
      <RouterLink
        v-for="book in popularBooks"
        :key="book.abbr"
        :to="getChapterUrl(book.abbr, 1)"
        class="group relative flex min-h-[6.5rem] flex-col justify-between overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-4 transition-[transform,box-shadow,border-color] duration-300 hover:z-[1] hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-base-300/40"
      >
        <div
          class="pointer-events-none absolute -end-6 -top-6 size-24 rounded-full bg-primary/[0.07] transition-transform duration-500 group-hover:scale-105 group-hover:bg-primary/[0.1]"
          aria-hidden="true"
        />
        <div class="relative flex items-start justify-between gap-2">
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-base-200 text-primary transition-colors duration-200 group-hover:bg-primary/15 group-hover:text-primary"
          >
            <Icon icon="book_marked" :size="18" />
          </div>
          <Icon
            icon="arrow_right"
            :size="16"
            class="text-base-content/25 transition-colors duration-200 group-hover:text-primary"
          />
        </div>
        <div class="relative mt-3">
          <p
            class="text-base font-semibold text-base-content transition-colors duration-200 group-hover:text-base-content"
          >
            {{ book.name }}
          </p>
          <p class="mt-1 text-xs text-base-content/55">
            {{ book.chapters }} capítulos
          </p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
