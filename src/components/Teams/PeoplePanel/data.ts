import type { HHGCenter, Person, TreeNode, ViewMode, TeamContextKey } from './types'
import type { QuizExportPayload, PeopleImportPayload } from './types'
import type { QuizAnswer, QuizAnswerType } from '../../Quiz/quizSections'
import { getBrainCombination } from '../../Quiz/SectionResults/utils'

/** Generate a simple unique id. */
export function nextId(prefix = 'person'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function toNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function normalizeAnswerChoice(value: unknown): QuizAnswerType | null {
  return value === 'Head' || value === 'Heart' || value === 'Gut' ? value : null
}

function normalizeQuizAnswer(raw: unknown): QuizAnswer {
  if (!raw || typeof raw !== 'object') {
    return { firstChoice: null, secondChoice: null }
  }
  const o = raw as Record<string, unknown>
  return {
    firstChoice: normalizeAnswerChoice(o.firstChoice),
    secondChoice: normalizeAnswerChoice(o.secondChoice),
  }
}

/**
 * Downloaded quiz JSON often omits top-level `answers` but still has each question under
 * `sections[].questions[].answer`. Merge those into a single map for `Person.quizAnswers`.
 */
function collectQuizAnswersFromSections(data: QuizExportPayload): Record<string, QuizAnswer> {
  const out: Record<string, QuizAnswer> = {}
  const sections = data.sections
  if (!Array.isArray(sections)) return out
  for (const section of sections) {
    const questions = section?.questions
    if (!Array.isArray(questions)) continue
    for (const q of questions) {
      if (!q || typeof q !== 'object' || typeof q.id !== 'string') continue
      const answer = normalizeQuizAnswer('answer' in q ? q.answer : undefined)
      if (answer.firstChoice != null || answer.secondChoice != null) {
        out[q.id] = answer
      }
    }
  }
  return out
}

function mergeQuizAnswersFromExport(data: QuizExportPayload): Record<string, QuizAnswer> | undefined {
  const fromSections = collectQuizAnswersFromSections(data)
  const top = data.answers && typeof data.answers === 'object' && !Array.isArray(data.answers) ? data.answers : {}
  const merged: Record<string, QuizAnswer> = { ...fromSections, ...top }
  return Object.keys(merged).length > 0 ? merged : undefined
}

type ContextScoreKey = Exclude<TeamContextKey, 'overall'>

const SECTION_ID_TO_CONTEXT: Record<number, ContextScoreKey> = {
  1: 'underPressure',
  2: 'doingWork',
  3: 'withPeople',
  4: 'gettingBetter',
}

const LEGACY_INDEX_TO_CONTEXT: ContextScoreKey[] = [
  'underPressure',
  'doingWork',
  'withPeople',
  'gettingBetter',
]

function contextKeyForSectionSummary (
  section: QuizExportPayload['sectionSummaries'][number],
  fallbackIndex: number
): ContextScoreKey | undefined {
  const id = section.sectionId
  if (typeof id === 'number' && id >= 1 && id <= 4) {
    return SECTION_ID_TO_CONTEXT[id]
  }
  const title = section.sectionTitle?.trim().toLowerCase()
  if (title === 'under pressure') return 'underPressure'
  if (title === 'doing work') return 'doingWork'
  if (title === 'with people') return 'withPeople'
  if (title === 'getting better') return 'gettingBetter'
  if (fallbackIndex >= 0 && fallbackIndex < LEGACY_INDEX_TO_CONTEXT.length) {
    return LEGACY_INDEX_TO_CONTEXT[fallbackIndex]
  }
  return undefined
}

function getDominantAndSecondary(
  headPercent: number,
  heartPercent: number,
  gutPercent: number
): { dominant: HHGCenter; secondaryBrain: HHGCenter | null } {
  const scores: Array<{ type: HHGCenter; value: number }> = [
    { type: 'Head' as HHGCenter, value: headPercent },
    { type: 'Heart' as HHGCenter, value: heartPercent },
    { type: 'Gut' as HHGCenter, value: gutPercent },
  ].sort((a, b) => b.value - a.value)

  return {
    dominant: scores[0]?.type ?? 'Head',
    secondaryBrain: scores[1] && scores[1].value > 0 ? scores[1].type : null,
  }
}

/** Parse quiz export JSON into a single Person (e.g. "Send to People Panel"). */
export function personFromQuizExport(
  data: QuizExportPayload,
  name: string = 'Imported'
): Person {
  const nd = data.naturalDefault
  const sectionSummaries =
    data.sectionSummaries?.length
      ? data.sectionSummaries
      : (data.sections ?? []).map((section) => ({
          sectionId: section.id,
          sectionTitle: section.title,
          headPercent: toNumber(section.scores?.headPercent, 0),
          heartPercent: toNumber(section.scores?.heartPercent, 0),
          gutPercent: toNumber(section.scores?.gutPercent, 0),
          combinationLabel: section.scores
            ? getBrainCombination(section.scores.headPercent, section.scores.heartPercent, section.scores.gutPercent).label
            : 'Not Done',
        }))
  const contextScores: Person['contextScores'] = {}
  sectionSummaries.forEach((section, idx) => {
    const key = contextKeyForSectionSummary(section, idx)
    if (!key) return
    contextScores[key] = {
      headPercent: section.headPercent ?? 0,
      heartPercent: section.heartPercent ?? 0,
      gutPercent: section.gutPercent ?? 0,
    }
  })

  const headPercent = toNumber(nd.headPercent, 33.33)
  const heartPercent = toNumber(nd.heartPercent, 33.33)
  const gutPercent = toNumber(nd.gutPercent, 33.34)
  const derived = getDominantAndSecondary(headPercent, heartPercent, gutPercent)

  return {
    id: nextId('import'),
    name: data.name ?? name,
    company: undefined,
    team: undefined,
    role: undefined,
    tags: [],
    quizAnswers: mergeQuizAnswersFromExport(data),
    quizCompletedAt: data.completedAt,
    headPercent,
    heartPercent,
    gutPercent,
    dominant: derived.dominant,
    secondaryBrain: derived.secondaryBrain,
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
      quizAnswers: p.quizAnswers,
      quizCompletedAt: p.quizCompletedAt,
      headPercent: p.headPercent ?? 33.33,
      heartPercent: p.heartPercent ?? 33.33,
      gutPercent: p.gutPercent ?? 33.34,
      dominant: getDominant(),
      secondaryBrain: p.secondaryBrain ?? null,
      contextScores: p.contextScores,
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

/** Display label for a person: "Name (Role)" when role exists. */
export function personDisplayLabel(p: Person): string {
  return p.role ? `${p.name} (${p.role})` : p.name
}

/** Parse a person row label from rename/edit. Supports "Name (Role)" and legacy spaced em- or en-dash between name and role (\u2014 / \u2013). */
export function parsePersonDisplayLabel(label: string): { name: string; role?: string } {
  const t = label.trim()
  const bracket = /^(.+?)\s*\(([^)]+)\)\s*$/.exec(t)
  if (bracket) {
    return { name: bracket[1]!.trim(), role: bracket[2]!.trim() }
  }
  const legacySeps = [' \u2014 ', ' \u2013 '] as const
  for (const sep of legacySeps) {
    const parts = t.split(sep)
    if (parts.length >= 2) {
      return { name: parts[0]!.trim(), role: parts.slice(1).join(sep).trim() }
    }
  }
  return { name: t }
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
        ...personHhgVisuals(p),
      }))

      const teamLabel = teamName === '_' ? 'Other' : teamName
      const teamVisuals = groupHhgVisuals(teamPeople)
      childNodes.push({
        id: `team-${companyName}-${teamName}`,
        kind: 'team',
        label: teamLabel,
        teamKey: teamName,
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

  nodes.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }))
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

function personHhgVisuals(person: Person): { aggregateLabel: string; indicatorDotColors: string[] } {
  const combo = getBrainCombination(person.headPercent, person.heartPercent, person.gutPercent)
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
        ...personHhgVisuals(p),
      })),
      path: [],
      ...visuals,
    })
  }
  nodes.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }))
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
        ...personHhgVisuals(p),
      })),
      path: [],
      ...tagVisuals,
    })
  }
  nodes.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }))
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
    ...personHhgVisuals(p),
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
