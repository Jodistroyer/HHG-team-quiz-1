import type { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
}

export const ProfileTable = ({ title, icon, rows, className }: ProfileTableProps) => {
  return (
    <div className={['profile-table-block', className].filter(Boolean).join(' ')}>
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
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

