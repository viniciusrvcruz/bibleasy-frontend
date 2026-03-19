import type { MaybeRefOrGetter } from 'vue'
import type { VerseHighlights, VerseHighlight } from '~/types/verseHighlight/VerseHighlight.type'
import { toValue } from 'vue'
import { useVerseHighlightService } from '~/composables/services/useVerseHighlightService'

export function useVerseHighlights(
  chapterKey: string,
  selectedVerses: MaybeRefOrGetter<number[]>
) {
  const service = useVerseHighlightService()
  const chapterHighlights = ref<VerseHighlights>({})

  const loadHighlights = () => {
    if (!import.meta.client) return

    chapterHighlights.value = service.getChapterHighlights(chapterKey)
  }

  const getVerseHighlight = (verseNumber: number): VerseHighlight | null => {
    const entry = chapterHighlights.value[String(verseNumber)]
    return entry ?? null
  }

  const getVerseHighlightColor = (verseNumber: number): string | null => {
    const entry = getVerseHighlight(verseNumber)
    return entry?.color ?? null
  }

  const highlightVerses = (verseNumbers: number[], color: string) => {
    service.setVerseHighlights(chapterKey, verseNumbers, color)
    loadHighlights()
  }

  const removeHighlights = (verseNumbers: number[]) => {
    service.removeVerseHighlights(chapterKey, verseNumbers)
    loadHighlights()
  }

  const removeHighlightsByColor = (verseNumbers: number[], color: string) => {
    service.removeVerseHighlightsByColor(chapterKey, verseNumbers, color)
    loadHighlights()
  }

  const activeColors = computed(() => {
    const selected = toValue(selectedVerses)
    const colors = new Set<string>()

    for (const num of selected) {
      const color = getVerseHighlightColor(num)

      if (color) colors.add(color)
    }

    return colors
  })

  return {
    chapterHighlights,
    loadHighlights,
    getVerseHighlight,
    getVerseHighlightColor,
    highlightVerses,
    removeHighlights,
    removeHighlightsByColor,
    activeColors,
  }
}
