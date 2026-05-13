import { useEffect, useState } from 'react'

export type UseWindowWidthOptions = {
  /**
   * When false, resize listeners are not attached (no React updates on resize).
   * Use on heavy routes only when needed — e.g. subscribe while the Flows tab is active.
   */
  active?: boolean
}

function readInnerWidth (): number {
  return typeof window !== 'undefined' ? window.innerWidth : 0
}

/**
 * Tracks `window.innerWidth` so React can re-run after the viewport changes.
 * Updates are coalesced with `requestAnimationFrame` so dragging the window or
 * DevTools responsive handles does not enqueue dozens of re-renders per frame.
 * Also listens to `visualViewport` resize where available (mobile toolbar / emulation).
 */
export function useWindowWidth (options?: UseWindowWidthOptions): number {
  const active = options?.active !== false
  const [width, setWidth] = useState(readInnerWidth)

  useEffect(() => {
    if (!active) return

    setWidth(readInnerWidth())

    let raf = 0
    const flush = () => {
      raf = 0
      setWidth(window.innerWidth)
    }
    const schedule = () => {
      if (raf !== 0) return
      raf = requestAnimationFrame(flush)
    }

    window.addEventListener('resize', schedule)
    const vv = window.visualViewport
    vv?.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('resize', schedule)
      vv?.removeEventListener('resize', schedule)
      if (raf !== 0) cancelAnimationFrame(raf)
    }
  }, [active])

  return width
}
