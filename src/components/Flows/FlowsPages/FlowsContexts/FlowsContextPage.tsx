import { useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons'
import { CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import { FlowSituationCardArt } from '../../FlowsShared/FlowSituationCardArt'
import '../../FlowsShared/FlowCard.css'
import {
  getCompletedFlowsContextIdsForMatchedFlows,
  getMatchedFlowPreviewsForContext,
} from '../../flowsHomeMatched'
import { getContextById, type FlowContextId } from '../../flowsData'
import {
  flowsBrainProfileForStoredContext,
  flowsContextComboLabelForStoredContext,
  useFlowsQuizSnapshot,
} from '../../flowsQuizSnapshot'
import { ResumeContextQuizModal } from '../../../Quiz/ChangeResults/ResumeContextQuizModal'
import {
  countRemainingQuizQuestionsInSection,
  finishContextButtonLabel,
  isQuizContextNotInCurrentRun,
  loadQuizResumeUiState,
  persistResumeQuizContext,
} from '../../../Quiz/quizResumeContext'
import '../../../Quiz/ChangeResults/ChangeResults.css'
import '../../../Quiz/Quiz.css'
import type { FlowsBrainProfile } from '../../flowsTypes'
import {
  FlowsHomeQuickCycleRegion,
  FlowsHomeSequencePills,
  sequenceAriaLabel,
  sequenceBrainsForProfile,
  useQuickCardAutoCycle,
} from '../FlowsHome/flowsHomeShared'
import { getContextQuickQuestion } from './flowsContextCopy'
import '../FlowsHome/FlowsHome.css'
import './FlowsContextPage.css'

export interface FlowsContextPageProps {
  contextId: FlowContextId
  onOpenMatchedFlow: (
    contextId: FlowContextId,
    situationId: string,
    brainProfile?: FlowsBrainProfile
  ) => void
  onTakeQuiz?: () => void
  /** After persisting quiz resume state — typically navigates to the Quiz tab. */
  onFinishContext?: (contextId: FlowContextId) => void
}

export const FlowsContextPage = ({
  contextId,
  onOpenMatchedFlow,
  onTakeQuiz,
  onFinishContext,
}: FlowsContextPageProps) => {
  const context = getContextById(contextId)
  const quizSnap = useFlowsQuizSnapshot()
  const [quickIndex, setQuickIndex] = useState(0)
  const [resumeModalOpen, setResumeModalOpen] = useState(false)

  const completedFlowsContextIds = getCompletedFlowsContextIdsForMatchedFlows()
  const completedContextsKey = completedFlowsContextIds.join(',')
  const contextComplete = completedFlowsContextIds.includes(contextId)

  const brainProfile = flowsBrainProfileForStoredContext(contextId)
  const comboLabel = flowsContextComboLabelForStoredContext(contextId)

  const situationCycle = useMemo(() => context?.situations ?? [], [context])

  useEffect(() => {
    setQuickIndex(0)
    setResumeModalOpen(false)
  }, [contextId])

  useEffect(() => {
    if (situationCycle.length === 0) return
    setQuickIndex((i) => Math.min(i, situationCycle.length - 1))
  }, [situationCycle.length])

  const { cycleKey, advanceManual, pauseProps } = useQuickCardAutoCycle(
    situationCycle.length,
    setQuickIndex,
    { resetToken: contextId }
  )

  const matchedPreviews = useMemo(
    () =>
      quizSnap.hasCompletedQuiz && contextComplete
        ? getMatchedFlowPreviewsForContext(contextId, completedFlowsContextIds, 8)
        : [],
    [quizSnap.hasCompletedQuiz, contextComplete, contextId, completedContextsKey]
  )

  const quickSituation = situationCycle[quickIndex] ?? situationCycle[0] ?? null

  const quickSequenceBrains = useMemo(() => {
    if (quickSituation == null) return null
    return sequenceBrainsForProfile(quickSituation, brainProfile)
  }, [quickSituation, brainProfile])

  if (!context) return null

  const showQuickCard = quizSnap.hasCompletedQuiz && quickSituation != null && quickSequenceBrains != null

  const { completedWithContextIds, answers } = loadQuizResumeUiState()
  const finishContextLabel = finishContextButtonLabel(contextId, completedWithContextIds)
  const resumeModalVariant = isQuizContextNotInCurrentRun(contextId, completedWithContextIds)
    ? 'add'
    : 'finish'
  const remainingForResumeModal = countRemainingQuizQuestionsInSection(contextId, answers)

  const handleFinishContextClick = () => {
    if (!quizSnap.hasCompletedQuiz) {
      onTakeQuiz?.()
      return
    }
    setResumeModalOpen(true)
  }

  const handleResumeModalConfirm = () => {
    setResumeModalOpen(false)
    if (persistResumeQuizContext(contextId)) {
      onFinishContext?.(contextId)
    } else {
      onTakeQuiz?.()
    }
  }

  return (
    <div className="flows-home flows-context-page">
      <div className="flows-home__layout flows-home__layout--no-rail">
        <div className="flows-home__intro">
          <header className="flows-home__hero">
            <h1 className="flows-home__greeting">{context.title}</h1>
            <p className="flows-home__greeting-sub">{context.contextLine}</p>
          </header>

          {showQuickCard && quickSituation && quickSequenceBrains ? (
            <div className="flows-home__quick-wrap">
              <section
                className={`flows-home__quick-card flows-home__quick-card--ctx-${contextId}`}
                aria-label="Suggested flow for this context"
                {...pauseProps}
              >
                <FlowsHomeQuickCycleRegion cycleKey={cycleKey}>
                <div className="flows-home__quick-top">
                  <p className="flows-home__quick-label">{context.title}</p>
                  {comboLabel ? (
                    <div className="flows-home__quick-brain" aria-label={`Brain type for ${context.title}`}>
                      <span className="flows-home__brain-badge">
                        {comboLabel}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="flows-home__quick-body">
                  <div className="flows-home__quick-body-main">
                    <p className="flows-home__quick-title">
                      {getContextQuickQuestion(contextId, quickSituation.id)}
                    </p>
                    <div className="flows-home__seq-pills" aria-label={sequenceAriaLabel(quickSequenceBrains)}>
                      <FlowsHomeSequencePills brains={quickSequenceBrains} variant="quick" />
                    </div>
                  </div>
                  <span
                    className="flows-home__quick-art"
                    style={{ background: CONTEXT_BACKGROUND[contextId] }}
                    aria-hidden
                  >
                    <FlowSituationCardArt contextId={contextId} situationId={quickSituation.id} />
                  </span>
                </div>
                </FlowsHomeQuickCycleRegion>
                <div className="flows-home__quick-actions">
                  <button
                    type="button"
                    className="flows-home__btn flows-home__btn--primary"
                    onClick={() => onOpenMatchedFlow(contextId, quickSituation.id, brainProfile)}
                  >
                    Find a flow
                  </button>
                  <button
                    type="button"
                    className="flows-home__btn flows-home__btn--ghost"
                    onClick={advanceManual}
                    disabled={situationCycle.length <= 1}
                  >
                    Not this
                  </button>
                </div>
              </section>
            </div>
          ) : null}

          {!quizSnap.hasCompletedQuiz ? (
            <section className="flows-home__start-card" aria-label="Take the quiz">
              <p className="flows-home__start-eyebrow">Personalise this context</p>
              <h2 className="flows-home__start-title">Take the quiz to unlock sequences matched to you</h2>
              <p className="flows-home__start-body">
                Your brain type in {context.title.toLowerCase()} shapes which flows we suggest first.
              </p>
              {onTakeQuiz ? (
                <button type="button" className="flows-home__start-cta" onClick={onTakeQuiz}>
                  Take the quiz
                </button>
              ) : null}
            </section>
          ) : null}
        </div>

        <div className="flows-home__feed">
          <div className="flows-home__section-head">
            <h2 className="flows-home__section-title">
              {quizSnap.hasCompletedQuiz ? "What's happening now" : 'All situations'}
            </h2>
          </div>

          <ul className="flows-home__moments" role="list">
            {context.situations.map((sit) => (
              <li key={sit.id} className="flows-home__moment">
                <button
                  type="button"
                  className="flows-home__moment-btn"
                  onClick={() =>
                    onOpenMatchedFlow(
                      contextId,
                      sit.id,
                      quizSnap.hasCompletedQuiz ? brainProfile : undefined
                    )
                  }
                >
                  <span
                    className="flows-home__moment-art"
                    style={{ background: CONTEXT_BACKGROUND[contextId] }}
                    aria-hidden
                  >
                    <FlowSituationCardArt contextId={contextId} situationId={sit.id} />
                  </span>
                  <span className="flows-home__moment-text">
                    <span className="flows-home__moment-title">{sit.cardTitle}</span>
                    {sit.cardDescription ? (
                      <span className="flows-home__moment-sub">{sit.cardDescription}</span>
                    ) : null}
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} className="flows-home__moment-chevron" />
                </button>
              </li>
            ))}
          </ul>

          <>
            <hr className="flows-home__divider" />

            <div className="flows-home__section-head">
              <h2 className="flows-home__section-title">Matched to you</h2>
            </div>

            {contextComplete ? (
              matchedPreviews.length > 0 ? (
                <div className="flows-home__cards-scroll" role="list">
                  {matchedPreviews.map(({ situation, featured }) => {
                    const stripSequenceBrains = sequenceBrainsForProfile(situation, brainProfile)
                    return (
                      <div key={situation.id} className="flows-home__cards-item" role="listitem">
                        <button
                          type="button"
                          className={`flows-home__sit-card flows-home__sit-card--ctx-${contextId}${featured ? ' flows-home__sit-card--featured' : ''}`}
                          onClick={() => onOpenMatchedFlow(contextId, situation.id, brainProfile)}
                        >
                          <span
                            className="flows-home__sit-thumb"
                            style={{ background: CONTEXT_BACKGROUND[contextId] }}
                            aria-hidden
                          >
                            <FlowSituationCardArt contextId={contextId} situationId={situation.id} />
                          </span>
                          <div className="flows-home__sit-card-body">
                            <div className="flows-home__sit-card-top">
                              <span className={`flows-home__sit-ctx flows-home__sit-ctx--${contextId}`}>
                                {context.title}
                              </span>
                              {featured ? (
                                <span className="flows-home__sit-star" aria-label="Featured">
                                  <FontAwesomeIcon icon={faStar} />
                                </span>
                              ) : null}
                            </div>
                            <span className="flows-home__sit-title">{situation.cardTitle}</span>
                            {situation.cardDescription ? (
                              <span className="flow-card__desc">{situation.cardDescription}</span>
                            ) : null}
                            <div
                              className="flows-home__sit-seq"
                              aria-label={sequenceAriaLabel(stripSequenceBrains)}
                            >
                              <FlowsHomeSequencePills brains={stripSequenceBrains} variant="sit" />
                            </div>
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="flows-home__matched-empty">
                  Complete every question in the {context.title.toLowerCase()} quiz section to see matched flows
                  here.
                </p>
              )
            ) : (
              <section
                className="flows-home__start-card flows-context-page__matched-locked"
                aria-label="Unlock matched flows"
              >
                <p className="flows-home__start-eyebrow">Matched to you</p>
                <h3 className="flows-home__start-title">
                  {quizSnap.hasCompletedQuiz
                    ? 'Finish this context in the quiz to unlock matched flows'
                    : 'Take the quiz to unlock sequences matched to you'}
                </h3>
                <p className="flows-home__start-body">
                  {quizSnap.hasCompletedQuiz
                    ? `Answer every question in the ${context.title.toLowerCase()} section so we can rank flows for how you think in this context.`
                    : `Your brain type in ${context.title.toLowerCase()} shapes which flows we suggest first.`}
                </p>
                {quizSnap.hasCompletedQuiz ? (
                  onFinishContext != null || onTakeQuiz != null ? (
                    <button
                      type="button"
                      className={`btn change-results-finish-context-btn flows-context-page__finish-context-btn${
                        resumeModalVariant === 'add'
                          ? ' change-results-finish-context-btn--add'
                          : ' btn-secondary'
                      }`}
                      onClick={handleFinishContextClick}
                    >
                      {finishContextLabel}
                    </button>
                  ) : null
                ) : onTakeQuiz != null ? (
                  <button type="button" className="flows-home__start-cta" onClick={onTakeQuiz}>
                    Take the quiz
                  </button>
                ) : null}
              </section>
            )}
          </>
        </div>
      </div>

      <ResumeContextQuizModal
        open={resumeModalOpen}
        variant={resumeModalVariant}
        contextTitle={context.title}
        remainingQuestions={Math.max(1, remainingForResumeModal)}
        onClose={() => setResumeModalOpen(false)}
        onConfirm={handleResumeModalConfirm}
      />
    </div>
  )
}