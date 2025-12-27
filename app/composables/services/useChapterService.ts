import type { BookNameEnum } from '~/types/book/Book.enum'

interface ChapterResponse {
  id: number
  number: number
  position: number
  verses_count: number
}

export function useChapterService() {
  const api = useApi()

  const index = (book: BookNameEnum, version_id: number) => {
    return api.get<ChapterResponse[]>(`books/${book}/chapters`, { version_id })
  }

  return {
    index,
  }
}