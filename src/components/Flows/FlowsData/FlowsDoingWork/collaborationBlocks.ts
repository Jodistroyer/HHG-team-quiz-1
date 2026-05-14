import type { FlowSituation } from '../flowTypes'
import { makeSituation } from '../situationHelpers'

export const collaborationBlocksFlowSituation: FlowSituation = makeSituation(
  'collaboration-blocks',
  'Collaboration blocks',
  'Unstick the work without blame or drift.'
)
