import type { FlowContextId } from '../../flowsData'
import { FlowsContextPage, type FlowsContextPageProps } from './FlowsContextPage'

const CONTEXT_ID = 2 satisfies FlowContextId

type Props = Omit<FlowsContextPageProps, 'contextId'>

export const FlowsDoingWork = (props: Props) => (
  <FlowsContextPage contextId={CONTEXT_ID} {...props} />
)
