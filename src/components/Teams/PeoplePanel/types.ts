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
}

/** Tree node for hierarchical display. */
export type TreeNodeKind = 'company' | 'team' | 'role' | 'person' | 'tag'

export interface TreeNode {
  id: string
  kind: TreeNodeKind
  label: string
  count?: number
  /** For groups: aggregate tendency (e.g. "Head-dominant") or dot indicators */
  aggregateLabel?: string
  /** Head/Heart/Gut dominance for indicator dots: [H, He, G] */
  indicatorDots?: [HHGCenter, HHGCenter?, HHGCenter?]
  children: TreeNode[]
  /** Only for kind === 'person' */
  person?: Person
  /** Breadcrumb path for this node */
  path?: string[]
}

/** Organization view mode. Role is not a hierarchy level; use role filter instead. */
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
