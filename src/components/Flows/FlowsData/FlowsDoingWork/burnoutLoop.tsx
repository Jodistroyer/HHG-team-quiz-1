import { ContextCardArt, CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import type { FlowSituation, FlowStepArtProps } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const BURNOUT_LOOP_SITUATION_ID = 'burnout-loop' as const

export const burnoutLoopFlowSituation: FlowSituation = {
  id: BURNOUT_LOOP_SITUATION_ID,
  cardTitle: 'Burnout Loop',
  cardDescription: 'See how you can spiral into exhaustion at work.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Gut → Head',
      coreFunctions: 'Over-Analysis → Force → Rumination',
      whyThisOrder:
        'Mental Treadmill: You try to "solve" exhaustion with more thinking. When that fails, you force your body to keep up, leading to a permanent state of overthinking.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'The Solve Phase',
          body:
            'You notice the initial fatigue and immediately treat it like a logic puzzle. You spend hours researching productivity hacks or "optimizing" your calendar to find more time, which only adds to your mental load.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'The Force Phase',
          body:
            'When the new schedule fails to make you feel better, you override your body\'s signals. You drink more caffeine and force yourself to stay in the chair, using sheer willpower to compensate for a lack of genuine energy.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'The Rumination Phase',
          body:
            'The body eventually wins and you stall out. Your mind then enters a loop of "Why didn\'t that work?" and "What is wrong with my brain?" You are now too exhausted to act but too overstimulated to sleep.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Gut → Head → Gut',
      coreFunctions: 'Compulsion → Justification → Pushing',
      whyThisOrder:
        'Engine Fire: You feel the crash coming and respond by speeding up. You use logic to "prove" why you cannot stop, eventually blowing the engine entirely.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'The Compulsion Phase',
          body:
            'You feel the physical signs of the "crash" and your immediate instinct is to accelerate. You move faster and take on more tasks to outrun the feeling of being finished.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'The Justification Phase',
          body:
            'You create a list of reasons why stopping is impossible. You tell yourself that the world will fall apart if you take an hour off, using logical fallacies to support your refusal to rest.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Pushing Phase',
          body:
            'With your logic providing "cover," you push your physical limits until something breaks. You ignore pain or illness until your body effectively stages a coup and shuts down your ability to function.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Head',
      coreFunctions: 'Criticism → Guilt → Doubt',
      whyThisOrder:
        'Internal War: You think about what you should do, feel guilty for being tired, and then analyze why you are so "weak." You never actually move or rest.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'The Criticism Phase',
          body:
            'You look at your declining productivity and start a mental lecture. You compare your current output to your peak performance and find yourself lacking, creating a "Head" based standard you cannot meet.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'The Guilt Phase',
          body:
            'The criticism turns into a heavy emotional weight. You feel like you are failing your team or your family by being tired. This guilt consumes the very energy you need to actually do the work.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'The Doubt Phase',
          body:
            'You zoom back into analysis to figure out why you are so "weak." You oscillate between thinking and feeling until you are paralyzed, stuck in a loop of self-observation that leads to zero recovery.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Heart',
      coreFunctions: 'Comparison → Worry → Isolation',
      whyThisOrder:
        'Emotional Sinkhole: You feel overwhelmed and then look at everyone else\'s "success" (Head). This makes you feel even more inadequate, trapping you in a feeling of despair.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'The Comparison Phase',
          body:
            'You start by feeling "behind." You look at the polished lives of others and feel a deep sense of emotional inadequacy, convincing yourself that everyone else is handling life better than you.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'The Worry Phase',
          body:
            'You use your mind to build "worst case" scenarios. You imagine losing your job or losing respect because you are struggling, which turns a simple need for rest into a full blown identity crisis.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'The Isolation Phase',
          body:
            'To protect yourself from the perceived judgment of others, you withdraw. You hide your struggle, which prevents you from getting the support you need and traps you in a lonely sinkhole of exhaustion.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Gut → Heart → Gut',
      coreFunctions: 'Impulse → Drama → Over-extension',
      whyThisOrder:
        'Explosion: You react to burnout with frantic "doing." You get emotional about the stress and then try to work your way out of the feelings, causing a physical collapse.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'The Impulse Phase',
          body:
            'Burnout hits and you react with a "fight" response. You start new projects or say "yes" to five more things in a frantic attempt to prove to yourself that you still have the "drive."',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'The Drama Phase',
          body:
            'The over-extension leads to an emotional outburst. You feel victimized by your schedule or angry at the world for being so demanding, adding an unnecessary layer of emotional "heat" to your fatigue.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Over-extension Phase',
          body:
            'You try to "work through" the emotions. You use the adrenaline from your frustration to fuel one last massive push, which inevitably ends in a total physical collapse that takes weeks to recover from.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Heart',
      coreFunctions: 'Absorption → Over-intellectualizing → Shame',
      whyThisOrder:
        'Emotional Spiral: You absorb everyone else\'s stress, try to figure out "why" it hurts so much, and end up in a loop of feeling too much to ever take a break.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'The Absorption Phase',
          body:
            'You do not just feel your own burnout; you feel the stress of everyone around you. You take on the emotional baggage of the room, which doubles your internal weight before you have even started your own day.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'The Over-intellectualizing Phase',
          body:
            'You try to perform a psychological autopsy on your feelings. You spend all your energy trying to understand the "root cause" of your sadness instead of simply letting yourself take a nap.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'The Shame Phase',
          body:
            'When your analysis does not fix your feelings, you feel ashamed of your "sensitivity." You judge yourself for being too porous, which creates a new layer of emotional exhaustion that blocks actual rest.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Gut → Gut',
      coreFunctions: 'Resistance → Stubbornness → Collapse',
      whyThisOrder:
        'Stone Wall: You refuse to acknowledge the "Head" or "Heart." You simply try to "out-tough" burnout until your body physically gives out and forces a shutdown.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'The Resistance Phase',
          body:
            'You feel the burnout as a physical wall and you decide to push back. You tighten your jaw and harden your stance, refusing to change your routine or acknowledge that your capacity has diminished.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'The Stubbornness Phase',
          body:
            'You double down on the "grind." You ignore the Head\'s warnings and the Heart\'s cries for connection, viewing any need for rest as a personal betrayal of your own strength.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Collapse Phase',
          body:
            'Because there is no "give" in your system, you do not bend; you break. You hit a point of total physical shutdown where you literally cannot get out of bed, forced into a recovery you did not choose.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Gut → Head → Gut',
      coreFunctions: 'Aggression → Rationalization → Hardening',
      whyThisOrder:
        'Bulldozer: You treat your own fatigue as an enemy to be defeated. You rationalize why you do not need sleep and push until you lose all connection to your needs.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'The Aggression Phase',
          body:
            'You treat your fatigue like an intruder. You get "angry" at being tired and use that anger to fuel your activities, essentially using your own adrenaline as a toxic substitute for energy.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'The Rationalization Phase',
          body:
            'You tell yourself that sleep is for the "unproductive." You use high level concepts of "discipline" and "legacy" to justify why you are ignoring the basic biological needs of your body.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Hardening Phase',
          body:
            'You lose touch with your empathy for yourself and others. You become a "bulldozer" that moves through the day without feeling, reaching a state of hollow burnout where you are "doing" everything but feeling nothing.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Gut',
      coreFunctions: 'Panic → Insecurity → Over-activity',
      whyThisOrder:
        'Frenzy: You feel the physical crash and it scares you. You react with frantic activity to prove you are "fine," burning through your last reserves of adrenaline.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'The Panic Phase',
          body:
            'You feel the first sign of a physical crash and it triggers an "alarm" state. Your body senses the loss of control and enters a state of high alert, making it impossible to relax.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'The Insecurity Phase',
          body:
            'The physical panic turns into a fear that you are losing your "edge." You worry that if you stop moving, you will never be able to start again, making rest feel like a dangerous risk.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Over-activity Phase',
          body:
            'You enter a "frenzy" of meaningless tasks. You clean the house, answer every email, and run errands at 9:00 PM just to prove you are not "crashing," which burns through your final reserves.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head + Heart + Gut (loop)',
      coreFunctions: 'Hesitation → Self-Judgment → Stalling',
      whyThisOrder:
        'Gridlock: You see all the ways you are failing, feel the weight of it, and try to do a little of everything. You end up doing nothing well and staying stuck in a "Grey Zone."',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'The Hesitation Phase',
          body:
            'You see the burnout coming from all angles. You analyze the logic, the emotion, and the physical cost simultaneously, which causes you to freeze instead of taking a single effective action.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'The Self-Judgment Phase',
          body:
            'You feel bad for being stuck. You look at how "balanced" you are supposed to be and judge yourself for failing to maintain that equilibrium, adding emotional pressure to your existing mental gridlock.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Stalling Phase',
          body:
            'You try to do "a little bit of everything" to keep the balance. You work a little, rest a little, and think a little, but because none of it is a "full" choice, you stay in a "Grey Zone" of semi-exhaustion.',
        },
      ],
    },
  },
}

/** Doing Work · Burnout loop — tightening spiral (Head / Heart / Gut draining together). */
export function BurnoutLoopCardArt () {
  const bg = CONTEXT_BACKGROUND[2]
  const cx = 160
  const rMid = 78
  const rInner = 48
  const cy = 90 - (rMid - rInner) / 2
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={bg} />
      <path
        d={`M ${cx - rMid} ${cy} A ${rMid} ${rMid} 0 1 0 ${cx + rMid} ${cy} A ${rInner} ${rInner} 0 1 1 ${cx - rInner} ${cy}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={cx} cy={cy} r="8" fill="#ffffff" fillOpacity="0.45" />
    </svg>
  )
}

const AUDIT_STEP_BG = '#2563C8'
const WARMTH_STEP_BG = '#C2385A'
const STANCE_STEP_BG = '#1A9E6E'

export function BurnoutLoopStepArt ({
  contextId,
  variantId,
  stepIndex,
  brain,
}: FlowStepArtProps) {
  if (variantId === 'head-strong') {
    if (stepIndex === 0 && brain === 'Head') return <SvgBurnoutThinkerHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgBurnoutThinkerGutStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgBurnoutThinkerHeadStep3 />
  }

  if (variantId === 'head-gut') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgBurnoutTacticianGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgBurnoutTacticianHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgBurnoutTacticianGutStep3 />
  }

  if (variantId === 'head-heart') {
    if (stepIndex === 0 && brain === 'Head') return <SvgBurnoutDiplomatHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgBurnoutDiplomatHeartStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgBurnoutDiplomatHeadStep3 />
  }

  if (variantId === 'heart-strong') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgBurnoutEmpathHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgBurnoutEmpathHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgBurnoutEmpathHeartStep3 />
  }

  if (variantId === 'heart-gut') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgBurnoutDefenderGutStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgBurnoutDefenderHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgBurnoutDefenderGutStep3 />
  }

  if (variantId === 'heart-head') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgBurnoutAdvisorHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgBurnoutAdvisorHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgBurnoutAdvisorHeartStep3 />
  }

  if (variantId === 'gut-strong') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgBurnoutDoerGutStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgBurnoutDoerGutStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgBurnoutDoerGutStep3 />
  }

  if (variantId === 'gut-head') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgBurnoutEngineerGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgBurnoutEngineerHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgBurnoutEngineerGutStep3 />
  }

  if (variantId === 'gut-heart') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgBurnoutHeroGutStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgBurnoutHeroHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgBurnoutHeroGutStep3 />
  }

  if (variantId === 'balanced') {
    if (stepIndex === 0 && brain === 'Head') return <SvgBurnoutSovereignHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgBurnoutSovereignHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgBurnoutSovereignGutStep3 />
  }

  return <ContextCardArt id={contextId} />
}

/** Thinker · Head 1: Solve — logic grid / puzzle framing. */
function SvgBurnoutThinkerHeadStep1 () {
  const g = 28
  const x0 = 160 - 1.5 * g
  const y0 = 100 - 1.5 * g
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={x0 + col * g}
            y={y0 + row * g}
            width={g - 6}
            height={g - 6}
            rx="4"
            fill="none"
            stroke="#ffffff"
            strokeOpacity={row === 1 && col === 1 ? 0.9 : 0.35}
            strokeWidth="2.25"
          />
        ))
      )}
    </svg>
  )
}

/** Gut 2: Force — push through the body’s “no.” */
function SvgBurnoutThinkerGutStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d="M 160 52 L 160 118"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 160 118 L 160 156 M 148 144 L 160 156 L 172 144"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Head 3: Rumination — closed loop of “why didn’t that work?” */
function SvgBurnoutThinkerHeadStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d="M 220 100 A 60 60 0 1 1 219.9 100"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M 196 100 A 36 36 0 1 1 195.9 100"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Tactician · Gut 1: Compulsion — speed lines, outrunning the crash. */
function SvgBurnoutTacticianGutStep1 () {
  const ys = [76, 100, 124]
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      {ys.map((y) => (
        <path
          key={y}
          d={`M 72 ${y} L 248 ${y}`}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="14 10"
        />
      ))}
    </svg>
  )
}

/** Head 2: Justification — “reasons” wall beside a narrowing gap. */
function SvgBurnoutTacticianHeadStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path d="M 72 64 h88 M 72 88 h96 M 72 112 h72 M 72 136 h100" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
      <path d="M 212 52 L 212 148" fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/** Gut 3: Pushing — arrow through the limit bar. */
function SvgBurnoutTacticianGutStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path d="M 228 64 L 228 136" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 88 100 L 200 100" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M 200 88 L 218 100 L 200 112" fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Diplomat · Head 1: Criticism — declining “output” bars vs an impossible standard. */
function SvgBurnoutDiplomatHeadStep1 () {
  const left = 88
  const base = 138
  const widths = [112, 78, 52]
  const ys = [58, 88, 118]
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path d={`M ${left} 44 L ${left} ${base}`} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
      {widths.map((w, i) => (
        <path
          key={w}
          d={`M ${left} ${ys[i]} h${w}`}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.85 - i * 0.22}
          strokeWidth={3 - i * 0.35}
          strokeLinecap="round"
        />
      ))}
      <path d="M 216 52 L 248 128" fill="none" stroke="#ffffff" strokeOpacity="0.42" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Heart 2: Guilt — heavy arc pressing downward on the center. */
function SvgBurnoutDiplomatHeartStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path
        d="M 56 72 Q 160 168 264 72"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.38"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M 72 78 Q 160 152 248 78"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.78"
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <circle cx="160" cy="118" r="8" fill="#ffffff" fillOpacity="0.5" />
    </svg>
  )
}

/** Head 3: Doubt — figure-eight / stuck between think and feel. */
function SvgBurnoutDiplomatHeadStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d="M 160 100 C 96 52 96 148 160 100 C 224 52 224 148 160 100"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.82"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle cx="160" cy="100" r="5" fill="#ffffff" fillOpacity="0.45" />
    </svg>
  )
}

/** Empath · Heart 1: Comparison — uneven pillars, “behind.” */
function SvgBurnoutEmpathHeartStep1 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path d="M 118 148 L 118 72" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" />
      <path d="M 202 148 L 202 52" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/** Head 2: Worry — worst-case staircase up. */
function SvgBurnoutEmpathHeadStep2 () {
  const pts = [64, 108, 132, 152, 176, 200, 224, 256]
  const d = pts.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${148 - i * 14}`).join(' ')
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path d={d} fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Heart 3: Isolation — ring almost closed, small interior. */
function SvgBurnoutEmpathHeartStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path
        d="M 118 100 A 42 42 0 1 1 202 100"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.82"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle cx="160" cy="100" r="14" fill="rgba(255, 255, 255, 0.08)" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="2" />
    </svg>
  )
}

/** Defender · Gut 1: Impulse — burst outward. */
function SvgBurnoutDefenderGutStep1 () {
  const cx = 160
  const cy = 100
  const rays = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      {rays.map((deg) => {
        const r = (deg * Math.PI) / 180
        const x2 = cx + Math.cos(r) * 56
        const y2 = cy + Math.sin(r) * 56
        return (
          <path
            key={deg}
            d={`M ${cx + Math.cos(r) * 18} ${cy + Math.sin(r) * 18} L ${x2} ${y2}`}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.55"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
        )
      })}
      <circle cx={cx} cy={cy} r="12" fill="#ffffff" fillOpacity="0.35" />
    </svg>
  )
}

/** Heart 2: Drama — sharp stacked waves. */
function SvgBurnoutDefenderHeartStep2 () {
  const waves = ['M 52 88 L 88 72 L 124 104 L 160 68 L 196 108 L 232 70 L 268 92', 'M 52 118 L 96 132 L 140 96 L 180 126 L 224 100 L 268 118']
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      {waves.map((d) => (
        <path key={d} d={d} fill="none" stroke="#ffffff" strokeOpacity="0.72" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  )
}

/** Gut 3: Over-extension — long arrow past a soft limit. */
function SvgBurnoutDefenderGutStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path d="M 200 76 L 200 124" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 72 100 L 232 100" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M 232 88 L 252 100 L 232 112" fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Advisor · Heart 1: Absorption — inward arrows from the rim. */
function SvgBurnoutAdvisorHeartStep1 () {
  const cx = 160
  const cy = 100
  const pts = [
    { x: 72, y: 56 },
    { x: 248, y: 56 },
    { x: 56, y: 112 },
    { x: 264, y: 112 },
    { x: 100, y: 156 },
    { x: 220, y: 156 },
  ]
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      {pts.map((p) => (
        <path
          key={`${p.x}-${p.y}`}
          d={`M ${p.x} ${p.y} L ${cx + (p.x - cx) * 0.35} ${cy + (p.y - cy) * 0.35}`}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
      ))}
      <circle cx={cx} cy={cy} r="22" fill="none" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="2.5" />
    </svg>
  )
}

/** Head 2: Over-intellectualizing — lens on a tangle. */
function SvgBurnoutAdvisorHeadStep2 () {
  const cx = 160
  const cy = 100
  const r = 34
  const h = r * 0.707
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path
        d="M 88 124 C 120 72 200 72 232 124"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.38"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" />
      <path d={`M ${cx + h} ${cy + h} L ${cx + h + 36} ${cy + h + 36}`} fill="none" stroke="#ffffff" strokeOpacity="0.72" strokeWidth="2.75" strokeLinecap="round" />
    </svg>
  )
}

/** Heart 3: Shame — tightening rings. */
function SvgBurnoutAdvisorHeartStep3 () {
  const cx = 160
  const cy = 100
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      {[52, 38, 24].map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity={0.28 + i * 0.18} strokeWidth="2.25" />
      ))}
      <circle cx={cx} cy={cy} r="6" fill="#ffffff" fillOpacity="0.45" />
    </svg>
  )
}

/** Doer · Gut 1: Resistance — wall bars. */
function SvgBurnoutDoerGutStep1 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M ${104 + i * 36} 56 L ${104 + i * 36} 144`} fill="none" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="4" strokeLinecap="round" />
      ))}
    </svg>
  )
}

/** Gut 2: Stubbornness — parallel down arrows (double down on grind). */
function SvgBurnoutDoerGutStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path d="M 132 68 L 132 120 M 124 108 L 132 120 L 140 108" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 188 68 L 188 120 M 180 108 L 188 120 L 196 108" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Gut 3: Collapse — flat line / empty tank. */
function SvgBurnoutDoerGutStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path d="M 56 118 L 264 118" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 56 132 L 264 132" fill="none" stroke="#ffffff" strokeOpacity="0.72" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="160" cy="118" r="5" fill="#ffffff" fillOpacity="0.25" />
    </svg>
  )
}

/** Engineer · Gut 1: Aggression — jagged strike at fatigue. */
function SvgBurnoutEngineerGutStep1 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d="M 88 132 L 118 68 L 148 132 L 178 72 L 208 132 L 238 76 L 268 132"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.85"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Head 2: Rationalization — tidy “discipline” script lines. */
function SvgBurnoutEngineerHeadStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path d="M 72 72 h176 M 72 96 h160 M 72 120 h168 M 72 144 h152" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  )
}

/** Gut 3: Hardening — hollow block, feeling switched off. */
function SvgBurnoutEngineerGutStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <rect x="108" y="64" width="104" height="72" rx="8" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3.25" />
      <path d="M 132 100 L 188 100" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Hero · Gut 1: Panic — radiating ticks from a tight core. */
function SvgBurnoutHeroGutStep1 () {
  const cx = 160
  const cy = 100
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        const x1 = cx + Math.cos(a) * 22
        const y1 = cy + Math.sin(a) * 22
        const x2 = cx + Math.cos(a) * 58
        const y2 = cy + Math.sin(a) * 58
        return <path key={i} d={`M ${x1} ${y1} L ${x2} ${y2}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      })}
      <circle cx={cx} cy={cy} r="10" fill="#ffffff" fillOpacity="0.4" />
    </svg>
  )
}

/** Heart 2: Insecurity — wobbly ellipse around a small core. */
function SvgBurnoutHeroHeartStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path
        d="M 96 100 Q 160 132 224 100 Q 160 68 96 100"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.72"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <circle cx="160" cy="100" r="6" fill="#ffffff" fillOpacity="0.55" />
    </svg>
  )
}

/** Gut 3: Over-activity — scatter of short motion strokes. */
function SvgBurnoutHeroGutStep3 () {
  const strokes = [
    [72, 92, 92, 72],
    [240, 78, 220, 98],
    [88, 132, 108, 118],
    [228, 128, 248, 112],
    [140, 52, 160, 72],
    [180, 148, 200, 128],
  ] as const
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      {strokes.map(([x1, y1, x2, y2]) => (
        <path key={`${x1}-${y1}`} d={`M ${x1} ${y1} L ${x2} ${y2}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
      ))}
    </svg>
  )
}

/** Sovereign · Head 1: Hesitation — three equal pulls, no winner. */
function SvgBurnoutSovereignHeadStep1 () {
  const cx = 160
  const cy = 100
  const arms = [
    { x: 160, y: 52 },
    { x: 96, y: 138 },
    { x: 224, y: 138 },
  ]
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      {arms.map((p) => (
        <path key={`${p.x}`} d={`M ${cx} ${cy} L ${p.x} ${p.y}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <circle cx={cx} cy={cy} r="10" fill="#ffffff" fillOpacity="0.35" />
    </svg>
  )
}

/** Heart 2: Self-judgment — tilted balance, “supposed to be balanced.” */
function SvgBurnoutSovereignHeartStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path d="M 104 88 L 216 104" fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M 160 104 L 160 132" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M 118 132 L 118 148 M 202 132 L 202 156" fill="none" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Gut 3: Stalling — dotted orbit, grey-zone drift. */
function SvgBurnoutSovereignGutStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <circle
        cx="160"
        cy="100"
        r="52"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.45"
        strokeWidth="2.25"
        strokeDasharray="6 10"
        strokeLinecap="round"
      />
      <circle cx="160" cy="100" r="8" fill="#ffffff" fillOpacity="0.3" />
    </svg>
  )
}
