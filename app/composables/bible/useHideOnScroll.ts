import type { CookieRef } from '#app'
import type { MaybeRefOrGetter } from 'vue'
import { computeHideOnScroll } from '~/utils/bible/hideOnScroll'
import { useFullscreen } from '~/composables/bible/useBibleFullscreen'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

/** Visual hide (transform). Independent from layout expansion to avoid bottom flicker. */
export const READER_CHROME_HIDDEN_CLASS = 'reader-chrome-hidden'

/**
 * Collapse the 4rem app-header gap while chrome is tucked away.
 * Toggled in lockstep with reader-chrome-hidden (expanded ⇔ chrome hidden).
 */
export const READER_LAYOUT_EXPANDED_CLASS = 'reader-layout-expanded'

/** Headers that slide away with hide-on-scroll and must leave the a11y tree when hidden. */
export const HIDE_ON_SCROLL_A11Y_SELECTOR =
  '.hide-on-scroll-app-header, .hide-on-scroll-chapter-header'

const areHeadersVisible = ref(true)
const isLayoutExpanded = ref(false)

/** User preference: hide chrome while scrolling (chapter more-menu toggle). */
let enabledCookie: CookieRef<boolean> | null = null

let boundElement: HTMLElement | null = null
let lastScrollTop = 0
let lastScrollTimeMs = 0
let pinnedAtBottom = false
let ignoreScrollEvents = false
let ignoreScrollTimeout: ReturnType<typeof setTimeout> | null = null
let resizeObserver: ResizeObserver | null = null
let drawerToggle: HTMLInputElement | null = null

const { isFullscreen } = useFullscreen()

/** Must run in Nuxt setup (useCookie). Shared across chapter bind + more-menu. */
function ensureEnabledCookie() {
  if (!enabledCookie) {
    enabledCookie = useCookie<boolean>('bible-hide-on-scroll', {
      default: () => true,
      maxAge: COOKIE_MAX_AGE,
    })
  }

  return enabledCookie
}

function syncChromeA11y(hidden: boolean) {
  if (!import.meta.client) return

  document.querySelectorAll(HIDE_ON_SCROLL_A11Y_SELECTOR).forEach((node) => {
    if (!(node instanceof HTMLElement)) return

    if (hidden) {
      node.setAttribute('aria-hidden', 'true')
      node.inert = true
    }
    else {
      node.removeAttribute('aria-hidden')
      node.inert = false
    }
  })
}

function syncDomClasses() {
  if (!import.meta.client) return

  const chromeHidden = !areHeadersVisible.value

  document.documentElement.classList.toggle(READER_CHROME_HIDDEN_CLASS, chromeHidden)
  document.documentElement.classList.toggle(READER_LAYOUT_EXPANDED_CLASS, isLayoutExpanded.value)
  syncChromeA11y(chromeHidden)
}

/**
 * Chrome hidden → expand reader (gain the 4rem).
 * Chrome visible → restore header offset immediately (scroll = text only).
 * At the bottom we then re-pin scrollTop to the new maxScroll to avoid flicker.
 */
function setHeadersVisible(visible: boolean) {
  isLayoutExpanded.value = !visible

  if (areHeadersVisible.value === visible) {
    syncDomClasses()
    return
  }

  areHeadersVisible.value = visible
  syncDomClasses()
}

function clearIgnoreScrollTimeout() {
  if (ignoreScrollTimeout) {
    clearTimeout(ignoreScrollTimeout)
    ignoreScrollTimeout = null
  }
}

function stopResizePin() {
  resizeObserver?.disconnect()
  resizeObserver = null
}

function snapToBottom(el: HTMLElement) {
  const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight)
  if (el.scrollTop < maxScroll) {
    el.scrollTop = maxScroll
  }
  lastScrollTop = el.scrollTop
  lastScrollTimeMs = performance.now()
}

/**
 * After chrome / compact-footer layout changes, keep the user glued to the
 * bottom until sizes settle (transforms, grid rows, header offset).
 */
function pinScrollToBottomAfterLayout() {
  if (!boundElement || !pinnedAtBottom) return

  const el = boundElement
  ignoreScrollEvents = true
  clearIgnoreScrollTimeout()
  stopResizePin()

  const previousBehavior = el.style.scrollBehavior
  el.style.scrollBehavior = 'auto'

  snapToBottom(el)

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      if (!pinnedAtBottom || boundElement !== el) return
      snapToBottom(el)
    })
    resizeObserver.observe(el)
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!boundElement || boundElement !== el) {
        el.style.scrollBehavior = previousBehavior
        stopResizePin()
        ignoreScrollEvents = false
        return
      }

      snapToBottom(el)
      el.style.scrollBehavior = previousBehavior

      ignoreScrollTimeout = setTimeout(() => {
        stopResizePin()
        ignoreScrollEvents = false
        ignoreScrollTimeout = null
      }, 350)
    })
  })
}

function isDrawerOpen() {
  if (!import.meta.client) return false

  const drawer = document.getElementById('drawer')
  return drawer instanceof HTMLInputElement && drawer.checked
}

function isHideOnScrollBlocked() {
  const isEnabled = Boolean(enabledCookie?.value)

  return isFullscreen.value || isDrawerOpen() || !isEnabled
}

function onDrawerChange() {
  if (isDrawerOpen()) setHeadersVisible(true)
}

function bindDrawerToggle() {
  if (!import.meta.client || drawerToggle) return

  const drawer = document.getElementById('drawer')
  if (!(drawer instanceof HTMLInputElement)) return

  drawerToggle = drawer
  drawerToggle.addEventListener('change', onDrawerChange)
}

function unbindDrawerToggle() {
  drawerToggle?.removeEventListener('change', onDrawerChange)
  drawerToggle = null
}

function onContainerScroll() {
  if (!boundElement || ignoreScrollEvents) return

  const next = computeHideOnScroll({
    scrollTop: boundElement.scrollTop,
    scrollHeight: boundElement.scrollHeight,
    clientHeight: boundElement.clientHeight,
    lastScrollTop,
    isVisible: areHeadersVisible.value,
    forceVisible: isHideOnScrollBlocked(),
    pinnedAtBottom,
    nowMs: performance.now(),
    lastScrollTimeMs,
  })

  lastScrollTop = next.lastScrollTop
  lastScrollTimeMs = next.lastScrollTimeMs
  const wasPinned = pinnedAtBottom
  pinnedAtBottom = next.pinnedAtBottom

  if (next.changed) {
    setHeadersVisible(next.isVisible)
    if (next.isVisible && next.pinnedAtBottom) {
      pinScrollToBottomAfterLayout()
    }
  }
  else if (next.pinnedAtBottom && !wasPinned) {
    pinScrollToBottomAfterLayout()
  }
}

function bindScrollContainer(element: HTMLElement | null) {
  if (!import.meta.client) return

  if (boundElement === element) return

  if (boundElement) {
    boundElement.removeEventListener('scroll', onContainerScroll)
  }

  boundElement = element
  lastScrollTop = element?.scrollTop ?? 0
  lastScrollTimeMs = performance.now()
  pinnedAtBottom = false
  ignoreScrollEvents = false
  clearIgnoreScrollTimeout()
  stopResizePin()

  if (!element) return

  element.addEventListener('scroll', onContainerScroll, { passive: true })
  bindDrawerToggle()
  onContainerScroll()
}

function unbindScrollContainer() {
  boundElement?.removeEventListener('scroll', onContainerScroll)
  boundElement = null
  lastScrollTop = 0
  lastScrollTimeMs = 0
  pinnedAtBottom = false
  ignoreScrollEvents = false
  clearIgnoreScrollTimeout()
  stopResizePin()
  unbindDrawerToggle()
  areHeadersVisible.value = true
  isLayoutExpanded.value = false

  if (import.meta.client) {
    document.documentElement.classList.remove(READER_CHROME_HIDDEN_CLASS)
    document.documentElement.classList.remove(READER_LAYOUT_EXPANDED_CLASS)
    syncChromeA11y(false)
  }
}

function resetHideOnScroll() {
  lastScrollTop = 0
  lastScrollTimeMs = performance.now()
  pinnedAtBottom = false
  areHeadersVisible.value = true
  isLayoutExpanded.value = false
  syncDomClasses()
}

/**
 * Shared reader chrome visibility + user preference to enable/disable it.
 * Bind the chapter overflow container from BibleChapter; call without a
 * container from the more-menu to read/write `enabled`.
 */
export const useHideOnScroll = (
  containerRef?: MaybeRefOrGetter<HTMLElement | null>,
) => {
  const enabled = ensureEnabledCookie()

  if (containerRef) {
    watch(
      () => toValue(containerRef),
      (element) => {
        bindScrollContainer(element)
      },
      { immediate: true, flush: 'post' },
    )

    watch(isFullscreen, (fullscreen) => {
      // Entering or leaving fullscreen: always restore chrome. On exit, also
      // reset the scroll baseline — layout reflow can fire a spurious "down"
      // scroll that would immediately re-hide headers (looks stuck fullscreen).
      setHeadersVisible(true)

      if (!fullscreen && boundElement) {
        lastScrollTop = boundElement.scrollTop
        lastScrollTimeMs = performance.now()
        pinnedAtBottom = false
      }
    })

    watch(enabled, (isEnabled) => {
      if (!isEnabled) setHeadersVisible(true)
    })

    onBeforeUnmount(() => {
      unbindScrollContainer()
    })
  }

  return {
    areHeadersVisible: readonly(areHeadersVisible),
    enabled,
    reset: resetHideOnScroll,
  }
}

/** Test helper: drop listeners and restore defaults. */
export function resetHideOnScrollState() {
  unbindScrollContainer()
  if (enabledCookie) {
    enabledCookie.value = true
  }
}
