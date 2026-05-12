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

function isThinkerSpeakingToAuthority (
  contextId: FlowContextId,
  situationId: string,
  variantId: BrainTypeSidebarItemId
) {
  return (
    contextId === 1 &&
    situationId === 'speaking-to-authority' &&
    variantId === 'head-strong'
  )
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
  if (!isThinkerSpeakingToAuthority(contextId, situationId, variantId)) {
    return <ContextCardArt id={contextId} />
  }

  if (stepIndex === 0 && brain === 'Head') return <SvgThinkerUnderPressureAuthorityHeadStep1 />
  if (stepIndex === 1 && brain === 'Heart') return <SvgThinkerUnderPressureAuthorityHeartStep2 />
  if (stepIndex === 2 && brain === 'Gut') return <SvgThinkerUnderPressureAuthorityGutStep3 />

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
