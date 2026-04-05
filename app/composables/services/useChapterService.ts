import type { BookAbbreviationType } from '~/utils/bible/book'
import type { Chapter } from '~/types/chapter/Chapter.type'

export function chapterResourcePath(
  book: BookAbbreviationType,
  chapter: number,
  version_id: number
) {
  return `versions/${version_id}/books/${book}/chapters/${chapter}`
}

export function useChapterService() {
  const useShow = (book: BookAbbreviationType, chapter: number, version_id: number) => {
    return useApiFetch<Chapter>(
      chapterResourcePath(book, chapter, version_id)
    )
  }

  return {
    useShow,
  }
}