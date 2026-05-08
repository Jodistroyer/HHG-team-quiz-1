import { useState, useRef, useEffect, type CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faBriefcase, faPeopleGroup, faChartLine, faChartPie, faList, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { CONTEXT_BACKGROUND } from '../../ContextArt'
import './NavSection.css'

/** Map nav-item id → color for the four quiz contexts. Other ids fall through
 *  to the brand-purple CSS fallback. */
const NAV_CONTEXT_COLOR: Record<string, string> = {
  'under-pressure': CONTEXT_BACKGROUND[1],
  'doing-work': CONTEXT_BACKGROUND[2],
  'with-people': CONTEXT_BACKGROUND[3],
  'getting-better': CONTEXT_BACKGROUND[4],
}

function navItemStyle (id: string): CSSProperties | undefined {
  const color = NAV_CONTEXT_COLOR[id]
  return color ? ({ '--section-context-color': color } as CSSProperties) : undefined
}

export const SECTION_NAV_ITEMS: { id: string; label: string; icon: IconDefinition }[] = [
  { id: 'under-pressure', label: 'Under Pressure', icon: faFire },
  { id: 'doing-work', label: 'Doing Work', icon: faBriefcase },
  { id: 'with-people', label: 'With People', icon: faPeopleGroup },
  { id: 'getting-better', label: 'Getting Better', icon: faChartLine },
  { id: 'balance', label: 'Section Balance', icon: faChartPie },
  { id: 'answers', label: 'All Answers', icon: faList }
]

export const SECTION_IDS = SECTION_NAV_ITEMS.map(({ id, label }) => ({ id, label })) as { id: string; label: string }[]

export const SECTION_IDS_LIST = SECTION_NAV_ITEMS.map(({ id }) => id)

function scrollToSection (targetId: string) {
  const el = document.getElementById(targetId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

interface NavSectionDropdownProps {
  currentSectionId: string | null
  onSelectSection?: (id: string) => void
}

export function NavSectionDropdown ({ currentSectionId, onSelectSection }: NavSectionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentItem = currentSectionId
    ? SECTION_NAV_ITEMS.find(({ id }) => id === currentSectionId) ?? null
    : SECTION_NAV_ITEMS[0] ?? null
  const currentLabel = currentItem?.label ?? 'Section'
  const currentIcon = currentItem?.icon ?? faList

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

  const handleSelect = (id: string) => {
    scrollToSection(id)
    onSelectSection?.(id)
    setIsOpen(false)
  }

  return (
    <div className="nav-section-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="nav-section-dropdown-trigger"
        onClick={() => setIsOpen((o) => !o)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Current section"
        style={currentSectionId ? navItemStyle(currentSectionId) : undefined}
      >
        <span className="nav-section-dropdown-trigger-label">
          <FontAwesomeIcon icon={currentIcon} className="nav-section-btn-icon" aria-hidden />
          <span className="nav-section-btn-label">{currentLabel}</span>
        </span>
        <FontAwesomeIcon icon={faChevronDown} className={`nav-section-dropdown-chevron ${isOpen ? 'is-open' : ''}`} aria-hidden />
      </button>
      {isOpen && (
        <ul className="nav-section-dropdown-panel" role="listbox">
          {SECTION_NAV_ITEMS.slice(0, 4).map(({ id, label, icon }) => (
            <li key={id} role="option" aria-selected={currentSectionId === id}>
              <button
                type="button"
                className={`nav-section-dropdown-item ${currentSectionId === id ? 'is-current' : ''}`}
                onClick={() => handleSelect(id)}
                style={navItemStyle(id)}
              >
                <FontAwesomeIcon icon={icon} className="nav-section-btn-icon" aria-hidden />
                <span className="nav-section-btn-label">{label}</span>
              </button>
            </li>
          ))}
          <li className="nav-section-divider" aria-hidden="true" />
          {SECTION_NAV_ITEMS.slice(4).map(({ id, label, icon }) => (
            <li key={id} role="option" aria-selected={currentSectionId === id}>
              <button
                type="button"
                className={`nav-section-dropdown-item ${currentSectionId === id ? 'is-current' : ''}`}
                onClick={() => handleSelect(id)}
                style={navItemStyle(id)}
              >
                <FontAwesomeIcon icon={icon} className="nav-section-btn-icon" aria-hidden />
                <span className="nav-section-btn-label">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

interface NavSectionProps {
  /** Current section in view (from scroll spy); highlights the matching nav item */
  currentSectionId?: string | null
}

export function NavSection ({ currentSectionId = null }: NavSectionProps) {
  return (
    <nav className="nav-section" aria-label="Results sections">
      <ul className="nav-section-list">
        {SECTION_NAV_ITEMS.slice(0, 4).map(({ id, label, icon }) => (
          <li key={id}>
            <button
              type="button"
              className={`nav-section-btn ${currentSectionId === id ? 'is-current' : ''}`}
              onClick={() => scrollToSection(id)}
              aria-current={currentSectionId === id ? 'true' : undefined}
              style={navItemStyle(id)}
            >
              <FontAwesomeIcon icon={icon} className="nav-section-btn-icon" aria-hidden />
              <span className="nav-section-btn-label">{label}</span>
            </button>
          </li>
        ))}
        <li className="nav-section-divider" aria-hidden="true" />
        {SECTION_NAV_ITEMS.slice(4).map(({ id, label, icon }) => (
          <li key={id}>
            <button
              type="button"
              className={`nav-section-btn ${currentSectionId === id ? 'is-current' : ''}`}
              onClick={() => scrollToSection(id)}
              aria-current={currentSectionId === id ? 'true' : undefined}
              style={navItemStyle(id)}
            >
              <FontAwesomeIcon icon={icon} className="nav-section-btn-icon" aria-hidden />
              <span className="nav-section-btn-label">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
