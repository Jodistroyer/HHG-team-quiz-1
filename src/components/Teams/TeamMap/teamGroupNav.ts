import {
  faArrowsRotate,
  faBriefcase,
  faChartLine,
  faCompass,
  faFire,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface TeamNavItem {
  id: string
  label: string
  icon: IconDefinition
}

/** Scroll targets for team profile (3+ people) — ids on `TeamGroupInsights` sections. */
export const TEAM_GROUP_NAV_ITEMS: TeamNavItem[] = [
  { id: 'team-natural-default', label: 'Natural Default', icon: faCompass },
  { id: 'team-change-across-contexts', label: 'Team Changes', icon: faArrowsRotate },
  { id: 'under-pressure', label: 'Under Pressure', icon: faFire },
  { id: 'doing-work', label: 'Doing Work', icon: faBriefcase },
  { id: 'with-people', label: 'With People', icon: faPeopleGroup },
  { id: 'getting-better', label: 'Getting Better', icon: faChartLine },
]

export const TEAM_GROUP_NAV_IDS = TEAM_GROUP_NAV_ITEMS.map(({ id }) => id)
