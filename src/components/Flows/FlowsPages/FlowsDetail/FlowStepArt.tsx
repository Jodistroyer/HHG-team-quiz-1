import { ContextCardArt } from '../../../Quiz/ContextArt'
import type { FlowStepArtProps } from '../../FlowsData/flowTypes'
import {
  HANDLING_CONFLICT_SITUATION_ID,
  HandlingConflictStepArt,
} from '../../FlowsData/FlowsUnderPressure/HandlingConflict.tsx'
import {
  FACING_AUTHORITY_SITUATION_ID,
  FacingAuthorityStepArt,
} from '../../FlowsData/FlowsUnderPressure/FacingAuthority.tsx'
import {
  BURNOUT_LOOP_SITUATION_ID,
  BurnoutLoopStepArt,
} from '../../FlowsData/FlowsDoingWork/BurnoutLoop.tsx'
import {
  BURNOUT_RECOVERY_SITUATION_ID,
  BurnoutRecoveryStepArt,
} from '../../FlowsData/FlowsDoingWork/BurnoutRecovery.tsx'

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
  if (contextId === 1 && situationId === FACING_AUTHORITY_SITUATION_ID) {
    return (
      <FacingAuthorityStepArt
        contextId={contextId}
        situationId={situationId}
        variantId={variantId}
        stepIndex={stepIndex}
        brain={brain}
      />
    )
  }

  if (contextId === 1 && situationId === HANDLING_CONFLICT_SITUATION_ID) {
    return (
      <HandlingConflictStepArt
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

  if (contextId === 2 && situationId === BURNOUT_RECOVERY_SITUATION_ID) {
    return (
      <BurnoutRecoveryStepArt
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
