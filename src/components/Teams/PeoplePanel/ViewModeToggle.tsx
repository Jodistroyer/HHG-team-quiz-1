import type { ViewMode } from './types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpWideShort, faList, faTags, faUsers } from '@fortawesome/free-solid-svg-icons'
import './ViewModeToggle.css'

const VIEW_LABELS: Record<ViewMode, string> = {
  company: 'Company',
  team: 'Team',
  tags: 'Tags',
  flat: 'List',
}

const VIEW_ICONS: Partial<Record<ViewMode, typeof faList>> = {
  team: faUsers,
  tags: faTags,
  flat: faList,
}

interface ViewModeToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="view-mode-toggle">
      <span className="view-mode-toggle__label">
        <FontAwesomeIcon icon={faArrowUpWideShort} className="view-mode-toggle__label-icon" aria-hidden />
        Organize by:
      </span>
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
            <span className="view-mode-toggle__text">
              {VIEW_ICONS[mode] ? (
                <FontAwesomeIcon icon={VIEW_ICONS[mode]} className="view-mode-toggle__text-icon" aria-hidden />
              ) : null}
              <span>{VIEW_LABELS[mode]}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
