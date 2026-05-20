import type { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTriangleExclamation, faEye } from '@fortawesome/free-solid-svg-icons'
import { getBalanceTipBadgeStyle, getBrainCombination } from '../../../Quiz/SectionResults/utils.tsx'
import { TeamContextInsightHeadline } from './TeamContextInsightHeadline'
import { TeamStyleBreakdown } from './TeamStyleBreakdown'
import './TeamGroupInsights.css'

interface TeamUnderPressureProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
  metaRow?: ReactNode
}

interface TeamPressureInsight {
  displayLabel: string
  title: string
  strength: string
  gap: string
  watchFor: string
}

const TEAM_UNDER_PRESSURE_INSIGHTS: Record<string, TeamPressureInsight> = {
  Head: {
    displayLabel: 'Head Strong',
    title: 'An analysis driven team that seeks clarity before action',
    strength: 'Seeks to fully understand the situation before acting. Reduces risk by relying on logic, data, and structured thinking even in high-pressure scenarios.',
    gap: 'Less Gut or Heart. The team may hesitate, over-analyse, and struggle to act quickly when time-sensitive decisions are required.',
    watchFor: 'Stalling when speed matters. Pressure increases the need for certainty, which can delay necessary action.'
  },
  'Head + Gut': {
    displayLabel: 'Head + Gut',
    title: 'A decisive team that balances thinking with action',
    strength: 'Combines rapid assessment with confident execution. Able to act under pressure without freezing, even when information is incomplete.',
    gap: 'Less Heart. The team may overlook emotional impact or stakeholder concerns in high-stress situations.',
    watchFor: 'Pushing decisions through too quickly without considering how others are affected.'
  },
  'Head + Heart': {
    displayLabel: 'Head + Heart',
    title: 'A thoughtful team that balances logic with empathy',
    strength: 'Considers both the situation and the people involved. Makes careful, responsible decisions that account for wider impact.',
    gap: 'Less Gut. The team may slow down under pressure, seeking alignment and reassurance before acting.',
    watchFor: 'Indecision in fast-moving situations due to over-consultation or needing consensus.'
  },
  Heart: {
    displayLabel: 'Heart only',
    title: 'A relationship driven team that protects harmony under stress',
    strength: 'Maintains emotional stability and prioritises relationships even in difficult situations. Helps reduce conflict and tension.',
    gap: 'Less Head or Gut. The team may avoid hard decisions and struggle to act decisively when pressure rises.',
    watchFor: 'Delaying necessary action to avoid discomfort or conflict.'
  },
  'Heart + Gut': {
    displayLabel: 'Heart + Gut',
    title: 'An instinctive team that acts quickly with care',
    strength: 'Able to respond fast while still considering people. Brings both urgency and emotional awareness into decisions.',
    gap: 'Less Head. Decisions may rely more on feeling than analysis, especially under stress.',
    watchFor: 'Acting on emotion without fully understanding the situation.'
  },
  'Heart + Head': {
    displayLabel: 'Heart + Head',
    title: 'A people conscious team that thinks before acting',
    strength: 'Balances care and logic. Takes time to understand both the situation and its impact on others before responding.',
    gap: 'Less Gut. May struggle with speed and decisiveness when immediate action is needed.',
    watchFor: 'Slowing down too much in urgent situations due to alignment and reflection.'
  },
  Gut: {
    displayLabel: 'Gut only',
    title: 'An instinct driven team that acts fast under pressure',
    strength: 'Highly decisive and action-oriented. Responds quickly and confidently without hesitation.',
    gap: 'Less Head or Heart. May ignore data and emotional consequences when making fast decisions.',
    watchFor: 'Impulsive actions that require correction later.'
  },
  'Gut + Head': {
    displayLabel: 'Gut + Head',
    title: 'A fast and structured team under pressure',
    strength: 'Quick to act with a level of analysis. Can assess situations rapidly and execute with confidence.',
    gap: 'Less Heart. May overlook how decisions affect people during high-pressure moments.',
    watchFor: 'Prioritising speed and logic over empathy, leading to friction with others.'
  },
  'Gut + Heart': {
    displayLabel: 'Gut + Heart',
    title: 'A responsive team that blends urgency with empathy',
    strength: 'Acts quickly while still considering emotional impact. Maintains momentum without losing connection to people.',
    gap: 'Less Head. May not fully analyse the situation before acting, especially under stress.',
    watchFor: 'Well-meaning but under-thought decisions driven by urgency.'
  },
  'Head + Heart + Gut': {
    displayLabel: 'Head + Heart + Gut',
    title: 'A balanced team with access to thinking, feeling, and instinct',
    strength: 'Highly adaptable under pressure. Can analyse, empathise, and act depending on what the situation requires.',
    gap: 'The team may struggle to align quickly when each perspective pulls in a different direction.',
    watchFor: 'Slowed decision-making due to internal differences in how the situation should be handled.'
  }
}

function normalizeInsightKey(label: string): string {
  return label.replace(/\s+Strong$/, '')
}

function getMissingBrainCombo(label: string): string | null {
  const map: Record<string, string | null> = {
    Head: 'Heart + Gut',
    'Head + Gut': 'Heart',
    'Head + Heart': 'Gut',
    Heart: 'Head + Gut',
    'Heart + Gut': 'Head',
    'Heart + Head': 'Gut',
    Gut: 'Head + Heart',
    'Gut + Head': 'Heart',
    'Gut + Heart': 'Head',
    'Head + Heart + Gut': 'Focus'
  }

  return map[label] ?? null
}

export function TeamUnderPressure({
  headPercent,
  heartPercent,
  gutPercent,
  metaRow,
}: TeamUnderPressureProps) {
  const combo = getBrainCombination(headPercent, heartPercent, gutPercent)
  const normalizedKey = normalizeInsightKey(combo.label)
  const insight = TEAM_UNDER_PRESSURE_INSIGHTS[normalizedKey] ?? TEAM_UNDER_PRESSURE_INSIGHTS.Head
  const missingBrainCombo = getMissingBrainCombo(normalizedKey)
  const missingBrainBadgeStyle = missingBrainCombo ? getBalanceTipBadgeStyle(missingBrainCombo) : null
  return (
    <div className="team-context-insight">
      <TeamContextInsightHeadline
        contextKey="underPressure"
        combo={combo}
        insightTitleId="team-under-pressure-title"
        insightTitle={insight.title}
      />
      {metaRow}
      <TeamStyleBreakdown
        headPercent={headPercent}
        heartPercent={heartPercent}
        gutPercent={gutPercent}
      />

      <div className="team-context-insight__cards">
        <article className="team-context-insight__card team-context-insight__card--strength">
          <div className="team-context-insight__card-header">
            <h5 className="team-context-insight__card-title">
              <span className="team-context-insight__card-icon" aria-hidden>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              Best Case Scenario
            </h5>
          </div>
          <p className="team-context-insight__card-text">{insight.strength}</p>
        </article>

        <article className="team-context-insight__card team-context-insight__card--gap">
          <div className="team-context-insight__card-header">
            <h5 className="team-context-insight__card-title">
              <span className="team-context-insight__card-icon" aria-hidden>
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </span>
              Gap
            </h5>
            {missingBrainCombo && missingBrainBadgeStyle && (
              <div className="team-context-insight__gap-badge-row">
                <span className="brain-combo-badge" style={missingBrainBadgeStyle}>
                  {missingBrainCombo}
                </span>
              </div>
            )}
          </div>
          <p className="team-context-insight__card-text">{insight.gap}</p>
        </article>

        <article className="team-context-insight__card team-context-insight__card--watch">
          <div className="team-context-insight__card-header">
            <h5 className="team-context-insight__card-title">
              <span className="team-context-insight__card-icon" aria-hidden>
                <FontAwesomeIcon icon={faEye} />
              </span>
              Watch for
            </h5>
          </div>
          <p className="team-context-insight__card-text">{insight.watchFor}</p>
        </article>
      </div>
    </div>
  )
}
