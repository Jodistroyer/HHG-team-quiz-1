import type { CSSProperties } from 'react'
import type { Person, TeamContextKey, TeamContextScores } from './types'
import { getBrainCombination } from '../../Quiz/SectionResults/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import '../TeamMap/TeamMap.css'
import './SelectedList.css'

interface SelectedRosterProps {
  selectedPeople: Person[]
  activeContext: TeamContextKey
  onRemovePerson?: (id: string) => void
  onClearAll?: () => void
}

const DOMINANT_DOT: Record<string, string> = {
  Head: '#1368ce',
  Heart: '#e21b3c',
  Gut: '#26890c',
}

const DOMINANT_AVATAR: Record<string, { background: string; color: string }> = {
  Head: { background: '#dbeafe', color: '#1368ce' },
  Heart: { background: '#fee2e2', color: '#e21b3c' },
  Gut: { background: '#dcfce7', color: '#26890c' },
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function getScoresForContext(person: Person, context: TeamContextKey): TeamContextScores {
  if (context === 'overall') {
    return {
      headPercent: person.headPercent,
      heartPercent: person.heartPercent,
      gutPercent: person.gutPercent,
    }
  }
  return (
    person.contextScores?.[context] ?? {
      headPercent: person.headPercent,
      heartPercent: person.heartPercent,
      gutPercent: person.gutPercent,
    }
  )
}

function makeBadgeStyle(colors: string[]): CSSProperties {
  if (colors.length === 1) return { background: colors[0] }
  if (colors.length === 2)
    return { background: `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%)` }
  return {
    background: `linear-gradient(90deg, ${colors[0]} 33.33%, ${colors[1]} 33.33%, ${colors[1]} 66.66%, ${colors[2]} 66.66%)`,
  }
}

function MemberChip({
  person,
  context,
  onRemove,
}: {
  person: Person
  context: TeamContextKey
  onRemove?: (id: string) => void
}) {
  const scores = getScoresForContext(person, context)
  const combo = getBrainCombination(scores.headPercent, scores.heartPercent, scores.gutPercent)
  const dotColor = DOMINANT_DOT[person.dominant] ?? '#94a3b8'
  const avatarStyle = DOMINANT_AVATAR[person.dominant] ?? { background: '#f1f5f9', color: '#475569' }
  const meta = [person.team, person.role].filter(Boolean).join(' · ')

  return (
    <div className="tm-chip">
      <div className="tm-chip__dot" style={{ background: dotColor }} />
      <div className="tm-chip__avatar" style={avatarStyle}>
        {getInitials(person.name)}
      </div>
      <div className="tm-chip__info">
        <div className="tm-chip__name">{person.name}</div>
        {meta && <div className="tm-chip__meta">{meta}</div>}
        <div className="tm-chip__badge" style={makeBadgeStyle(combo.colors)}>
          {combo.label}
        </div>
      </div>
      {onRemove && (
        <button
          type="button"
          className="tm-chip__remove"
          aria-label={`Remove ${person.name}`}
          onClick={() => onRemove(person.id)}
        >
          ×
        </button>
      )}
    </div>
  )
}

/** Selected members list (same chip UI as Team Map roster). Lives inside PeoplePanel. */
export function SelectedRoster({ selectedPeople, activeContext, onRemovePerson, onClearAll }: SelectedRosterProps) {
  return (
    <div className="team-map team-map--embedded-roster">
      <aside className="team-map__roster" aria-label="Selected team members">
        <div className="team-map__roster-header">
          <div className="team-map__roster-header-left">
            <h3 className="team-map__roster-title">
              <FontAwesomeIcon icon={faUsers} className="people-panel__title-icon" aria-hidden />
              Selected
            </h3>
            <span className="team-map__roster-count">{selectedPeople.length}</span>
          </div>
          {onClearAll && selectedPeople.length > 0 && (
            <button type="button" className="selected-list__clear" onClick={onClearAll}>
              Clear all
            </button>
          )}
        </div>
        <div className="team-map__roster-chips">
          {selectedPeople.length === 0 ? (
            <p className="team-map__roster-empty">Click people in the library to add them to your map.</p>
          ) : (
            selectedPeople.map((person) => (
              <MemberChip
                key={person.id}
                person={person}
                context={activeContext}
                onRemove={onRemovePerson}
              />
            ))
          )}
        </div>
      </aside>
    </div>
  )
}
