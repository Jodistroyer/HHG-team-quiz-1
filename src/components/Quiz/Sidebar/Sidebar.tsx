import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { NavSection, NavSectionDropdown, SECTION_IDS_LIST } from './Navigation/NavSection'
import { DownloadJSON } from './DownloadResults/DownloadJSON/DownloadJSON'
import { DownloadPDF } from './DownloadResults/DownloadPDF/DownloadPDF'
import { SaveToTeams } from './DownloadResults/SaveToTeams/SaveToTeams'
import { StartOverConfirmModal } from './StartOverConfirmModal'
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
  quizCompletedAt: string | null
  onStartOver: () => void
  hideStartOver?: boolean
}

const MOBILE_BREAKPOINT = 768
const SCROLL_OFFSET = 120

export function Sidebar ({
  containerRef,
  overall,
  sectionSummaries,
  sections,
  answers,
  quizCompletedAt,
  onStartOver,
  hideStartOver = false,
}: ResultsSidebarProps) {
  const [iconOnly, setIconOnly] = useState(false)
  const [compactDownloads, setCompactDownloads] = useState(false)
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(SECTION_IDS_LIST[0] ?? null)
  const [showStartOverConfirm, setShowStartOverConfirm] = useState(false)
  const [showDownloadOptions, setShowDownloadOptions] = useState(false)

  const closeStartOverModal = useCallback(() => setShowStartOverConfirm(false), [])
  const confirmStartOver = useCallback(() => {
    setShowStartOverConfirm(false)
    onStartOver()
  }, [onStartOver])

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const update = () => setIconOnly(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const update = () => {
      const matches = mq.matches
      setCompactDownloads(matches)
      if (!matches) setShowDownloadOptions(false)
    }
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

  const directDownloadButtons = (
    <div className="results-sidebar-downloads">
      <SaveToTeams
        overall={overall}
        sectionSummaries={sectionSummaries}
        sections={sections}
        answers={answers}
        quizCompletedAt={quizCompletedAt}
        iconOnly={iconOnly}
      />
      <DownloadJSON
        overall={overall}
        sectionSummaries={sectionSummaries}
        sections={sections}
        answers={answers}
        quizCompletedAt={quizCompletedAt}
        iconOnly={iconOnly}
      />
      <DownloadPDF containerRef={containerRef} quizCompletedAt={quizCompletedAt} iconOnly={iconOnly} />
    </div>
  )

  const compactMobileDownloads = (
    <div className="results-sidebar-downloads results-sidebar-downloads--compact">
      <SaveToTeams
        overall={overall}
        sectionSummaries={sectionSummaries}
        sections={sections}
        answers={answers}
        quizCompletedAt={quizCompletedAt}
        iconOnly={iconOnly}
      />
      <button
        type="button"
        className="btn btn-primary results-sidebar-download-trigger"
        onClick={() => setShowDownloadOptions(true)}
        aria-label="Open download options"
        title="Download options"
      >
        <FontAwesomeIcon icon={faDownload} className="results-sidebar-download-trigger-icon" aria-hidden />
      </button>
    </div>
  )

  const startOverButton = (
    <button
      type="button"
      className={`btn btn-primary results-sidebar-start-over${iconOnly ? ' results-sidebar-start-over--icon-only' : ''}`}
      onClick={() => setShowStartOverConfirm(true)}
      aria-label={iconOnly ? 'Start over' : undefined}
      title="Start over"
    >
      <FontAwesomeIcon icon={faRotateLeft} className="results-sidebar-start-over-icon" aria-hidden />
      {!iconOnly && <span>Start Over</span>}
    </button>
  )

  const sidebarFooter = (
    <div className="results-sidebar-footer">
      <div className="results-sidebar-footer-section results-sidebar-footer-section--downloads">{directDownloadButtons}</div>
      {!hideStartOver && (
        <>
          <div className="results-sidebar-footer-divider" aria-hidden />
          <div className="results-sidebar-footer-section results-sidebar-footer-section--reset">{startOverButton}</div>
        </>
      )}
    </div>
  )

  const startOverModal =
    showStartOverConfirm ? (
      <StartOverConfirmModal onCancel={closeStartOverModal} onConfirm={confirmStartOver} />
    ) : null

  const downloadOptionsModal = showDownloadOptions ? (
    <div className="results-sidebar-download-modal-backdrop" onClick={() => setShowDownloadOptions(false)} role="presentation">
      <div
        className="results-sidebar-download-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="results-sidebar-download-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="results-sidebar-download-modal-title" className="results-sidebar-download-modal-title">
          Download options
        </h3>
        <div className="results-sidebar-download-modal-actions">
          <div onClick={() => setShowDownloadOptions(false)}>
            <DownloadJSON
              overall={overall}
              sectionSummaries={sectionSummaries}
              sections={sections}
              answers={answers}
              quizCompletedAt={quizCompletedAt}
              iconOnly={false}
            />
          </div>
          <div onClick={() => setShowDownloadOptions(false)}>
            <DownloadPDF containerRef={containerRef} quizCompletedAt={quizCompletedAt} iconOnly={false} />
          </div>
        </div>
        <button
          type="button"
          className="results-sidebar-download-modal-close"
          onClick={() => setShowDownloadOptions(false)}
        >
          Close
        </button>
      </div>
    </div>
  ) : null

  if (iconOnly) {
    return (
      <>
        <aside className="results-sidebar results-sidebar-mobile" aria-label="Results navigation and download">
          <div className="results-sidebar-mobile-bar">
            <div className="results-sidebar-mobile-left">
              <NavSectionDropdown currentSectionId={currentSectionId} onSelectSection={setCurrentSectionId} />
            </div>
            <div className="results-sidebar-mobile-right">
              {!hideStartOver && startOverButton}
              {compactDownloads ? compactMobileDownloads : directDownloadButtons}
            </div>
          </div>
        </aside>
        {startOverModal}
        {downloadOptionsModal}
      </>
    )
  }

  return (
    <>
      <aside className="results-sidebar" aria-label="Results navigation and download">
        <h2 className="results-sidebar-title">Profile</h2>
        <div className="results-sidebar-nav">
          <NavSection currentSectionId={currentSectionId} />
        </div>
        {sidebarFooter}
      </aside>
      {startOverModal}
      {downloadOptionsModal}
    </>
  )
}
