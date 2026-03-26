import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faChevronUp,
  faDownload,
  faPen,
  faPlus,
  faTrash,
  faUser,
  faUserPlus,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import './ContextMenu.css'

export interface ContextMenuItem {
  id: string
  label: string
  onClick: () => void
  disabled?: boolean
}

export interface ContextMenuProps {
  x: number
  y: number
  items: (ContextMenuItem | 'separator')[]
  onClose: () => void
}

function iconForItemId(id: string): IconDefinition {
  switch (id) {
    case 'add-team':
    case 'add-person':
      return faPlus
    case 'rename':
    case 'edit':
      return faPen
    case 'delete':
      return faTrash
    case 'export':
      return faDownload
    case 'collapse':
      return faChevronUp
    case 'view-profile':
      return faUser
    case 'add-to-group':
      return faUsers
    case 'view-assessments':
      return faBookOpen
    default:
      return faUserPlus
  }
}

export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const raf = requestAnimationFrame(() => {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    })
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      className="context-menu"
      style={{ left: x, top: y }}
      role="menu"
    >
      {items.map((item, i) =>
        item === 'separator' ? (
          <div key={`sep-${i}`} className="context-menu__separator" />
        ) : (
          <button
            key={item.id}
            type="button"
            className="context-menu__item"
            onClick={() => {
              if (!item.disabled) {
                item.onClick()
                onClose()
              }
            }}
            disabled={item.disabled}
            role="menuitem"
          >
            <span className="context-menu__item-icon" aria-hidden="true">
              <FontAwesomeIcon icon={iconForItemId(item.id)} />
            </span>
            <span className="context-menu__item-label">{item.label}</span>
          </button>
        )
      )}
    </div>
  )
}
