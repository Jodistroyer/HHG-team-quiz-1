import type { Person } from '../PeoplePanel/types'
import { TeamSoloInsights } from './TeamSoloInsights/TeamSoloInsights'
import { TeamPairInsights } from './TeamPairInsights/TeamPairInsights'
import { TeamGroupInsights } from './TeamGroupInsights'
import { TeamMapEmptyIntro } from './TeamMapEmptyIntro/TeamMapEmptyIntro'
import './TeamMap.css'

interface TeamMapProps {
  selectedPeople: Person[]
}

export function TeamMap ({ selectedPeople }: TeamMapProps) {
  const n = selectedPeople.length

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
    <section className="team-map team-map--center-only team-map-results quiz-results-page" aria-label="Team profile">
      <div className="team-map__center">
        <div className="team-map-result-view">
          <TeamGroupInsights selectedPeople={selectedPeople} />
        </div>
      </div>
    </section>
  )
}
