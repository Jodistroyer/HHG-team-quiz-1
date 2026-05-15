import { CONTEXT_BACKGROUND, ContextCardArt } from '../../../Quiz/ContextArt'
import type { FlowStepArtProps } from '../flowTypes'
/** Doing Work · Burnout loop — tightening spiral (Head / Heart / Gut draining together). */
export function BurnoutLoopCardArt () {
  const bg = CONTEXT_BACKGROUND[2]
  const cy = 48
  return (
    <svg
      className="quiz-intro-card__svg"
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <rect width="320" height="200" fill={bg} />
      <path
        d={`M 248 ${cy} A 88 88 0 1 1 96 ${cy} A 64 64 0 1 0 224 ${cy} A 40 40 0 1 1 120 ${cy}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="160" cy={cy} r="6" fill="#ffffff" fillOpacity="0.45" />
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
