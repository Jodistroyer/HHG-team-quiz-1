import { useEffect, useState } from 'react'
import Quiz from './components/Quiz/Quiz'
import Flows from './components/Flows/Flows'
import Labs from './components/Labs/Labs'
import Brains from './components/Brains/Brains'
import Teams from './components/Teams/Teams'
import NavBar from './components/Navigation/NavBar'
import './App.css'

function App() {
  const NAV_STORAGE_KEY = 'hhg.nav.currentPage.v1'
  const [currentPage, setCurrentPage] = useState('quiz')

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

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    try {
      localStorage.setItem(NAV_STORAGE_KEY, page)
    } catch {
      // ignore
    }
  }

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
