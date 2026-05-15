import { useId } from 'react'
import { ContextCardArt, CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import type { FlowSituation, FlowStepArtProps } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const CONFLICT_RESPONSE_SITUATION_ID = 'conflict-response' as const

export const conflictResponseFlowSituation: FlowSituation = {
  id: CONFLICT_RESPONSE_SITUATION_ID,
  title: 'Conflict response',
  cardTitle: 'Conflict response',
  cardDescription: 'Respond without escalating the situation.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Verify → Connect → Commit',
      whyThisOrder:
        'Stops the "Lecture": You treat the argument like a debate. You must move from "being right" to "feeling seen" before the fight can actually end.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Verify the objective truth',
          body:
            'Acknowledge where the facts actually land. Admit if you were factually wrong or if the other person has a logical point. This kills the urge to "win" the debate and moves you toward a solution.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Connect with the impact',
          body:
            'Shift from the "what" to the "how." Ask: How did my logic make them feel? Acknowledge their emotional experience without trying to "correct" it with data.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Commit to the change',
          body:
            'Stop the analysis. Give a firm "yes" to the resolution and stop bringing up new points. Use your physical presence to show you are done fighting and ready to move on.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Gut → Head → Heart → Gut',
      coreFunctions: 'Brake → Audit → Relate → Re-engage',
      whyThisOrder:
        'Prevents Steamrolling: You have already "won" the argument in your head. You must stop talking, check your facts, and acknowledge the other person before moving forward.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Apply the emergency brake',
          body:
            'Stop talking immediately. Your impulse is to keep proving your point until the other person yields. Physically close your mouth and take a step back to break the momentum.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Audit your own argument',
          body:
            'Scan for "logic holes" or moments where you were being unfair just to win. Being honest about your own tactical errors helps you drop the defensive posture.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Relate to their perspective',
          body:
            'Find one thing they said that you can genuinely empathize with. Verbalize that connection so they feel you are on their team again, not their opponent.',
        },
        {
          brain: 'Gut',
          label: 'Step 4',
          title: 'Re-engage with softness',
          body:
            'Step back into the conversation with a lower volume and relaxed posture. Use your body to signal that the "battle" is over and the partnership is back.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Clarify → Validate → Resolve',
      whyThisOrder:
        'Ends the Circularity: You understand the logic and the pain, but you will not end the fight. This forces you to state a final, actionable resolution.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Clarify the core issue',
          body:
            'Strip away the fluff. State exactly what the argument is about in one sentence. This prevents the conversation from spiraling into a history lesson of past mistakes.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Validate the pain',
          body:
            'Tell the other person: "I see why that hurt you." Even if you do not agree with the logic, validating the emotion stops the circular "you do not understand" loop.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Resolve with an action',
          body:
            'Do not just say "I am sorry." State a concrete thing you will do differently next time. This puts a physical period at the end of the sentence and ends the fight.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Soothe → Ground → Direct',
      whyThisOrder:
        'Lowers the Volume: You feel attacked or hurt. You need to settle your nervous system and look at the facts before you can make a clear request.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Soothe your own system',
          body:
            'Acknowledge that you feel overwhelmed or hurt. Take a moment to self-validate so you are not looking to your "opponent" to fix your feelings mid-fight.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Ground the situation in logic',
          body:
            'Separate the "story" you are telling yourself from what actually happened. Focus on the words used rather than the tone you perceived. This brings the volume down in your own mind.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Direct the next step',
          body:
            'Instead of waiting for the other person to lead, make a clear request. Say: "I need us to talk about [X] specifically." This moves you from a reactive state to a constructive one.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Gut → Heart → Head → Gut',
      coreFunctions: 'Halt → Release → Fact-check → Restart',
      whyThisOrder:
        'Stops the Outburst: You react with heat and emotion. You must physically pause and vent the "charge" before you can see the logic of the situation.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Halt the escalation',
          body:
            'Recognize the "heat" in your chest and stop. Physically leave the room if you have to. You cannot resolve anything while your Gut is in fight-or-flight mode.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Release the emotional charge',
          body:
            'Vent the feeling safely. Write it down or take a fast walk. Get the "scream" out of your system so it does not come out at the person you love.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Fact-check the triggers',
          body:
            'Ask: Is this about right now, or is this about something else? Distinguishing current reality from past baggage allows you to come back with a clear head.',
        },
        {
          brain: 'Gut',
          label: 'Step 4',
          title: 'Restart with intention',
          body:
            'Return to the person and state your desire to fix things. Use your physical presence to show warmth rather than the "burn" of the previous outburst.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Express → Process → Decide',
      whyThisOrder:
        'Stops the Resentment: You feel hurt and then overthink it. You need to say how you feel, make sense of the "why," and then reach a firm decision.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Express the raw feeling',
          body:
            'Say exactly how you feel without the "Head" trying to make it sound professional or logical. "I feel ignored" is more effective than a three-page explanation of why you are right.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Process the "Why"',
          body:
            'Once the feeling is out, analyze why it hit so hard. Understanding the mechanics of your own hurt helps you explain it to the other person without sounding accusatory.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Decide and close',
          body:
            'Make a firm choice to either let it go or set a boundary. Avoid the "Head" trap of overthinking the decision later. Once it is decided, your body should act like it is over.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart → Gut',
      coreFunctions: 'Silence → Verify → Repair → Move On',
      whyThisOrder:
        'Prevents Wreckage: You react with raw power. You must go silent, get the objective truth, fix the relationship you just bruised, and then move forward.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Choose silence',
          body:
            'Recognize your power. When you are angry, you can be intimidating. Use your Gut to hold your tongue so you do not say something that causes permanent damage.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Verify the objective truth',
          body:
            'Look at the situation as a third party would. Where did the breakdown actually happen? Getting the facts straight prevents you from staying in a "blame" mindset.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Perform the repair',
          body:
            'Offer a sincere apology for your intensity or your words. Soften your eyes and your voice to show that the person is more important to you than the power struggle.',
        },
        {
          brain: 'Gut',
          label: 'Step 4',
          title: 'Move on completely',
          body:
            'Once the repair is made, do not linger in the guilt. Physically move into a new activity to signal to yourself and the other person that the conflict is resolved.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Gut → Head → Gut → Heart',
      coreFunctions: 'Pause → Correct → Adjust → Restore',
      whyThisOrder:
        'Fixes the Approach: You push too hard and then justify it. You must stop, change your tone or behavior, and only then try to reconnect emotionally.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Pause the push',
          body:
            'You tend to bulldoze when you think you are right. Physically sit down or lean back to signal that you are stopping the "advance."',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Correct the narrative',
          body:
            'Tell the other person: "I realized I was being too harsh" or "I was focusing on the wrong thing." Self-correcting out loud shows that your Head is back in control.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Adjust your tone',
          body:
            'Consciously lower your voice and relax your jaw. Your Gut needs to lead the way in showing "peace" before the other person will feel safe enough to reconnect.',
        },
        {
          brain: 'Heart',
          label: 'Step 4',
          title: 'Restore the connection',
          body:
            'End with a "Heart" moment. Ask how they are doing or offer a gesture of affection. This proves that your goal was resolution, not just winning.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Head → Gut',
      coreFunctions: 'Breathe → Calm → Analyze → Proceed',
      whyThisOrder:
        'Regulates the Surge: You are reactive and sensitive. You need to lower your heart rate and settle your emotions before the "truth" of the argument matters.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Breathe through the surge',
          body:
            'Your heart rate spikes fast. Use box breathing to manually override your nervous system. Your Gut needs to feel safe before your Heart can be kind.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Calm the emotional reaction',
          body:
            'Label the feeling as "temporary." Remind your Heart that the person you are arguing with is someone you care about, which helps lower the defensive stakes.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Analyze the root cause',
          body:
            'Now that the "fire" is out, look for the logic. What was the actual misunderstanding? This prevents the argument from turning into a purely emotional feedback loop.',
        },
        {
          brain: 'Gut',
          label: 'Step 4',
          title: 'Proceed with stability',
          body:
            'Re-enter the discussion with a steady, grounded energy. You are no longer "reacting"; you are now "responding" from a place of physical and emotional balance.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Sync → Align → Close',
      whyThisOrder:
        'Prevents Stalling: You see all sides and feel for everyone. You must unify your thoughts and feelings to give a clear, final answer to the conflict.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Sync the perspectives',
          body:
            'Mentally lay out your view and their view side-by-side. Look for the common ground where both logical sets of facts meet.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Align the intentions',
          body:
            'Make sure your "Heart" is actually aiming for peace. If you find a hidden desire to punish or be right, swap it for the desire to be in harmony.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Close the loop',
          body:
            'Give a clear, definitive summary of the resolution. "We agree on X, and we will do Y." Use your Gut to anchor this decision so the argument does not reopen later.',
        },
      ],
    },
  },
}

/** Closed starburst path: alternating outer / inner radius for spiky “ball”. */
function spikyBallPath (cx: number, cy: number, outer: number, inner: number, spikes: number): string {
  const parts: string[] = []
  for (let i = 0; i < spikes * 2; i++) {
    const a = (i * Math.PI) / spikes - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    const x = cx + r * Math.cos(a)
    const y = cy + r * Math.sin(a)
    parts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return `${parts.join(' ')} Z`
}

/** Under Pressure · Conflict response — two spiky balls, separated (no overlap). */
export function ConflictResponseCardArt () {
  const bg = CONTEXT_BACKGROUND[1]
  const gapBetween = 10
  const rLarge = 46
  const rSmall = 34
  const cxLarge = 160 - (rLarge + rSmall + gapBetween) / 2
  const cxSmall = 160 + (rLarge + rSmall + gapBetween) / 2
  const large = spikyBallPath(cxLarge, 100, rLarge, 21, 10)
  const small = spikyBallPath(cxSmall, 100, rSmall, 15, 10)
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={bg} />
      <path
        d={large}
        fill="rgba(255, 255, 255, 0.1)"
        stroke="#ffffff"
        strokeOpacity="0.72"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
      <path
        d={small}
        fill="rgba(255, 255, 255, 0.12)"
        stroke="#ffffff"
        strokeOpacity="0.78"
        strokeWidth="2.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ConflictResponseStepArt ({
  contextId,
  variantId,
  stepIndex,
  brain,
}: FlowStepArtProps) {
  if (variantId === 'head-strong') {
    if (stepIndex === 0 && brain === 'Head') return <SvgConflictThinkerHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgConflictThinkerHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgConflictThinkerGutStep3 />
  }

  if (variantId === 'head-gut') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgConflictTacticianGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgConflictTacticianHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgConflictTacticianHeartStep3 />
    if (stepIndex === 3 && brain === 'Gut') return <SvgConflictTacticianGutStep4 />
  }

  if (variantId === 'head-heart') {
    if (stepIndex === 0 && brain === 'Head') return <SvgConflictDiplomatHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgConflictDiplomatHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgConflictDiplomatGutStep3 />
  }

  if (variantId === 'heart-strong') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgConflictEmpathHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgConflictEmpathHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgConflictEmpathGutStep3 />
  }

  if (variantId === 'heart-gut') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgConflictDefenderGutStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgConflictDefenderHeartStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgConflictDefenderHeadStep3 />
    if (stepIndex === 3 && brain === 'Gut') return <SvgConflictDefenderGutStep4 />
  }

  if (variantId === 'heart-head') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgConflictAdvisorHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgConflictAdvisorHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgConflictAdvisorGutStep3 />
  }

  if (variantId === 'gut-strong') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgConflictDoerGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgConflictDoerHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgConflictDoerHeartStep3 />
    if (stepIndex === 3 && brain === 'Gut') return <SvgConflictDoerGutStep4 />
  }

  if (variantId === 'gut-head') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgConflictEngineerGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgConflictEngineerHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgConflictEngineerGutStep3 />
    if (stepIndex === 3 && brain === 'Heart') return <SvgConflictEngineerHeartStep4 />
  }

  if (variantId === 'gut-heart') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgConflictHeroGutStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgConflictHeroHeartStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgConflictHeroHeadStep3 />
    if (stepIndex === 3 && brain === 'Gut') return <SvgConflictHeroGutStep4 />
  }

  if (variantId === 'balanced') {
    if (stepIndex === 0 && brain === 'Head') return <SvgConflictSovereignHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgConflictSovereignHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgConflictSovereignGutStep3 />
  }

  return <ContextCardArt id={contextId} />
}

const AUDIT_STEP_BG = '#2563C8'
const WARMTH_STEP_BG = '#C2385A'
const STANCE_STEP_BG = '#1A9E6E'

/** Diplomat · Conflict — Head: one clear sentence; faded lines = stripped fluff (centered stack). */
function SvgConflictDiplomatHeadStep1 () {
  const cx = 160
  const lineW = 192
  const x0 = cx - lineW / 2
  const yMid = 100
  const gap = 18
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d={`M ${x0} ${yMid - gap} h${lineW}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.28"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M ${x0} ${yMid + gap} h${lineW}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.28"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M ${x0} ${yMid} h${lineW}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="3.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Heart: almost-circle with open gap at top — two sides meet as one ring. */
function SvgConflictDiplomatHeartStep2 () {
  const cx = 160
  const cy = 100
  const r = 50
  const gapDeg = 52
  const startRad = ((270 + gapDeg / 2) * Math.PI) / 180
  const endRad = ((270 - gapDeg / 2 + 360) * Math.PI) / 180
  const x1 = cx + r * Math.cos(startRad)
  const y1 = cy + r * Math.sin(startRad)
  const x2 = cx + r * Math.cos(endRad)
  const y2 = cy + r * Math.sin(endRad)
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path
        d={`M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 1 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.82"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="5" fill="#ffffff" fillOpacity="0.55" />
    </svg>
  )
}

/** Gut: check + full stop line — concrete action, end of the fight. */
function SvgConflictDiplomatGutStep3 () {
  const groundY = 148
  const tickY = 88
  const tickStartX = 144
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M 56 ${groundY} L 268 ${groundY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d={`M ${tickStartX} ${tickY} l10 10 22-26`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.92"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="248" cy={groundY} r="5" fill="#ffffff" fillOpacity="0.9" />
    </svg>
  )
}

/** Thinker · Conflict — Head: two claims + center crosshair = where facts meet. */
function SvgConflictThinkerHeadStep1 () {
  const cy = 100
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d={`M 160 52 L 160 148`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d={`M 72 ${cy} h176`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Heart: soft wave stack — shift from “what” to “how it landed.” */
function SvgConflictThinkerHeartStep2 () {
  const wave =
    'M 108 0 Q 134 -16 160 0 Q 186 16 212 0'
  const lines = [
    { y: 78, opacity: 0.42 },
    { y: 100, opacity: 0.58 },
    { y: 122, opacity: 0.38 },
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

/** Gut: firm yes — solid badge on the ground + check. */
function SvgConflictThinkerGutStep3 () {
  const groundY = 152
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M 48 ${groundY} L 272 ${groundY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <rect
        x="124"
        y="72"
        width="72"
        height="52"
        rx="12"
        ry="12"
        fill="rgba(255, 255, 255, 0.14)"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2.5"
      />
      <path
        d="M 148 102 l8 8 20-24"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Tactician · Conflict — Gut 1: circle in an L with vertex at its bottom-right (walls left + up). */
function SvgConflictTacticianGutStep1 () {
  const ccx = 160
  const ccy = 100
  const r = 38
  const vx = ccx + r
  const vy = ccy + r
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M 52 ${vy} L ${vx} ${vy} M ${vx} ${vy} L ${vx} 44`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.82"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={ccx}
        cy={ccy}
        r={r}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="2.75"
      />
    </svg>
  )
}

/** Head: magnifying glass + gap in a line — scan for logic holes. */
function SvgConflictTacticianHeadStep2 () {
  const cx = 160
  const cy = 100
  const r = 34
  const gapHalf = 10
  const lineY = cy
  const leftLineEnd = cx - gapHalf
  const rightLineStart = cx + gapHalf
  const handleInset = r * 0.707
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
        r={r}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.75"
        strokeWidth="2.5"
      />
      <path
        d={`M ${cx + handleInset} ${cy + handleInset} L ${cx + handleInset + 40} ${cy + handleInset + 40}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.72"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d={`M 72 ${lineY} L ${leftLineEnd} ${lineY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M ${rightLineStart} ${lineY} L 248 ${lineY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Heart: two overlapping circles; overlap filled (shared ground). */
function SvgConflictTacticianHeartStep3 () {
  const reactId = useId()
  const clipRightId = `conflict-tactician-heart-r-${reactId.replace(/:/g, '')}`
  const cy = 100
  const r = 44
  const dx = 28
  const cx1 = 160 - dx
  const cx2 = 160 + dx
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <defs>
        <clipPath id={clipRightId}>
          <circle cx={cx2} cy={cy} r={r} />
        </clipPath>
      </defs>
      <circle
        cx={cx1}
        cy={cy}
        r={r}
        fill="#ffffff"
        fillOpacity="0.38"
        clipPath={`url(#${clipRightId})`}
      />
      <circle
        cx={cx1}
        cy={cy}
        r={r}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.5"
      />
      <circle
        cx={cx2}
        cy={cy}
        r={r}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.5"
      />
    </svg>
  )
}

/** Gut 4: one inverted-smile arc (∩) — soft reopening. */
function SvgConflictTacticianGutStep4 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d="M 64 82 Q 160 156 256 82"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.82"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Empath · Conflict — Heart 1: nested rings — settle inward, self-validate. */
function SvgConflictEmpathHeartStep1 () {
  const cx = 160
  const cy = 100
  const rings = [
    { r: 54, opacity: 0.22, sw: 2 },
    { r: 38, opacity: 0.38, sw: 2.25 },
    { r: 22, opacity: 0.62, sw: 2.5 },
  ] as const
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      {rings.map(({ r, opacity, sw }) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={opacity}
          strokeWidth={sw}
        />
      ))}
      <circle cx={cx} cy={cy} r="5" fill="#ffffff" fillOpacity="0.55" />
    </svg>
  )
}

/** Head 2: wavy “story” above, straight facts below — ground the narrative. */
function SvgConflictEmpathHeadStep2 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d="M 58 78 C 108 110 120 46 160 78 C 200 110 212 46 262 78"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.36"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M 64 124 L 256 124"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.92"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Gut 3: forward arrow + goalpost — name the next move clearly. */
function SvgConflictEmpathGutStep3 () {
  const y = 100
  const shaftEnd = 212
  const tipX = 242
  const postX = 252
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M 64 ${y} L ${shaftEnd} ${y}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={`M ${shaftEnd - 4} ${y - 13} L ${tipX} ${y} L ${shaftEnd - 4} ${y + 13}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M ${postX} ${y - 24} L ${postX} ${y + 24}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Defender · Conflict — Gut 1: stop octagon — halt fight-or-flight. */
function SvgConflictDefenderGutStep1 () {
  const cx = 160
  const cy = 100
  const r = 48
  const pts: string[] = []
  for (let k = 0; k < 8; k++) {
    const a = (-Math.PI / 2 + (k * Math.PI) / 4)
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`)
  }
  const d = `M ${pts.join(' L ')} Z`
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={d}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="2.75"
        strokeLinejoin="round"
      />
      <path
        d={`M ${cx} ${cy - 22} L ${cx} ${cy + 6}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy + 22} r="6" fill="#ffffff" fillOpacity="0.95" />
    </svg>
  )
}

/** Heart 2: same stacked waves as before, flipped vertically so the strongest wave sits on the top rung. */
function SvgConflictDefenderHeartStep2 () {
  const waves = [
    { d: 'M 64 76 Q 112 84 160 76 Q 208 68 256 76', opacity: 0.38 },
    { d: 'M 64 100 Q 112 124 160 100 Q 208 76 256 100', opacity: 0.52 },
    { d: 'M 64 124 Q 112 158 160 124 Q 208 90 256 124', opacity: 0.72 },
  ] as const
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <g
        transform="translate(0, 200) scale(1, -1)"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.25"
        strokeLinecap="round"
      >
        {waves.map((w) => (
          <path key={w.d} d={w.d} strokeOpacity={w.opacity} />
        ))}
      </g>
    </svg>
  )
}

/** Head 3: Y fork + dot — now vs then, which trigger is real? */
function SvgConflictDefenderHeadStep3 () {
  const forkY = 96
  const baseY = 162
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d={`M 160 ${baseY} L 160 ${forkY} L 98 52 M 160 ${forkY} L 222 52`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.86"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="160" cy={forkY} r="6" fill="#ffffff" fillOpacity="0.55" />
    </svg>
  )
}

/** Gut 4: redo ring — long arc with gap; small arrowhead only at the arc start (tangent hook), no chord across gap. */
function SvgConflictDefenderGutStep4 () {
  const cx = 160
  const cy = 100
  const r = 44
  const rad = (deg: number) => (deg * Math.PI) / 180
  const xy = (deg: number) => {
    const t = rad(deg)
    return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) }
  }
  const f = (p: { x: number; y: number }) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`
  const gapMidDeg = 322
  const gapHalfDeg = 23
  const arcStartDeg = gapMidDeg + gapHalfDeg
  const arcEndDeg = gapMidDeg - gapHalfDeg
  const start = xy(arcStartDeg)
  const end = xy(arcEndDeg)
  const arcD = `M ${f(start)} A ${r} ${r} 0 1 1 ${f(end)}`
  const θ = rad(arcStartDeg)
  const tanx = Math.sin(θ)
  const tany = -Math.cos(θ)
  const nx = Math.cos(θ)
  const ny = Math.sin(θ)
  const tip = { x: start.x + 11 * tanx, y: start.y + 11 * tany }
  const wing = 9.5
  const w1 = { x: start.x - 4 * tanx + wing * nx, y: start.y - 4 * tany + wing * ny }
  const w2 = { x: start.x - 4 * tanx - wing * nx, y: start.y - 4 * tany - wing * ny }
  const headD = `M ${f(w1)} L ${f(tip)} L ${f(w2)}`
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={arcD}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.86"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d={headD}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.92"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Advisor · Conflict — Heart 1: one honest line loud; faint rails = not the polished essay. */
function SvgConflictAdvisorHeartStep1 () {
  const cy = 100
  const lineW = 200
  const x0 = 160 - lineW / 2
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path
        d={`M ${x0} ${cy - 28} h${lineW}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M ${x0} ${cy + 28} h${lineW}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M ${x0 + 32} ${cy} h${lineW - 64}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.94"
        strokeWidth="3.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Head 2: lens on a knot — name the 'why' beneath the feeling. */
function SvgConflictAdvisorHeadStep2 () {
  const cx = 160
  const cy = 100
  const r = 34
  const handleInset = r * 0.707
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
        r={r}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.78"
        strokeWidth="2.5"
      />
      <path
        d={`M ${cx + handleInset} ${cy + handleInset} L ${cx + handleInset + 38} ${cy + handleInset + 38}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.72"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="7" fill="#ffffff" fillOpacity="0.5" />
    </svg>
  )
}

/** Gut 3: slash through rumination — decide, cut the rehash, close. */
function SvgConflictAdvisorGutStep3 () {
  const y = 108
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M 64 ${y} C 108 ${y - 18} 132 ${y + 22} 160 ${y} S 212 ${y - 20} 256 ${y}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.32"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M 92 148 L 228 72"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="3.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Doer · Conflict — Gut 1: pause bars — hold the tongue, choose silence. */
function SvgConflictDoerGutStep1 () {
  const y0 = 62
  const barH = 76
  const xL = 145
  const xR = 175
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M ${xL} ${y0} L ${xL} ${y0 + barH}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.92"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d={`M ${xR} ${y0} L ${xR} ${y0 + barH}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.92"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Head 2: observer frame + crosshair — third-party facts, not blame. */
function SvgConflictDoerHeadStep2 () {
  const x = 88
  const y = 52
  const w = 144
  const h = 96
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
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        ry="10"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.25"
      />
      <path
        d={`M ${cx} ${y + 18} L ${cx} ${y + h - 18}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d={`M ${x + 22} ${cy} L ${x + w - 22} ${cy}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Heart 3: ripples at the meeting point + two curves — soften, repair, reach out. */
function SvgConflictDoerHeartStep3 () {
  const cx = 160
  const cy = 88
  const ripples = [
    { r: 58, opacity: 0.2, sw: 2 },
    { r: 42, opacity: 0.28, sw: 2.1 },
    { r: 28, opacity: 0.34, sw: 2.2 },
  ] as const
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      {ripples.map(({ r, opacity, sw }) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={opacity}
          strokeWidth={sw}
        />
      ))}
      <path
        d="M 72 156 Q 72 72 160 88"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.78"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M 248 156 Q 248 72 160 88"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.78"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="5" fill="#ffffff" fillOpacity="0.55" />
    </svg>
  )
}

/** Gut 4: forward off the line — move on, conflict left behind. */
function SvgConflictDoerGutStep4 () {
  const y = 102
  const groundY = 154
  const shaftEnd = 208
  const tipX = 238
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
        strokeOpacity="0.35"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d={`M 76 ${y} L ${shaftEnd} ${y}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={`M ${shaftEnd - 4} ${y - 12} L ${tipX} ${y} L ${shaftEnd - 4} ${y + 12}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.94"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Engineer · Conflict — Gut 1: pause bars — stop the push. */
function SvgConflictEngineerGutStep1 () {
  const y0 = 62
  const barH = 76
  const xL = 145
  const xR = 175
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={`M ${xL} ${y0} L ${xL} ${y0 + barH}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.92"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d={`M ${xR} ${y0} L ${xR} ${y0 + barH}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.92"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Head 2: straight correction on top, wavy story below — name the fix out loud. */
function SvgConflictEngineerHeadStep2 () {
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d="M 58 128 C 108 160 120 96 160 128 C 200 160 212 96 262 128"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.36"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M 64 84 L 256 84"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.92"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Gut 3: one line — harsh zigzag left, easing into a smooth tail (tone settles). */
function SvgConflictEngineerGutStep3 () {
  const d =
    'M 62 100' +
    ' l 5 -20 l 5 20 l 5 -18 l 5 18 l 5 -16 l 5 16 l 5 -13 l 5 13' +
    ' l 5 -10 l 5 10 l 5 -7 l 5 7 l 5 -4 l 5 4 l 5 -2 l 5 2' +
    ' C 168 99 216 101 266 100'
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={d}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Heart 4: overlapping rings with shaded lens — restore connection. */
function SvgConflictEngineerHeartStep4 () {
  const reactId = useId()
  const clipRightId = `conflict-engineer-heart-r-${reactId.replace(/:/g, '')}`
  const cy = 100
  const r = 42
  const dx = 26
  const cx1 = 160 - dx
  const cx2 = 160 + dx
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <defs>
        <clipPath id={clipRightId}>
          <circle cx={cx2} cy={cy} r={r} />
        </clipPath>
      </defs>
      <circle
        cx={cx1}
        cy={cy}
        r={r}
        fill="#ffffff"
        fillOpacity="0.36"
        clipPath={`url(#${clipRightId})`}
      />
      <circle
        cx={cx1}
        cy={cy}
        r={r}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.5"
      />
      <circle
        cx={cx2}
        cy={cy}
        r={r}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.5"
      />
    </svg>
  )
}

/** Hero · Conflict — Gut 1: rounded square — box-breath frame to ride the surge. */
function SvgConflictHeroGutStep1 () {
  const s = 86
  const x = 160 - s / 2
  const y = 100 - s / 2
  const r = 14
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <rect
        x={x}
        y={y}
        width={s}
        height={s}
        rx={r}
        ry={r}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.75"
      />
      <rect
        x={x + 14}
        y={y + 14}
        width={s - 28}
        height={s - 28}
        rx={10}
        ry={10}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.32"
        strokeWidth="2"
      />
    </svg>
  )
}

/** Heart 2: dashed ring + solid core — feeling is temporary, center holds. */
function SvgConflictHeroHeartStep2 () {
  const cx = 160
  const cy = 100
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <circle
        cx={cx}
        cy={cy}
        r="44"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="2.25"
        strokeDasharray="10 8"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="10" fill="#ffffff" fillOpacity="0.55" />
    </svg>
  )
}

/** Head 3: stem + root forks — trace the misunderstanding down to its base. */
function SvgConflictHeroHeadStep3 () {
  const cx = 160
  const top = 58
  const joinY = 124
  const rootY = 156
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d={`M ${cx} ${top} L ${cx} ${joinY} L 104 ${rootY} M ${cx} ${joinY} L 216 ${rootY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.86"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Gut 4: large centered isometric cube — stable, grounded presence. */
function SvgConflictHeroGutStep4 () {
  const cx = 160
  const cy = 100
  const fw = 48
  const fh = 48
  const dx = 34
  const dy = -22
  const cube = {
    flt: { x: cx - fw, y: cy - fh },
    frt: { x: cx + fw, y: cy - fh },
    frb: { x: cx + fw, y: cy + fh },
    flb: { x: cx - fw, y: cy + fh },
    blt: { x: cx - fw + dx, y: cy - fh + dy },
    brt: { x: cx + fw + dx, y: cy - fh + dy },
    brb: { x: cx + fw + dx, y: cy + fh + dy },
    blb: { x: cx - fw + dx, y: cy + fh + dy },
  }
  const p = (o: { x: number; y: number }) => `${o.x} ${o.y}`
  const cubeD = [
    `M ${p(cube.flb)} L ${p(cube.frb)} L ${p(cube.frt)} L ${p(cube.flt)} Z`,
    `M ${p(cube.blb)} L ${p(cube.brb)} L ${p(cube.brt)} L ${p(cube.blt)} Z`,
    `M ${p(cube.flb)} L ${p(cube.blb)}`,
    `M ${p(cube.frb)} L ${p(cube.brb)}`,
    `M ${p(cube.frt)} L ${p(cube.brt)}`,
    `M ${p(cube.flt)} L ${p(cube.blt)}`,
  ].join(' ')
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={cubeD}
        fill="rgba(255, 255, 255, 0.06)"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="2.75"
        strokeLinejoin="miter"
      />
    </svg>
  )
}

/** Sovereign (balanced) · Conflict — Head 1: two views overlapping; brighter overlap = shared facts. */
function SvgConflictSovereignHeadStep1 () {
  const y = 52
  const h = 96
  const rx = 14
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <rect
        x="52"
        y={y}
        width="144"
        height={h}
        rx={rx}
        ry={rx}
        fill="rgba(255, 255, 255, 0.07)"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.5"
      />
      <rect
        x="124"
        y={y}
        width="144"
        height={h}
        rx={rx}
        ry={rx}
        fill="rgba(255, 255, 255, 0.07)"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.5"
      />
      <path
        d={`M 72 ${y + 28} h72 M 72 ${y + 48} h88 M 72 ${y + 68} h64`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.32"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={`M 176 ${y + 28} h72 M 168 ${y + 48} h80 M 184 ${y + 68} h72`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.32"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Heart 2: two paths converge on one aim — intentions aligned toward harmony. */
function SvgConflictSovereignHeartStep2 () {
  const cy = 118
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path
        d={`M 78 72 Q 118 108 160 ${cy} Q 202 108 242 72`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.38"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d={`M 78 72 Q 160 104 160 ${cy}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.72"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d={`M 242 72 Q 160 104 160 ${cy}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.72"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle
        cx="160"
        cy={cy}
        r="14"
        fill="rgba(255, 255, 255, 0.14)"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="2.5"
      />
      <circle cx="160" cy={cy} r="4.5" fill="#ffffff" fillOpacity="0.65" />
    </svg>
  )
}

/** Gut 3: closed loop + inner agreement line + anchor — resolution locked so it does not reopen. */
function SvgConflictSovereignGutStep3 () {
  const cx = 160
  const ringCy = 92
  const r = 46
  const groundY = 158
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
        cy={ringCy}
        r={r}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.78"
        strokeWidth="2.75"
      />

      <path
        d={`M ${cx} ${ringCy + r} L ${cx} ${groundY}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.72"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={groundY} r="6" fill="#ffffff" fillOpacity="0.88" />
    </svg>
  )
}
