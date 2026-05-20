import { useEffect, useLayoutEffect, useRef } from 'react'

export type TeamInsightScrollSnapshot = {
  center: number
  window: number
}

function getTeamMapScrollEl (): HTMLElement | null {
  return document.querySelector('.teams__main .team-map__center')
}

function captureScrollSnapshot (): TeamInsightScrollSnapshot {
  return {
    center: getTeamMapScrollEl()?.scrollTop ?? 0,
    window: window.scrollY,
  }
}

function scrollSoloInsightToTop (): void {
  const center = getTeamMapScrollEl()
  if (center) center.scrollTop = 0
  window.scrollTo({ top: 0, left: window.scrollX, behavior: 'auto' })
}

function restoreTeamInsightScroll (snapshot: TeamInsightScrollSnapshot): void {
  const center = getTeamMapScrollEl()
  if (center) center.scrollTop = snapshot.center
  window.scrollTo({ top: snapshot.window, left: window.scrollX, behavior: 'auto' })
}

/**
 * When opening solo from pair/team map via roster chip: save scroll, jump to top.
 * When closing solo: restore the saved team/pair scroll positions.
 */
export function useTeamInsightScroll (
  activePersonId: string | null,
  selectedCount: number
) {
  const savedScroll = useRef<TeamInsightScrollSnapshot | null>(null)
  const pendingScrollToTop = useRef(false)

  const canToggleSoloOverTeam = selectedCount >= 2

  /** Call synchronously before setActivePersonId when opening solo from team/pair view. */
  const rememberScrollBeforeSolo = (nextActiveId: string | null, prevActiveId: string | null) => {
    if (!canToggleSoloOverTeam) return

    if (!prevActiveId && nextActiveId) {
      savedScroll.current = captureScrollSnapshot()
      pendingScrollToTop.current = true
      return
    }

    if (prevActiveId && nextActiveId && prevActiveId !== nextActiveId) {
      pendingScrollToTop.current = true
    }
  }

  useLayoutEffect(() => {
    if (!pendingScrollToTop.current || !activePersonId) return
    scrollSoloInsightToTop()
  }, [activePersonId])

  useEffect(() => {
    if (!pendingScrollToTop.current || !activePersonId) return

    const run = () => scrollSoloInsightToTop()
    run()
    const id1 = requestAnimationFrame(() => {
      run()
      requestAnimationFrame(run)
    })

    pendingScrollToTop.current = false

    return () => cancelAnimationFrame(id1)
  }, [activePersonId])

  useEffect(() => {
    if (activePersonId !== null) return
    const snapshot = savedScroll.current
    if (!snapshot) return
    savedScroll.current = null

    const restore = () => restoreTeamInsightScroll(snapshot)
    restore()
    const id = requestAnimationFrame(() => {
      restore()
      requestAnimationFrame(restore)
    })
    return () => cancelAnimationFrame(id)
  }, [activePersonId])

  useEffect(() => {
    if (selectedCount < 2) {
      savedScroll.current = null
      pendingScrollToTop.current = false
    }
  }, [selectedCount])

  return { rememberScrollBeforeSolo }
}
