import type { ReactNode } from 'react'
import { ContextCardArt, CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import type { FlowSituation, FlowStepArtProps } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const STAY_OR_GO_SITUATION_ID = 'stay-or-go' as const

export const stayOrGoFlowSituation: FlowSituation = {
  id: STAY_OR_GO_SITUATION_ID,
  cardTitle: 'Stay or Go',
  cardDescription: 'Decide whether to commit or leave a workplace / project.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Audit → Value → Cut/Commit',
      whyThisOrder:
        'Stops Over-Optimizing: You will try to fix a broken system forever. You must run the numbers (Head) and check your passion (Heart) before your Gut is allowed to pull the plug.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Perform a system audit',
          body:
            'Run the numbers and look at the objective data. Is the relationship, job, or project meeting the predetermined KPIs? By starting with a cold analysis of the facts, you remove the "sunk cost" fallacy that usually keeps you stuck in a loop of trying to optimize a failing situation.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Check for core resonance',
          body:
            'Ask yourself: Do I still care about the "Why"? Even if the logic is shaky, a strong heart connection can justify staying. However, if the logic is broken and your heart feels empty, you have the data you need to move to the next phase without guilt.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Pull the plug or commit',
          body:
            'Once the audit and the value check are complete, make a physical move. Either double down with a new boundary or walk away entirely. The Gut must act decisively to prevent the Head from reopening the case for the hundredth time.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Logic → Decide → Closure',
      whyThisOrder:
        'Clinical Exit: You need a "fail-safe" metric. Once the data hits a certain point (Head), you act immediately (Gut), then process the emotional fallout later.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Identify the fail-safe metric',
          body:
            'Define a clear "if this, then that" boundary. For example, "If I am still working 80 hours a week by next month, I leave." Having a clinical, non-negotiable metric prevents your brain from making excuses when things get difficult.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Trigger the immediate exit',
          body:
            'The moment the metric is hit, act. Do not wait for a better time or a "sign." Use your natural decisiveness to execute the exit plan. Your body needs to move before the Head has a chance to rationalize a delay.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Process the emotional fallout',
          body:
            'Only after you are physically out of the situation should you sit with the feelings. Acknowledge the loss and the change in identity. By delaying the "Heart" phase, you ensure that your emotions do not interfere with a necessary strategic departure.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Fact-check → Alignment → Release',
      whyThisOrder:
        'Prevents Lingering: You overthink the "what ifs" and feel for the people involved. Logic must lead to prove the situation is unsalvageable so you can finally let go.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Fact check the "What Ifs"',
          body:
            'List all the reasons you think you should stay and hold them up to the light of reality. Most of your reasons for lingering are likely based on "Head" projections that are not actually true. Debunking these myths allows the exit process to begin.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Check for emotional alignment',
          body:
            'Does staying here make me the person I want to be? If the situation is forcing you to compromise your integrity or your joy, the Heart must agree that the cost of staying is too high. This alignment provides the emotional "permission" to leave.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Release the attachment',
          body:
            'Physically remove your energy from the space. Return the keys, send the email, or have the conversation. Taking a final, physical action stops the mental spiraling and anchors you in your new reality.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Integrity → Realism → Departure',
      whyThisOrder:
        'Protects the Soul: You stay because you care. Leading with Heart ensures the exit is aligned with your values, while the Head provides the "permission" to leave.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Check for integrity',
          body:
            'Ask if staying in this situation is still "true" for you. You often stay because you feel responsible for others. Leading with your own internal truth helps you realize that leaving might actually be the most honest thing you can do for everyone involved.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Apply a dose of realism',
          body:
            'Look at the facts without the "Heart" filter. Is the other person actually changing? Is the company actually improving? Using logic to see the stagnation helps bridge the gap between your hope for the future and the reality of the present.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Make a graceful departure',
          body:
            'Once your heart and head are aligned, walk away. Use your Gut to hold the boundary of your departure firmly but kindly. You do not need to burn bridges, but you do need to be physically gone.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Feeling → Instinct → Analysis',
      whyThisOrder:
        'Trusts the "I am done" signal: You feel the burnout in your bones. Trust that "done" feeling (Heart) and act on it (Gut) before your Head tries to talk you back into the fire.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Trust the internal "Done"',
          body:
            'Listen to the feeling of burnout in your bones. You often know it is over long before you can explain why. Validate this feeling as a legitimate piece of information that is more accurate than any spreadsheet.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Act on the instinct',
          body:
            'Move as soon as the "done" feeling crystallizes. Do not wait for a logical breakdown. Trusting your Gut to pull you out of the fire prevents you from staying until you are completely depleted or bitter.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Analyze the lessons',
          body:
            'Once you are safe and away from the situation, use your Head to look back. What did you learn? How can you prevent this from happening again? This analysis provides the closure your mind needs to finally stop thinking about the exit.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Grief → Reasoning → Execution',
      whyThisOrder:
        'Stops the Resentment: You must acknowledge the emotional loss first. Once the "Heart" is heard, the "Head" can justify the exit plan, leading to a clean break.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Acknowledge the grief',
          body:
            'Before you do anything, admit that this hurts. You need to process the emotional loss of the "dream" or the connection. Trying to skip this step leads to resentment that will follow you into your next chapter.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Reason through the exit plan',
          body:
            'Work out the logistics. How do you leave in a way that is smart and sustainable? Building a logical "bridge" out of the situation makes the Heart feel safe enough to follow through on the final break.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Execute the break',
          body:
            'Carry out the plan with total finality. Do not leave a "crack in the door." By using your Gut to execute a clean break, you ensure that the "Heart" does not get sucked back into a cycle of longing or regret.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Intuition → Evidence → Repair',
      whyThisOrder:
        'Primal Pivot: Your body knows it is over before your brain does. Trust the physical tension (Gut), verify with facts (Head), then leave with grace (Heart).',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Notice the physical tension',
          body:
            'Pay attention to how your body reacts when you enter the room or start the work. If your body is constantly in a state of "bracing," your Gut is telling you it is over. Trust this physical intuition as your first signal.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Verify with evidence',
          body:
            'Back up your "Gut" feeling with three hard facts. This prevents you from making a purely reactive move and gives you the objective evidence you need to explain your departure to yourself and others.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Perform the repair',
          body:
            'Leave in a way that maintains your personal honor. If your Gut move caused a bruise, offer a moment of Heart connection or a sincere thank you before you go. This ensures you leave with your reputation and peace intact.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'ROI → Sever → Peace',
      whyThisOrder:
        'Clean Cut: Do not act on a whim. Use a cost-benefit analysis (Head) to trigger the "Gut" action. This ensures the exit is strategic, not just reactive.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Calculate the ROI of staying',
          body:
            'Perform a cost-benefit analysis. What are you gaining by staying versus what are you losing in terms of time, energy, and health? When the "Head" sees that the investment is a net loss, the exit becomes a strategic necessity.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Sever the connection',
          body:
            'Once the math does not work, cut the tie immediately. Use your Gut to make the move quick and clinical. You are "doing" the exit like a professional task, which prevents unnecessary emotional dragging.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Find your internal peace',
          body:
            'After the cut is made, check in with your Heart. Notice the relief and the return of your energy. This final step allows you to enjoy the freedom that your strategic "Gut" move created.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Impulse → Compassion → Logic',
      whyThisOrder:
        'Balanced Exit: You want to bolt when things get hard. Use your "Gut" to pause, your "Heart" to check for regrets, and your "Head" to decide if staying is actually rational.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Pause the impulse',
          body:
            'When things get hard, your first instinct is to bolt. Stop. Use your Gut to hold yourself still for a moment so you do not make a reactive exit that you might regret tomorrow.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Check for lingering regrets',
          body:
            'If I left right now, would I feel like I left things unsaid or undone? Use your Heart to ensure that you are leaving for the right reasons, not just to escape a temporary discomfort.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Decide on the rational path',
          body:
            'Look at the big picture. Is staying actually the most rational choice for your long term goals? If the answer is no, then use your Head to authorize the exit that your Gut wanted to make in the first place.',
        },
      ],
    },
    balanced: {
      archetype: 'Hybrid',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Synthesis → Peace → Finality',
      whyThisOrder:
        'Unified Exit: You need all three centers to say "Yes." Once the logic, emotion, and instinct align, you walk away without ever looking back.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Synthesize all dynamics',
          body:
            'Look at the logic of the situation, the emotional cost, and the physical reality all at once. When all three centers point to the exit, you know with absolute certainty that it is time to go.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Find internal peace with the choice',
          body:
            'Ensure there is no "civil war" inside you. Your logic and your feelings must be in harmony. When you feel a sense of calm about the departure, you are ready to move.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Walk away with finality',
          body:
            'Step out of the situation and do not look back. Because you have used all three centers to make the choice, there is no need for second-guessing. You move into your next phase with total, unified presence.',
        },
      ],
    },
  },
}

/** Doing Work · Stay or Go — door slightly open (stay inside, go through). */
export function StayOrGoCardArt () {
  const bg = CONTEXT_BACKGROUND[2]
  const cx = 160
  const cy = 100
  const frameW = 88
  const frameH = 118
  const frameX = cx - frameW / 2
  const frameY = cy - frameH / 2
  const hingeX = frameX
  const doorTopX = frameX + frameW - 18
  const doorBottomX = frameX + frameW - 10
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={bg} />
      <path
        d={`M ${doorTopX} ${frameY + 6} L ${frameX + frameW} ${frameY} L ${frameX + frameW} ${frameY + frameH} L ${doorBottomX} ${frameY + frameH - 6} Z`}
        fill="rgba(255,255,255,0.14)"
        stroke="none"
      />
      <path
        d={`M ${hingeX} ${frameY} L ${doorTopX} ${frameY + 6} L ${doorBottomX} ${frameY + frameH - 6} L ${hingeX} ${frameY + frameH} Z`}
        fill="rgba(255,255,255,0.1)"
        stroke="#ffffff"
        strokeOpacity="0.82"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect
        x={frameX}
        y={frameY}
        width={frameW}
        height={frameH}
        rx="4"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.25"
      />
      <circle cx={hingeX + 34} cy={cy} r="4" fill="#ffffff" fillOpacity="0.55" />
      <path
        d={`M ${hingeX + 6} ${frameY + 10} A 6 6 0 0 1 ${hingeX + 6} ${frameY + frameH - 10}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeLinecap="round"
      />
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

export function StayOrGoStepArt ({ contextId, variantId, stepIndex, brain }: FlowStepArtProps) {
  if (variantId === 'head-strong') {
    if (stepIndex === 0 && brain === 'Head') return <SvgStayGoThinkerHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgStayGoThinkerHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgStayGoThinkerGutStep3 />
  }
  if (variantId === 'head-gut') {
    if (stepIndex === 0 && brain === 'Head') return <SvgStayGoTacticianHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgStayGoTacticianGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgStayGoTacticianHeartStep3 />
  }
  if (variantId === 'head-heart') {
    if (stepIndex === 0 && brain === 'Head') return <SvgStayGoDiplomatHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgStayGoDiplomatHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgStayGoDiplomatGutStep3 />
  }
  if (variantId === 'heart-strong') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgStayGoEmpathHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgStayGoEmpathHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgStayGoEmpathGutStep3 />
  }
  if (variantId === 'heart-gut') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgStayGoDefenderHeartStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgStayGoDefenderGutStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgStayGoDefenderHeadStep3 />
  }
  if (variantId === 'heart-head') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgStayGoAdvisorHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgStayGoAdvisorHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgStayGoAdvisorGutStep3 />
  }
  if (variantId === 'gut-strong') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgStayGoDoerGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgStayGoDoerHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgStayGoDoerHeartStep3 />
  }
  if (variantId === 'gut-head') {
    if (stepIndex === 0 && brain === 'Head') return <SvgStayGoEngineerHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgStayGoEngineerGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgStayGoEngineerHeartStep3 />
  }
  if (variantId === 'gut-heart') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgStayGoHeroGutStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgStayGoHeroHeartStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgStayGoHeroHeadStep3 />
  }
  if (variantId === 'balanced') {
    if (stepIndex === 0 && brain === 'Head') return <SvgStayGoSovereignHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgStayGoSovereignHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgStayGoSovereignGutStep3 />
  }
  return <ContextCardArt id={contextId} />
}

function SvgStayGoThinkerHeadStep1 () {
  const cx = 160
  const cy = 100
  const boxW = 148
  const boxH = 116
  const boxX = cx - boxW / 2
  const boxY = cy - boxH / 2
  const tickX = boxX + 28
  const lineX = tickX + 34
  const rowYs = [cy - 24, cy, cy + 24]
  const lineWidths = [72, 56, 64]
  return stepSvg(AUDIT_STEP_BG, <>
    <rect x={boxX} y={boxY} width={boxW} height={boxH} rx="10" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
    {rowYs.map((y, i) => (
      <path key={`line-${i}`} d={`M ${lineX} ${y} h${lineWidths[i]}`} fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="2.25" strokeLinecap="round" />
    ))}
    {rowYs.slice(0, 2).map((y) => (
      <path key={`tick-${y}`} d={`M ${tickX} ${y - 2} l6 6 10-12`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    ))}
  </>)
}
function SvgStayGoThinkerHeartStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    {[44, 30, 16].map((r) => <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity={0.28 + (44 - r) * 0.02} strokeWidth="2.25" />)}
    <circle cx={cx} cy={cy} r="6" fill="#ffffff" fillOpacity="0.5" />
  </>)
}
function SvgStayGoThinkerGutStep3 () {
  const y = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 88 ${y} L 148 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M 168 ${y} L 232 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" />
    <path d={`M 232 ${y - 12} L 248 ${y} L 232 ${y + 12}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgStayGoTacticianHeadStep1 () {
  const y = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M 72 ${y} L 248 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M 208 ${y - 32} L 208 ${y + 32}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <circle cx="208" cy={y} r="5" fill="#ffffff" fillOpacity="0.55" />
  </>)
}
function SvgStayGoTacticianGutStep2 () {
  const y = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d="M 200 64 L 200 136" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
    <path d={`M 88 ${y} L 188 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M 188 ${y - 12} L 212 ${y} L 188 ${y + 12}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
function SvgStayGoTacticianHeartStep3 () {
  const waves = [{ y: 88, o: 0.38 }, { y: 100, o: 0.55 }, { y: 112, o: 0.72 }]
  return stepSvg(WARMTH_STEP_BG, <>
    {waves.map(({ y, o }) => <path key={y} d={`M 72 ${y} Q 160 ${y + 14} 248 ${y}`} fill="none" stroke="#ffffff" strokeOpacity={o} strokeWidth="2.25" strokeLinecap="round" />)}
  </>)
}

function SvgStayGoDiplomatHeadStep1 () {
  const y = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M 72 ${y - 24} h176`} fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 8" />
    <path d={`M 72 ${y + 24} h176`} fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 8" />
    <path d={`M 88 ${y} h144`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="3.25" strokeLinecap="round" />
  </>)
}
function SvgStayGoDiplomatHeartStep2 () {
  const cy = 108
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M 88 ${cy - 20} Q 160 ${cy + 8} 232 ${cy - 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M 96 ${cy} Q 160 ${cy + 16} 224 ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx="160" cy={cy + 8} r="7" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgStayGoDiplomatGutStep3 () {
  const y = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 108 ${y} h44 M 168 ${y} h44`} fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M 152 ${y - 8} L 168 ${y + 8} M 168 ${y - 8} L 152 ${y + 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}

function SvgStayGoEmpathHeartStep1 () {
  return stepSvg(WARMTH_STEP_BG, <>
    <path d="M 160 52 L 160 148" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3.25" strokeLinecap="round" />
    <circle cx="160" cy="100" r="6" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgStayGoEmpathHeadStep2 () {
  const y = 108
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M 72 ${y - 28} C 120 ${y - 52} 200 ${y - 52} 248 ${y - 28}`} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M 72 ${y + 12} L 248 ${y + 12}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" />
  </>)
}
function SvgStayGoEmpathGutStep3 () {
  return stepSvg(STANCE_STEP_BG, <>
    <path d="M 128 68 L 128 148 M 192 68 L 192 148" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 136 100 L 220 100" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d="M 220 88 L 236 100 L 220 112" fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgStayGoDefenderHeartStep1 () {
  return stepSvg(WARMTH_STEP_BG, <circle cx="160" cy="100" r="22" fill="rgba(255,255,255,0.14)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" />)
}
function SvgStayGoDefenderGutStep2 () {
  const y = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 96 ${y} L 200 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <path d={`M 200 ${y - 14} L 228 ${y} L 200 ${y + 14}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
function SvgStayGoDefenderHeadStep3 () {
  const joinY = 96; const baseY = 152
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M 160 ${baseY} L 160 ${joinY} L 104 68 M 160 ${joinY} L 216 68`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="104" cy="68" r="5" fill="#ffffff" fillOpacity="0.4" /><circle cx="216" cy="68" r="5" fill="#ffffff" fillOpacity="0.4" />
  </>)
}

function SvgStayGoAdvisorHeartStep1 () {
  return stepSvg(WARMTH_STEP_BG, <path d="M 72 88 Q 160 148 248 88" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />)
}
function SvgStayGoAdvisorHeadStep2 () {
  const ys = [128, 100, 72]
  return stepSvg(AUDIT_STEP_BG, <>
    {ys.map((y, i) => <path key={y} d={`M ${120 - i * 8} ${y} h${80 + i * 16}`} fill="none" stroke="#ffffff" strokeOpacity={0.45 + i * 0.2} strokeWidth="2.5" strokeLinecap="round" />)}
  </>)
}
function SvgStayGoAdvisorGutStep3 () {
  return stepSvg(STANCE_STEP_BG, <path d="M 96 148 L 224 72" fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="3.25" strokeLinecap="round" />)
}

function SvgStayGoDoerGutStep1 () {
  const y = 100
  return stepSvg(STANCE_STEP_BG, <path d={`M 72 ${y} l8-18 8 18 8-16 8 16 8-14 8 14 8-12 8 12 8-10 8 10 8-8 8 8 8-6 8 6 8-4 8 4 8-2 8 2 C 200 99 220 101 248 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />)
}
function SvgStayGoDoerHeadStep2 () {
  const ys = [78, 100, 122]
  return stepSvg(AUDIT_STEP_BG, <>
    {ys.map((y) => <path key={y} d={`M 108 ${y} h104 M 116 ${y - 6} l6 6 10-12`} fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />)}
  </>)
}
function SvgStayGoDoerHeartStep3 () {
  return stepSvg(WARMTH_STEP_BG, <>
    <path d="M 108 112 Q 132 88 160 100 Q 188 112 212 88" fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="160" cy="100" r="5" fill="#ffffff" fillOpacity="0.45" />
  </>)
}

function SvgStayGoEngineerHeadStep1 () {
  const y = 108
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M 96 ${y} L 224 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M 160 ${y} L 132 ${y - 36} M 160 ${y} L 208 ${y + 28}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx="208" cy={y + 28} r="10" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" />
  </>)
}
function SvgStayGoEngineerGutStep2 () {
  const y = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 72 ${y} L 136 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M 184 ${y} L 248 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.25" strokeLinecap="round" strokeDasharray="5 7" />
    <path d="M 148 88 L 172 112 M 172 88 L 148 112" fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" />
  </>)
}
function SvgStayGoEngineerHeartStep3 () {
  return stepSvg(WARMTH_STEP_BG, <path d="M 64 108 L 256 108" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="3" strokeLinecap="round" />)
}

function SvgStayGoHeroGutStep1 () {
  const y0 = 62; const barH = 76
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 145 ${y0} L 145 ${y0 + barH}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="5" strokeLinecap="round" />
    <path d={`M 175 ${y0} L 175 ${y0 + barH}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="5" strokeLinecap="round" />
  </>)
}
function SvgStayGoHeroHeartStep2 () {
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx="160" cy="100" r="40" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeDasharray="8 7" />
    <path d="M 160 88 L 160 112 M 152 100 h16" fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="2.5" strokeLinecap="round" />
  </>)
}
function SvgStayGoHeroHeadStep3 () {
  const forkY = 108; const y = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M 160 148 L 160 ${forkY} L 96 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M 160 ${forkY} L 224 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M 224 ${y - 10} L 240 ${y} L 224 ${y + 10}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgStayGoSovereignHeadStep1 () {
  const cx = 160; const cy = 100
  const pts = [{ x: 160, y: 52 }, { x: 96, y: 138 }, { x: 224, y: 138 }]
  return stepSvg(AUDIT_STEP_BG, <>
    {pts.map((p) => <path key={`${p.x}`} d={`M ${cx} ${cy} L ${p.x} ${p.y}`} fill="none" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="2.5" strokeLinecap="round" />)}
    <circle cx={cx} cy={cy} r="8" fill="#ffffff" fillOpacity="0.35" />
  </>)
}
function SvgStayGoSovereignHeartStep2 () {
  return stepSvg(WARMTH_STEP_BG, <circle cx="160" cy="100" r="48" fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.75" />)
}
function SvgStayGoSovereignGutStep3 () {
  const y = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M 88 ${y} L 212 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <path d={`M 212 ${y - 12} L 236 ${y} L 212 ${y + 12}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M 72 ${y + 28} L 96 ${y + 28}`} fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />
  </>)
}
