import { afterEach, describe, expect, it, vi } from 'vitest'
import { lockUserScroll } from '~/utils/dom/scrollLock'

describe('lockUserScroll', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('prevents wheel, touchmove and scroll keys until released', () => {
    const target = document.createElement('div')
    const addSpy = vi.spyOn(target, 'addEventListener')
    const removeSpy = vi.spyOn(target, 'removeEventListener')

    const lock = lockUserScroll(target)

    expect(addSpy).toHaveBeenCalledWith('wheel', expect.any(Function), expect.objectContaining({
      capture: true,
      passive: false,
    }))
    expect(addSpy).toHaveBeenCalledWith('touchmove', expect.any(Function), expect.objectContaining({
      capture: true,
      passive: false,
    }))
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function), expect.objectContaining({
      capture: true,
      passive: false,
    }))

    const wheelHandler = addSpy.mock.calls.find(([type]) => type === 'wheel')?.[1] as EventListener
    const keyHandler = addSpy.mock.calls.find(([type]) => type === 'keydown')?.[1] as EventListener

    const wheelEvent = new Event('wheel', { cancelable: true })
    const preventWheel = vi.spyOn(wheelEvent, 'preventDefault')
    wheelHandler(wheelEvent)
    expect(preventWheel).toHaveBeenCalledOnce()

    const arrowEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true })
    const preventArrow = vi.spyOn(arrowEvent, 'preventDefault')
    keyHandler(arrowEvent)
    expect(preventArrow).toHaveBeenCalledOnce()

    const letterEvent = new KeyboardEvent('keydown', { key: 'a', cancelable: true })
    const preventLetter = vi.spyOn(letterEvent, 'preventDefault')
    keyHandler(letterEvent)
    expect(preventLetter).not.toHaveBeenCalled()

    lock.release()

    expect(removeSpy).toHaveBeenCalledWith('wheel', wheelHandler, expect.objectContaining({
      capture: true,
      passive: false,
    }))
  })
})
