import type { Person, SavedGroup } from './PeoplePanel/types'
import type { EmptyTeams } from './PeoplePanel/data'
import { SAMPLE_PEOPLE } from './PeoplePanel/data'

export const STORAGE_KEY_PEOPLE = 'hhg.people.v1'
export const STORAGE_KEY_SAVED_GROUPS = 'hhg.people.savedGroups.v1'
export const STORAGE_KEY_EMPTY_TEAMS = 'hhg.people.emptyTeams.v1'

export function loadPeople(): Person[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PEOPLE)
    if (!raw) return SAMPLE_PEOPLE
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return SAMPLE_PEOPLE
    return parsed.map((p: Person & { department?: string }) => {
      const { department, ...rest } = p
      return { ...rest, team: p.team ?? department } as Person
    })
  } catch {
    return SAMPLE_PEOPLE
  }
}

export function loadSavedGroups(): SavedGroup[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED_GROUPS)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function loadEmptyTeams(): EmptyTeams {
  try {
    let raw = localStorage.getItem(STORAGE_KEY_EMPTY_TEAMS)
    if (!raw) {
      raw = localStorage.getItem('hhg.people.emptyDepartments.v1')
    }
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

export function savePeopleToStorage(people: Person[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PEOPLE, JSON.stringify(people))
  } catch {
    /* ignore */
  }
}

export function saveSavedGroupsToStorage(groups: SavedGroup[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_SAVED_GROUPS, JSON.stringify(groups))
  } catch {
    /* ignore */
  }
}

export function saveEmptyTeamsToStorage(emptyTeams: EmptyTeams): void {
  try {
    localStorage.setItem(STORAGE_KEY_EMPTY_TEAMS, JSON.stringify(emptyTeams))
  } catch {
    /* ignore */
  }
}
