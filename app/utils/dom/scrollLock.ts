const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
  'Spacebar',
])

export type ScrollLockHandle = {
  release: () => void
}

/**
 * Blocks user-driven scrolling (wheel, touch, keyboard) until `release` is called.
 * Uses capture + non-passive listeners so mobile browsers honor preventDefault.
 */
export function lockUserScroll(
  target: Document | HTMLElement = document,
): ScrollLockHandle {
  const prevent = (event: Event) => {
    event.preventDefault()
  }

  const preventScrollKey = (event: Event) => {
    if (!(event instanceof KeyboardEvent)) return
    if (!SCROLL_KEYS.has(event.key)) return

    event.preventDefault()
  }

  const options: AddEventListenerOptions = { capture: true, passive: false }

  target.addEventListener('wheel', prevent, options)
  target.addEventListener('touchmove', prevent, options)
  target.addEventListener('keydown', preventScrollKey, options)

  return {
    release: () => {
      target.removeEventListener('wheel', prevent, options)
      target.removeEventListener('touchmove', prevent, options)
      target.removeEventListener('keydown', preventScrollKey, options)
    },
  }
}
