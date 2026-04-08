import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FeedbackStyleTable } from '../Tables/FeedbackStyleTable.tsx'
import { contextComboLabel } from '../../ChangeResults/contextComboLabels'
import { getBalanceTipBadge, getBrainCombination, getBrainCombinationKey, getBrainIcons } from '../utils.tsx'
import '../SectionResults.css'

interface GettingBetterProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

interface TraitData {
  brainCombination: string
  whatYouNaturallyTuneInto: string
  howYouLearnBest: string
  whatProgressMeansToYou: string
  challengesToOvercome: string[]
  balanceTip: string
  colors: string[]
}

const traitDatabase: Record<string, TraitData> = {
  'Head': {
    brainCombination: 'Head',
    whatYouNaturallyTuneInto: 'Information gaps, inconsistencies, logic, and structure.',
    howYouLearnBest: 'Clear frameworks, theories, models, and time to think alone.',
    whatProgressMeansToYou: 'Becoming more correct, precise, and knowledgeable.',
    challengesToOvercome: [
      'Overthinking',
      'Perfectionism',
      'Slow application'
    ],
    balanceTip: 'Time-box reflection, apply learning quickly, and allow imperfect action.',
    colors: ['#1368ce']
  },
  'Heart': {
    brainCombination: 'Heart',
    whatYouNaturallyTuneInto: 'Emotional responses, reactions of others, and relational impact.',
    howYouLearnBest: 'Safe, supportive environments with encouragement and dialogue.',
    whatProgressMeansToYou: 'Feeling more confident, understood, and connected.',
    challengesToOvercome: [
      'Avoiding discomfort or critical feedback'
    ],
    balanceTip: 'Pair emotional reflection with one concrete metric or outcome.',
    colors: ['#e21b3c']
  },
  'Gut': {
    brainCombination: 'Gut',
    whatYouNaturallyTuneInto: 'Immediate results, physical feedback, wins and losses.',
    howYouLearnBest: 'Hands-on experience, repetition, trial and error.',
    whatProgressMeansToYou: 'Moving faster, stronger, and more confidently.',
    challengesToOvercome: [
      'Repeating mistakes',
      'Ignoring feedback'
    ],
    balanceTip: 'Schedule brief reflection checkpoints after action.',
    colors: ['#26890c']
  },
  'Head+Gut': {
    brainCombination: 'Head + Gut',
    whatYouNaturallyTuneInto: 'Signals of what\'s working or failing in real time.',
    howYouLearnBest: 'Learning by testing ideas, adjusting strategies, and iterating.',
    whatProgressMeansToYou: 'Faster execution with better outcomes.',
    challengesToOvercome: [
      'Acting before learning fully',
      'Skipping reflection'
    ],
    balanceTip: 'Add short post-action reflections before moving on.',
    colors: ['#1368ce', '#26890c']
  },
  'Head+Heart': {
    brainCombination: 'Head + Heart',
    whatYouNaturallyTuneInto: 'Meaning behind actions. How logic connects to values and people.',
    howYouLearnBest: 'Structured learning paired with discussion or reflection.',
    whatProgressMeansToYou: 'Making smarter decisions that align with values.',
    challengesToOvercome: [
      'Over-reflection',
      'Delayed decisions'
    ],
    balanceTip: 'Set clear learning goals and limit reflection time.',
    colors: ['#1368ce', '#e21b3c']
  },
  'Heart+Gut': {
    brainCombination: 'Heart + Gut',
    whatYouNaturallyTuneInto: 'Emotional intensity and moments that feel meaningful or urgent.',
    howYouLearnBest: 'Learning through action, experience, and emotional feedback.',
    whatProgressMeansToYou: 'Feeling stronger, braver, and more aligned with values.',
    challengesToOvercome: [
      'Impulsiveness',
      'Skipping structured learning'
    ],
    balanceTip: 'Add light structure: pause, name the lesson, then act again.',
    colors: ['#e21b3c', '#26890c']
  },
  'Heart+Head': {
    brainCombination: 'Heart + Head',
    whatYouNaturallyTuneInto: 'Emotional meaning filtered through reflection and understanding.',
    howYouLearnBest: 'Guided reflection, mentoring, journaling, and discussion.',
    whatProgressMeansToYou: 'Balanced growth. Doing better while staying true to self.',
    challengesToOvercome: [
      'Trying to grow "perfectly"'
    ],
    balanceTip: 'Accept that growth can be uneven; prioritize direction over balance.',
    colors: ['#e21b3c', '#1368ce']
  },
  'Gut+Head': {
    brainCombination: 'Gut + Head',
    whatYouNaturallyTuneInto: 'Patterns between action and outcome.',
    howYouLearnBest: 'Practice + analysis, simulations, challenges.',
    whatProgressMeansToYou: 'Becoming more effective and decisive.',
    challengesToOvercome: [
      'Over-optimizing',
      'Skipping emotional context'
    ],
    balanceTip: 'Add one emotional or people-focused question after reflection.',
    colors: ['#26890c', '#1368ce']
  },
  'Gut+Heart': {
    brainCombination: 'Gut + Heart',
    whatYouNaturallyTuneInto: 'How actions impact people and emotional outcomes.',
    howYouLearnBest: 'Learning through meaningful action and shared experience.',
    whatProgressMeansToYou: 'Acting with courage while staying connected to others.',
    challengesToOvercome: [
      'Acting on emotion alone'
    ],
    balanceTip: 'Pair instincts with one grounding question: "What did I learn?"',
    colors: ['#26890c', '#e21b3c']
  },
  'Head+Heart+Gut': {
    brainCombination: 'Head + Heart + Gut',
    whatYouNaturallyTuneInto: 'Systems, people, and real-world feedback simultaneously.',
    howYouLearnBest: 'Integrated learning: thinking, feeling, and doing together.',
    whatProgressMeansToYou: 'Becoming more whole, capable, and adaptable.',
    challengesToOvercome: [
      'Overload',
      'Self-pressure to grow in all areas at once'
    ],
    balanceTip: 'Simplify learning focus; grow one dimension at a time.',
    colors: ['#1368ce', '#e21b3c', '#26890c']
  }
}

/* Getting Better archetypes: archetype name, description, quote */
const GETTING_BETTER_ARCHETYPES: Record<string, { archetype: string; description: string; quote: string }> = {
  'Head': {
    archetype: 'Thinker',
    description: 'When getting better, you analyze every step. You study systems, dissect mistakes, and refine strategies. Improvement comes from understanding, not repetition. You measure progress with insight.',
    quote: 'Complexity is just a puzzle waiting for the right lens.'
  },
  'Head+Gut': {
    archetype: 'Tactician',
    description: 'When getting better, you plan growth like a campaign. Every action is deliberate, every experiment purposeful. You learn fastest when you combine strategy with instinct. Success is a calculated trajectory.',
    quote: 'Precision outpaces effort every single time.'
  },
  'Head+Heart': {
    archetype: 'Diplomat',
    description: 'When getting better, you consider both knowledge and relationships. You grow by understanding others and yourself. Improvement is not just skill, but harmony in application. You balance learning with empathy.',
    quote: 'The strongest bridge is built with both data and trust.'
  },
  'Heart': {
    archetype: 'Empath',
    description: 'When getting better, you feel your progress deeply. You learn through connection and reflection. Emotions guide what matters and where change is needed. Personal growth is meaningful only when it touches others.',
    quote: 'Growth isn\'t measured in inches, but in depth.'
  },
  'Heart+Gut': {
    archetype: 'Shepherd',
    description: 'When getting better, you focus on impact over technique. You grow by protecting, serving, and supporting. Improvement is measured by how well you help others and stand strong for them.',
    quote: 'The circle is only as strong as the one holding the gate.'
  },
  'Heart+Head': {
    archetype: 'Advisor',
    description: 'When getting better, you study both theory and human nature. You learn how to guide, how to see patterns, and how to communicate insight. Growth is about becoming a resource others can rely on.',
    quote: 'Wisdom is knowing which truth the moment requires.'
  },
  'Gut': {
    archetype: 'Doer',
    description: 'When getting better, you learn by doing. Practice is your teacher, and mistakes are fuel. You improve fastest when you act, adjust, and act again. Theory without action is wasted time.',
    quote: 'Sweat is the best feedback loop.'
  },
  'Gut+Head': {
    archetype: 'Engineer',
    description: 'When getting better, you optimize yourself like a system. You analyze performance, identify inefficiencies, and redesign processes. Improvement is measurable, structured, and iterative.',
    quote: 'If the output is flawed, redesign the engine.'
  },
  'Gut+Heart': {
    archetype: 'Hero',
    description: 'When getting better, you push through fear and discomfort. You grow by confronting challenges directly and supporting others in the process. Courage and care accelerate your progress.',
    quote: 'True power is being the calm in someone else\'s storm.'
  },
  'Head+Heart+Gut': {
    archetype: 'Sovereign',
    description: 'When getting better, you integrate mind, heart, and instinct. You reflect, feel, and act in balance. Learning is holistic, and growth touches both skill and character. You evolve with awareness and purpose.',
    quote: 'Mastery is the alignment of thought, feeling, and finish.'
  }
}

void GETTING_BETTER_ARCHETYPES

export const GettingBetter = ({ headPercent, heartPercent, gutPercent }: GettingBetterProps) => {
  const combination = getBrainCombinationKey(headPercent, heartPercent, gutPercent)
  const combo = getBrainCombination(headPercent, heartPercent, gutPercent)
  const traits = traitDatabase[combination] || traitDatabase['Head']
  const balanceTipBadge = getBalanceTipBadge(traits.brainCombination)
  // const archetypeData = GETTING_BETTER_ARCHETYPES[combination]
  return (
    <div className="under-pressure-content getting-better-content">
      {/* {archetypeData && (
        <div className="section-archetype-block">
          <h3 className="section-archetype-name">{archetypeData.archetype}</h3>
          {archetypeData.description && (
            <p className="section-archetype-description">{archetypeData.description}</p>
          )}
          <blockquote className="section-archetype-quote">"{archetypeData.quote}"</blockquote>
        </div>
      )} */}
      <div className="intro-grid intro-grid-three">
        <div className="trait-section">
          <div className="trait-section-header">
            <div className="trait-section-title-row">
              <h4 className="trait-section-title">{contextComboLabel('gettingBetter', combo.label)}</h4>
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
            {traits.whatYouNaturallyTuneInto} {traits.howYouLearnBest} {traits.whatProgressMeansToYou}
          </p>
        </div>
      </div>
      <FeedbackStyleTable
        combination={combination}
        balanceTip={traits.balanceTip}
        balanceTipBadge={balanceTipBadge}
      />

      <div className="full-width-cards">
        <div className="warning-card">
          <h4 className="card-title">
            <span className="card-icon"><FontAwesomeIcon icon={faTriangleExclamation} /></span>
            Challenges to Overcome
          </h4>
          <ul className="trait-bullets">
            {traits.challengesToOvercome.map((challenge, index) => (
              <li key={index}>
                <span className="warning-icon"><FontAwesomeIcon icon={faTriangleExclamation} /></span>
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

