import { useMemo } from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faCompass } from '@fortawesome/free-solid-svg-icons'
import type { Person, TeamContextKey, TeamContextScores } from '../../PeoplePanel/types'
import { getSituationalContextScores } from '../../contextHhgScores'
import { buildFacts } from '../../../Quiz/ChangeResults/changeResultsLogic'
import { CombinationAcrossContexts } from '../../../Quiz/ChangeResults/CombinationAcrossContexts'
import { WhatStandsOut } from '../../../Quiz/ChangeResults/WhatStandsOut'
import { SECTION_ICONS, getBrainCombination, getBrainIcons } from '../../../Quiz/SectionResults/utils.tsx'
import { TEAM_ARCHETYPES } from './teamArchetypes'
import { buildTeamWhatStandsOut } from './teamWhatStandsOut'
import { TeamDoingWork } from './TeamDoingWork'
import { TeamGettingBetter } from './TeamGettingBetter'
import { TeamUnderPressure } from './TeamUnderPressure'
import { TeamWithPeople } from './TeamWithPeople'
import { TreemapChart } from '../../../Quiz/TreemapResults/TreemapChart'
import '../../../Quiz/RadarResults/OverallRadar.css'
import '../../../Quiz/QuizResults.css'
import '../../../Quiz/ChangeResults/ChangeResults.css'
import '../TeamMap.css'

interface TeamGroupInsightsProps {
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

const SITUATIONAL_SECTIONS_FOR_COMBO_UI = SITUATIONAL_TITLES.map((title, i) => ({
  id: i + 1,
  title,
  questions: [] as { id: string }[],
}))

const EMPTY_SCORES: TeamContextScores = { headPercent: 0, heartPercent: 0, gutPercent: 0 }

function TeamSectionHeader ({ title, icon }: TeamSectionHeaderProps) {
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

function TeamCardHeader ({ title, icon }: TeamCardHeaderProps) {
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

function getScoresForContext (person: Person, context: TeamContextKey): TeamContextScores {
  return getSituationalContextScores(person, context)
}

function averageTeamScores (people: Person[], context: TeamContextKey): TeamContextScores {
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

export function TeamGroupInsights ({ selectedPeople }: TeamGroupInsightsProps) {
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

  const combo = getBrainCombination(
    overallScores.headPercent,
    overallScores.heartPercent,
    overallScores.gutPercent
  )
  const isLongLabel = combo.label === 'Head + Heart + Gut'
  const archetypeData = TEAM_ARCHETYPES[combo.label]

  return (
    <div className="team-map-results__inner">
      <h1 className="title">Your Team Profile</h1>

      <div key={selectionAnimationKey} className="final-summary">
        <section className="team-map-results__section" data-team-section="natural-default">
          <TeamSectionHeader title="Natural Default" icon={faCompass} />
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
                    {getBrainIcons(combo.label, 'large', 'changeResults')}
                  </div>
                </div>
              </div>
              <h3 className="team-map-results__natural-default-title">
                {archetypeData?.headline ?? combo.label}
              </h3>
            </div>

            <div className="overall-breakdown">
              <div className="radar-chart-container">
                <TreemapChart
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
        </section>

        <section className="team-map-results__section">
          <TeamSectionHeader title="Team Changes Across Contexts" icon={faArrowsRotate} />
          {changeFacts && (
            <div
              id="team-change-across-contexts"
              className="change-results-stack"
              data-team-section="change-across-contexts"
            >
              <div className="change-results-card change-results-card--combo">
                <CombinationAcrossContexts rows={changeFacts.rows} sections={SITUATIONAL_SECTIONS_FOR_COMBO_UI} />
              </div>
              <WhatStandsOut insights={teamInsights} />
            </div>
          )}
        </section>

        <section className="team-map-results__section">
          <div className="change-results-card team-map-results__context-card" data-team-section="under-pressure-insight">
            <TeamCardHeader title="Under Pressure" icon={SECTION_ICONS[1]} />
            <TeamUnderPressure
              headPercent={underPressureScores.headPercent}
              heartPercent={underPressureScores.heartPercent}
              gutPercent={underPressureScores.gutPercent}
            />
          </div>
        </section>

        <section className="team-map-results__section">
          <div className="change-results-card team-map-results__context-card" data-team-section="doing-work-insight">
            <TeamCardHeader title="Doing Work" icon={SECTION_ICONS[2]} />
            <TeamDoingWork
              headPercent={doingWorkScores.headPercent}
              heartPercent={doingWorkScores.heartPercent}
              gutPercent={doingWorkScores.gutPercent}
            />
          </div>
        </section>

        <section className="team-map-results__section">
          <div className="change-results-card team-map-results__context-card" data-team-section="with-people-insight">
            <TeamCardHeader title="With People" icon={SECTION_ICONS[3]} />
            <TeamWithPeople
              headPercent={withPeopleScores.headPercent}
              heartPercent={withPeopleScores.heartPercent}
              gutPercent={withPeopleScores.gutPercent}
            />
          </div>
        </section>

        <section className="team-map-results__section">
          <div className="change-results-card team-map-results__context-card" data-team-section="getting-better-insight">
            <TeamCardHeader title="Getting Better" icon={SECTION_ICONS[4]} />
            <TeamGettingBetter
              headPercent={gettingBetterScores.headPercent}
              heartPercent={gettingBetterScores.heartPercent}
              gutPercent={gettingBetterScores.gutPercent}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
