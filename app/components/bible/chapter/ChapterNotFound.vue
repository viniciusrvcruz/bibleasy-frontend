<script setup lang="ts">
import type { Version } from '~/types/version/Version.type'
import type { BookAbbreviationType } from '~/utils/book'
import { useBookService } from '~/composables/services/useBookService'

const props = defineProps<{
  book: BookAbbreviationType
  chapter: number
  versionName: string
}>()

const versionStore = useVersionStore()
const { goToChapter } = useNavigateToBible()
const bookService = useBookService()

const versionModalRef = useTemplateRef<{ open: () => void }>('versionModalRef')

const handleVersionSelect = (version: Version) => {
  versionStore.setCurrentVersion(version)

  bookService.index(version.id)
    .then((books) => {
      versionStore.setCurrentVersionBooks(books)
      goToChapter(props.book, props.chapter)
    })
}

const openVersionModal = () => {
  versionModalRef.value?.open()
}
</script>

<template>
  <section class="flex-1 flex flex-col items-center justify-center px-5 py-12 sm:px-10">
    <div class="max-w-md w-full text-center space-y-6">
      <div class="flex justify-center">
        <div
          class="w-20 h-20 flex items-center justify-center rounded-full bg-base-200 shrink-0"
          aria-hidden="true"
        >
          <Icon icon="book_open" :size="48" class="text-base-content/50" />
        </div>
      </div>

      <div class="space-y-2">
        <h1 class="text-xl font-bold text-base-content">
          Capítulo não encontrado
        </h1>
        <p class="text-base-content/70">
          Este capítulo não está disponível nesta versão. Por favor, escolha outro capítulo ou versão.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-3">
        <label
          for="select_verse_modal"
          class="btn gap-2 lg:hidden"
        >
          <Icon icon="book_marked" :size="20" />
          Escolher outro capítulo
        </label>
        <button
          type="button"
          class="btn btn-primary gap-2"
          @click="openVersionModal"
        >
          <Icon icon="globe" :size="20" />
          Selecionar outra versão
        </button>
      </div>
    </div>

    <BibleChapterVersionModal
      ref="versionModalRef"
      @select="handleVersionSelect"
    />
  </section>
</template>
