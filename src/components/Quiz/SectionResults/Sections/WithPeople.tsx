import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { SocialMapTable, getSocialMapForScores } from '../Tables/SocialMapTable.tsx'
import { contextComboLabel } from '../../ChangeResults/contextComboLabels'
import { getBalanceTipBadge, getBrainCombination, getBrainCombinationKey, getBrainIcons } from '../utils.tsx'
import '../SectionResults.css'

interface WithPeopleProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

interface TraitData {
  brainCombination: string
  whoYouAre: string
  yourStrengths: string[]
  yourRisks: string[]
  interactionStyle: string
  balanceTip: string
  coreNeed: string
  loveLanguage: string[]
  whoYoureDrawnTo: string
  colors: string[]
}

const traitDatabase: Record<string, TraitData> = {
  'Head': {
    brainCombination: 'Head',
    whoYouAre: 'Analytical, observant, sometimes reserved; prefers logical conversations over emotional sharing.',
    yourStrengths: [
      'Clarity',
      'Fairness',
      'Objective advice',
      'Problem-solving support'
    ],
    yourRisks: [
      'Can seem distant, critical, or unemotional',
      'May struggle with emotional cues'
    ],
    interactionStyle: 'Thoughtful, measured, prefers structured interactions; may dominate with logic.',
    balanceTip: 'Practice active listening, ask about feelings, and validate emotions even if you don\'t feel them.',
    coreNeed: 'To be respected and understood for your intellect.',
    loveLanguage: [
      'Acts of competence and reliability',
      'Being needed for advice or insight'
    ],
    whoYoureDrawnTo: 'People who are patient, rational, and can value your ideas without taking offense at your bluntness.',
    colors: ['#1368ce']
  },
  'Heart': {
    brainCombination: 'Heart',
    whoYouAre: 'Warm, empathetic, relational; prioritizes feelings and harmony.',
    yourStrengths: [
      'Deep emotional support',
      'Loyalty',
      'Excellent listener'
    ],
    yourRisks: [
      'Can be overly sensitive',
      'People-pleasing',
      'May neglect own needs'
    ],
    interactionStyle: 'Collaborative, nurturing, values consensus, seeks harmony.',
    balanceTip: 'Set boundaries, express opinions clearly, and practice assertiveness.',
    coreNeed: 'To feel loved, seen, and emotionally connected.',
    loveLanguage: [
      'Emotional attention',
      'Affirmation',
      'Care',
      'Consideration'
    ],
    whoYoureDrawnTo: 'People who are warm, communicative, and appreciative of emotional depth.',
    colors: ['#e21b3c']
  },
  'Gut': {
    brainCombination: 'Gut',
    whoYouAre: 'Bold, instinctive, straightforward; leads with action and intuition.',
    yourStrengths: [
      'Courage',
      'Decisiveness',
      'Adventurousness',
      'Protective instincts'
    ],
    yourRisks: [
      'Can be insensitive',
      'Domineering',
      'May overlook subtle cues'
    ],
    interactionStyle: 'Direct, confident, and energetic; thrives in fast-paced, hands-on interactions.',
    balanceTip: 'Listen actively, check emotional impact, and pause before reacting.',
    coreNeed: 'To be respected for decisiveness and independence.',
    loveLanguage: [
      'Physical engagement',
      'Adventure',
      'Direct support'
    ],
    whoYoureDrawnTo: 'People who are independent, energetic, and confident.',
    colors: ['#26890c']
  },
  'Head+Gut': {
    brainCombination: 'Head + Gut',
    whoYouAre: 'Decisive, direct, and practical; engages through actions and solutions.',
    yourStrengths: [
      'Quick problem-solving',
      'Confidence',
      'Reliability under pressure'
    ],
    yourRisks: [
      'Can be blunt or impatient',
      'May overlook emotional needs'
    ],
    interactionStyle: 'Assertive and action-oriented, likes to lead or take charge in group problem-solving.',
    balanceTip: 'Slow down to acknowledge feelings, give space for others\' input, and check assumptions.',
    coreNeed: 'To feel effective and in control of outcomes.',
    loveLanguage: [
      'Respect and recognition for their decisiveness',
      'Shared adventures or challenges'
    ],
    whoYoureDrawnTo: 'People who are competent, self-reliant, and appreciate decisiveness.',
    colors: ['#1368ce', '#26890c']
  },
  'Head+Heart': {
    brainCombination: 'Head + Heart',
    whoYouAre: 'Thoughtful and empathetic; balances logic with understanding.',
    yourStrengths: [
      'Diplomatic',
      'Fair',
      'Trustworthy',
      'Excellent at mediating'
    ],
    yourRisks: [
      'May overthink others\' motives',
      'May hesitate to act',
      'Can appear indecisive'
    ],
    interactionStyle: 'Considerate communicator, good at collaboration, mediates conflicts naturally.',
    balanceTip: 'Speak your mind gently, assert boundaries when necessary, and trust instincts more.',
    coreNeed: 'To connect authentically while being respected for judgment.',
    loveLanguage: [
      'Thoughtful gestures',
      'Quality time',
      'Verbal affirmation grounded in insight'
    ],
    whoYoureDrawnTo: 'People who are reflective, emotionally aware, and appreciate thoughtful reasoning.',
    colors: ['#1368ce', '#e21b3c']
  },
  'Heart+Gut': {
    brainCombination: 'Heart + Gut',
    whoYouAre: 'Energetic, instinctive, values-driven; acts with care and urgency.',
    yourStrengths: [
      'Courage',
      'Loyalty',
      'Protection',
      'Responsive to others\' needs'
    ],
    yourRisks: [
      'May act impulsively on emotion',
      'May misread intentions',
      'Can overcommit'
    ],
    interactionStyle: 'Direct, passionate, and protective; thrives in dynamic interactions.',
    balanceTip: 'Pause to assess others\' reactions, balance impulse with consideration.',
    coreNeed: 'To feel valued and impactful in helping others.',
    loveLanguage: [
      'Acts of loyalty',
      'Devotion',
      'Physical support',
      'Protection'
    ],
    whoYoureDrawnTo: 'People who are courageous, emotionally expressive, and active.',
    colors: ['#e21b3c', '#26890c']
  },
  'Heart+Head': {
    brainCombination: 'Heart + Head',
    whoYouAre: 'Thoughtful, empathetic, and rational; considers feelings and logic together.',
    yourStrengths: [
      'Balanced',
      'Fair',
      'Persuasive',
      'Good mediator'
    ],
    yourRisks: [
      'Can overanalyze',
      'May delay decisions',
      'May try too hard to satisfy everyone'
    ],
    interactionStyle: 'Calm, reasoned, collaborative; excellent at conflict resolution and building trust.',
    balanceTip: 'Simplify choices, speak clearly, and prioritize genuine connection over perfection.',
    coreNeed: 'To have harmonious, fair, and meaningful relationships.',
    loveLanguage: [
      'Verbal affirmation',
      'Shared experiences',
      'Mutual understanding'
    ],
    whoYoureDrawnTo: 'People who are reflective, fair-minded, and emotionally intelligent.',
    colors: ['#e21b3c', '#1368ce']
  },
  'Gut+Head': {
    brainCombination: 'Gut + Head',
    whoYouAre: 'Action-oriented thinker; combines instinct with strategy in social situations.',
    yourStrengths: [
      'Adaptable',
      'Quick problem-solving',
      'Reliable under pressure'
    ],
    yourRisks: [
      'Can overanalyze or act too fast',
      'May overlook feelings'
    ],
    interactionStyle: 'Assertive yet strategic; good at leading teams and solving interpersonal challenges.',
    balanceTip: 'Slow down for empathy, acknowledge feelings, and explain reasoning.',
    coreNeed: 'To be effective and competent while maintaining autonomy.',
    loveLanguage: [
      'Recognition',
      'Practical support',
      'Shared challenges'
    ],
    whoYoureDrawnTo: 'People who are competent, independent, and capable of handling action-oriented environments.',
    colors: ['#26890c', '#1368ce']
  },
  'Gut+Heart': {
    brainCombination: 'Gut + Heart',
    whoYouAre: 'Intuitive and empathetic; acts fast but considers people\'s needs.',
    yourStrengths: [
      'Loyalty',
      'Courage',
      'Responsiveness',
      'Instinctive care'
    ],
    yourRisks: [
      'Can act too quickly or emotionally',
      'Risk miscommunication'
    ],
    interactionStyle: 'Warm, protective, energetic; responds instinctively to others\' needs.',
    balanceTip: 'Pause to communicate intentions clearly, balance emotion with practicality.',
    coreNeed: 'To feel impactful in helping others and emotionally connected.',
    loveLanguage: [
      'Caring actions',
      'Loyalty',
      'Physical engagement'
    ],
    whoYoureDrawnTo: 'People who are emotionally expressive, courageous, and energetic.',
    colors: ['#26890c', '#e21b3c']
  },
  'Head+Heart+Gut': {
    brainCombination: 'Head + Heart + Gut',
    whoYouAre: 'Integrates thinking, feeling, and action; highly adaptive socially.',
    yourStrengths: [
      'Versatile',
      'Diplomatic',
      'Intuitive',
      'Excellent at managing complexity'
    ],
    yourRisks: [
      'Can feel overwhelmed trying to satisfy all perspectives',
      'May delay decisions'
    ],
    interactionStyle: 'Balanced, flexible, perceptive; excels at leading, mediating, and collaborating.',
    balanceTip: 'Prioritize connection, simplify choices, and trust your instincts.',
    coreNeed: 'To feel understood, effective, and emotionally connected.',
    loveLanguage: [
      'Combination of affirmation',
      'Thoughtful action',
      'Shared meaningful experiences'
    ],
    whoYoureDrawnTo: 'People who are insightful, emotionally aware, adaptable, and supportive.',
    colors: ['#1368ce', '#e21b3c', '#26890c']
  }
}

/* With People archetypes: archetype name, description, quote */
const WITH_PEOPLE_ARCHETYPES: Record<string, { archetype: string; description: string; quote: string }> = {
  'Head': {
    archetype: 'Thinker',
    description: 'With people, you are a silent cartographer. You map the room and decode intentions from a distance to ensure you aren\'t blindsided. You don\'t need to be the center of attention; you need to understand the architecture of the conversation.',
    quote: 'If I understand the room, I can inhabit it.'
  },
  'Head+Gut': {
    archetype: 'Tactician',
    description: 'With people, you value direct and purposeful interaction. You don\'t feel drawn to endless small talk; you engage when there is something real to exchange, solve, or move forward. Your presence feels intentional, and others sense that when you speak, it carries clarity and direction.',
    quote: 'If I speak, it counts.'
  },
  'Head+Heart': {
    archetype: 'Diplomat',
    description: 'With people, you notice emotional shifts and instinctively move to clarify them. You don\'t absorb tension; you translate it into words people can understand. By balancing empathy with perspective, you help conversations stay grounded and relationships remain steady.',
    quote: 'If I stay centered, I stay clear.'
  },
  'Heart': {
    archetype: 'Empath',
    description: 'With people, you are a mirror. You don\'t just hear words; you absorb the underlying frequency of the person in front of you. This connection is your greatest gift and your greatest drain, as you struggle to stay "you" while feeling "them."',
    quote: 'If I sense it, I pay attention.'
  },
  'Heart+Gut': {
    archetype: 'Shepherd',
    description: 'With people, you are emotionally engaged and responsive. You don\'t just "hang out"; you notice when tension, disrespect, or imbalance enters the space. Loyalty moves you to speak up, stand beside others, and help bring the relationship back into harmony.',
    quote: 'If something feels off, I speak up.'
  },
  'Heart+Head': {
    archetype: 'Advisor',
    description: 'With people, you are drawn to understanding the meaning behind their experiences. You don\'t just listen to what happened; you help shape perspective around it. Connection grows through shared reflection, where insight and empathy meet to bring clarity to the moment.',    
    quote: 'If there’s perspective, there’s peace.'
  },
  'Gut': {
    archetype: 'Doer',
    description: 'With people, you are an engine in a room full of brakes. You have little patience for social posturing or endless debate. You feel most "yourself" when you are doing something active alongside others, rather than just talking about it.',
    quote: 'If we are moving, we are aligned.'
  },
  'Gut+Head': {
    archetype: 'Engineer',
    description: 'With people, you look for the mechanics of the group. You see the friction in how people interact and instinctively want to fix the "clogs" in communication. You value people who are functional, direct, and low-maintenance.',
    quote: 'If it works, I\'m comfortable.'
  },
  'Gut+Heart': {
    archetype: 'Hero',
    description: 'With people, you are the first responder. You don\'t wait for an invitation to help; you step forward when something needs momentum. You read emotional dips quickly and move to support, stabilize, or carry the moment so others don\'t have to hesitate.',    
    quote: 'If no one moves, I will.'
  },
  'Head+Heart+Gut': {
    archetype: 'Sovereign',
    description: 'With people, you are your own anchor. You acknowledge the social data, feel the emotional weight, and trust your gut, but you never let the crowd dictate your tempo. You are present, but you are never "lost" in the group.',
    quote: 'If I am myself, I am enough.'
  }
}

void WITH_PEOPLE_ARCHETYPES

export const WithPeople = ({ headPercent, heartPercent, gutPercent }: WithPeopleProps) => {
  const combination = getBrainCombinationKey(headPercent, heartPercent, gutPercent)
  const combo = getBrainCombination(headPercent, heartPercent, gutPercent)
  const traits = traitDatabase[combination] || traitDatabase['Head']
  const balanceTipBadge = getBalanceTipBadge(traits.brainCombination)
  // const archetypeData = WITH_PEOPLE_ARCHETYPES[combination]
  const socialMap = getSocialMapForScores(headPercent, heartPercent, gutPercent)

  return (
    <div className="under-pressure-content">
      {/* Hero: archetype + quote (top-level focus) */}
      {/* {archetypeData && (
        <section>
          <div className="section-archetype-block">
            <h3 className="section-archetype-name">{archetypeData.archetype}</h3>
            {archetypeData.description && (
              <p className="section-archetype-description">{archetypeData.description}</p>
            )}
            <blockquote className="section-archetype-quote">"{archetypeData.quote}"</blockquote>
          </div>
        </section>
      )} */}
      {/* Profile: who you are, interaction style, core need; vertical purple line like Doing Work */}
      <div className="intro-grid intro-grid-three">
        <div className="trait-section">
          <div className="trait-section-header">
            <div className="trait-section-title-row">
              <h4 className="trait-section-title">{contextComboLabel('withPeople', combo.label)}</h4>
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
            {traits.whoYouAre} {traits.interactionStyle} {traits.coreNeed}
          </p>
        </div>
      </div>
      <SocialMapTable
        profile={socialMap}
        balanceTip={traits.balanceTip}
        balanceTipBadge={balanceTipBadge}
      />

      {/* Strengths & risks: bento cards with clear separation */}
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

