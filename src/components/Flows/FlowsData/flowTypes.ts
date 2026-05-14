/**
 * Flows domain types (shared by flowsData and per-situation modules).
 */

export type FlowContextId = 1 | 2 | 3 | 4

export type BrainType = 'Head' | 'Heart' | 'Gut'

export type BrainTypeVariantId =
  | 'head-strong'
  | 'head-gut'
  | 'head-heart'
  | 'heart-strong'
  | 'heart-gut'
  | 'heart-head'
  | 'gut-strong'
  | 'gut-head'
  | 'gut-heart'
  | 'balanced'

/** A single step in a 3-step flow sequence (one Head, one Heart, one Gut). */
export interface FlowSequenceStep {
  brain: BrainType
  /** Short label under the number circle (e.g. "Intention"). */
  label: string
  /** Step heading (e.g. "Clarify your intention before you walk in"). */
  title: string
  /** One-paragraph description of how to do this step. */
  body: string
}

export interface FlowVariant {
  /** Archetype name for this brain combo (e.g. "Thinker"). */
  archetype: string
  negotiationOrder: string
  coreFunctions: string
  whyThisOrder: string
  steps: FlowSequenceStep[]
}

/** A specific situation within a context (e.g. "Managing social energy"). */
export interface FlowSituation {
  id: string
  /** Tab label in the detail view. */
  title: string
  /** Card title in the browse grid (usually a longer "How to..." sentence). */
  cardTitle: string
  /** Optional one-line description shown under the card title. */
  cardDescription?: string
  /** Used for "X min read" meta line on cards. */
  readMinutes: number
  /** Always 3 steps in Head/Heart/Gut order (re-orderable later per brain type). */
  sequence: FlowSequenceStep[]
  /** "Why this order works for you" callout text. */
  whyText: string
  /** Optional per-brain-combo variants (order, why, and steps). */
  variants?: Partial<Record<BrainTypeVariantId, FlowVariant>>
}

/** A high-level context: matches the 4 quiz contexts. */
export interface FlowContext {
  id: FlowContextId
  /** Short label (e.g. "Under Pressure"). Matches QUIZ_SECTIONS title. */
  title: string
  /** Page title shown above the situation tabs (e.g. "High-stress situations"). */
  pageTitle: string
  /** One-line context description (matches SECTION_CONTEXT_BY_ID). */
  contextLine: string
  situations: FlowSituation[]
}

/** Props for per-step hero art in flow detail (variant ids match BrainTypeSidebar). */
export interface FlowStepArtProps {
  contextId: FlowContextId
  situationId: string
  variantId: BrainTypeVariantId
  stepIndex: number
  brain: BrainType
}
