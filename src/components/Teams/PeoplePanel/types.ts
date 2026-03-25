/** HHG center type (Head / Heart / Gut) */
export type HHGCenter = 'Head' | 'Heart' | 'Gut'

/** One person: can come from a finished quiz or be added manually. */
export interface Person {
  id: string
  name: string
  company?: string
  team?: string
  role?: string
  tags: string[]
  /** Overall HHG percentages (0–100) */
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: HHGCenter
  secondaryBrain: HHGCenter | null
  /** Optional: section-based tendencies for P/W/Pe/G if we have section data */
  sectionTendencies?: {
    P?: HHGCenter
    W?: HHGCenter
    Pe?: HHGCenter
    G?: HHGCenter
  }
  /** Optional context-specific HHG percentages for team map tabs. */
  contextScores?: Partial<Record<TeamContextKey, TeamContextScores>>
}

export type TeamContextKey = 'overall' | 'underPressure' | 'doingWork' | 'withPeople' | 'gettingBetter'

export interface TeamContextScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

/** Tree node for hierarchical display. */
export type TreeNodeKind = 'company' | 'team' | 'role' | 'person' | 'tag'

export interface TreeNode {
  id: string
  kind: TreeNodeKind
  label: string
  count?: number
  /** For groups: brain combo label from averaged HHG (a11y + future UI) */
  aggregateLabel?: string
  /** Dot colours in badge order (1–3): from averaged HHG via getBrainCombination */
  indicatorDotColors?: string[]
  children: TreeNode[]
  /** Only for kind === 'person' */
  person?: Person
  /** Breadcrumb path for this node */
  path?: string[]
}

/** Organization view mode. Role is not a hierarchy level. */
export type ViewMode = 'company' | 'team' | 'tags' | 'flat'

/** Saved group for quick selection. */
export interface SavedGroup {
  id: string
  name: string
  personIds: string[]
}

/** Quiz JSON export shape (for Import JSON). */
export interface QuizExportNaturalDefault {
  headPercent: number
  heartPercent: number
  gutPercent: number
  combinationLabel?: string
  dominant?: HHGCenter
  secondaryBrain?: HHGCenter | null
}

export interface QuizExportPayload {
  exportedAt?: string
  naturalDefault: QuizExportNaturalDefault
  sectionSummaries?: Array<{
    headPercent: number
    heartPercent: number
    gutPercent: number
    combinationLabel?: string
  }>
  name?: string
}

/** Bulk people import format. */
export interface PeopleImportPayload {
  people: Array<{
    id?: string
    name: string
    company?: string
    team?: string
    role?: string
    tags?: string[]
    headPercent: number
    heartPercent: number
    gutPercent: number
    dominant?: HHGCenter
    secondaryBrain?: HHGCenter | null
  }>
}
