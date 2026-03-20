import { useMemo, type CSSProperties } from 'react'
import type { Person, TeamContextKey, TeamContextScores } from '../PeoplePanel/types'
import { RadarChart } from './TeamRadarResults/TeamRadarChart'
import { getBrainCombination } from '../../Quiz/SectionResults/utils'
import './TeamMap.css'
import './TeamRadarResults/TeamAllRadarsSection.css'

interface TeamMapProps {
  selectedPeople: Person[]
  activeContext: TeamContextKey
  onActiveContextChange: (context: TeamContextKey) => void
}

const CONTEXT_TABS: Array<{ key: TeamContextKey; label: string }> = [
  { key: 'underPressure', label: 'Under Pressure' },
  { key: 'doingWork', label: 'Doing Work' },
  { key: 'withPeople', label: 'With People' },
  { key: 'gettingBetter', label: 'Getting Better' },
]

const EMPTY_SCORES: TeamContextScores = { headPercent: 0, heartPercent: 0, gutPercent: 0 }

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

function makeBadgeStyle(colors: string[]): CSSProperties {
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

export function TeamMap({ selectedPeople, activeContext, onActiveContextChange }: TeamMapProps) {
  const teamScores = useMemo(
    () => averageTeamScores(selectedPeople, activeContext),
    [selectedPeople, activeContext]
  )

  return (
    <section className="team-map team-map--center-only" aria-label="Team Map">
      <div className="team-map__center">
        <div className="team-map__shell">
          <header className="team-map__header">
            <h2 className="team-map__title">Team Map</h2>
            <p className="team-map__subtitle">
              Select people in the library to build your team and compare HHG balance by context.
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
                onClick={() => onActiveContextChange(tab.key)}
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
