import { useMemo } from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faCompass } from '@fortawesome/free-solid-svg-icons'
import type { Person, TeamContextKey, TeamContextScores } from '../PeoplePanel/types'
import { buildFacts } from '../../Quiz/ChangeResults/changeResultsLogic'
import { CombinationAcrossContexts } from '../../Quiz/ChangeResults/CombinationAcrossContexts'
import { WhatStandsOut } from '../../Quiz/ChangeResults/WhatStandsOut'
import { SECTION_ICONS, getBrainCombination, getBrainIcons } from '../../Quiz/SectionResults/utils.tsx'
import { TEAM_ARCHETYPES } from './teamArchetypes'
import { buildTeamWhatStandsOut } from './teamChangeInsights'
import { TeamDoingWork } from './TeamInsights/TeamDoingWork'
import { TeamGettingBetter } from './TeamInsights/TeamGettingBetter'
import { TeamUnderPressure } from './TeamInsights/TeamUnderPressure'
import { TeamWithPeople } from './TeamInsights/TeamWithPeople'
import { RadarChart as TeamRadarChart } from './TeamRadarResults/TeamRadarChart'
import '../../Quiz/RadarResults/OverallRadar.css'
import '../../Quiz/QuizResults.css'
import '../../Quiz/ChangeResults/ChangeResults.css'
import './TeamMap.css'

interface TeamMapProps {
  selectedPeople: Person[]
}

interface TeamSectionHeaderProps {
  title: string
  icon: IconDefinition
}

interface TeamCardHeaderProps {
  title: string
  icon: IconDefinition
}

const SITUATIONAL_CONTEXTS: TeamContextKey[] = ['underPressure', 'doingWork', 'withPeople', 'gettingBetter']
const SITUATIONAL_TITLES = ['Under Pressure', 'Doing Work', 'With People', 'Getting Better']

const EMPTY_SCORES: TeamContextScores = { headPercent: 0, heartPercent: 0, gutPercent: 0 }

function TeamSectionHeader({ title, icon }: TeamSectionHeaderProps) {
  return (
    <div className="team-map-results__section-heading">
      <h3 className="results-section-title team-map-results__section-title">
        <span className="team-map-results__section-icon" aria-hidden>
          <FontAwesomeIcon icon={icon} />
        </span>
        <span>{title}</span>
      </h3>
    </div>
  )
}

function TeamCardHeader({ title, icon }: TeamCardHeaderProps) {
  return (
    <div className="team-map-results__card-header">
      <h3 className="results-section-title team-map-results__card-title">
        <span className="team-map-results__section-icon" aria-hidden>
          <FontAwesomeIcon icon={icon} />
        </span>
        <span>{title}</span>
      </h3>
    </div>
  )
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
  const underPressureScores = useMemo(() => averageTeamScores(selectedPeople, 'underPressure'), [selectedPeople])
  const doingWorkScores = useMemo(() => averageTeamScores(selectedPeople, 'doingWork'), [selectedPeople])
  const withPeopleScores = useMemo(() => averageTeamScores(selectedPeople, 'withPeople'), [selectedPeople])
  const gettingBetterScores = useMemo(() => averageTeamScores(selectedPeople, 'gettingBetter'), [selectedPeople])
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
            <section className="team-map-results__section" data-team-section="natural-default">
              <TeamSectionHeader title="Natural Default" icon={faCompass} />
              {!hasTeam ? (
                <div className="team-map-results__empty-card">
                  <p className="team-map-results__empty-text">
                    Select people from the library to see this team&apos;s natural default: the same HHG balance
                    read as the quiz, averaged across selected members, with team (not individual) wording.
                  </p>
                </div>
              ) : (() => {
                const combo = getBrainCombination(
                  overallScores.headPercent,
                  overallScores.heartPercent,
                  overallScores.gutPercent
                )
                const isLongLabel = combo.label === 'Head + Heart + Gut'
                const archetypeData = TEAM_ARCHETYPES[combo.label]
                return (
                  <>
                    <div className="bento-grid team-map-results__natural-default-grid">
                      <div className="team-map-results__natural-default-hero">
                        <div className="team-map-results__natural-default-meta">
                          {archetypeData && (
                            <p className="team-map-results__natural-default-label">{archetypeData.archetype}</p>
                          )}
                          <div className="overall-badges-row team-map-results__natural-default-badges">
                            <div
                              className={`overall-icon-badge ${isLongLabel ? 'long-label' : ''}`}
                              style={{ background: 'transparent' }}
                            >
                              {getBrainIcons(combo.label, 'large')}
                            </div>
                          </div>
                        </div>
                        <h3 className="team-map-results__natural-default-title">
                          {archetypeData?.headline ?? combo.label}
                        </h3>
                      </div>

                      <div className="overall-breakdown">

                        <div className="radar-chart-container">
                          <TeamRadarChart
                            headPercent={overallScores.headPercent}
                            heartPercent={overallScores.heartPercent}
                            gutPercent={overallScores.gutPercent}
                          />
                        </div>
                      </div>
                    </div>
                    {archetypeData && (
                      <div className="team-map-results__natural-default-body">
                        <p className="overall-archetype-description team-map-results__natural-default-description">
                          {archetypeData.description}
                        </p>
                      </div>
                    )}
                  </>
                )
              })()}
            </section>

            <section className="team-map-results__section">
              <TeamSectionHeader title="Team Changes Across Contexts" icon={faArrowsRotate} />
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
                  className="change-results-stack"
                  data-team-section="change-across-contexts"
                >
                  <div className="change-results-card change-results-card--combo">
                    <CombinationAcrossContexts rows={changeFacts.rows} />
                  </div>
                  <WhatStandsOut insights={teamInsights} />
                </div>
              )}
            </section>

            <section className="team-map-results__section">
              {!hasTeam ? (
                <div className="change-results-card team-map-results__context-card">
                  <TeamCardHeader title="Under Pressure" icon={SECTION_ICONS[1]} />
                  <p className="team-map-results__empty-text">
                    Add at least one person to see how this team tends to behave under pressure, based on the
                    average HHG balance in that context.
                  </p>
                </div>
              ) : (
                <div className="change-results-card team-map-results__context-card" data-team-section="under-pressure-insight">
                  <TeamCardHeader title="Under Pressure" icon={SECTION_ICONS[1]} />
                  <TeamUnderPressure
                    headPercent={underPressureScores.headPercent}
                    heartPercent={underPressureScores.heartPercent}
                    gutPercent={underPressureScores.gutPercent}
                  />
                </div>
              )}
            </section>

            <section className="team-map-results__section">
              {!hasTeam ? (
                <div className="change-results-card team-map-results__context-card">
                  <TeamCardHeader title="Doing Work" icon={SECTION_ICONS[2]} />
                  <p className="team-map-results__empty-text">
                    Add at least one person to see how this team tends to approach work, based on the average HHG
                    balance in that context.
                  </p>
                </div>
              ) : (
                <div className="change-results-card team-map-results__context-card" data-team-section="doing-work-insight">
                  <TeamCardHeader title="Doing Work" icon={SECTION_ICONS[2]} />
                  <TeamDoingWork
                    headPercent={doingWorkScores.headPercent}
                    heartPercent={doingWorkScores.heartPercent}
                    gutPercent={doingWorkScores.gutPercent}
                  />
                </div>
              )}
            </section>

            <section className="team-map-results__section">
              {!hasTeam ? (
                <div className="change-results-card team-map-results__context-card">
                  <TeamCardHeader title="With People" icon={SECTION_ICONS[3]} />
                  <p className="team-map-results__empty-text">
                    Add at least one person to see how this team tends to show up with people, based on the
                    average HHG balance in that context.
                  </p>
                </div>
              ) : (
                <div className="change-results-card team-map-results__context-card" data-team-section="with-people-insight">
                  <TeamCardHeader title="With People" icon={SECTION_ICONS[3]} />
                  <TeamWithPeople
                    headPercent={withPeopleScores.headPercent}
                    heartPercent={withPeopleScores.heartPercent}
                    gutPercent={withPeopleScores.gutPercent}
                  />
                </div>
              )}
            </section>

            <section className="team-map-results__section">
              {!hasTeam ? (
                <div className="change-results-card team-map-results__context-card">
                  <TeamCardHeader title="Getting Better" icon={SECTION_ICONS[4]} />
                  <p className="team-map-results__empty-text">
                    Add at least one person to see how this team tends to grow and improve, based on the average
                    HHG balance in that context.
                  </p>
                </div>
              ) : (
                <div className="change-results-card team-map-results__context-card" data-team-section="getting-better-insight">
                  <TeamCardHeader title="Getting Better" icon={SECTION_ICONS[4]} />
                  <TeamGettingBetter
                    headPercent={gettingBetterScores.headPercent}
                    heartPercent={gettingBetterScores.heartPercent}
                    gutPercent={gettingBetterScores.gutPercent}
                  />
                </div>
              )}
            </section>
          </div>

        </div>
      </div>
    </section>
  )
}
