export const useVerseFocus = (
  containerRef: Ref<HTMLElement | null>,
  verseNumber: Ref<number | null> | ComputedRef<number | null>,
  onClearFocus?: () => void
) => {
  const focusedVerseNumber = ref<number | null>(null)
  let scrollTimeout: ReturnType<typeof setTimeout> | null = null
  let isScrollingToVerse = false

  const overlayHeight = computed(() => {
    if (!focusedVerseNumber.value || !containerRef.value) return 0

    return containerRef.value.scrollHeight
  })

  const resetScrollTimeout = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout)

    scrollTimeout = setTimeout(() => {
      scrollTimeout = null
      isScrollingToVerse = false
    }, 500)
  }

  const clearFocus = () => {
    focusedVerseNumber.value = null

    if (verseNumber.value) onClearFocus?.()
  }

  const focusVerse = () => {
    if (!verseNumber.value || !containerRef.value) return clearFocus()

    const container = containerRef.value

    // Don't focus verse 1 or if the content doesn't need to be scrolled
    if (verseNumber.value === 1 || container.scrollHeight <= container.clientHeight) {
      return clearFocus()
    }

    const verseElement = container.querySelector(`#v${verseNumber.value}`)
    if (!verseElement) return

    isScrollingToVerse = true
    focusedVerseNumber.value = verseNumber.value
    verseElement.scrollIntoView({ behavior: 'smooth' })
    resetScrollTimeout()
  }

  const handleVerseFocus = () => {
    verseNumber.value ? focusVerse() : clearFocus()
  }

  const handleScroll = () => {
    if (isScrollingToVerse || scrollTimeout) return resetScrollTimeout()

    if (focusedVerseNumber.value) clearFocus()
  }

  watch(verseNumber, handleVerseFocus)

  return {
    focusedVerseNumber,
    overlayHeight,
    handleScroll,
    handleVerseFocus,
    clearFocus
  }
}
