import type { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTriangleExclamation, faEye } from '@fortawesome/free-solid-svg-icons'
import { getBalanceTipBadgeStyle, getBrainCombination } from '../../../Quiz/SectionResults/utils.tsx'
import { TeamContextInsightHeadline } from './TeamContextInsightHeadline'
import { TeamStyleBreakdown } from './TeamStyleBreakdown'
import './TeamGroupInsights.css'

interface TeamGettingBetterProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
  metaRow?: ReactNode
}

interface TeamGrowthInsight {
  displayLabel: string
  title: string
  strength: string
  gap: string
  watchFor: string
}

const TEAM_GETTING_BETTER_INSIGHTS: Record<string, TeamGrowthInsight> = {
  Head: {
    displayLabel: 'Head Strong',
    title: 'An analytical team that improves through structure and evidence',
    strength: 'Learns effectively through reflection, frameworks, and data. Strong at identifying patterns and improving systems over time.',
    gap: 'Less Heart and Gut. The team may not naturally engage with emotional feedback or take action quickly on insights.',
    watchFor: 'Over-relying on analysis. Growth may stay theoretical without translating into behavioural change.'
  },
  'Head + Gut': {
    displayLabel: 'Head + Gut',
    title: 'A results-driven team that learns through action and outcomes',
    strength: 'Improves by testing, executing, and refining. Strong at learning from what works and what does not in real scenarios.',
    gap: 'Less Heart. The team may not fully engage with feedback that focuses on feelings or interpersonal impact.',
    watchFor: 'Dismissing softer feedback. Growth may be limited to performance without considering relational impact.'
  },
  'Head + Heart': {
    displayLabel: 'Head + Heart',
    title: 'A reflective team that grows through insight and dialogue',
    strength: 'Open to feedback and thoughtful in processing it. Learns well through discussion, mentorship, and shared understanding.',
    gap: 'Less Gut. The team may take longer to implement changes after recognising what needs improvement.',
    watchFor: 'Staying in reflection too long. Insight does not always translate into timely action.'
  },
  Heart: {
    displayLabel: 'Heart only',
    title: 'A relational team that develops through support and shared experience',
    strength: 'Receptive to feedback when delivered with care. Grows well through coaching, encouragement, and collaborative reflection.',
    gap: 'Less Head and Gut. The team may struggle with structured development or taking decisive steps to change.',
    watchFor: 'Avoiding difficult feedback. Growth may slow if challenge is softened too much.'
  },
  'Heart + Gut': {
    displayLabel: 'Heart + Gut',
    title: 'A motivated team that learns through doing and encouragement',
    strength: 'Responds well to momentum and positive reinforcement. Learns quickly through experience and trusted relationships.',
    gap: 'Less Head. The team may not naturally use structured frameworks to guide development.',
    watchFor: 'Repeating patterns. Without reflection or structure, lessons may not fully stick.'
  },
  'Heart + Head': {
    displayLabel: 'Heart + Head',
    title: 'A thoughtful team that improves through reflection and care',
    strength: 'Balances emotional awareness with structured thinking. Able to process feedback deeply and turn it into meaningful insights.',
    gap: 'Less Gut. The team may take time before acting on feedback or making changes.',
    watchFor: 'Slow implementation. Growth is understood but not always executed quickly.'
  },
  Gut: {
    displayLabel: 'Gut only',
    title: 'An action-oriented team that learns by doing',
    strength: 'Quick to test, adapt, and iterate. Gains experience rapidly through direct action and real-world feedback.',
    gap: 'Less Head and Heart. The team may not reflect deeply or consider emotional and relational learning.',
    watchFor: 'Shallow learning loops. Action happens, but insights may not be fully captured or applied.'
  },
  'Gut + Head': {
    displayLabel: 'Gut + Head',
    title: 'A performance-focused team that improves through results and analysis',
    strength: 'Combines action with evaluation. Learns efficiently by reviewing outcomes and adjusting strategy.',
    gap: 'Less Heart. The team may overlook interpersonal feedback or emotional dynamics in growth.',
    watchFor: 'Narrow development focus. Improvement may centre on performance while missing relational growth.'
  },
  'Gut + Heart': {
    displayLabel: 'Gut + Heart',
    title: 'A responsive team that grows through experience and connection',
    strength: 'Learns through doing and through others. Feedback lands well when it is encouraging and grounded in real situations.',
    gap: 'Less Head. The team may not consistently apply structured approaches to development.',
    watchFor: 'Inconsistent progress. Growth may depend on context rather than a clear system.'
  },
  'Head + Heart + Gut': {
    displayLabel: 'Head + Heart + Gut',
    title: 'A well-rounded team with strong potential for growth',
    strength: 'Able to learn from multiple angles including analysis, experience, and relationships. Highly adaptable in development approaches.',
    gap: 'Different growth styles may compete. The team may not always align on how improvement should happen.',
    watchFor: 'Scattered development. Without shared direction, efforts to improve may lack focus or consistency.'
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

export function TeamGettingBetter({
  headPercent,
  heartPercent,
  gutPercent,
  metaRow,
}: TeamGettingBetterProps) {
  const combo = getBrainCombination(headPercent, heartPercent, gutPercent)
  const normalizedKey = normalizeInsightKey(combo.label)
  const insight = TEAM_GETTING_BETTER_INSIGHTS[normalizedKey] ?? TEAM_GETTING_BETTER_INSIGHTS.Head
  const missingBrainCombo = getMissingBrainCombo(normalizedKey)
  const missingBrainBadgeStyle = missingBrainCombo ? getBalanceTipBadgeStyle(missingBrainCombo) : null
  return (
    <div className="team-context-insight">
      {metaRow}
      <TeamContextInsightHeadline
        contextKey="gettingBetter"
        combo={combo}
        insightTitleId="team-getting-better-title"
        insightTitle={insight.title}
      />
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
