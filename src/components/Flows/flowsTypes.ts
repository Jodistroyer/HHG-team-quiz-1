import type { BrainType } from './flowsData'

/**
 * User brain profile for flow personalization. Will later be derived from
 * quiz results (see Quiz/quizScoring.ts and overallArchetypes.ts).
 */
export interface FlowsBrainProfile {
  dominant: BrainType
  secondary: BrainType | null
  tertiary?: BrainType | null
}
