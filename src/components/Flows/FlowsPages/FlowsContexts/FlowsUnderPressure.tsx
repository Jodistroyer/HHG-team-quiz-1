import type { FlowContextId } from '../../flowsData'
import { FlowsContextPage, type FlowsContextPageProps } from './FlowsContextPage'

const CONTEXT_ID = 1 satisfies FlowContextId

type Props = Omit<FlowsContextPageProps, 'contextId'>

export const FlowsUnderPressure = (props: Props) => (
  <FlowsContextPage contextId={CONTEXT_ID} {...props} />
)
