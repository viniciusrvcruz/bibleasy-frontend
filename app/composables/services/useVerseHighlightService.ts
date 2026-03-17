import type { VerseHighlights, VerseHighlightsStorage } from '~/types/verseHighlight/VerseHighlight.type'
import { verseHighlightsStorageSchema } from '~/types/verseHighlight/VerseHighlight.schema'

const STORAGE_KEY = 'verse-highlights'

function normalizeChapterKey(chapterKey: string): string {
  return chapterKey.toUpperCase()
}

export function useVerseHighlightService() {
  const loadAll = (): VerseHighlightsStorage => {
    if (!import.meta.client) return {}

    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) return {}

    try {
      const parsed = JSON.parse(stored) as unknown
      return verseHighlightsStorageSchema.parse(parsed)
    } catch {
      localStorage.removeItem(STORAGE_KEY)
      return {}
    }
  }

  const saveAll = (data: VerseHighlightsStorage) => {
    if (!import.meta.client) return

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  const getChapterHighlights = (chapterKey: string): VerseHighlights => {
    const data = loadAll()
    const normalized = normalizeChapterKey(chapterKey)
    return data[normalized] ?? {}
  }

  const setVerseHighlights = (
    chapterKey: string,
    verseNumbers: number[],
    color: string
  ) => {
    if (!import.meta.client || verseNumbers.length === 0) return

    const data = loadAll()
    const normalized = normalizeChapterKey(chapterKey)
    const chapter = { ...(data[normalized] ?? {}) }
    const date = new Date().toISOString()

    for (const num of verseNumbers) {
      chapter[String(num)] = { color, date }
    }

    data[normalized] = chapter
    saveAll(data)
  }

  const removeVerseHighlights = (chapterKey: string, verseNumbers: number[]) => {
    if (!import.meta.client || verseNumbers.length === 0) return

    const data = loadAll()
    const normalized = normalizeChapterKey(chapterKey)
    const chapter = data[normalized]

    if (!chapter) return

    const updated = { ...chapter }

    for (const num of verseNumbers) {
      delete updated[String(num)]
    }

    if (Object.keys(updated).length === 0) {
      delete data[normalized]
    } else {
      data[normalized] = updated
    }

    saveAll(data)
  }

  const removeVerseHighlightsByColor = (
    chapterKey: string,
    verseNumbers: number[],
    color: string
  ) => {
    if (!import.meta.client || verseNumbers.length === 0) return

    const data = loadAll()
    const normalized = normalizeChapterKey(chapterKey)
    const chapter = data[normalized]

    if (!chapter) return

    const updated = { ...chapter }

    for (const num of verseNumbers) {
      const entry = updated[String(num)]

      if (entry?.color === color) {
        delete updated[String(num)]
      }
    }

    if (Object.keys(updated).length === 0) {
      delete data[normalized]
    } else {
      data[normalized] = updated
    }

    saveAll(data)
  }

  return {
    loadAll,
    getChapterHighlights,
    setVerseHighlights,
    removeVerseHighlights,
    removeVerseHighlightsByColor,
  }
}
