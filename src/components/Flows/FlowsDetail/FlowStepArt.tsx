import { ContextCardArt } from '../../Quiz/ContextArt'
import type { BrainType, FlowContextId } from '../flowsData'
import type { BrainTypeSidebarItemId } from './BrainTypeSidebar'

export interface FlowStepArtProps {
  contextId: FlowContextId
  situationId: string
  variantId: BrainTypeSidebarItemId
  stepIndex: number
  brain: BrainType
}

function isSpeakingToAuthority (contextId: FlowContextId, situationId: string) {
  return contextId === 1 && situationId === 'speaking-to-authority'
}

/**
 * Per-step hero art for “How to do it”. Each context × situation × variant ×
 * step × brain can map to a bespoke SVG; unknown keys fall back to the shared
 * quiz context card art.
 */
export function FlowStepArt ({
  contextId,
  situationId,
  variantId,
  stepIndex,
  brain,
}: FlowStepArtProps) {
  if (!isSpeakingToAuthority(contextId, situationId)) {
    return <ContextCardArt id={contextId} />
  }

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
