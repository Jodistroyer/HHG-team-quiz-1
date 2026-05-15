import { useId, type ReactElement, type ReactNode } from 'react'

/** Muted quiz palette (matches SectionResults brain icons). */
const HEAD = '#2e6fa8'
const HEART = '#bb3a3a'
const GUT = '#3a8c57'

function PartSvg ({ children, defs }: { children: ReactNode; defs?: ReactNode }) {
  return (
    <svg
      className="quiz-results__archetype-part-svg"
      viewBox="0 0 320 120"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {defs ? <defs>{defs}</defs> : null}
      {children}
    </svg>
  )
}

/** Thinker · Head Strong */
function SvgNaturalDefaultThinkerVibe () {
  return (
    <PartSvg>
      <path d="M 64 60 h192" stroke={HEAD} strokeOpacity="0.9" strokeWidth="2.75" strokeLinecap="round" />
      <path d="M 160 28 L 160 92" stroke={HEAD} strokeOpacity="0.55" strokeWidth="2.25" strokeLinecap="round" />
      <circle cx="160" cy="60" r="8" fill={HEAD} fillOpacity="0.2" stroke={HEAD} strokeOpacity="0.85" strokeWidth="2" />
    </PartSvg>
  )
}

function SvgNaturalDefaultThinkerChallenge () {
  return (
    <PartSvg>
      <rect x="108" y="34" width="104" height="52" rx="10" fill="none" stroke={HEAD} strokeOpacity="0.45" strokeWidth="2.25" />
      <path
        d="M 128 60 C 148 36 172 36 192 60 C 212 84 188 84 160 84 C 132 84 108 84 128 60"
        fill="none"
        stroke={HEAD}
        strokeOpacity="0.82"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </PartSvg>
  )
}

/** Tactician · Head + Gut */
function SvgNaturalDefaultTacticianVibe () {
  return (
    <PartSvg>
      <path
        d="M 72 60 L 200 60 L 218 60 L 200 72 L 200 60 L 200 48 L 218 60"
        fill="none"
        stroke={GUT}
        strokeOpacity="0.88"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="234" y="46" width="28" height="28" fill={HEAD} fillOpacity="0.12" stroke={HEAD} strokeOpacity="0.55" strokeWidth="2.25" rx="3" />
    </PartSvg>
  )
}

function SvgNaturalDefaultTacticianChallenge () {
  return (
    <PartSvg>
      {[44, 30, 16].map((r) => (
        <circle key={r} cx="160" cy="60" r={r} fill="none" stroke={HEART} strokeOpacity={0.22 + (44 - r) * 0.015} strokeWidth="2" />
      ))}
      <circle cx="160" cy="60" r="6" fill={HEART} fillOpacity="0.35" />
    </PartSvg>
  )
}

/** Diplomat · Head + Heart — logic (blue) + empathy (red), shared overlap. */
function SvgNaturalDefaultDiplomatVibe () {
  const reactId = useId()
  const id = reactId.replace(/:/g, '')
  const clipHeart = `diplomat-vibe-heart-${id}`
  const clipHead = `diplomat-vibe-head-${id}`
  const cy = 60
  const r = 40
  const dx = 26
  const cxHead = 160 - dx
  const cxHeart = 160 + dx
  return (
    <PartSvg
      defs={
        <>
          <clipPath id={clipHeart}>
            <circle cx={cxHeart} cy={cy} r={r} />
          </clipPath>
          <clipPath id={clipHead}>
            <circle cx={cxHead} cy={cy} r={r} />
          </clipPath>
        </>
      }
    >
      <circle
        cx={cxHead}
        cy={cy}
        r={r}
        fill={HEAD}
        fillOpacity="0.34"
        clipPath={`url(#${clipHeart})`}
      />
      <circle
        cx={cxHeart}
        cy={cy}
        r={r}
        fill={HEART}
        fillOpacity="0.3"
        clipPath={`url(#${clipHead})`}
      />
      <circle cx={cxHead} cy={cy} r={r} fill="none" stroke={HEAD} strokeOpacity="0.88" strokeWidth="2.5" />
      <circle cx={cxHeart} cy={cy} r={r} fill="none" stroke={HEART} strokeOpacity="0.88" strokeWidth="2.5" />
    </PartSvg>
  )
}

/** Preparation loop — infinity: blue (logic) left lobe, red (empathy) right lobe. */
function SvgNaturalDefaultDiplomatChallenge () {
  const cx = 160
  const cy = 60
  return (
    <PartSvg>
      <path
        d={`M ${cx} ${cy} C 94 26 94 94 ${cx} ${cy}`}
        fill="none"
        stroke={HEAD}
        strokeOpacity="0.88"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M ${cx} ${cy} C 226 26 226 94 ${cx} ${cy}`}
        fill="none"
        stroke={HEART}
        strokeOpacity="0.88"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </PartSvg>
  )
}

/** Empath · Heart Strong */
function SvgNaturalDefaultEmpathVibe () {
  return (
    <PartSvg>
      {[44, 30, 16].map((r) => (
        <circle key={r} cx="160" cy="60" r={r} fill="none" stroke={HEART} strokeOpacity={0.22 + (44 - r) * 0.015} strokeWidth="2" />
      ))}
      <circle cx="160" cy="60" r="6" fill={HEART} fillOpacity="0.35" />
    </PartSvg>
  )
}

function SvgNaturalDefaultEmpathChallenge () {
  const knot =
    'M 138 40' +
    ' C 178 22 232 38 238 64' +
    ' C 244 90 208 114 172 106' +
    ' C 136 98 96 118 88 88' +
    ' C 80 58 108 36 144 42' +
    ' C 180 48 214 72 206 96' +
    ' C 198 120 162 126 138 108' +
    ' C 114 90 106 62 124 48' +
    ' C 142 34 138 40 138 40'
  return (
    <PartSvg>
      <path
        d={knot}
        fill="none"
        stroke={HEART}
        strokeOpacity="0.78"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 152 52 C 172 68 188 58 198 74 C 208 90 186 98 168 88 C 150 78 148 62 152 52"
        fill="none"
        stroke={HEART}
        strokeOpacity="0.42"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </PartSvg>
  )
}

/** Defender · Heart + Gut */
function SvgNaturalDefaultDefenderVibe () {
  const cx = 160
  const cy = 60
  return (
    <PartSvg>
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const r = (deg * Math.PI) / 180
        return (
          <path
            key={deg}
            d={`M ${cx + Math.cos(r) * 14} ${cy + Math.sin(r) * 14} L ${cx + Math.cos(r) * 40} ${cy + Math.sin(r) * 40}`}
            stroke={HEART}
            strokeOpacity="0.5"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
        )
      })}
      <circle cx={cx} cy={cy} r="10" fill={GUT} fillOpacity="0.2" stroke={GUT} strokeOpacity="0.75" strokeWidth="2" />
    </PartSvg>
  )
}

function SvgNaturalDefaultDefenderChallenge () {
  return (
    <PartSvg>
      <path d="M 56 72 L 88 48 L 120 76 L 152 44 L 184 80 L 216 52 L 264 72" fill="none" stroke={GUT} strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 56 88 L 264 88" stroke={HEART} strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
    </PartSvg>
  )
}

/** Advisor · Heart + Head — red circle (care) with blue line (clarity) on top. */
function SvgNaturalDefaultAdvisorVibe () {
  const cx = 160
  const cy = 62
  const r = 38
  const lineY = cy - 14
  const lineHalf = 44
  return (
    <PartSvg>
      <circle cx={cx} cy={cy} r={r} fill={HEART} fillOpacity="0.1" stroke={HEART} strokeOpacity="0.82" strokeWidth="2.75" />
      <path
        d={`M ${cx - lineHalf} ${lineY} L ${cx + lineHalf} ${lineY}`}
        fill="none"
        stroke={HEAD}
        strokeOpacity="0.9"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </PartSvg>
  )
}

function SvgNaturalDefaultAdvisorChallenge () {
  return (
    <PartSvg>
      <path d="M 120 36 L 120 84 M 200 36 L 200 84" stroke={HEART} strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" />
      <path d="M 128 60 h64" stroke={HEAD} strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 6" />
    </PartSvg>
  )
}

/** Doer · Gut Strong */
function SvgNaturalDefaultDoerVibe () {
  return (
    <PartSvg>
      <path d="M 76 60 L 210 60" stroke={GUT} strokeOpacity="0.88" strokeWidth="3.25" strokeLinecap="round" />
      <path d="M 210 46 L 232 60 L 210 74" fill="none" stroke={GUT} strokeOpacity="0.92" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    </PartSvg>
  )
}

/** Instinct outruns Head + Heart — arrow ahead; clarity and care tilt behind. */
function SvgNaturalDefaultDoerChallenge () {
  const y = 60
  return (
    <PartSvg>
      <g transform="rotate(-22 86 56)">
        <path
          d="M 86 46 L 96 56 L 86 66 L 76 56 Z"
          fill="none"
          stroke={HEAD}
          strokeOpacity="0.52"
          strokeWidth="2.25"
          strokeLinejoin="round"
        />
      </g>
      <g transform="rotate(18 118 58)">
        <circle cx="118" cy="58" r="11" fill="none" stroke={HEART} strokeOpacity="0.52" strokeWidth="2.25" />
      </g>
      <path
        d={`M 162 ${y} L 228 ${y}`}
        fill="none"
        stroke={GUT}
        strokeOpacity="0.92"
        strokeWidth="3.25"
        strokeLinecap="round"
      />
      <path
        d={`M 228 ${y - 13} L 250 ${y} L 228 ${y + 13}`}
        fill="none"
        stroke={GUT}
        strokeOpacity="0.95"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </PartSvg>
  )
}

/** Engineer · Gut + Head — frame (logic) with centered tick (decisive call). */
function SvgNaturalDefaultEngineerVibe () {
  const cx = 160
  const cy = 60
  return (
    <PartSvg>
      <rect x="100" y="32" width="120" height="56" rx="10" fill="none" stroke={HEAD} strokeOpacity="0.55" strokeWidth="2.25" />
      <path
        d={`M ${cx - 20} ${cy + 2} l10 10 22-26`}
        fill="none"
        stroke={GUT}
        strokeOpacity="0.9"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </PartSvg>
  )
}

function SvgNaturalDefaultEngineerChallenge () {
  return (
    <PartSvg>
      <rect x="108" y="36" width="104" height="48" rx="8" fill="none" stroke={GUT} strokeOpacity="0.85" strokeWidth="3" />
      <path d="M 132 60 L 188 60" stroke={GUT} strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
    </PartSvg>
  )
}

/** Hero · Gut + Heart — green square (gut) with red circle + smile (care at the center). */
function SvgNaturalDefaultHeroVibe () {
  const cx = 160
  const cy = 60
  const s = 72
  const x = cx - s / 2
  const y = cy - s / 2
  return (
    <PartSvg>
      <rect
        x={x}
        y={y}
        width={s}
        height={s}
        rx="12"
        ry="12"
        fill="rgba(58, 140, 87, 0.1)"
        stroke={GUT}
        strokeOpacity="0.88"
        strokeWidth="2.75"
      />
      <circle
        cx={cx}
        cy={cy}
        r="22"
        fill={HEART}
        fillOpacity="0.14"
        stroke={HEART}
        strokeOpacity="0.82"
        strokeWidth="2.5"
      />
      <circle cx={cx - 7} cy={cy - 4} r="2.25" fill={HEART} fillOpacity="0.85" />
      <circle cx={cx + 7} cy={cy - 4} r="2.25" fill={HEART} fillOpacity="0.85" />
      <path
        d={`M ${cx - 9} ${cy + 6} Q ${cx} ${cy + 13} ${cx + 9} ${cy + 6}`}
        fill="none"
        stroke={HEART}
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </PartSvg>
  )
}

/** Frenzy + emotional heat — scattered motion with a red zigzag cutting through. */
function SvgNaturalDefaultHeroChallenge () {
  const strokes = [
    [64, 44, 84, 64],
    [236, 50, 216, 70],
    [72, 88, 92, 72],
    [248, 82, 228, 98],
    [140, 28, 160, 48],
    [180, 92, 200, 72],
  ] as const
  const zigzag =
    'M 48 34' +
    ' L 82 62 L 68 94 L 112 48 L 98 86 L 146 40' +
    ' L 172 78 L 158 102 L 206 52 L 232 88 L 218 28 L 272 58'
  return (
    <PartSvg>
      {strokes.map(([x1, y1, x2, y2]) => (
        <path
          key={`${x1}-${y1}`}
          d={`M ${x1} ${y1} L ${x2} ${y2}`}
          stroke={GUT}
          strokeOpacity="0.32"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
      <path
        d={zigzag}
        fill="none"
        stroke={HEART}
        strokeOpacity="0.88"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </PartSvg>
  )
}

/** Sovereign · Head + Heart + Gut */
function SvgNaturalDefaultSovereignVibe () {
  const nodes = [
    { x: 160, y: 32, c: HEAD },
    { x: 96, y: 88, c: HEART },
    { x: 224, y: 88, c: GUT },
  ] as const
  return (
    <PartSvg>
      <path d="M 160 32 L 96 88 L 224 88 Z" fill="none" stroke="#94a3b8" strokeOpacity="0.35" strokeWidth="2" strokeLinejoin="round" />
      {nodes.map(({ x, y, c }) => (
        <circle key={c} cx={x} cy={y} r="10" fill={c} fillOpacity="0.18" stroke={c} strokeOpacity="0.85" strokeWidth="2.25" />
      ))}
    </PartSvg>
  )
}

function sovereignSpokeArrow (
  cx: number,
  cy: number,
  tipX: number,
  tipY: number,
  color: string,
  wing: number,
) {
  const dx = tipX - cx
  const dy = tipY - cy
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const back = wing * 2.1
  const lx = tipX - ux * back
  const ly = tipY - uy * back
  const px = -uy
  const py = ux
  const stemX = tipX - ux * wing * 0.65
  const stemY = tipY - uy * wing * 0.65
  return (
    <>
      <path
        d={`M ${cx} ${cy} L ${stemX} ${stemY}`}
        stroke={color}
        strokeOpacity="0.55"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d={`M ${lx + px * wing} ${ly + py * wing} L ${tipX} ${tipY} L ${lx - px * wing} ${ly - py * wing}`}
        fill="none"
        stroke={color}
        strokeOpacity="0.78"
        strokeWidth={wing >= 10 ? 2.75 : 2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  )
}

function SvgNaturalDefaultSovereignChallenge () {
  const cx = 160
  const cy = 60
  const arms = [
    { x: 160, y: 28, c: HEAD, wing: 6 },
    { x: 88, y: 92, c: HEART, wing: 11 },
    { x: 232, y: 92, c: GUT, wing: 8 },
  ] as const
  return (
    <PartSvg>
      {arms.map(({ x, y, c, wing }) => (
        <g key={c}>{sovereignSpokeArrow(cx, cy, x, y, c, wing)}</g>
      ))}
      <circle cx={cx} cy={cy} r="8" fill="#94a3b8" fillOpacity="0.2" />
    </PartSvg>
  )
}

type PartVariant = 'vibe' | 'challenge'

const ART: Record<string, Record<PartVariant, () => ReactElement>> = {
  'Head Strong': {
    vibe: SvgNaturalDefaultThinkerVibe,
    challenge: SvgNaturalDefaultThinkerChallenge,
  },
  'Head + Gut': {
    vibe: SvgNaturalDefaultTacticianVibe,
    challenge: SvgNaturalDefaultTacticianChallenge,
  },
  'Head + Heart': {
    vibe: SvgNaturalDefaultDiplomatVibe,
    challenge: SvgNaturalDefaultDiplomatChallenge,
  },
  'Heart Strong': {
    vibe: SvgNaturalDefaultEmpathVibe,
    challenge: SvgNaturalDefaultEmpathChallenge,
  },
  'Heart + Gut': {
    vibe: SvgNaturalDefaultDefenderVibe,
    challenge: SvgNaturalDefaultDefenderChallenge,
  },
  'Heart + Head': {
    vibe: SvgNaturalDefaultAdvisorVibe,
    challenge: SvgNaturalDefaultAdvisorChallenge,
  },
  'Gut Strong': {
    vibe: SvgNaturalDefaultDoerVibe,
    challenge: SvgNaturalDefaultDoerChallenge,
  },
  'Gut + Head': {
    vibe: SvgNaturalDefaultEngineerVibe,
    challenge: SvgNaturalDefaultEngineerChallenge,
  },
  'Gut + Heart': {
    vibe: SvgNaturalDefaultHeroVibe,
    challenge: SvgNaturalDefaultHeroChallenge,
  },
  'Head + Heart + Gut': {
    vibe: SvgNaturalDefaultSovereignVibe,
    challenge: SvgNaturalDefaultSovereignChallenge,
  },
}

export function NaturalDefaultArchetypePartArt ({
  archetypeKey,
  variant,
}: {
  archetypeKey: string
  variant: PartVariant
}) {
  const pair = ART[archetypeKey]
  if (!pair) return null
  const Svg = pair[variant]
  return <Svg />
}
