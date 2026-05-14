import type { FlowSituation } from '../flowTypes'
import { makeSituation } from '../situationHelpers'

export const selfRegulationFlowSituation: FlowSituation = makeSituation(
  'self-regulation',
  'Self-regulation',
  'Stabilize your state before you act.'
)
