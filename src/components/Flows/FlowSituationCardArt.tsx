import { ContextCardArt } from '../Quiz/ContextArt'
import type { FlowContextId } from './flowsData'
import {
  CONFLICT_RESPONSE_SITUATION_ID,
  ConflictResponseCardArt,
} from './FlowsData/FlowsUnderPressure/conflictResponse.tsx'
import {
  SPEAKING_TO_AUTHORITY_SITUATION_ID,
  SpeakingToAuthorityCardArt,
} from './FlowsData/FlowsUnderPressure/speakingToAuthority.tsx'
import {
  BurnoutLoopCardArt,
} from './FlowsData/FlowsDoingWork/burnoutLoopArt.tsx'
import { BURNOUT_LOOP_SITUATION_ID } from './FlowsData/FlowsDoingWork/burnoutLoop.tsx'

function isSpeakingToAuthorityCard (contextId: FlowContextId, situationId: string) {
  return contextId === 1 && situationId === SPEAKING_TO_AUTHORITY_SITUATION_ID
}

function isConflictResponseCard (contextId: FlowContextId, situationId: string) {
  return contextId === 1 && situationId === CONFLICT_RESPONSE_SITUATION_ID
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
  if (isSpeakingToAuthorityCard(contextId, situationId)) {
    return <SpeakingToAuthorityCardArt />
  }
  if (isConflictResponseCard(contextId, situationId)) {
    return <ConflictResponseCardArt />
  }
  if (isBurnoutLoopCard(contextId, situationId)) {
    return <BurnoutLoopCardArt />
  }
  return <ContextCardArt id={contextId} />
}
