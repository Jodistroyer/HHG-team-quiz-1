import { useState, useEffect } from 'react'
import { NavSection, NavSectionDropdown, SECTION_IDS_LIST } from './Navigation/NavSection'
import { DownloadJSON } from './DownloadResults/DownloadJSON/DownloadJSON'
import { DownloadPDF } from './DownloadResults/DownloadPDF/DownloadPDF'
import './Sidebar.css'

type AnswerType = 'Head' | 'Heart' | 'Gut'

interface OverallScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: 'Head' | 'Heart' | 'Gut'
  secondaryBrain: 'Head' | 'Heart' | 'Gut' | null
}

interface SectionScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: 'Head' | 'Heart' | 'Gut'
  secondaryBrain: 'Head' | 'Heart' | 'Gut' | null
}

interface Section {
  id: number
  title: string
  questions: { id: string; text: string; options: { label: string; type: AnswerType }[] }[]
}

interface Answer {
  firstChoice: AnswerType | null
  secondChoice: AnswerType | null
}

interface ResultsSidebarProps {
  containerRef: React.RefObject<HTMLDivElement | null>
  overall: OverallScores
  sectionSummaries: SectionScores[]
  sections: Section[]
  answers: Record<string, Answer>
}

const MOBILE_BREAKPOINT = 768
const SCROLL_OFFSET = 120

export function Sidebar ({
  containerRef,
  overall,
  sectionSummaries,
  sections,
  answers
}: ResultsSidebarProps) {
  const [iconOnly, setIconOnly] = useState(false)
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(SECTION_IDS_LIST[0] ?? null)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const update = () => setIconOnly(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const ids = SECTION_IDS_LIST
    if (ids.length === 0) return

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
    window.addEventListener('scroll', updateCurrent, { passive: true })
    return () => window.removeEventListener('scroll', updateCurrent)
  }, [])

  const downloadButtons = (
    <div className="results-sidebar-downloads">
      <DownloadJSON
        overall={overall}
        sectionSummaries={sectionSummaries}
        sections={sections}
        answers={answers}
        iconOnly={iconOnly}
      />
      <DownloadPDF containerRef={containerRef} iconOnly={iconOnly} />
    </div>
  )

  if (iconOnly) {
    return (
      <aside className="results-sidebar results-sidebar-mobile" aria-label="Results navigation and download">
        <div className="results-sidebar-mobile-bar">
          <div className="results-sidebar-mobile-left">
            <NavSectionDropdown currentSectionId={currentSectionId} onSelectSection={setCurrentSectionId} />
          </div>
          <div className="results-sidebar-mobile-right">
            {downloadButtons}
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="results-sidebar" aria-label="Results navigation and download">
      <h2 className="results-sidebar-title">Profile</h2>
      <div className="results-sidebar-nav">
        <NavSection currentSectionId={currentSectionId} />
      </div>
      {downloadButtons}
    </aside>
  )
}
