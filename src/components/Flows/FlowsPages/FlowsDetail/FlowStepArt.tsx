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
import {
  STAY_OR_GO_SITUATION_ID,
  StayOrGoStepArt,
} from '../../FlowsData/FlowsDoingWork/StayOrGo.tsx'
import {
  THRIVE_ZONE_SITUATION_ID,
  ThriveZoneStepArt,
} from '../../FlowsData/FlowsDoingWork/thriveZone.tsx'
import {
  MANAGE_YOUR_SOCIAL_ENERGY_SITUATION_ID,
  ManageYourSocialEnergyStepArt,
} from '../../FlowsData/FlowsWithPeople/ManageYourSocialEnergy.tsx'

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

  if (contextId === 2 && situationId === STAY_OR_GO_SITUATION_ID) {
    return (
      <StayOrGoStepArt
        contextId={contextId}
        situationId={situationId}
        variantId={variantId}
        stepIndex={stepIndex}
        brain={brain}
      />
    )
  }

  if (contextId === 2 && situationId === THRIVE_ZONE_SITUATION_ID) {
    return (
      <ThriveZoneStepArt
        contextId={contextId}
        situationId={situationId}
        variantId={variantId}
        stepIndex={stepIndex}
        brain={brain}
      />
    )
  }

  if (contextId === 3 && situationId === MANAGE_YOUR_SOCIAL_ENERGY_SITUATION_ID) {
    return (
      <ManageYourSocialEnergyStepArt
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
