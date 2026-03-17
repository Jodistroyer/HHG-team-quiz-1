import type { Person } from './types'
import './SelectedList.css'

interface SelectedListProps {
  people: Person[]
  selectedIds: Set<string>
  onClearSelection?: () => void
}

export function SelectedList({ people, selectedIds, onClearSelection }: SelectedListProps) {
  const selected = people.filter((p) => selectedIds.has(p.id))

  return (
    <div className="selected-list">
      <div className="selected-list__header">
        <span className="selected-list__title">Selected ({selected.length})</span>
        {onClearSelection && selected.length > 0 && (
          <button
            type="button"
            className="selected-list__clear"
            onClick={onClearSelection}
            aria-label="Clear selection"
          >
            Clear
          </button>
        )}
      </div>
      <ul className="selected-list__names">
        {selected.length === 0 ? (
          <li className="selected-list__empty">No one selected</li>
        ) : (
          selected.map((p) => (
            <li key={p.id} className="selected-list__item">
              {p.name}
              {p.role && <span className="selected-list__meta"> — {p.role}</span>}
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
