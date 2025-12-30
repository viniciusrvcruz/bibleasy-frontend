import { z } from 'zod'

export interface VerseHistory {
  book: string
  bookName: string
  chapter: number
  verse: number
  timestamp: number
}

export const verseHistorySchema = z.object({
  book: z.string(),
  bookName: z.string(),
  chapter: z.number(),
  verse: z.number(),
  timestamp: z.number()
})

export const verseHistoryArraySchema = z.array(verseHistorySchema)
