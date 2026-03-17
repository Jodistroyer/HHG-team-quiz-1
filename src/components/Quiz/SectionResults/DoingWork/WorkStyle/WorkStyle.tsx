import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons'
import { getBrainCombinationKey } from '../../UnderPressure/PressureProfile/PressureProfile.tsx'
import './WorkStyle.css'

export interface WorkStyleData {
  speakTheirLanguage: string
  ambiguityResponseStyle: string
  burnoutSigns: string
  whatTheySecretlyNeed: string
  whatManagerShouldDo: string
  blindspots: string
}

const BURNOUT_PROFILES: Record<string, WorkStyleData> = {
  Head: {
    speakTheirLanguage: 'Systems. Logic. Patterns. Why things work.',
    ambiguityResponseStyle: 'Accuracy Focused: Seeks the correct solution before moving',
    burnoutSigns: 'Indecision, stalled decisions, emotional detachment',
    whatTheySecretlyNeed: 'Permission to act imperfectly',
    whatManagerShouldDo: 'Reduce scope. Set a decide on just 70% of data rule. Give deadline + emotional reassurance that imperfect is fine.',
    blindspots: 'Overthinking to avoid being wrong.'
  },
  'Head+Gut': {
    speakTheirLanguage: 'Processes. Options. Possibilities. How things happen.',
    ambiguityResponseStyle: 'Clear-Then-Act: Moves once direction is defined',
    burnoutSigns: 'Irritability, over-control, pushing team too hard',
    whatTheySecretlyNeed: 'Emotional grounding',
    whatManagerShouldDo: 'Pull them aside privately. Ask how they are doing. Encourage delegation and recovery windows.',
    blindspots: 'Forcing control under stress.'
  },
  'Head+Heart': {
    speakTheirLanguage: 'Principles. Coherence. Context. What makes sense.',
    ambiguityResponseStyle: 'Stability Focused: Prefers steady and predictable outcomes',
    burnoutSigns: 'Quiet exhaustion, conflict avoidance',
    whatTheySecretlyNeed: 'Clear authority to make tough calls',
    whatManagerShouldDo: 'Explicitly back their decisions. Tell them it\'s okay to disrupt harmony if needed.',
    blindspots: 'Avoiding difficult choices.'
  },
  Heart: {
    speakTheirLanguage: 'Meaning. Experience. Reflection. What it means.',
    ambiguityResponseStyle: 'Alignment Focused: Looks for internal coherence before deciding',
    burnoutSigns: 'Emotional withdrawal, guilt, over-apologizing',
    whatTheySecretlyNeed: 'Structure + boundaries',
    whatManagerShouldDo: 'Create clear task lists and priorities. Protect them from emotional overload.',
    blindspots: 'Guilt around personal limits.'
  },
  'Heart+Gut': {
    speakTheirLanguage: 'Values. Purpose. Alignment. What matters most.',
    ambiguityResponseStyle: 'Conviction-Led: Commits when internally settled',
    burnoutSigns: 'Overextending for others, reactive stress',
    whatTheySecretlyNeed: 'Strategic clarity',
    whatManagerShouldDo: 'Help them zoom out. Ask: "What is actually yours to carry?" Remove unnecessary fires.',
    blindspots: 'Taking on too much.'
  },
  'Heart+Head': {
    speakTheirLanguage: 'Philosophy. Insight. Nuance. How to understand deeply.',
    ambiguityResponseStyle: 'Reflective: Expands consideration before commitment',
    burnoutSigns: 'Paralysis, over-reflection, existential fatigue',
    whatTheySecretlyNeed: 'Decisive push',
    whatManagerShouldDo: 'Give a clear next action. Break big meaning questions into small execution steps.',
    blindspots: 'Questioning instead of acting.'
  },
  Gut: {
    speakTheirLanguage: 'Action. Timing. Flow. When to do it.',
    ambiguityResponseStyle: 'Rapid Commitment: Decides quickly once sure',
    burnoutSigns: 'Physical exhaustion, reckless speed, ignoring warning signs',
    whatTheySecretlyNeed: 'Forced slowdown',
    whatManagerShouldDo: 'Mandate rest. Reduce workload temporarily. Channel energy into one focused priority.',
    blindspots: 'Ignoring personal limits.'
  },
  'Gut+Head': {
    speakTheirLanguage: 'Systems in motion. Patterns. Change. How it unfolds.',
    ambiguityResponseStyle: 'Process Driven: Uses structured steps to decide',
    burnoutSigns: 'Silent overload, over-responsibility',
    whatTheySecretlyNeed: 'Emotional acknowledgment',
    whatManagerShouldDo: 'Publicly recognize contribution. Ask what support they need.',
    blindspots: 'Refusing support.'
  },
  'Gut+Heart': {
    speakTheirLanguage: 'Energy. Motivation. Drive. What feels important.',
    ambiguityResponseStyle: 'Exposure Aware: Limits downside before committing',
    burnoutSigns: 'Martyrdom, absorbing team stress',
    whatTheySecretlyNeed: 'Redistribution of burden',
    whatManagerShouldDo: 'Remove responsibilities without asking permission. Reassign load. Encourage personal time.',
    blindspots: 'Holding stress inside.'
  },
  'Head+Heart+Gut': {
    speakTheirLanguage: 'Big picture. Connections. Direction. Where it leads.',
    ambiguityResponseStyle: 'Narrowed Options: Reduces choices to maintain focus',
    burnoutSigns: 'Decision fatigue, mental fog',
    whatTheySecretlyNeed: 'Delegation + simplification',
    whatManagerShouldDo: 'Temporarily narrow scope. Assign trusted lieutenants. Remove low-impact decisions.',
    blindspots: 'Pushing past exhaustion.'
  }
}

export const getWorkStyleForScores = (
  headPercent: number,
  heartPercent: number,
  gutPercent: number
): WorkStyleData | undefined => {
  const key = getBrainCombinationKey(headPercent, heartPercent, gutPercent)
  return BURNOUT_PROFILES[key]
}

interface WorkStyleProps {
  profile: WorkStyleData | null | undefined
}

export const WorkStyle = ({ profile }: WorkStyleProps) => {
  if (!profile) return null
  return (
    <div className="work-style-block">
      <h4 className="work-style-title">
        <span className="work-style-icon"><FontAwesomeIcon icon={faFireFlameCurved} /></span>
        Work Style
      </h4>
      <table className="work-style-table">
        <thead>
          <tr>
            <th scope="col">Attribute</th>
            <th scope="col">Your profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Speak Their Language</th>
            <td>{profile.speakTheirLanguage}</td>
          </tr>
          <tr>
            <th scope="row">Ambiguity Response Style</th>
            <td>{profile.ambiguityResponseStyle}</td>
          </tr>
          <tr>
            <th scope="row">Blindspots</th>
            <td>{profile.blindspots}</td>
          </tr>
          <tr>
            <th scope="row">Burnout Signs</th>
            <td>{profile.burnoutSigns}</td>
          </tr>
          <tr>
            <th scope="row">What They Secretly Need</th>
            <td>{profile.whatTheySecretlyNeed}</td>
          </tr>
          <tr>
            <th scope="row">What a Manager Should Do</th>
            <td>{profile.whatManagerShouldDo}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
