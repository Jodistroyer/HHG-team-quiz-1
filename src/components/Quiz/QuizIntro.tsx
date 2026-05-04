import './QuizIntro.css'
import type { CSSProperties } from 'react'
import { QuizIntroQuestionPreview } from './QuizIntroQuestionPreview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFire,
  faBriefcase,
  faPeopleGroup,
  faChartLine,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { CONTEXT_BACKGROUND, ContextCardArt, type QuizSelectedContextId } from './ContextArt'

export type { QuizSelectedContextId }

const CONTEXT_TITLE_ICONS: Record<QuizSelectedContextId, IconDefinition> = {
  1: faFire,
  2: faBriefcase,
  3: faPeopleGroup,
  4: faChartLine,
}

const CONTEXT_CARDS: Array<{
  id: QuizSelectedContextId
  title: string
  contextLine: string
}> = [
  {
    id: 1,
    title: 'Under Pressure',
    contextLine: 'Time is tight, stakes are high, and consequences are immediate.',
  },
  {
    id: 2,
    title: 'Doing Work',
    contextLine: 'Normal execution mode. Just getting things done.',
  },
  {
    id: 3,
    title: 'With People',
    contextLine: 'Relationships and social dynamics.',
  },
  {
    id: 4,
    title: 'Getting Better',
    contextLine: 'Reflection, growth, and self-improvement over time.',
  },
]

/** ~45s per question, same buckets as the pre-quiz estimate (used for resume / partial flows). */
export function estimateTimeLabel (questionCount: number): string {
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
  onSelectAll,
  onStart,
}: {
  selectedContextIds: QuizSelectedContextId[]
  onToggleContext: (id: QuizSelectedContextId) => void
  onSelectAll: () => void
  onStart: () => void
}) {
  const selectedQuestions = selectedContextIds.length * 5
  const canStart = selectedContextIds.length > 0
  const allContextsSelected = selectedContextIds.length === 4
  const selectedContextCount = selectedContextIds.length
  const selectedContextsPill =
    selectedContextCount === 1 ? '1 selected' : `${selectedContextCount} selected`

  return (
    <div className="app quiz-intro-page">
      <div className="quiz-intro-shell">
        <div className="quiz-intro-columns">
          <div className="quiz-intro-columns__main">
            <header className="quiz-intro-hero">
              <h1 className="quiz-intro-hero__title">Head Heart Gut Quiz</h1>
              <p className="quiz-intro-hero__subtitle">
                A practical way to understand how someone decides, reacts, and moves forward. Use it for yourself, or use it to understand someone else.
              </p>
            </header>

            <section className="quiz-intro-copy" aria-label="What to expect">
              <div className="quiz-intro-kicker">Start here</div>
              <h2 className="quiz-intro-h1">In the Quiz, Pick up to 2 Answers.</h2>
              <p className="quiz-intro-lede">
                Choose the situations that feel relevant right now. You can do one context or all four. Your results will reflect what you complete.
              </p>

              <QuizIntroQuestionPreview />

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
            </section>
          </div>

          <section className="quiz-intro-contexts" aria-label="Choose contexts">
            <div className="quiz-intro-contexts__body">
              <div className="quiz-intro-contexts__header">
                <div className="quiz-intro-contexts__header-left">
                  <h2 className="quiz-intro-contexts__title">Choose contexts</h2>
                  <div className="quiz-intro-contexts__hint" aria-label="Context selection">
                    <strong className="quiz-intro-contexts__hint-line">
                      Select what you want to Answer. Each Context has 5 Questions.
                    </strong>
                  </div>
                </div>
                <div
                  className="quiz-intro-contexts__header-right"
                  aria-label={`${selectedContextCount} of 4 contexts selected. ${selectedQuestions} questions, ${estimateTimeLabel(selectedQuestions)}.`}
                >
                  <span className="quiz-intro-pill">{selectedContextsPill}</span>
                  <span className="quiz-intro-pill">{selectedQuestions} questions</span>
                  <span className="quiz-intro-pill">{estimateTimeLabel(selectedQuestions)}</span>
                </div>
              </div>

              <div className="quiz-intro-cards" role="group" aria-label="Context cards">
                {CONTEXT_CARDS.map((card) => {
                  const selected = selectedContextIds.includes(card.id)
                  // Cascades to .quiz-intro-card__media background, plus
                  // .quiz-intro-card__title and __title-icon colors.
                  const cardStyle = {
                    '--section-context-color': CONTEXT_BACKGROUND[card.id],
                  } as CSSProperties
                  return (
                    <button
                      key={card.id}
                      type="button"
                      className={`quiz-intro-card ${selected ? 'is-selected' : ''}`}
                      onClick={() => onToggleContext(card.id)}
                      aria-pressed={selected}
                      style={cardStyle}
                    >
                      {selected && (
                        <>
                          <span className="quiz-intro-card__corner" aria-hidden="true" />
                          <span className="quiz-intro-card__corner-dot" aria-hidden="true" />
                        </>
                      )}
                      <div
                        className="quiz-intro-card__media"
                        aria-hidden="true"
                      >
                        <ContextCardArt id={card.id} />
                      </div>
                      <div className="quiz-intro-card__body">
                        <div className="quiz-intro-card__top">
                          <span className="quiz-intro-card__checkbox" aria-hidden="true" />
                          <span className="quiz-intro-card__title-icon" aria-hidden="true">
                            <FontAwesomeIcon icon={CONTEXT_TITLE_ICONS[card.id]} />
                          </span>
                          <h3 className="quiz-intro-card__title">{card.title}</h3>
                          <span className="quiz-intro-card__meta">
                            <span className="quiz-intro-card__meta-questions">5 questions</span>
                          </span>
                        </div>
                        <p className="quiz-intro-card__context">{card.contextLine}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="quiz-intro-actions">
                <div className="quiz-intro-actions__left">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onSelectAll}
                    disabled={allContextsSelected}
                  >
                    Select all
                  </button>
                </div>

                <div className="quiz-intro-actions__center" aria-live="polite">
                  {!canStart ? (
                    <p className="quiz-intro-actions__note" role="status">
                      <strong>Select at least 1 context to start.</strong>
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
            </div>

            <div className="quiz-intro-contexts__notes">
              <div className="quiz-intro-contexts__notes-row">
                <div className="quiz-intro-section" role="note" aria-label="Important note">
                  <div className="quiz-intro-h2-row">
                    <span className="quiz-intro-h2-row__icon" aria-hidden="true">
                      <FontAwesomeIcon icon={faTriangleExclamation} />
                    </span>
                    <h2 className="quiz-intro-h2">Before you answer</h2>
                  </div>
                  <p className="quiz-intro-p">
                    These questions are intentionally vague.
                  </p>
                  <ul className="quiz-intro-list">
                    <li>They are cognitively heavy. Take your time.</li>
                    <li>Use the first real scenario from your experience that comes to mind.</li>
                    <li> <strong>Start small. You may add more contexts anytime. </strong></li>
                  </ul>
                </div>

                <div className="quiz-intro-section">
                  <h2 className="quiz-intro-h2">This is not</h2>

                  <ul className="quiz-intro-list">
                    <li>A diagnosis or a clinical assessment</li>
                    <li>A measure of intelligence or leadership</li>
                    <li>A fixed identity / personality test</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

