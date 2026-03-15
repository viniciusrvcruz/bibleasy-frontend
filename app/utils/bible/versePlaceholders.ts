/**
 * Placeholder patterns used in verse text: {{slug}} = reference, [[slug]] = title.
 * Single source of truth for parsing and stripping these markers.
 */

const REFERENCE_PLACEHOLDER_SOURCE = /\{\{(\w+)\}\}/.source
const TITLE_PLACEHOLDER_SOURCE = /\[\[(\w+)\]\]/.source

const REFERENCE_REPLACE_SOURCE = /\{\{\w+\}\}/.source
const TITLE_REPLACE_SOURCE = /\[\[\w+\]\]/.source

/** Patterns for matchAll (with slug capture). New RegExp per use to avoid shared lastIndex. */
export const VERSE_PLACEHOLDER_PATTERNS = [
  { patternSource: REFERENCE_PLACEHOLDER_SOURCE, type: 'reference' as const },
  { patternSource: TITLE_PLACEHOLDER_SOURCE, type: 'title' as const },
] as const

/** Removes {{slug}} and [[slug]] placeholders from verse text (e.g. for plain copy). */
export function stripVersePlaceholders(text: string): string {
  return text
    .replace(new RegExp(REFERENCE_REPLACE_SOURCE, 'g'), '')
    .replace(new RegExp(TITLE_REPLACE_SOURCE, 'g'), '')
    .replace(/\s+/g, ' ')
    .trim()
}
