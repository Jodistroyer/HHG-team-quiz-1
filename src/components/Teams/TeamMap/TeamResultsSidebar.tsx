import { useState, useEffect } from 'react'
import { TeamNavSection, TeamNavSectionDropdown } from './TeamNavSection'
import { TEAM_GROUP_NAV_IDS, TEAM_GROUP_NAV_ITEMS } from './teamGroupNav'
import '../../../Quiz/Sidebar/Sidebar.css'

const MOBILE_BREAKPOINT = 768
const SCROLL_OFFSET = 120

interface TeamResultsSidebarProps {
  /** Scroll container for team map centre column (not window). */
  scrollRootRef: React.RefObject<HTMLElement | null>
  sidebarHeading?: string
}

export function TeamResultsSidebar ({
  scrollRootRef,
  sidebarHeading = 'Team',
}: TeamResultsSidebarProps) {
  const [iconOnly, setIconOnly] = useState(false)
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(TEAM_GROUP_NAV_IDS[0] ?? null)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const update = () => setIconOnly(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const ids = TEAM_GROUP_NAV_IDS
    if (ids.length === 0) return

    const scrollTarget = scrollRootRef.current
    if (!scrollTarget) return

    const updateCurrent = () => {
      let current: string | null = null
      let bestTop = -Infinity
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= SCROLL_OFFSET && rect.bottom > 0 && rect.top > bestTop) {
          bestTop = rect.top
          current = id
        }
      }
      setCurrentSectionId(current ?? ids[0])
    }

    updateCurrent()
    scrollTarget.addEventListener('scroll', updateCurrent, { passive: true })
    return () => scrollTarget.removeEventListener('scroll', updateCurrent)
  }, [scrollRootRef])

  if (iconOnly) {
    return (
      <aside className="results-sidebar results-sidebar-mobile" aria-label="Team profile navigation">
        <div className="results-sidebar-mobile-bar">
          <div className="results-sidebar-mobile-left">
            <TeamNavSectionDropdown
              items={TEAM_GROUP_NAV_ITEMS}
              currentSectionId={currentSectionId}
            />
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="results-sidebar" aria-label="Team profile navigation">
      <h2 className="results-sidebar-title">{sidebarHeading}</h2>
      <div className="results-sidebar-nav">
        <TeamNavSection items={TEAM_GROUP_NAV_ITEMS} currentSectionId={currentSectionId} />
      </div>
    </aside>
  )
}
