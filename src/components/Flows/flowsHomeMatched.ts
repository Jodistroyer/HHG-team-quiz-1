import { FLOW_CONTEXTS, type FlowContextId, type FlowSituation } from './flowsData'
import { getCompletedFlowContextIdsFromStorage } from './flowsQuizSnapshot'

export interface MatchedFlowPreview {
  contextId: FlowContextId
  situation: FlowSituation
  /** First items get “picked for you” styling in the home strip. */
  featured: boolean
}

/**
 * Quiz sections (1–4) where every question has a first choice — drives Matched + Recommended filtering.
 */
export function getCompletedFlowsContextIdsForMatchedFlows (): FlowContextId[] {
  return getCompletedFlowContextIdsFromStorage()
}

/** Situations in the given quiz-completed contexts only (deterministic order). */
export function getMatchedFlowPreviews (
  completedContextIds: FlowContextId[],
  max = 12
): MatchedFlowPreview[] {
  const allowed = new Set(completedContextIds)
  const out: MatchedFlowPreview[] = []
  let i = 0
  for (const ctx of FLOW_CONTEXTS) {
    if (!allowed.has(ctx.id)) continue
    for (const sit of ctx.situations) {
      if (out.length >= max) return out
      out.push({
        contextId: ctx.id,
        situation: sit,
        featured: i < 2,
      })
      i += 1
    }
  }
  return out
}
