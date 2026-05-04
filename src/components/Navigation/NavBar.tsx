import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faDiagramProject, faFlask, faBrain, faUsers } from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'

interface NavBarProps {
  currentPage?: string
  onNavigate?: (page: string) => void
}

const NavBar = ({ currentPage, onNavigate }: NavBarProps) => {
  const navItems = [
    { id: 'quiz', label: 'Quiz', icon: faQuestionCircle },
    { id: 'flows', label: 'Flows', icon: faDiagramProject },
    { id: 'labs', label: 'Labs', icon: faFlask },
    { id: 'brain-types', label: 'Brains', icon: faBrain },
    { id: 'teams', label: 'Teams', icon: faUsers },
  ]

  const handleClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => handleClick(item.id)}
          >
            <FontAwesomeIcon icon={item.icon} className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </div>
    </nav>
  )
}

export default NavBar

