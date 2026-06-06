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
import {
  BURNOUT_RECOVERY_SITUATION_ID,
  BurnoutRecoveryCardArt,
} from '../FlowsData/FlowsDoingWork/BurnoutRecovery.tsx'
import {
  STAY_OR_GO_SITUATION_ID,
  StayOrGoCardArt,
} from '../FlowsData/FlowsDoingWork/StayOrGo.tsx'
import {
  THRIVE_ZONE_SITUATION_ID,
  ThriveZoneCardArt,
} from '../FlowsData/FlowsDoingWork/thriveZone.tsx'
import {
  MANAGE_YOUR_SOCIAL_ENERGY_SITUATION_ID,
  ManageYourSocialEnergyCardArt,
} from '../FlowsData/FlowsWithPeople/ManageYourSocialEnergy.tsx'
import {
  RELATIONSHIP_NEEDS_SITUATION_ID,
  RelationshipNeedsCardArt,
} from '../FlowsData/FlowsWithPeople/RelationshipNeeds.tsx'
import {
  LEARNING_STYLE_SITUATION_ID,
  LearningStyleCardArt,
} from '../FlowsData/FlowsGettingBetter/LearningStyle.tsx'
import {
  DEALING_WITH_GRIEF_SITUATION_ID,
  DealingWithGriefCardArt,
} from '../FlowsData/FlowsGettingBetter/DealingWithGrief.tsx'

function isFacingAuthorityCard (contextId: FlowContextId, situationId: string) {
  return contextId === 1 && situationId === FACING_AUTHORITY_SITUATION_ID
}

function isHandlingConflictCard (contextId: FlowContextId, situationId: string) {
  return contextId === 1 && situationId === HANDLING_CONFLICT_SITUATION_ID
}

function isBurnoutLoopCard (contextId: FlowContextId, situationId: string) {
  return contextId === 2 && situationId === BURNOUT_LOOP_SITUATION_ID
}

function isBurnoutRecoveryCard (contextId: FlowContextId, situationId: string) {
  return contextId === 2 && situationId === BURNOUT_RECOVERY_SITUATION_ID
}

function isStayOrGoCard (contextId: FlowContextId, situationId: string) {
  return contextId === 2 && situationId === STAY_OR_GO_SITUATION_ID
}

function isThriveZoneCard (contextId: FlowContextId, situationId: string) {
  return contextId === 2 && situationId === THRIVE_ZONE_SITUATION_ID
}

function isManageYourSocialEnergyCard (contextId: FlowContextId, situationId: string) {
  return contextId === 3 && situationId === MANAGE_YOUR_SOCIAL_ENERGY_SITUATION_ID
}

function isRelationshipNeedsCard (contextId: FlowContextId, situationId: string) {
  return contextId === 3 && situationId === RELATIONSHIP_NEEDS_SITUATION_ID
}

function isLearningStyleCard (contextId: FlowContextId, situationId: string) {
  return contextId === 4 && situationId === LEARNING_STYLE_SITUATION_ID
}

function isDealingWithGriefCard (contextId: FlowContextId, situationId: string) {
  return contextId === 4 && situationId === DEALING_WITH_GRIEF_SITUATION_ID
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
  if (isBurnoutRecoveryCard(contextId, situationId)) {
    return <BurnoutRecoveryCardArt />
  }
  if (isStayOrGoCard(contextId, situationId)) {
    return <StayOrGoCardArt />
  }
  if (isThriveZoneCard(contextId, situationId)) {
    return <ThriveZoneCardArt />
  }
  if (isManageYourSocialEnergyCard(contextId, situationId)) {
    return <ManageYourSocialEnergyCardArt />
  }
  if (isRelationshipNeedsCard(contextId, situationId)) {
    return <RelationshipNeedsCardArt />
  }
  if (isLearningStyleCard(contextId, situationId)) {
    return <LearningStyleCardArt />
  }
  if (isDealingWithGriefCard(contextId, situationId)) {
    return <DealingWithGriefCardArt />
  }
  return <ContextCardArt id={contextId} />
}
