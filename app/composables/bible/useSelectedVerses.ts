import type { Verse } from '~/types/verse/Verse.type'
import { stripVersePlaceholders } from '~/utils/bible/versePlaceholders'

export interface CopySelectedVersesParams {
  verses: Verse[]
  bookName: string
  chapter: number
  bookAbbreviation: string
  versionAbbreviation: string
}

/**
 * Formats an array of verse numbers into a reference string.
 * Groups consecutive numbers into ranges (e.g. 1,2,3 -> "1-3").
 * Non-consecutive groups are separated by commas (e.g. "1-3,5-7,10").
 */
export function formatVerseReference(numbers: number[]): string {
  if (numbers.length === 0) return ''

  const sorted = [...numbers].sort((a, b) => a - b)
  const ranges: string[] = []
  let rangeStart = sorted[0]!
  let rangeEnd = sorted[0]!

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i]!

    if (current === rangeEnd + 1) {
      rangeEnd = current
    } else {
      ranges.push(rangeStart === rangeEnd ? String(rangeStart) : `${rangeStart}-${rangeEnd}`)
      rangeStart = current
      rangeEnd = current
    }
  }

  ranges.push(rangeStart === rangeEnd ? String(rangeStart) : `${rangeStart}-${rangeEnd}`)

  return ranges.join(',')
}

export function useSelectedVerses() {
  const selectedVerses = ref<number[]>([])

  const selectedVersesSet = computed(() => new Set(selectedVerses.value))

  const hasSelection = computed(() => selectedVerses.value.length > 0)

  const toggleVerse = (verseNumber: number) => {
    const set = new Set(selectedVerses.value)

    set.has(verseNumber)
      ? set.delete(verseNumber)
      : set.add(verseNumber)

    selectedVerses.value = Array.from(set).sort((a, b) => a - b)
  }

  const clearSelection = () => {
    selectedVerses.value = []
  }

  const formattedReference = (bookName: string, chapter: number) => {
    if (selectedVerses.value.length === 0) return ''

    return `${bookName} ${chapter}:${formatVerseReference(selectedVerses.value)}`
  }

  const copySelectedVerses = async (
    params: CopySelectedVersesParams
  ): Promise<boolean> => {
    if (selectedVerses.value.length === 0) return false

    const {
      verses,
      bookName,
      chapter,
      bookAbbreviation,
      versionAbbreviation,
    } = params

    const versesMap = new Map(verses.map((v) => [v.number, v.text]))
    const orderedNumbers = selectedVerses.value
      .filter((num) => versesMap.has(num))
      .sort((a, b) => a - b)

    const verseRangeStr = formatVerseReference(orderedNumbers)
    const verseTexts = orderedNumbers
      .map((num) => {
        const rawText = versesMap.get(num)!
        const plainText = stripVersePlaceholders(rawText)
        return `[${num}] ${plainText}`
      })
      .join(' ')

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://bibleasy.com'
    const shareUrl = `${origin}/bible/${bookAbbreviation}.${chapter}.${versionAbbreviation}`

    const textToCopy = [
      `'${verseTexts}'`,
      '',
      `${bookName} ${chapter}:${verseRangeStr} (${versionAbbreviation})`,
      shareUrl,
    ].join('\n')

    try {
      await navigator.clipboard.writeText(textToCopy)
      return true
    } catch {
      return false
    }
  }

  return {
    selectedVerses,
    selectedVersesSet,
    hasSelection,
    toggleVerse,
    clearSelection,
    formattedReference,
    copySelectedVerses,
    formatVerseReference,
  }
}
