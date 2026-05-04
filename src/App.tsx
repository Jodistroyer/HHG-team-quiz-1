import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Quiz from './components/Quiz/Quiz'
import Flows from './components/Flows/Flows'
import Labs from './components/Labs/Labs'
import Brains from './components/Brains/Brains'
import Teams from './components/Teams/Teams'
import NavBar from './components/Navigation/NavBar'
import { FLOWS_NAVIGATE_EVENT } from './components/Flows/flowsNavigation'
import './App.css'

function App() {
  const NAV_STORAGE_KEY = 'hhg.nav.currentPage.v1'
  const [currentPage, setCurrentPage] = useState('quiz')
  /** Remember window scroll per top-level tab so switching NavBar items does not jump to the top. */
  const scrollPositionsRef = useRef<Record<string, { x: number; y: number }>>({})

  const handleNavigate = (page: string) => {
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
        return <Flows />
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
    <div className="app">
      <NavBar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="app-content">
        {renderPage()}
      </div>
    </div>
  )
}

export default App
