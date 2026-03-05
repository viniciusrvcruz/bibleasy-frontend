import { BookAbbreviation } from '~/utils/book'

export const useNavigateToBible = () => {
  const versionStore = useVersionStore()
  const lastChapterStore = useLastChapterStore()

  const lastChapterUrl = computed(() => {
    const lastChapter = lastChapterStore.parsedReference

    if (lastChapter) {
      return getChapterUrl(lastChapter.book, lastChapter.chapter, lastChapter.version)
    }

    return getChapterUrl(BookAbbreviation.jhn, 1)
  })

  const getChapterUrl = (
    book: string,
    chapter: number,
    versionAbbreviation?: string,
  ) => {
    const version =
      versionAbbreviation ??
      versionStore.currentVersion?.abbreviation ??
      ''
    const versionSuffix = version ? `.${version}` : ''

    return `/bible/${book}.${chapter}${versionSuffix}`
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
      const url = getChapterUrl(
        lastChapter.book,
        lastChapter.chapter,
        lastChapter.version,
      )
      await navigateTo({ path: url, replace })
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

