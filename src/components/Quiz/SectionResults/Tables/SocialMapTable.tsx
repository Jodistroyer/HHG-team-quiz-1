import { faMap } from '@fortawesome/free-solid-svg-icons'
import type { ProfileTableRow } from '../ProfileTable/ProfileTable.tsx'
import { ProfileTable } from '../ProfileTable/ProfileTable.tsx'
import { getBrainCombinationKey } from '../utils.tsx'

export interface SocialMapData {
  speedOfAnswer: string
  triggers: string
  darkSide: string
  howToDiscussSeriousTopics: string
  energizers: string
  drainers: string
  humorStyle: string
  whoYoureDrawnTo: string
  loveLanguage: string[]
}

const SOCIAL_MAP_DATA: Record<string, SocialMapData> = {
  Head: {
    speedOfAnswer: 'Slower. They think and filter before speaking',
    triggers: 'Hearing incorrect facts. Broken logic. Missing information',
    darkSide: 'Feeling uncertain or wrong. Overthinking doubts they hide.',
    howToDiscussSeriousTopics: 'Clear structure. Strong logic. Calm tone',
    energizers: 'Smart ideas. Strategy. Solving hard problems',
    drainers: 'Emotional drama. Disorganized people. Repeating themselves',
    humorStyle: 'Dry. Sarcastic. Clever wordplay',
    whoYoureDrawnTo:
      'People who are patient, rational, and can value your ideas without taking offense at your bluntness.',
    loveLanguage: ['Acts of competence and reliability', 'Being needed for advice or insight'],
  },
  'Head+Gut': {
    speedOfAnswer: 'Fast but calculated',
    triggers: 'Hearing claims without authority or proof',
    darkSide: 'Frustration when losing control. Impatience they suppress.',
    howToDiscussSeriousTopics: 'Be direct. Recognize competence. Focus on results',
    energizers: 'Winning. Control. Strategic results',
    drainers: 'Incompetence. Delay. Lack of discipline',
    humorStyle: 'Sharp. Bold. Cutting',
    whoYoureDrawnTo: 'People who are competent, self-reliant, and appreciate decisiveness.',
    loveLanguage: ['Respect and recognition for their decisiveness', 'Shared adventures or challenges'],
  },
  'Head+Heart': {
    speedOfAnswer: 'Moderate and filtered',
    triggers: 'Their feelings ignored',
    darkSide: 'Anxiety about emotional reactions. Hiding self-doubt.',
    howToDiscussSeriousTopics: 'Show the logic. Acknowledge their feelings',
    energizers: 'Smart collaboration. Clear thinking together.',
    drainers: 'Tension. Harsh environments',
    humorStyle: 'Light. Situational. Gentle sarcasm',
    whoYoureDrawnTo: 'People who are reflective, emotionally aware, and appreciate thoughtful reasoning.',
    loveLanguage: ['Thoughtful gestures', 'Quality time', 'Verbal affirmation grounded in insight'],
  },
  Heart: {
    speedOfAnswer: 'Moderate but filtered. They consider how it affects others',
    triggers: 'Feeling harsh tone or emotional tension',
    darkSide: 'Feeling overwhelmed. Difficulty saying no. Fear of conflict.',
    howToDiscussSeriousTopics: 'Calm tone. Do not embarrass them publicly',
    energizers: 'Connection. Appreciation. Meaningful talks',
    drainers: 'Conflict. Emotional distance. Harsh criticism',
    humorStyle: 'Playful. Relatable.',
    whoYoureDrawnTo: 'People who are warm, communicative, and appreciative of emotional depth.',
    loveLanguage: ['Emotional attention', 'Affirmation', 'Care', 'Consideration'],
  },
  'Heart+Gut': {
    speedOfAnswer: 'Fast when values are triggered. Slower when emotional',
    triggers: 'Feeling emotional harm or disrespect',
    darkSide: 'Anger or irritation. Acting too fast emotionally.',
    howToDiscussSeriousTopics: 'Speak clearly about values. Be sincere and firm',
    energizers: 'Helping others. Purposeful action',
    drainers: 'Toxic people. Value conflicts',
    humorStyle: 'Protective. Teasing',
    whoYoureDrawnTo: 'People who are courageous, emotionally expressive, and active.',
    loveLanguage: ['Acts of loyalty', 'Devotion', 'Physical support', 'Protection'],
  },
  'Heart+Head': {
    speedOfAnswer: 'Slow. Reflective',
    triggers: 'Feeling emotionally misunderstood',
    darkSide: 'Regret over past mistakes. Worry about being judged.',
    howToDiscussSeriousTopics: 'Be patient. Give time to think',
    energizers: 'Deep conversations. Insightful ideas',
    drainers: 'Pressure. Surface level talk',
    humorStyle: 'Gentle. Thoughtful',
    whoYoureDrawnTo: 'People who are reflective, fair-minded, and emotionally intelligent.',
    loveLanguage: ['Verbal affirmation', 'Shared experiences', 'Mutual understanding'],
  },
  Gut: {
    speedOfAnswer: 'Fast. Instinctive. Direct',
    triggers: 'Unclear next action',
    darkSide: 'Impulsive urges. Regret for acting without thinking.',
    howToDiscussSeriousTopics: 'Be direct. Be confident. Get to the point',
    energizers: 'Action. Momentum. Visible progress',
    drainers: 'Inaction. Long debates. Passive behavior',
    humorStyle: 'Bold. Teasing. Sometimes dark',
    whoYoureDrawnTo: 'People who are independent, energetic, and confident.',
    loveLanguage: ['Physical engagement', 'Adventure', 'Direct support'],
  },
  'Gut+Head': {
    speedOfAnswer: 'Fast but controlled',
    triggers: 'Unclear responsibility or broken process',
    darkSide: 'Hidden frustration with slow processes. Anxiety over mistakes.',
    howToDiscussSeriousTopics: 'Recognize effort. Offer practical solutions',
    energizers: 'Defined goals. Strong execution. Recognition.',
    drainers: 'Doing everything alone',
    humorStyle: 'Dry. Subtle',
    whoYoureDrawnTo:
      'People who are competent, independent, and capable of handling action-oriented environments.',
    loveLanguage: ['Recognition', 'Practical support', 'Shared challenges'],
  },
  'Gut+Heart': {
    speedOfAnswer: 'Fast when emotions run strong',
    triggers: 'Feeling loyalty or care is missing',
    darkSide: 'Buried resentment. Emotional reactions they don\'t show.',
    howToDiscussSeriousTopics: 'Do not question their commitment. Set clear boundaries',
    energizers: 'Challenge. Intensity. Personal resolve.',
    drainers: 'Carrying others\' burdens',
    humorStyle: 'Playful but intense',
    whoYoureDrawnTo: 'People who are emotionally expressive, courageous, and energetic.',
    loveLanguage: ['Caring actions', 'Loyalty', 'Physical engagement'],
  },
  'Head+Heart+Gut': {
    speedOfAnswer: 'Moderate. Adjusts to situation',
    triggers: 'Conversation losing balance or direction',
    darkSide: 'Internal conflict. Paralyzed by too many priorities. Fear of indecision.',
    howToDiscussSeriousTopics: 'Clarify priorities. Reduce noise. Give clear direction',
    energizers: 'Big vision. Long-term pursuit.',
    drainers: 'Constant demands. Context switching',
    humorStyle: 'Situational. Adaptive',
    whoYoureDrawnTo: 'People who are insightful, emotionally aware, adaptable, and supportive.',
    loveLanguage: ['Combination of affirmation', 'Thoughtful action', 'Shared meaningful experiences'],
  }
}

export const getSocialMapForScores = (
  headPercent: number,
  heartPercent: number,
  gutPercent: number
): SocialMapData | undefined => {
  const key = getBrainCombinationKey(headPercent, heartPercent, gutPercent)
  return SOCIAL_MAP_DATA[key]
}

interface SocialMapTableProps {
  profile: SocialMapData | null | undefined
  balanceTip?: string
  balanceTipBadge?: string
}

export const SocialMapTable = ({ profile, balanceTip, balanceTipBadge }: SocialMapTableProps) => {
  if (!profile) return null
  const rows: ProfileTableRow[] = [
    { label: 'Speed of Answer', value: profile.speedOfAnswer },
    { label: 'Triggers', value: profile.triggers },
    { label: 'Dark Side', value: profile.darkSide },
    { label: 'How to discuss serious topics', value: profile.howToDiscussSeriousTopics },
    { label: 'Energizers', value: profile.energizers },
    { label: 'Drainers', value: profile.drainers },
    { label: 'Humor style', value: profile.humorStyle },
    { label: 'Drawn to', value: profile.whoYoureDrawnTo },
    {
      label: 'Love language',
      value: (
        <ul className="social-map-list">
          {profile.loveLanguage.map((item, index) => (
            <li key={`${item}-${index}`}>{item}</li>
          ))}
        </ul>
      )
    }
  ]

  if (balanceTip && balanceTipBadge) {
    rows.push({
      label: 'Balance Tip',
      value: <><strong>{balanceTipBadge}:</strong> {balanceTip}</>
    })
  }

  return <ProfileTable title="Social Map" icon={faMap} rows={rows} />
}

