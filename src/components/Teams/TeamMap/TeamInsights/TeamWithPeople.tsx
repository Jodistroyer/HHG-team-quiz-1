import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTriangleExclamation, faEye } from '@fortawesome/free-solid-svg-icons'
import { getBalanceTipBadgeStyle, getBrainCombination, getBrainIcons } from '../../../Quiz/SectionResults/utils.tsx'
import './TeamInsights.css'

interface TeamWithPeopleProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

interface TeamPeopleInsight {
  displayLabel: string
  title: string
  strength: string
  gap: string
  watchFor: string
}

const TEAM_WITH_PEOPLE_INSIGHTS: Record<string, TeamPeopleInsight> = {
  Head: {
    displayLabel: 'Head only',
    title: 'An objective team that prioritises clarity over emotion',
    strength: 'Clear and rational in communication. Brings structure to discussions and helps keep conversations focused and logical.',
    gap: 'Less Heart and Gut. The team may not naturally tune into emotional cues or relational dynamics unless they are made explicit.',
    watchFor: 'Coming across as distant or transactional. Others may feel understood intellectually but not emotionally.'
  },
  'Head + Gut': {
    displayLabel: 'Head + Gut',
    title: 'An efficient team that focuses on clarity and outcomes',
    strength: 'Direct and solution-oriented in interactions. Keeps conversations focused and moves discussions toward decisions quickly.',
    gap: 'Less Heart. The team may not prioritise emotional connection or check how others are experiencing the interaction.',
    watchFor: 'Being perceived as cold or overly blunt. Efficiency may come at the cost of rapport.'
  },
  'Head + Heart': {
    displayLabel: 'Head + Heart',
    title: 'A thoughtful team that balances logic with empathy in relationships',
    strength: 'Strong at understanding both perspectives and emotions. Builds trust through clear, considerate, and well-balanced communication.',
    gap: 'Less Gut. The team may avoid pushing conversations forward when decisiveness or firmness is needed.',
    watchFor: 'Over-accommodating others. Important points may be softened or delayed to maintain harmony.'
  },
  Heart: {
    displayLabel: 'Heart only',
    title: 'A deeply relational team that prioritises connection',
    strength: 'Highly empathetic and attentive. Makes others feel heard, valued, and comfortable in interactions.',
    gap: 'Less Head and Gut. The team may struggle with clarity in communication or with addressing difficult issues directly.',
    watchFor: 'Avoiding tough conversations. Relationships may feel good on the surface but lack necessary honesty.'
  },
  'Heart + Gut': {
    displayLabel: 'Heart + Gut',
    title: 'An engaging team that brings energy and warmth to relationships',
    strength: 'Builds strong connections quickly. Combines emotional awareness with a natural sense of presence and confidence.',
    gap: 'Less Head. Communication may sometimes lack structure or clarity, especially in more complex discussions.',
    watchFor: 'Prioritising connection over clarity. Expectations and boundaries may not always be clearly defined.'
  },
  'Heart + Head': {
    displayLabel: 'Heart + Head',
    title: 'A balanced team that communicates with care and clarity',
    strength: 'Strong relational intelligence supported by structured thinking. Handles sensitive conversations with both empathy and precision.',
    gap: 'Less Gut. The team may hesitate to be firm or decisive when conversations require it.',
    watchFor: 'Holding back in critical moments. Important messages may be delayed or softened too much.'
  },
  Gut: {
    displayLabel: 'Gut only',
    title: 'A direct team that communicates with confidence',
    strength: 'Clear, assertive, and straightforward. Gets to the point quickly and is not afraid to speak up.',
    gap: 'Less Head and Heart. The team may miss nuance in both logic and emotion during interactions.',
    watchFor: 'Coming across as blunt or insensitive. Messages may land harder than intended.'
  },
  'Gut + Head': {
    displayLabel: 'Gut + Head',
    title: 'A capable team that communicates with clarity and direction',
    strength: 'Combines directness with logical structure. Conversations are focused, efficient, and outcome-driven.',
    gap: 'Less Heart. The team may not always consider how communication is received emotionally.',
    watchFor: 'Prioritising clarity over connection. Others may understand the message but feel disengaged.'
  },
  'Gut + Heart': {
    displayLabel: 'Gut + Heart',
    title: 'A warm and expressive team that connects easily with others',
    strength: 'Highly engaging and personable. Builds trust quickly through a mix of authenticity, energy, and care.',
    gap: 'Less Head. Communication may sometimes lack precision or consistency.',
    watchFor: 'Blurring boundaries. Strong connection may come at the expense of clarity or structure.'
  },
  'Head + Heart + Gut': {
    displayLabel: 'Head + Heart + Gut',
    title: 'A versatile team that can adapt to different interpersonal needs',
    strength: 'Able to read situations and respond with the right mix of logic, empathy, and assertiveness. Strong across different types of interactions.',
    gap: 'Different tendencies may surface across team members. Alignment on communication style may not always be consistent.',
    watchFor: 'Mixed signals. Without alignment, people may experience the team differently depending on who they interact with.'
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

export function TeamWithPeople({
  headPercent,
  heartPercent,
  gutPercent
}: TeamWithPeopleProps) {
  const combo = getBrainCombination(headPercent, heartPercent, gutPercent)
  const normalizedKey = normalizeInsightKey(combo.label)
  const insight = TEAM_WITH_PEOPLE_INSIGHTS[normalizedKey] ?? TEAM_WITH_PEOPLE_INSIGHTS.Head
  const missingBrainCombo = getMissingBrainCombo(normalizedKey)
  const missingBrainBadgeStyle = missingBrainCombo ? getBalanceTipBadgeStyle(missingBrainCombo) : null
  const badgeStyle =
    combo.colors.length === 1
      ? { background: combo.colors[0] }
      : combo.colors.length === 2
        ? { background: `linear-gradient(90deg, ${combo.colors[0]} 50%, ${combo.colors[1]} 50%)` }
        : { background: `linear-gradient(90deg, ${combo.colors[0]} 33.33%, ${combo.colors[1]} 33.33%, ${combo.colors[1]} 66.66%, ${combo.colors[2]} 66.66%)` }

  return (
    <div className="team-context-insight">
      <section className="team-context-insight__hero" aria-labelledby="team-with-people-title">
        <div className="team-context-insight__combo-row">
          <span className="team-context-insight__icons" aria-hidden>
            {getBrainIcons(combo.label, 'large')}
          </span>
          <span className="brain-combo-badge" style={badgeStyle}>
            {insight.displayLabel}
          </span>
        </div>
        <h4 id="team-with-people-title" className="team-context-insight__title">
          {insight.title}
        </h4>
      </section>

      <div className="team-context-insight__cards">
        <article className="team-context-insight__card team-context-insight__card--strength">
          <div className="team-context-insight__card-header">
            <h5 className="team-context-insight__card-title">
              <span className="team-context-insight__card-icon" aria-hidden>
                <FontAwesomeIcon icon={faCircleCheck} />
              </span>
              Strength
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
