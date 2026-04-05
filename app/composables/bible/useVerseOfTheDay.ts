import { getBookAbbreviation, type BookAbbreviationType } from '~/utils/bible/book'
import { verses, type PassageId } from '~/data/verseOfTheDay'

export type ParsedPassageId = {
  book: BookAbbreviationType
  chapter: number
  startVerse: number
  endVerse: number
}

export function useVerseOfTheDay() {
  const getDayOfYear = () => {
    const now = new Date()

    const start = Date.UTC(now.getUTCFullYear(), 0, 0)
    const today = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    )

    const diff = today - start
    const oneDay = 1000 * 60 * 60 * 24

    return Math.floor(diff / oneDay)
  }

  const getTodayVerse = () => {
    const day = getDayOfYear()

    return verses.find(verse => verse.day === day) || verses[0]
  }

  /** `book.chapter.verse` or `book.chapter.start-end` — `PassageId` comes from the literals in `verseOfTheDay`. */
  const parsePassageId = (passageId: PassageId): ParsedPassageId => {
    const [ bookRaw, chapterRaw, verseRaw ] = passageId.split('.')

    const book = getBookAbbreviation(bookRaw ?? '')

    const [startStr, endStr] = verseRaw?.split('-') ?? []
    const startVerse = Number(startStr)
    const endVerse = endStr !== undefined ? Number(endStr) : startVerse

    return {
      book: book!,
      chapter: Number(chapterRaw),
      startVerse,
      endVerse,
    }
  }

  return {
    getTodayVerse,
    parsePassageId
  }
}
