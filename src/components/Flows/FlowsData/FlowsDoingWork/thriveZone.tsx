import type { ReactNode } from 'react'
import { ContextCardArt, CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import type { FlowSituation, FlowStepArtProps } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const THRIVE_ZONE_SITUATION_ID = 'thrive-zone' as const

export const thriveZoneFlowSituation: FlowSituation = {
  id: THRIVE_ZONE_SITUATION_ID,
  cardTitle: 'Thrive zone',
  cardDescription: 'What the Best Workspace looks like for you.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Complexity → Meaning → Output',
      whyThisOrder:
        'Prioritize the Mental Playground: Thrives in R&D, strategy, or coding. Needs an environment where logic is king, followed by a sense of purpose and a clear final product.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Analyze the complexity',
          body:
            'Engage with a difficult problem that requires deep focus. Your satisfaction begins when your mind is challenged by variables, data, or intricate systems. This mental stimulation provides the "fuel" for your entire workday.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Connect to the meaning',
          body:
            'Identify who benefits from your mental labor. Whether it is a client or a future user, attaching a "why" to your logic prevents the work from feeling like a cold, academic exercise. It gives your thoughts a heartbeat.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Produce the final output',
          body:
            'Move the solution from your mind to the real world. Commit to a finished piece of code, a strategic deck, or a research paper. This tangible result satisfies your need to see your logic become a physical reality.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Architecture → Mastery → Culture',
      whyThisOrder:
        'Reward High-Stakes Competence: Needs high-stakes problem solving (Head) and the power to execute (Gut). Enjoys environments that prize results over "office politics."',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Architect the solution',
          body:
            'Map out the most efficient way to achieve the goal. You need to see the "path to victory" clearly. Once the logic of the win is established, your energy shifts from observation to execution.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Mastery through action',
          body:
            'Take ownership of the high-stakes tasks. Execute with speed and precision. You feel most alive when you are "in the arena" proving your competence through direct, measurable results.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Evaluate the culture',
          body:
            'Check in on the professional relationships. Once the work is done and the win is secured, ensure the environment still feels like a place where you want to stay. For you, respect for your competence is the highest form of connection.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'System → Service → Result',
      whyThisOrder:
        'Optimize Systems for People: Thrives in non-profits or UX design. Needs to see the logic behind the system and how that system helps people.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Understand the system',
          body:
            'Deconstruct how the organization or project functions. You need to know that the underlying logic is sound. A broken or nonsensical system will drain your energy before you even start.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Assess the service impact',
          body:
            'Look at the people at the other end of the system. How does this work improve their lives? When you see the intersection of "smart logic" and "human help," your motivation reaches its peak.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Deliver the result',
          body:
            'Follow through on the implementation. Use your hands to refine the user experience or the service delivery. This final step ensures that your idealism and logic result in a practical improvement for someone else.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Community → Growth → Action',
      whyThisOrder:
        'Value the Cultural Tribe: Thrives in HR, coaching, or team-centric roles. Needs shared values and connection (Heart) before the technical tasks feel worth doing.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Establish the connection',
          body:
            'Start your day with a check-in or a collaborative moment. You need to feel that you are part of a "tribe" with shared values. Without this relational foundation, the technical work feels empty and purposeless.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Contribute to growth',
          body:
            'Use your mind to figure out how to help the team or the individual grow. Developing a curriculum, a coaching plan, or a cultural initiative satisfies your need to be a "Head" based resource for your "Heart" based tribe.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Take collective action',
          body:
            'Execute the tasks that move the team forward. Whether it is leading a meeting or finalizing an HR policy, your "doing" is fueled by the knowledge that you are acting on behalf of the people you care about.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Mission → Momentum → Logic',
      whyThisOrder:
        'Fuse Belief with Pace: Needs to believe in the brand (Heart) and have a fast-paced "do-er" culture (Gut). Logic and structure are secondary to the "vibe."',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Align with the mission',
          body:
            'Confirm that you believe in what the company stands for. If you do not "vibe" with the brand or the goal, your energy will stall. You need a cause that you can get behind with total emotional honesty.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Build the momentum',
          body:
            'Jump into the fast-paced work. You thrive in environments where things are moving quickly and there is a "bias for action." Physical movement and quick wins keep your "Gut" center satisfied.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Refine the logic',
          body:
            'Once the momentum is established, use your mind to clean up the details. Add a bit of structure to the chaos. This ensures that your high-speed "doing" is also sustainable and logically sound over the long term.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Belonging → Innovation → Creation',
      whyThisOrder:
        'Cultivate Safe Innovation: Needs to feel psychologically safe (Heart) to share big, innovative ideas (Head) that eventually turn into a tangible portfolio (Gut).',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Verify psychological safety',
          body:
            'Ensure you are in an environment where you are respected and safe to fail. For you, the "Heart" must feel secure before the "Head" is willing to take the creative risks necessary for innovation.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Iterate on innovative ideas',
          body:
            'Once you feel safe, let your mind run wild. Solve problems in ways no one else has thought of. This "mental playground" is where your best work happens, as you synthesize old data into new concepts.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Create the portfolio',
          body:
            'Turn your ideas into a visible, tangible portfolio. Whether it is a design, a prototype, or a presentation, you need to see your "innovative heart" reflected in a physical object that you can show to the world.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Autonomy → Problem-Solving → Loyalty',
      whyThisOrder:
        'Require Spatial Autonomy: Thrives in trades, sales, or solo-ventures. Needs to "own" their space (Gut) and solve puzzles (Head) before worrying about the team.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Secure your autonomy',
          body:
            'Establish your physical space and your "ownership" of the task. You need to know that you have the freedom to move and decide without someone hovering over your shoulder. Autonomy is your primary requirement for fulfillment.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Solve the immediate puzzle',
          body:
            'Engage with the technical problem in front of you. Use your logic to fix the machine, close the sale, or build the structure. You enjoy the direct relationship between "thinking" and "fixing."',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Build long-term loyalty',
          body:
            'Once you have proven you can "own" the work, connect with your clients or colleagues. Your loyalty is built on a foundation of mutual respect for boundaries and competence, creating a stable "Heart" center over time.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Efficiency → Precision → Connection',
      whyThisOrder:
        'Measure Objective Results: Needs an environment where performance is measured by results (Gut) and technical accuracy (Head). Likes clear hierarchies.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Execute for efficiency',
          body:
            'Start by knocking out the most high-impact, physical, or direct tasks. You thrive in environments that value "getting it done" without excessive talking. Seeing the physical evidence of your work provides instant satisfaction.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Apply technical precision',
          body:
            'Double check the details. Ensure the work meets the highest technical standards. Your "Head" enjoys the process of refining the "Gut" output until it is a masterpiece of precision and logic.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Connect via the hierarchy',
          body:
            'Identify your place in the team and support the collective goal. You find "Heart" fulfillment in being a reliable, high-performing part of a clear structure where everyone knows their role.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Movement → Advocacy → Systems',
      whyThisOrder:
        'Link Action to Connection: Thrives in emergency services or hospitality. Needs physical activity (Gut) and immediate human connection (Heart) to feel satisfied.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Engage in movement',
          body:
            'Start your work with physical activity. Whether you are on your feet in a hospital or moving through a busy kitchen, your "Gut" needs to be physically engaged to wake up your other centers.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Advocate for the person',
          body:
            'Use your physical presence to help someone in real-time. The immediate human connection—saving a life, serving a meal, or solving a crisis—provides the emotional reward that makes the hard work worth it.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Navigate the systems',
          body:
            'Use your mind to understand the protocols and systems that keep the work organized. This "Head" center ensures that your rapid-fire action and connection do not lead to burnout or systemic chaos.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Synthesize → Align → Produce',
      whyThisOrder:
        'Engage Holistic Complexity: Thrives in Project Management. Needs a job that engages the brain, the heart, and the hands in equal measure to avoid boredom.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Synthesize the dynamics',
          body:
            'Look at the project from all angles. Understand the data, the timeline, and the people involved. You need this "bird\'s eye view" to feel that you have a handle on the complexity of the job.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Align the stakeholders',
          body:
            'Check in with the people. Ensure that everyone\'s goals and feelings are in harmony with the project logic. This "Heart" work prevents the project from becoming a cold, mechanical process that ignores the human element.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Produce the unified result',
          body:
            'Lead the final push to completion. Because you have balanced the logic and the people, your "Gut" can act with total confidence, delivering a product that is smart, kind, and physically complete.',
        },
      ],
    },
  },
}

/** Doing Work · Thrive zone — sweet-spot band with center marker. */
export function ThriveZoneCardArt () {
  const bg = CONTEXT_BACKGROUND[2]
  const cx = 160
  const cy = 100
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={bg} />
      <path
        d="M 64 88 Q 160 74 256 88 L 256 112 Q 160 126 64 112 Z"
        fill="rgba(255,255,255,0.1)"
        stroke="none"
      />
      <path d="M 64 88 Q 160 74 256 88" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
      <path d="M 64 112 Q 160 126 256 112" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="14" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" />
      <circle cx={cx} cy={cy} r="5" fill="#ffffff" fillOpacity="0.5" />
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

export function ThriveZoneStepArt ({ contextId, variantId, stepIndex, brain }: FlowStepArtProps) {
  if (variantId === 'head-strong') {
    if (stepIndex === 0 && brain === 'Head') return <SvgThriveThinkerHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgThriveThinkerHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgThriveThinkerGutStep3 />
  }
  if (variantId === 'head-gut') {
    if (stepIndex === 0 && brain === 'Head') return <SvgThriveTacticianHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgThriveTacticianGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgThriveTacticianHeartStep3 />
  }
  if (variantId === 'head-heart') {
    if (stepIndex === 0 && brain === 'Head') return <SvgThriveDiplomatHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgThriveDiplomatHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgThriveDiplomatGutStep3 />
  }
  if (variantId === 'heart-strong') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgThriveEmpathHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgThriveEmpathHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgThriveEmpathGutStep3 />
  }
  if (variantId === 'heart-gut') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgThriveDefenderHeartStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgThriveDefenderGutStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgThriveDefenderHeadStep3 />
  }
  if (variantId === 'heart-head') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgThriveAdvisorHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgThriveAdvisorHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgThriveAdvisorGutStep3 />
  }
  if (variantId === 'gut-strong') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgThriveDoerGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgThriveDoerHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgThriveDoerHeartStep3 />
  }
  if (variantId === 'gut-head') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgThriveEngineerGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgThriveEngineerHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgThriveEngineerHeartStep3 />
  }
  if (variantId === 'gut-heart') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgThriveHeroGutStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgThriveHeroHeartStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgThriveHeroHeadStep3 />
  }
  if (variantId === 'balanced') {
    if (stepIndex === 0 && brain === 'Head') return <SvgThriveSovereignHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgThriveSovereignHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgThriveSovereignGutStep3 />
  }
  return <ContextCardArt id={contextId} />
}

function SvgThriveThinkerHeadStep1 () {
  const cx = 160; const cy = 100; const g = 28
  const x0 = cx - 1.5 * g; const y0 = cy - 1.5 * g
  return stepSvg(AUDIT_STEP_BG, <>
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
  </>)
}
function SvgThriveThinkerHeartStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    {[44, 30, 16].map((r) => <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity={0.28 + (44 - r) * 0.02} strokeWidth="2.25" />)}
    <circle cx={cx} cy={cy} r="6" fill="#ffffff" fillOpacity="0.5" />
  </>)
}
function SvgThriveThinkerGutStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <rect x={cx - 36} y={cy - 44} width="72" height="88" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" />
    <path d={`M ${cx - 36} ${cy - 44} L ${cx - 20} ${cy - 56} L ${cx + 36} ${cy - 56} L ${cx + 36} ${cy + 44}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" strokeLinejoin="round" />
  </>)
}

function SvgThriveTacticianHeadStep1 () {
  const y = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M 72 ${y} L 248 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M 208 ${y - 32} L 208 ${y + 32}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <circle cx="96" cy={y} r="5" fill="#ffffff" fillOpacity="0.4" />
    <circle cx="160" cy={y} r="5" fill="#ffffff" fillOpacity="0.55" />
    <circle cx="208" cy={y} r="5" fill="#ffffff" fillOpacity="0.7" />
  </>)
}
function SvgThriveTacticianGutStep2 () {
  const canvasCx = 160
  const cy = 100
  const r = 28
  const wing = 12
  const shaftLen = 72
  const cx = canvasCx - (r - 8 - shaftLen) / 2
  const baseX = cx - 8
  const tipX = cx + 16
  const shaftStart = baseX - shaftLen
  return stepSvg(STANCE_STEP_BG, <>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.25" />
    <path d={`M ${shaftStart} ${cy} L ${baseX} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" />
    <path d={`M ${baseX} ${cy - wing} L ${tipX} ${cy} L ${baseX} ${cy + wing}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
function SvgThriveTacticianHeartStep3 () {
  const y = 100
  return stepSvg(WARMTH_STEP_BG, <>
    {[108, 160, 212].map((x) => <circle key={x} cx={x} cy={y} r="18" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" />)}
  </>)
}

function SvgThriveDiplomatHeadStep1 () {
  const cx = 160
  const cy = 100
  const barW = 112
  const barH = 20
  const gap = 8
  const stackH = 3 * barH + 2 * gap
  const topY = cy - stackH / 2
  const ys = [0, 1, 2].map((i) => topY + i * (barH + gap))
  return stepSvg(AUDIT_STEP_BG, <>
    {ys.map((y, i) => (
      <rect key={y} x={cx - barW / 2} y={y} width={barW} height={barH} rx="6" fill="rgba(255,255,255,0.06)" stroke="#ffffff" strokeOpacity={0.45 + i * 0.2} strokeWidth="2.25" />
    ))}
  </>)
}
function SvgThriveDiplomatHeartStep2 () {
  const cy = 108
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M 88 ${cy - 20} Q 160 ${cy + 8} 232 ${cy - 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
    <circle cx="160" cy={cy + 8} r="10" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgThriveDiplomatGutStep3 () {
  const y = 100
  return stepSvg(STANCE_STEP_BG, <>
    <rect x="108" y="72" width="44" height="56" rx="6" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M 168 ${y} L 220 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M 220 ${y - 10} L 236 ${y} L 220 ${y + 10}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgThriveEmpathHeartStep1 () {
  const cx = 160
  const cy = 100
  const centerR = 10
  const dotR = 7
  const orbitR = centerR + dotR + 19
  const orbit = Array.from({ length: 5 }, (_, i) => {
    const angle = ((-90 + i * 72) * Math.PI) / 180
    return {
      x: cx + orbitR * Math.cos(angle),
      y: cy + orbitR * Math.sin(angle),
    }
  })
  return stepSvg(WARMTH_STEP_BG, <>
    {orbit.map(({ x, y }, i) => (
      <circle key={i} cx={x} cy={y} r={dotR} fill="#ffffff" fillOpacity="0.35" />
    ))}
    <circle cx={cx} cy={cy} r={centerR} fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" />
  </>)
}
function SvgThriveEmpathHeadStep2 () {
  return stepSvg(AUDIT_STEP_BG, <path d="M 72 132 C 120 72 200 72 248 92" fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />)
}
function SvgThriveEmpathGutStep3 () {
  const canvasCx = 160
  const cy = 100
  const dotR = 6
  const dotGap = 32
  const gapAfterDots = 12
  const shaftLen = 64
  const wing = 10
  const tipLen = 16
  const dotClusterCx = (canvasCx * 2 - 12 - shaftLen - tipLen) / 2
  const dotXs = [dotClusterCx - dotGap, dotClusterCx, dotClusterCx + dotGap]
  const shaftStart = dotClusterCx + dotGap + dotR + gapAfterDots
  const shaftEnd = shaftStart + shaftLen
  const tipX = shaftEnd + tipLen
  return stepSvg(STANCE_STEP_BG, <>
    {dotXs.map((x, i) => (
      <circle key={x} cx={x} cy={cy} r={dotR} fill="#ffffff" fillOpacity={0.4 + i * 0.15} />
    ))}
    <path d={`M ${shaftStart} ${cy} L ${shaftEnd} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${shaftEnd} ${cy - wing} L ${tipX} ${cy} L ${shaftEnd} ${cy + wing}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgThriveDefenderHeartStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx} ${cy - 28} L ${cx + 24} ${cy + 20} L ${cx - 24} ${cy + 20} Z`} fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinejoin="round" />
    <circle cx={cx} cy={cy - 4} r="6" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgThriveDefenderGutStep2 () {
  const canvasCx = 160
  const cy = 100
  const count = 3
  const spacing = 24
  const shaftLen = 28
  const wing = 8
  const groupW = (count - 1) * spacing + shaftLen
  const xs = [0, 1, 2].map((i) => canvasCx - groupW / 2 + i * spacing)
  return stepSvg(STANCE_STEP_BG, <>
    {xs.map((x) => (
      <path key={x} d={`M ${x} ${cy} L ${x + shaftLen} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    ))}
    {xs.map((x) => (
      <path key={`a-${x}`} d={`M ${x + shaftLen - wing} ${cy - wing} L ${x + shaftLen} ${cy} L ${x + shaftLen - wing} ${cy + wing}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    ))}
  </>)
}
function SvgThriveDefenderHeadStep3 () {
  return stepSvg(AUDIT_STEP_BG, <>
    {[76, 100, 124].map((rowY) => <path key={rowY} d={`M 96 ${rowY} h128`} fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" strokeLinecap="round" />)}
    <path d={`M 96 76 v48`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
    <path d={`M 224 76 v48`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
  </>)
}

function SvgThriveAdvisorHeartStep1 () {
  return stepSvg(WARMTH_STEP_BG, <path d="M 72 88 Q 160 148 248 88" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />)
}
function SvgThriveAdvisorHeadStep2 () {
  const cx = 160
  const cy = 100
  const arms = [
    { x: 124, y: 68 },
    { x: 196, y: 72 },
    { x: 148, y: 136 },
  ]
  return stepSvg(AUDIT_STEP_BG, <>
    {arms.map(({ x, y }) => (
      <path key={`${x}-${y}`} d={`M ${cx} ${cy} L ${x} ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
    ))}
    <circle cx={cx} cy={cy} r="10" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.5" />
    {arms.map(({ x, y }) => (
      <circle key={`n-${x}-${y}`} cx={x} cy={y} r="5" fill="#ffffff" fillOpacity="0.5" />
    ))}
  </>)
}
function SvgThriveAdvisorGutStep3 () {
  const cx = 160; const cy = 108
  return stepSvg(STANCE_STEP_BG, <>
    <rect x={cx - 52} y={cy - 36} width="40" height="52" rx="6" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" transform={`rotate(-8 ${cx - 32} ${cy - 10})`} />
    <rect x={cx - 20} y={cy - 40} width="40" height="52" rx="6" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.72" strokeWidth="2.25" />
    <rect x={cx + 12} y={cy - 36} width="40" height="52" rx="6" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" transform={`rotate(8 ${cx + 32} ${cy - 10})`} />
  </>)
}

function SvgThriveDoerGutStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <rect x={cx - 48} y={cy - 40} width="96" height="80" rx="10" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" />)
}
function SvgThriveDoerHeadStep2 () {
  const cx = 160
  const cy = 100
  const left = cx - 30
  const right = cx + 30
  const top = cy - 26
  const bottom = cy + 30
  const tabHalf = 8
  const tabDepth = 12
  const notchHalf = 9
  const notchDepth = 11
  const pieceD = [
    `M ${left} ${top}`,
    `L ${cx - tabHalf} ${top}`,
    `Q ${cx} ${top - tabDepth} ${cx + tabHalf} ${top}`,
    `L ${right} ${top}`,
    `L ${right} ${cy - notchHalf}`,
    `Q ${right - notchDepth} ${cy} ${right} ${cy + notchHalf}`,
    `L ${right} ${bottom}`,
    `L ${left} ${bottom}`,
    'Z',
  ].join(' ')
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={pieceD} fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinejoin="round" />
  </>)
}
function SvgThriveDoerHeartStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx={cx - 22} cy={cy} r="16" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <circle cx={cx + 22} cy={cy} r="16" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${cx - 6} ${cy} h12`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
  </>)
}

function SvgThriveEngineerGutStep1 () {
  const y = 108
  return stepSvg(STANCE_STEP_BG, <>
    <rect x="88" y={y - 12} width="144" height="24" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" />
    <rect x="88" y={y - 12} width="104" height="24" rx="8" fill="rgba(255,255,255,0.14)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" />
  </>)
}
function SvgThriveEngineerHeadStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <circle cx={cx} cy={cy} r="32" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" />
    <path d={`M ${cx - 44} ${cy} h88 M ${cx} ${cy - 44} v88`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx={cx} cy={cy} r="5" fill="#ffffff" fillOpacity="0.5" />
  </>)
}
function SvgThriveEngineerHeartStep3 () {
  const cx = 160
  return stepSvg(WARMTH_STEP_BG, <>
    <rect x={cx - 56} y="128" width="112" height="16" rx="4" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2" />
    <rect x={cx - 40} y="104" width="80" height="16" rx="4" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="2" />
    <rect x={cx - 24} y="80" width="48" height="16" rx="4" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.25" />
  </>)
}

function SvgThriveHeroGutStep1 () {
  const y = 100
  return stepSvg(STANCE_STEP_BG, <path d={`M 88 ${y + 16} L 112 ${y - 16} L 136 ${y + 16} L 160 ${y - 16} L 184 ${y + 16} L 208 ${y - 16} L 232 ${y + 16}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />)
}
function SvgThriveHeroHeartStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx={cx} cy={cy} r="34" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" />
    <path d={`M ${cx} ${cy - 16} v32 M ${cx - 16} ${cy} h32`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
  </>)
}
function SvgThriveHeroHeadStep3 () {
  return stepSvg(AUDIT_STEP_BG, <>
    <rect x="108" y="72" width="44" height="28" rx="6" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" />
    <rect x="168" y="72" width="44" height="28" rx="6" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" />
    <path d={`M 130 116 L 130 132 L 190 132 L 190 116`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinejoin="round" />
    <path d={`M 160 100 L 160 116`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}

function SvgThriveSovereignHeadStep1 () {
  const pts = [{ x: 160, y: 56 }, { x: 96, y: 136 }, { x: 224, y: 136 }]
  return stepSvg(AUDIT_STEP_BG, <>
    {pts.map((a, i) => pts.map((b, j) => i < j && (
      <path key={`${i}-${j}`} d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
    )))}
    {pts.map((p) => <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="8" fill="#ffffff" fillOpacity="0.45" />)}
  </>)
}
function SvgThriveSovereignHeartStep2 () {
  return stepSvg(WARMTH_STEP_BG, <>
    {[84, 100, 116].map((rowY, i) => (
      <g key={rowY}>
        <path d={`M 88 ${rowY} h144`} fill="none" stroke="#ffffff" strokeOpacity={0.45 + i * 0.2} strokeWidth="2.25" strokeLinecap="round" />
        <circle cx="160" cy={rowY} r="5" fill="#ffffff" fillOpacity={0.45 + i * 0.15} />
      </g>
    ))}
  </>)
}
function SvgThriveSovereignGutStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <circle cx={cx} cy={cy} r="40" fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" />
    <path d={`M ${cx - 14} ${cy + 2} l8 8 18-22`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
