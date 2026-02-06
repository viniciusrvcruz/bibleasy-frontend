import { BookAbbreviation, getBookAbbreviation, type BookAbbreviationType } from '~/utils/book'

interface LastChapterReference {
  book: BookAbbreviationType
  chapter: number
}

export const useLastChapterStore = defineStore('lastChapter', () => {
  // 1 year in seconds
  const lastChapterReference = useCookie<string | null>('last-chapter-reference', {
    maxAge: 60 * 60 * 24 * 365,
  })

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
