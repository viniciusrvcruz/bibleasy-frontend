import { BookAbbreviation } from '~/utils/book'

export const useNavigateToBible = () => {
  const versionStore = useVersionStore()
  const lastChapterStore = useLastChapterStore()

  const lastChapterUrl = computed(() => {
    const lastChapter = lastChapterStore.parsedReference

    if (lastChapter) {
      return getChapterUrl(lastChapter.book, lastChapter.chapter)
    }

    return getChapterUrl(BookAbbreviation.jhn, 1)
  })

  const getChapterUrl = (book: string, chapter: number) => {
    const version = versionStore.currentVersion
      ? `.${versionStore.currentVersion.abbreviation}`
      : ''

    return `/bible/${book}.${chapter}${version}`
  }

  const goToChapter = async (
    book: string,
    chapter: number,
    verse?: number,
    replace: boolean = false,
  ) => {
    const hash = verse && verse > 1
      ? `#v${verse}`
      : undefined

    await navigateTo({
      path: getChapterUrl(book, chapter),
      hash,
      replace,
    })
  }

  const goToLastChapter = async (replace: boolean = false) => {
    const lastChapter = lastChapterStore.parsedReference

    if (lastChapter) {
      await goToChapter(lastChapter.book, lastChapter.chapter, 1, replace)
    } else {
      await goToChapter(BookAbbreviation.jhn, 1, 1, replace)
    }
  }

  return {
    lastChapterUrl,
    getChapterUrl,
    goToChapter,
    goToLastChapter,
  }
}

