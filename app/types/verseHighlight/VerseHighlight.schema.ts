import { z } from 'zod'

export const verseHighlightSchema = z.object({
  color: z.string(),
  date: z.string(),
})

export const verseHighlightsSchema = z.record(z.string(), verseHighlightSchema)

export const verseHighlightsStorageSchema = z.record(z.string(), verseHighlightsSchema)
