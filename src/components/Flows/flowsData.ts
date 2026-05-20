/**
 * Flows: types and placeholder content.
 *
 * Real copy/sequences will be authored later. The shapes below are designed to
 * mirror the existing quiz structure (4 contexts, brain types Head/Heart/Gut)
 * so flows can later be derived from a user's quiz result.
 *
 * Per-situation data and art live under `./FlowsData/`.
 */

export * from './FlowsData/flowTypes'

import type { FlowContext, FlowContextId, FlowSituation } from './FlowsData/flowTypes'
// import { afterSetbacksFlowSituation } from './FlowsData/FlowsGettingBetter/afterSetbacks'
// import { buildingHabitsFlowSituation } from './FlowsData/FlowsGettingBetter/buildingHabits'
import { dealingWithGriefFlowSituation } from './FlowsData/FlowsGettingBetter/dealingWithGrief.tsx'
import { learningStyleFlowSituation } from './FlowsData/FlowsGettingBetter/learningStyle.tsx'
// import { longTermChangeFlowSituation } from './FlowsData/FlowsGettingBetter/longTermChange'
// import { selfRegulationFlowSituation } from './FlowsData/FlowsGettingBetter/selfRegulation'
import { burnoutLoopFlowSituation } from './FlowsData/FlowsDoingWork/burnoutLoop.tsx'
import { burnoutRecoveryFlowSituation } from './FlowsData/FlowsDoingWork/burnoutRecovery.tsx'
import { stayOrGoFlowSituation } from './FlowsData/FlowsDoingWork/stayorgo.tsx'
import { thriveZoneFlowSituation } from './FlowsData/FlowsDoingWork/thriveZone.tsx'
// import { collaborationBlocksFlowSituation } from './FlowsData/FlowsDoingWork/collaborationBlocks'
// import { deepFocusFlowSituation } from './FlowsData/FlowsDoingWork/deepFocus'
// import { handlingFeedbackFlowSituation } from './FlowsData/FlowsDoingWork/handlingFeedback'
// import { perfectionismLoopsFlowSituation } from './FlowsData/FlowsDoingWork/perfectionismLoops'
import { conflictResponseFlowSituation } from './FlowsData/FlowsUnderPressure/conflictResponse.tsx'
// import { decisionMakingFlowSituation } from './FlowsData/FlowsUnderPressure/decisionMaking'
// import { managingOverwhelmFlowSituation } from './FlowsData/FlowsUnderPressure/managingOverwhelm'
import { speakingToAuthorityFlowSituation } from './FlowsData/FlowsUnderPressure/speakingToAuthority.tsx'
// import { difficultConversationsFlowSituation } from './FlowsData/FlowsWithPeople/difficultConversations'
// import { groupDynamicsFlowSituation } from './FlowsData/FlowsWithPeople/groupDynamics'
import { managingSocialEnergyFlowSituation } from './FlowsData/FlowsWithPeople/managingSocialEnergy'
import { relationshipNeedsFlowSituation } from './FlowsData/FlowsWithPeople/relationshipNeeds'
// import { settingLimitsFlowSituation } from './FlowsData/FlowsWithPeople/settingLimits'

export const FLOW_CONTEXTS: FlowContext[] = [
  {
    id: 1,
    title: 'Under Pressure',
    pageTitle: 'High-stress situations',
    contextLine: 'Time is tight, stakes are high, and consequences are immediate.',
    situations: [
      speakingToAuthorityFlowSituation,
      // managingOverwhelmFlowSituation,
      // decisionMakingFlowSituation,
      conflictResponseFlowSituation,
    ],
  },
  {
    id: 2,
    title: 'Doing Work',
    pageTitle: 'Work situations',
    contextLine: 'Normal execution mode. Getting things done.',
    situations: [
      // deepFocusFlowSituation,
      // handlingFeedbackFlowSituation,
      // collaborationBlocksFlowSituation,
      // perfectionismLoopsFlowSituation,
      burnoutLoopFlowSituation,
      burnoutRecoveryFlowSituation,
      stayOrGoFlowSituation,
      thriveZoneFlowSituation,
    ],
  },
  {
    id: 3,
    title: 'With People',
    pageTitle: 'Social situations',
    contextLine: 'Relationships and social dynamics.',
    situations: [
      managingSocialEnergyFlowSituation,
      relationshipNeedsFlowSituation,
      // difficultConversationsFlowSituation,
      // groupDynamicsFlowSituation,
      // settingLimitsFlowSituation,
    ],
  },
  {
    id: 4,
    title: 'Getting Better',
    pageTitle: 'Growth situations',
    contextLine: 'Reflection, growth, and self-improvement over time.',
    situations: [
      // buildingHabitsFlowSituation,
      // afterSetbacksFlowSituation,
      // selfRegulationFlowSituation,
      // longTermChangeFlowSituation,
      learningStyleFlowSituation,
      dealingWithGriefFlowSituation,
    ],
  },
]

export function getContextById (id: FlowContextId): FlowContext | undefined {
  return FLOW_CONTEXTS.find((c) => c.id === id)
}

export function getSituation (
  contextId: FlowContextId,
  situationId: string
): FlowSituation | undefined {
  return getContextById(contextId)?.situations.find((s) => s.id === situationId)
}
