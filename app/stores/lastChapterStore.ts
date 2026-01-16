import { BookAbbreviation, getBookAbbreviation, type BookAbbreviationType } from '~/utils/book'

interface LastChapterReference {
  book: BookAbbreviationType
  chapter: number
}

export const useLastChapterStore = defineStore('lastChapter', () => {
  const lastChapterReference = useCookie<string | null>('last-chapter-reference')

  const parsedReference = computed<LastChapterReference | null>(() => {
    if (!lastChapterReference.value) return null

    const [bookParam, chapterParam] = lastChapterReference.value.split('.')

    const book = getBookAbbreviation(bookParam ?? '') ?? BookAbbreviation.jhn
    const chapter = Number(chapterParam) || 1

    return { book, chapter }
  })

  const setLastChapter = (book: BookAbbreviationType, chapter: number) => {
    lastChapterReference.value = `${book}.${chapter}`
  }

  const clearLastChapter = () => {
    lastChapterReference.value = null
  }

  return {
    lastChapterReference,
    parsedReference,
    setLastChapter,
    clearLastChapter,
  }
})
