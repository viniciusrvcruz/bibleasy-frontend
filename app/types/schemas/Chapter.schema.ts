import { z } from 'zod'
import { BookNameEnum } from '../enums/Book.enum'

export const ChapterSchema = z.object({
  book: z.enum(BookNameEnum),
  chapter: z.number().int().positive(),
})

