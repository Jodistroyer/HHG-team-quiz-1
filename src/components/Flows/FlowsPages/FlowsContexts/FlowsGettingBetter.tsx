import type { FlowContextId } from '../../flowsData'
import { FlowsContextPage, type FlowsContextPageProps } from './FlowsContextPage'

const CONTEXT_ID = 4 satisfies FlowContextId

type Props = Omit<FlowsContextPageProps, 'contextId'>

export const FlowsGettingBetter = (props: Props) => (
  <FlowsContextPage contextId={CONTEXT_ID} {...props} />
)
