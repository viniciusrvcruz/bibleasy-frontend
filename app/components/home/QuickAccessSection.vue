<script setup lang="ts">
import { BookAbbreviation } from '~/utils/bible/book'

const { getChapterUrl } = useNavigateToBible()

const POPULAR_BOOKS = [
  { abbr: BookAbbreviation.gen, name: 'Gênesis', chapters: 50, testament: 'AT', large: true },
  { abbr: BookAbbreviation.psa, name: 'Salmos', chapters: 150, testament: 'AT', large: true },
  { abbr: BookAbbreviation.pro, name: 'Provérbios', chapters: 31, testament: 'AT', large: false },
  { abbr: BookAbbreviation.mat, name: 'Mateus', chapters: 28, testament: 'NT', large: false },
  { abbr: BookAbbreviation.jhn, name: 'João', chapters: 21, testament: 'NT', large: false },
  { abbr: BookAbbreviation.rom, name: 'Romanos', chapters: 16, testament: 'NT', large: false },
  { abbr: BookAbbreviation.rev, name: 'Apocalipse', chapters: 22, testament: 'NT', large: false },
  { abbr: BookAbbreviation.isa, name: 'Isaías', chapters: 66, testament: 'AT', large: false },
] as const

const bibleReaderUrl = computed(() => getChapterUrl(BookAbbreviation.gen, 1))
</script>

<template>
  <section>
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="text-xs font-bold uppercase tracking-[0.25em] text-primary">
          Atalhos
        </h2>
        <p class="mt-2 text-2xl font-semibold tracking-tight text-base-content md:text-3xl">
          Livros que costumam abrir primeiro
        </p>
        <p class="mt-2 max-w-md text-sm text-base-content/60">
          Cada card leva ao capítulo 1. No leitor você navega pelo restante.
        </p>
      </div>
      <RouterLink
        :to="bibleReaderUrl"
        class="btn btn-outline btn-sm gap-1 rounded-full border-base-300"
      >
        Abrir a Bíblia
        <Icon icon="chevron_right" :size="16" />
      </RouterLink>
    </div>

    <!-- bento: dois destaques + grade irregular para não parecer planilha -->
    <div
      class="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
    >
      <RouterLink
        v-for="(book, index) in POPULAR_BOOKS"
        :key="book.abbr"
        :to="getChapterUrl(book.abbr, 1)"
        class="group relative flex flex-col justify-between overflow-hidden border border-base-300 bg-base-100 p-4 transition-all duration-300 hover:z-[1] hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10"
        :class="[
          book.large ? 'col-span-2 min-h-[7.5rem] lg:min-h-[8.5rem]' : 'min-h-[6.25rem]',
          index % 3 === 1 && !book.large ? 'lg:translate-y-2' : '',
          index % 3 === 2 && !book.large ? 'lg:-translate-y-1' : '',
        ]"
      >
        <div
          class="pointer-events-none absolute -end-6 -top-6 size-24 rounded-full bg-primary/[0.06] transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        />
        <div class="relative flex items-start justify-between gap-2">
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-base-200 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content"
          >
            <Icon icon="book_marked" :size="18" />
          </div>
          <Icon
            icon="arrow_right"
            :size="16"
            class="text-base-content/0 transition-colors group-hover:text-primary"
          />
        </div>
        <div class="relative mt-3">
          <p
            class="font-semibold text-base-content transition-colors group-hover:text-primary"
            :class="book.large ? 'text-lg md:text-xl' : 'text-base'"
          >
            {{ book.name }}
          </p>
          <p class="mt-1 text-xs text-base-content/55">
            {{ book.chapters }} cap. · {{ book.testament }}
          </p>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
