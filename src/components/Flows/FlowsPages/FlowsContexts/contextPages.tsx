import type { ComponentType } from 'react'
import type { FlowContextId } from '../../flowsData'
import type { FlowsContextPageProps } from './FlowsContextPage'
import { FlowsDoingWork } from './FlowsDoingWork'
import { FlowsGettingBetter } from './FlowsGettingBetter'
import { FlowsUnderPressure } from './FlowsUnderPressure'
import { FlowsWithPeople } from './FlowsWithPeople'

export type FlowContextPageComponentProps = Omit<FlowsContextPageProps, 'contextId'>

export const FLOW_CONTEXT_PAGES: Record<
  FlowContextId,
  ComponentType<FlowContextPageComponentProps>
> = {
  1: FlowsUnderPressure,
  2: FlowsDoingWork,
  3: FlowsWithPeople,
  4: FlowsGettingBetter,
}
