import type { FlowSituation } from '../flowTypes'
import { makeSituation } from '../situationHelpers'

export const conflictResponseFlowSituation: FlowSituation = makeSituation(
  'conflict-response',
  'Conflict response',
  'Respond without escalating the situation.'
)
