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
  personHasCompletedAllContexts,
  personHasContextData,
  SITUATIONAL_CONTEXT_LABELS,
  SITUATIONAL_CONTEXT_QUIZ_IDS,
  type SituationalTeamContextKey,
} from '../../contextHhgScores'

/** Aggregate sections use full-quiz completion; context cards use that context only. */
export type TeamSectionCompletionKind = 'all-contexts' | SituationalTeamContextKey

export interface TeamSectionMemberStatusProps {
  selectedPeople: Person[]
  completionKind: TeamSectionCompletionKind
  rosterHighlightId?: string | null
  onRosterHighlightChange?: (id: string | null) => void
}

const CONTEXT_ICONS: Record<QuizSelectedContextId, IconDefinition> = {
  1: faFire,
  2: faBriefcase,
  3: faPeopleGroup,
  4: faChartLine,
}

function isPersonComplete (person: Person, kind: TeamSectionCompletionKind): boolean {
  if (kind === 'all-contexts') return personHasCompletedAllContexts(person)
  return personHasContextData(person, kind)
}

function missingContextsForPerson (
  person: Person,
  completionKind: TeamSectionCompletionKind
): SituationalTeamContextKey[] {
  if (completionKind === 'all-contexts') return getMissingSituationalContexts(person)
  return isPersonComplete(person, completionKind) ? [] : [completionKind]
}

function ContextIcon ({ context }: { context: SituationalTeamContextKey }) {
  const quizId = SITUATIONAL_CONTEXT_QUIZ_IDS[context]
  const label = SITUATIONAL_CONTEXT_LABELS[context]

  return (
    <span
      className="team-map-results__section-member-context-icon"
      style={{ background: CONTEXT_BACKGROUND[quizId] }}
      title={label}
      aria-label={label}
    >
      <FontAwesomeIcon icon={CONTEXT_ICONS[quizId]} aria-hidden />
    </span>
  )
}

function MemberRow ({
  person,
  completionKind,
  isHighlighted,
  onHighlight,
}: {
  person: Person
  completionKind: TeamSectionCompletionKind
  isHighlighted: boolean
  onHighlight?: (id: string) => void
}) {
  const meta = [person.team, person.role].filter(Boolean).join(' · ')
  const missingContexts = missingContextsForPerson(person, completionKind)

  return (
    <li>
      <button
        type="button"
        className={[
          'team-map-results__section-member-item',
          isHighlighted ? 'team-map-results__section-member-item--highlighted' : null,
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => onHighlight?.(person.id)}
        aria-pressed={isHighlighted}
      >
        <span className="team-map-results__section-member-name" title={person.name}>
          {person.name}
        </span>
        {meta ? (
          <span className="team-map-results__section-member-meta" title={meta}>
            {meta}
          </span>
        ) : null}
        {missingContexts.length > 0 && (
          <span
            className="team-map-results__section-member-contexts"
            aria-label={`${missingContexts.length} context${missingContexts.length === 1 ? '' : 's'} left`}
          >
            {missingContexts.map((ctx) => (
              <ContextIcon key={ctx} context={ctx} />
            ))}
            <span className="team-map-results__section-member-left">
              {missingContexts.length} left
            </span>
          </span>
        )}
      </button>
    </li>
  )
}

function MemberGroupList ({
  label,
  people,
  completionKind,
  rosterHighlightId,
  onHighlight,
}: {
  label: string
  people: Person[]
  completionKind: TeamSectionCompletionKind
  rosterHighlightId?: string | null
  onHighlight?: (id: string) => void
}) {
  if (people.length === 0) return null

  return (
    <div className="team-map-results__section-member-group">
      <p className="team-map-results__section-member-group-label">{label}</p>
      <ul className="team-map-results__section-member-list">
        {people.map((person) => (
          <MemberRow
            key={person.id}
            person={person}
            completionKind={completionKind}
            isHighlighted={(rosterHighlightId ?? null) === person.id}
            onHighlight={onHighlight}
          />
        ))}
      </ul>
    </div>
  )
}

/** Compact member completion chip for a section card header (same pattern as incomplete members). */
export function TeamSectionMemberStatus ({
  selectedPeople,
  completionKind,
  rosterHighlightId,
  onRosterHighlightChange,
}: TeamSectionMemberStatusProps) {
  if (selectedPeople.length === 0) return null

  const finished = selectedPeople.filter((p) => isPersonComplete(p, completionKind))
  const notFinished = selectedPeople.filter((p) => !isPersonComplete(p, completionKind))
  const total = selectedPeople.length

  if (finished.length === 0 && notFinished.length === 0) return null

  const memberWord = (n: number) => (n === 1 ? 'member' : 'members')
  const summaryLabel =
    notFinished.length === 0
      ? `All ${finished.length} finished`
      : `${finished.length}/${total} finished · ${notFinished.length} ${memberWord(notFinished.length)} left`

  const toggleHighlight = (id: string) => {
    if (!onRosterHighlightChange) return
    onRosterHighlightChange(rosterHighlightId === id ? null : id)
  }

  return (
    <aside
      className="team-map-results__section-member-status"
      aria-label="Team member completion for this section"
    >
      <details className="team-map-results__section-member-details">
        <summary className="team-map-results__section-member-summary">
          <span className="team-map-results__section-member-summary-label">{summaryLabel}</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="team-map-results__section-member-summary-icon"
            aria-hidden
          />
        </summary>
        <div className="team-map-results__section-member-panel">
          <MemberGroupList
            label={`Not finished (${notFinished.length})`}
            people={notFinished}
            completionKind={completionKind}
            rosterHighlightId={rosterHighlightId}
            onHighlight={toggleHighlight}
          />
          <MemberGroupList
            label={`Finished (${finished.length})`}
            people={finished}
            completionKind={completionKind}
            rosterHighlightId={rosterHighlightId}
            onHighlight={toggleHighlight}
          />
        </div>
      </details>
    </aside>
  )
}
