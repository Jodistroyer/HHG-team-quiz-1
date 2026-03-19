import type { Person, TreeNode, ViewMode, TeamContextScores } from './types'
import type { QuizExportPayload, PeopleImportPayload } from './types'
import { getBrainCombination } from '../../Quiz/SectionResults/utils'

/** Generate a simple unique id. */
export function nextId(prefix = 'person'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/** Parse quiz export JSON into a single Person (e.g. "Send to People Panel"). */
export function personFromQuizExport(
  data: QuizExportPayload,
  name: string = 'Imported'
): Person {
  const nd = data.naturalDefault
  const sectionSummaries = data.sectionSummaries ?? []
  const toContext = (idx: number): TeamContextScores | undefined => {
    const section = sectionSummaries[idx]
    if (!section) return undefined
    return {
      headPercent: section.headPercent ?? 33.33,
      heartPercent: section.heartPercent ?? 33.33,
      gutPercent: section.gutPercent ?? 33.34,
    }
  }

  const contextScores: Person['contextScores'] = {}
  const underPressure = toContext(0)
  const doingWork = toContext(1)
  const withPeople = toContext(2)
  const gettingBetter = toContext(3)

  if (underPressure) contextScores.underPressure = underPressure
  if (doingWork) contextScores.doingWork = doingWork
  if (withPeople) contextScores.withPeople = withPeople
  if (gettingBetter) contextScores.gettingBetter = gettingBetter

  return {
    id: nextId('import'),
    name: data.name ?? name,
    company: undefined,
    team: undefined,
    role: undefined,
    tags: [],
    headPercent: nd.headPercent ?? 33.33,
    heartPercent: nd.heartPercent ?? 33.33,
    gutPercent: nd.gutPercent ?? 33.34,
    dominant: nd.dominant ?? (nd.headPercent >= nd.heartPercent && nd.headPercent >= nd.gutPercent ? 'Head' : nd.heartPercent >= nd.gutPercent ? 'Heart' : 'Gut'),
    secondaryBrain: nd.secondaryBrain ?? null,
    contextScores,
  }
}

/** Parse bulk people JSON into Person[]. */
export function peopleFromImport(data: unknown): Person[] {
  const payload = data as PeopleImportPayload
  if (!payload?.people || !Array.isArray(payload.people)) return []
  return payload.people.map((p) => {
    const getDominant = (): HHGCenter => {
      if (p.dominant) return p.dominant
      const h = p.headPercent ?? 0
      const he = p.heartPercent ?? 0
      const g = p.gutPercent ?? 0
      if (h >= he && h >= g) return 'Head'
      if (he >= h && he >= g) return 'Heart'
      return 'Gut'
    }
    return {
      id: p.id ?? nextId('import'),
      name: p.name ?? 'Unknown',
      company: p.company,
      team: p.team,
      role: p.role,
      tags: p.tags ?? [],
      headPercent: p.headPercent ?? 33.33,
      heartPercent: p.heartPercent ?? 33.33,
      gutPercent: p.gutPercent ?? 33.34,
      dominant: getDominant(),
      secondaryBrain: p.secondaryBrain ?? null,
    }
  })
}

/** Detect if JSON is quiz export (has naturalDefault). */
export function isQuizExport(data: unknown): data is QuizExportPayload {
  return (
    typeof data === 'object' &&
    data !== null &&
    'naturalDefault' in data &&
    typeof (data as QuizExportPayload).naturalDefault === 'object'
  )
}

/** Sample people for demo; finished quizzes can be added/imported. */
export const SAMPLE_PEOPLE: Person[] = [
  {
    id: 'alex',
    name: 'Alex Rivera',
    company: 'Acme Corp',
    team: 'Engineering',
    role: 'Backend',
    tags: ['Leadership', 'AI Initiative'],
    headPercent: 55,
    heartPercent: 25,
    gutPercent: 20,
    dominant: 'Head',
    secondaryBrain: 'Heart',
  },
  {
    id: 'ryan',
    name: 'Ryan Patel',
    company: 'Acme Corp',
    team: 'Engineering',
    role: 'Backend',
    tags: ['Mentors'],
    headPercent: 48,
    heartPercent: 30,
    gutPercent: 22,
    dominant: 'Head',
    secondaryBrain: 'Heart',
  },
  {
    id: 'sara',
    name: 'Sara Lopez',
    company: 'Acme Corp',
    team: 'Engineering',
    role: 'Frontend',
    tags: [],
    headPercent: 35,
    heartPercent: 45,
    gutPercent: 20,
    dominant: 'Heart',
    secondaryBrain: 'Head',
  },
  {
    id: 'maya',
    name: 'Maya Chen',
    company: 'Acme Corp',
    team: 'Product',
    role: 'Product Managers',
    tags: ['Leadership', 'AI Initiative'],
    headPercent: 40,
    heartPercent: 38,
    gutPercent: 22,
    dominant: 'Heart',
    secondaryBrain: 'Head',
  },
  {
    id: 'daniel',
    name: 'Daniel Kim',
    company: 'Nova Labs',
    team: 'Design',
    role: 'Designers',
    tags: ['AI Initiative', 'Advisors'],
    headPercent: 30,
    heartPercent: 50,
    gutPercent: 20,
    dominant: 'Heart',
    secondaryBrain: null,
  },
]

/** Display label for a person: "Name — Role" when role exists. */
export function personDisplayLabel(p: Person): string {
  return p.role ? `${p.name} — ${p.role}` : p.name
}

/** Company name -> list of team names that have no people (for empty state). */
export type EmptyTeams = Record<string, string[]>

/** Build tree from flat people list by company → team → person (no role nesting). */
function buildCompanyTree(people: Person[], emptyTeams: EmptyTeams = {}): TreeNode[] {
  const byCompany = new Map<string, Person[]>()
  for (const p of people) {
    const key = p.company ?? 'Uncategorized'
    if (!byCompany.has(key)) byCompany.set(key, [])
    byCompany.get(key)!.push(p)
  }

  const companyNames = new Set([...byCompany.keys(), ...Object.keys(emptyTeams)])
  const nodes: TreeNode[] = []
  for (const companyName of Array.from(companyNames).sort()) {
    const companyPeople = byCompany.get(companyName) ?? []
    const byTeam = new Map<string, Person[]>()
    for (const p of companyPeople) {
      const key = p.team ?? '_'
      if (!byTeam.has(key)) byTeam.set(key, [])
      byTeam.get(key)!.push(p)
    }
    const emptyTeamList = emptyTeams[companyName] ?? []
    /* Only show as "empty" (order preserved, new at top) if they truly have no people */
    const emptyOnly = emptyTeamList.filter((t) => (byTeam.get(t)?.length ?? 0) === 0)
    const teamsWithPeople = Array.from(byTeam.keys()).sort()
    /* Order: empty teams first (array order), then teams with people alphabetically */
    const teamOrder = [...emptyOnly, ...teamsWithPeople]

    const childNodes: TreeNode[] = []
    for (const teamName of teamOrder) {
      const teamPeople = byTeam.get(teamName) ?? []
      const personNodes: TreeNode[] = teamPeople.map((p) => ({
        id: p.id,
        kind: 'person' as const,
        label: personDisplayLabel(p),
        children: [],
        person: p,
        path: [companyName, teamName === '_' ? undefined : teamName].filter(Boolean) as string[],
      }))

      const teamLabel = teamName === '_' ? 'Other' : teamName
      const teamVisuals = groupHhgVisuals(teamPeople)
      childNodes.push({
        id: `team-${companyName}-${teamName}`,
        kind: 'team',
        label: teamLabel,
        count: teamPeople.length,
        children: personNodes,
        path: [companyName],
        ...teamVisuals,
      })
    }
    const companyVisuals = groupHhgVisuals(companyPeople)
    nodes.push({
      id: `company-${companyName}`,
      kind: 'company',
      label: companyName,
      count: companyPeople.length,
      children: childNodes,
      path: [],
      ...companyVisuals,
    })
  }

  nodes.sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
  return nodes
}

/** Average Head / Heart / Gut % across people under a company, team, or tag group. */
function averageHhgPercents(people: Person[]): { headPercent: number; heartPercent: number; gutPercent: number } {
  if (people.length === 0) {
    return { headPercent: 33.33, heartPercent: 33.33, gutPercent: 33.34 }
  }
  let h = 0
  let he = 0
  let g = 0
  for (const p of people) {
    h += p.headPercent
    he += p.heartPercent
    g += p.gutPercent
  }
  const n = people.length
  return { headPercent: h / n, heartPercent: he / n, gutPercent: g / n }
}

/** Same ordering/rules as brain combo badge, from group averages (smaller tree dots). */
function groupHhgVisuals(people: Person[]): { aggregateLabel: string; indicatorDotColors: string[] } | undefined {
  if (people.length === 0) return undefined
  const { headPercent, heartPercent, gutPercent } = averageHhgPercents(people)
  const combo = getBrainCombination(headPercent, heartPercent, gutPercent)
  return { aggregateLabel: combo.label, indicatorDotColors: combo.colors }
}

function buildTeamTree(people: Person[]): TreeNode[] {
  const byTeam = new Map<string, Person[]>()
  for (const p of people) {
    const key = p.team ?? 'Other'
    if (!byTeam.has(key)) byTeam.set(key, [])
    byTeam.get(key)!.push(p)
  }

  const nodes: TreeNode[] = []
  for (const [teamName, list] of byTeam) {
    const visuals = groupHhgVisuals(list)
    nodes.push({
      id: `team-${teamName}`,
      kind: 'team',
      label: teamName,
      count: list.length,
      children: list.map((p) => ({
        id: p.id,
        kind: 'person' as const,
        label: personDisplayLabel(p),
        children: [],
        person: p,
        path: [teamName],
      })),
      path: [],
      ...visuals,
    })
  }
  nodes.sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
  return nodes
}

function buildTagsTree(people: Person[]): TreeNode[] {
  const byTag = new Map<string, Person[]>()
  for (const p of people) {
    if (p.tags.length === 0) {
      const key = '_untagged'
      if (!byTag.has(key)) byTag.set(key, [])
      byTag.get(key)!.push(p)
    } else {
      for (const tag of p.tags) {
        if (!byTag.has(tag)) byTag.set(tag, [])
        byTag.get(tag)!.push(p)
      }
    }
  }

  const nodes: TreeNode[] = []
  for (const [tagName, list] of byTag) {
    const label = tagName === '_untagged' ? 'No tag' : tagName
    const tagVisuals = groupHhgVisuals(list)
    nodes.push({
      id: `tag-${tagName}`,
      kind: 'tag',
      label,
      count: list.length,
      children: list.map((p) => ({
        id: `${tagName}-${p.id}`,
        kind: 'person' as const,
        label: personDisplayLabel(p),
        children: [],
        person: p,
        path: [label],
      })),
      path: [],
      ...tagVisuals,
    })
  }
  nodes.sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
  return nodes
}

function buildFlatTree(people: Person[]): TreeNode[] {
  return people.map((p) => ({
    id: p.id,
    kind: 'person' as const,
    label: personDisplayLabel(p),
    children: [],
    person: p,
    path: [],
  }))
}

/** Get all person IDs under a tree node (recursive). */
export function getPersonIdsUnder(node: TreeNode): string[] {
  if (node.kind === 'person' && node.person) return [node.person.id]
  return node.children.flatMap(getPersonIdsUnder)
}

/** Build tree for the given view mode. */
export function buildTree(people: Person[], viewMode: ViewMode, emptyTeams: EmptyTeams = {}): TreeNode[] {
  switch (viewMode) {
    case 'company':
      return buildCompanyTree(people, emptyTeams)
    case 'team':
      return buildTeamTree(people)
    case 'tags':
      return buildTagsTree(people)
    case 'flat':
      return buildFlatTree(people)
    default:
      return buildCompanyTree(people, emptyTeams)
  }
}

/** All unique role values from people (sorted). Use for role filter dropdown. */
export function getUniqueRoles(people: Person[]): string[] {
  const set = new Set<string>()
  for (const p of people) {
    if (p.role?.trim()) set.add(p.role.trim())
  }
  return Array.from(set).sort()
}

/** Filter people by role. Pass null/empty to return all. */
export function filterPeopleByRole(people: Person[], role: string | null): Person[] {
  if (!role?.trim()) return people
  return people.filter((p) => (p.role ?? '').trim() === role.trim())
}

/** Filter people by search (name, company, team, role, tags, dominant). */
export function filterPeopleBySearch(people: Person[], query: string): Person[] {
  const q = query.trim().toLowerCase()
  if (!q) return people
  return people.filter((p) => {
    const name = p.name.toLowerCase()
    const company = (p.company ?? '').toLowerCase()
    const team = (p.team ?? '').toLowerCase()
    const role = (p.role ?? '').toLowerCase()
    const tags = p.tags.join(' ').toLowerCase()
    const dominant = (p.dominant ?? '').toLowerCase()
    return (
      name.includes(q) ||
      company.includes(q) ||
      team.includes(q) ||
      role.includes(q) ||
      tags.includes(q) ||
      dominant.includes(q)
    )
  })
}
