import type { ReactNode } from 'react'
import { ContextCardArt, CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import type { FlowSituation, FlowStepArtProps } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const MANAGE_YOUR_SOCIAL_ENERGY_SITUATION_ID = 'manage-your-social-energy' as const

export const manageYourSocialEnergyFlowSituation: FlowSituation = {
  id: MANAGE_YOUR_SOCIAL_ENERGY_SITUATION_ID,
  cardTitle: 'Manage Your Social Energy',
  cardDescription: 'How to stay present without burning out.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Assessment → Connection → Presence',
      whyThisOrder:
        'Validates the Environment: You analyze the room first. By checking the logic and safety (Head) and finding a "Why" (Heart), you can commit to being physically present without overthinking.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Analyze the logic of the room',
          body:
            'Take 30 seconds to observe the layout and the vibe. Understanding the "rules" of the space lowers your cortisol and allows your brain to stop scanning for threats.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Define your "Why"',
          body:
            'Find a reason to care about being there. Whether it is supporting a friend or learning one new thing, giving the event a purpose shifts you from a critic to a participant.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Drop into the physical space',
          body:
            'Once the logic and purpose are settled, take a deep breath and uncross your arms. Trust that your preparation is enough and let your physical presence take over.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Strategy → Boundary → Empathy',
      whyThisOrder:
        'Establishes the Container: You need a plan. Setting a time limit (Head) and a hard exit (Gut) allows you to relax enough to actually be empathetic to others.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Set a clear time container',
          body:
            'Decide exactly how long you will stay. Having a defined "end point" in your mind prevents the feeling of being trapped and keeps your strategic mind at ease.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Identify your exit strategy',
          body:
            'Locate the door and know your "hard out." Once your physical safety and autonomy are secured by your Gut, the pressure to perform vanishes.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Offer genuine empathy',
          body:
            'Now that you know you can leave whenever you want, you have the surplus energy to actually listen. Use this freedom to be fully available to the person in front of you.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Intention → Relatability → Engagement',
      whyThisOrder:
        'Prioritizes Depth over Surface: You thrive on deep talks. Clarifying your intent helps you avoid small talk and jump into real connection and active participation.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Clarify your intention before you walk in',
          body:
            'Ask yourself: what do I actually want from this? Not what you should want. What you genuinely need. One sentence is enough.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Find one real point of connection',
          body:
            'You do not need to connect with everyone. Find one person whose energy feels real and anchor yourself there. Let the rest come naturally.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Commit to being physically present',
          body:
            'Stop thinking about the exit. Put your phone away. Let your body signal "I am here." The conversation will follow.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Affinity → Logic → Boundary',
      whyThisOrder:
        'Protects Personal Energy: You feel everyone\'s energy. Leading with Heart builds warmth, but you must use the Head to remind yourself that you are not responsible for everyone\'s "vibe."',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Lead with warmth',
          body:
            'Start with a genuine compliment or a kind observation. Opening with your natural warmth sets a positive tone for the interaction before you even say a word.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Apply logical detachment',
          body:
            'Remind yourself that you are not a sponge. Use your Head to realize that someone else\'s bad mood or awkward energy is their responsibility, not yours to "fix."',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Set an energetic boundary',
          body:
            'Check in with your body. If you feel drained, take a step back or grab a drink. Use your physical position to protect your internal peace.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Vulnerability → Action → Perspective',
      whyThisOrder:
        'Mobilizes the Emotion: You lead with feeling. Moving into the "doing" (Gut) helps you channel that energy, while the Head keeps you from getting too swept up in the moment.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Acknowledge the feeling',
          body:
            'Identify the dominant emotion you are bringing into the space. Naming it allows you to lead with authenticity rather than performing a role.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Channel the energy into action',
          body:
            'Do not just stand there with your feelings. Move. Help with the food, start a game, or walk over to someone. Physical movement prevents emotional stagnation.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Gain external perspective',
          body:
            'Zoom out. Use your mind to look at the "big picture" of the event. This prevents you from getting lost in a single emotional moment or interaction.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Authenticity → Structure → Delivery',
      whyThisOrder:
        'Synthesizes Thought and Feeling: You connect through shared experience. Organizing your thoughts (Head) helps you express your heart clearly without getting overwhelmed.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Check for authenticity',
          body:
            'Before speaking, ensure your words match your internal state. If you are tired, do not pretend to be high energy. People connect with the truth, not the mask.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Structure your expression',
          body:
            'Take the big "feeling" you have and give it a beginning, middle, and end. Organizing your thoughts makes your deep insights more accessible to others.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Deliver with confidence',
          body:
            'Speak from your center. Once your heart and head are aligned, trust your body to carry the message. Stand tall and let your voice be heard.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Grounding → Observation → Warmth',
      whyThisOrder:
        'Grounds the Observation: You feel the physical weight of a room. Grounding yourself first (Gut) allows you to observe the facts so you can choose to be warm on your own terms.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Ground your feet',
          body:
            'Feel the floor beneath you. By rooting yourself physically, you stop the Gut\'s instinct to react or "charge" into the room, creating a sense of internal stability.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Observe the facts',
          body:
            'Move from "feeling" the room to "seeing" the room. Count the people, look at the colors, and note the facts. This moves you from reactive instinct to calm observation.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Choose to be warm',
          body:
            'Now that you are grounded and clear, move into Heart. Offer a smile or a handshake on your own terms, rather than as a knee-jerk social reaction.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Position → Clarity → Softness',
      whyThisOrder:
        'Secures the Perimeter: You show up to "do" a role. Establishing your physical space and clear goals allows you to eventually "lower the guard" for emotional connection.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Claim your space',
          body:
            'Find a physical spot where you feel secure. Whether it is a corner or a seat at the table, establishing your "perimeter" allows your nervous system to settle.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Clarify your role',
          body:
            'Define what you are there to "do." Having a specific task or objective gives your Head a track to run on, which prevents social anxiety from creeping in.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Lower the guard',
          body:
            'Once your space and role are secure, allow yourself a moment of vulnerability. Ask a personal question or share a small story to bridge the gap to others.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Pacing → Regulation → Strategy',
      whyThisOrder:
        'Regulates the Tempo: You react fast. Pacing your physical energy (Gut) and checking your emotions (Heart) prevents you from crashing mid-event.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Pace your breathing',
          body:
            'Slow down. Your instinct is to move at 100mph. By forcing your body to slow down, you prevent the "Gut burnout" that happens 20 minutes into an event.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Monitor your emotional "temp"',
          body:
            'Check in: are you excited or just overstimulated? Distinguishing between the two helps you stay regulated and prevents you from overwhelming others.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Apply a social strategy',
          body:
            'Use your mind to decide who to talk to next. Instead of just reacting to whoever is closest, use a bit of logic to guide your high energy toward meaningful targets.',
        },
      ],
    },
    balanced: {
      archetype: 'Hybrid',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Synthesis → Harmony → Participation',
      whyThisOrder:
        'Integrates the Perspective: You see all the dynamics. Aligning your thoughts and feelings allows you to move into the social space with total, unhesitating presence.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Read the room',
          body:
            'Pick up three quick cues: who is leading the interaction, the overall energy level, and how people are taking turns speaking. Focus only on these signals to get a clear read of the situation.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Match the energy',
          body:
            'Adjust one or two things to align with the group such as your volume, pace, or expression. Mirror the general tone so you feel in sync without forcing it.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Step in and engage',
          body:
            'Enter with a simple action within a few seconds. Add a short comment, respond to what was just said, or physically move closer into the circle. Keep it direct so you shift from observing to participating.',
        },
      ],
    },
  },
}

/** With People · Manage your social energy — battery at a steady charge. */
export function ManageYourSocialEnergyCardArt () {
  const bg = CONTEXT_BACKGROUND[3]
  const cx = 160
  const cy = 100
  const w = 124
  const h = 52
  const nubW = 10
  const nubH = 20
  const fillW = 76
  const pad = 5
  const stroke = { stroke: '#ffffff', strokeOpacity: 0.88, strokeWidth: 3 } as const
  const x = cx - (w + nubW) / 2
  const y = cy - h / 2
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={bg} />
      <rect x={x} y={y} width={w} height={h} rx="10" fill="rgba(255,255,255,0.1)" {...stroke} />
      <rect x={x + pad} y={y + pad} width={fillW} height={h - pad * 2} rx="6" fill="rgba(255,255,255,0.28)" stroke="none" />
      <rect x={x + w} y={y + (h - nubH) / 2} width={nubW} height={nubH} rx="4" fill="rgba(255,255,255,0.12)" {...stroke} />
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

export function ManageYourSocialEnergyStepArt ({ contextId, variantId, stepIndex, brain }: FlowStepArtProps) {
  if (variantId === 'head-strong') {
    if (stepIndex === 0 && brain === 'Head') return <SvgSocialThinkerHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgSocialThinkerHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgSocialThinkerGutStep3 />
  }
  if (variantId === 'head-gut') {
    if (stepIndex === 0 && brain === 'Head') return <SvgSocialTacticianHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgSocialTacticianGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgSocialTacticianHeartStep3 />
  }
  if (variantId === 'head-heart') {
    if (stepIndex === 0 && brain === 'Head') return <SvgSocialDiplomatHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgSocialDiplomatHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgSocialDiplomatGutStep3 />
  }
  if (variantId === 'heart-strong') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgSocialEmpathHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgSocialEmpathHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgSocialEmpathGutStep3 />
  }
  if (variantId === 'heart-gut') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgSocialDefenderHeartStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgSocialDefenderGutStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgSocialDefenderHeadStep3 />
  }
  if (variantId === 'heart-head') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgSocialAdvisorHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgSocialAdvisorHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgSocialAdvisorGutStep3 />
  }
  if (variantId === 'gut-strong') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgSocialDoerGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgSocialDoerHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgSocialDoerHeartStep3 />
  }
  if (variantId === 'gut-head') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgSocialEngineerGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgSocialEngineerHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgSocialEngineerHeartStep3 />
  }
  if (variantId === 'gut-heart') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgSocialHeroGutStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgSocialHeroHeartStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgSocialHeroHeadStep3 />
  }
  if (variantId === 'balanced') {
    if (stepIndex === 0 && brain === 'Head') return <SvgSocialSovereignHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgSocialSovereignHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgSocialSovereignGutStep3 />
  }
  return <ContextCardArt id={contextId} />
}

function SvgSocialThinkerHeadStep1 () {
  const cx = 160; const cy = 100; const g = 28
  const x0 = cx - 1.5 * g; const y0 = cy - 1.5 * g
  return stepSvg(AUDIT_STEP_BG, <>
    {[0, 1, 2].flatMap((row) =>
      [0, 1, 2].map((col) => (
        <rect key={`${row}-${col}`} x={x0 + col * g} y={y0 + row * g} width={g - 6} height={g - 6} rx="4" fill="none" stroke="#ffffff" strokeOpacity={row === 1 && col === 1 ? 0.9 : 0.35} strokeWidth="2.25" />
      ))
    )}
  </>)
}
function SvgSocialThinkerHeartStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    {[44, 30, 16].map((r) => <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity={0.28 + (44 - r) * 0.02} strokeWidth="2.25" />)}
    <circle cx={cx} cy={cy} r="6" fill="#ffffff" fillOpacity="0.5" />
  </>)
}
function SvgSocialThinkerGutStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M ${cx} ${cy - 28} L ${cx} ${cy + 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx - 28} ${cy - 4} L ${cx} ${cy + 8} L ${cx + 28} ${cy - 4}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgSocialTacticianHeadStep1 () {
  const cx = 160; const cy = 100; const r = 36
  return stepSvg(AUDIT_STEP_BG, <>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" />
    <path d={`M ${cx} ${cy} L ${cx} ${cy - 22}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx} ${cy} L ${cx + 18} ${cy + 10}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx={cx} cy={cy} r="4" fill="#ffffff" fillOpacity="0.5" />
  </>)
}
function SvgSocialTacticianGutStep2 () {
  const cx = 160; const cy = 100
  const frameW = 72; const frameH = 96
  const frameX = cx - frameW / 2; const frameY = cy - frameH / 2
  return stepSvg(STANCE_STEP_BG, <>
    <rect x={frameX} y={frameY} width={frameW} height={frameH} rx="6" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${frameX + frameW - 14} ${cy} L ${frameX + frameW + 24} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${frameX + frameW + 12} ${cy - 10} L ${frameX + frameW + 24} ${cy} L ${frameX + frameW + 12} ${cy + 10}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
function SvgSocialTacticianHeartStep3 () {
  const cy = 108
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M 88 ${cy - 20} Q 160 ${cy + 8} 232 ${cy - 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M 96 ${cy} Q 160 ${cy + 16} 224 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}

function SvgSocialDiplomatHeadStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <path d={`M ${cx - 72} ${cy} h144`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3.25" strokeLinecap="round" />)
}
function SvgSocialDiplomatHeartStep2 () {
  const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx="128" cy={cy} r="14" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <circle cx="192" cy={cy} r="14" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" />
    <path d={`M 142 ${cy} L 178 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}
function SvgSocialDiplomatGutStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <circle cx={cx} cy={cy} r="28" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeDasharray="6 6" />
    <circle cx={cx} cy={cy} r="8" fill="#ffffff" fillOpacity="0.55" />
  </>)
}

function SvgSocialEmpathHeartStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
      const rad = (deg * Math.PI) / 180
      return <path key={deg} d={`M ${cx} ${cy} L ${cx + Math.cos(rad) * 36} ${cy + Math.sin(rad) * 36}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
    })}
    <circle cx={cx} cy={cy} r="10" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" />
  </>)
}
function SvgSocialEmpathHeadStep2 () {
  const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <circle cx="128" cy={cy} r="16" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" />
    <circle cx="196" cy={cy} r="12" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeDasharray="5 5" />
    <path d={`M 152 ${cy} L 176 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}
function SvgSocialEmpathGutStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <circle cx={cx} cy={cy} r="32" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeDasharray="8 7" />)
}

function SvgSocialDefenderHeartStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <path d={`M ${cx - 48} ${cy} Q ${cx - 16} ${cy - 36} ${cx} ${cy} T ${cx + 48} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />)
}
function SvgSocialDefenderGutStep2 () {
  const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 96 ${cy} L 200 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <path d={`M 200 ${cy - 14} L 228 ${cy} L 200 ${cy + 14}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
function SvgSocialDefenderHeadStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    {[52, 72, 92].map((r) => <rect key={r} x={cx - r} y={cy - r * 0.55} width={r * 2} height={r * 1.1} rx="6" fill="none" stroke="#ffffff" strokeOpacity={0.35 + (92 - r) * 0.015} strokeWidth="2.25" />)}
  </>)
}

function SvgSocialAdvisorHeartStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx={cx} cy={cy} r="18" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" />
    <circle cx={cx + 28} cy={cy - 16} r="18" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.25" strokeDasharray="5 6" />
  </>)
}
function SvgSocialAdvisorHeadStep2 () {
  const cx = 160; const cy = 100
  const barW = 112; const barH = 14; const gap = 10
  const stackH = 3 * barH + 2 * gap
  const topY = cy - stackH / 2
  const widths = [barW, barW * 0.78, barW * 0.56]
  return stepSvg(AUDIT_STEP_BG, <>
    {widths.map((w, i) => (
      <rect key={w} x={cx - w / 2} y={topY + i * (barH + gap)} width={w} height={barH} rx="5" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity={0.45 + i * 0.2} strokeWidth="2.25" />
    ))}
  </>)
}
function SvgSocialAdvisorGutStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M ${cx} ${cy + 24} L ${cx} ${cy - 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    {[cy + 8, cy - 4, cy - 16].map((y, i) => (
      <path key={y} d={`M ${cx - 20 + i * 4} ${y} Q ${cx} ${y - 8} ${cx + 20 - i * 4} ${y}`} fill="none" stroke="#ffffff" strokeOpacity={0.45 + i * 0.2} strokeWidth="2.25" strokeLinecap="round" />
    ))}
  </>)
}

function SvgSocialDoerGutStep1 () {
  const cy = 128
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 72 ${cy} L 248 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="136" y={cy - 20} width="20" height="20" rx="4" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.25" />
    <rect x="164" y={cy - 20} width="20" height="20" rx="4" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.25" />
  </>)
}
function SvgSocialDoerHeadStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <circle cx={cx} cy={cy} r="10" fill="#ffffff" fillOpacity="0.45" />
    {[0, 1, 2].flatMap((row) => [0, 1, 2].map((col) => (
      <circle key={`${row}-${col}`} cx={cx - 36 + col * 36} cy={cy - 28 + row * 28} r="4" fill="#ffffff" fillOpacity={row === 1 && col === 1 ? 0.7 : 0.3} />
    )))}
  </>)
}
function SvgSocialDoerHeartStep3 () {
  const cx = 160; const cy = 108
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 36} ${cy + 8} Q ${cx} ${cy - 16} ${cx + 36} ${cy + 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx={cx} cy={cy + 4} r="5" fill="#ffffff" fillOpacity="0.45" />
  </>)
}

function SvgSocialEngineerGutStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M ${cx - 40} ${cy + 32} L ${cx - 40} ${cy - 32} L ${cx + 40} ${cy - 32}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={cx - 40} cy={cy + 32} r="5" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgSocialEngineerHeadStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <rect x={cx - 48} y={cy - 20} width="96" height="40" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${cx - 28} ${cy} h56`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}
function SvgSocialEngineerHeartStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 32} ${cy - 24} L ${cx - 32} ${cy + 24}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M ${cx - 32} ${cy + 24} Q ${cx} ${cy + 8} ${cx + 32} ${cy + 24}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}

function SvgSocialHeroGutStep1 () {
  const cy = 100
  return stepSvg(STANCE_STEP_BG, <path d={`M 72 ${cy} Q 116 ${cy - 18} 160 ${cy} T 248 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />)
}
function SvgSocialHeroHeartStep2 () {
  const cx = 160; const top = 68; const bottom = 132
  return stepSvg(WARMTH_STEP_BG, <>
    <rect x={cx - 8} y={top} width="16" height={bottom - top} rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <rect x={cx - 8} y={92} width="16" height="28" rx="8" fill="rgba(255,255,255,0.18)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.25" />
  </>)
}
function SvgSocialHeroHeadStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M ${cx} ${cy - 8} L ${cx - 32} ${cy - 32} M ${cx} ${cy - 8} L ${cx + 36} ${cy - 24} M ${cx} ${cy - 8} L ${cx + 8} ${cy + 16}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={cx - 32} cy={cy - 32} r="5" fill="#ffffff" fillOpacity="0.45" />
    <circle cx={cx + 36} cy={cy - 24} r="5" fill="#ffffff" fillOpacity="0.45" />
    <circle cx={cx + 8} cy={cy + 16} r="5" fill="#ffffff" fillOpacity="0.45" />
  </>)
}

function SvgSocialSovereignHeadStep1 () {
  const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    {[88, 160, 232].map((x, i) => (
      <g key={x}>
        <path d={`M ${x} ${cy - 20} v40`} fill="none" stroke="#ffffff" strokeOpacity={0.45 + i * 0.2} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={x} cy={cy - 8 + i * 8} r="5" fill="#ffffff" fillOpacity={0.45 + i * 0.15} />
      </g>
    ))}
  </>)
}
function SvgSocialSovereignHeartStep2 () {
  const cy = 108
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M 72 ${cy + 6} Q 116 ${cy - 10} 160 ${cy + 6} T 248 ${cy + 6}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M 72 ${cy + 18} Q 116 ${cy + 2} 160 ${cy + 18} T 248 ${cy + 18}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}
function SvgSocialSovereignGutStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <circle cx={cx} cy={cy} r="32" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" />
    <path d={`M ${cx} ${cy - 32} L ${cx} ${cy - 52}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx - 8} ${cy - 44} L ${cx} ${cy - 52} L ${cx + 8} ${cy - 44}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
