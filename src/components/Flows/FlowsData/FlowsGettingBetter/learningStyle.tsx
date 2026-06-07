import type { ReactNode } from 'react'
import { ContextCardArt, CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import type { FlowSituation, FlowStepArtProps } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const LEARNING_STYLE_SITUATION_ID = 'learning-style' as const

export const learningStyleFlowSituation: FlowSituation = {
  id: LEARNING_STYLE_SITUATION_ID,
  cardTitle: 'Learning style',
  cardDescription: 'Discover your optimal way of learning.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Logic → Meaning → Application',
      whyThisOrder:
        'Prevents Information Hoarding: You collect facts but struggle to use them. Connecting the data to a "why" (Heart) makes the "how" (Gut) stick.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Deconstruct the logic',
          body:
            'Start by breaking the subject down into its component parts. Map out the "how" and the "what" until you understand the underlying mechanics. This creates a mental scaffolding that makes the rest of the process feel safe.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Find the personal meaning',
          body:
            'Ask yourself: why does this matter to the world or to me? By attaching a value or an emotional weight to the facts, you transform dry information into a lived philosophy that you actually want to remember.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Execute a small project',
          body:
            'Stop reading and start doing. Take one piece of what you learned and apply it to a real world task. Forcing your hands to move bridges the gap between theoretical knowledge and true capability.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Architecture → Trial → Reflection',
      whyThisOrder:
        'Efficient Builder: You need the blueprint first. Once you see the structure, you must build it immediately, then circle back to see how it fits the "big picture."',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Study the architecture',
          body:
            'Look for the blueprint or the system flow. You need to see the start point, the end point, and the rules of engagement. Once you have the mental map, your "Gut" feels authorized to take over.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Run a trial iteration',
          body:
            'Jump into a "rough draft" or a prototype immediately. Do not worry about perfection. The goal is to get the "feel" of the knowledge in your body so you can find the friction points that the books did not mention.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Reflect on the outcome',
          body:
            'Look back at what you built and assess how it aligns with your original intent. This final check-in ensures that your efficiency has not come at the cost of the "big picture" or the human element.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Theories → Values → Output',
      whyThisOrder:
        'Purposeful Academic: You learn best when you see the logic and the human impact. Mastery occurs when you stop researching and start producing.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Explore the theories',
          body:
            'Dive into the "why" and the research. Compare different schools of thought until you have a comprehensive understanding of the landscape. Your mind needs this wide lens to feel satisfied.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Align with your values',
          body:
            'Filter the information through your personal ethics and goals. If the knowledge does not resonate with who you are, you will likely drop it. Find the "soul" in the data to keep yourself engaged.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Produce a final output',
          body:
            'Commit to a tangible result. Whether it is writing a summary or building a tool, you must ship something. This prevents you from staying in the "eternal student" phase and locks in your mastery.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Narrative → Structure → Practice',
      whyThisOrder:
        'Relational Learner: You need a story or a "who" to care about first. Once you are emotionally invested, the logic becomes easy to memorize and execute.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Identify the narrative',
          body:
            'Find the story behind the subject. Whether it is the history of the creator or the people the knowledge helps, you need a human hook. This emotional investment acts as the "glue" for the facts.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Build the logical structure',
          body:
            'Now that you care, organize the details. Create a clear hierarchy for the information so it does not just feel like a collection of stories. Logic provides the "bones" for the emotional "skin" you have already built.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Move into practice',
          body:
            'Put the knowledge to work in a social or physical context. Helping someone else or practicing in a group setting reinforces the learning because it keeps the "Heart" center active during the "Gut" work.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Passion → Experience → Systematize',
      whyThisOrder:
        'Hands-On Advocate: You learn through the "feeling" of the task. You must do it (Gut) and feel its importance (Heart) before you can organize the rules (Head).',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Ignite the passion',
          body:
            'Start with what excites you about the topic. If you do not feel a spark, you will not have the fuel to sustain the learning. Focus on the transformation or the thrill of the end result.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Gain the experience',
          body:
            'Get your hands dirty. Try, fail, and try again. You learn through the physical feedback of the task. For you, "knowing" is a physical sensation that only comes from repeated, high-energy exposure.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Systematize the process',
          body:
            'Only after you can do the task should you try to explain it. Use your mind to write down the steps or create a checklist. This systematization allows you to repeat your success without relying solely on raw energy.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Resonance → Categorization → Delivery',
      whyThisOrder:
        'Inspired Expert: You need to feel a connection to the subject, then mentally categorize it, and finally teach it or apply it to lock it in.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Seek resonance',
          body:
            'Find a teacher or a resource that speaks your language. You need to feel a connection to the source of the knowledge. When you respect and "vibe" with the source, your brain opens up to receive.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Categorize the insights',
          body:
            'Take the "inspired" information and sort it into mental files. Define the "dos" and "do nots." This mental organization prevents the learning from becoming a vague emotional cloud and turns it into a sharp tool.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Deliver the knowledge',
          body:
            'Teach the subject to someone else or present it. The act of "delivering" the information forces your body to commit to it, ensuring that the synthesis of thought and feeling becomes permanent.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Immersion → Analysis → Mentorship',
      whyThisOrder:
        'Tactile Learner: You learn by breaking things. You need to touch the work first (Gut), then ask how it works (Head), then share the wisdom (Heart).',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Total immersion',
          body:
            'Throw yourself into the deep end. Touch the tools, walk the floor, or break the code. You need to experience the weight and the texture of the work before your "Head" is even interested in the "how."',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Analyze the mechanics',
          body:
            'Once you have felt the work, ask: "Why did it do that?" Now that you have a physical reference point, the technical explanations will finally make sense and stick to your memory.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Step into mentorship',
          body:
            'Share what you have learned through your experience. By helping a beginner navigate the physical hurdles, you find the "meaning" in your mastery, which prevents the work from feeling like a repetitive chore.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Utility → Refinement → Connection',
      whyThisOrder:
        'Pragmatist: You learn by solving a problem. Once the problem is solved, you refine the technique and then see how it helps the team.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Test the utility',
          body:
            '"What can I do with this right now?" Solve a real problem immediately. If the knowledge is not useful, you will not bother learning it. Your "Gut" needs to see the immediate ROI of the effort.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Refine the technique',
          body:
            'Now that the problem is solved, look for the most efficient way to do it. Use your logic to cut out unnecessary steps. This refinement turns a "rough" skill into a polished, professional capability.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Connect to the team',
          body:
            'Evaluate how your new skill helps the people around you. Seeing the positive impact on your group or community provides the emotional satisfaction that turns a "task" into a "calling."',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Action → Feedback → Logic',
      whyThisOrder:
        'Intuitive Learner: You need to move. You act, feel the result of the action, and then finally build the mental framework to explain what happened.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Take physical action',
          body:
            'Do not think, just move. Start the activity and let your body react to the environment. You need the kinesthetic input to begin the learning process; stillness is your enemy when trying to master something new.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Listen to the feedback',
          body:
            'How did that action feel? Did it create flow or friction? Use your emotional and physical intuition to adjust your approach. This feedback loop is where your most profound learning occurs.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Formulate the logic',
          body:
            'Finalize the experience by building a mental framework. Explain "what happened" to yourself or someone else. This creates a "Head" based record that allows you to store the experience for future use.',
        },
      ],
    },
    balanced: {
      archetype: 'Hybrid',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Synthesis → Alignment → Production',
      whyThisOrder:
        'Holistic Learner: You need to see how the facts, the people, and the tools all work together before you feel confident enough to ship the final product.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Synthesize the data',
          body:
            'Gather all the facts, rules, and variables. Look at the entire system from a distance to ensure you understand how all the moving parts interact with each other.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Align with the goal',
          body:
            'Ensure the project or knowledge matches your internal "North Star." When your logic and your heart are pointed in the same direction, your "Gut" can act without any internal hesitation.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Production and shipping',
          body:
            'Move into the final phase of creation. Because you have aligned your thoughts and feelings, your physical output is total and decisive. You ship the final product with complete confidence in its quality.',
        },
      ],
    },
  },
}

/** Getting Better · Learning style — open book. */
export function LearningStyleCardArt () {
  const bg = CONTEXT_BACKGROUND[4]
  const cx = 160
  const cy = 100
  const pageW = 52
  const pageH = 72
  const gap = 6
  const stroke = { stroke: '#ffffff', strokeOpacity: 0.88, strokeWidth: 2.75 } as const
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill={bg} />
      <path
        d={`M ${cx - gap / 2} ${cy - pageH / 2} L ${cx - gap / 2 - pageW} ${cy - pageH / 2 + 8} L ${cx - gap / 2 - pageW} ${cy + pageH / 2 - 8} L ${cx - gap / 2} ${cy + pageH / 2} Z`}
        fill="rgba(255,255,255,0.1)"
        {...stroke}
        strokeLinejoin="round"
      />
      <path
        d={`M ${cx + gap / 2} ${cy - pageH / 2} L ${cx + gap / 2 + pageW} ${cy - pageH / 2 + 8} L ${cx + gap / 2 + pageW} ${cy + pageH / 2 - 8} L ${cx + gap / 2} ${cy + pageH / 2} Z`}
        fill="rgba(255,255,255,0.1)"
        {...stroke}
        strokeLinejoin="round"
      />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M ${cx - gap / 2 - pageW + 14} ${cy - 16 + i * 16} h${pageW - 28}`}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.35 + i * 0.1}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
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

export function LearningStyleStepArt ({ contextId, variantId, stepIndex, brain }: FlowStepArtProps) {
  if (variantId === 'head-strong') {
    if (stepIndex === 0 && brain === 'Head') return <SvgLearnThinkerHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgLearnThinkerHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgLearnThinkerGutStep3 />
  }
  if (variantId === 'head-gut') {
    if (stepIndex === 0 && brain === 'Head') return <SvgLearnTacticianHeadStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgLearnTacticianGutStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgLearnTacticianHeartStep3 />
  }
  if (variantId === 'head-heart') {
    if (stepIndex === 0 && brain === 'Head') return <SvgLearnDiplomatHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgLearnDiplomatHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgLearnDiplomatGutStep3 />
  }
  if (variantId === 'heart-strong') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgLearnEmpathHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgLearnEmpathHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgLearnEmpathGutStep3 />
  }
  if (variantId === 'heart-gut') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgLearnDefenderHeartStep1 />
    if (stepIndex === 1 && brain === 'Gut') return <SvgLearnDefenderGutStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgLearnDefenderHeadStep3 />
  }
  if (variantId === 'heart-head') {
    if (stepIndex === 0 && brain === 'Heart') return <SvgLearnAdvisorHeartStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgLearnAdvisorHeadStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgLearnAdvisorGutStep3 />
  }
  if (variantId === 'gut-strong') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgLearnDoerGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgLearnDoerHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgLearnDoerHeartStep3 />
  }
  if (variantId === 'gut-head') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgLearnEngineerGutStep1 />
    if (stepIndex === 1 && brain === 'Head') return <SvgLearnEngineerHeadStep2 />
    if (stepIndex === 2 && brain === 'Heart') return <SvgLearnEngineerHeartStep3 />
  }
  if (variantId === 'gut-heart') {
    if (stepIndex === 0 && brain === 'Gut') return <SvgLearnHeroGutStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgLearnHeroHeartStep2 />
    if (stepIndex === 2 && brain === 'Head') return <SvgLearnHeroHeadStep3 />
  }
  if (variantId === 'balanced') {
    if (stepIndex === 0 && brain === 'Head') return <SvgLearnSovereignHeadStep1 />
    if (stepIndex === 1 && brain === 'Heart') return <SvgLearnSovereignHeartStep2 />
    if (stepIndex === 2 && brain === 'Gut') return <SvgLearnSovereignGutStep3 />
  }
  return <ContextCardArt id={contextId} />
}

function SvgLearnThinkerHeadStep1 () {
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
          fill="rgba(255,255,255,0.08)"
          stroke="#ffffff"
          strokeOpacity={0.45 + (row + col) * 0.08}
          strokeWidth="2"
        />
      ))
    )}
  </>)
}
function SvgLearnThinkerHeartStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 40} ${cy + 8} Q ${cx} ${cy - 28} ${cx + 40} ${cy + 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx={cx} cy={cy - 4} r="6" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgLearnThinkerGutStep3 () {
  const cy = 100
  const r = 28; const wing = 12
  const baseX = 188; const cx = baseX + 8; const tipX = cx + 16
  return stepSvg(STANCE_STEP_BG, <>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.25" />
    <path d={`M 88 ${cy} L ${baseX} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" />
    <path d={`M ${baseX} ${cy - wing} L ${tipX} ${cy} L ${baseX} ${cy + wing}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgLearnTacticianHeadStep1 () {
  const y = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M 72 ${y} L 248 ${y}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M 208 ${y - 32} L 208 ${y + 32}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <circle cx="96" cy={y} r="5" fill="#ffffff" fillOpacity="0.4" />
    <circle cx="160" cy={y} r="5" fill="#ffffff" fillOpacity="0.55" />
    <circle cx="208" cy={y} r="5" fill="#ffffff" fillOpacity="0.7" />
  </>)
}
function SvgLearnTacticianGutStep2 () {
  const cx = 160; const cy = 100
  const w = 56; const h = 72
  return stepSvg(STANCE_STEP_BG, <>
    <rect x={cx - w / 2 - 10} y={cy - h / 2 - 8} width={w} height={h} rx="6" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.25" strokeDasharray="6 5" />
    <rect x={cx - w / 2 + 10} y={cy - h / 2 + 8} width={w} height={h} rx="6" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" />
    <path d={`M ${cx - 8} ${cy - 8} h32 M ${cx - 8} ${cy + 8} h20 M ${cx - 8} ${cy + 24} h28`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}
function SvgLearnTacticianHeartStep3 () {
  return stepSvg(WARMTH_STEP_BG, <path d="M 72 104 Q 160 148 248 104" fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />)
}

function SvgLearnDiplomatHeadStep1 () {
  const cx = 160; const cy = 100
  const widths = [96, 72, 48]
  return stepSvg(AUDIT_STEP_BG, <>
    {widths.map((w, i) => (
      <path key={w} d={`M ${cx - w / 2} ${cy - 24 + i * 24} h${w}`} fill="none" stroke="#ffffff" strokeOpacity={0.45 + i * 0.2} strokeWidth="2.5" strokeLinecap="round" />
    ))}
  </>)
}
function SvgLearnDiplomatHeartStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 48} ${cy - 20} L ${cx} ${cy + 24} L ${cx + 48} ${cy - 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={cx} cy={cy + 8} r="8" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" />
  </>)
}
function SvgLearnDiplomatGutStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <rect x={cx - 40} y={cy - 28} width="80" height="56" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${cx - 16} ${cy + 2} l8 8 18-22`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgLearnEmpathHeartStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 56} ${cy + 4} Q ${cx - 20} ${cy - 32} ${cx} ${cy + 4} T ${cx + 56} ${cy + 4}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx={cx - 20} cy={cy - 8} r="5" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgLearnEmpathHeadStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <path d={`M ${cx} ${cy + 28} L ${cx} ${cy - 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${cx - 32} ${cy - 8} L ${cx} ${cy - 20} L ${cx + 32} ${cy - 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d={`M ${cx - 24} ${cy + 8} L ${cx} ${cy - 2} L ${cx + 24} ${cy + 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
function SvgLearnEmpathGutStep3 () {
  const cx = 160; const cy = 100
  const r = 14
  const top = { x: cx, y: cy - 30 }
  const left = { x: cx - 38, y: cy + 18 }
  const right = { x: cx + 38, y: cy + 18 }
  const nodes = [top, left, right]
  return stepSvg(STANCE_STEP_BG, <>
    <path
      d={`M ${top.x} ${top.y + r} L ${left.x + 12} ${left.y - r + 2} L ${right.x - 12} ${right.y - r + 2} Z`}
      fill="none"
      stroke="#ffffff"
      strokeOpacity="0.35"
      strokeWidth="2.25"
      strokeLinejoin="round"
    />
    {nodes.map(({ x, y }, i) => (
      <circle key={i} cx={x} cy={y} r={r} fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity={0.55 + i * 0.12} strokeWidth="2.25" />
    ))}
  </>)
}

function SvgLearnDefenderHeartStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx} ${cy + 20} L ${cx} ${cy - 16}`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.25" strokeLinecap="round" />
    <path d={`M ${cx} ${cy - 16} C ${cx + 6} ${cy - 28} ${cx + 20} ${cy - 24} ${cx + 20} ${cy - 10} C ${cx + 20} ${cy + 4} ${cx} ${cy + 8} ${cx} ${cy + 8} C ${cx} ${cy + 8} ${cx - 20} ${cy + 4} ${cx - 20} ${cy - 10} C ${cx - 20} ${cy - 24} ${cx - 6} ${cy - 28} ${cx} ${cy - 16} Z`} fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" strokeLinejoin="round" />
  </>)
}
function SvgLearnDefenderGutStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M ${cx - 48} ${cy + 12} L ${cx - 16} ${cy - 20} L ${cx + 8} ${cy + 4} L ${cx + 40} ${cy - 28}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={cx + 40} cy={cy - 28} r="5" fill="#ffffff" fillOpacity="0.55" />
  </>)
}
function SvgLearnDefenderHeadStep3 () {
  const cx = 160; const cy = 100
  const rowYs = [cy - 24, cy, cy + 24]
  const tickX = cx - 40; const lineX = cx - 20
  return stepSvg(AUDIT_STEP_BG, <>
    {rowYs.map((y, i) => (
      <g key={y}>
        <path d={`M ${tickX} ${y - 2} l6 6 10-12`} fill="none" stroke="#ffffff" strokeOpacity={0.55 + i * 0.15} strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M ${lineX} ${y} h80`} fill="none" stroke="#ffffff" strokeOpacity={0.45 + i * 0.15} strokeWidth="2.25" strokeLinecap="round" />
      </g>
    ))}
  </>)
}

function SvgLearnAdvisorHeartStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx={cx} cy={cy} r="10" fill="#ffffff" fillOpacity="0.45" />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M ${cx + 14} ${cy - 4 + i * 4} Q ${cx + 36} ${cy - 8 + i * 8} ${cx + 52} ${cy - 4 + i * 4}`} fill="none" stroke="#ffffff" strokeOpacity={0.45 + i * 0.18} strokeWidth="2.25" strokeLinecap="round" />
    ))}
  </>)
}
function SvgLearnAdvisorHeadStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <rect x={cx - 48} y={cy - 32} width="28" height="64" rx="6" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
    <rect x={cx - 14} y={cy - 32} width="28" height="64" rx="6" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.72" strokeWidth="2.25" />
    <rect x={cx + 20} y={cy - 32} width="28" height="64" rx="6" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
  </>)
}
function SvgLearnAdvisorGutStep3 () {
  const cy = 100
  const fromX = 108
  const toX = 212
  const r = 16
  const gap = 10
  const arrowTip = toX - r - gap
  return stepSvg(STANCE_STEP_BG, <>
    <circle cx={fromX} cy={cy} r={r} fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" />
    <path d={`M ${fromX + r + gap} ${cy} L ${arrowTip - 12} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <path d={`M ${arrowTip - 12} ${cy - 10} L ${arrowTip} ${cy} L ${arrowTip - 12} ${cy + 10}`} fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={toX} cy={cy} r={r} fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
  </>)
}

function SvgLearnDoerGutStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <path d={`M ${cx} ${cy - 44} L ${cx} ${cy + 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <path d={`M ${cx - 16} ${cy + 20} L ${cx} ${cy + 36} L ${cx + 16} ${cy + 20}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={cx} cy={cy - 44} r="6" fill="#ffffff" fillOpacity="0.45" />
  </>)
}
function SvgLearnDoerHeadStep2 () {
  const cx = 160; const cy = 100
  const arm = 14
  return stepSvg(AUDIT_STEP_BG, <>
    <circle cx={cx} cy={cy} r="28" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2.25" />
    <path d={`M ${cx - arm} ${cy} h${arm * 2} M ${cx} ${cy - arm} v${arm * 2}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx={cx + 20} cy={cy - 20} r="4" fill="#ffffff" fillOpacity="0.55" />
  </>)
}
function SvgLearnDoerHeartStep3 () {
  const cy = 100
  const mentorX = 114
  const menteeX = 206
  const mentorR = 18
  const menteeR = 11
  const gap = 8
  const arrowTip = menteeX - menteeR - gap
  return stepSvg(WARMTH_STEP_BG, <>
    <circle cx={mentorX} cy={cy} r={mentorR} fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.5" />
    <circle cx={menteeX} cy={cy} r={menteeR} fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${mentorX + mentorR + gap} ${cy} L ${arrowTip - 10} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M ${arrowTip - 10} ${cy - 8} L ${arrowTip} ${cy} L ${arrowTip - 10} ${cy + 8}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}

function SvgLearnEngineerGutStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(STANCE_STEP_BG, <>
    <rect x={cx - 36} y={cy - 24} width="72" height="48" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${cx - 16} ${cy + 24} l16-32 16 32`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
function SvgLearnEngineerHeadStep2 () {
  const cx = 160; const cy = 100
  const bars = [
    { w: 112, opacity: 0.45 },
    { w: 88, opacity: 0.58 },
    { w: 64, opacity: 0.72 },
    { w: 40, opacity: 0.88 },
  ]
  const rowGap = 20
  const startY = cy - 1.5 * rowGap
  return stepSvg(AUDIT_STEP_BG, <>
    {bars.map(({ w, opacity }, i) => (
      <path key={w} d={`M ${cx - w / 2} ${startY + i * rowGap} h${w}`} fill="none" stroke="#ffffff" strokeOpacity={opacity} strokeWidth="2.5" strokeLinecap="round" />
    ))}
  </>)
}
function SvgLearnEngineerHeartStep3 () {
  const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    {[108, 160, 212].map((x) => <circle key={x} cx={x} cy={cy} r="14" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.25" />)}
    <path d="M 122 100 L 148 100 M 172 100 L 198 100" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
  </>)
}

function SvgLearnHeroGutStep1 () {
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
function SvgLearnHeroHeartStep2 () {
  const cx = 160; const cy = 100
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 64} ${cy} Q ${cx} ${cy + 32} ${cx + 64} ${cy} Q ${cx} ${cy - 32} ${cx - 64} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.72" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx={cx} cy={cy} r="6" fill="#ffffff" fillOpacity="0.55" />
  </>)
}
function SvgLearnHeroHeadStep3 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <rect x={cx - 40} y={cy - 32} width="80" height="64" rx="8" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2.25" />
    <path d={`M ${cx - 24} ${cy - 12} h48 M ${cx - 24} ${cy + 4} h32 M ${cx - 24} ${cy + 20} h40`} fill="none" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" strokeLinecap="round" />
  </>)
}

function SvgLearnSovereignHeadStep1 () {
  const cx = 160; const cy = 100
  return stepSvg(AUDIT_STEP_BG, <>
    <circle cx={cx} cy={cy} r="8" fill="#ffffff" fillOpacity="0.55" />
    {[[-40, 0], [40, 0], [0, -36], [0, 36]].map(([dx, dy]) => (
      <path key={`${dx}-${dy}`} d={`M ${cx} ${cy} L ${cx + dx} ${cy + dy}`} fill="none" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="2.5" strokeLinecap="round" />
    ))}
    {[[-40, 0], [40, 0], [0, -36], [0, 36]].map(([dx, dy]) => (
      <circle key={`c-${dx}-${dy}`} cx={cx + dx} cy={cy + dy} r="6" fill="#ffffff" fillOpacity="0.35" />
    ))}
  </>)
}
function SvgLearnSovereignHeartStep2 () {
  const cx = 160; const cy = 128
  return stepSvg(WARMTH_STEP_BG, <>
    <path d={`M ${cx - 48} ${cy} h96`} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
    <path d={`M ${cx} ${cy - 48} v48`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="2.75" strokeLinecap="round" />
    <circle cx={cx - 48} cy={cy} r="5" fill="#ffffff" fillOpacity="0.4" />
    <circle cx={cx + 48} cy={cy} r="5" fill="#ffffff" fillOpacity="0.4" />
  </>)
}
function SvgLearnSovereignGutStep3 () {
  const canvasCx = 160
  const cy = 100
  const boxW = 56
  const boxH = 48
  const gap = 12
  const shaftLen = 52
  const tipLen = 16
  const wing = 12
  const groupW = boxW + gap + shaftLen + tipLen
  const boxX = canvasCx - groupW / 2
  const boxY = cy - boxH / 2
  const shaftStart = boxX + boxW + gap
  const shaftEnd = shaftStart + shaftLen
  const tipX = shaftEnd + tipLen
  return stepSvg(STANCE_STEP_BG, <>
    <rect x={boxX} y={boxY} width={boxW} height={boxH} rx="8" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="2.5" />
    <path d={`M ${shaftStart} ${cy} L ${shaftEnd} ${cy}`} fill="none" stroke="#ffffff" strokeOpacity="0.88" strokeWidth="3" strokeLinecap="round" />
    <path d={`M ${shaftEnd} ${cy - wing} L ${tipX} ${cy} L ${shaftEnd} ${cy + wing}`} fill="none" stroke="#ffffff" strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </>)
}
