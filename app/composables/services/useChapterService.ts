import type { BookAbbreviationType } from '~/utils/book'
import type { Chapter } from '~/types/chapter/Chapter.type'

export function useChapterService() {
  const show = (book: BookAbbreviationType, chapter: number, version_id: number) => {
    return useApiFetch<Chapter>(
      `versions/${version_id}/books/${book}/chapters/${chapter}`
    )
  }

  return {
    show,
  }
}