import type { FlowSituation } from '../flowTypes'
import { makeSituation } from '../situationHelpers'

export const afterSetbacksFlowSituation: FlowSituation = makeSituation(
  'after-setbacks',
  'After setbacks',
  'Reset quickly and keep momentum.'
)
