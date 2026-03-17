import './RoleFilter.css'

interface RoleFilterProps {
  roles: string[]
  value: string
  onChange: (role: string) => void
}

export function RoleFilter({ roles, value, onChange }: RoleFilterProps) {
  if (roles.length === 0) return null

  return (
    <div className="role-filter">
      <label htmlFor="people-role-filter" className="role-filter__label">
        Filter: Role
      </label>
      <select
        id="people-role-filter"
        className="role-filter__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter by role"
      >
        <option value="">All roles</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  )
}
