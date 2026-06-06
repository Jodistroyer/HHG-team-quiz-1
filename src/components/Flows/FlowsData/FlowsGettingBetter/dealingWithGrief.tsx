import type { ReactNode } from 'react'
import { ContextCardArt, CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import type { FlowSituation, FlowStepArtProps } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const DEALING_WITH_GRIEF_SITUATION_ID = 'dealing-with-grief' as const

export const dealingWithGriefFlowSituation: FlowSituation = {
  id: DEALING_WITH_GRIEF_SITUATION_ID,
  cardTitle: 'Dealing with grief',
  cardDescription: 'Move through loss at your own pace with your core lens.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Permission → Meaning → Endurance',
      whyThisOrder:
        'Stops Intellectualizing: You try to "explain" the loss to avoid feeling it. Leading with Heart gives you permission to hurt so the Head can eventually find a way to live with the "why."',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Give yourself permission to hurt',
          body:
            'Stop the search for a logical explanation. Acknowledge the raw pain without trying to fix it or justify it. By leading with the heart, you lower the mental barrier that treats vulnerability as a problem to be solved.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Construct the "Why"',
          body:
            'Once you have sat with the feeling, use your mind to find a meaningful narrative. How does this loss change your perspective? Building a mental framework for the loss helps you integrate the experience into your life story.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Commit to endurance',
          body:
            'Focus on the long game. Use your gut to settle into the reality that healing takes time. This is not a project to complete, but a path to walk. Your physical presence in the "now" becomes your greatest strength.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Surrender → Maintenance → Legacy',
      whyThisOrder:
        'Prevents "Busy-ness": You want to work through the pain. You must lead with the feeling (Heart) and physical rest (Gut) before the Head is allowed to plan your "new normal."',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Surrender to the exhaustion',
          body:
            'Admit that you cannot work your way out of this. Let the grief hit you without reaching for a task. Surrendering to the feeling prevents you from using "doing" as a shield against the pain.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Prioritize maintenance',
          body:
            'Focus exclusively on basic physical needs. Sleep when you are tired and eat when you are hungry. By securing your physical foundation first, you prevent a total burnout during the most intense phases of grieving.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Define your legacy',
          body:
            'Think about how you want to honor what was lost in your daily life. Use your strategic mind to build a "new normal" that incorporates the lessons of the past into a sustainable future.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Stability → Expression → Context',
      whyThisOrder:
        'Grounds the Sorrow: You are lost in thought and feeling. Leading with the physical (Gut): eating, sleeping, walking, creates a safe container to feel the depth of the grief.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Create physical stability',
          body:
            'Focus on the weight of your body. Eat regular meals and maintain a simple physical routine. This creates a "safe container" that prevents your thoughts and feelings from floating away into an ungrounded spiral.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Express the sorrow',
          body:
            'Find a way to let the feelings out. Talk, cry, or create. Because your body is grounded, you can afford to go deep into the emotional expression without losing your sense of reality.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Apply context to the loss',
          body:
            'Zoom out. Look at the loss as a part of the larger cycle of life. Understanding the universal nature of grief helps your mind stop personalizing the pain as a unique failure or a permanent dead end.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Perspective → Validation → Pacing',
      whyThisOrder:
        'Provides a Railing: You are drowning in the emotion. The Head acts as a handrail, providing logic and "grief facts" to remind you that what you feel is a normal part of the human experience.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Acknowledge grief facts',
          body:
            'Read or learn about how grief works. Understanding that your brain is physically rewiring itself provides a "handrail" of logic to hold onto when the emotional waves feel like they are dragging you under.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Validate the specific pain',
          body:
            'Tell yourself that your feelings make sense. You are not "too sensitive"; you are responding to a real loss. Self-validation prevents the secondary pain of judging yourself for how you feel.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Pace your physical energy',
          body:
            'Do not try to go back to 100% capacity immediately. Use your gut to monitor your energy levels and take frequent breaks. Slowing down physically reminds your heart that there is no rush to "get over it."',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Structure → Routine → Release',
      whyThisOrder:
        'Contains the Surge: You feel the grief in waves and bursts of energy. A logical schedule (Head) and physical movement (Gut) provide a bank for the emotional river to flow through.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Create a logical schedule',
          body:
            'Set a simple daily structure for yourself. When the "when" and "where" of your day are decided by your head, it provides a stable bank for the unpredictable river of your emotions to flow through.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Move the energy',
          body:
            'Engage in physical movement to process the adrenaline of grief. Walk, stretch, or lift. Physical activity prevents the emotional surge from becoming stagnant in your body and turning into physical tension.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Allow the release',
          body:
            'When the waves of feeling come, let them happen. Because you have a schedule and a physical outlet, you can trust that you will not be "lost" in the emotion forever. You have a way back to the shore.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Grounding → Observation → Connection',
      whyThisOrder:
        'Stops the Spiral: You feel deeply and then analyze the pain. Physically grounding yourself (Gut), for example stand up, slow breath, calm smell, touch something solid, stops the mental loop, allowing you to eventually reconnect with the memory of the loss safely.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Engage the senses',
          body:
            'Touch something solid, smell something calming, or listen to a steady rhythm. Grounding your senses breaks the circuit of the mental spiral and brings you back into the safety of the present moment.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Observe the patterns',
          body:
            'Look at your thoughts as if you were an outsider. "I am having a thought about the past." This detachment allows you to observe the pain without becoming consumed by it, giving you space to breathe.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Reconnect with the memory',
          body:
            'Once you are calm and grounded, choose to remember the loss with love rather than fear. This controlled reconnection allows you to build a bridge back to the memory that feels safe and healing.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Softening → Audit → Integration',
      whyThisOrder:
        'Breaks the Stoicism: You want to "stay strong." Leading with Heart allows the shield to drop so you can logically assess your life and slowly begin to move again.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Soften the shield',
          body:
            'Deliberately choose to be "weak" for a moment. Admit to a trusted friend or yourself that you are hurting. Softening your heart allows the tension of "staying strong" to dissipate, which is the first step toward real healing.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Audit the life load',
          body:
            'Look at your responsibilities and cut what is non-essential. You cannot carry the world and your grief at the same time. Use your head to logically reduce the weight you are currently trying to lift.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Integrate the change',
          body:
            'Slowly begin to move again, but with a different posture. Allow the loss to change how you show up in the world. Integration means moving forward as a changed person, rather than trying to be your "old self."',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Empathy → Clarity → Sustainability',
      whyThisOrder:
        'Prevents Hardening: You might treat grief as a task to complete. Connecting with the loss (Heart) ensures you do not just "move on," but move forward with the person\'s memory.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Connect with the empathy',
          body:
            'Allow yourself to feel the person\'s absence as a relationship, not just a fact. This ensures you do not treat your own healing like a project or a task to be checked off a list.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Seek mental clarity',
          body:
            'Think about what the loss actually means for your daily life. What are the practical changes? Clarity about the "new reality" stops the gut from reacting to every small change as if it were a new crisis.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Develop a sustainable pace',
          body:
            'Commit to a speed of life that you can actually maintain. Do not "sprint" through your grief. Pacing yourself ensures that you carry the person\'s memory with you over the long haul.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Fact-Check → Compassion → Stability',
      whyThisOrder:
        'Regulates the Panic: Grief feels like a physical threat. Using the Head to understand the "Stages of Grief" provides safety, allowing the Heart to process and the Gut to settle.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Fact-check the panic',
          body:
            'When the physical "doom" feeling of grief hits, use your head to remind yourself: "I am safe, I am breathing, this is grief." Using logic to label the panic prevents it from turning into a physical emergency.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Offer yourself compassion',
          body:
            'Treat your heart with the tenderness of a caregiver. If your body is shaking or your chest is tight, respond with kindness. This emotional self-soothing allows the "Heart" to settle the "Gut."',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Settle into the stillness',
          body:
            'Once the panic subsides, sit in the quiet. Let your body feel the stillness without needing to fill it with noise or activity. This physical peace is where the deep, quiet work of healing happens.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Witnessing → Surviving → Reframing',
      whyThisOrder:
        'Honors the Whole: You feel the need to be okay for everyone. This order prioritizes your own feeling and physical survival before you try to make sense of it for others.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Witness the feeling',
          body:
            'Simply notice the depth of your sorrow without judgment. By witnessing your own pain first, you fulfill your primary emotional need before you try to support or explain it to others.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Focus on survival',
          body:
            'Keep the body going. Breath by breath, step by step. When all three centers are balanced, you realize that simply surviving the day is a profound act of honoring what was lost.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Reframe the future',
          body:
            'Use your head to look at the landscape ahead. How does this loss reshape your path? Reframing allows you to find a way to live in a world that is permanently different, but still beautiful.',
        },
      ],
    },
  },
}

/** Getting Better · Dealing with grief — remembrance candle. */
export function DealingWithGriefCardArt () {
  const bg = CONTEXT_BACKGROUND[4]
  const cx = 160
  const cy = 100
  const candleW = 42
  const candleH = 84
  const candleBottom = cy + 38
  const candleTop = candleBottom - candleH
  const flamePeak = candleTop - 22
  const shadowY = candleBottom + 8
  const stroke = { stroke: '#ffffff', strokeOpacity: 0.88, strokeWidth: 2.75 } as const
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={bg} />
      <rect x={cx - candleW / 2} y={candleTop} width={candleW} height={candleH} rx="8" fill="rgba(255,255,255,0.1)" {...stroke} />
      <path d={`M ${cx - 12} ${candleTop} Q ${cx} ${flamePeak} ${cx + 12} ${candleTop} Q ${cx} ${candleTop + 14} ${cx - 12} ${candleTop} Z`} fill="rgba(255,255,255,0.18)" {...stroke} strokeLinejoin="round" />
      <ellipse cx={cx} cy={shadowY} rx="52" ry="10" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
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

export function DealingWithGriefStepArt ({ contextId, variantId, stepIndex, brain }: FlowStepArtProps) {
  if (variantId === 'head-strong') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgGriefThinkerHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgGriefThinkerHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgGriefThinkerGutStep3 />
  }
  if (variantId === 'head-gut') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgGriefTacticianHeartStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgGriefTacticianGutStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgGriefTacticianHeadStep3 />
  }
  if (variantId === 'head-heart') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgGriefDiplomatGutStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgGriefDiplomatHeartStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgGriefDiplomatHeadStep3 />
  }
  if (variantId === 'heart-strong') {
    if (stepIndex === 0 && brain === 'Head') return <SvgGriefEmpathHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgGriefEmpathHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgGriefEmpathGutStep3 />
  }
  if (variantId === 'heart-gut') {
    if (stepIndex === 0 && brain === 'Head') return <SvgGriefDefenderHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgGriefDefenderGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgGriefDefenderHeartStep3 />
  }
  if (variantId === 'heart-head') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgGriefAdvisorGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgGriefAdvisorHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgGriefAdvisorHeartStep3 />
  }
  if (variantId === 'gut-strong') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgGriefDoerHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgGriefDoerHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgGriefDoerGutStep3 />
  }
  if (variantId === 'gut-head') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgGriefEngineerHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgGriefEngineerHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgGriefEngineerGutStep3 />
  }
  if (variantId === 'gut-heart') {
    if (stepIndex === 0 && brain === 'Head') return <SvgGriefHeroHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgGriefHeroHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgGriefHeroGutStep3 />
  }
  if (variantId === 'balanced') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgGriefSovereignHeartStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgGriefSovereignGutStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgGriefSovereignHeadStep3 />
  }
  return <ContextCardArt id={contextId} />
}

function SvgGriefThinkerHeartStep1 () {
  const cx = 160
  const headCy = 86
  const headR = 24
  const shoulderY = headCy + headR + 10
  const shoulderLow = headCy + headR + 28
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx={cx} cy={headCy} r={headR} fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" />
    <path d={`M ${cx - 14} ${headCy - 2} q5 5 10 0 M ${cx + 4} ${headCy - 2} q5 5 10 0`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M ${cx - 11} ${headCy + 14} Q ${cx} ${headCy + 8} ${cx + 11} ${headCy + 14}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M ${cx - 38} ${shoulderY} Q ${cx} ${shoulderLow} ${cx + 38} ${shoulderY}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx - 38} ${shoulderY} Q ${cx - 26} ${headCy + 2} ${cx - 18} ${headCy + 10}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M ${cx + 38} ${shoulderY} Q ${cx + 26} ${headCy + 2} ${cx + 18} ${headCy + 10}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
function SvgGriefThinkerHeadStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <circle cx={cx - 32} cy={cy} r="6" fill="#ffffff" fillOpacity="0.4" />
    <circle cx={cx} cy={cy - 20} r="6" fill="#ffffff" fillOpacity="0.55" />
    <circle cx={cx + 32} cy={cy} r="6" fill="#ffffff" fillOpacity="0.7" />
    <path d={`M ${cx - 26} ${cy - 4} L ${cx - 6} ${cy - 16} M ${cx + 6} ${cy - 16} L ${cx + 26} ${cy - 4}`} fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}
function SvgGriefThinkerGutStep3 () {
  const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 72 ${cy + 16} Q 160 ${cy - 32} 248 ${cy + 16}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M 96 ${cy + 16} L 224 ${cy + 16}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx="96" cy={cy + 16} r="5" fill="#ffffff" fillOpacity="0.55" />
  </>)
}

function SvgGriefTacticianHeartStep1 () {
  const cx = 160
  const headCy = 84
  const headR = 22
  const bow = 8
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx={cx + bow} cy={headCy} r={headR} fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" />
    <path d={`M ${cx - 34} ${headCy + 20} Q ${cx - 4} ${headCy + 38} ${cx + 24} ${headCy + 16}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx - 30} ${headCy + 24} L ${cx - 34} ${headCy + 48}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M ${cx + 10} ${headCy + 22} L ${cx + 6} ${headCy + 46}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
  </>)
}
function SvgGriefTacticianGutStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M ${cx - 48} ${cy + 20} h96`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    <rect x={cx - 28} y={cy - 20} width="56" height="32" rx="8" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" />
    <path d={`M ${cx - 12} ${cy - 4} h24 M ${cx - 8} ${cy + 4} h16`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}
function SvgGriefTacticianHeadStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M ${cx} ${cy + 24} L ${cx} ${cy - 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx - 16} ${cy - 20} L ${cx} ${cy - 36} L ${cx + 16} ${cy - 20} Z`} fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.25" strokeLinejoin="round" />
  </>)
}

function SvgGriefDiplomatGutStep1 () {
  const cx = 160; const cy = 128
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M ${cx - 56} ${cy} h112`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx} ${cy - 48} v48`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx={cx} cy={cy - 48} r="8" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.25" />
  </>)
}
function SvgGriefDiplomatHeartStep2 () {
  const cx = 160
  const headCy = 88
  const headR = 24
  const neckY = headCy + headR
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx={cx} cy={headCy} r={headR} fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" />
    <path d={`M ${cx - 14} ${headCy - 2} q5 5 10 0 M ${cx + 4} ${headCy - 2} q5 5 10 0`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M ${cx - 10} ${headCy + 6} Q ${cx} ${headCy - 4} ${cx + 10} ${headCy + 6}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M ${cx} ${neckY} L ${cx} ${neckY + 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx} ${neckY + 6} L ${cx - 44} ${headCy - 6}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx} ${neckY + 6} L ${cx + 44} ${headCy - 6}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}
function SvgGriefDiplomatHeadStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <circle cx={cx} cy={cy} r="14" fill="#ffffff" fillOpacity="0.45" />
    <circle cx={cx} cy={cy} r="32" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <circle cx={cx} cy={cy} r="52" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" />
  </>)
}

function SvgGriefEmpathHeadStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <rect x={cx - 40} y={cy - 32} width="80" height="64" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${cx - 24} ${cy - 12} h48 M ${cx - 24} ${cy + 4} h32 M ${cx - 24} ${cy + 20} h40`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
  </>)
}
function SvgGriefEmpathHeartStep2 () {
  const cx = 160
  const headCy = 86
  const headR = 24
  const chestY = headCy + headR + 12
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx={cx} cy={headCy} r={headR} fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" />
    <path d={`M ${cx - 14} ${headCy - 2} q5 5 10 0 M ${cx + 4} ${headCy - 2} q5 5 10 0`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M ${cx - 9} ${headCy + 10} Q ${cx} ${headCy + 6} ${cx + 9} ${headCy + 10}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M ${cx} ${headCy + headR} L ${cx} ${chestY + 18}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx + 20} ${chestY - 20} L ${cx + 6} ${chestY + 2} L ${cx + 14} ${chestY + 18}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M ${cx - 6} ${chestY - 4} C ${cx - 18} ${chestY} ${cx - 18} ${chestY + 14} ${cx - 8} ${chestY + 16} C ${cx - 2} ${chestY + 10} ${cx - 2} ${chestY + 2} ${cx - 6} ${chestY - 4} Z`} fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" strokeLinejoin="round" />
  </>)
}
function SvgGriefEmpathGutStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${cx - 48 + i * 16} ${cy + 16 - i * 8} h${96 - i * 32}`} fill="none" stroke="#ffffff" strokeOpacity={0.45 + i * 0.2} strokeWidth="2.5" strokeLinecap="round" />
    ))}
  </>)
}

function SvgGriefDefenderHeadStep1 () {
  const cx = 160; const cy = 100; const g = 24
  return stepSvg(AUDIT_STEP_BG, <>
    {[0, 1, 2].flatMap((row) =>
      [0, 1, 2].map((col) => (
        <rect key={`${row}-${col}`} x={cx - 1.5 * g + col * g} y={cy - 1.5 * g + row * g} width={g - 4} height={g - 4} rx="4" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity={row === 1 && col === 1 ? 0.88 : 0.35} strokeWidth="2" />
      ))
    )}
  </>)
}
function SvgGriefDefenderGutStep2 () {
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
function SvgGriefDefenderHeartStep3 () {
  const cy = 96
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M 72 ${cy + 6} Q 116 ${cy - 10} 160 ${cy + 6} T 248 ${cy + 6}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M 72 ${cy + 18} Q 116 ${cy + 2} 160 ${cy + 18} T 248 ${cy + 18}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}

function SvgGriefAdvisorGutStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <circle cx={cx} cy={cy} r="28" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${cx - 20} ${cy + 12} Q ${cx} ${cy - 8} ${cx + 20} ${cy + 12}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={cx - 24 + i * 24} cy={cy - 20} r="4" fill="#ffffff" fillOpacity={0.35 + i * 0.15} />
    ))}
  </>)
}
function SvgGriefAdvisorHeadStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <rect x={cx - 36} y={cy - 48} width="72" height="32" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" />
    <rect x={cx - 36} y={cy - 8} width="72" height="32" rx="8" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.72" strokeWidth="2.25" />
    <circle cx={cx} cy={cy + 28} r="6" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgGriefAdvisorHeartStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 48} ${cy + 8} L ${cx - 8} ${cy + 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx + 48} ${cy + 8} L ${cx + 8} ${cy + 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx - 8} ${cy + 8} Q ${cx} ${cy - 24} ${cx + 8} ${cy + 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}

function SvgGriefDoerHeartStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 36} ${cy - 24} L ${cx + 36} ${cy - 24} L ${cx + 28} ${cy + 24} L ${cx - 28} ${cy + 24} Z`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinejoin="round" />
    <path d={`M ${cx - 20} ${cy - 8} C ${cx - 8} ${cy + 16} ${cx + 8} ${cy + 16} ${cx + 20} ${cy - 8}`} fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" strokeLinecap="round" />
  </>)
}
function SvgGriefDoerHeadStep2 () {
  const cx = 160; const cy = 100
  const bars = [{ w: 112, o: 0.88 }, { w: 80, o: 0.65 }, { w: 48, o: 0.45 }]
  return stepSvg(AUDIT_STEP_BG, <>
    {bars.map(({ w, o }, i) => (
      <path key={w} d={`M ${cx - w / 2} ${cy - 24 + i * 24} h${w}`} fill="none" stroke="#ffffff" strokeOpacity={o} strokeWidth="2.5" strokeLinecap="round" />
    ))}
  </>)
}
function SvgGriefDoerGutStep3 () {
  const cx = 160
  const cy = 100
  const mergeX = cx - 8
  const mergeY = cy + 8
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M ${cx - 56} ${cy + 16} Q ${cx - 28} ${cy - 8} ${mergeX} ${mergeY}`} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.25" strokeLinecap="round" strokeDasharray="5 6" />
    <path d={`M ${cx - 56} ${cy - 16} Q ${cx - 20} ${cy + 4} ${mergeX} ${mergeY}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M ${mergeX} ${mergeY} L ${cx + 56} ${mergeY}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <path d={`M ${cx + 44} ${mergeY - 10} L ${cx + 56} ${mergeY} L ${cx + 44} ${mergeY + 10}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgGriefEngineerHeartStep1 () {
  const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx="128" cy={cy} r="16" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <circle cx="192" cy={cy} r="16" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M 144 ${cy} L 176 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" strokeDasharray="4 6" />
  </>)
}
function SvgGriefEngineerHeadStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M ${cx - 48} ${cy - 16} h96 M ${cx - 48} ${cy + 16} h96`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M ${cx - 32} ${cy} h64 M ${cx - 16} ${cy - 8} h32 M ${cx - 16} ${cy + 8} h32`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}
function SvgGriefEngineerGutStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    {[0, 1, 2, 3].map((i) => (
      <circle key={i} cx={cx - 36 + i * 24} cy={cy} r="5" fill="#ffffff" fillOpacity={0.35 + i * 0.15} />
    ))}
    <path d={`M ${cx - 44} ${cy + 20} L ${cx + 44} ${cy + 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}

function SvgGriefHeroHeadStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <rect x={cx - 48} y={cy - 20} width="96" height="40" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${cx - 20} ${cy + 4} h40`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
  </>)
}
function SvgGriefHeroHeartStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 36} ${cy + 16} Q ${cx} ${cy - 28} ${cx + 36} ${cy + 16}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx={cx} cy={cy + 8} r="8" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" />
  </>)
}
function SvgGriefHeroGutStep3 () {
  const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 88 ${cy - 8} L 232 ${cy - 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M 88 ${cy + 8} L 232 ${cy + 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M 88 ${cy + 24} L 232 ${cy + 24}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}

function SvgGriefSovereignHeartStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx={cx} cy={cy} r="28" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" />
    <circle cx={cx} cy={cy} r="8" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgGriefSovereignGutStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M ${cx} ${cy + 32} L ${cx} ${cy - 32}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx - 12} ${cy - 20} Q ${cx} ${cy - 32} ${cx + 12} ${cy - 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M ${cx - 12} ${cy + 4} Q ${cx} ${cy + 16} ${cx + 12} ${cy + 4}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}
function SvgGriefSovereignHeadStep3 () {
  const cx = 160
  const cy = 100
  const w = 104
  const h = 68
  const x = cx - w / 2
  const y = cy - h / 2
  const ground = y + h - 16
  return stepSvg(AUDIT_STEP_BG, <>
    <rect x={x} y={y} width={w} height={h} rx="6" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" />
    <path d={`M ${x + 16} ${ground} L ${x + w - 16} ${ground}`} fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M ${x + 16} ${ground} Q ${cx} ${y + 24} ${x + w - 16} ${ground}`} fill="rgba(255,255,255,0.06)" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="2.5" strokeLinejoin="round" />
  </>)
}
