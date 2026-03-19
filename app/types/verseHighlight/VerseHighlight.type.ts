import type { z } from 'zod'
import { verseHighlightSchema, verseHighlightsSchema, verseHighlightsStorageSchema } from './VerseHighlight.schema'

export type VerseHighlight = z.infer<typeof verseHighlightSchema>

export type VerseHighlights = z.infer<typeof verseHighlightsSchema>

export type VerseHighlightsStorage = z.infer<typeof verseHighlightsStorageSchema>
