import type { Person, TeamContextKey, TeamContextScores } from './PeoplePanel/types'

/** HHG triple when a situational context was not completed (no stored scores). */
export const EMPTY_CONTEXT_HHG: TeamContextScores = {
  headPercent: 0,
  heartPercent: 0,
  gutPercent: 0,
}

/**
 * Scores for a situational tab (Under Pressure, etc.). Missing `contextScores` means that
 * context was not completed — use 0% so team/pair views do not inherit overall natural default.
 */
export function getSituationalContextScores (person: Person, context: TeamContextKey): TeamContextScores {
  if (context === 'overall') {
    return {
      headPercent: person.headPercent,
      heartPercent: person.heartPercent,
      gutPercent: person.gutPercent,
    }
  }
  return person.contextScores?.[context] ?? EMPTY_CONTEXT_HHG
}
