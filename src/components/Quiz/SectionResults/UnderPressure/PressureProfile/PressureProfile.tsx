import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import './PressureProfile.css'

export interface PressureProfileData {
  pressureProfile: string
  hhgCombination: string
  dominantStyle: string
  emotionalTrigger: string
  maskDefense: string
  coreNeed: string
  howTheyErupt: string
  howToCalmThem: string
  howToHelpThem: string
  rapailleCode: string
  howToRemoveMask: string
  speakTheirLanguage: string
}

type AnswerType = 'Head' | 'Heart' | 'Gut'

const getTier = (percent: number): 'Dominant' | 'Secondary' | 'Weak' => {
  if (percent >= 50) return 'Dominant'
  if (percent >= 35) return 'Secondary'
  return 'Weak'
}

/** Returns HHG combination key (e.g. "Head", "Head+Gut", "Head+Heart+Gut") for pressure profile lookup. */
export const getBrainCombinationKey = (headPercent: number, heartPercent: number, gutPercent: number): string => {
  const brains: { type: AnswerType; percent: number; tier: string }[] = [
    { type: 'Head', percent: headPercent, tier: getTier(headPercent) },
    { type: 'Heart', percent: heartPercent, tier: getTier(heartPercent) },
    { type: 'Gut', percent: gutPercent, tier: getTier(gutPercent) }
  ]
  brains.sort((a, b) => b.percent - a.percent)
  const first = brains[0]
  const second = brains[1]
  const third = brains[2]
  if (first.percent >= 30 && second.percent >= 30 && third.percent >= 30) return 'Head+Heart+Gut'
  if (first.tier === 'Dominant' && second.percent <= 34 && third.percent <= 34) return first.type
  if (first.percent >= 35 && second.percent >= 35) return `${first.type}+${second.type}`
  if (first.percent - second.percent <= 15 && second.percent >= 25) return `${first.type}+${second.type}`
  return first.type
}

const PRESSURE_PROFILES: Record<string, PressureProfileData> = {
  Head: {
    pressureProfile: 'Pure Analyst',
    hhgCombination: 'Head Strong',
    dominantStyle: 'Logic-first',
    emotionalTrigger: 'Ambiguity, irrationality',
    maskDefense: 'Detached, critical, data-obsessed',
    coreNeed: 'To be seen as intelligent',
    howTheyErupt: 'Shuts down or becomes condescending',
    howToCalmThem: '"Let\'s analyze this clearly. You\'ll lead with insight."',
    howToHelpThem: 'Validate intellect, don\'t challenge ego',
    rapailleCode: '"Logic = Control"',
    howToRemoveMask: 'Ask for their take, slowly reintroduce emotion through case-based examples',
    speakTheirLanguage: 'Specifics. Details. Data'
  },
  'Head+Gut': {
    pressureProfile: 'Strategic Commander',
    hhgCombination: 'Head + Gut',
    dominantStyle: 'Logical but decisive',
    emotionalTrigger: 'Loss of control, indecisiveness',
    maskDefense: 'Over-plans, becomes cold & demanding',
    coreNeed: 'To win with precision',
    howTheyErupt: 'Angrily imposes order, steamrolls others',
    howToCalmThem: '"You\'ve got the plan and the strength. Let\'s execute now."',
    howToHelpThem: 'Praise strategic dominance',
    rapailleCode: '"Victory = Planning + Power"',
    howToRemoveMask: 'Respect decisions, then co-create steps together',
    speakTheirLanguage: 'Direct statements supported by reasoning'
  },
  'Head+Heart': {
    pressureProfile: 'Data-Driven Harmonizer',
    hhgCombination: 'Head + Heart',
    dominantStyle: 'Logically caring',
    emotionalTrigger: 'Emotionally overwhelmed, conflict',
    maskDefense: 'Uses data to deflect emotion',
    coreNeed: 'To be useful and appreciated',
    howTheyErupt: 'Passive-aggressiveness, fact-blaming',
    howToCalmThem: '"We\'ll reconnect and solve this with the facts."',
    howToHelpThem: 'Honor both logic and empathy',
    rapailleCode: '"Value = Being Rationally Kind"',
    howToRemoveMask: 'Recognize efforts; validate logic, open up emotion with warmth',
    speakTheirLanguage: 'Clear and Context-Aware explanations'
  },
  Heart: {
    pressureProfile: 'Emotional Empath',
    hhgCombination: 'Heart only',
    dominantStyle: 'Connection-first',
    emotionalTrigger: 'Conflict, betrayal, isolation',
    maskDefense: 'Over-apologizes, hides pain',
    coreNeed: 'To feel safe and loved',
    howTheyErupt: 'Crying, guilt-tripping, sudden disconnection',
    howToCalmThem: '"You matter. Let\'s rebuild trust together."',
    howToHelpThem: 'Mirror warmth, avoid cold facts',
    rapailleCode: '"Love = Safety"',
    howToRemoveMask: 'Gently reflect emotions, give permission to express feelings',
    speakTheirLanguage: 'Generalities. Big picture feelings'
  },
  'Heart+Gut': {
    pressureProfile: 'Intuitive Counselor',
    hhgCombination: 'Heart + Gut',
    dominantStyle: 'Emotional but active',
    emotionalTrigger: 'Disrespect, chaos, being unheard',
    maskDefense: 'Over-defends team, takes things personally',
    coreNeed: 'To protect relationships',
    howTheyErupt: 'Snaps in defense of others, moral outrage',
    howToCalmThem: '"You\'re right to care. Let\'s act together to restore harmony."',
    howToHelpThem: 'Use righteous loyalty language',
    rapailleCode: '"Respect = Action for Others"',
    howToRemoveMask: 'Mirror values, then co-act to restore bonds',
    speakTheirLanguage: 'Direct but emotionally charged'
  },
  'Heart+Head': {
    pressureProfile: 'Sentimental Thinker',
    hhgCombination: 'Heart + Head',
    dominantStyle: 'Feeling-based logic',
    emotionalTrigger: 'Disregard of values, over-analysis',
    maskDefense: 'Uses logic to suppress deeper pain',
    coreNeed: 'To be understood and effective',
    howTheyErupt: 'Overexplains feelings, emotional overload',
    howToCalmThem: '"You\'re making sense. Let\'s go deeper, together."',
    howToHelpThem: 'Honor emotional logic',
    rapailleCode: '"Truth = Emotional Intellect"',
    howToRemoveMask: 'Affirm story, then help organize feelings into structured thought',
    speakTheirLanguage: 'Reflective. Layered explanations'
  },
  Gut: {
    pressureProfile: 'Instinctive Doer',
    hhgCombination: 'Gut only',
    dominantStyle: 'Action-first',
    emotionalTrigger: 'Delay, powerlessness, lack of clarity',
    maskDefense: 'Aggression, urgency',
    coreNeed: 'To feel strong and trusted',
    howTheyErupt: 'Explosive action, impulsive decisions',
    howToCalmThem: '"You\'ve got this. Let\'s move now, together."',
    howToHelpThem: 'Reinforce protector identity',
    rapailleCode: '"Strength = Survival"',
    howToRemoveMask: 'Give power back; invite joint decisive action',
    speakTheirLanguage: 'Direct statements. Short commands'
  },
  'Gut+Head': {
    pressureProfile: 'Loyal Implementer',
    hhgCombination: 'Gut + Head',
    dominantStyle: 'Practical strategist',
    emotionalTrigger: 'Disorganized plans, unclear roles',
    maskDefense: 'Micromanagement, pressureiness',
    coreNeed: 'To keep things moving safely',
    howTheyErupt: 'Enforces rules rigidly, short temper',
    howToCalmThem: '"Here\'s the step-by-step plan. You\'ll guide it."',
    howToHelpThem: 'Give them control through structure',
    rapailleCode: '"Order = Safety"',
    howToRemoveMask: 'Empower their structure, invite flexibility one step at a time',
    speakTheirLanguage: 'Specific tasks. Clear responsibilities'
  },
  'Gut+Heart': {
    pressureProfile: 'Heroic Caretaker',
    hhgCombination: 'Gut + Heart',
    dominantStyle: 'Protector of people',
    emotionalTrigger: 'Betrayal, perceived injustice',
    maskDefense: 'Overresponsibility, moral pride',
    coreNeed: 'To shield and serve others',
    howTheyErupt: 'Outburst in defense of group values',
    howToCalmThem: '"We\'re aligned. Let\'s defend what matters most together."',
    howToHelpThem: 'Mirror protector role',
    rapailleCode: '"Honor = Protection"',
    howToRemoveMask: 'Affirm values, help set boundaries so they don\'t self-sacrifice too much',
    speakTheirLanguage: 'Direct but emotional'
  },
  'Head+Heart+Gut': {
    pressureProfile: 'Balanced Visionary',
    hhgCombination: 'Head + Heart + Gut',
    dominantStyle: 'Holistic leader',
    emotionalTrigger: 'Misalignment in purpose or execution',
    maskDefense: 'Tries to do everything perfectly',
    coreNeed: 'To be meaningful and effective',
    howTheyErupt: 'Total burnout, existential breakdown',
    howToCalmThem: '"Let\'s bring this back to what truly matters. You\'re not alone in this."',
    howToHelpThem: 'Guide them to simplify',
    rapailleCode: '"Wholeness = Identity + Execution"',
    howToRemoveMask: 'Help delegate, mirror impact, realign with their emotional compass',
    speakTheirLanguage: 'Adaptive between detail and big picture'
  }
}

/** Get pressure profile for the given HHG percentages. */
export const getPressureProfileForScores = (
  headPercent: number,
  heartPercent: number,
  gutPercent: number
): PressureProfileData | undefined => {
  const key = getBrainCombinationKey(headPercent, heartPercent, gutPercent)
  return PRESSURE_PROFILES[key]
}

interface PressureProfileProps {
  profile: PressureProfileData | null | undefined
}

export const PressureProfile = ({ profile }: PressureProfileProps) => {
  if (!profile) return null
  return (
    <div className="pressure-profile-block">
      <h4 className="pressure-profile-title">
        <span className="pressure-profile-icon"><FontAwesomeIcon icon={faUserTie} /></span>
        Pressure Profile
      </h4>
      <table className="pressure-profile-table">
        <thead>
          <tr>
            <th scope="col">Attribute</th>
            <th scope="col">Your profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Dominant Style</th>
            <td>{profile.dominantStyle}</td>
          </tr>
          <tr>
            <th scope="row">Emotional Trigger</th>
            <td>{profile.emotionalTrigger}</td>
          </tr>
          <tr>
            <th scope="row">Mask / Defense</th>
            <td>{profile.maskDefense}</td>
          </tr>
          <tr>
            <th scope="row">Core Need</th>
            <td>{profile.coreNeed}</td>
          </tr>
          <tr>
            <th scope="row">How They Erupt</th>
            <td>{profile.howTheyErupt}</td>
          </tr>
          <tr>
            <th scope="row">How to Calm Them</th>
            <td>{profile.howToCalmThem}</td>
          </tr>
          <tr>
            <th scope="row">How to Help Them</th>
            <td>{profile.howToHelpThem}</td>
          </tr>
          <tr>
            <th scope="row">Rapaille Code</th>
            <td>{profile.rapailleCode}</td>
          </tr>
          <tr>
            <th scope="row">How to Remove Mask</th>
            <td>{profile.howToRemoveMask}</td>
          </tr>
          <tr>
            <th scope="row">Speak Their Language</th>
            <td>{profile.speakTheirLanguage}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
