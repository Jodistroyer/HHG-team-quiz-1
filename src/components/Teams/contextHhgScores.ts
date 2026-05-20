import type { QuizSelectedContextId } from '../Quiz/ContextArt'
import type { Person, TeamContextKey, TeamContextScores } from './PeoplePanel/types'

/** HHG triple when a situational context was not completed (no stored scores). */
export const EMPTY_CONTEXT_HHG: TeamContextScores = {
  headPercent: 0,
  heartPercent: 0,
  gutPercent: 0,
}

/** Situational quiz contexts (excludes overall / natural default). */
export const SITUATIONAL_TEAM_CONTEXTS = [
  'underPressure',
  'doingWork',
  'withPeople',
  'gettingBetter',
] as const satisfies readonly TeamContextKey[]

export type SituationalTeamContextKey = (typeof SITUATIONAL_TEAM_CONTEXTS)[number]

/** Human-readable labels for situational contexts (matches team insight section titles). */
export const SITUATIONAL_CONTEXT_LABELS: Record<SituationalTeamContextKey, string> = {
  underPressure: 'Under Pressure',
  doingWork: 'Doing Work',
  withPeople: 'With People',
  gettingBetter: 'Getting Better',
}

/** Quiz / ContextArt id (1–4) for each situational context — shared icon + color mapping. */
export const SITUATIONAL_CONTEXT_QUIZ_IDS: Record<SituationalTeamContextKey, QuizSelectedContextId> = {
  underPressure: 1,
  doingWork: 2,
  withPeople: 3,
  gettingBetter: 4,
}

export function isEmptyContextScores (scores: TeamContextScores): boolean {
  return scores.headPercent === 0 && scores.heartPercent === 0 && scores.gutPercent === 0
}

/** True when this person has stored, non-zero HHG scores for the situational context. */
export function personHasContextData (person: Person, context: SituationalTeamContextKey): boolean {
  const stored = person.contextScores?.[context]
  return stored != null && !isEmptyContextScores(stored)
}

/** All four situational contexts completed — required for team aggregate scores. */
export function personHasCompletedAllContexts (person: Person): boolean {
  return SITUATIONAL_TEAM_CONTEXTS.every((ctx) => personHasContextData(person, ctx))
}

/** Situational contexts this person has not completed yet. */
export function getMissingSituationalContexts (person: Person): SituationalTeamContextKey[] {
  return SITUATIONAL_TEAM_CONTEXTS.filter((ctx) => !personHasContextData(person, ctx))
}

/** Human-readable labels for contexts this person has not completed yet. */
export function getMissingSituationalContextLabels (person: Person): string[] {
  return getMissingSituationalContexts(person).map((ctx) => SITUATIONAL_CONTEXT_LABELS[ctx])
}

export interface TeamQuizParticipation {
  totalSelected: number
  contributingCount: number
  incompletePeople: Person[]
}

export function getTeamQuizParticipation (selectedPeople: Person[]): TeamQuizParticipation {
  const incompletePeople = selectedPeople.filter((p) => !personHasCompletedAllContexts(p))
  const contributingCount = selectedPeople.length - incompletePeople.length
  return {
    totalSelected: selectedPeople.length,
    contributingCount,
    incompletePeople,
  }
}

/** Participation for one situational section (matches `personHasContextData` / TeamSectionMemberStatus). */
export function getTeamContextParticipation (
  selectedPeople: Person[],
  context: SituationalTeamContextKey
): Pick<TeamQuizParticipation, 'contributingCount' | 'totalSelected'> {
  return {
    totalSelected: selectedPeople.length,
    contributingCount: selectedPeople.filter((p) => personHasContextData(p, context)).length,
  }
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
