import type { ViewMode } from './types'
import './ViewModeToggle.css'

const VIEW_LABELS: Record<ViewMode, string> = {
  company: 'Company Structure',
  team: 'Team',
  tags: 'Tags',
  flat: 'Flat List',
}

interface ViewModeToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="view-mode-toggle">
      <span className="view-mode-toggle__label">Organize by:</span>
      <div className="view-mode-toggle__options" role="radiogroup" aria-label="Organization view">
        {(Object.keys(VIEW_LABELS) as ViewMode[]).map((mode) => (
          <label key={mode} className="view-mode-toggle__option">
            <input
              type="radio"
              name="people-view"
              value={mode}
              checked={value === mode}
              onChange={() => onChange(mode)}
              className="view-mode-toggle__input"
            />
            <span className="view-mode-toggle__text">{VIEW_LABELS[mode]}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
