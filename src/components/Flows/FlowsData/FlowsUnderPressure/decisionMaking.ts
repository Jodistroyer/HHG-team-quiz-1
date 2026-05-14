import type { FlowSituation } from '../flowTypes'
import { makeSituation } from '../situationHelpers'

export const decisionMakingFlowSituation: FlowSituation = makeSituation(
  'decision-making',
  'Decision making',
  'Choose a next step when time is tight.'
)
