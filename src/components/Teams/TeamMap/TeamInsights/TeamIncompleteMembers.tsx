import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faChartLine,
  faChevronDown,
  faFire,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { QuizSelectedContextId } from '../../../Quiz/ContextArt'
import { CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import type { Person } from '../../PeoplePanel/types'
import {
  getMissingSituationalContexts,
  SITUATIONAL_CONTEXT_LABELS,
  SITUATIONAL_CONTEXT_QUIZ_IDS,
  type SituationalTeamContextKey,
} from '../../contextHhgScores'

export interface TeamIncompleteMembersProps {
  incompletePeople: Person[]
  rosterHighlightId?: string | null
  onRosterHighlightChange?: (id: string | null) => void
}

const CONTEXT_ICONS: Record<QuizSelectedContextId, IconDefinition> = {
  1: faFire,
  2: faBriefcase,
  3: faPeopleGroup,
  4: faChartLine,
}

function MissingContextIcon ({ context }: { context: SituationalTeamContextKey }) {
  const quizId = SITUATIONAL_CONTEXT_QUIZ_IDS[context]
  const label = SITUATIONAL_CONTEXT_LABELS[context]

  return (
    <span
      className="team-map-results__incomplete-members-context-icon"
      style={{ background: CONTEXT_BACKGROUND[quizId] }}
      title={label}
      aria-label={label}
    >
      <FontAwesomeIcon icon={CONTEXT_ICONS[quizId]} aria-hidden />
    </span>
  )
}

function IncompleteMemberRow ({
  person,
  isHighlighted,
  onHighlight,
}: {
  person: Person
  isHighlighted: boolean
  onHighlight?: (id: string) => void
}) {
  const missingContexts = getMissingSituationalContexts(person)
  const meta = [person.team, person.role].filter(Boolean).join(' · ')

  return (
    <li>
      <button
        type="button"
        className={[
          'team-map-results__incomplete-members-item',
          isHighlighted ? 'team-map-results__incomplete-members-item--highlighted' : null,
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => onHighlight?.(person.id)}
        aria-pressed={isHighlighted}
      >
        <span className="team-map-results__incomplete-members-name" title={person.name}>
          {person.name}
        </span>
        {meta ? (
          <span className="team-map-results__incomplete-members-meta" title={meta}>
            {meta}
          </span>
        ) : null}
        {missingContexts.length > 0 && (
          <span
            className="team-map-results__incomplete-members-contexts"
            aria-label={`${missingContexts.length} context${missingContexts.length === 1 ? '' : 's'} left`}
          >
            {missingContexts.map((ctx) => (
              <MissingContextIcon key={ctx} context={ctx} />
            ))}
            <span className="team-map-results__incomplete-members-left">
              {missingContexts.length} left
            </span>
          </span>
        )}
      </button>
    </li>
  )
}

/** Compact, collapsible list of members missing situational quizzes (secondary to page title). */
export function TeamIncompleteMembers ({
  incompletePeople,
  rosterHighlightId,
  onRosterHighlightChange,
}: TeamIncompleteMembersProps) {
  if (incompletePeople.length === 0) return null

  const count = incompletePeople.length
  const memberWord = count === 1 ? 'member' : 'members'

  const toggleHighlight = (id: string) => {
    if (!onRosterHighlightChange) return
    onRosterHighlightChange(rosterHighlightId === id ? null : id)
  }

  return (
    <aside className="team-map-results__incomplete-members" aria-label="Team members without a full quiz">
      <details className="team-map-results__incomplete-members-details">
        <summary className="team-map-results__incomplete-members-summary">
          <span className="team-map-results__incomplete-members-summary-label">
            {count} incomplete {memberWord}
          </span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="team-map-results__incomplete-members-summary-icon"
            aria-hidden
          />
        </summary>
        <ul className="team-map-results__incomplete-members-list">
          {incompletePeople.map((person) => (
            <IncompleteMemberRow
              key={person.id}
              person={person}
              isHighlighted={(rosterHighlightId ?? null) === person.id}
              onHighlight={toggleHighlight}
            />
          ))}
        </ul>
      </details>
    </aside>
  )
}
