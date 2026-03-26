import { useMemo } from 'react'
import type { Person, TeamContextKey, TeamContextScores } from '../PeoplePanel/types'
import { buildFacts } from '../../Quiz/ChangeResults/changeResultsLogic'
import { CombinationAcrossContexts } from '../../Quiz/ChangeResults/CombinationAcrossContexts'
import { WhatStandsOut } from '../../Quiz/ChangeResults/WhatStandsOut'
import { OverallRadar } from '../../Quiz/RadarResults/OverallRadar'
import { getBrainCombination, getBrainIcons } from '../../Quiz/SectionResults/utils.tsx'
import { TEAM_ARCHETYPES } from './teamArchetypes'
import { buildTeamWhatStandsOut } from './teamChangeInsights'
import '../../Quiz/QuizResults.css'
import '../../Quiz/ChangeResults/ChangeResults.css'
import './TeamMap.css'

interface TeamMapProps {
  selectedPeople: Person[]
}

const SITUATIONAL_CONTEXTS: TeamContextKey[] = ['underPressure', 'doingWork', 'withPeople', 'gettingBetter']
const SITUATIONAL_TITLES = ['Under Pressure', 'Doing Work', 'With People', 'Getting Better']

const EMPTY_SCORES: TeamContextScores = { headPercent: 0, heartPercent: 0, gutPercent: 0 }

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

export function TeamMap({ selectedPeople }: TeamMapProps) {
  const overallScores = useMemo(() => averageTeamScores(selectedPeople, 'overall'), [selectedPeople])
  const selectionAnimationKey = useMemo(
    () => selectedPeople.map((person) => person.id).sort().join('|') || 'empty-team',
    [selectedPeople]
  )

  const changeFacts = useMemo(() => {
    if (selectedPeople.length === 0) return null
    const situationalSummaries = SITUATIONAL_CONTEXTS.map((k) => averageTeamScores(selectedPeople, k))
    return buildFacts(situationalSummaries, SITUATIONAL_TITLES)
  }, [selectedPeople])

  const teamInsights = useMemo(() => {
    if (!changeFacts) return []
    return buildTeamWhatStandsOut(changeFacts)
  }, [changeFacts])

  const hasTeam = selectedPeople.length > 0

  return (
    <section className="team-map team-map--center-only team-map-results quiz-results-page" aria-label="Team profile">
      <div className="team-map__center">
        <div className="team-map-results__inner">
          <h1 className="title">Your Team Profile</h1>

          <div key={selectionAnimationKey} className="final-summary">
            <div data-team-section="natural-default">
              <h3 className="results-section-title">Natural Default</h3>
              {!hasTeam ? (
                <div className="team-map-results__empty-card">
                  <p className="team-map-results__empty-text">
                    Select people from the library to see this team&apos;s natural default: the same HHG balance
                    read as the quiz, averaged across selected members, with team (not individual) wording.
                  </p>
                </div>
              ) : (
                <div className="bento-grid">
                  <div className="overall-result">
                    {(() => {
                      const combo = getBrainCombination(
                        overallScores.headPercent,
                        overallScores.heartPercent,
                        overallScores.gutPercent
                      )
                      const isLongLabel = combo.label === 'Head + Heart + Gut'
                      const archetypeData = TEAM_ARCHETYPES[combo.label]
                      return (
                        <div className="overall-result-inner">
                          <p className="team-map-results__archetype-note">Average of {selectedPeople.length} selected people</p>
                          {archetypeData && (
                            <div className="overall-archetype">
                              <h3 className="overall-archetype-name">{archetypeData.archetype}</h3>
                              <div className="overall-badges-row">
                                <div
                                  className={`overall-icon-badge ${isLongLabel ? 'long-label' : ''}`}
                                  style={{ background: 'transparent' }}
                                >
                                  {getBrainIcons(combo.label, 'large')}
                                </div>
                              </div>
                              <p className="overall-archetype-description">{archetypeData.description}</p>
                            </div>
                          )}
                          {!archetypeData && (
                            <div className="overall-badges-row">
                              <div
                                className={`overall-icon-badge ${isLongLabel ? 'long-label' : ''}`}
                                style={{ background: 'transparent' }}
                              >
                                {getBrainIcons(combo.label, 'large')}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })()}
                  </div>

                  <div className="overall-breakdown">
                    <OverallRadar
                      headPercent={overallScores.headPercent}
                      heartPercent={overallScores.heartPercent}
                      gutPercent={overallScores.gutPercent}
                      balanceLabel="Team balance (average)"
                    />
                  </div>
                </div>
              )}
            </div>

            <h3 className="results-section-title">How Your Team Changes Across Contexts</h3>
            {!hasTeam || !changeFacts ? (
              <div className="team-map-results__empty-card team-map-results__empty-card--tight">
                <p className="team-map-results__empty-text">
                  Add at least one person to see how the team&apos;s average combination shifts between Under
                  Pressure, Doing Work, With People, and Getting Better.
                </p>
              </div>
            ) : (
              <div
                id="team-change-across-contexts"
                className="change-results-card"
                data-team-section="change-across-contexts"
              >
                <CombinationAcrossContexts rows={changeFacts.rows} comboHeading="Team combination across contexts" />
                <WhatStandsOut insights={teamInsights} />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
