import './PeopleSearch.css'

interface PeopleSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function PeopleSearch({ value, onChange, placeholder = 'Search...' }: PeopleSearchProps) {
  return (
    <input
      type="search"
      className="people-search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search people"
    />
  )
}
