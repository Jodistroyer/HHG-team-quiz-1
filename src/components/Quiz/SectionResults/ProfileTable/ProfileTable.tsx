import { useState, type ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import './ProfileTable.css'

export type ProfileTableRow = {
  label: string
  value: ReactNode
}

interface ProfileTableProps {
  title: string
  icon: IconDefinition
  rows: ProfileTableRow[]
  className?: string
  /** Below 700px the table is collapsed to the first N rows; the rest open via "More". */
  collapsedRowLimit?: number
}

const DEFAULT_COLLAPSED_ROW_LIMIT = 4

export const ProfileTable = ({
  title,
  icon,
  rows,
  className,
  collapsedRowLimit,
}: ProfileTableProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const rowLimit = collapsedRowLimit ?? DEFAULT_COLLAPSED_ROW_LIMIT
  const hasOverflow = rows.length > rowLimit
  const wrapperClass = [
    'profile-table-block',
    hasOverflow ? 'profile-table-block--collapsible' : null,
    hasOverflow && !isExpanded ? 'profile-table-block--collapsed' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={wrapperClass}>
      <h4 className="profile-table-title">
        <span className="profile-table-icon"><FontAwesomeIcon icon={icon} /></span>
        {title}
      </h4>
      <table className="profile-table">
        <thead>
          <tr>
            <th scope="col">Attribute</th>
            <th scope="col">Your profile</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={i >= rowLimit ? 'profile-table-row--extra' : undefined}
            >
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasOverflow && (
        <button
          type="button"
          className="profile-table__toggle"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((v) => !v)}
        >
          <span className="profile-table__toggle-label">{isExpanded ? 'Less' : 'More'}</span>
          <FontAwesomeIcon
            icon={isExpanded ? faChevronUp : faChevronDown}
            className="profile-table__toggle-icon"
            aria-hidden
          />
        </button>
      )}
    </div>
  )
}
