/** Always show chrome when the scroll position is at or below this value (px). */
export const HIDE_ON_SCROLL_TOP_THRESHOLD = 16

/**
 * Show chrome only when effectively at the bottom (px). Keep tiny for sub-pixel /
 * rounding noise — not a "near bottom" preview zone.
 */
export const HIDE_ON_SCROLL_BOTTOM_THRESHOLD = 2

/**
 * While pinned at the bottom, ignore downward movement. Release only after the
 * user scrolls this far up from the bottom (px).
 */
export const HIDE_ON_SCROLL_BOTTOM_RELEASE = 80

/** Minimum downward movement before hiding (px). Ignores 1–2px noise. */
export const HIDE_ON_SCROLL_DOWN_DELTA = 12

/**
 * Minimum upward movement (px) before velocity can reveal chrome.
 * Filters 1–2px jitter; reveal itself is gated by speed, not distance.
 */
export const HIDE_ON_SCROLL_UP_MIN_DELTA = 8

/**
 * Minimum upward speed (px/ms) before showing chrome.
 * Slow reading adjustments never reveal, regardless of distance.
 */
export const HIDE_ON_SCROLL_UP_VELOCITY = 1

export type HideOnScrollSnapshot = {
  scrollTop: number
  scrollHeight: number
  clientHeight: number
  lastScrollTop: number
  isVisible: boolean
  forceVisible: boolean
  /** Latched after reaching the bottom; cleared only after scrolling far enough up. */
  pinnedAtBottom: boolean
  /** `performance.now()` (or equivalent) for this scroll sample. */
  nowMs: number
  /** Timestamp of the previous sample used for velocity. */
  lastScrollTimeMs: number
}

export type HideOnScrollResult = {
  isVisible: boolean
  lastScrollTop: number
  lastScrollTimeMs: number
  changed: boolean
  pinnedAtBottom: boolean
}

/**
 * Pure hide-on-scroll decision. Does not read the window — callers pass the
 * scrolling container's metrics (e.g. the chapter overflow element).
 *
 * Hide is distance-based; show (while mid-chapter) is velocity-based so slow
 * upward reading adjustments do not bring chrome back.
 */
export function computeHideOnScroll(snapshot: HideOnScrollSnapshot): HideOnScrollResult {
  const {
    scrollTop,
    scrollHeight,
    clientHeight,
    lastScrollTop,
    isVisible,
    forceVisible,
    pinnedAtBottom,
    nowMs,
    lastScrollTimeMs,
  } = snapshot

  const maxScroll = Math.max(0, scrollHeight - clientHeight)

  // Rubber-band above the top: ignore without moving the baseline.
  if (scrollTop < 0) {
    return {
      isVisible,
      lastScrollTop,
      lastScrollTimeMs,
      changed: false,
      pinnedAtBottom,
    }
  }

  const isPastBottom = maxScroll > 0 && scrollTop > maxScroll
  if (isPastBottom) {
    return {
      isVisible: true,
      lastScrollTop: maxScroll,
      lastScrollTimeMs: nowMs,
      changed: !isVisible,
      pinnedAtBottom: true,
    }
  }

  const clamped = Math.min(Math.max(scrollTop, 0), maxScroll)
  const distanceFromBottom = maxScroll - clamped
  const atTop = clamped <= HIDE_ON_SCROLL_TOP_THRESHOLD
  const atBottom = maxScroll > 0 && distanceFromBottom <= HIDE_ON_SCROLL_BOTTOM_THRESHOLD

  if (forceVisible || atTop) {
    return {
      isVisible: true,
      lastScrollTop: clamped,
      lastScrollTimeMs: nowMs,
      changed: !isVisible,
      pinnedAtBottom: false,
    }
  }

  if (atBottom) {
    return {
      isVisible: true,
      lastScrollTop: clamped,
      lastScrollTimeMs: nowMs,
      changed: !isVisible,
      pinnedAtBottom: true,
    }
  }

  // Stay visible at the end until the user clearly scrolls up — never hide on
  // residual down movement in the post-layout gap.
  if (pinnedAtBottom) {
    const stillNearBottom = distanceFromBottom <= HIDE_ON_SCROLL_BOTTOM_RELEASE
    if (stillNearBottom) {
      return {
        isVisible: true,
        lastScrollTop: clamped,
        lastScrollTimeMs: nowMs,
        changed: false,
        pinnedAtBottom: true,
      }
    }

    return {
      isVisible,
      lastScrollTop: clamped,
      lastScrollTimeMs: nowMs,
      changed: false,
      pinnedAtBottom: false,
    }
  }

  const delta = clamped - lastScrollTop
  const elapsedMs = nowMs - lastScrollTimeMs
  const scrolledDownEnough = delta >= HIDE_ON_SCROLL_DOWN_DELTA

  if (scrolledDownEnough) {
    return {
      isVisible: false,
      lastScrollTop: clamped,
      lastScrollTimeMs: nowMs,
      changed: isVisible,
      pinnedAtBottom: false,
    }
  }

  const upwardSpeedPxPerMs = elapsedMs > 0 ? -delta / elapsedMs : 0
  const scrolledUpEnough = delta <= -HIDE_ON_SCROLL_UP_MIN_DELTA
  const isFastUpwardFlick =
    scrolledUpEnough && upwardSpeedPxPerMs >= HIDE_ON_SCROLL_UP_VELOCITY

  if (isFastUpwardFlick) {
    return {
      isVisible: true,
      lastScrollTop: clamped,
      lastScrollTimeMs: nowMs,
      changed: !isVisible,
      pinnedAtBottom: false,
    }
  }

  // Upward/noise: refresh baselines for the next velocity sample.
  // Small downward moves while visible keep lastScrollTop so hide can accumulate.
  const shouldAdvanceBaseline = delta < 0 || !isVisible || delta === 0

  return {
    isVisible,
    lastScrollTop: shouldAdvanceBaseline ? clamped : lastScrollTop,
    lastScrollTimeMs: nowMs,
    changed: false,
    pinnedAtBottom: false,
  }
}
