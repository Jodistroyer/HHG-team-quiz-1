import { useMemo, type CSSProperties } from 'react'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faCompass } from '@fortawesome/free-solid-svg-icons'
import type { Person, TeamContextKey, TeamContextScores } from '../../PeoplePanel/types'
import {
  getSituationalContextScores,
  getTeamContextParticipation,
  getTeamQuizParticipation,
  personHasCompletedAllContexts,
  SITUATIONAL_TEAM_CONTEXTS,
  type SituationalTeamContextKey,
} from '../../contextHhgScores'
import { buildFacts } from '../../../Quiz/ChangeResults/changeResultsLogic'
import { CombinationAcrossContexts } from '../../../Quiz/ChangeResults/CombinationAcrossContexts'
import { WhatStandsOut } from '../../../Quiz/ChangeResults/WhatStandsOut'
import { SECTION_ICONS, getBrainCombination, getBrainIcons } from '../../../Quiz/SectionResults/utils.tsx'
import { SECTION_CONTEXT_BY_ID } from '../../../Quiz/sectionContext'
import { CONTEXT_BACKGROUND, ContextCardArt, contextIdForTitle, type QuizSelectedContextId } from '../../../Quiz/ContextArt'
import '../../../Quiz/SectionResults/SectionCard.css'
import { NaturalDefaultArchetypeParts } from '../../../Quiz/NaturalDefaultArchetypeParts'
import { TEAM_ARCHETYPES } from './teamArchetypes'
import { GROUP_OVERALL_PARTS } from './groupOverallArchetypes'
import { buildTeamWhatStandsOut } from './teamWhatStandsOut'
import { TeamDoingWork } from './TeamDoingWork'
import { TeamGettingBetter } from './TeamGettingBetter'
import { TeamUnderPressure } from './TeamUnderPressure'
import { TeamWithPeople } from './TeamWithPeople'
import { TeamParticipationNote, type TeamParticipationNoteProps } from './TeamParticipationNote'
import { TeamIncompleteMembers } from './TeamIncompleteMembers'
import { TeamSectionMemberStatus, type TeamSectionCompletionKind } from './TeamSectionMemberStatus'
import { TreemapChart } from '../../../Quiz/TreemapResults/TreemapChart'
import '../../../Quiz/RadarResults/OverallRadar.css'
import '../../../Quiz/QuizResults.css'
import '../../../Quiz/NaturalDefaultArchetypeParts.css'
import '../../../Quiz/ChangeResults/ChangeResults.css'
import '../TeamMap.css'

interface TeamGroupInsightsProps {
  selectedPeople: Person[]
  rosterHighlightId?: string | null
  onRosterHighlightChange?: (id: string | null) => void
}

interface TeamSectionHeaderProps {
  title: string
  icon: IconDefinition
}

interface TeamContextCardTopProps {
  title: string
  icon: IconDefinition
}

interface TeamContextCardMetaRowProps {
  participation: TeamParticipationNoteProps
  selectedPeople: Person[]
  completionKind: TeamSectionCompletionKind
  rosterHighlightId?: string | null
  onRosterHighlightChange?: (id: string | null) => void
}

const SITUATIONAL_CONTEXTS: TeamContextKey[] = [...SITUATIONAL_TEAM_CONTEXTS]
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

function TeamContextCardTop ({ title, icon }: TeamContextCardTopProps) {
  const sectionId = contextIdForTitle(title)
  if (sectionId === undefined) return null

  const sectionStyle = {
    '--section-context-color': CONTEXT_BACKGROUND[sectionId],
  } as CSSProperties

  return (
    <div className="section-card-top team-map-results__context-card-top" style={sectionStyle}>
      <div className="section-card-art" aria-hidden="true">
        <ContextCardArt id={sectionId as QuizSelectedContextId} />
      </div>
      <div className="section-card-top__text">
        <div className="section-card-header">
          <div className="section-header-content">
            <span className="section-title-icon" aria-hidden="true">
              <FontAwesomeIcon icon={icon} />
            </span>
            <h4>{title}</h4>
          </div>
        </div>
        {SECTION_CONTEXT_BY_ID[sectionId] && (
          <p className="section-card-context">{SECTION_CONTEXT_BY_ID[sectionId]}</p>
        )}
      </div>
    </div>
  )
}

function TeamContextCardMetaRow ({
  participation,
  selectedPeople,
  completionKind,
  rosterHighlightId,
  onRosterHighlightChange,
}: TeamContextCardMetaRowProps) {
  return (
    <div className="team-map-results__context-card-meta-row">
      <TeamParticipationNote {...participation} />
      <TeamSectionMemberStatus
        selectedPeople={selectedPeople}
        completionKind={completionKind}
        rosterHighlightId={rosterHighlightId}
        onRosterHighlightChange={onRosterHighlightChange}
      />
    </div>
  )
}

function getScoresForContext (person: Person, context: TeamContextKey): TeamContextScores {
  return getSituationalContextScores(person, context)
}

/** Average HHG scores using only members who completed all situational contexts. */
function averageTeamScores (people: Person[], context: TeamContextKey): TeamContextScores {
  const contributors = people.filter(personHasCompletedAllContexts)
  if (contributors.length === 0) return EMPTY_SCORES
  const totals = contributors.reduce(
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
    headPercent: totals.headPercent / contributors.length,
    heartPercent: totals.heartPercent / contributors.length,
    gutPercent: totals.gutPercent / contributors.length,
  }
}

export function TeamGroupInsights ({
  selectedPeople,
  rosterHighlightId,
  onRosterHighlightChange,
}: TeamGroupInsightsProps) {
  const participation = useMemo(() => getTeamQuizParticipation(selectedPeople), [selectedPeople])
  const { contributingCount, totalSelected, incompletePeople } = participation

  const situationalParticipation = useMemo(
    () =>
      Object.fromEntries(
        SITUATIONAL_TEAM_CONTEXTS.map((ctx) => [ctx, getTeamContextParticipation(selectedPeople, ctx)])
      ) as Record<SituationalTeamContextKey, ReturnType<typeof getTeamContextParticipation>>,
    [selectedPeople]
  )

  const contributingPeople = useMemo(
    () => selectedPeople.filter(personHasCompletedAllContexts),
    [selectedPeople]
  )

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
    if (contributingPeople.length === 0) return null
    const situationalSummaries = SITUATIONAL_CONTEXTS.map((k) => averageTeamScores(selectedPeople, k))
    const sectionQuizComplete = SITUATIONAL_CONTEXTS.map(() => true)
    return buildFacts(situationalSummaries, SITUATIONAL_TITLES, sectionQuizComplete)
  }, [contributingPeople.length, selectedPeople])

  const teamInsights = useMemo(() => {
    if (!changeFacts) return []
    return buildTeamWhatStandsOut(changeFacts)
  }, [changeFacts])

  const hasTeamScores = contributingCount > 0

  const combo = hasTeamScores
    ? getBrainCombination(
        overallScores.headPercent,
        overallScores.heartPercent,
        overallScores.gutPercent
      )
    : null
  const isLongLabel = combo?.label === 'Head + Heart + Gut'
  const archetypeData = combo ? TEAM_ARCHETYPES[combo.label] : undefined
  const groupParts = combo ? GROUP_OVERALL_PARTS[combo.label] : undefined

  const participationProps = { contributingCount, totalSelected }

  return (
    <div className="team-map-results__inner">
      <div className="team-map-results__page-header">
        <h1 className="title">Your Team Profile</h1>
        {totalSelected > 0 && (
          <TeamIncompleteMembers
            incompletePeople={incompletePeople}
            rosterHighlightId={rosterHighlightId}
            onRosterHighlightChange={onRosterHighlightChange}
          />
        )}
      </div>

      <div key={selectionAnimationKey} className="final-summary">
        <section className="team-map-results__section" data-team-section="natural-default">
          <TeamSectionHeader title="Natural Default" icon={faCompass} />
          <TeamParticipationNote {...participationProps} />
          {hasTeamScores && combo ? (
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
              {groupParts && (
                <div className="quiz-results__natural-default-body" data-pdf-section="natural-default-parts">
                  <NaturalDefaultArchetypeParts
                    archetypeKey={combo.label}
                    parts={groupParts}
                    descriptionAriaLabel="This team's natural default breakdown"
                  />
                </div>
              )}
            </>
          ) : (
            <p className="team-map-results__empty-card change-results-incomplete-copy">
              No team members have completed all HHG contexts yet. Scores and insights appear once at least one member
              has finished the full quiz.
            </p>
          )}
        </section>

        <section className="team-map-results__section">
          <TeamSectionHeader title="Team Changes Across Contexts" icon={faArrowsRotate} />
          <TeamParticipationNote {...participationProps} />
          {changeFacts ? (
            <div
              id="team-change-across-contexts"
              className="change-results-stack"
              data-team-section="change-across-contexts"
            >
              <div className="change-results-card change-results-card--combo">
                <TeamParticipationNote
                  {...participationProps}
                  className="team-map-results__participation--combo"
                />
                <CombinationAcrossContexts rows={changeFacts.rows} sections={SITUATIONAL_SECTIONS_FOR_COMBO_UI} />
              </div>
              <WhatStandsOut insights={teamInsights} />
            </div>
          ) : (
            <p className="team-map-results__empty-card change-results-incomplete-copy">
              Team change insights need at least one member who has completed all contexts.
            </p>
          )}
        </section>

        <section className="team-map-results__section">
          <div className="change-results-card team-map-results__context-card" data-team-section="under-pressure-insight">
            <TeamContextCardTop title="Under Pressure" icon={SECTION_ICONS[1]} />
            <div className="team-map-results__context-card-body section-expanded-content">
              {hasTeamScores ? (
                <TeamUnderPressure
                  headPercent={underPressureScores.headPercent}
                  heartPercent={underPressureScores.heartPercent}
                  gutPercent={underPressureScores.gutPercent}
                  metaRow={
                    <TeamContextCardMetaRow
                      participation={situationalParticipation.underPressure}
                      selectedPeople={selectedPeople}
                      completionKind="underPressure"
                      rosterHighlightId={rosterHighlightId}
                      onRosterHighlightChange={onRosterHighlightChange}
                    />
                  }
                />
              ) : (
                <>
                  <TeamContextCardMetaRow
                    participation={situationalParticipation.underPressure}
                    selectedPeople={selectedPeople}
                    completionKind="underPressure"
                    rosterHighlightId={rosterHighlightId}
                    onRosterHighlightChange={onRosterHighlightChange}
                  />
                  <p className="change-results-incomplete-copy">Waiting for completed quiz data from the team.</p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="team-map-results__section">
          <div className="change-results-card team-map-results__context-card" data-team-section="doing-work-insight">
            <TeamContextCardTop title="Doing Work" icon={SECTION_ICONS[2]} />
            <div className="team-map-results__context-card-body section-expanded-content">
              {hasTeamScores ? (
                <TeamDoingWork
                  headPercent={doingWorkScores.headPercent}
                  heartPercent={doingWorkScores.heartPercent}
                  gutPercent={doingWorkScores.gutPercent}
                  metaRow={
                    <TeamContextCardMetaRow
                      participation={situationalParticipation.doingWork}
                      selectedPeople={selectedPeople}
                      completionKind="doingWork"
                      rosterHighlightId={rosterHighlightId}
                      onRosterHighlightChange={onRosterHighlightChange}
                    />
                  }
                />
              ) : (
                <>
                  <TeamContextCardMetaRow
                    participation={situationalParticipation.doingWork}
                    selectedPeople={selectedPeople}
                    completionKind="doingWork"
                    rosterHighlightId={rosterHighlightId}
                    onRosterHighlightChange={onRosterHighlightChange}
                  />
                  <p className="change-results-incomplete-copy">Waiting for completed quiz data from the team.</p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="team-map-results__section">
          <div className="change-results-card team-map-results__context-card" data-team-section="with-people-insight">
            <TeamContextCardTop title="With People" icon={SECTION_ICONS[3]} />
            <div className="team-map-results__context-card-body section-expanded-content">
              {hasTeamScores ? (
                <TeamWithPeople
                  headPercent={withPeopleScores.headPercent}
                  heartPercent={withPeopleScores.heartPercent}
                  gutPercent={withPeopleScores.gutPercent}
                  metaRow={
                    <TeamContextCardMetaRow
                      participation={situationalParticipation.withPeople}
                      selectedPeople={selectedPeople}
                      completionKind="withPeople"
                      rosterHighlightId={rosterHighlightId}
                      onRosterHighlightChange={onRosterHighlightChange}
                    />
                  }
                />
              ) : (
                <>
                  <TeamContextCardMetaRow
                    participation={situationalParticipation.withPeople}
                    selectedPeople={selectedPeople}
                    completionKind="withPeople"
                    rosterHighlightId={rosterHighlightId}
                    onRosterHighlightChange={onRosterHighlightChange}
                  />
                  <p className="change-results-incomplete-copy">Waiting for completed quiz data from the team.</p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="team-map-results__section">
          <div className="change-results-card team-map-results__context-card" data-team-section="getting-better-insight">
            <TeamContextCardTop title="Getting Better" icon={SECTION_ICONS[4]} />
            <div className="team-map-results__context-card-body section-expanded-content">
              {hasTeamScores ? (
                <TeamGettingBetter
                  headPercent={gettingBetterScores.headPercent}
                  heartPercent={gettingBetterScores.heartPercent}
                  gutPercent={gettingBetterScores.gutPercent}
                  metaRow={
                    <TeamContextCardMetaRow
                      participation={situationalParticipation.gettingBetter}
                      selectedPeople={selectedPeople}
                      completionKind="gettingBetter"
                      rosterHighlightId={rosterHighlightId}
                      onRosterHighlightChange={onRosterHighlightChange}
                    />
                  }
                />
              ) : (
                <>
                  <TeamContextCardMetaRow
                    participation={situationalParticipation.gettingBetter}
                    selectedPeople={selectedPeople}
                    completionKind="gettingBetter"
                    rosterHighlightId={rosterHighlightId}
                    onRosterHighlightChange={onRosterHighlightChange}
                  />
                  <p className="change-results-incomplete-copy">Waiting for completed quiz data from the team.</p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
