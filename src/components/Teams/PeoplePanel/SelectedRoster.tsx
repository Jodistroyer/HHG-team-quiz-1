import { useEffect } from 'react'
import type { Person, TeamContextKey, TeamContextScores } from './types'
import {
  getSituationalContextScores,
  personHasContextData,
  SITUATIONAL_CONTEXT_LABELS,
  SITUATIONAL_CONTEXT_QUIZ_IDS,
  SITUATIONAL_TEAM_CONTEXTS,
  type SituationalTeamContextKey,
} from '../contextHhgScores'
import {
  getBrainCombination,
  getBrainColorsFromComboLabel,
  getBrainIcons,
} from '../../Quiz/SectionResults/utils'
import type { QuizSelectedContextId } from '../../Quiz/ContextArt'
import { CONTEXT_BACKGROUND } from '../../Quiz/ContextArt'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faChartLine,
  faFire,
  faPeopleGroup,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import '../TeamMap/TeamMap.css'
import './SelectedList.css'

export interface SelectedRosterProps {
  selectedPeople: Person[]
  activeContext: TeamContextKey
  onRemovePerson?: (id: string) => void
  onClearAll?: () => void
  activePersonId?: string | null
  onActivePersonChange?: (id: string | null) => void
  rosterHighlightId?: string | null
  onRosterHighlightChange?: (id: string | null) => void
  // Allow forwards-compatible props when embedded elsewhere.
  [key: string]: unknown
}

// const DOMINANT_AVATAR: Record<string, { background: string; color: string }> = {
//   Head: { background: '#dbeafe', color: '#1368ce' },
//   Heart: { background: '#fee2e2', color: '#e21b3c' },
//   Gut: { background: '#dcfce7', color: '#26890c' },
// }

const CONTEXT_ICONS: Record<QuizSelectedContextId, IconDefinition> = {
  1: faFire,
  2: faBriefcase,
  3: faPeopleGroup,
  4: faChartLine,
}

function FinishedContextIcon ({ context }: { context: SituationalTeamContextKey }) {
  const quizId = SITUATIONAL_CONTEXT_QUIZ_IDS[context]
  const label = SITUATIONAL_CONTEXT_LABELS[context]

  return (
    <span
      className="tm-chip__context-icon"
      style={{ background: CONTEXT_BACKGROUND[quizId] }}
      title={label}
      aria-label={label}
    >
      <FontAwesomeIcon icon={CONTEXT_ICONS[quizId]} aria-hidden />
    </span>
  )
}

// function getInitials(name: string): string {
//   return name
//     .split(' ')
//     .map((w) => w[0] ?? '')
//     .slice(0, 2)
//     .join('')
//     .toUpperCase()
// }

function getScoresForContext(person: Person, context: TeamContextKey): TeamContextScores {
  return getSituationalContextScores(person, context)
}

function MemberChip({
  person,
  context,
  onRemove,
  isActive,
  isRosterHighlighted,
  onToggleActive,
}: {
  person: Person
  context: TeamContextKey
  onRemove?: (id: string) => void
  isActive: boolean
  isRosterHighlighted: boolean
  onToggleActive?: (id: string) => void
}) {
  const scores = getScoresForContext(person, context)
  const isIncompleteContext =
    context !== 'overall' &&
    scores.headPercent === 0 &&
    scores.heartPercent === 0 &&
    scores.gutPercent === 0
  const combo = isIncompleteContext
    ? null
    : getBrainCombination(scores.headPercent, scores.heartPercent, scores.gutPercent)
  const brainIconCount = combo ? getBrainColorsFromComboLabel(combo.label).length : 0
  // const avatarStyle = DOMINANT_AVATAR[person.dominant] ?? { background: '#f1f5f9', color: '#475569' }
  const meta = [person.team, person.role].filter(Boolean).join(' · ')
  const finishedContexts = SITUATIONAL_TEAM_CONTEXTS.filter((ctx) => personHasContextData(person, ctx))

  return (
    <div
      className={[
        'tm-chip tm-chip--clickable',
        isActive ? 'tm-chip--active' : null,
        isRosterHighlighted ? 'tm-chip--roster-highlight' : null,
      ]
        .filter(Boolean)
        .join(' ')}
      data-person-id={person.id}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={() => onToggleActive?.(person.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggleActive?.(person.id)
        }
      }}
    >
      {/* <div className="tm-chip__avatar" style={avatarStyle}>
        {getInitials(person.name)}
      </div> */}
      {onRemove && (
        <button
          type="button"
          className="tm-chip__remove"
          aria-label={`Remove ${person.name}`}
          onClick={(e) => {
            e.stopPropagation()
            onRemove(person.id)
          }}
        >
          ×
        </button>
      )}
      <div className="tm-chip__info">
        <div className="tm-chip__name">{person.name}</div>
        {meta && <div className="tm-chip__meta">{meta}</div>}
        {finishedContexts.length > 0 && (
          <div className="tm-chip__context-icons">
            {finishedContexts.map((ctx) => (
              <FinishedContextIcon key={ctx} context={ctx} />
            ))}
          </div>
        )}
      </div>
      <div
        className={`tm-chip__brain-icons${
          isIncompleteContext
            ? ' tm-chip__brain-icons--pending'
            : brainIconCount >= 1 && brainIconCount <= 3
              ? ` tm-chip__brain-icons--count-${brainIconCount}`
              : ''
        }`}
        title={isIncompleteContext ? 'Not Done' : combo?.label}
        aria-label={isIncompleteContext ? 'Not Done' : combo?.label}
      >
        {isIncompleteContext
          ? 'Not Done'
          : combo
            ? getBrainIcons(combo.label, 'small', 'changeResults')
            : null}
      </div>
    </div>
  )
}

/** Selected members list (same chip UI as Team Map roster). Lives inside PeoplePanel. */
export function SelectedRoster({
  selectedPeople,
  activeContext,
  onRemovePerson,
  onClearAll,
  activePersonId,
  onActivePersonChange,
  rosterHighlightId,
}: SelectedRosterProps) {
  const toggleActive = (id: string) => {
    if (!onActivePersonChange) return
    onActivePersonChange(activePersonId === id ? null : id)
  }

  useEffect(() => {
    if (!rosterHighlightId) return
    const chip = document.querySelector(
      `.team-map__roster-chips [data-person-id="${CSS.escape(rosterHighlightId)}"]`
    )
    chip?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [rosterHighlightId])

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
                isActive={(activePersonId ?? null) === person.id}
                isRosterHighlighted={(rosterHighlightId ?? null) === person.id}
                onToggleActive={toggleActive}
              />
            ))
          )}
        </div>
      </aside>
    </div>
  )
}
