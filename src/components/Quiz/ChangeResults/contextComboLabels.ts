/**
 * Human-readable combo lines per situational context (quiz + team pair map).
 * Keys match getBrainCombination().label (e.g. "Head Strong", "Head + Gut").
 */
export type SituationalContextKey =
  | 'underPressure'
  | 'doingWork'
  | 'withPeople'
  | 'gettingBetter'

export const CONTEXT_COMBO_LABELS: Record<SituationalContextKey, Record<string, string>> = {
  underPressure: {
    'Head Strong': 'Cautious / Slow',
    'Head + Gut': 'Fast / Calculated',
    'Head + Heart': 'Hesitant / Torn',
    'Heart Strong': 'Emotional / Reactive',
    'Heart + Gut': 'Protective / Defensive',
    'Heart + Head': 'Calm / Steady',
    'Gut Strong': 'Impulsive / Fast',
    'Gut + Head': 'Decisive / Controlled',
    'Gut + Heart': 'Intense / Driven',
    'Head + Heart + Gut': 'Adaptive / Balanced',
  },
  doingWork: {
    'Head Strong': 'Careful / Detailed',
    'Head + Gut': 'Fast / Efficient',
    'Head + Heart': 'Thoughtful / Considered',
    'Heart Strong': 'Meaningful / Driven',
    'Heart + Gut': 'Helpful / Active',
    'Heart + Head': 'Supportive / Organized',
    'Gut Strong': 'Quick / Action',
    'Gut + Head': 'Structured / Fast',
    'Gut + Heart': 'Energetic / Engaged',
    'Head + Heart + Gut': 'Balanced / Complete',
  },
  withPeople: {
    'Head Strong': 'Direct / Detached',
    'Head + Gut': 'Direct / Assertive',
    'Head + Heart': 'Fair / Balanced',
    'Heart Strong': 'Sensitive / Empathetic',
    'Heart + Gut': 'Loyal / Protective',
    'Heart + Head': 'Diplomatic / Tactful',
    'Gut Strong': 'Blunt / Dominant',
    'Gut + Head': 'Commanding / Clear',
    'Gut + Heart': 'Expressive / Charismatic',
    'Head + Heart + Gut': 'Adaptive / Aware',
  },
  gettingBetter: {
    'Head Strong': 'Reflective / Critical',
    'Head + Gut': 'Testing / Improving',
    'Head + Heart': 'Reflective / Emotional',
    'Heart Strong': 'Encouraged / Dependent',
    'Heart + Gut': 'Purposeful / Driven',
    'Heart + Head': 'Guided / Structured',
    'Gut Strong': 'Active / Learning',
    'Gut + Head': 'Systematic / Improving',
    'Gut + Heart': 'Motivated / Driven',
    'Head + Heart + Gut': 'Aware / Adaptive',
  },
}

export function sectionTitleToSituationalKey (title: string): SituationalContextKey | null {
  switch (title.trim().toLowerCase()) {
    case 'under pressure':
      return 'underPressure'
    case 'doing work':
      return 'doingWork'
    case 'with people':
      return 'withPeople'
    case 'getting better':
      return 'gettingBetter'
    default:
      return null
  }
}

export function contextComboLabel (key: SituationalContextKey, comboLabel: string): string {
  return CONTEXT_COMBO_LABELS[key]?.[comboLabel] ?? comboLabel
}

/** Use quiz/team section row title + raw combo label from getBrainCombination. */
export function contextComboLabelForSectionTitle (sectionTitle: string, comboLabel: string): string {
  const k = sectionTitleToSituationalKey(sectionTitle)
  return k ? contextComboLabel(k, comboLabel) : comboLabel
}
