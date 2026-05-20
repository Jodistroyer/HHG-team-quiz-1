import type { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTriangleExclamation, faEye } from '@fortawesome/free-solid-svg-icons'
import { getBalanceTipBadgeStyle, getBrainCombination } from '../../../Quiz/SectionResults/utils.tsx'
import { TeamContextInsightHeadline } from './TeamContextInsightHeadline'
import { TeamStyleBreakdown } from './TeamStyleBreakdown'
import './TeamGroupInsights.css'

interface TeamDoingWorkProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
  metaRow?: ReactNode
}

interface TeamWorkInsight {
  displayLabel: string
  title: string
  strength: string
  gap: string
  watchFor: string
}

const TEAM_DOING_WORK_INSIGHTS: Record<string, TeamWorkInsight> = {
  Head: {
    displayLabel: 'Head Strong',
    title: 'An analysis driven team that values structure and precision',
    strength: 'Highly structured and methodical. Produces well-reasoned, thorough work with strong attention to detail and logical consistency.',
    gap: 'Less Gut and Heart. The team may spend too long planning or refining, and may not naturally prioritise momentum or relational dynamics.',
    watchFor: 'Over-engineering solutions. Work can become heavier than necessary due to excessive analysis or perfectionism.'
  },
  'Head + Gut': {
    displayLabel: 'Head + Gut',
    title: 'A productive team that balances planning with execution',
    strength: 'Combines clear thinking with strong action. Plans are not just created but followed through, leading to consistent delivery.',
    gap: 'Less Heart. The team may focus more on output than on how people experience the work process.',
    watchFor: 'Moving faster than others can keep up. Execution may outpace alignment or communication.'
  },
  'Head + Heart': {
    displayLabel: 'Head + Heart',
    title: 'A thoughtful team that values both quality and people',
    strength: 'Produces work that is both high-quality and considerate of its impact. Strong attention to detail alongside awareness of user or stakeholder needs.',
    gap: 'Less Gut. The team may take more time to move from planning to execution, especially when alignment is not complete.',
    watchFor: 'Over-consultation. Work may slow down due to wanting everyone aligned before progressing.'
  },
  Heart: {
    displayLabel: 'Heart only',
    title: 'A collaborative team that prioritises harmony in work',
    strength: 'Supportive and cooperative. Creates a positive working environment where people feel included and valued.',
    gap: 'Less Head and Gut. The team may lack structure and momentum, especially when tasks require independent drive or analytical depth.',
    watchFor: 'Lack of clarity or direction. Work may depend too much on external structure to stay on track.'
  },
  'Heart + Gut': {
    displayLabel: 'Heart + Gut',
    title: 'An energetic team that works through connection and action',
    strength: 'Driven and people-centred. Gets work moving quickly while maintaining strong team energy and engagement.',
    gap: 'Less Head. Work may lack consistency or rigour if structure and planning are not intentionally added.',
    watchFor: 'Inconsistent quality. Output may vary depending on how much structure is in place.'
  },
  'Heart + Head': {
    displayLabel: 'Heart + Head',
    title: 'A people first team with structured thinking',
    strength: 'Balances thoughtful planning with care for people. Produces work that is both organised and considerate.',
    gap: 'Less Gut. The team may not naturally push work forward quickly without clear triggers or urgency.',
    watchFor: 'Slow momentum. Work may progress steadily but not quickly when speed is needed.'
  },
  Gut: {
    displayLabel: 'Gut only',
    title: 'An action oriented team that prioritises momentum',
    strength: 'Highly proactive. Gets work started and keeps things moving without getting stuck in overthinking.',
    gap: 'Less Head and Heart. Work may lack planning depth and may not fully consider stakeholder needs.',
    watchFor: 'Rushing into execution. Important details or implications may be missed.'
  },
  'Gut + Head': {
    displayLabel: 'Gut + Head',
    title: 'A delivery focused team with speed and structure',
    strength: 'Strong at execution with a level of analytical grounding. Can move quickly while maintaining a reasonable degree of clarity.',
    gap: 'Less Heart. The team may prioritise tasks over team experience or collaboration quality.',
    watchFor: 'Over-focusing on output. The way work feels for others may be overlooked.'
  },
  'Gut + Heart': {
    displayLabel: 'Gut + Heart',
    title: 'A motivated team that blends action with connection',
    strength: 'Works with energy and care. Able to maintain momentum while keeping people engaged and supported.',
    gap: 'Less Head. Planning and consistency may be weaker without deliberate structure.',
    watchFor: 'Well-intentioned but under-structured work. Execution may outpace preparation.'
  },
  'Head + Heart + Gut': {
    displayLabel: 'Head + Heart + Gut',
    title: 'A well rounded team across thinking, action, and people',
    strength: 'Capable across multiple work styles. Can plan, execute, and consider people effectively depending on the task.',
    gap: 'May lean in different directions depending on the situation. Coordination is needed to stay aligned on how work should be approached.',
    watchFor: 'Misalignment in working styles. Without clarity, different approaches can create friction or inefficiency.'
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

export function TeamDoingWork({
  headPercent,
  heartPercent,
  gutPercent,
  metaRow,
}: TeamDoingWorkProps) {
  const combo = getBrainCombination(headPercent, heartPercent, gutPercent)
  const normalizedKey = normalizeInsightKey(combo.label)
  const insight = TEAM_DOING_WORK_INSIGHTS[normalizedKey] ?? TEAM_DOING_WORK_INSIGHTS.Head
  const missingBrainCombo = getMissingBrainCombo(normalizedKey)
  const missingBrainBadgeStyle = missingBrainCombo ? getBalanceTipBadgeStyle(missingBrainCombo) : null
  return (
    <div className="team-context-insight">
      <TeamContextInsightHeadline
        contextKey="doingWork"
        combo={combo}
        insightTitleId="team-doing-work-title"
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
