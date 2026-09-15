import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { waitForScrollEnd } from '~/utils/dom/waitForScrollEnd'

describe('waitForScrollEnd', () => {
  let rafQueue: FrameRequestCallback[] = []
  let nextRafId = 1

  beforeEach(() => {
    rafQueue = []
    nextRafId = 1

    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      rafQueue.push(cb)
      return nextRafId++
    })
    vi.stubGlobal('cancelAnimationFrame', (id: number) => {
      // Best-effort: clear queued callbacks by draining when finished via scrollend/abort.
      void id
      rafQueue = []
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function flushFrames(count: number) {
    for (let i = 0; i < count; i += 1) {
      const cb = rafQueue.shift()
      if (!cb) break
      cb(i)
    }
  }

  it('resolves on scrollend when the event fires', async () => {
    const scroller = document.createElement('div')
    Object.defineProperty(scroller, 'scrollTop', { value: 0, writable: true, configurable: true })

    const pending = waitForScrollEnd(scroller, {
      idleFramesBeforeStart: 50,
      stableFrames: 50,
    })

    scroller.dispatchEvent(new Event('scrollend'))
    await expect(pending).resolves.toBeUndefined()
  })

  it('resolves via rAF when scrollTop stays idle', async () => {
    const scroller = document.createElement('div')
    Object.defineProperty(scroller, 'scrollTop', { value: 10, writable: true, configurable: true })

    const pending = waitForScrollEnd(scroller, {
      idleFramesBeforeStart: 2,
      stableFrames: 3,
    })

    flushFrames(2)

    await expect(pending).resolves.toBeUndefined()
  })

  it('resolves via rAF after scrollTop stabilizes', async () => {
    const scroller = document.createElement('div')
    let scrollTop = 0
    Object.defineProperty(scroller, 'scrollTop', {
      configurable: true,
      get: () => scrollTop,
    })

    const pending = waitForScrollEnd(scroller, {
      idleFramesBeforeStart: 50,
      stableFrames: 2,
    })

    scrollTop = 40
    flushFrames(1)
    scrollTop = 80
    flushFrames(1)
    flushFrames(2)

    await expect(pending).resolves.toBeUndefined()
  })

  it('resolves immediately when the signal is already aborted', async () => {
    const scroller = document.createElement('div')
    const controller = new AbortController()
    controller.abort()

    await expect(waitForScrollEnd(scroller, { signal: controller.signal })).resolves.toBeUndefined()
  })
})
