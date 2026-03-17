import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { getBrainCombinationKey } from '../../UnderPressure/PressureProfile/PressureProfile.tsx'
import './SocialMap.css'

export interface SocialMapData {
  speedOfAnswer: string
  triggers: string
  darkSide: string
  howToDiscussSeriousTopics: string
  energizers: string
  drainers: string
  humorStyle: string
}

const SOCIAL_MAP_DATA: Record<string, SocialMapData> = {
  Head: {
    speedOfAnswer: 'Slower. They think and filter before speaking',
    triggers: 'Hearing incorrect facts. Broken logic. Missing information',
    darkSide: 'Feeling uncertain or wrong. Overthinking doubts they hide.',
    howToDiscussSeriousTopics: 'Clear structure. Strong logic. Calm tone',
    energizers: 'Smart ideas. Strategy. Solving hard problems',
    drainers: 'Emotional drama. Disorganized people. Repeating themselves',
    humorStyle: 'Dry. Sarcastic. Clever wordplay'
  },
  'Head+Gut': {
    speedOfAnswer: 'Fast but calculated',
    triggers: 'Hearing claims without authority or proof',
    darkSide: 'Frustration when losing control. Impatience they suppress.',
    howToDiscussSeriousTopics: 'Be direct. Recognize competence. Focus on results',
    energizers: 'Winning. Control. Strategic results',
    drainers: 'Incompetence. Delay. Lack of discipline',
    humorStyle: 'Sharp. Bold. Cutting'
  },
  'Head+Heart': {
    speedOfAnswer: 'Moderate and filtered',
    triggers: 'Their feelings ignored',
    darkSide: 'Anxiety about emotional reactions. Hiding self-doubt.',
    howToDiscussSeriousTopics: 'Show the logic. Acknowledge their feelings',
    energizers: 'Smart collaboration. Clear thinking together.',
    drainers: 'Tension. Harsh environments',
    humorStyle: 'Light. Situational. Gentle sarcasm'
  },
  Heart: {
    speedOfAnswer: 'Moderate but filtered. They consider how it affects others',
    triggers: 'Feeling harsh tone or emotional tension',
    darkSide: 'Feeling overwhelmed. Difficulty saying no. Fear of conflict.',
    howToDiscussSeriousTopics: 'Calm tone. Do not embarrass them publicly',
    energizers: 'Connection. Appreciation. Meaningful talks',
    drainers: 'Conflict. Emotional distance. Harsh criticism',
    humorStyle: 'Playful. Relatable.'
  },
  'Heart+Gut': {
    speedOfAnswer: 'Fast when values are triggered. Slower when emotional',
    triggers: 'Feeling emotional harm or disrespect',
    darkSide: 'Anger or irritation. Acting too fast emotionally.',
    howToDiscussSeriousTopics: 'Speak clearly about values. Be sincere and firm',
    energizers: 'Helping others. Purposeful action',
    drainers: 'Toxic people. Value conflicts',
    humorStyle: 'Protective. Teasing'
  },
  'Heart+Head': {
    speedOfAnswer: 'Slow. Reflective',
    triggers: 'Feeling emotionally misunderstood',
    darkSide: 'Regret over past mistakes. Worry about being judged.',
    howToDiscussSeriousTopics: 'Be patient. Give time to think',
    energizers: 'Deep conversations. Insightful ideas',
    drainers: 'Pressure. Surface level talk',
    humorStyle: 'Gentle. Thoughtful'
  },
  Gut: {
    speedOfAnswer: 'Fast. Instinctive. Direct',
    triggers: 'Unclear next action',
    darkSide: 'Impulsive urges. Regret for acting without thinking.',
    howToDiscussSeriousTopics: 'Be direct. Be confident. Get to the point',
    energizers: 'Action. Momentum. Visible progress',
    drainers: 'Inaction. Long debates. Passive behavior',
    humorStyle: 'Bold. Teasing. Sometimes dark'
  },
  'Gut+Head': {
    speedOfAnswer: 'Fast but controlled',
    triggers: 'Unclear responsibility or broken process',
    darkSide: 'Hidden frustration with slow processes. Anxiety over mistakes.',
    howToDiscussSeriousTopics: 'Recognize effort. Offer practical solutions',
    energizers: 'Defined goals. Strong execution. Recognition.',
    drainers: 'Doing everything alone',
    humorStyle: 'Dry. Subtle'
  },
  'Gut+Heart': {
    speedOfAnswer: 'Fast when emotions run strong',
    triggers: 'Feeling loyalty or care is missing',
    darkSide: 'Buried resentment. Emotional reactions they don\'t show.',
    howToDiscussSeriousTopics: 'Do not question their commitment. Set clear boundaries',
    energizers: 'Challenge. Intensity. Personal resolve.',
    drainers: 'Carrying others\' burdens',
    humorStyle: 'Playful but intense'
  },
  'Head+Heart+Gut': {
    speedOfAnswer: 'Moderate. Adjusts to situation',
    triggers: 'Conversation losing balance or direction',
    darkSide: 'Internal conflict. Paralyzed by too many priorities. Fear of indecision.',
    howToDiscussSeriousTopics: 'Clarify priorities. Reduce noise. Give clear direction',
    energizers: 'Big vision. Long-term pursuit.',
    drainers: 'Constant demands. Context switching',
    humorStyle: 'Situational. Adaptive'
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

interface SocialMapProps {
  profile: SocialMapData | null | undefined
}

export const SocialMap = ({ profile }: SocialMapProps) => {
  if (!profile) return null
  return (
    <div className="social-map-block">
      <h4 className="social-map-title">
        <span className="social-map-icon"><FontAwesomeIcon icon={faMap} /></span>
        Social Map
      </h4>
      <table className="social-map-table">
        <thead>
          <tr>
            <th scope="col">Attribute</th>
            <th scope="col">Your profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Speed of Answer</th>
            <td>{profile.speedOfAnswer}</td>
          </tr>
          <tr>
            <th scope="row">Triggers</th>
            <td>{profile.triggers}</td>
          </tr>
          <tr>
            <th scope="row">Dark Side</th>
            <td>{profile.darkSide}</td>
          </tr>
          <tr>
            <th scope="row">How to discuss serious topics</th>
            <td>{profile.howToDiscussSeriousTopics}</td>
          </tr>
          <tr>
            <th scope="row">Energizers</th>
            <td>{profile.energizers}</td>
          </tr>
          <tr>
            <th scope="row">Drainers</th>
            <td>{profile.drainers}</td>
          </tr>
          <tr>
            <th scope="row">Humor style</th>
            <td>{profile.humorStyle}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
