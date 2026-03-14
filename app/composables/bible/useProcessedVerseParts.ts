import type { VerseReference } from '~/types/verseReference/VerseReference.type'
import type { VerseTitle } from '~/types/verseTitle/verseTitle.type'

export type TextPart = { type: 'text'; content: string }
export type ReferencePart = { type: 'reference'; reference: VerseReference }
export type TitlePart = { type: 'title'; title: VerseTitle }
export type ProcessedPart = TextPart | ReferencePart | TitlePart

const PLACEHOLDER_PATTERNS = [
  { pattern: /\{\{(\w+)\}\}/g, type: 'reference' },
  { pattern: /\[\[(\w+)\]\]/g, type: 'title' },
] as const

function buildReferenceMap(references: VerseReference[]): Map<string, VerseReference> {
  return new Map(references.map(ref => [ref.slug, ref]))
}

function createTextPart(content: string): TextPart {
  return { type: 'text', content }
}

function createReferencePart(reference: VerseReference): ReferencePart {
  return { type: 'reference', reference }
}

function createTitlePart(title: VerseTitle): TitlePart {
  return { type: 'title', title }
}

type Match = { index: number; length: number; type: 'reference'; slug: string }
  | { index: number; length: number; type: 'title'; slug: string }

function collectMatches(text: string): Match[] {
  const matches: Match[] = []

  for (const { pattern, type } of PLACEHOLDER_PATTERNS) {
    for (const m of text.matchAll(pattern)) {
      const slug = m[1]

      if (!slug) continue

      matches.push({
        index: m.index,
        length: m[0].length,
        type,
        slug,
      })
    }
  }

  return matches.sort((a, b) => a.index - b.index)
}

function buildTitleMap(titles: VerseTitle[]): Map<string, VerseTitle> {
  return new Map(titles.filter(t => t.slug).map(t => [t.slug!, t]))
}

/**
 * Processes text: {{slug}} → reference, [[slug]] → title (when titles provided).
 * Used by verses (text + refs + titles) and by title components (text + refs only).
 */
export function useProcessedVerseParts(
  text: MaybeRefOrGetter<string>,
  references: MaybeRefOrGetter<VerseReference[] | undefined>,
  titles?: MaybeRefOrGetter<VerseTitle[] | undefined>
) {
  const processedText = computed<ProcessedPart[]>(() => {
    const textValue = toValue(text)
    const refs = toValue(references)
    const titlesList = toValue(titles)

    const referenceMap = buildReferenceMap(refs ?? [])
    const titleMap = buildTitleMap(titlesList ?? [])
    const parts: ProcessedPart[] = []
    let lastIndex = 0
    const matches = collectMatches(textValue)

    for (const match of matches) {
      // Text before the match
      if (match.index > lastIndex) {
        parts.push(createTextPart(textValue.slice(lastIndex, match.index)))
      }

      if (match.type === 'reference') {
        const reference = referenceMap.get(match.slug)
        if (reference) parts.push(createReferencePart(reference))
      } else {
        const title = titleMap.get(match.slug)
        if (title) parts.push(createTitlePart(title))
      }

      lastIndex = match.index + match.length
    }

    // Remaining text after the last match
    if (lastIndex < textValue.length) {
      parts.push(createTextPart(textValue.slice(lastIndex)))
    }

    return parts
  })

  return { processedText }
}
