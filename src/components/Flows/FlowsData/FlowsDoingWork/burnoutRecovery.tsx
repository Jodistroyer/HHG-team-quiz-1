import { ContextCardArt, CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import type { FlowSituation, FlowStepArtProps } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const BURNOUT_RECOVERY_SITUATION_ID = 'burnout-recovery' as const

export const burnoutRecoveryFlowSituation: FlowSituation = {
  id: BURNOUT_RECOVERY_SITUATION_ID,
  cardTitle: 'Burnout Recovery',
  cardDescription: 'How to recover the best way possible.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Compassion → Perspective → Boundaries',
      whyThisOrder:
        'Softens the Critic: You try to "think" your way out of burnout. Leading with the Heart stops the self-judgment so you can logically reassess your load.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Radical self compassion',
          body:
            'Stop the internal lecture. Acknowledge that being tired is a human reality, not a failure of character. By softening your inner critic, you prevent the mental exhaustion from turning into a spiral of shame.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Audit your mental load',
          body:
            'Now that the judgment is gone, look at your to-do list objectively. Categorize tasks into "essential" and "delegatable." Use your logic to see that your current output is mathematically unsustainable.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Set physical boundaries',
          body:
            'Turn off your notifications and close your laptop. Use your body to signal that the workday is over. Physically removing yourself from your workspace anchors the decision to stop.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Self-Care → Capacity → Planning',
      whyThisOrder:
        'Restores the Battery: You usually just push harder. You must feel the exhaustion (Heart) and physically stop (Gut) before your brain is allowed to strategize.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Honor the exhaustion',
          body:
            'Sit with the feeling of being tired without trying to solve it. Admitting you are depleted allows the nervous system to shift from "fight" mode to "recovery" mode.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Enforce a hard stop',
          body:
            'Physically stop moving. Whether it is a nap or a silent walk, your body needs to experience a total lack of "doing" before your brain can think clearly again.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Redesign the schedule',
          body:
            'With a rested body, plan a more sustainable pace for the next week. Use your strategic mind to build in "white space" that protects you from hitting zero again.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Solitude → Reflection → Clarity',
      whyThisOrder:
        'Stops the Leak: You are over-extended. You need physical distance (Gut) to feel your own emotions again without the "Head" over-analyzing the fatigue.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Seek total solitude',
          body:
            'Physically remove yourself from other people\'s energy. Go to a room alone or take a solo drive. You need a physical "container" where no one is asking anything of you.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Feel the fatigue',
          body:
            'In the quiet, let your emotions surface. Are you sad, frustrated, or just empty? Identifying the specific "flavor" of your burnout helps you understand what you truly need.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Define the path to clarity',
          body:
            'Ask yourself what one change would provide the most relief. Focus on a singular, logical adjustment rather than trying to fix your entire life at once.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Objectivity → Validation → Release',
      whyThisOrder:
        'Creates Stability: You feel the weight of everyone\'s needs. Logic (Head) helps you see that you are not responsible for everything, allowing your Heart to rest.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Apply objective facts',
          body:
            'Remind yourself of the data: you have 24 hours in a day and limited energy. Realizing you literally cannot do everything helps detach your self-worth from your productivity.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Validate your limits',
          body:
            'Tell yourself it is okay to let people down to save yourself. You are not a bottomless well of support. Validating your right to say "no" provides instant emotional relief.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Release the weight',
          body:
            'Physically drop your shoulders and exhale. Let go of the tasks that are not yours to carry. Use your Gut to say "no" to new requests without offering a long explanation.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Logic → Rest → Nurture',
      whyThisOrder:
        'Interrupts the Hustle: You react to stress by doing and feeling. Using the Head to "schedule" rest as a non-negotiable fact protects your physical energy.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Schedule your rest',
          body:
            'Treat recovery like a mandatory meeting. Put "do nothing" on your calendar. When it is a "fact" on paper, your Head will stop trying to find more work for your Gut to do.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Prioritize physical rest',
          body:
            'Go to bed early or sit in a dark room. Your body needs a "sensory blackout" to recover from the hustle. Focus on the physical sensation of gravity holding you down.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Engage in low-stakes nurture',
          body:
            'Do something purely for the joy of it, like reading or a hobby. Shift from "producing" to "receiving." This refills the Heart after the long period of giving.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Space → Priorities → Joy',
      whyThisOrder:
        'Grounds the Spiral: You feel and think in circles. You need to physically remove yourself from the environment (Gut) to sort out what actually matters.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Create physical space',
          body:
            'Leave the environment that is stressing you out. A change of scenery breaks the mental loop and gives your nervous system a fresh start.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Rank your priorities',
          body:
            'Write down everything on your mind and pick the top three. Ignore the rest. Using your Head to simplify your focus prevents the "everything is urgent" panic.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Reconnect with joy',
          body:
            'Find one small thing that makes you feel like "you" again. Whether it is music or a favorite meal, use your Heart to remind yourself that life is more than just a list of problems to solve.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Kindness → Audit → Renewal',
      whyThisOrder:
        'Relaxes the Guard: You are used to carrying the world. Leading with Heart allows you to admit you are tired so you can logically cut the "dead weight" tasks.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Acknowledge the fatigue',
          body:
            'Admit "I am tired" out loud. For a Gut Strong person, admitting vulnerability is the first step to lowering the defensive shield that is keeping you in burnout.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Audit for "dead weight"',
          body:
            'Identify the habits or tasks that are draining you without providing any return. Use your mind to ruthlessly cut away anything that is not absolutely necessary for survival right now.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Renew your energy',
          body:
            'Find a physical activity that restores you rather than drains you. This might be yoga, gardening, or stretching. Move your body in a way that feels like a gift, not a chore.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Empathy → Efficiency → Pacing',
      whyThisOrder:
        'Lowers the Stakes: You treat life like a mission. Connecting with yourself first prevents you from turning your "recovery" into just another high-pressure project.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Practice self-empathy',
          body:
            'Treat yourself with the same kindness you would show a tired friend. Lowering your internal expectations prevents you from turning your "self-care" into a competitive sport.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Analyze your efficiency',
          body:
            'Look for where you are "over-working" tasks. Are you spending two hours on something that takes thirty minutes? Streamlining your efforts saves energy for actual rest.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Set a sustainable pace',
          body:
            'Deliberately move slower. Walk slower, talk slower, and eat slower. Forcing your Gut to downshift prevents you from accidentally slipping back into "mission mode."',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Structure → Comfort → Stamina',
      whyThisOrder:
        'Provides a Container: You feel the burnout physically and emotionally. You need a logical plan (Head) to feel safe enough to actually relax and recharge.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Build a recovery structure',
          body:
            'Create a simple plan for your evening or weekend. Knowing there is a "plan" to relax makes the Head feel safe enough to let the Gut and Heart actually let go.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Seek sensory comfort',
          body:
            'Focus on soft textures, warm drinks, or comforting scents. Using your Heart to seek "coziness" helps soothe the physical and emotional irritation of burnout.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Build lasting stamina',
          body:
            'Once you feel a bit of energy return, do not spend it all at once. Use your Gut to hold back and "bank" your energy, building a reserve for the future instead of immediately burning it.',
        },
      ],
    },
    balanced: {
      archetype: 'Hybrid',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Withdrawal → Simplification → Ease',
      whyThisOrder:
        'Protects the Core: You try to stay balanced for everyone. You must pull back physically (Gut) to simplify your life and find your internal peace again.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Physical withdrawal',
          body:
            'Step away from the demands of the world. Silence your phone and create a "no-go" zone for work or chores. Your recovery starts with a physical boundary.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Simplify the landscape',
          body:
            'Mentally strip your life down to the basics for 24 hours. Focus only on eating, sleeping, and breathing. This simplification clears the mental clutter that feeds burnout.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Find your ease',
          body:
            'Let yourself exist without a goal. Experience the "ease" of being alive without having to be useful. This restores the balance between your internal self and the external world.',
        },
      ],
    },
  },
}

/** Doing Work · Burnout recovery — circle + stacked ovals (head, torso, base). */
export function BurnoutRecoveryCardArt () {
  const bg = CONTEXT_BACKGROUND[2]
  const cx = 160
  const gap = 16
  const headR = 17
  const smallRx = 36
  const smallRy = 13
  const largeRx = 52
  const largeRy = 15
  const stackH = headR * 2 + gap + smallRy * 2 + gap + largeRy * 2
  const topY = (200 - stackH) / 2
  const headY = topY + headR
  const smallCy = headY + headR + gap + smallRy
  const largeCy = smallCy + smallRy + gap + largeRy
  const stroke = {
    fill: 'rgba(255, 255, 255, 0.08)',
    stroke: '#ffffff',
    strokeWidth: 2.5,
  } as const
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={bg} />
      <ellipse
        cx={cx}
        cy={largeCy}
        rx={largeRx}
        ry={largeRy}
        fill={stroke.fill}
        stroke={stroke.stroke}
        strokeOpacity="0.88"
        strokeWidth={stroke.strokeWidth}
      />
      <ellipse
        cx={cx}
        cy={smallCy}
        rx={smallRx}
        ry={smallRy}
        fill={stroke.fill}
        stroke={stroke.stroke}
        strokeOpacity="0.78"
        strokeWidth={stroke.strokeWidth}
      />
      <circle
        cx={cx}
        cy={headY}
        r={headR}
        fill={stroke.fill}
        stroke={stroke.stroke}
        strokeOpacity="0.82"
        strokeWidth={stroke.strokeWidth}
      />
    </svg>
  )
}

const AUDIT_STEP_BG = '#2563C8'
const WARMTH_STEP_BG = '#C2385A'
const STANCE_STEP_BG = '#1A9E6E'

export function BurnoutRecoveryStepArt ({
  contextId,
  variantId,
  stepIndex,
  brain,
}: FlowStepArtProps) {
  if (variantId === 'head-strong') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgRecoveryThinkerHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgRecoveryThinkerHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgRecoveryThinkerGutStep3 />
  }

  if (variantId === 'head-gut') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgRecoveryTacticianHeartStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgRecoveryTacticianGutStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgRecoveryTacticianHeadStep3 />
  }

  if (variantId === 'head-heart') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgRecoveryDiplomatGutStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgRecoveryDiplomatHeartStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgRecoveryDiplomatHeadStep3 />
  }

  if (variantId === 'heart-strong') {
    if (stepIndex === 0 && brain === 'Head') return <SvgRecoveryEmpathHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgRecoveryEmpathHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgRecoveryEmpathGutStep3 />
  }

  if (variantId === 'heart-gut') {
    if (stepIndex === 0 && brain === 'Head') return <SvgRecoveryDefenderHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgRecoveryDefenderGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgRecoveryDefenderHeartStep3 />
  }

  if (variantId === 'heart-head') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgRecoveryAdvisorGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgRecoveryAdvisorHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgRecoveryAdvisorHeartStep3 />
  }

  if (variantId === 'gut-strong') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgRecoveryDoerHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgRecoveryDoerHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgRecoveryDoerGutStep3 />
  }

  if (variantId === 'gut-head') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgRecoveryEngineerHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgRecoveryEngineerHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgRecoveryEngineerGutStep3 />
  }

  if (variantId === 'gut-heart') {
    if (stepIndex === 0 && brain === 'Head') return <SvgRecoveryHeroHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgRecoveryHeroHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgRecoveryHeroGutStep3 />
  }

  if (variantId === 'balanced') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgRecoverySovereignGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgRecoverySovereignHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgRecoverySovereignHeartStep3 />
  }

  return <ContextCardArt id={contextId} />
}

/** Thinker · Heart 1: soft brackets — radical self-compassion. */
function SvgRecoveryThinkerHeartStep1 () {
  const cx = 160
  const cy = 100
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path d={`M ${cx - 52} ${cy - 36} Q ${cx - 72} ${cy} ${cx - 52} ${cy + 36}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
      <path d={`M ${cx + 52} ${cy - 36} Q ${cx + 72} ${cy} ${cx + 52} ${cy + 36}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="8" fill="#ffffff" fillOpacity="0.5" />
    </svg>
  )
}

/** Head 2: two columns — essential vs delegatable. */
function SvgRecoveryThinkerHeadStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path d="M 160 52 L 160 148" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
      <path d="M 88 72 h48 M 88 96 h56 M 88 120 h40" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M 184 72 h52 M 184 96 h44 M 184 120 h48" fill="none" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 8" />
    </svg>
  )
}

/** Gut 3: single house outline — physical boundary, leave work behind. */
function SvgRecoveryThinkerGutStep3 () {
  const cx = 160
  const halfW = 64
  const baseY = 148
  const wallY = 92
  const peakY = 56
  const houseD = `M ${cx - halfW} ${baseY} L ${cx + halfW} ${baseY} L ${cx + halfW} ${wallY} L ${cx} ${peakY} L ${cx - halfW} ${wallY} Z`
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path
        d={houseD}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.88"
        strokeWidth="2.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Tactician · Heart 1: flat rest line — honor exhaustion without fixing. */
function SvgRecoveryTacticianHeartStep1 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path d="M 64 108 L 256 108" fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="3.25" strokeLinecap="round" />
      <circle cx="160" cy="108" r="5" fill="#ffffff" fillOpacity="0.45" />
    </svg>
  )
}

/** Gut 2: full-width barrier — enforce a hard stop. */
function SvgRecoveryTacticianGutStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path d="M 56 100 L 264 100" fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="4" strokeLinecap="round" />
      <path d="M 160 68 L 160 132" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Head 3: week blocks with white-space gaps — redesign the schedule. */
function SvgRecoveryTacticianHeadStep3 () {
  const blockW = 32
  const blockH = 36
  const gap = 14
  const count = 5
  const totalW = count * blockW + (count - 1) * gap
  const x0 = 160 - totalW / 2
  const yTop = 67
  const yBot = 97
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      {Array.from({ length: count }, (_, i) => (
        <rect
          key={i}
          x={x0 + i * (blockW + gap)}
          y={i % 2 === 0 ? yTop : yBot}
          width={blockW}
          height={blockH}
          rx="6"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={i === 2 ? 0.32 : 0.78}
          strokeWidth="2.25"
        />
      ))}
    </svg>
  )
}

/** Diplomat · Gut 1: solo room — total solitude. */
function SvgRecoveryDiplomatGutStep1 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <rect x="108" y="56" width="104" height="104" rx="10" fill="rgba(255, 255, 255, 0.06)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" />
      <circle cx="160" cy="108" r="7" fill="#ffffff" fillOpacity="0.55" />
    </svg>
  )
}

/** Heart 2: stacked tones — name the flavor of fatigue. */
function SvgRecoveryDiplomatHeartStep2 () {
  const layers = [
    { y: 118, w: 160, opacity: 0.35 },
    { y: 100, w: 136, opacity: 0.55 },
    { y: 82, w: 112, opacity: 0.78 },
  ]
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      {layers.map(({ y, w, opacity }) => (
        <path key={y} d={`M ${160 - w / 2} ${y} Q 160 ${y - 18} ${160 + w / 2} ${y}`} fill="none" stroke="#ffffff" strokeOpacity={opacity} strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  )
}

/** Head 3: one clear path through noise — single relief change. */
function SvgRecoveryDiplomatHeadStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path d="M 72 72 L 248 72 M 72 128 L 248 128 M 88 100 L 232 100" fill="none" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />
      <path d="M 160 52 L 160 148" fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="3.25" strokeLinecap="round" />
    </svg>
  )
}

/** Empath · Head 1: 24-hour slice — objective capacity limit. */
function SvgRecoveryEmpathHeadStep1 () {
  const cx = 160
  const cy = 100
  const r = 48
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.5" />
      <path d={`M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx + r * 0.866} ${cy - r * 0.5} Z`} fill="rgba(255, 255, 255, 0.14)" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

/** Heart 2: dashed outer, solid inner — limits are valid. */
function SvgRecoveryEmpathHeartStep2 () {
  const cx = 160
  const cy = 100
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <circle cx={cx} cy={cy} r="48" fill="none" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="2.25" strokeDasharray="8 7" />
      <circle cx={cx} cy={cy} r="22" fill="rgba(255, 255, 255, 0.1)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" />
    </svg>
  )
}

/** Gut 3: shoulders drop — release the weight. */
function SvgRecoveryEmpathGutStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path d="M 88 88 L 128 104 L 192 104 L 232 88" fill="none" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 104 112 L 144 128 L 176 128 L 216 112" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Defender · Head 1: calendar block marked rest — schedule recovery. */
function SvgRecoveryDefenderHeadStep1 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <rect x="88" y="56" width="144" height="112" rx="12" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" />
      <rect x="108" y="108" width="104" height="40" rx="8" fill="rgba(255, 255, 255, 0.14)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" />
    </svg>
  )
}

/** Gut 2: horizontal rest + downward pull — sensory blackout, gravity. */
function SvgRecoveryDefenderGutStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path d="M 72 92 L 248 92" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 128 92 L 128 148 M 160 92 L 160 156 M 192 92 L 192 148" fill="none" stroke="#ffffff" strokeOpacity="0.72" strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  )
}

/** Heart 3: open bowl — receiving nurture, not producing. */
function SvgRecoveryDefenderHeartStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path d="M 96 88 Q 160 156 224 88" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M 112 96 Q 160 132 208 96" fill="none" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Advisor · Gut 1: doorframe opening to horizon — new scenery. */
function SvgRecoveryAdvisorGutStep1 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path d="M 120 148 L 120 68 L 200 68 L 200 148" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinejoin="round" />
      <path d="M 128 108 L 256 108" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
      <circle cx="220" cy="108" r="4" fill="#ffffff" fillOpacity="0.5" />
    </svg>
  )
}

/** Head 2: ranked bars — top three priorities only. */
function SvgRecoveryAdvisorHeadStep2 () {
  const bars = [
    { x: 108, h: 72 },
    { x: 148, h: 52 },
    { x: 188, h: 36 },
  ]
  const base = 148
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      {bars.map(({ x, h }) => (
        <path key={x} d={`M ${x} ${base} L ${x} ${base - h} L ${x + 28} ${base - h} L ${x + 28} ${base} Z`} fill="rgba(255, 255, 255, 0.1)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.25" strokeLinejoin="round" />
      ))}
    </svg>
  )
}

/** Heart 3: small spark — reconnect with joy. */
function SvgRecoveryAdvisorHeartStep3 () {
  const cx = 160
  const cy = 100
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const r = (deg * Math.PI) / 180
        return (
          <path
            key={deg}
            d={`M ${cx + Math.cos(r) * 14} ${cy + Math.sin(r) * 14} L ${cx + Math.cos(r) * 38} ${cy + Math.sin(r) * 38}`}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.55"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
        )
      })}
      <circle cx={cx} cy={cy} r="9" fill="#ffffff" fillOpacity="0.45" />
    </svg>
  )
}

/** Doer · Heart 1: simple utterance — admit fatigue out loud. */
function SvgRecoveryDoerHeartStep1 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <rect x="88" y="84" width="144" height="56" rx="18" fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.5" />
      <path d="M 112 112 h96" fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/** Head 2: cut the dead weight — line severed. */
function SvgRecoveryDoerHeadStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path d="M 72 100 L 136 100" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M 184 100 L 248 100" fill="none" stroke="#ffffff" strokeOpacity="0.38" strokeWidth="2.25" strokeLinecap="round" strokeDasharray="5 7" />
      <path d="M 148 88 L 172 112 M 172 88 L 148 112" fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Gut 3: upward opening arc — restorative movement. */
function SvgRecoveryDoerGutStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path d="M 96 132 Q 160 52 224 132" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M 160 132 L 160 148" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
    </svg>
  )
}

/** Engineer · Heart 1: offset twin curves — treat yourself like a friend. */
function SvgRecoveryEngineerHeartStep1 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path d="M 88 112 Q 128 72 168 112" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M 152 112 Q 192 72 232 112" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    </svg>
  )
}

/** Head 2: funnel — streamline over-worked tasks. */
function SvgRecoveryEngineerHeadStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <path d="M 88 68 L 232 68 L 160 148 Z" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinejoin="round" />
      <path d="M 148 108 L 172 108" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Gut 3: wide tick spacing — deliberately slow pace. */
function SvgRecoveryEngineerGutStep3 () {
  const marks = [88, 136, 184, 232]
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <path d="M 72 108 L 248 108" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
      {marks.map((x) => (
        <path key={x} d={`M ${x} 96 L ${x} 120`} fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  )
}

/** Hero · Head 1: linked plan blocks — recovery structure. */
function SvgRecoveryHeroHeadStep1 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      <rect x="88" y="92" width="48" height="36" rx="8" fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" />
      <rect x="136" y="92" width="48" height="36" rx="8" fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" />
      <rect x="184" y="92" width="48" height="36" rx="8" fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" />
      <path d="M 88 74 L 232 74" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Heart 2: overlapping ovals — sensory comfort / coziness. */
function SvgRecoveryHeroHeartStep2 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <ellipse cx="144" cy="104" rx="52" ry="36" fill="rgba(255, 255, 255, 0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
      <ellipse cx="176" cy="104" rx="52" ry="36" fill="rgba(255, 255, 255, 0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    </svg>
  )
}

/** Gut 3: half-full reserve — bank stamina, don’t spend it all. */
function SvgRecoveryHeroGutStep3 () {
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <rect x="108" y="64" width="104" height="88" rx="10" fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.5" />
      <path d="M 118 108 L 202 108 L 202 144 L 118 144 Z" fill="rgba(255, 255, 255, 0.14)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

/** Sovereign · Gut 1: silenced device — physical withdrawal. */
function SvgRecoverySovereignGutStep1 () {
  const cx = 160
  const cy = 100
  const phoneW = 64
  const phoneH = 104
  const x = cx - phoneW / 2
  const y = cy - phoneH / 2
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={STANCE_STEP_BG} />
      <rect x={x} y={y} width={phoneW} height={phoneH} rx="12" fill="none" stroke="#ffffff" strokeOpacity="0.72" strokeWidth="2.5" />
      <path d={`M ${cx - phoneW / 2 - 10} ${cy} L ${cx + phoneW / 2 + 10} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

/** Head 2: fading layers — simplify to basics. */
function SvgRecoverySovereignHeadStep2 () {
  const layers = [
    { y: 56, opacity: 0.22 },
    { y: 80, opacity: 0.38 },
    { y: 104, opacity: 0.58 },
    { y: 128, opacity: 0.88 },
  ]
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={AUDIT_STEP_BG} />
      {layers.map(({ y, opacity }) => (
        <path key={y} d={`M 88 ${y} h144`} fill="none" stroke="#ffffff" strokeOpacity={opacity} strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  )
}

/** Heart 3: hammock curve — ease without a goal. */
function SvgRecoverySovereignHeartStep3 () {
  const cx = 160
  const cy = 100
  const halfSpan = 88
  const postTop = cy - 24
  const postBase = cy - 8
  const sagY = cy + 24
  const xL = cx - halfSpan
  const xR = cx + halfSpan
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={WARMTH_STEP_BG} />
      <path d={`M ${xL} ${postBase} L ${xL} ${postTop} M ${xR} ${postBase} L ${xR} ${postTop}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
      <path d={`M ${xL} ${postTop} Q ${cx} ${sagY} ${xR} ${postTop}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    </svg>
  )
}