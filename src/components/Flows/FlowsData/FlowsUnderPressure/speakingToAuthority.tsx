import { ContextCardArt, CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import type { FlowSituation, FlowStepArtProps } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const SPEAKING_TO_AUTHORITY_SITUATION_ID = 'speaking-to-authority' as const

export const speakingToAuthorityFlowSituation: FlowSituation = {
  id: 'speaking-to-authority',
  title: 'Speaking to authority',
  cardTitle: 'Speaking to authority',
  cardDescription: 'Stay clear and steady under scrutiny.',
  readMinutes: 1,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Logic → Diplomacy → Stance',
      whyThisOrder:
        'Validates the Logic: You rely on data. Leading with logic ensures you’re right, but adding Heart makes you likable to the authority, making your final ask (Gut) harder to refuse.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Audit your logic',
          body:
            'Double check your data and your “proof.” Authority figures respect competence above all else. When you lead with a bulletproof logical case, you establish yourself as a peer in intellect, which builds immediate professional respect.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Apply diplomatic warmth',
          body:
            'Once you have proven you are right, soften the delivery. Acknowledge the other person’s challenges or goals. This prevents you from appearing like a cold machine and makes the authority figure want to support you because they like the “human” behind the data.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Take a firm stance',
          body:
            'Now that you are respected and liked, state your final position. Don’t backtrack or over-explain. Use a steady voice and calm body language to show that while you are collaborative, you are also firm in your requirements.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Objectives → Boundary → Rapport',
      whyThisOrder:
        'Defines the Outcome: You need a goal. Define the outcome first (Head), set your non-negotiables (Gut), and only then soften the blow with a relational connection (Heart).',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Define the objective',
          body:
            'Enter the room with a clear number or outcome in mind. If you don’t have a specific goal, the authority figure’s leverage will pull you off course. Clarity is your best defense against being steamrolled.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Set your physical boundary',
          body:
            'Decide on your “walk away” point before you start. Maintain a strong, upright posture. By holding your ground physically, you signal that you are not a subordinate to be managed, but a partner to be negotiated with.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Build bridge rapport',
          body:
            'After the terms are discussed, end on a relational note. Mention a shared interest or express gratitude for their time. This leaves the authority figure with a positive “feeling” about you, even if the negotiation was intense.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Clarity → Empathy → Ask',
      whyThisOrder:
        'Establishes Expert Value: You see the “how” and the “who.” Use clarity to prove your value, empathy to lower their guard, and then firmly state your position.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Lead with clarity',
          body:
            'State your value proposition clearly and concisely. Avoid jargon or rambling. When you provide high-level clarity, you prove that you respect the authority figure’s time, which is a major component of likability in high-stakes settings.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Display tactical empathy',
          body:
            'Listen more than you speak. Validate their concerns by saying “It sounds like you are worried about X.” Lowering their defensive guard through empathy makes you an ally rather than a threat to their leverage.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Make the direct ask',
          body:
            'End with a specific request. Use the “Gut” to stop the talking and let the ask hang in the air. Your confidence in the silence demonstrates that you believe you are worthy of the outcome you’ve requested.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Facts → Authenticity → Weight',
      whyThisOrder:
        'Protects the Core: Under pressure from power, you may get too emotional. Leading with cold facts (Head) protects your Heart and gives your presence more gravitas.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Lead with cold facts',
          body:
            'Open the conversation with the most objective, unarguable data point you have. This creates a “logic shield” for your heart. It prevents you from leading with a “please like me” energy that authority figures often read as a weakness.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Show authentic conviction',
          body:
            'Once the facts are on the table, let your genuine passion show. Explain why this matters to you on a personal level. Authority figures are often moved by people who are both factually correct and authentically invested.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Add physical weight',
          body:
            'Slow down your movements and deepen your voice. If the conversation gets emotional, use your body to stay grounded. This “weight” ensures that your likability doesn’t come at the cost of your professional authority.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Strategy → Posture → Connection',
      whyThisOrder:
        'Cools the Reaction: You are passionate and reactive. Leading with a logical plan cools the reaction so you can stand your ground (Gut) without burning the bridge (Heart).',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Script your strategy',
          body:
            'Write out your opening and closing lines. Having a logical “script” prevents your passion from turning into a reactive outburst. It keeps the conversation on the rails when the power dynamic feels lopsided.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Maintain a neutral posture',
          body:
            'Keep your hands visible and your shoulders relaxed. Resist the urge to fidget or lean in too aggressively. A neutral, powerful physical presence prevents you from appearing “desperate,” which significantly boosts your likability.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Connect the dots',
          body:
            'Frame your needs as a benefit to the authority figure. “When I have X, I can help you achieve Y.” Linking your personal success to theirs is the ultimate way to stay likable while getting exactly what you want.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Context → Alignment → Commitment',
      whyThisOrder:
        'Neutralizes the Motives: You overthink the person’s motives. Focusing on the business context (Head) first keeps you from getting manipulated by the emotional temperature of the room.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Establish business context',
          body:
            'Start by discussing the broader goals of the company or the project. This shows you have “executive presence” and that you aren’t just focused on your own needs. It signals that you are a high-level thinker.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Align your interests',
          body:
            'Express how your request aligns with the authority figure’s vision. When you show that you are “on their side” emotionally and strategically, they stop viewing the negotiation as a zero-sum game.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Secure the commitment',
          body:
            'Ask for a definitive timeline or a follow-up date. Don’t let the conversation end in “we’ll see.” Use your gut to pin down the details, ensuring that your diplomatic approach leads to a real-world result.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Poise → Evidence → Respect',
      whyThisOrder:
        'Demonstrates Poised Power: You naturally resist authority. Leading with physical poise/silence (Gut) demonstrates power, which you then back up with logic and professional respect.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Command through poise',
          body:
            'Walk into the room and take a breath before you speak. Your silence and physical stillness demonstrate a high level of self-assurance. Authority figures are naturally drawn to people who can occupy space without being frantic.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Present the evidence',
          body:
            'Back up your presence with hard evidence. You don’t need a thousand words; you need three strong points. Delivering logic with brevity shows that you are a person of action, which authority figures tend to respect and like.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Signal professional respect',
          body:
            'End the meeting by acknowledging the other person’s expertise or leadership. A small, genuine gesture of respect prevents your “Gut” power from feeling like a challenge to their authority, maintaining a positive relational balance.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Control → Precision → Courtesy',
      whyThisOrder:
        'Maintains Precise Control: You want to fight or fix. Maintaining physical self-control (Gut) first allows you to deliver precise logic (Head) with professional courtesy.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Maintain physical control',
          body:
            'Keep your heart rate low and your eyes steady. If the authority figure tries to intimidate you, stay physically unbothered. This self-control is magnetic and creates an aura of “unshakable professional,” which is highly likable.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Deliver precise logic',
          body:
            'Use your mind to answer questions with precision. Avoid filler words. When you speak with accuracy, you make it easy for the authority figure to trust your judgment, which is the fastest path to likability in a high-stakes environment.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Employ professional courtesy',
          body:
            'Use “please” and “thank you” intentionally. These small social lubricants prevent your precision from feeling like an attack. Courtesy bridges the gap between your “Gut” power and the “Heart” connection required for a long-term win.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Rules → Stability → Softness',
      whyThisOrder:
        'Shields through Structure: Authority makes you nervous or reactive. Using the rules of the game (Head) provides a shield so you can stand firm and then reconnect.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Follow the “Rules of the Game”',
          body:
            'Acknowledge the formal process or the standard way things are done. Using the “Head” to respect the established hierarchy makes the authority figure feel safe, which lowers their defenses and makes you appear more cooperative.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Stand in your stability',
          body:
            'Once the rules are acknowledged, don’t shrink. Maintain your physical height and steady breathing. Your stability proves that you are a reliable person who can handle the pressure of high-level responsibilities.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Add a touch of softness',
          body:
            'Smile or share a brief, lighthearted comment. After a serious negotiation, softening the energy shows that you are comfortable with the tension and that you don’t hold a grudge, making you an ideal person to work with.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Synthesis → Calibration → Delivery',
      whyThisOrder:
        'Matches the Room: You mirror the authority’s energy. Aligning your strategy and your feel for the room allows you to deliver your needs with zero hesitation.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Synthesize the landscape',
          body:
            'Briefly summarize where things stand. By providing the big picture view, you show that you understand the authority figure’s world just as well as they do. This builds immediate credibility.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Calibrate the energy',
          body:
            'Read the room. If they are stressed, be the calm center. If they are excited, mirror that energy. This calibration makes you feel like a perfect fit for whatever the authority figure needs in that moment.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Deliver with zero hesitation',
          body:
            'State your needs as a foregone conclusion. Because you have aligned the logic and the feeling, your physical delivery should be seamless. You are simply asking for what makes sense for everyone, making it easy for them to say yes.',
        },
      ],
    },
  },
}

/** Under Pressure · Speaking to authority — two figures, abstract power height. */
export function SpeakingToAuthorityCardArt () {
  const bg = CONTEXT_BACKGROUND[1]
  const w = 52
  const gap = 28
  const leftX = (320 - (w * 2 + gap)) / 2
  const shortH = 60
  const tallH = 124
  const baseY = 156
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={bg} />
      <rect
        x={leftX}
        y={baseY - shortH}
        width={w}
        height={shortH}
        rx="8"
        ry="8"
        fill="rgba(255, 255, 255, 0.1)"
        stroke="#ffffff"
        strokeOpacity="0.78"
        strokeWidth="2.25"
      />
      <rect
        x={leftX + w + gap}
        y={baseY - tallH}
        width={w}
        height={tallH}
        rx="8"
        ry="8"
        fill="rgba(255, 255, 255, 0.1)"
        stroke="#ffffff"
        strokeOpacity="0.78"
        strokeWidth="2.25"
      />
    </svg>
  )
}

export function SpeakingToAuthorityStepArt ({
  contextId,
  variantId,
  stepIndex,
  brain,
}: FlowStepArtProps) {
  if (variantId === 'head-strong') {
    if (stepIndex === 0 && brain === 'Head') return <SvgThinkerUnderPressureAuthorityHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgThinkerUnderPressureAuthorityHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgThinkerUnderPressureAuthorityGutStep3 />
  }

  if (variantId === 'head-gut') {
    if (stepIndex === 0 && brain === 'Head') return <SvgTacticianSpeakingAuthorityHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgTacticianSpeakingAuthorityGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgTacticianSpeakingAuthorityHeartStep3 />
  }

  if (variantId === 'head-heart') {
    if (stepIndex === 0 && brain === 'Head') return <SvgDiplomatSpeakingAuthorityHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgDiplomatSpeakingAuthorityHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgDiplomatSpeakingAuthorityGutStep3 />
  }

  if (variantId === 'heart-strong') {
    if (stepIndex === 0 && brain === 'Head') return <SvgEmpathSpeakingAuthorityHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgEmpathSpeakingAuthorityHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgEmpathSpeakingAuthorityGutStep3 />
  }

  if (variantId === 'heart-gut') {
    if (stepIndex === 0 && brain === 'Head') return <SvgDefenderSpeakingAuthorityHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgDefenderSpeakingAuthorityGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgDefenderSpeakingAuthorityHeartStep3 />
  }

  if (variantId === 'heart-head') {
    if (stepIndex === 0 && brain === 'Head') return <SvgAdvisorSpeakingAuthorityHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgAdvisorSpeakingAuthorityHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgAdvisorSpeakingAuthorityGutStep3 />
  }

  if (variantId === 'gut-strong') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgDoerSpeakingAuthorityGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgDoerSpeakingAuthorityHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgDoerSpeakingAuthorityHeartStep3 />
  }

  if (variantId === 'gut-head') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgEngineerSpeakingAuthorityGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgEngineerSpeakingAuthorityHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgEngineerSpeakingAuthorityHeartStep3 />
  }

  if (variantId === 'gut-heart') {
    if (stepIndex === 0 && brain === 'Head') return <SvgHeroSpeakingAuthorityHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgHeroSpeakingAuthorityGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgHeroSpeakingAuthorityHeartStep3 />
  }

  if (variantId === 'balanced') {
    if (stepIndex === 0 && brain === 'Head') return <SvgSovereignSpeakingAuthorityHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgSovereignSpeakingAuthorityHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgSovereignSpeakingAuthorityGutStep3 />
  }

  return <ContextCardArt id={contextId} />
}

/** Muted pastel fills — darker so white SVG strokes read clearly (higher contrast). */
const AUDIT_STEP_BG = '#2563C8'
const WARMTH_STEP_BG = '#C2385A'
const STANCE_STEP_BG = '#1A9E6E'

/** Thinker · Under Pressure · Speaking to authority — step 1 (Head): audit / proof / logic. */
function SvgThinkerUnderPressureAuthorityHeadStep1 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      {/* Document / proof sheet */}
      <rect
        x="72"
        y="44"
        width="176"
        height="112"
        rx="12"
        fill="rgba(255, 255, 255, 0.12)"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
      <path
        d="M112 76 h116"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M112 98 h96"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M112 120 h108"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.32"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Checklist ticks */}
      <path
        d="M88 74 l6 6 12-14"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88 96 l6 6 12-14"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88 118 l6 6 12-14"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SvgThinkerUnderPressureAuthorityHeartStep2 () {
  const wave =
    'M 108 0 Q 134 -18 160 0 Q 186 18 212 0'
  const lines = [
    { y: 78, opacity: 0.45 },
    { y: 100, opacity: 0.58 },
    { y: 122, opacity: 0.42 },
  ] as const
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <g fill="none" stroke="#ffffff" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
        {lines.map(({ y, opacity }) => (
          <path
            key={y}
            d={wave}
            transform={`translate(0 ${y})`}
            strokeOpacity={opacity}
          />
        ))}
      </g>
    </svg>
  )
}

function SvgThinkerUnderPressureAuthorityGutStep3 () {
  const groundY = 156
  const cubeSize = 104
  const cubeLeft = 160 - cubeSize / 2
  const cubeTop = groundY - cubeSize
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M 36 ${groundY} L 284 ${groundY}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <rect
        x={cubeLeft}
        y={cubeTop}
        width={cubeSize}
        height={cubeSize}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="2.5"
      />
    </svg>
  )
}

/* --- Tactician (Head + Gut) · Speaking to authority — same fills as Thinker per brain --- */

/** Step 1 Head: clear objective / target. */
function SvgTacticianSpeakingAuthorityHeadStep1 () {
  const cx = 160
  const cy = 100
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <circle
        cx={cx}
        cy={cy}
        r="52"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <circle
        cx={cx}
        cy={cy}
        r="34"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      <circle
        cx={cx}
        cy={cy}
        r="14"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2.25"
      />
      <circle cx={cx} cy={cy} r="4" fill="#ffffff" fillOpacity="0.95" />
    </svg>
  )
}

/** Step 2 Gut: horizontal ground + single vertical at center. */
function SvgTacticianSpeakingAuthorityGutStep2 () {
  const groundY = 154
  const topY = 58
  const cx = 160
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M 40 ${groundY} L 280 ${groundY}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx} ${groundY} L ${cx} ${topY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Step 3 Heart: simple bridge / rapport arc. */
function SvgTacticianSpeakingAuthorityHeartStep3 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path
        d="M 88 150 L 88 128 Q 160 72 232 128 L 232 150"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 88 150 L 232 150"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Diplomat · Speaking to authority — step 1 (Head): clear value proposition. */
function SvgDiplomatSpeakingAuthorityHeadStep1 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      {/* One strong line (the pitch) + two lighter lines (concise framing), vertically centered */}
      <path
        d="M 72 100 h176"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <path
        d="M 96 72 h128"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.42"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 96 128 h128"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.42"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Step 2 (Heart): smooth curved arch + X (group rotated 180°). */
function SvgDiplomatSpeakingAuthorityHeartStep2 () {
  const groundY = 130
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <g transform="translate(0, 14)">
        <g transform="rotate(180 160 100)">
          <path
            d={`M 88 ${groundY} Q 160 52 232 ${groundY}`}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.88"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          <path
            d="M 142 136 L 178 150 M 178 136 L 142 150"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.42"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  )
}

/** Step 3 (Gut): square (the ask) on a centered stem above a horizontal ground. */
function SvgDiplomatSpeakingAuthorityGutStep3 () {
  const cx = 160
  const groundY = 148
  const stemBottom = groundY
  const stemTop = 96
  const box = 44
  const boxTop = stemTop - box
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M 56 ${groundY} L 264 ${groundY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.42"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx} ${stemBottom} L ${cx} ${stemTop}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect
        x={cx - box / 2}
        y={boxTop}
        width={box}
        height={box}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="2.75"
      />
    </svg>
  )
}

/* --- Empath (Heart strong) · Speaking to authority — Head → Heart → Gut --- */

/** Step 1 (Head): logic shield + one cold fact line. */
function SvgEmpathSpeakingAuthorityHeadStep1 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d="M 160 46 C 214 46 252 84 252 118 C 252 148 160 168 160 168 C 160 168 68 148 68 118 C 68 84 106 46 160 46 Z"
        fill="rgba(255, 255, 255, 0.1)"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path
        d="M 108 100 h104"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="3.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Step 2 (Heart): six-petal flower (radial symmetry). */
function SvgEmpathSpeakingAuthorityHeartStep2 () {
  const petal =
    'M 0 0 C 24 -10 30 -38 0 -50 C -30 -38 -24 -10 0 0 Z'
  const angles = [0, 60, 120, 180, 240, 300] as const
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <g transform="translate(160 100)">
        {angles.map((deg) => (
          <path
            key={deg}
            transform={`rotate(${deg})`}
            d={petal}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.9"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </g>
    </svg>
  )
}

/** Step 3 (Gut): physical weight — wide mass on a heavy ground line. */
function SvgEmpathSpeakingAuthorityGutStep3 () {
  const groundY = 154
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M 40 ${groundY} L 280 ${groundY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <rect
        x="64"
        y="86"
        width="192"
        height="64"
        rx="14"
        ry="14"
        fill="rgba(255, 255, 255, 0.08)"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.5"
      />
    </svg>
  )
}

/* --- Defender (Heart + Gut) · Speaking to authority — Head → Gut → Heart --- */

/** Step 1 (Head): script on rails — parallel tracks + ties. */
function SvgDefenderSpeakingAuthorityHeadStep1 () {
  const yTop = 92
  const yBot = 112
  const ties = [104, 140, 176, 216] as const
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d={`M 56 ${yTop} L 264 ${yTop}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.92"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d={`M 56 ${yBot} L 264 ${yBot}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.92"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {ties.map((x) => (
        <path
          key={x}
          d={`M ${x} ${yTop} L ${x} ${yBot}`}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.78"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

/** Step 2 (Gut): neutral stance — wide shoulders, calm torso, open hands. */
function SvgDefenderSpeakingAuthorityGutStep2 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <g transform="rotate(180 160 100)">
        <path
          d="M 86 78 L 234 78"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.9"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
        <path
          d="M 124 96 Q 160 138 196 96"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.72"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

/** Step 3 (Heart): connect the dots — curve through three nodes. */
function SvgDefenderSpeakingAuthorityHeartStep3 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <g transform="rotate(180 160 100)">
        <path
          d="M 98 102 Q 160 54 222 102"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.45"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
        <circle cx="98" cy="102" r="7" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.25" />
        <circle cx="160" cy="78" r="7" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.25" />
        <circle cx="222" cy="102" r="7" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.25" />
      </g>
    </svg>
  )
}

/* --- Advisor (Heart + Head) · Speaking to authority — Head → Heart → Gut --- */

/** Step 1 (Head): widening scope — broader business context. */
function SvgAdvisorSpeakingAuthorityHeadStep1 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d="M 132 76 h56"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.38"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 104 100 h112"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.62"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M 68 124 h184"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.92"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Step 2 (Heart): overlapping circles — aligned interests / shared vision. */
function SvgAdvisorSpeakingAuthorityHeartStep2 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <circle
        cx="128"
        cy="100"
        r="46"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.5"
      />
      <circle
        cx="192"
        cy="100"
        r="46"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.5"
      />
    </svg>
  )
}

/** Step 3 (Gut): timeline with pinned commitment / follow-up. */
function SvgAdvisorSpeakingAuthorityGutStep3 () {
  const pinX = 160
  const groundY = 148
  const ringR = 12
  const ringCy = 48
  const stemTop = ringCy + ringR
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M 52 ${groundY} L 268 ${groundY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.48"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d={`M ${pinX} ${groundY} L ${pinX} ${stemTop}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.72"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx={pinX}
        cy={ringCy}
        r={ringR}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="2.75"
      />
    </svg>
  )
}

/* --- Doer (Gut strong) · Speaking to authority — Gut → Head → Heart --- */

/** Step 1 (Gut): calm presence — still frame in the room + center breath. */
function SvgDoerSpeakingAuthorityGutStep1 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d="M 48 156 L 272 156"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        x="108"
        y="48"
        width="104"
        height="104"
        rx="18"
        ry="18"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.72"
        strokeWidth="2.5"
      />
      <circle cx="160" cy="100" r="5" fill="#ffffff" fillOpacity="0.9" />
    </svg>
  )
}

/** Step 2 (Head): three tight lines — three strong points, brief evidence. */
function SvgDoerSpeakingAuthorityHeadStep2 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d="M 88 78 h144"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 88 100 h144"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 88 122 h144"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Step 3 (Heart): respectful lift — arc honoring the other party. */
function SvgDoerSpeakingAuthorityHeartStep3 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <g transform="rotate(180 160 100)">
        <path
          d="M 96 118 Q 160 62 224 118"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.78"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
        <circle cx="96" cy="118" r="6" fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="2" />
        <circle cx="224" cy="118" r="6" fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="2" />
      </g>
    </svg>
  )
}

/* --- Engineer (Gut + Head) · Speaking to authority — Gut → Head → Heart --- */

/** Step 1 (Gut): steady center — composed crosshair in a calm ring. */
function SvgEngineerSpeakingAuthorityGutStep1 () {
  const cx = 160
  const cy = 100
  const r = 50
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="2"
      />
      <path
        d={`M ${cx} ${cy - r} L ${cx} ${cy + r}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - r} ${cy} L ${cx + r} ${cy}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="4" fill="#ffffff" fillOpacity="0.92" />
    </svg>
  )
}

/** Step 2 (Head): spine + ruler ticks — precise, minimal answers. */
function SvgEngineerSpeakingAuthorityHeadStep2 () {
  const cx = 160
  const tickYs = [74, 88, 102, 116, 130] as const
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d={`M ${cx} 58 L ${cx} 142`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {tickYs.map((y) => (
        <path
          key={y}
          d={`M ${cx - 22} ${y} h44`}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.42"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

/** Step 3 (Heart): courtesy bridge — soft arch between two grounded sides. */
function SvgEngineerSpeakingAuthorityHeartStep3 () {
  const groundY = 150
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path
        d={`M 72 ${groundY} L 248 ${groundY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.32"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M 108 ${groundY} L 108 122 Q 160 72 212 122 L 212 ${groundY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.82"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* --- Hero (Gut + Heart) · Speaking to authority — Head → Gut → Heart --- */

/** Step 1 (Head): formal frame + rule lines — hierarchy / process. */
function SvgHeroSpeakingAuthorityHeadStep1 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <rect
        x="76"
        y="46"
        width="168"
        height="108"
        rx="14"
        ry="14"
        fill="rgba(255, 255, 255, 0.08)"
        stroke="#ffffff"
        strokeOpacity="0.58"
        strokeWidth="2.25"
      />
      <path
        d="M 100 78 h120"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.42"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 100 98 h120"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.42"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 100 118 h120"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.42"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Step 2 (Gut): grounded upright column — stable height, no shrinking. */
function SvgHeroSpeakingAuthorityGutStep2 () {
  const groundY = 154
  const cx = 160
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d="M 132 44 L 188 44 L 160 56 Z"
        fill="rgba(255, 255, 255, 0.1)"
        stroke="#ffffff"
        strokeOpacity="0.72"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path
        d={`M 44 ${groundY} L 276 ${groundY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx} ${groundY} L ${cx} 56`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.82"
        strokeWidth="3.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Step 3 (Heart): light smile arc — soften the energy after the tension. */
function SvgHeroSpeakingAuthorityHeartStep3 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <g transform="rotate(180 160 100)">
        <path
          d="M 108 112 Q 160 76 212 112"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.82"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}

/* --- Sovereign (balanced) · Speaking to authority — Head → Heart → Gut --- */

/** Step 1 (Head): nested horizons — synthesized big-picture view. */
function SvgSovereignSpeakingAuthorityHeadStep1 () {
  const baseY = 138
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d={`M 56 ${baseY} Q 160 54 264 ${baseY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.28"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M 76 ${baseY} Q 160 72 244 ${baseY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.42"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d={`M 96 ${baseY} Q 160 92 224 ${baseY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.68"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Step 2 (Heart): calibration dial — read the room, set the energy. */
function SvgSovereignSpeakingAuthorityHeartStep2 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path
        d="M 72 100 h176"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.38"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle
        cx="160"
        cy="100"
        r="16"
        fill="rgba(255, 255, 255, 0.12)"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.5"
      />
    </svg>
  )
}

/** Step 3 (Gut): forward arrow — clear delivery, zero hesitation. */
function SvgSovereignSpeakingAuthorityGutStep3 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d="M 72 100 L 188 100"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <path
        d="M 188 82 L 232 100 L 188 118"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="3.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
