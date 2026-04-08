import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { WorkStyleTable, getWorkStyleForScores } from '../Tables/WorkStyleTable.tsx'
import { contextComboLabel } from '../../ChangeResults/contextComboLabels'
import { getBalanceTipBadge, getBrainCombination, getBrainCombinationKey, getBrainIcons } from '../utils.tsx'
import '../SectionResults.css'

interface DoingWorkProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

interface TraitData {
  brainCombination: string
  whoYouAre: string
  yourWorkStyle: string
  yourStrengths: string[]
  yourRisks: string[]
  balanceTip: string
  colors: string[]
}

const traitDatabase: Record<string, TraitData> = {
  'Head': {
    brainCombination: 'Head',
    whoYouAre: 'You focus on logic, analysis, and planning. You like clear steps and well-defined processes.',
    yourWorkStyle: 'Methodical, careful, detail-oriented, but sometimes slow to start.',
    yourStrengths: [
      'Strategic thinking',
      'Problem-solving',
      'Data-driven decisions'
    ],
    yourRisks: [
      'Can get stuck in overthinking',
      'Perfectionism',
      'Analysis paralysis'
    ],
    balanceTip: 'Break tasks into small steps, set time limits, and check in with emotions occasionally to avoid burnout.',
    colors: ['#1368ce']
  },
  'Heart': {
    brainCombination: 'Heart',
    whoYouAre: 'You lead with feelings and relationships, prioritizing people over tasks.',
    yourWorkStyle: 'Flexible, collaborative, intuitive, sometimes scattered.',
    yourStrengths: [
      'Emotional intelligence',
      'Teamwork',
      'Understanding others\' perspectives'
    ],
    yourRisks: [
      'Can neglect deadlines or details',
      'Easily distracted by people\'s needs'
    ],
    balanceTip: 'Use lists and schedules, set clear boundaries, and check facts before deciding.',
    colors: ['#e21b3c']
  },
  'Gut': {
    brainCombination: 'Gut',
    whoYouAre: 'You work instinctively, moving fast and trusting your intuition.',
    yourWorkStyle: 'Fast, action-oriented, hands-on, thrives in dynamic environments.',
    yourStrengths: [
      'Quick execution',
      'Decisive actions',
      'Fearless in challenges'
    ],
    yourRisks: [
      'Can overlook details or skip steps',
      'May act before planning'
    ],
    balanceTip: 'Make simple checklists, pause to evaluate risks, and reflect on outcomes.',
    colors: ['#26890c']
  },
  'Head+Gut': {
    brainCombination: 'Head + Gut',
    whoYouAre: 'You combine thinking with action. Analyze first, then move quickly.',
    yourWorkStyle: 'Decisive, fast-moving, flexible, enjoys challenges.',
    yourStrengths: [
      'Quick problem-solving',
      'Adaptive strategies',
      'Confident execution'
    ],
    yourRisks: [
      'May act impulsively if data is incomplete',
      'Can overlook emotional cues'
    ],
    balanceTip: 'Take a moment to evaluate potential consequences and consider impact on others.',
    colors: ['#1368ce', '#26890c']
  },
  'Head+Heart': {
    brainCombination: 'Head + Heart',
    whoYouAre: 'You integrate logic and empathy, balancing rational planning with people\'s needs.',
    yourWorkStyle: 'Focused yet considerate, good at multitasking tasks that require collaboration.',
    yourStrengths: [
      'Thoughtful decisions',
      'Conflict resolution',
      'Effective communication'
    ],
    yourRisks: [
      'Can overthink or hesitate when values and facts clash'
    ],
    balanceTip: 'Prioritize tasks, trust your instincts, and avoid trying to please everyone.',
    colors: ['#1368ce', '#e21b3c']
  },
  'Heart+Gut': {
    brainCombination: 'Heart + Gut',
    whoYouAre: 'You act on instincts and values, focusing on what matters most emotionally.',
    yourWorkStyle: 'Energetic, intuitive, quick to respond, sometimes reactive.',
    yourStrengths: [
      'Courageous',
      'Loyal',
      'Responsive',
      'Proactive problem-solving'
    ],
    yourRisks: [
      'May rush tasks or act without full information',
      'Can overcommit'
    ],
    balanceTip: 'Pause briefly to plan, track progress, and communicate priorities to others.',
    colors: ['#e21b3c', '#26890c']
  },
  'Heart+Head': {
    brainCombination: 'Heart + Head',
    whoYouAre: 'You balance empathy with logic, considering people and facts together.',
    yourWorkStyle: 'Organized but sensitive to context, excels at collaborative work.',
    yourStrengths: [
      'Fair',
      'Persuasive',
      'Adaptable',
      'Skilled at coordinating teams'
    ],
    yourRisks: [
      'Can overanalyze or struggle to prioritize tasks when multiple needs conflict'
    ],
    balanceTip: 'Write down key priorities, delegate when needed, and use time-blocking to focus.',
    colors: ['#e21b3c', '#1368ce']
  },
  'Gut+Head': {
    brainCombination: 'Gut + Head',
    whoYouAre: 'You combine action with strategic thinking, trusting instincts but validating with logic.',
    yourWorkStyle: 'Efficient, flexible, goal-oriented, thrives under pressure.',
    yourStrengths: [
      'Adaptive problem-solving',
      'Fast pivoting',
      'Risk-aware decisions'
    ],
    yourRisks: [
      'Can focus too much on speed or analysis alone',
      'Missing emotional cues'
    ],
    balanceTip: 'Include short planning sessions and check in on others\' reactions before moving on.',
    colors: ['#26890c', '#1368ce']
  },
  'Gut+Heart': {
    brainCombination: 'Gut + Heart',
    whoYouAre: 'You act quickly with intuition, guided by values and people\'s needs.',
    yourWorkStyle: 'Energetic, empathetic, hands-on, reactive but caring.',
    yourStrengths: [
      'Brave',
      'Loyal',
      'Responsive',
      'Emotionally intelligent action'
    ],
    yourRisks: [
      'Can act too quickly or emotionally',
      'May overlook data or deadlines'
    ],
    balanceTip: 'Plan small steps, check consequences, and communicate clearly with teammates.',
    colors: ['#26890c', '#e21b3c']
  },
  'Head+Heart+Gut': {
    brainCombination: 'Head + Heart + Gut',
    whoYouAre: 'You integrate thinking, feeling, and instinct in your work approach.',
    yourWorkStyle: 'Balanced, flexible, intelligent, and people-aware; excels at complex challenges.',
    yourStrengths: [
      'Versatile',
      'Adaptive',
      'Highly effective across tasks and teams'
    ],
    yourRisks: [
      'Can experience overwhelm from juggling multiple perspectives',
      'May overthink'
    ],
    balanceTip: 'Prioritize tasks, simplify decisions, and delegate when necessary.',
    colors: ['#1368ce', '#e21b3c', '#26890c']
  }
}

/* Doing Work archetypes: archetype name, description, quote */
const DOING_WORK_ARCHETYPES: Record<string, { archetype: string; description: string; quote: string }> = {
  'Head': {
    archetype: 'Thinker',
    description: 'When doing work, your mind is your primary workspace. You process tasks as mental models, filtering out the noise of the office to find the logic underneath. You don\'t work for the "win"; you work for the internal click of a solved puzzle.',
    quote: 'If I see the logic, I own the task.'
  },
  'Head+Gut': {
    archetype: 'Tactician',
    description: 'When doing work, you operate on a private frequency of efficiency. You aren\'t just completing a checklist; you are maneuvering through a system. You conserve your energy for the moves that actually move the needle for your own goals.',
    quote: 'If I find the leverage, I save my strength.'
  },
  'Head+Heart': {
    archetype: 'Diplomat',
    description: 'When doing work, you are constantly calibrating. You feel the social friction of the workplace but use your intellect to keep it from draining you. You stay effective by ensuring your internal values aren\'t compromised by the output.',
    quote: 'If I stay aligned, I stay capable.'
  },
  'Heart': {
    archetype: 'Empath',
    description: 'When doing work, your energy is your currency. You don\'t just "do" a job; you live it. You are hyper-aware of the emotional climate of the team because your own productivity depends on the health of the space you occupy.',
    quote: 'If I feel it, it matters.'
  },
  'Heart+Gut': {
    archetype: 'Shepherd',
    description: 'When doing work, you create a circle of responsibility. You don\'t just finish tasks; you hold the line. You work hardest when you feel your contribution is the bedrock that keeps your own environment from collapsing.',
    quote: 'If I hold the weight, I find my worth.'
  },
  'Heart+Head': {
    archetype: 'Advisor',
    description: 'When doing work, you seek the "reason" behind the "what." You need the big picture to feel grounded. You aren\'t just an employee; you are an interpreter who works best when the path ahead makes human sense to you personally.',
    quote: 'If I see the \'why\', I can do the \'how\'.'
  },
  'Gut': {
    archetype: 'Doer',
    description: 'When doing work, your body leads. Sitting in meetings feels like stagnation; doing feels like relief. You measure your success by the physical momentum you build throughout the day, trusting your reflexes over the manual.',
    quote: 'If I\'m moving, I\'m winning.'
  },
  'Gut+Head': {
    archetype: 'Engineer',
    description: 'When doing work, you are driven by the irritation of inefficiency. You fix systems because broken processes grate on your nerves. Your "hard work" is a personal quest to make the world run smoother for your own sanity.',
    quote: 'If I fix the flow, I find my peace.'
  },
  'Gut+Heart': {
    archetype: 'Hero',
    description: 'When doing work, you are fueled by personal conviction. You don\'t wait for permission because your internal "must" is louder than any pressure. You take the lead because sitting idle during a crisis feels like losing a piece of yourself.',
    quote: 'If I step up, I feel right.'
  },
  'Head+Heart+Gut': {
    archetype: 'Sovereign',
    description: 'When doing work, you are the ultimate filter. You listen to the data, the people, and your gut, but the final command comes from your center. You don\'t work for the job; the job is the current expression of your personal mastery.',
    quote: 'If I choose it, I command it.'
  }
}

void DOING_WORK_ARCHETYPES

export const DoingWork = ({ headPercent, heartPercent, gutPercent }: DoingWorkProps) => {
  const combination = getBrainCombinationKey(headPercent, heartPercent, gutPercent)
  const combo = getBrainCombination(headPercent, heartPercent, gutPercent)
  const traits = traitDatabase[combination] || traitDatabase['Head']
  const balanceTipBadge = getBalanceTipBadge(traits.brainCombination)
  // const archetypeData = DOING_WORK_ARCHETYPES[combination]
  const executionPattern = getWorkStyleForScores(headPercent, heartPercent, gutPercent)

  return (
    <div className="under-pressure-content">
      {/* {archetypeData && (
        <div className="section-archetype-block">
          <h3 className="section-archetype-name">{archetypeData.archetype}</h3>
          {archetypeData.description && (
            <p className="section-archetype-description">{archetypeData.description}</p>
          )}
          <blockquote className="section-archetype-quote">"{archetypeData.quote}"</blockquote>
        </div>
      )} */}
      <div className="intro-grid">
        <div className="trait-section">
          <div className="trait-section-header">
            <div className="trait-section-title-row">
              <h4 className="trait-section-title">{contextComboLabel('doingWork', combo.label)}</h4>
              <span className="brain-icon-badge brain-icon-badge--inline" aria-label="Brain combination icons">
                {getBrainIcons(combo.label)}
              </span>
            </div>
            <div className="trait-section-badges">
              <span
                className="brain-combo-badge"
                style={{
                  background:
                    combo.colors.length === 1
                      ? combo.colors[0]
                      : combo.colors.length === 2
                        ? `linear-gradient(90deg, ${combo.colors[0]} 50%, ${combo.colors[1]} 50%)`
                        : `linear-gradient(90deg, ${combo.colors[0]} 33.33%, ${combo.colors[1]} 33.33%, ${combo.colors[1]} 66.66%, ${combo.colors[2]} 66.66%)`
                }}
              >
                {combo.label}
              </span>
            </div>
          </div>
          <p className="trait-content">
            {traits.whoYouAre} {traits.yourWorkStyle}
          </p>
        </div>
      </div>
      <WorkStyleTable
        profile={executionPattern}
        balanceTip={traits.balanceTip}
        balanceTipBadge={balanceTipBadge}
      />
      <div className="bento-cards">
        <div className="strength-card">
          <h4 className="card-title">
            <span className="card-icon"><FontAwesomeIcon icon={faCircleCheck} /></span>
            Strengths
          </h4>
          <ul className="trait-bullets">
            {traits.yourStrengths.map((strength, index) => (
              <li key={index}>
                <span className="check-icon"><FontAwesomeIcon icon={faCircleCheck} /></span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="warning-card">
          <h4 className="card-title">
            <span className="card-icon"><FontAwesomeIcon icon={faTriangleExclamation} /></span>
            Risks
          </h4>
          <ul className="trait-bullets">
            {traits.yourRisks.map((risk, index) => (
              <li key={index}>
                <span className="warning-icon"><FontAwesomeIcon icon={faTriangleExclamation} /></span>
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}

