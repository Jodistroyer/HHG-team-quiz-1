import { ContextCardArt } from '../../../Quiz/ContextArt'
import type { FlowStepArtProps } from '../../FlowsData/flowTypes'
import {
  CONFLICT_RESPONSE_SITUATION_ID,
  ConflictResponseStepArt,
} from '../../FlowsData/FlowsUnderPressure/conflictResponse.tsx'
import {
  SPEAKING_TO_AUTHORITY_SITUATION_ID,
  SpeakingToAuthorityStepArt,
} from '../../FlowsData/FlowsUnderPressure/speakingToAuthority.tsx'
import { BurnoutLoopStepArt } from '../../FlowsData/FlowsDoingWork/burnoutLoopArt.tsx'
import { BURNOUT_LOOP_SITUATION_ID } from '../../FlowsData/FlowsDoingWork/burnoutLoop.tsx'

export type { FlowStepArtProps } from '../../FlowsData/flowTypes'

/**
 * Per-step hero art for “How to do it”. Each situation can supply bespoke SVGs;
 * unknown keys fall back to the shared quiz context card art.
 */
export function FlowStepArt ({
  contextId,
  situationId,
  variantId,
  stepIndex,
  brain,
}: FlowStepArtProps) {
  if (contextId === 1 && situationId === SPEAKING_TO_AUTHORITY_SITUATION_ID) {
    return (
      <SpeakingToAuthorityStepArt
        contextId={contextId}
        situationId={situationId}
        variantId={variantId}
        stepIndex={stepIndex}
        brain={brain}
      />
    )
  }

  if (contextId === 1 && situationId === CONFLICT_RESPONSE_SITUATION_ID) {
    return (
      <ConflictResponseStepArt
        contextId={contextId}
        situationId={situationId}
        variantId={variantId}
        stepIndex={stepIndex}
        brain={brain}
      />
    )
  }

  if (contextId === 2 && situationId === BURNOUT_LOOP_SITUATION_ID) {
    return (
      <BurnoutLoopStepArt
        contextId={contextId}
        situationId={situationId}
        variantId={variantId}
        stepIndex={stepIndex}
        brain={brain}
      />
    )
  }

  return <ContextCardArt id={contextId} />
}
