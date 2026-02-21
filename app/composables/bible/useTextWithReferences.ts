import type { VerseReference } from '~/types/verseReference/VerseReference.type'

export type TextPart = { type: 'text'; content: string }
export type ReferencePart = { type: 'reference'; reference: VerseReference }
export type ProcessedPart = TextPart | ReferencePart

// Pattern for {{slug}} placeholders in text
const REFERENCE_PATTERN = /\{\{(\w+)\}\}/g

function buildReferenceMap(references: VerseReference[]): Map<string, VerseReference> {
  return new Map(references.map(ref => [ref.slug, ref]))
}

function createTextPart(content: string): TextPart {
  return { type: 'text', content }
}

function createReferencePart(reference: VerseReference): ReferencePart {
  return { type: 'reference', reference }
}

/**
 * Processes text by replacing {{slug}} placeholders with reference parts.
 * Used by both verses and titles that share the same references array.
 */
export function useTextWithReferences(
  text: MaybeRefOrGetter<string>,
  references: MaybeRefOrGetter<VerseReference[] | undefined>
) {
  const processedText = computed<ProcessedPart[]>(() => {
    const textValue = toValue(text)
    const refs = toValue(references)

    if (!refs?.length) {
      return [createTextPart(textValue)]
    }

    const referenceMap = buildReferenceMap(refs)
    const parts: ProcessedPart[] = []
    let lastIndex = 0

    for (const match of textValue.matchAll(REFERENCE_PATTERN)) {
      const [fullMatch, slug] = match
      const matchIndex = match.index ?? 0

      // Text before the match
      if (matchIndex > lastIndex) {
        parts.push(createTextPart(textValue.slice(lastIndex, matchIndex)))
      }

      // Add reference only if found by slug
      const reference = slug ? referenceMap.get(slug) : undefined
      if (reference) {
        parts.push(createReferencePart(reference))
      }

      lastIndex = matchIndex + fullMatch.length
    }

    // Remaining text after the last match
    if (lastIndex < textValue.length) {
      parts.push(createTextPart(textValue.slice(lastIndex)))
    }

    return parts
  })

  return { processedText }
}
