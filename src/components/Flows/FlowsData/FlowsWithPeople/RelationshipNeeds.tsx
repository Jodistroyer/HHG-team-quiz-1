import type { ReactNode } from 'react'
import { ContextCardArt, CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import type { FlowSituation, FlowStepArtProps } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const RELATIONSHIP_NEEDS_SITUATION_ID = 'relationship-needs' as const

export const relationshipNeedsFlowSituation: FlowSituation = {
  id: RELATIONSHIP_NEEDS_SITUATION_ID,
  cardTitle: 'Relationship Needs',
  cardDescription: 'Express what you need in a way your partner can hear.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Logic → Vulnerability → Request',
      whyThisOrder:
        'Humanizes the Data: You know what is missing logically, but your partner needs to hear the feeling behind the fact before they can commit to a change.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Lead with the logical gap',
          body:
            'State the fact of the situation without blame. Identify what is missing in the routine or the dynamic. Starting with logic helps you feel grounded and clear before the conversation gets personal.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Reveal the personal impact',
          body:
            'Explain why this logical gap matters to you emotionally. Use "I feel" statements to show that this is not just a project to manage but a need for connection. This invites your partner to care rather than just comply.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Make a clear request',
          body:
            'End with a specific call to action. Instead of leaving the need open for interpretation, tell your partner exactly what "good" looks like. This gives your body and theirs a definitive direction to move in.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Strategy → Action → Intimacy',
      whyThisOrder:
        'Leads with Purpose: You lead with the "why" and a clear plan of action, then circle back to ensure the connection remains warm and prioritized.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Explain the strategy',
          body:
            'Briefly outline the big picture of why this change is good for the relationship. When you provide a "why" that serves the team, it prevents your partner from feeling like they are being criticized.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Propose the immediate shift',
          body:
            'Suggest one physical change that can happen right now. Taking immediate action satisfies your need for progress and proves that the conversation is actually leading somewhere tangible.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Affirm the bond',
          body:
            'Finish by emphasizing your commitment. Remind your partner that this request comes from a place of wanting to be closer to them. This ensures the "Gut" action does not feel cold or mechanical.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Observation → Feeling → Ask',
      whyThisOrder:
        'Translates Thought to Motion: You are great at identifying the need and feeling it, but you must bridge into a specific, tangible "ask" to get results.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Share your observation',
          body:
            'State what you have noticed lately. By starting with a calm observation, you bypass the "defensive" response and establish a shared reality with your partner.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Voice the underlying feeling',
          body:
            'Connect that observation to your heart. Tell them how the current situation affects your sense of security or joy. This provides the emotional weight needed to make the request significant.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'State the tangible ask',
          body:
            'Translate the feeling into a physical task. Give your partner a "win" by telling them exactly what they can do to meet the need. This moves the conversation out of the clouds and into reality.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Emotion → Context → Direction',
      whyThisOrder:
        'Provides a Map for the Heart: You know you are unhappy; adding the "Head" (context and facts) helps your partner understand how to actually help you.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Share the emotion first',
          body:
            'Open with your current emotional state. Being honest about your feelings right away prevents them from building up and coming out as frustration or passive aggression later in the talk.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Provide the "Map"',
          body:
            'Give your partner the context. Explain the sequence of events that led to the feeling. This helps their "Head" understand the "Heart" without getting lost in the intensity of the emotion.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Give a simple direction',
          body:
            'End with a straightforward "I need" statement. Keep it simple and direct so your partner does not have to guess how to soothe the emotion you just shared.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Feeling → Impact → Structure',
      whyThisOrder:
        'Channels Passion into Progress: You lead with the raw need, move into the desired change, and finish with a logical "how this works for us."',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Express the raw need',
          body:
            'Start with the core of the matter. Speak from your gut level feelings about what you need to feel loved or safe. Your passion is your strength here; use it to show that this matters.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Describe the impact of change',
          body:
            'Tell them how your behavior or the relationship energy will improve once this need is met. Focusing on the "impact" keeps the conversation moving forward toward a better future.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Suggest a logical structure',
          body:
            'Finish by outlining how this fits into your daily life. "Maybe we try this on Tuesdays" or "Let us check in after a week." Adding structure prevents the "Heart" from feeling overwhelmed by the "Gut" move.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Expression → Reasoning → Resolution',
      whyThisOrder:
        'Clears the Fog: Expressing the feeling first prevents the logic from becoming a defense mechanism. It allows the need to be heard clearly.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Lead with authenticity',
          body:
            'Tell your partner: "I want to share something that has been on my heart." Starting here ensures that you do not accidentally lead with a "Head" lecture that creates distance.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Explain your reasoning',
          body:
            'Share the "why" behind the need. Walk them through your thought process so they can see that your need is valid and well considered, not just a passing mood.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Ask for a resolution',
          body:
            'Request a firm "yes" or "no" or a counter proposal. Pushing for a resolution ensures that your feelings are not just heard, but are actually integrated into the relationship\'s future.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart → Gut',
      coreFunctions: 'Presence → Evidence → Connection → Outcome',
      whyThisOrder:
        'Softens the Command: You naturally want to just "fix it." Leading with calm presence and facts makes your need feel like a partnership, not an order.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Ground your presence',
          body:
            'Sit with your partner and stay physically present. Your silent, grounded energy is powerful. Use it to signal that this is an important, safe conversation, not a confrontation.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Present the evidence',
          body:
            'List the specific instances where the need was not met. Using clear "evidence" prevents the conversation from becoming an emotional "he said, she said" and keeps it focused on facts.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Bridge the connection',
          body:
            'Softly explain that you are bringing this up because you value the relationship. A small "Heart" gesture like taking their hand softens the weight of your "Gut" presence.',
        },
        {
          brain: 'Gut',
          label: 'Step 4',
          title: 'Define the outcome',
          body:
            'State exactly what you want to happen next. Your natural ability to lead is a gift here; use it to provide a clear path forward for both of you.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Clarity → Movement → Bonding',
      whyThisOrder:
        'Architects the Change: By starting with the "Head" (Clarity), you ensure your "Gut" (Movement) is pointed in a direction that actually serves the relationship.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Define the goal clearly',
          body:
            'Start by telling them exactly what you want to discuss. Providing a "headline" for the conversation allows your partner\'s brain to prepare so they do not feel blindsided.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Model the movement',
          body:
            'Show them what you are willing to do on your end. Leading with your own "Gut" action encourages them to follow suit and makes the request feel like a mutual evolution.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Celebrate the bond',
          body:
            'Finish by expressing gratitude for their willingness to listen. Ending on a "Heart" note ensures that your "Head" and "Gut" strategy leaves the relationship feeling closer, not just more efficient.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Regulate → Motivate → Organize',
      whyThisOrder:
        'Soothes Before Moving: Starting with the "Heart" ensures you are not making demands out of frustration, allowing for a structured, peaceful request.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Regulate the atmosphere',
          body:
            'Start with a check in on how you both are feeling. Ensuring the "Heart" is settled first prevents your "Gut" from making demands that sound like ultimatums.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Motivate the change',
          body:
            'Use your natural energy to inspire a better way of doing things. Talk about the "win" for both of you. Your enthusiasm can be the fuel that makes your partner want to meet your need.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Organize the request',
          body:
            'Finish by putting the request into a clear, understandable format. "So, the plan is X." This ensures that the high energy of the "Gut" does not lead to confusion about what was actually agreed upon.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Analysis → Affection → Action',
      whyThisOrder:
        'Finalizes the Intent: You see all angles; this sequence ensures you do not get lost in "considering" and actually deliver your request.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Acknowledge the situation',
          body:
            'Gently describe what has been happening in the relationship. Keep it fair and grounded, showing you understand both sides and are not blaming.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Express care and meaning',
          body:
            'Share how you feel and why the relationship matters to you. Connect your need to your care for them and the bond you are building together.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'State your need clearly',
          body:
            'Ask for one specific change or action that would help you feel better. Keep it simple and direct, so your partner knows exactly how to show up for you.',
        },
      ],
    },
  },
}

/** With People · Relationship needs — two partners linked. */
export function RelationshipNeedsCardArt () {
  const bg = CONTEXT_BACKGROUND[3]
  const cy = 100
  const r = 28
  const gap = 36
  const cx1 = 160 - gap - r
  const cx2 = 160 + gap + r
  const stroke = { stroke: '#ffffff', strokeOpacity: 0.88, strokeWidth: 2.75 } as const
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={bg} />
      <circle cx={cx1} cy={cy} r={r} fill="rgba(255,255,255,0.1)" {...stroke} />
      <circle cx={cx2} cy={cy} r={r} fill="rgba(255,255,255,0.1)" {...stroke} />
      <path d={`M ${cx1 + r} ${cy} L ${cx2 - r} ${cy}`} fill="none" {...stroke} strokeLinecap="round" />
      <circle cx="160" cy={cy} r="6" fill="#ffffff" fillOpacity="0.5" />
    </svg>
  )
}

const AUDIT_STEP_BG = '#2563C8'
const WARMTH_STEP_BG = '#C2385A'
const STANCE_STEP_BG = '#1A9E6E'

const stepSvg = (bg: string, children: ReactNode) => (
  <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
    <rect width="320" height="200" fill={bg} />
    {children}
  </svg>
)

export function RelationshipNeedsStepArt ({ contextId, variantId, stepIndex, brain }: FlowStepArtProps) {
  if (variantId === 'head-strong') {
    if (stepIndex === 0 && brain === 'Head') return <SvgNeedsThinkerHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgNeedsThinkerHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgNeedsThinkerGutStep3 />
  }
  if (variantId === 'head-gut') {
    if (stepIndex === 0 && brain === 'Head') return <SvgNeedsTacticianHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgNeedsTacticianGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgNeedsTacticianHeartStep3 />
  }
  if (variantId === 'head-heart') {
    if (stepIndex === 0 && brain === 'Head') return <SvgNeedsDiplomatHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgNeedsDiplomatHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgNeedsDiplomatGutStep3 />
  }
  if (variantId === 'heart-strong') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgNeedsEmpathHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgNeedsEmpathHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgNeedsEmpathGutStep3 />
  }
  if (variantId === 'heart-gut') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgNeedsDefenderHeartStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgNeedsDefenderGutStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgNeedsDefenderHeadStep3 />
  }
  if (variantId === 'heart-head') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgNeedsAdvisorHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgNeedsAdvisorHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgNeedsAdvisorGutStep3 />
  }
  if (variantId === 'gut-strong') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgNeedsDoerGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgNeedsDoerHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgNeedsDoerHeartStep3 />
    if (stepIndex === 3 && brain === 'Gut') return <SvgNeedsDoerGutStep4 />
  }
  if (variantId === 'gut-head') {
    if (stepIndex === 0 && brain === 'Head') return <SvgNeedsEngineerHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgNeedsEngineerGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgNeedsEngineerHeartStep3 />
  }
  if (variantId === 'gut-heart') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgNeedsHeroHeartStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgNeedsHeroGutStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgNeedsHeroHeadStep3 />
  }
  if (variantId === 'balanced') {
    if (stepIndex === 0 && brain === 'Head') return <SvgNeedsSovereignHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgNeedsSovereignHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgNeedsSovereignGutStep3 />
  }
  return <ContextCardArt id={contextId} />
}

function SvgNeedsThinkerHeadStep1 () {
  const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M 88 ${cy} h56`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <path d={`M 176 ${cy} h56`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 8" />
    <path d={`M 152 ${cy - 16} v32`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}
function SvgNeedsThinkerHeartStep2 () {
  const cx = 160; const cy = 108
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 28} ${cy} Q ${cx - 14} ${cy - 24} ${cx} ${cy - 10} Q ${cx + 14} ${cy + 16} ${cx + 28} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx={cx} cy={cy - 6} r="5" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgNeedsThinkerGutStep3 () {
  const cy = 100
  const r = 28
  const wing = 12
  const baseX = 188
  const cx = baseX + 8
  const tipX = cx + 16
  return stepSvg(STANCE_STEP_BG, <>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.25" />
    <path d={`M 88 ${cy} L ${baseX} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" />
    <path d={`M ${baseX} ${cy - wing} L ${tipX} ${cy} L ${baseX} ${cy + wing}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgNeedsTacticianHeadStep1 () {
  const y = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M 72 ${y} L 248 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M 208 ${y - 32} L 208 ${y + 32}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <circle cx="96" cy={y} r="5" fill="#ffffff" fillOpacity="0.4" />
    <circle cx="160" cy={y} r="5" fill="#ffffff" fillOpacity="0.55" />
    <circle cx="208" cy={y} r="5" fill="#ffffff" fillOpacity="0.7" />
  </>)
}
function SvgNeedsTacticianGutStep2 () {
  const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 96 ${cy} L 200 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <path d={`M 200 ${cy - 14} L 228 ${cy} L 200 ${cy + 14}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
function SvgNeedsTacticianHeartStep3 () {
  return stepSvg(WARMTH_STEP_BG, <path d="M 72 88 Q 160 148 248 88" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />)
}

function SvgNeedsDiplomatHeadStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <circle cx={cx} cy={cy} r="10" fill="#ffffff" fillOpacity="0.45" />
    <path d={`M ${cx + 14} ${cy - 6} L 232 ${cy - 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
  </>)
}
function SvgNeedsDiplomatHeartStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx} ${cy + 20} L ${cx} ${cy - 16}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M ${cx - 24} ${cy - 16} Q ${cx} ${cy - 36} ${cx + 24} ${cy - 16}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}
function SvgNeedsDiplomatGutStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <rect x={cx - 40} y={cy - 28} width="80" height="56" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${cx - 16} ${cy + 2} l8 8 18-22`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgNeedsEmpathHeartStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <path d={`M ${cx - 48} ${cy} Q ${cx - 16} ${cy - 36} ${cx} ${cy} T ${cx + 48} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />)
}
function SvgNeedsEmpathHeadStep2 () {
  const y = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <circle cx="96" cy={y} r="6" fill="#ffffff" fillOpacity="0.4" />
    <circle cx="160" cy={y} r="6" fill="#ffffff" fillOpacity="0.55" />
    <circle cx="224" cy={y} r="6" fill="#ffffff" fillOpacity="0.7" />
    <path d={`M 102 ${y} L 154 ${y} M 166 ${y} L 218 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}
function SvgNeedsEmpathGutStep3 () {
  const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 96 ${cy} L 200 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <path d={`M 112 ${cy - 20} v40 M 160 ${cy - 20} v40 M 208 ${cy - 20} v40`} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
  </>)
}

function SvgNeedsDefenderHeartStep1 () {
  const cx = 160; const cy = 104
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx} ${cy - 22} C ${cx + 28} ${cy - 6} ${cx + 24} ${cy + 22} ${cx} ${cy + 18} C ${cx - 24} ${cy + 22} ${cx - 28} ${cy - 6} ${cx} ${cy - 22} Z`} fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinejoin="round" />
  </>)
}
function SvgNeedsDefenderGutStep2 () {
  return stepSvg(STANCE_STEP_BG, <path d="M 160 132 C 120 72 200 72 248 92" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />)
}
function SvgNeedsDefenderHeadStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    {[76, 100, 124].map((rowY) => <path key={rowY} d={`M 96 ${rowY} h128`} fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" strokeLinecap="round" />)}
    <rect x={cx - 24} y={cy - 36} width="48" height="20" rx="5" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
  </>)
}

function SvgNeedsAdvisorHeartStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 36} ${cy + 16} Q ${cx} ${cy - 28} ${cx + 36} ${cy + 16}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx={cx} cy={cy + 8} r="5" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgNeedsAdvisorHeadStep2 () {
  const cx = 160; const cy = 100
  const ys = [cy - 24, cy, cy + 24]
  return stepSvg(AUDIT_STEP_BG, <>
    {ys.map((y, i) => <path key={y} d={`M ${cx - 48 + i * 8} ${y} h${96 - i * 16}`} fill="none" stroke="#ffffff" strokeOpacity={0.45 + i * 0.2} strokeWidth="2.5" strokeLinecap="round" />)}
  </>)
}
function SvgNeedsAdvisorGutStep3 () {
  const cx = 160; const y = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M ${cx - 48} ${y} L ${cx - 8} ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx + 48} ${y} L ${cx + 8} ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx - 8} ${y - 14} v28 M ${cx + 8} ${y - 14} v28`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}

function SvgNeedsDoerGutStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <circle cx={cx - 28} cy={cy} r="16" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <circle cx={cx + 28} cy={cy} r="16" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <circle cx={cx} cy={cy} r="6" fill="#ffffff" fillOpacity="0.5" />
  </>)
}
function SvgNeedsDoerHeadStep2 () {
  const cx = 160; const cy = 100
  const rowYs = [cy - 24, cy, cy + 24]
  const tickX = cx - 40
  const lineX = cx - 20
  return stepSvg(AUDIT_STEP_BG, <>
    {rowYs.map((y, i) => (
      <g key={y}>
        <path d={`M ${tickX} ${y - 2} l6 6 10-12`} fill="none" stroke="#ffffff" strokeOpacity={0.55 + i * 0.15} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M ${lineX} ${y} h80`} fill="none" stroke="#ffffff" strokeOpacity={0.45 + i * 0.15} strokeWidth="2.25" strokeLinecap="round" />
      </g>
    ))}
  </>)
}
function SvgNeedsDoerHeartStep3 () {
  const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx="128" cy={cy} r="14" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <circle cx="192" cy={cy} r="14" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M 142 ${cy} L 178 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}
function SvgNeedsDoerGutStep4 () {
  const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 88 ${cy} L 220 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <path d={`M 220 ${cy - 18} v36`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M 208 ${cy - 18} h24 M 208 ${cy + 18} h24`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
  </>)
}

function SvgNeedsEngineerHeadStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <rect x={cx - 56} y={cy - 16} width="112" height="32" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${cx - 32} ${cy} h64`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}
function SvgNeedsEngineerGutStep2 () {
  const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 128 ${cy} L 160 ${cy - 20} L 192 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M 128 ${cy} L 160 ${cy + 20} L 192 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
function SvgNeedsEngineerHeartStep3 () {
  const cx = 160
  const cy = 96
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 36} ${cy + 8} Q ${cx} ${cy - 16} ${cx + 36} ${cy + 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx - 12} ${cy + 16} l8 8 16-20`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgNeedsHeroHeartStep1 () {
  const cy = 96
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M 72 ${cy + 6} Q 116 ${cy - 10} 160 ${cy + 6} T 248 ${cy + 6}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M 72 ${cy + 18} Q 116 ${cy + 2} 160 ${cy + 18} T 248 ${cy + 18}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}
function SvgNeedsHeroGutStep2 () {
  const cy = 100
  const count = 3; const spacing = 24; const shaftLen = 28; const wing = 8
  const groupW = (count - 1) * spacing + shaftLen
  const xs = [0, 1, 2].map((i) => 160 - groupW / 2 + i * spacing)
  return stepSvg(STANCE_STEP_BG, <>
    {xs.map((x) => (
      <path key={x} d={`M ${x} ${cy} L ${x + shaftLen} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    ))}
    {xs.map((x) => (
      <path key={`a-${x}`} d={`M ${x + shaftLen - wing} ${cy - wing} L ${x + shaftLen} ${cy} L ${x + shaftLen - wing} ${cy + wing}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    ))}
  </>)
}
function SvgNeedsHeroHeadStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <rect x={cx - 48} y={cy - 28} width="96" height="56" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${cx - 28} ${cy - 8} h56 M ${cx - 28} ${cy + 8} h40`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
  </>)
}

function SvgNeedsSovereignHeadStep1 () {
  const cx = 160; const cy = 128
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M ${cx - 48} ${cy} h96`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M ${cx} ${cy - 48} v48`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx={cx - 48} cy={cy} r="5" fill="#ffffff" fillOpacity="0.4" />
    <circle cx={cx + 48} cy={cy} r="5" fill="#ffffff" fillOpacity="0.4" />
  </>)
}
function SvgNeedsSovereignHeartStep2 () {
  const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx="128" cy={cy} r="18" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" />
    <circle cx="192" cy={cy} r="18" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" />
    <path d={`M 146 ${cy} L 174 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}
function SvgNeedsSovereignGutStep3 () {
  const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 96 ${cy} L 200 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <path d={`M 112 ${cy - 24} v48 M 160 ${cy - 24} v48 M 208 ${cy - 24} v48`} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
  </>)
}
