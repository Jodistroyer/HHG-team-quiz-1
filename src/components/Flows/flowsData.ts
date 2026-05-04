/**
 * Flows: types and placeholder content.
 *
 * Real copy/sequences will be authored later. The shapes below are designed to
 * mirror the existing quiz structure (4 contexts, brain types Head/Heart/Gut)
 * so flows can later be derived from a user's quiz result.
 */

export type FlowContextId = 1 | 2 | 3 | 4

export type BrainType = 'Head' | 'Heart' | 'Gut'

/** A single step in a 3-step flow sequence (one Head, one Heart, one Gut). */
export interface FlowSequenceStep {
  brain: BrainType
  /** Short label under the number circle (e.g. "Intention"). */
  label: string
  /** Step heading (e.g. "Clarify your intention before you walk in"). */
  title: string
  /** One-paragraph description of what to do for this step. */
  body: string
}

/** A specific situation within a context (e.g. "Managing social energy"). */
export interface FlowSituation {
  id: string
  /** Tab label in the detail view. */
  title: string
  /** Card title in the browse grid (usually a longer "How to..." sentence). */
  cardTitle: string
  /** Used for "X min read" meta line on cards. */
  readMinutes: number
  /** Always 3 steps in Head/Heart/Gut order (re-orderable later per brain type). */
  sequence: FlowSequenceStep[]
  /** "Why this order works for you" callout text. */
  whyText: string
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

const PLACEHOLDER_BODY =
  'Placeholder copy. Replace with real guidance for this step.'

const PLACEHOLDER_WHY =
  'Placeholder explanation of why this order works best for your brain type.'

function makeSequence (
  labels: [string, string, string] = ['Step label', 'Step label', 'Step label']
): FlowSequenceStep[] {
  return [
    { brain: 'Head', label: labels[0], title: 'Step title goes here', body: PLACEHOLDER_BODY },
    { brain: 'Heart', label: labels[1], title: 'Step title goes here', body: PLACEHOLDER_BODY },
    { brain: 'Gut', label: labels[2], title: 'Step title goes here', body: PLACEHOLDER_BODY },
  ]
}

function makeSituation (id: string, title: string): FlowSituation {
  return {
    id,
    title,
    /* Placeholder: in real content this is a longer "How to ..." sentence. */
    cardTitle: title,
    readMinutes: 4,
    sequence: makeSequence(),
    whyText: PLACEHOLDER_WHY,
  }
}

export const FLOW_CONTEXTS: FlowContext[] = [
  {
    id: 1,
    title: 'Under Pressure',
    pageTitle: 'High-stress situations',
    contextLine: 'Time is tight, stakes are high, and consequences are immediate.',
    situations: [
      makeSituation('speaking-to-authority', 'Speaking to authority'),
      makeSituation('managing-overwhelm', 'Managing overwhelm'),
      makeSituation('decision-making', 'Decision making'),
      makeSituation('conflict-response', 'Conflict response'),
    ],
  },
  {
    id: 2,
    title: 'Doing Work',
    pageTitle: 'Work situations',
    contextLine: 'Normal execution mode. Just getting things done.',
    situations: [
      makeSituation('deep-focus', 'Deep focus'),
      makeSituation('handling-feedback', 'Handling feedback'),
      makeSituation('collaboration-blocks', 'Collaboration blocks'),
      makeSituation('perfectionism-loops', 'Perfectionism loops'),
    ],
  },
  {
    id: 3,
    title: 'With People',
    pageTitle: 'Social situations',
    contextLine: 'Relationships and social dynamics.',
    situations: [
      makeSituation('managing-social-energy', 'Managing social energy'),
      makeSituation('difficult-conversations', 'Difficult conversations'),
      makeSituation('group-dynamics', 'Group dynamics'),
      makeSituation('setting-limits', 'Setting limits'),
    ],
  },
  {
    id: 4,
    title: 'Getting Better',
    pageTitle: 'Growth situations',
    contextLine: 'Reflection, growth, and self-improvement over time.',
    situations: [
      makeSituation('building-habits', 'Building habits'),
      makeSituation('after-setbacks', 'After setbacks'),
      makeSituation('self-regulation', 'Self-regulation'),
      makeSituation('long-term-change', 'Long-term change'),
    ],
  },
]

export function getContextById (id: FlowContextId): FlowContext | undefined {
  return FLOW_CONTEXTS.find((c) => c.id === id)
}

export function getSituation (
  contextId: FlowContextId,
  situationId: string
): FlowSituation | undefined {
  return getContextById(contextId)?.situations.find((s) => s.id === situationId)
}
