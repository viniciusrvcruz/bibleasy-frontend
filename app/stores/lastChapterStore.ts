import { BookAbbreviation, getBookAbbreviation, type BookAbbreviationType } from '~/utils/bible/book'

interface LastChapterReference {
  book: BookAbbreviationType
  chapter: number
  version?: string
}

export const useLastChapterStore = defineStore('lastChapter', () => {
  // 1 year in seconds
  const lastChapterReference = useCookie<string | null>('last-chapter-reference', {
    maxAge: 60 * 60 * 24 * 365,
  })

  const parsedReference = computed<LastChapterReference | null>(() => {
    if (!lastChapterReference.value) return null

    const parts = lastChapterReference.value.split('.')
    const [bookParam, chapterParam, versionParam] = parts

    const book = getBookAbbreviation(bookParam ?? '') ?? BookAbbreviation.jhn
    const chapter = Number(chapterParam) || 1
    const version = versionParam && versionParam.length > 0 ? versionParam : undefined

    return { book, chapter, version }
  })

  const setLastChapter = (
    book: BookAbbreviationType,
    chapter: number,
    version?: string,
  ) => {
    lastChapterReference.value = version && version?.length > 0
      ? `${book}.${chapter}.${version}`
      : `${book}.${chapter}`
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
