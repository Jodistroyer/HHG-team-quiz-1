import { ContextCardArt } from '../../Quiz/ContextArt'
import type { FlowContextId } from '../flowsData'
import {
  HANDLING_CONFLICT_SITUATION_ID,
  HandlingConflictCardArt,
} from '../FlowsData/FlowsUnderPressure/HandlingConflict.tsx'
import {
  FACING_AUTHORITY_SITUATION_ID,
  FacingAuthorityCardArt,
} from '../FlowsData/FlowsUnderPressure/FacingAuthority.tsx'
import {
  BURNOUT_LOOP_SITUATION_ID,
  BurnoutLoopCardArt,
} from '../FlowsData/FlowsDoingWork/BurnoutLoop.tsx'

function isFacingAuthorityCard (contextId: FlowContextId, situationId: string) {
  return contextId === 1 && situationId === FACING_AUTHORITY_SITUATION_ID
}

function isHandlingConflictCard (contextId: FlowContextId, situationId: string) {
  return contextId === 1 && situationId === HANDLING_CONFLICT_SITUATION_ID
}

function isBurnoutLoopCard (contextId: FlowContextId, situationId: string) {
  return contextId === 2 && situationId === BURNOUT_LOOP_SITUATION_ID
}

/**
 * Thumbnail / top-bar art for a flow situation. Uses the same `quiz-intro-card__svg`
 * footprint as `ContextCardArt`; falls back to context-only art when no bespoke SVG exists.
 */
export function FlowSituationCardArt ({
  contextId,
  situationId,
}: {
  contextId: FlowContextId
  situationId: string
}) {
  if (isFacingAuthorityCard(contextId, situationId)) {
    return <FacingAuthorityCardArt />
  }
  if (isHandlingConflictCard(contextId, situationId)) {
    return <HandlingConflictCardArt />
  }
  if (isBurnoutLoopCard(contextId, situationId)) {
    return <BurnoutLoopCardArt />
  }
  return <ContextCardArt id={contextId} />
}
