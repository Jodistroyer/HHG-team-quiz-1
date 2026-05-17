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

function App() {
  const [currentPage, setCurrentPage] = useState('quiz')
  /** Flows (browse + detail) is layout-heavy; only subscribe to resize on that tab to keep resizing smooth elsewhere. */
  const windowWidth = useWindowWidth({ active: currentPage === 'flows' })
  const NAV_STORAGE_KEY = 'hhg.nav.currentPage.v1'
  /** Remember window scroll per top-level tab so switching NavBar items does not jump to the top. */
  const scrollPositionsRef = useRef<Record<string, { x: number; y: number }>>({})
  const [leaveAddContextTarget, setLeaveAddContextTarget] = useState<string | null>(null)

  const navigateToPage = (page: string) => {
    if (page === currentPage) return
    scrollPositionsRef.current[currentPage] = {
      x: window.scrollX,
      y: window.scrollY,
    }
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

  // Restore selected tab on refresh.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(NAV_STORAGE_KEY)
      if (saved) setCurrentPage(saved)
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // "Open this flow" requests from other pages (e.g. Quiz Results recommended
  // cards) bubble up here and switch the active tab to Flows. The Flows page
  // itself reads the pending target from localStorage on mount.
  useEffect(() => {
    const handleNavigateToFlows = () => {
      // Deep-link from quiz (flow card / see more): do not restore a prior Flows scroll position.
      delete scrollPositionsRef.current.flows
      handleNavigateRef.current('flows')
    }
    window.addEventListener(FLOWS_NAVIGATE_EVENT, handleNavigateToFlows)
    return () => {
      window.removeEventListener(FLOWS_NAVIGATE_EVENT, handleNavigateToFlows)
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'quiz':
        return <Quiz />
      case 'flows':
        return <Flows onNavigate={handleNavigate} />
      case 'labs':
        return <Labs />
      case 'brain-types':
        return <Brains />
      case 'teams':
        return <Teams />
      default:
        return <Quiz />
    }
  }

  return (
    <div className="app" data-viewport-width={windowWidth}>
      <NavBar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="app-content">
        {renderPage()}
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
