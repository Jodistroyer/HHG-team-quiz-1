import { useMemo, useState } from 'react'
import type { Person, TeamContextKey, TeamContextScores } from '../PeoplePanel/types'
import { RadarChart } from './TeamRadarResults/TeamRadarChart'
import { getBrainCombination } from '../../Quiz/SectionResults/utils'
import './TeamMap.css'
import './TeamRadarResults/TeamAllRadarsSection.css'

interface TeamMapProps {
  selectedPeople: Person[]
  onRemovePerson?: (id: string) => void
  onClearAll?: () => void
}

const CONTEXT_TABS: Array<{ key: TeamContextKey; label: string }> = [
  { key: 'underPressure', label: 'Under Pressure' },
  { key: 'doingWork', label: 'Doing Work' },
  { key: 'withPeople', label: 'With People' },
  { key: 'gettingBetter', label: 'Getting Better' },
]

const EMPTY_SCORES: TeamContextScores = { headPercent: 0, heartPercent: 0, gutPercent: 0 }

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
  return (
    person.contextScores?.[context] ?? {
      headPercent: person.headPercent,
      heartPercent: person.heartPercent,
      gutPercent: person.gutPercent,
    }
  )
}

function averageTeamScores(people: Person[], context: TeamContextKey): TeamContextScores {
  if (people.length === 0) return EMPTY_SCORES
  const totals = people.reduce(
    (acc, p) => {
      const s = getScoresForContext(p, context)
      return {
        headPercent: acc.headPercent + s.headPercent,
        heartPercent: acc.heartPercent + s.heartPercent,
        gutPercent: acc.gutPercent + s.gutPercent,
      }
    },
    { headPercent: 0, heartPercent: 0, gutPercent: 0 }
  )
  return {
    headPercent: totals.headPercent / people.length,
    heartPercent: totals.heartPercent / people.length,
    gutPercent: totals.gutPercent / people.length,
  }
}

function makeBadgeStyle(colors: string[]): React.CSSProperties {
  if (colors.length === 1) return { background: colors[0] }
  if (colors.length === 2)
    return { background: `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%)` }
  return {
    background: `linear-gradient(90deg, ${colors[0]} 33.33%, ${colors[1]} 33.33%, ${colors[1]} 66.66%, ${colors[2]} 66.66%)`,
  }
}

function OverviewBadge({ scores }: { scores: TeamContextScores }) {
  const combo = getBrainCombination(scores.headPercent, scores.heartPercent, scores.gutPercent)
  return (
    <div className="all-radars-card-badges">
      <div className="all-radars-brain-combo-badge" style={makeBadgeStyle(combo.colors)}>
        {combo.label}
      </div>
    </div>
  )
}

interface MemberChipProps {
  person: Person
  context: TeamContextKey
  onRemove?: (id: string) => void
}

function MemberChip({ person, context, onRemove }: MemberChipProps) {
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

export function TeamMap({ selectedPeople, onRemovePerson, onClearAll }: TeamMapProps) {
  const [activeContext, setActiveContext] = useState<TeamContextKey>('underPressure')

  const teamScores = useMemo(
    () => averageTeamScores(selectedPeople, activeContext),
    [selectedPeople, activeContext]
  )

  return (
    <section className="team-map" aria-label="Team Map">
      {/* ── left roster sidebar ── */}
      <aside className="team-map__roster" aria-label="Team members">
        <div className="team-map__roster-header">
          <div className="team-map__roster-header-left">
            <h3 className="team-map__roster-title">Selected</h3>
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
            <p className="team-map__roster-empty">
              Click people in the panel to add them to your map.
            </p>
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

      {/* ── centre column ── */}
      <div className="team-map__center">
        <div className="team-map__shell">
          <header className="team-map__header">
            <h2 className="team-map__title">Team Map</h2>
            <p className="team-map__subtitle">
              Select people in the left panel to build your team and compare HHG balance by context.
            </p>
          </header>

          <div className="team-map__context-tabs" role="tablist" aria-label="Team context">
            {CONTEXT_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeContext === tab.key}
                className={`team-map__context-tab${activeContext === tab.key ? ' is-active' : ''}`}
                onClick={() => setActiveContext(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="team-map__overview-card">
            <div className="team-map__overview-meta">
              <OverviewBadge scores={teamScores} />
            </div>
            <div className="team-map__overview-radar">
              <RadarChart
                headPercent={teamScores.headPercent}
                heartPercent={teamScores.heartPercent}
                gutPercent={teamScores.gutPercent}
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
