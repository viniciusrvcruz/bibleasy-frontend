<script setup lang="ts">
import type { BookNameType } from '~/utils/book'
import type { BookInfo } from '~/types/book/Book.type'
import { getAllBooks, getBookInfo } from '~/utils/book'
import { normalizeString } from '~/utils/helpers'
import { useNavigateToBible } from '~/composables/useNavigateToBible'
import { useChapterService } from '~/composables/services/useChapterService'

// ===== TIPOS =====
interface ChapterVerses {
  number: number
  verses_count: number
}

// ===== COMPOSABLES =====
const { goToChapter } = useNavigateToBible()
const chapterService = useChapterService()
const versionStore = useVersionStore()

// ===== REFS DOS ELEMENTOS =====
const dialogRef = useTemplateRef<HTMLDialogElement>('dialogRef')
const bookInputRef = useTemplateRef<HTMLInputElement>('bookInputRef')
const chapterInputRef = useTemplateRef<HTMLInputElement>('chapterInputRef')
const verseInputRef = useTemplateRef<HTMLInputElement>('verseInputRef')

// ===== ESTADO =====
const bookSearch = ref('')
const chapterSearch = ref('')
const verseSearch = ref('')

const selectedBook = ref<BookNameType | null>(null)
const selectedChapter = ref<number | null>(null)
const chaptersWithVerses = ref<ChapterVerses[]>([])
const lastValidChapter = ref<string>('')

// ===== COMPUTED =====
const selectedBookInfo = computed(() => {
  if (!selectedBook.value) return null

  return getBookInfo(selectedBook.value)
})

const selectedChapterVerses = computed(() => {
  if (!selectedChapter.value) return 0
  const chapterData = chaptersWithVerses.value.find(c => c.number === selectedChapter.value)
  return chapterData?.verses_count ?? 0
})

const filteredBooks = computed(() => {
  if (!bookSearch.value) return []

  const normalizedSearch = normalizeString(bookSearch.value)

  return getAllBooks()
    .filter(({ info }) => normalizeString(info.name).startsWith(normalizedSearch))
    .slice(0, 10)
})

const canNavigate = computed(() => {
  return selectedBook.value !== null && selectedChapter.value !== null
})

// ===== FUNÇÕES AUXILIARES =====

/**
 * Remove todos os caracteres não numéricos de uma string
 */
const getNumericValue = (value: string): string => {
  return value.replace(/\D/g, '')
}

/**
 * Foca em um input após o próximo tick
 */
const focusInput = (ref: Ref<HTMLInputElement | null | undefined>) => {
  nextTick(() => ref.value?.focus())
}

/**
 * Move o foco para o campo de versículo e preenche com o valor
 */
const moveToVerse = (value: string) => {
  nextTick(() => {
    verseSearch.value = value
    if (verseInputRef.value) {
      verseInputRef.value.value = value
      verseInputRef.value.focus()
    }
  })
}

/**
 * Limpa a seleção de capítulo
 */
const clearChapterSelection = () => {
  selectedChapter.value = null
  lastValidChapter.value = ''
}

/**
 * Limpa a seleção do livro e seus capítulos relacionados
 */
const clearBookSelection = () => {
  selectedBook.value = null
  chaptersWithVerses.value = []
}

/**
 * Valida se um número de capítulo é válido
 */
const isValidChapter = (chapterNum: number, maxChapters: number): boolean => {
  return chapterNum >= 1 && chapterNum <= maxChapters
}

/**
 * Verifica se um número pode ser parte de um número maior
 * Ex: se o usuário digitou "1" e o máximo é 50, pode ser "1", "10", "11", etc.
 */
const canBePartOfLargerNumber = (chapterNum: number, maxChapters: number): boolean => {
  return (chapterNum * 10) <= maxChapters
}

// ===== LÓGICA DE CAPÍTULO =====

/**
 * Processa a busca de capítulo e atualiza o estado
 */
const processChapterSearch = (search: string) => {
  if (!selectedBookInfo.value || !search) {
    clearChapterSelection()
    return
  }

  const chapterNum = parseInt(search)
  const maxChapters = selectedBookInfo.value.chapters

  // Se não é um número válido, limpa a seleção
  if (isNaN(chapterNum) || chapterNum < 1) {
    clearChapterSelection()
    return
  }

  // Se o número é maior que o máximo, move os dígitos extras para o versículo
  if (chapterNum > maxChapters) {
    clearChapterSelection()
    chapterSearch.value = ''
    moveToVerse(search)
    return
  }

  // Se o número é igual ao máximo, seleciona e move para o versículo
  if (chapterNum === maxChapters) {
    selectedChapter.value = chapterNum
    lastValidChapter.value = search
    focusInput(verseInputRef)
    return
  }

  // Capítulo válido
  selectedChapter.value = chapterNum
  lastValidChapter.value = search

  // Se não pode ser parte de um número maior, move o foco para o versículo
  if (!canBePartOfLargerNumber(chapterNum, maxChapters)) {
    nextTick(() => {
      if (chapterSearch.value === search && selectedChapter.value === chapterNum) {
        verseInputRef.value?.focus()
      }
    })
  }
}

// ===== HANDLERS DE INPUT =====

/**
 * Handler do input de livro
 */
const handleBookInput = () => {
  // Se não há valor, limpa a seleção
  if (!bookSearch.value) {
    clearBookSelection()
    return
  }

  const hasSelectedBook = selectedBook.value && selectedBookInfo.value

  if(!hasSelectedBook) return

  const normalizedInput = normalizeString(bookSearch.value)
  const normalizedBookName = normalizeString(selectedBookInfo.value.name)

  // Se não corresponde mais, limpa a seleção
  if (!normalizedBookName.startsWith(normalizedInput)) {
    clearBookSelection()
  }
}

/**
 * Handler do input de capítulo
 */
const handleChapterInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const numericValue = getNumericValue(target.value)

  // Se não há livro selecionado, apenas atualiza o valor
  if (!selectedBookInfo.value) {
    chapterSearch.value = numericValue
    target.value = numericValue
    return
  }

  const fullNumber = parseInt(numericValue)
  const maxChapters = selectedBookInfo.value.chapters

  // Se o número completo é maior que o máximo e há um capítulo válido anterior,
  // mantém o capítulo válido e move os dígitos extras para o versículo
  if (!isNaN(fullNumber) && fullNumber > maxChapters && lastValidChapter.value && selectedChapter.value) {
    const extraDigits = numericValue.slice(lastValidChapter.value.length)
    chapterSearch.value = lastValidChapter.value
    target.value = lastValidChapter.value
    moveToVerse(extraDigits)
    return
  }

  // Se o número é igual ao máximo mas tem dígitos extras, move os extras para o versículo
  if (!isNaN(fullNumber) && fullNumber === maxChapters && numericValue.length > String(maxChapters).length) {
    const extraDigits = numericValue.slice(String(maxChapters).length)
    chapterSearch.value = String(maxChapters)
    target.value = String(maxChapters)
    moveToVerse(extraDigits)
    return
  }

  // Atualiza o valor e processa a busca
  chapterSearch.value = numericValue
  target.value = numericValue
}

/**
 * Handler do input de versículo
 */
const handleVerseInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const numericValue = getNumericValue(target.value)
  verseSearch.value = numericValue
  target.value = numericValue
}

// ===== HANDLERS DE TECLADO =====

/**
 * Handler de teclas no campo de livro
 */
const handleBookKeydown = (e: KeyboardEvent) => {
  // Enter ou Tab: seleciona o primeiro livro ou vai para o capítulo
  const firstBook = filteredBooks.value[0]

  if (firstBook) {
    selectBook(firstBook)
  } else if (selectedBook.value) {
    chapterInputRef.value?.focus()
  }
}

/**
 * Handler de teclas no campo de capítulo
 */
const handleChapterKeydown = (e: KeyboardEvent) => {
  // Backspace vazio: volta para o livro
  if (!chapterSearch.value && e.key === 'Backspace' && selectedBook.value) {
    e.preventDefault()
    bookInputRef.value?.select()
    return
  }

  // Enter: vai para o versículo
  if (e.key === 'Enter') {
    e.preventDefault()
    if (selectedChapter.value || chapterSearch.value) {
      verseInputRef.value?.focus()
    }
  }

  // Escape: fecha o modal
  if (e.key === 'Escape') {
    close()
  }
}

/**
 * Handler de teclas no campo de versículo
 */
const handleVerseKeydown = (e: KeyboardEvent) => {
  // Backspace vazio: volta para o capítulo
  if (!verseSearch.value && e.key === 'Backspace' && selectedChapter.value) {
    e.preventDefault()
    chapterInputRef.value?.select()
    return
  }

  // Enter: navega para a referência
  if (e.key === 'Enter') {
    e.preventDefault()
    navigate()
  }

  // Escape: fecha o modal
  if (e.key === 'Escape') {
    close()
  }
}

// ===== FUNÇÕES PRINCIPAIS =====

/**
 * Carrega os capítulos com versículos do livro selecionado
 */
const loadChaptersWithVerses = (book: BookNameType) => {
  if (!versionStore.currentVersion) return

  chapterService.index(book, versionStore.currentVersion.id)
    .then(chapters => {
      chaptersWithVerses.value = chapters.map(c => ({
        number: c.number,
        verses_count: c.verses_count
      }))
    })
    .catch(console.error)
}

/**
 * Seleciona um livro
 */
const selectBook = (book: { key: BookNameType; info: BookInfo }) => {
  selectedBook.value = book.key
  bookSearch.value = book.info.name
  chaptersWithVerses.value = [] // Limpa antes de carregar novos

  loadChaptersWithVerses(book.key)
  focusInput(chapterInputRef)
}

/**
 * Abre o modal
 */
const open = (initialChar?: string) => {
  // Reseta todos os campos
  bookSearch.value = initialChar || ''
  chapterSearch.value = ''
  verseSearch.value = ''
  clearBookSelection()
  selectedChapter.value = null

  dialogRef.value?.showModal()

  // Foca no campo de livro após abrir
  nextTick(() => {
    bookInputRef.value?.focus()
    if (bookInputRef.value && initialChar) {
      const length = bookInputRef.value.value.length
      bookInputRef.value.setSelectionRange(length, length)
    }
  })
}

/**
 * Fecha o modal
 */
const close = () => {
  dialogRef.value?.close()
  
  // Limpa os campos após a animação
  setTimeout(() => {
    bookSearch.value = ''
    chapterSearch.value = ''
    verseSearch.value = ''
    clearBookSelection()
    selectedChapter.value = null
  }, 200)
}

/**
 * Navega para a referência bíblica selecionada
 */
const navigate = () => {
  if (!selectedBook.value || !selectedChapter.value) return

  const verse = verseSearch.value ? parseInt(verseSearch.value) : undefined
  goToChapter(selectedBook.value, selectedChapter.value, verse)
  close()
}

// ===== WATCHERS =====

// Auto-seleciona o livro se houver apenas um resultado na busca
watch(filteredBooks, (books) => {
  if (books.length === 1 && !selectedBook.value) {
    const book = books[0]

    if(!book) return

    selectBook(book)
  }
})

// Processa a busca de capítulo quando o valor muda
watch(chapterSearch, (search) => {
  processChapterSearch(search)
})

// ===== EXPOSE =====
defineExpose({
  open
})
</script>

<template>
  <dialog
    ref="dialogRef"
    class="modal modal-bottom sm:modal-middle"
    @click.self="close"
  >
    <div class="modal-box max-w-2xl sm:rounded-lg max-sm:max-w-full max-sm:h-[calc(100vh-4rem)] max-sm:mb-0 max-sm:mt-16 max-sm:rounded-b-none">
      <!-- Cabeçalho -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-lg">
          Pesquisar Referência Bíblica
        </h3>
        <button
          class="btn btn-sm btn-ghost btn-circle"
          @click="close"
        >
          <Icon icon="close" :size="20" />
        </button>
      </div>

      <!-- Campos de busca -->
      <div class="space-y-4">
        <!-- Campo de Livro -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Livro</span>
          </label>
          <div class="relative">
            <input
              ref="bookInputRef"
              v-model="bookSearch"
              type="text"
              placeholder="Digite o nome do livro..."
              class="input input-bordered w-full"
              @input="handleBookInput"
              @keydown.enter.prevent="handleBookKeydown"
              @keydown.tab.prevent="handleBookKeydown"
            />
            <!-- Lista de sugestões -->
            <div
              v-if="bookSearch && filteredBooks.length > 0 && !selectedBook"
              class="absolute z-10 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              <button
                v-for="book in filteredBooks"
                :key="book.key"
                class="w-full text-left px-4 py-2 hover:bg-base-200 transition-colors"
                @click="selectBook(book)"
              >
                {{ book.info.name }}
              </button>
            </div>
          </div>
        </div>

        <!-- Campo de Capítulo -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Capítulo</span>
            <span v-if="selectedBookInfo" class="label-text-alt text-base-content/60">
              (máx: {{ selectedBookInfo.chapters }})
            </span>
          </label>
          <input
            ref="chapterInputRef"
            :value="chapterSearch"
            type="text"
            inputmode="numeric"
            :placeholder="selectedBookInfo ? `Digite o capítulo (1-${selectedBookInfo.chapters})...` : 'Selecione um livro primeiro'"
            class="input input-bordered w-full"
            :disabled="!selectedBook"
            @input="handleChapterInput"
            @keydown="handleChapterKeydown"
          />
        </div>

        <!-- Campo de Versículo -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Versículo (opcional)</span>
            <span v-if="selectedChapterVerses > 0" class="label-text-alt text-base-content/60">
              (máx: {{ selectedChapterVerses }})
            </span>
          </label>
          <input
            ref="verseInputRef"
            :value="verseSearch"
            type="text"
            inputmode="numeric"
            :placeholder="selectedChapter ? `Digite o versículo (1-${selectedChapterVerses})...` : 'Selecione um capítulo primeiro'"
            class="input input-bordered w-full"
            :disabled="!selectedChapter"
            @input="handleVerseInput"
            @keydown="handleVerseKeydown"
          />
        </div>
      </div>

      <!-- Ações -->
      <div class="modal-action">
        <button
          class="btn btn-ghost"
          @click="close"
        >
          Cancelar
        </button>
        <button
          class="btn btn-primary"
          :disabled="!canNavigate"
          @click="navigate"
        >
          Navegar
        </button>
      </div>
    </div>
  </dialog>
</template>
