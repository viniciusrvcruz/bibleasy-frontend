import { lockUserScroll, type ScrollLockHandle } from '~/utils/dom/scrollLock'
import { waitForScrollEnd } from '~/utils/dom/waitForScrollEnd'

export const useVerseFocus = (
  containerRef: Ref<HTMLElement | null>,
  verseNumber: Ref<number | null> | ComputedRef<number | null>,
  onClearFocus?: () => void
) => {
  const focusedVerseNumber = ref<number | null>(null)
  let isScrollingToVerse = false
  let scrollLock: ScrollLockHandle | null = null
  let scrollAbortController: AbortController | null = null

  const overlayHeight = computed(() => {
    if (!focusedVerseNumber.value || !containerRef.value) return 0

    return containerRef.value.scrollHeight
  })

  const releaseProgrammaticScroll = () => {
    scrollAbortController?.abort()
    scrollAbortController = null
    scrollLock?.release()
    scrollLock = null
    isScrollingToVerse = false
  }

  const clearFocus = () => {
    focusedVerseNumber.value = null

    if (verseNumber.value) onClearFocus?.()
  }

  const focusVerseByNumber = (targetVerseNumber: number, shouldScrollIntoVerse = true) => {
    if (!containerRef.value) return

    const verseElement = containerRef.value.querySelector(`#v${targetVerseNumber}`)
    if (!(verseElement instanceof HTMLElement)) return

    focusedVerseNumber.value = targetVerseNumber

    if (!shouldScrollIntoVerse) return

    // Always scrollIntoView (default block: 'start') so near-top verses like v2
    // still align under the reader chrome — "already visible" is not "already focused".
    // waitForScrollEnd unlocks quickly when scrollTop does not move.
    releaseProgrammaticScroll()

    const container = containerRef.value
    isScrollingToVerse = true
    scrollLock = lockUserScroll()
    scrollAbortController = new AbortController()

    const { signal } = scrollAbortController

    verseElement.scrollIntoView({ behavior: 'smooth' })

    waitForScrollEnd(container, { signal }).then(() => {
      if (signal.aborted) return

      scrollAbortController = null
      scrollLock?.release()
      scrollLock = null
      isScrollingToVerse = false
    })
  }

  const focusVerse = () => {
    if (!verseNumber.value || !containerRef.value) return clearFocus()

    const container = containerRef.value

    // Don't focus verse 1 or if the content doesn't need to be scrolled
    if (verseNumber.value === 1 || container.scrollHeight <= container.clientHeight) {
      return clearFocus()
    }

    focusVerseByNumber(verseNumber.value)
  }

  const handleVerseFocus = () => {
    verseNumber.value ? focusVerse() : clearFocus()
  }

  const handleScroll = () => {
    if (isScrollingToVerse) return

    if (focusedVerseNumber.value) clearFocus()
  }

  watch(verseNumber, handleVerseFocus)

  onScopeDispose(() => {
    releaseProgrammaticScroll()
  })

  return {
    focusedVerseNumber,
    overlayHeight,
    handleScroll,
    handleVerseFocus,
    focusVerseByNumber,
    clearFocus
  }
}
