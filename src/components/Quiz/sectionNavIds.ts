import type { SituationalContextKey } from './ChangeResults/contextComboLabels'
import { contextIdForTitle } from './ContextArt'

/** Scroll target id for a quiz/team context section title (e.g. "Under Pressure" → under-pressure). */
export function sectionNavIdForTitle (title: string): string | undefined {
  const id = contextIdForTitle(title)
  if (id == null) return undefined
  return title.trim().toLowerCase().replace(/\s+/g, '-')
}

export const SITUATIONAL_CONTEXT_NAV_ID: Record<SituationalContextKey, string> = {
  underPressure: 'under-pressure',
  doingWork: 'doing-work',
  withPeople: 'with-people',
  gettingBetter: 'getting-better',
}

export const SITUATIONAL_CONTEXT_TITLE: Record<SituationalContextKey, string> = {
  underPressure: 'Under Pressure',
  doingWork: 'Doing Work',
  withPeople: 'With People',
  gettingBetter: 'Getting Better',
}
