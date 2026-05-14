import { ContextCardArt } from '../Quiz/ContextArt'
import type { FlowContextId } from './flowsData'
import {
  SPEAKING_TO_AUTHORITY_SITUATION_ID,
  SpeakingToAuthorityCardArt,
} from './FlowsData/FlowsUnderPressure/speakingToAuthority.tsx'

function isSpeakingToAuthorityCard (contextId: FlowContextId, situationId: string) {
  return contextId === 1 && situationId === SPEAKING_TO_AUTHORITY_SITUATION_ID
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
  return <ContextCardArt id={contextId} />
}
