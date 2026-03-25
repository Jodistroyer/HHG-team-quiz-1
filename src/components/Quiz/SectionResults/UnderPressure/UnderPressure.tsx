import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTriangleExclamation, faStar } from '@fortawesome/free-solid-svg-icons'
import { PressureProfile, getPressureProfileForScores } from './PressureProfile/PressureProfile.tsx'
import { getBalanceTipBadgeStyle } from '../utils.tsx'
import '../SectionResults.css'
import './UnderPressure.css'

type AnswerType = 'Head' | 'Heart' | 'Gut'

interface UnderPressureProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

interface TraitData {
  brainCombination: string
  whoYouAre: string
  howYouReact: string
  yourStrengths: string[]
  watchOutFor: string[]
  balanceTip: string
  colors: string[]
}

const traitDatabase: Record<string, TraitData> = {
  'Head': {
    brainCombination: 'Head',
    whoYouAre: 'You process stress with your mind first. Logical and analytical, you think before you act.',
    howYouReact: 'You pause, analyze, and plan. Sometimes you overthink or detach from emotions.',
    yourStrengths: [
      'Clear, strategic thinking',
      'Strong risk assessment',
      'Thoughtful decision-making',
      'Ability to stay objective'
    ],
    watchOutFor: [
      'May appear cold or unemotional',
      'Can be slow to act',
      'Might miss emotional cues from others'
    ],
    balanceTip: 'Check in with your feelings and intuition. Ask others for their input.',
    colors: ['#1368ce']
  },
  'Heart': {
    brainCombination: 'Heart',
    whoYouAre: 'You lead with feelings under stress. Empathetic and relational, you care deeply about people.',
    howYouReact: 'You tune into yours and others emotions before making decisions.',
    yourStrengths: [
      'Strong interpersonal skills',
      'Natural conflict resolution',
      'Emotional intuition',
      'Ability to connect with others'
    ],
    watchOutFor: [
      'Can neglect facts and details',
      'May get overwhelmed by others\' feelings',
      'Might overlook practical considerations'
    ],
    balanceTip: 'Include logical checks in your process. Step back to see the bigger picture.',
    colors: ['#e21b3c']
  },
  'Gut': {
    brainCombination: 'Gut',
    whoYouAre: 'You lead with action. Instinct-driven and bold, you trust your body and intuition.',
    howYouReact: 'You react immediately, trusting your gut over analysis.',
    yourStrengths: [
      'Quick reflexes',
      'Decisive action',
      'Courage under pressure',
      'Strong intuition'
    ],
    watchOutFor: [
      'Can act without enough information',
      'May overlook consequences',
      'Might rush into decisions'
    ],
    balanceTip: 'Take a moment to analyze risks. Consider input from head- or heart-oriented people.',
    colors: ['#26890c']
  },
  'Head+Gut': {
    brainCombination: 'Head + Gut',
    whoYouAre: 'You combine thinking with decisive action. Analytical yet action-oriented.',
    howYouReact: 'You quickly gather facts, then act. Sometimes impulsively if data is limited.',
    yourStrengths: [
      'Quick problem-solving',
      'Confident decision-making',
      'Adaptable approach',
      'Balanced thinking and action'
    ],
    watchOutFor: [
      'Can rush into action without considering others\' feelings',
      'May overlook emotional impacts'
    ],
    balanceTip: 'Slow down to reflect on emotional impacts. Communicate your reasoning clearly.',
    colors: ['#1368ce', '#26890c']
  },
  'Head+Heart': {
    brainCombination: 'Head + Heart',
    whoYouAre: 'You balance logic with care for people. Thoughtful and empathetic.',
    howYouReact: 'You analyze while checking emotional impact. May hesitate when values conflict with data.',
    yourStrengths: [
      'Fair and considerate decisions',
      'Understanding multiple perspectives',
      'Balanced approach',
      'Good at weighing options'
    ],
    watchOutFor: [
      'Can get stuck in "analysis paralysis"',
      'May struggle when logic and emotion conflict'
    ],
    balanceTip: 'Trust your gut instincts sometimes. Set limits on overthinking.',
    colors: ['#1368ce', '#e21b3c']
  },
  'Heart+Gut': {
    brainCombination: 'Heart + Gut',
    whoYouAre: 'You combine feeling with quick action. Emotional and instinctive.',
    howYouReact: 'You react based on values and instincts, often acting first and feeling later.',
    yourStrengths: [
      'Courageous and decisive',
      'Protective of others',
      'Instinctive problem-solving',
      'Quick to respond'
    ],
    watchOutFor: [
      'May act too quickly without planning',
      'Can be impulsive'
    ],
    balanceTip: 'Pause briefly to evaluate consequences. Seek data for complex decisions.',
    colors: ['#e21b3c', '#26890c']
  },
  'Heart+Head': {
    brainCombination: 'Heart + Head',
    whoYouAre: 'You care deeply but want to do the right thing. Empathetic yet rational.',
    howYouReact: 'You consider emotional impact and logic together. Can struggle when facts and feelings clash.',
    yourStrengths: [
      'Balanced perspective',
      'Fair and persuasive',
      'Able to guide others calmly',
      'Good at finding middle ground'
    ],
    watchOutFor: [
      'Can overthink decisions',
      'May be paralyzed by conflicting priorities'
    ],
    balanceTip: 'Practice prioritizing decisions. Trust your instincts when logic and emotion conflict.',
    colors: ['#e21b3c', '#1368ce']
  },
  'Gut+Head': {
    brainCombination: 'Gut + Head',
    whoYouAre: 'You combine instinct with analysis. Action-oriented and thoughtful.',
    howYouReact: 'You trust your gut but validate with data. Quick to pivot when needed.',
    yourStrengths: [
      'Strategic decision-making under pressure',
      'Adaptable approach',
      'Balanced instinct and analysis',
      'Quick to adjust'
    ],
    watchOutFor: [
      'Can over-rely on instinct or analysis alone',
      'May miss emotional context'
    ],
    balanceTip: 'Include emotional perspective. Check in on people affected by your actions.',
    colors: ['#26890c', '#1368ce']
  },
  'Gut+Heart': {
    brainCombination: 'Gut + Heart',
    whoYouAre: 'You act on gut feelings while caring for others. Instinctive and empathetic.',
    howYouReact: 'You move quickly, guided by values and intuition. May prioritize people over logic.',
    yourStrengths: [
      'Brave and loyal',
      'Responsive to others\' needs',
      'Highly intuitive',
      'Quick to help'
    ],
    watchOutFor: [
      'Can make decisions that feel right but aren\'t practical',
      'May prioritize emotion over logic'
    ],
    balanceTip: 'Balance instincts with practical planning. Get objective feedback when needed.',
    colors: ['#26890c', '#e21b3c']
  },
  'Head+Heart+Gut': {
    brainCombination: 'Head + Heart + Gut',
    whoYouAre: 'You integrate logic, emotion, and instinct. A holistic thinker.',
    howYouReact: 'You analyze, empathize, and act together. May overthink or delay decisions.',
    yourStrengths: [
      'Versatile and adaptive',
      'High emotional and cognitive intelligence',
      'Excellent problem-solving',
      'Able to see all angles'
    ],
    watchOutFor: [
      'Can experience "decision overload"',
      'May stress from trying to satisfy all angles'
    ],
    balanceTip: 'Trust yourself. Simplify choices and delegate when overwhelmed.',
    colors: ['#1368ce', '#e21b3c', '#26890c']
  }
}

/* Under Pressure archetypes: archetype name, description, quote */
const UNDER_PRESSURE_ARCHETYPES: Record<string, { archetype: string; description: string; quote: string }> = {
  'Head': {
    archetype: 'Thinker',
    description: 'Under pressure, you retreat. Your inner world becomes a quiet, cold laboratory where you dissect the problem without the interference of feeling. You don\'t seek comfort; you seek a clear line of sight.',
    quote: 'If I see it clearly, I can hold it.'
  },
  'Head+Gut': {
    archetype: 'Tactician',
    description: 'Under pressure, your vision narrows. Your pulse slows as you hunt for the opening. You aren\'t wondering if you will succeed, only when. Your body becomes a sharpened tool for your intent.',
    quote: 'If I am steady, I am ready.'
  },
  'Head+Heart': {
    archetype: 'Diplomat',
    description: 'Under pressure, you are a bridge under heavy weight. You feel the strain of the tension, but you hold yourself steady so the truth doesn\'t snap. You prioritize your own composure to keep your judgment intact.',
    quote: 'If I stay whole, I stay true.'
  },
  'Heart': {
    archetype: 'Empath',
    description: 'Under pressure, you become porous. The world\'s pain enters you, making it hard to tell where the stress ends and you begin. You struggle to stay upright, finding your worth in staying present through the ache.',
    quote: 'If I feel it, it matters.'
  },
  'Heart+Gut': {
    archetype: 'Shepherd',
    description: 'Under pressure, your skin thickens. You feel a fierce, internal "No" to the threat. Your fear transforms into an iron wall; you don\'t care about the cost to yourself as long as the line holds.',
    quote: 'If I stand firm, I am safe.'
  },
  'Heart+Head': {
    archetype: 'Advisor',
    description: 'Under pressure, you lift your gaze. You feel the panic rising, so you look toward something permanent. You talk yourself through the dark by remembering that this moment is only a fragment of the whole.',
    quote: 'If I look beyond, I can breathe.'
  },
  'Gut': {
    archetype: 'Doer',
    description: 'Under pressure, your blood catches fire. Thinking feels like suffocating; moving feels like breathing. You don\'t need a plan; you need an outlet. You trust your reflexes more than your thoughts.',
    quote: 'If I move, I am alive.'
  },
  'Gut+Head': {
    archetype: 'Engineer',
    description: 'Under pressure, you become a machine. You feel the friction of chaos and instinctively move to fix the gears. You compartmentalize your heart to maximize your hands. Efficiency is your only relief.',
    quote: 'If I can fix it, I can face it.'
  },
  'Gut+Heart': {
    archetype: 'Hero',
    description: 'Under pressure, you feel a surge of "Must." It isn\'t a choice; it\'s a physical requirement to step into the gap. Your fear is simply the fuel you use to ignite your resolve.',
    quote: 'If I act, I am enough.'
  },
  'Head+Heart+Gut': {
    archetype: 'Sovereign',
    description: 'Under pressure, you return to your center. You acknowledge the data and feel the weight, but you allow neither to drive. You are the pilot, not the plane; you choose your response rather than reacting.',
    quote: 'If I choose, I am free.'
  }
}

void UNDER_PRESSURE_ARCHETYPES

const getTier = (percent: number): 'Dominant' | 'Secondary' | 'Weak' => {
  if (percent >= 50) return 'Dominant'
  if (percent >= 35) return 'Secondary'
  return 'Weak'
}

const getBrainCombination = (headPercent: number, heartPercent: number, gutPercent: number): string => {
  const brains: { type: AnswerType; percent: number; tier: string }[] = [
    { type: 'Head', percent: headPercent, tier: getTier(headPercent) },
    { type: 'Heart', percent: heartPercent, tier: getTier(heartPercent) },
    { type: 'Gut', percent: gutPercent, tier: getTier(gutPercent) }
  ]
  
  // Sort by percentage descending
  brains.sort((a, b) => b.percent - a.percent)
  
  const first = brains[0]
  const second = brains[1]
  const third = brains[2]
  
  // Balanced / All three: all brains ≥30%
  if (first.percent >= 30 && second.percent >= 30 && third.percent >= 30) {
    return 'Head+Heart+Gut'
  }
  
  // Single dominant: one brain ≥50%, others ≤34%
  if (first.tier === 'Dominant' && second.percent <= 34 && third.percent <= 34) {
    return first.type
  }
  
  // Two-brain combo: two brains ≥35%
  if (first.percent >= 35 && second.percent >= 35) {
    return `${first.type}+${second.type}`
  }
  
  // Leaning case: 1st and 2nd are close (within ~15%), return combo
  // e.g., Head 40%, Gut 33.3% → Head+Gut
  if (first.percent - second.percent <= 15 && second.percent >= 25) {
    return `${first.type}+${second.type}`
  }
  
  // Default: return highest brain only
  return first.type
}

const getBalanceTipBadge = (brainCombination: string): string => {
  const map: Record<string, string> = {
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

  return map[brainCombination] ?? 'Focus'
}

export const UnderPressure = ({ headPercent, heartPercent, gutPercent }: UnderPressureProps) => {
  const combination = getBrainCombination(headPercent, heartPercent, gutPercent)
  const traits = traitDatabase[combination] || traitDatabase['Head']
  const balanceTipBadge = getBalanceTipBadge(traits.brainCombination)
  const balanceTipBadgeStyle = getBalanceTipBadgeStyle(balanceTipBadge)
  // const archetypeData = UNDER_PRESSURE_ARCHETYPES[combination]
  const pressureProfile = getPressureProfileForScores(headPercent, heartPercent, gutPercent)

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
          <h4 className="trait-section-title">Who You Are</h4>
          <p className="trait-content">
            {traits.whoYouAre} {traits.howYouReact}
          </p>
        </div>
      </div>
      <PressureProfile profile={pressureProfile} />
      <div className="action-box">
        <h4 className="action-title">
          <span className="action-title-left">
            <span className="action-icon"><FontAwesomeIcon icon={faStar} /></span>
            Balance Tip
          </span>
          <span className="balance-tip-badge" style={balanceTipBadgeStyle}>{balanceTipBadge}</span>
        </h4>
        <p className="action-content">{traits.balanceTip}</p>
      </div>
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
            {traits.watchOutFor.map((warning, index) => (
              <li key={index}>
                <span className="warning-icon"><FontAwesomeIcon icon={faTriangleExclamation} /></span>
                {warning}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}

