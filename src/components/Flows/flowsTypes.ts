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

/** Library browse / context pages: detail opens on the first variant (Thinker / Head-strong). */
export const FLOWS_BROWSE_DEFAULT_BRAIN_PROFILE: FlowsBrainProfile = {
  dominant: 'Head',
  secondary: null,
}

/**
 * Placeholder for Flows Recommended until profile is derived from quiz results
 * and completed section scores.
 */
export const FLOWS_RECOMMENDED_PLACEHOLDER_BRAIN_PROFILE: FlowsBrainProfile = {
  dominant: 'Head',
  secondary: 'Heart',
}
