import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import type { ProfileTableRow } from '../ProfileTable/ProfileTable.tsx'
import { ProfileTable } from '../ProfileTable/ProfileTable.tsx'
import { getBrainCombinationKey } from '../utils.tsx'

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

interface PressureProfileTableProps {
  profile: PressureProfileData | null | undefined
  balanceTip?: string
  balanceTipBadge?: string
}

export const PressureProfileTable = ({ profile, balanceTip, balanceTipBadge }: PressureProfileTableProps) => {
  if (!profile) return null
  const rows: ProfileTableRow[] = [
    { label: 'Dominant Style', value: profile.dominantStyle },
    { label: 'Emotional Trigger', value: profile.emotionalTrigger },
    { label: 'Mask / Defense', value: profile.maskDefense },
    { label: 'Core Need', value: profile.coreNeed },
    { label: 'How They Erupt', value: profile.howTheyErupt },
    { label: 'How to Calm Them', value: profile.howToCalmThem },
    { label: 'How to Help Them', value: profile.howToHelpThem },
    { label: 'Rapaille Code', value: profile.rapailleCode },
    { label: 'How to Remove Mask', value: profile.howToRemoveMask },
    { label: 'Speak Their Language', value: profile.speakTheirLanguage }
  ]

  if (balanceTip && balanceTipBadge) {
    rows.push({
      label: 'Balance Tip',
      value: <><strong>{balanceTipBadge}:</strong> {balanceTip}</>
    })
  }

  return <ProfileTable title="Pressure Profile" icon={faUserTie} rows={rows} />
}

