export type WaitForScrollEndOptions = {
  signal?: AbortSignal
  /** Consecutive rAF frames with unchanged scrollTop after motion (or idle). */
  stableFrames?: number
  /** Frames with no scrollTop change before treating as "already settled". */
  idleFramesBeforeStart?: number
}

const DEFAULT_STABLE_FRAMES = 3
const DEFAULT_IDLE_FRAMES_BEFORE_START = 5

/**
 * Resolves when `scroller` finishes scrolling.
 * Prefers the `scrollend` event; falls back to rAF scrollTop stability
 * (works on older / low-end mobile browsers without wall-clock timeouts).
 */
export function waitForScrollEnd(
  scroller: HTMLElement,
  options: WaitForScrollEndOptions = {},
): Promise<void> {
  const {
    signal,
    stableFrames = DEFAULT_STABLE_FRAMES,
    idleFramesBeforeStart = DEFAULT_IDLE_FRAMES_BEFORE_START,
  } = options

  if (signal?.aborted) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let settled = false
    let rafId = 0
    let lastScrollTop = scroller.scrollTop
    let stableCount = 0
    let sawChange = false
    let idleBeforeStart = 0

    const onScrollEnd = () => finish()

    function cleanup() {
      scroller.removeEventListener('scrollend', onScrollEnd)
      cancelAnimationFrame(rafId)
      signal?.removeEventListener('abort', finish)
    }

    function finish() {
      if (settled) return

      settled = true
      cleanup()
      resolve()
    }

    function tick() {
      if (settled) return

      const current = scroller.scrollTop

      if (current !== lastScrollTop) {
        sawChange = true
        stableCount = 0
        idleBeforeStart = 0
        lastScrollTop = current
      }
      else if (sawChange) {
        stableCount += 1

        if (stableCount >= stableFrames) {
          finish()
          return
        }
      }
      else {
        idleBeforeStart += 1

        if (idleBeforeStart >= idleFramesBeforeStart) {
          finish()
          return
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    signal?.addEventListener('abort', finish)
    scroller.addEventListener('scrollend', onScrollEnd)
    rafId = requestAnimationFrame(tick)
  })
}
