import './ContextArt.css'

export type QuizSelectedContextId = 1 | 2 | 3 | 4

const TITLE_TO_ID: Record<string, QuizSelectedContextId> = {
  'under pressure': 1,
  'doing work': 2,
  'with people': 3,
  'getting better': 4,
}

export function contextIdForTitle (title: string): QuizSelectedContextId | undefined {
  return TITLE_TO_ID[title.trim().toLowerCase()]
}

/**
 * Decorative purple SVG art per quiz context.
 * Originally lived inline in QuizIntro.tsx as the hero card image; now reused
 * as a small thumbnail next to result titles.
 */
export function ContextCardArt ({ id }: { id: QuizSelectedContextId }) {
  if (id === 1) {
    return (
      <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <rect width="320" height="200" fill="#7d3dbd" />
        <path
          d="M96 78 L 120 62 L 144 78 L 168 62 L 192 78 L 216 62 L 240 78"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.25"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M96 104 L 120 88 L 144 104 L 168 88 L 192 104 L 216 88 L 240 104"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M96 132 L 120 116 L 144 132 L 168 116 L 192 132 L 216 116 L 240 132"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    )
  }
  if (id === 2) {
    return (
      <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <rect width="320" height="200" fill="#7d3dbd" />
        <rect x="46" y="58" width="84" height="84" rx="12" fill="rgba(255, 255, 255, 0.12)" stroke="#ffffff" strokeWidth="2" />
        <path d="M160 72 h124" stroke="#ffffff" strokeWidth="2" opacity="0.55" />
        <path d="M160 102 h96" stroke="#ffffff" strokeWidth="2" opacity="0.75" />
        <path d="M160 132 h110" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
        <circle cx="204" cy="102" r="6" fill="rgba(255, 255, 255, 0.35)" />
      </svg>
    )
  }
  if (id === 3) {
    return (
      <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <rect width="320" height="200" fill="#7d3dbd" />
        <circle cx="122" cy="96" r="46" fill="rgba(255, 255, 255, 0.1)" stroke="#ffffff" strokeWidth="2" />
        <circle cx="202" cy="96" r="46" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.75" />
      </svg>
    )
  }
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect width="320" height="200" fill="#7d3dbd" />
      <g transform="translate(320 0) scale(-1 1)">
        <path
          d="M40 120 Q100 72 160 120 T280 120"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.85"
          strokeLinecap="round"
        />
        <circle cx="200" cy="87" r="7" fill="rgba(255, 255, 255, 0.15)" stroke="#ffffff" strokeWidth="2" opacity="0.9" />
      </g>
    </svg>
  )
}

interface ContextArtThumbProps {
  /** Either a numeric id (1–4) or a section title. */
  id?: QuizSelectedContextId
  title?: string
  /** Visual size variant. `sm` is used in the change-across list, `md` in section cards. */
  size?: 'sm' | 'md'
}

/**
 * Small purple thumbnail wrapping `ContextCardArt`, sized to read inline with
 * a title. Use next to context titles in result views.
 */
export function ContextArtThumb ({ id, title, size = 'md' }: ContextArtThumbProps) {
  const resolved: QuizSelectedContextId | undefined = id ?? (title ? contextIdForTitle(title) : undefined)
  if (!resolved) return null
  return (
    <span className={`quiz-context-thumb quiz-context-thumb--${size}`} aria-hidden="true">
      <ContextCardArt id={resolved} />
    </span>
  )
}
