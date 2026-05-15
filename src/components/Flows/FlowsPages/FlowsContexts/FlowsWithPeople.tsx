import type { FlowContextId } from '../../flowsData'
import { FlowsContextPage, type FlowsContextPageProps } from './FlowsContextPage'

const CONTEXT_ID = 3 satisfies FlowContextId

type Props = Omit<FlowsContextPageProps, 'contextId'>

export const FlowsWithPeople = (props: Props) => (
  <FlowsContextPage contextId={CONTEXT_ID} {...props} />
)
