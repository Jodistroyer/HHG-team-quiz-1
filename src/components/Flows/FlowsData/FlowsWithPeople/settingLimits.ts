import type { FlowSituation } from '../flowTypes'
import { makeSituation } from '../situationHelpers'

export const settingLimitsFlowSituation: FlowSituation = makeSituation(
  'setting-limits',
  'Setting limits',
  'Hold boundaries without guilt or shutdown.'
)
