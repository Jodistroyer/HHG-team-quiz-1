import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faBrain, faBook, faUsers } from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'

interface NavBarProps {
  currentPage?: string
  onNavigate?: (page: string) => void
}

const NavBar = ({ currentPage, onNavigate }: NavBarProps) => {
  const navItems = [
    { id: 'quiz', label: 'Quiz', icon: faQuestionCircle },
    { id: 'brain-types', label: 'Brain Types', icon: faBrain },
    { id: 'teams', label: 'Teams', icon: faUsers },
    { id: 'learning', label: 'Learning', icon: faBook },

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

