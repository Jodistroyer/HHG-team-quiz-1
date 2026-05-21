import { useMemo, useRef } from 'react'
import type { Person } from '../PeoplePanel/types'
import { TeamResultsSidebar } from './TeamResultsSidebar'
import { TeamSoloInsights } from './TeamSoloInsights/TeamSoloInsights'
import { TeamPairInsights } from './TeamPairInsights/TeamPairInsights'
import { TeamGroupInsights } from './TeamInsights/TeamGroupInsights'
import { TeamMapEmptyIntro } from './TeamMapEmptyIntro/TeamMapEmptyIntro'
import './TeamMap.css'

interface TeamMapProps {
  selectedPeople: Person[]
  activePersonId?: string | null
  rosterHighlightId?: string | null
  onRosterHighlightChange?: (id: string | null) => void
}

function latestQuizCompletedAt (people: Person[]): string | null {
  let latest: string | null = null
  for (const person of people) {
    const at = person.quizCompletedAt
    if (!at) continue
    if (!latest || at > latest) latest = at
  }
  return latest
}

export function TeamMap ({ selectedPeople, activePersonId, rosterHighlightId, onRosterHighlightChange }: TeamMapProps) {
  const scrollRootRef = useRef<HTMLDivElement>(null)
  const resultsContainerRef = useRef<HTMLDivElement>(null)
  const teamQuizCompletedAt = useMemo(() => latestQuizCompletedAt(selectedPeople), [selectedPeople])
  const n = selectedPeople.length
  const activePerson = activePersonId ? selectedPeople.find((p) => p.id === activePersonId) : null

  if (n === 0) {
    return (
      <section
        className="team-map team-map--center-only team-map--empty-intro team-map-results quiz-results-page"
        aria-label="Team map"
      >
        <div className="team-map__center">
          <div className="team-map-result-view">
            <TeamMapEmptyIntro />
          </div>
        </div>
      </section>
    )
  }

  if (activePerson) {
    return (
      <section className="team-map team-map--center-only team-solo-insights-root" aria-label="Individual profile">
        <div className="team-map__center">
          <div className="team-map-result-view">
            <TeamSoloInsights person={activePerson} />
          </div>
        </div>
      </section>
    )
  }

  if (n === 1) {
    return (
      <section className="team-map team-map--center-only team-solo-insights-root" aria-label="Individual profile">
        <div className="team-map__center">
          <div className="team-map-result-view">
            <TeamSoloInsights person={selectedPeople[0]!} />
          </div>
        </div>
      </section>
    )
  }

  if (n === 2) {
    return (
      <section className="team-map team-map--center-only" aria-label="Pair insights">
        <div className="team-map__center">
          <div className="team-map-result-view">
            <TeamPairInsights people={[selectedPeople[0]!, selectedPeople[1]!]} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="team-map team-map--center-only team-map--with-sidebar team-group-insights-root team-map-results quiz-results-page quiz-results-page--embedded"
      aria-label="Team profile"
    >
      <div className="team-map__center" ref={scrollRootRef}>
        <div className="quiz-results-layout team-map__results-layout">
          <div className="team-map-result-view team-map__results-main">
            <TeamGroupInsights
              selectedPeople={selectedPeople}
              rosterHighlightId={rosterHighlightId}
              onRosterHighlightChange={onRosterHighlightChange}
              resultsContainerRef={resultsContainerRef}
            />
          </div>
          <div className="results-sidebar-outer">
            <TeamResultsSidebar
              scrollRootRef={scrollRootRef}
              containerRef={resultsContainerRef}
              quizCompletedAt={teamQuizCompletedAt}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
