import { z } from 'zod'
import { BookNameEnum } from '../book/Book.enum'

export const verseSchema = z.object({
  id: z.int(),
  number: z.int(),
  text: z.string(),
})

export const verseSelectionSchema = z.object({
  book: z.enum(BookNameEnum),
  chapter: z.number().int().positive(),
  verse: z.number().int().positive(),
})
