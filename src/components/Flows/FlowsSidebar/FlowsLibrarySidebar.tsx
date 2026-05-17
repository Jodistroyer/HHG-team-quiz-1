import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faHouse } from '@fortawesome/free-solid-svg-icons'
import type { FlowContextId } from '../flowsData'
import { FLOW_CONTEXT_META } from '../flowsContexts'
import { CONTEXT_BACKGROUND } from '../../Quiz/ContextArt'
import '../../Quiz/Sidebar/Navigation/NavSection.css'
import './FlowsLibrarySidebar.css'

export type FlowsLibraryView = 'home' | 'context' | 'saved'

interface FlowsLibrarySidebarProps {
  activeView: FlowsLibraryView
  activeContextId: FlowContextId | null
  onHome: () => void
  onPickContext: (contextId: FlowContextId) => void
  onSaved: () => void
}

type FlowLibraryItemId =
  | 'home'
  | 'under-pressure'
  | 'doing-work'
  | 'with-people'
  | 'getting-better'
  | 'saved'

const LIBRARY_ITEMS: { id: FlowLibraryItemId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'under-pressure', label: 'Under pressure' },
  { id: 'doing-work', label: 'Doing work' },
  { id: 'with-people', label: 'With people' },
  { id: 'getting-better', label: 'Getting better' },
  { id: 'saved', label: 'Saved' },
]

function currentLibraryItemId (
  view: FlowsLibraryView,
  activeContextId: FlowContextId | null
): FlowLibraryItemId {
  if (view === 'home') return 'home'
  if (view === 'saved') return 'saved'
  if (activeContextId === 1) return 'under-pressure'
  if (activeContextId === 2) return 'doing-work'
  if (activeContextId === 3) return 'with-people'
  if (activeContextId === 4) return 'getting-better'
  return 'under-pressure'
}

function dropdownItemStyle (id: FlowLibraryItemId): CSSProperties | undefined {
  if (id === 'under-pressure') {
    return { '--section-context-color': CONTEXT_BACKGROUND[1] } as CSSProperties
  }
  if (id === 'doing-work') {
    return { '--section-context-color': CONTEXT_BACKGROUND[2] } as CSSProperties
  }
  if (id === 'with-people') {
    return { '--section-context-color': CONTEXT_BACKGROUND[3] } as CSSProperties
  }
  if (id === 'getting-better') {
    return { '--section-context-color': CONTEXT_BACKGROUND[4] } as CSSProperties
  }
  // Home / Saved: brand purple like the rest of nav-section-list
  return { '--section-context-color': '#7d3dbd' } as CSSProperties
}

function dropdownItemIcon (id: FlowLibraryItemId) {
  if (id === 'under-pressure') return FLOW_CONTEXT_META[1].icon
  if (id === 'doing-work') return FLOW_CONTEXT_META[2].icon
  if (id === 'with-people') return FLOW_CONTEXT_META[3].icon
  if (id === 'getting-better') return FLOW_CONTEXT_META[4].icon
  if (id === 'home') return faHouse
  return faBookmark
}

export const FlowsLibrarySidebar = ({
  activeView,
  activeContextId,
  onHome,
  onPickContext,
  onSaved,
}: FlowsLibrarySidebarProps) => {
  const isContextActive = (id: FlowContextId) =>
    activeView === 'context' && activeContextId === id

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentId = currentLibraryItemId(activeView, activeContextId)
  const currentLabel = LIBRARY_ITEMS.find((i) => i.id === currentId)?.label ?? 'Library'

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleSelect = (id: FlowLibraryItemId) => {
    if (id === 'home') onHome()
    else if (id === 'saved') onSaved()
    else if (id === 'under-pressure') onPickContext(1)
    else if (id === 'doing-work') onPickContext(2)
    else if (id === 'with-people') onPickContext(3)
    else onPickContext(4)
    setIsOpen(false)
  }

  return (
    <nav className="flows-library" aria-label="Flows library">
      <div className="flows-library__mobile" ref={dropdownRef}>
        <div className="nav-section-dropdown">
          <button
            type="button"
            className="nav-section-dropdown-trigger"
            onClick={() => setIsOpen((o) => !o)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label="Flows library"
            style={dropdownItemStyle(currentId)}
          >
            <span className="nav-section-dropdown-trigger-label">
              <FontAwesomeIcon
                icon={dropdownItemIcon(currentId)}
                className="nav-section-btn-icon"
                aria-hidden
              />
              <span className="nav-section-btn-label">{currentLabel}</span>
            </span>
            <span className="flows-library__mobile-caret" aria-hidden />
          </button>
          {isOpen && (
            <ul className="nav-section-dropdown-panel" role="listbox">
              {LIBRARY_ITEMS.slice(0, 5).map(({ id, label }) => (
                <li key={id} role="option" aria-selected={currentId === id}>
                  <button
                    type="button"
                    className={`nav-section-dropdown-item ${currentId === id ? 'is-current' : ''}`}
                    onClick={() => handleSelect(id)}
                    style={dropdownItemStyle(id)}
                  >
                    <FontAwesomeIcon
                      icon={dropdownItemIcon(id)}
                      className="nav-section-btn-icon"
                      aria-hidden
                    />
                    <span className="nav-section-btn-label">{label}</span>
                  </button>
                </li>
              ))}
              <li className="nav-section-divider" aria-hidden="true" />
              {LIBRARY_ITEMS.slice(5).map(({ id, label }) => (
                <li key={id} role="option" aria-selected={currentId === id}>
                  <button
                    type="button"
                    className={`nav-section-dropdown-item ${currentId === id ? 'is-current' : ''}`}
                    onClick={() => handleSelect(id)}
                    style={dropdownItemStyle(id)}
                  >
                    <FontAwesomeIcon
                      icon={dropdownItemIcon(id)}
                      className="nav-section-btn-icon"
                      aria-hidden
                    />
                    <span className="nav-section-btn-label">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ul className="nav-section-list flows-library__desktop">
        <li>
          <button
            type="button"
            className={`nav-section-btn ${activeView === 'home' ? 'is-current' : ''}`}
            onClick={onHome}
            aria-current={activeView === 'home' ? 'true' : undefined}
            style={{ ['--section-context-color' as never]: '#7d3dbd' }}
          >
            <FontAwesomeIcon icon={faHouse} className="nav-section-btn-icon" aria-hidden />
            <span className="nav-section-btn-label">Home</span>
          </button>
        </li>

        <li className="flows-library__title-row">
          <h3 className="flows-library__title">By context</h3>
        </li>

        {([1, 2, 3, 4] as const).map((id) => {
          const label =
            id === 1
              ? 'Under pressure'
              : id === 2
                ? 'Doing work'
                : id === 3
                  ? 'With people'
                  : 'Getting better'
          const meta = FLOW_CONTEXT_META[id]
          const isCurrent = isContextActive(id)

          return (
            <li key={id}>
              <button
                type="button"
                className={`nav-section-btn ${isCurrent ? 'is-current' : ''}`}
                onClick={() => onPickContext(id)}
                aria-current={isCurrent ? 'true' : undefined}
                style={{ ['--section-context-color' as never]: CONTEXT_BACKGROUND[id] }}
              >
                <FontAwesomeIcon icon={meta.icon} className="nav-section-btn-icon" aria-hidden />
                <span className="nav-section-btn-label">{label}</span>
              </button>
            </li>
          )
        })}

        <li className="nav-section-divider" aria-hidden="true" />

        <li className="flows-library__title-row">
          <h3 className="flows-library__title">My flows</h3>
        </li>

        <li>
          <button
            type="button"
            className={`nav-section-btn ${activeView === 'saved' ? 'is-current' : ''}`}
            onClick={onSaved}
            aria-current={activeView === 'saved' ? 'true' : undefined}
            style={{ ['--section-context-color' as never]: '#7d3dbd' }}
          >
            <FontAwesomeIcon icon={faBookmark} className="nav-section-btn-icon" aria-hidden />
            <span className="nav-section-btn-label">Saved</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
