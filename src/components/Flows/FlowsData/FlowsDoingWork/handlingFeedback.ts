import type { FlowSituation } from '../flowTypes'
import { makeSituation } from '../situationHelpers'

export const handlingFeedbackFlowSituation: FlowSituation = makeSituation(
  'handling-feedback',
  'Handling feedback',
  'Take notes, stay open, act on what matters.'
)
