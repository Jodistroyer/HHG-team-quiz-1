import { useEffect, useMemo, useState } from 'react'
import type { Person } from './types'
import type { SavedGroup } from './types'
import './SavedGroups.css'

interface SavedGroupsProps {
  groups: SavedGroup[]
  people: Person[]
  onSelectGroup: (group: SavedGroup) => void
  onDeleteGroup?: (id: string) => void
}

export function SavedGroups({ groups, people, onSelectGroup, onDeleteGroup }: SavedGroupsProps) {
  const personIdSet = useMemo(() => new Set(people.map((p) => p.id)), [people])
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)

  useEffect(() => {
    if (!activeGroupId) return
    if (!groups.some((g) => g.id === activeGroupId)) setActiveGroupId(null)
  }, [groups, activeGroupId])

  if (groups.length === 0) return null

  return (
    <div className="saved-groups">
      <div className="saved-groups__title">Saved Groups</div>
      <ul className="saved-groups__list">
        {groups.map((g) => {
          const validCount = g.personIds.filter((id) => personIdSet.has(id)).length
          const isActive = activeGroupId === g.id
          return (
          <li key={g.id} className={`saved-groups__item${isActive ? ' saved-groups__item--active' : ''}`}>
            <button
              type="button"
              className="saved-groups__btn"
              onClick={() => {
                setActiveGroupId(g.id)
                onSelectGroup(g)
              }}
              title={`Select ${validCount} people`}
            >
              {g.name}
              <span className="saved-groups__count">({validCount})</span>
            </button>
            {onDeleteGroup && (
              <button
                type="button"
                className="saved-groups__delete"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteGroup(g.id)
                }}
                aria-label={`Remove saved group ${g.name}`}
              >
                ×
              </button>
            )}
          </li>
          )
        })}
      </ul>
    </div>
  )
}
