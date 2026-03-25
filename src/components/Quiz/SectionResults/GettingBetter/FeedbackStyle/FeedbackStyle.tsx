import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import './FeedbackStyle.css'

export interface FeedbackStyleData {
  howToTeach: string
  triggers: string
  howToListenToThem: string
  whatKindOfFeedbackTheyValue: string
  hhgShiftToBalance: string
  stuckMode: string
  encouragement: string
}

const FEEDBACK_STYLES: Record<string, FeedbackStyleData> = {
  Head: {
    howToTeach: 'Teach with clear logic, frameworks, and structured reasoning. Show models, systems, and evidence.',
    triggers: 'Illogical arguments, vague claims, emotional persuasion without reasoning.',
    howToListenToThem: 'Listen for their reasoning chain and how they break problems down. Ask clarifying questions about their logic.',
    whatKindOfFeedbackTheyValue: 'Feedback that improves their thinking. Blind spots, flawed assumptions, hidden risks, and better frameworks.',
    hhgShiftToBalance: 'Head > Gut + Heart',
    stuckMode: 'They keep analyzing the same idea repeatedly but hesitate to commit to a decision.',
    encouragement: 'Your thinking is strong. Sometimes the next step becomes clear in a different way. What does your instinct say about this?',
  },
  'Head+Gut': {
    howToTeach: 'Start with logic, then show practical execution and outcomes. Link analysis to decisive action.',
    triggers: 'Endless discussion without decisions, inefficiency, weak leadership.',
    howToListenToThem: 'Listen for the shift from analysis to judgment. They often move quickly to a conclusion about what should be done.',
    whatKindOfFeedbackTheyValue: 'Feedback that improves strategy and execution. Risks in their plan and stronger ways to move forward.',
    hhgShiftToBalance: 'Head + Gut > Heart',
    stuckMode: 'They push forward with plans but feel strangely disconnected from why it matters.',
    encouragement: 'You already understand how to make things work. There may also be something meaningful in this. What part of this matters most to you?',
  },
  'Head+Heart': {
    howToTeach: 'Combine logical explanation with human implications. Explain both the system and the people impact.',
    triggers: 'Cold logic that ignores people, or emotional reasoning that ignores facts.',
    howToListenToThem: 'Listen for how they balance fairness with rational thinking. They often try to reconcile both.',
    whatKindOfFeedbackTheyValue: 'Feedback that improves clarity between their reasoning and their personal convictions.',
    hhgShiftToBalance: 'Head + Heart > Gut',
    stuckMode: 'They keep reflecting on ideas and values but delay turning them into decisions.',
    encouragement: 'Your ideas make sense and they carry meaning. Sometimes clarity appears in the moment of movement. What feels like the natural next step?',
  },
  Heart: {
    howToTeach: 'Teach through stories, meaning, and emotional relevance. Connect ideas to relationships and values.',
    triggers: 'Emotional dismissal, harsh criticism, feeling unheard or misunderstood.',
    howToListenToThem: 'Listen empathetically first. Reflect their feelings before offering solutions.',
    whatKindOfFeedbackTheyValue: 'Feedback that helps them understand their own emotional patterns, values and motivations.',
    hhgShiftToBalance: 'Heart > Gut + Head',
    stuckMode: 'They sit with strong feelings but struggle to organize or express them clearly.',
    encouragement: 'What you feel is meaningful and real. Sometimes understanding grows when feelings take shape as ideas. How would you describe what this means to you?',
  },
  'Heart+Gut': {
    howToTeach: 'Show how ideas protect or empower people. They respond to purpose combined with strength.',
    triggers: 'Betrayal, injustice, people being taken advantage of.',
    howToListenToThem: 'Listen respectfully and sincerely. Acknowledge both their emotions and their protective instincts.',
    whatKindOfFeedbackTheyValue: 'Feedback that improves their alignment between personal values and instinctive judgment. Greater clarity about when something truly feels right according to their values.',
    hhgShiftToBalance: 'Heart + Gut > Head',
    stuckMode: 'They feel very strongly about something but struggle to explain or examine why.',
    encouragement: 'Your convictions are strong. Sometimes a little distance reveals something new. What do you notice when you step back and look at it again?',
  },
  'Heart+Head': {
    howToTeach: 'Begin with empathy, then guide toward reflection and thoughtful understanding.',
    triggers: 'Aggressive authority, emotionally insensitive behavior, dismissiveness.',
    howToListenToThem: 'Listen for nuanced emotions and reflective insights. They often process feelings intellectually.',
    whatKindOfFeedbackTheyValue: 'Feedback that improves their clarity when interpreting situations. Stronger connection between emotional insight and structured reasoning.',
    hhgShiftToBalance: 'Heart + Head > Gut',
    stuckMode: 'They keep reflecting and interpreting but hesitate to commit to a firm conclusion.',
    encouragement: 'Your reflection brings real insight. At times the answer also appears as a quiet certainty. What does your instinct say here?',
  },
  Gut: {
    howToTeach: 'Teach through direct examples, quick demonstrations, and action-based learning.',
    triggers: 'Indecision, weakness, overthinking, wasting time.',
    howToListenToThem: 'Listen for conclusions rather than long explanations. They communicate through judgment and instinct.',
    whatKindOfFeedbackTheyValue: 'Feedback that improves their effectiveness in action. Better timing, sharper judgment, and stronger results from their decisions.',
    hhgShiftToBalance: 'Gut > Heart + Head',
    stuckMode: 'They keep moving quickly but begin to feel uncertain about whether their direction is correct.',
    encouragement: 'Your instinct is strong. Sometimes another layer appears when there is a moment to reflect. What becomes clearer when you think about it a little longer?',
  },
  'Gut+Head': {
    howToTeach: 'Present a clear plan supported by logic and structured execution.',
    triggers: 'Chaos, poor planning, emotional reactions without thinking.',
    howToListenToThem: 'Listen for strategy and control. They often frame issues in terms of systems and authority.',
    whatKindOfFeedbackTheyValue: 'Feedback that aids them in exposing weaknesses in their structure, plan, or assumptions before execution begins.',
    hhgShiftToBalance: 'Gut + Head > Heart',
    stuckMode: 'They continue refining plans or systems but lose sight of the deeper purpose behind them.',
    encouragement: 'Your strategy is clear and effective. There may also be something personal within it. What about this feels meaningful to you?',
  },
  'Gut+Heart': {
    howToTeach: 'Show how ideas build loyalty, strength, and unity among people.',
    triggers: 'Disloyalty, disrespect, manipulation, betrayal.',
    howToListenToThem: 'Listen for convictions and values. They often speak with strong moral certainty.',
    whatKindOfFeedbackTheyValue: 'Feedback that improves their alignment between instinct and personal conviction. Greater confidence in when to act decisively.',
    hhgShiftToBalance: 'Gut + Heart > Head',
    stuckMode: 'They feel strong conviction but become restless or frustrated without clear reasoning behind it.',
    encouragement: 'Your conviction carries weight. Sometimes a closer look reveals something interesting. What stands out when you examine it more carefully?',
  },
  'Head+Heart+Gut': {
    howToTeach: 'Teach with a full perspective: logical clarity, human meaning, and practical action.',
    triggers: 'One-dimensional thinking that ignores people, logic, or reality.',
    howToListenToThem: 'Listen for how they integrate analysis, empathy, and instinct. Engage them holistically.',
    whatKindOfFeedbackTheyValue: 'Feedback that identifies when they are relying too heavily on one mode such as analysis, emotion, or instinct instead of balancing all three.',
    hhgShiftToBalance: 'Focus (Head + Heart + Gut)',
    stuckMode: 'They move back and forth between analysis, reflection, and instinct without settling on a clear direction.',
    encouragement: 'You see things from many angles. Bringing them together often reveals something powerful. What does the whole picture look like to you now?',
  }
}

export const getFeedbackStyleForCombination = (combination: string): FeedbackStyleData | undefined =>
  FEEDBACK_STYLES[combination]

interface FeedbackStyleProps {
  combination: string
}

export const FeedbackStyle = ({ combination }: FeedbackStyleProps) => {
  const data = getFeedbackStyleForCombination(combination)
  if (!data) return null

  return (
    <div className="feedback-style-block">
      <h4 className="feedback-style-title">
        <span className="feedback-style-icon"><FontAwesomeIcon icon={faComments} /></span>
        Feedback Style
      </h4>
      <table className="feedback-style-table">
        <thead>
          <tr>
            <th scope="col">Attribute</th>
            <th scope="col">Your profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">How to Teach</th>
            <td>{data.howToTeach}</td>
          </tr>
          <tr>
            <th scope="row">Triggers</th>
            <td>{data.triggers}</td>
          </tr>
          <tr>
            <th scope="row">How to Listen to Them</th>
            <td>{data.howToListenToThem}</td>
          </tr>
          <tr>
            <th scope="row">What Kind of Feedback They Value</th>
            <td>{data.whatKindOfFeedbackTheyValue}</td>
          </tr>
          <tr>
            <th scope="row">HHG Shift to Balance</th>
            <td>{data.hhgShiftToBalance}</td>
          </tr>
          <tr>
            <th scope="row">Stuck Mode</th>
            <td>{data.stuckMode}</td>
          </tr>
          <tr>
            <th scope="row">Encouragement</th>
            <td>{data.encouragement}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
