import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Quiz from './components/Quiz/Quiz'
import Flows from './components/Flows/Flows'
import Labs from './components/Labs/Labs'
import Brains from './components/Brains/Brains'
import Teams from './components/Teams/Teams'
import NavBar from './components/Navigation/NavBar'
import { FLOWS_NAVIGATE_EVENT } from './components/Flows/flowsNavigation'
import { LeaveAddContextQuizModal } from './components/Quiz/ChangeResults/LeaveAddContextQuizModal'
import {
  abandonInProgressAddContext,
  isInProgressAddContextQuiz,
  loadPersistedQuizState,
} from './components/Quiz/quizResumeContext'
import { QUIZ_SECTIONS } from './components/Quiz/quizSections'
import { useWindowWidth } from './hooks/useWindowWidth'
import './App.css'

const NAV_STORAGE_KEY = 'hhg.nav.currentPage.v1'
const SCROLL_STORAGE_KEY = 'hhg.nav.scrollPositions.v1'

const APP_PAGES = new Set(['quiz', 'flows', 'labs', 'brain-types', 'teams'])

function loadSavedNavPage (): string {
  try {
    const saved = localStorage.getItem(NAV_STORAGE_KEY)
    if (saved != null && APP_PAGES.has(saved)) return saved
  } catch {
    // ignore
  }
  return 'quiz'
}

function loadScrollPositions (): Record<string, { x: number; y: number }> {
  try {
    const raw = localStorage.getItem(SCROLL_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, { x?: number; y?: number }>
    const out: Record<string, { x: number; y: number }> = {}
    for (const [page, pos] of Object.entries(parsed)) {
      if (!APP_PAGES.has(page) || pos == null || typeof pos !== 'object') continue
      const x = pos.x
      const y = pos.y
      if (typeof x !== 'number' || typeof y !== 'number') continue
      out[page] = { x, y }
    }
    return out
  } catch {
    return {}
  }
}

function persistScrollPositions (positions: Record<string, { x: number; y: number }>) {
  try {
    localStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(positions))
  } catch {
    // ignore
  }
}

function App() {
  const savedNavPage = loadSavedNavPage()
  const [currentPage, setCurrentPage] = useState(savedNavPage)
  /** Flows (browse + detail) is layout-heavy; only subscribe to resize on that tab to keep resizing smooth elsewhere. */
  const windowWidth = useWindowWidth({ active: currentPage === 'flows' })
  /** Remember window scroll per top-level tab so switching NavBar items does not jump to the top. */
  const scrollPositionsRef = useRef(loadScrollPositions())
  const [leaveAddContextTarget, setLeaveAddContextTarget] = useState<string | null>(null)
  /** Once a tab is visited, keep it mounted (hidden) so in-tab state survives NavBar switches. */
  const [mountedPages, setMountedPages] = useState<ReadonlySet<string>>(() => new Set([savedNavPage]))

  const navigateToPage = (page: string) => {
    if (page === currentPage) return
    scrollPositionsRef.current[currentPage] = {
      x: window.scrollX,
      y: window.scrollY,
    }
    persistScrollPositions(scrollPositionsRef.current)
    setCurrentPage(page)
    try {
      localStorage.setItem(NAV_STORAGE_KEY, page)
    } catch {
      // ignore
    }
  }

  const handleNavigate = (page: string) => {
    if (page === currentPage) return
    if (currentPage === 'quiz' && page !== 'quiz' && isInProgressAddContextQuiz()) {
      setLeaveAddContextTarget(page)
      return
    }
    navigateToPage(page)
  }

  const leaveAddContextSectionId = leaveAddContextTarget != null
    ? loadPersistedQuizState().addContextSectionId
    : null
  const leaveAddContextTitle =
    leaveAddContextSectionId != null
      ? (QUIZ_SECTIONS.find((s) => s.id === leaveAddContextSectionId)?.title ?? 'this context')
      : 'this context'

  const handleNavigateRef = useRef(handleNavigate)
  handleNavigateRef.current = handleNavigate

  useLayoutEffect(() => {
    const saved = scrollPositionsRef.current[currentPage]
    if (saved) {
      window.scrollTo(saved.x, saved.y)
    } else {
      window.scrollTo(0, 0)
    }
  }, [currentPage])

  useEffect(() => {
    setMountedPages((prev) => {
      if (prev.has(currentPage)) return prev
      return new Set([...prev, currentPage])
    })
  }, [currentPage])

  useEffect(() => {
    const saveScrollForRefresh = () => {
      scrollPositionsRef.current[currentPage] = {
        x: window.scrollX,
        y: window.scrollY,
      }
      persistScrollPositions(scrollPositionsRef.current)
    }
    window.addEventListener('beforeunload', saveScrollForRefresh)
    return () => window.removeEventListener('beforeunload', saveScrollForRefresh)
  }, [currentPage])

  // "Open this flow" requests from other pages (e.g. Quiz Results recommended
  // cards) bubble up here and switch the active tab to Flows. The Flows page
  // itself reads the pending target from localStorage on mount.
  useEffect(() => {
    const handleNavigateToFlows = () => {
      // Deep-link from quiz (flow card / see more): do not restore a prior Flows scroll position.
      delete scrollPositionsRef.current.flows
      persistScrollPositions(scrollPositionsRef.current)
      handleNavigateRef.current('flows')
    }
    window.addEventListener(FLOWS_NAVIGATE_EVENT, handleNavigateToFlows)
    return () => {
      window.removeEventListener(FLOWS_NAVIGATE_EVENT, handleNavigateToFlows)
    }
  }, [])

  return (
    <div className="app" data-viewport-width={windowWidth} data-active-page={currentPage}>
      <NavBar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="app-content" data-active-page={currentPage}>
        {mountedPages.has('quiz') && (
          <div
            className="app-page-panel"
            hidden={currentPage !== 'quiz'}
            aria-hidden={currentPage !== 'quiz'}
          >
            <Quiz />
          </div>
        )}
        {mountedPages.has('flows') && (
          <div
            className="app-page-panel"
            hidden={currentPage !== 'flows'}
            aria-hidden={currentPage !== 'flows'}
          >
            <Flows onNavigate={handleNavigate} />
          </div>
        )}
        {mountedPages.has('labs') && (
          <div
            className="app-page-panel"
            hidden={currentPage !== 'labs'}
            aria-hidden={currentPage !== 'labs'}
          >
            <Labs />
          </div>
        )}
        {mountedPages.has('brain-types') && (
          <div
            className="app-page-panel"
            hidden={currentPage !== 'brain-types'}
            aria-hidden={currentPage !== 'brain-types'}
          >
            <Brains onTakeQuiz={() => handleNavigate('quiz')} />
          </div>
        )}
        {mountedPages.has('teams') && (
          <div
            className="app-page-panel"
            hidden={currentPage !== 'teams'}
            aria-hidden={currentPage !== 'teams'}
          >
            <Teams />
          </div>
        )}
      </div>
      <LeaveAddContextQuizModal
        open={leaveAddContextTarget != null}
        contextTitle={leaveAddContextTitle}
        onClose={() => setLeaveAddContextTarget(null)}
        onConfirmLeave={() => {
          abandonInProgressAddContext()
          const target = leaveAddContextTarget
          setLeaveAddContextTarget(null)
          if (target) navigateToPage(target)
        }}
      />
    </div>
  )
}

export default App
