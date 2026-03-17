import { useEffect, useRef } from 'react'
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
            {item.label}
          </button>
        )
      )}
    </div>
  )
}
