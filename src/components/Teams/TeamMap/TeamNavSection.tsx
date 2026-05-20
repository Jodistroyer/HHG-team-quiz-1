import { useState, useRef, useEffect, type CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { CONTEXT_BACKGROUND } from '../../Quiz/ContextArt'
import type { TeamNavItem } from './teamGroupNav'
import './TeamNavSection.css'

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

export function scrollToTeamSection (targetId: string) {
  const el = document.getElementById(targetId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

interface TeamNavSectionProps {
  items: TeamNavItem[]
  currentSectionId?: string | null
  /** Index after which to show a divider (e.g. after context overview items). */
  dividerAfterIndex?: number
}

export function TeamNavSection ({
  items,
  currentSectionId = null,
  dividerAfterIndex = 1,
}: TeamNavSectionProps) {
  const beforeDivider = items.slice(0, dividerAfterIndex + 1)
  const afterDivider = items.slice(dividerAfterIndex + 1)

  const renderItem = (item: TeamNavItem) => (
    <li key={item.id}>
      <button
        type="button"
        className={`nav-section-btn ${currentSectionId === item.id ? 'is-current' : ''}`}
        onClick={() => scrollToTeamSection(item.id)}
        aria-current={currentSectionId === item.id ? 'true' : undefined}
        style={navItemStyle(item.id)}
      >
        <FontAwesomeIcon icon={item.icon} className="nav-section-btn-icon" aria-hidden />
        <span className="nav-section-btn-label">{item.label}</span>
      </button>
    </li>
  )

  return (
    <nav className="nav-section" aria-label="Team profile sections">
      <ul className="nav-section-list">
        {beforeDivider.map(renderItem)}
        {afterDivider.length > 0 ? <li className="nav-section-divider" aria-hidden="true" /> : null}
        {afterDivider.map(renderItem)}
      </ul>
    </nav>
  )
}

interface TeamNavSectionDropdownProps {
  items: TeamNavItem[]
  currentSectionId: string | null
  dividerAfterIndex?: number
}

export function TeamNavSectionDropdown ({
  items,
  currentSectionId,
  dividerAfterIndex = 1,
}: TeamNavSectionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentItem = items.find((item) => item.id === currentSectionId) ?? items[0]
  const currentLabel = currentItem?.label ?? 'Sections'
  const currentIcon = currentItem?.icon

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
    scrollToTeamSection(id)
    setIsOpen(false)
  }

  const beforeDivider = items.slice(0, dividerAfterIndex + 1)
  const afterDivider = items.slice(dividerAfterIndex + 1)

  const renderOption = (item: TeamNavItem) => (
    <li key={item.id} role="option" aria-selected={currentSectionId === item.id}>
      <button
        type="button"
        className={`nav-section-dropdown-item ${currentSectionId === item.id ? 'is-current' : ''}`}
        onClick={() => handleSelect(item.id)}
        style={navItemStyle(item.id)}
      >
        <FontAwesomeIcon icon={item.icon} className="nav-section-btn-icon" aria-hidden />
        <span className="nav-section-btn-label">{item.label}</span>
      </button>
    </li>
  )

  return (
    <div className="nav-section-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="nav-section-dropdown-trigger"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Current section"
        style={currentSectionId ? navItemStyle(currentSectionId) : undefined}
      >
        <span className="nav-section-dropdown-trigger-label">
          {currentIcon ? (
            <FontAwesomeIcon icon={currentIcon} className="nav-section-btn-icon" aria-hidden />
          ) : null}
          <span className="nav-section-btn-label">{currentLabel}</span>
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`nav-section-dropdown-chevron ${isOpen ? 'is-open' : ''}`}
          aria-hidden
        />
      </button>
      {isOpen && (
        <ul className="nav-section-dropdown-panel" role="listbox">
          {beforeDivider.map(renderOption)}
          {afterDivider.length > 0 ? <li className="nav-section-divider" aria-hidden="true" /> : null}
          {afterDivider.map(renderOption)}
        </ul>
      )}
    </div>
  )
}
