import './QuizIntro.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export type QuizSelectedContextId = 1 | 2 | 3 | 4

function ContextCardArt ({ id }: { id: QuizSelectedContextId }) {
  if (id === 1) {
    return (
      <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" aria-hidden>
        <rect width="320" height="200" fill="#ffffff" />
        <path
          d="M96 78 L 120 62 L 144 78 L 168 62 L 192 78 L 216 62 L 240 78"
          fill="none"
          stroke="#7d3dbd"
          strokeWidth="2.25"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M96 104 L 120 88 L 144 104 L 168 88 L 192 104 L 216 88 L 240 104"
          fill="none"
          stroke="#7d3dbd"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M96 132 L 120 116 L 144 132 L 168 116 L 192 132 L 216 116 L 240 132"
          fill="none"
          stroke="#7d3dbd"
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
      <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" aria-hidden>
        <rect width="320" height="200" fill="#ffffff" />
        <rect x="46" y="58" width="84" height="84" rx="12" fill="rgba(125, 61, 189, 0.07)" stroke="#7d3dbd" strokeWidth="2" />
        <path d="M160 72 h124" stroke="#7d3dbd" strokeWidth="2" opacity="0.55" />
        <path d="M160 102 h96" stroke="#7d3dbd" strokeWidth="2" opacity="0.75" />
        <path d="M160 132 h110" stroke="#7d3dbd" strokeWidth="2" opacity="0.4" />
        <circle cx="204" cy="102" r="6" fill="#7d3dbd" opacity="0.25" />
      </svg>
    )
  }
  if (id === 3) {
    return (
      <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" aria-hidden>
        <rect width="320" height="200" fill="#ffffff" />
        <circle cx="122" cy="96" r="46" fill="rgba(125, 61, 189, 0.06)" stroke="#7d3dbd" strokeWidth="2" />
        <circle cx="202" cy="96" r="46" fill="none" stroke="#7d3dbd" strokeWidth="2" opacity="0.75" />

      </svg>
    )
  }
  return (
    <svg className="quiz-intro-card__svg" viewBox="0 0 320 200" aria-hidden>
      <rect width="320" height="200" fill="#ffffff" />
      <g transform="translate(320 0) scale(-1 1)">
        <path
          d="M40 120 Q100 72 160 120 T280 120"
          fill="none"
          stroke="#7d3dbd"
          strokeWidth="2"
          opacity="0.85"
          strokeLinecap="round"
        />
        <circle cx="200" cy="87" r="7" fill="rgba(125, 61, 189, 0.08)" stroke="#7d3dbd" strokeWidth="2" opacity="0.9" />
      </g>
    </svg>
  )
}

const CONTEXT_CARDS: Array<{
  id: QuizSelectedContextId
  title: string
  contextLine: string
  description: string
  youGet: string[]
}> = [
  {
    id: 1,
    title: 'Under Pressure',
    contextLine: 'Time is tight, stakes are high, and consequences are immediate.',
    description: 'How you default when speed and risk take over.',
    youGet: [
      'Your instinct under stress',
      'What you prioritize first',
      'A clearer read on your dominant brain',
    ],
  },
  {
    id: 2,
    title: 'Doing Work',
    contextLine: 'Normal execution mode. No crisis, just getting things done.',
    description: 'How you decide, plan, and move work forward.',
    youGet: [
      'How you create momentum',
      'Your natural planning style',
      'Where you may overthink or rush',
    ],
  },
  {
    id: 3,
    title: 'With People',
    contextLine: 'Relationships and social dynamics.',
    description: 'How you show up in tension, disagreement, and group settings.',
    youGet: [
      'What you notice in others first',
      'How you handle conflict',
      'Your default contribution in groups',
    ],
  },
  {
    id: 4,
    title: 'Getting Better',
    contextLine: 'Reflection, growth, and self-improvement over time.',
    description: 'How you learn, reflect, and define progress.',
    youGet: [
      'How you evaluate success',
      'How you integrate feedback',
      'What helps you grow fastest',
    ],
  },
]

function estimateTimeLabel (questionCount: number): string {
  if (questionCount <= 0) return '0 min'
  const secondsPer = 45
  const min = Math.max(1, Math.round((questionCount * secondsPer) / 60))
  if (min <= 2) return '~2 min'
  if (min <= 4) return '~4 min'
  if (min <= 6) return '~6 min'
  return `~${min} min`
}

export function QuizIntro ({
  selectedContextIds,
  onToggleContext,
  onReset,
  onStart,
}: {
  selectedContextIds: QuizSelectedContextId[]
  onToggleContext: (id: QuizSelectedContextId) => void
  onReset: () => void
  onStart: () => void
}) {
  const selectedQuestions = selectedContextIds.length * 5
  const canStart = selectedContextIds.length > 0

  return (
    <div className="app quiz-intro-page">
      <div className="quiz-intro-shell">
        <header className="quiz-intro-hero">
          <h1 className="quiz-intro-hero__title">Head Heart Gut Quiz</h1>
          <p className="quiz-intro-hero__subtitle">
            A practical way to understand how someone decides, reacts, and moves forward. Use it for yourself, or use it to understand someone else.
          </p>
        </header>

        <main className="quiz-intro-grid">
          <section className="quiz-intro-copy" aria-label="What to expect">
            <div className="quiz-intro-kicker">Start here</div>
            <h2 className="quiz-intro-h1">Pick contexts, then answer fast</h2>
            <p className="quiz-intro-lede">
              Choose the situations that feel relevant right now. You can do one context or all four. Your results will reflect what you complete.
            </p>

            <div className="quiz-intro-steps" aria-label="Steps">
              <div className="quiz-intro-step">
                <div className="quiz-intro-step__num">1</div>
                <div className="quiz-intro-step__body">
                  <div className="quiz-intro-step__title">Choose contexts</div>
                  <div className="quiz-intro-step__text">Select what you want to answer today.</div>
                </div>
              </div>
              <div className="quiz-intro-step">
                <div className="quiz-intro-step__num">2</div>
                <div className="quiz-intro-step__body">
                  <div className="quiz-intro-step__title">Answer intuitively</div>
                  <div className="quiz-intro-step__text">Use the first real scenario that comes to mind.</div>
                </div>
              </div>
              <div className="quiz-intro-step">
                <div className="quiz-intro-step__num">3</div>
                <div className="quiz-intro-step__body">
                  <div className="quiz-intro-step__title">Read the shift</div>
                  <div className="quiz-intro-step__text">See how you change across contexts.</div>
                </div>
              </div>
            </div>

            <div className="quiz-intro-section">
              <h2 className="quiz-intro-h2">What this is not</h2>
              <p className="quiz-intro-p">
                This is just a practical tool. It is not judgment.
              </p>
              <ul className="quiz-intro-list">
                <li>A diagnosis or a clinical assessment</li>
                <li>A measure of intelligence, empathy, or leadership</li>
                <li>A fixed identity</li>
              </ul>
            </div>

            <div className="quiz-intro-section" role="note" aria-label="Important note">
              <h2 className="quiz-intro-h2">Before you answer</h2>
              <p className="quiz-intro-p">
                These questions are intentionally vague. That is the point.
              </p>
              <ul className="quiz-intro-list">
                <li>These questions are cognitively heavy. Take your time.</li>
                <li>Use the first real scenario from your experience that comes to mind.</li>
                <li>For repeatable results, answer from a consistent time period and situation type.</li>
              </ul>
            </div>

          </section>

          <section className="quiz-intro-contexts" aria-label="Choose contexts">
            <div className="quiz-intro-contexts__header">
              <div className="quiz-intro-contexts__header-left">
                <h2 className="quiz-intro-contexts__title">Choose contexts</h2>
                <div className="quiz-intro-contexts__hint" aria-label="How to answer">
                  <p className="quiz-intro-contexts__hint-line">
                    Select what you want to answer. Each context is 5 questions.
                  </p>
                  <p className="quiz-intro-contexts__hint-line">
                    <strong className="quiz-intro-contexts__hint-label">How to Answer:</strong>{' '}
                    Pick 1 choice that fits best. If you are torn, pick a second choice. It counts half. You can change your mind before moving on.
                  </p>
                </div>
              </div>
              <div className="quiz-intro-contexts__header-right" aria-label="Quiz length estimate">
                <span className="quiz-intro-pill">{selectedQuestions} questions</span>
                <span className="quiz-intro-pill">{estimateTimeLabel(selectedQuestions)}</span>
              </div>
            </div>

            <div className="quiz-intro-cards" role="group" aria-label="Context cards">
              {CONTEXT_CARDS.map((card) => {
                const selected = selectedContextIds.includes(card.id)
                return (
                  <button
                    key={card.id}
                    type="button"
                    className={`quiz-intro-card ${selected ? 'is-selected' : ''}`}
                    onClick={() => onToggleContext(card.id)}
                    aria-pressed={selected}
                  >
                    {selected && (
                      <span className="quiz-intro-card__corner" aria-hidden="true">
                        <span className="quiz-intro-card__corner-check">
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                      </span>
                    )}
                    <div className="quiz-intro-card__media" aria-hidden="true">
                      <ContextCardArt id={card.id} />
                    </div>
                    <div className="quiz-intro-card__body">
                      <div className="quiz-intro-card__top">
                        <h3 className="quiz-intro-card__title">{card.title}</h3>
                        <span className="quiz-intro-card__meta">
                          <span className="quiz-intro-card__meta-questions">5 questions</span>
                        </span>
                      </div>
                      <p className="quiz-intro-card__context">{card.contextLine}</p>
                      <p className="quiz-intro-card__desc">{card.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="quiz-intro-actions">
              <div className="quiz-intro-actions__left">
                <button className="btn btn-secondary" onClick={onReset}>
                  Reset
                </button>
              </div>

              <div className="quiz-intro-actions__center" aria-live="polite">
                {!canStart ? (
                  <p className="quiz-intro-actions__note" role="status">
                    Select at least 1 context to start.
                  </p>
                ) : (
                  <span className="quiz-intro-actions__spacer" aria-hidden="true" />
                )}
              </div>

              <div className="quiz-intro-actions__right">
                <button className="btn btn-primary" disabled={!canStart} onClick={onStart}>
                  Start quiz
                  <span className="btn-icon">→</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

