import { FlowCard } from '../../FlowsShared/FlowCard'
import { getContextById, type FlowContextId } from '../../flowsData'
import {
  getCompletedFlowsContextIdsForMatchedFlows,
  getMatchedFlowPreviews,
  type MatchedFlowPreview,
} from '../../flowsHomeMatched'
import { recommendedBrainProfileFromSnapshot, useFlowsQuizSnapshot } from '../../flowsQuizSnapshot'
import { BrainTypeHero } from './BrainTypeHero'
import './FlowsRecommended.css'

const ALL_FLOW_CONTEXT_IDS: FlowContextId[] = [1, 2, 3, 4]

export interface FlowsRecommendedProps {
  onOpenSituation?: (contextId: FlowContextId, situationId: string) => void
}

export const FlowsRecommended = ({ onOpenSituation }: FlowsRecommendedProps) => {
  const quizSnap = useFlowsQuizSnapshot()
  const brainProfile = recommendedBrainProfileFromSnapshot(quizSnap)
  const completedIds = quizSnap.hasCompletedQuiz ? getCompletedFlowsContextIdsForMatchedFlows() : ALL_FLOW_CONTEXT_IDS
  const items = getMatchedFlowPreviews(completedIds, 50)

  const recommendedHeroSub =
    quizSnap.hasCompletedQuiz
      ? "Your overall quiz pattern is above. Each card is from a quiz context you fully finished—the sequence opens for that context's scores (Head / Heart / Gut in that situation). Use the sidebar in a flow to try other variants."
      : undefined

  return (
    <section className="flows-library-view flows-recommended" aria-label="Recommended flows">
      <header className="flows-recommended__header">
        <h1 className="flows-library-view__title">Recommended for you</h1>
        {quizSnap.hasCompletedQuiz ? (
          <p className="flows-library-view__body flows-recommended__intro">
            Only situations from quiz contexts where you answered every question. Flows open with your brain combo
            for that specific context—you can switch variants from the sidebar inside each flow.
          </p>
        ) : (
          <p className="flows-library-view__body flows-recommended__intro">
            Take the quiz on the Quiz tab to personalise these recommendations. Until then, we show every
            situation—you can still open any flow.
          </p>
        )}
      </header>

      {quizSnap.hasCompletedQuiz ? (
        <BrainTypeHero brainProfile={brainProfile} subOverride={recommendedHeroSub} />
      ) : (
        <BrainTypeHero brainProfile={brainProfile} />
      )}

      {quizSnap.hasCompletedQuiz && items.length === 0 ? (
        <p className="flows-recommended__empty">
          Finish at least one full quiz context (every question answered) to see recommendations here.
        </p>
      ) : (
        <div className="flows-recommended__grid" role="list">
          {items.map((row: MatchedFlowPreview) => {
            const { contextId, situation } = row
            const ctx = getContextById(contextId)
            return (
              <div key={`${contextId}-${situation.id}`} className="flows-recommended__cell" role="listitem">
                <FlowCard
                  contextId={contextId}
                  contextTitle={ctx?.title ?? ''}
                  situation={situation}
                  onClick={() => onOpenSituation?.(contextId, situation.id)}
                />
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
