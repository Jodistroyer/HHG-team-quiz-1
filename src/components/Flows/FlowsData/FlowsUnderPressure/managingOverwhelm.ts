import type { FlowSituation } from '../flowTypes'
import { makeSituation } from '../situationHelpers'

export const managingOverwhelmFlowSituation: FlowSituation = makeSituation(
  'managing-overwhelm',
  'Managing overwhelm',
  'Downshift fast when everything spikes.'
)
