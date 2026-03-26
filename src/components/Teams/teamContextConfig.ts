import type { TeamContextKey } from './PeoplePanel/types'

export const TEAM_CONTEXT_TABS: Array<{ key: TeamContextKey; label: string }> = [
  { key: 'overall', label: 'Overall' },
  { key: 'underPressure', label: 'Under Pressure' },
  { key: 'doingWork', label: 'Doing Work' },
  { key: 'withPeople', label: 'With People' },
  { key: 'gettingBetter', label: 'Getting Better' },
]
