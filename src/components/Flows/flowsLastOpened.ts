import type { BrainType, FlowContextId } from './flowsData'
import type { FlowsBrainProfile } from './flowsTypes'

const LAST_OPENED_KEY = 'hhg.flows.lastOpened.v1'
const RECENT_OPENS_KEY = 'hhg.flows.recentOpens.v1'
const RECENT_OPENS_MAX = 3

export interface LastOpenedFlow {
  contextId: FlowContextId
  situationId: string
  openedAt: number
  /** Combo actually used in Flow detail when this open was recorded (browse vs personalised). */
  brainProfile?: FlowsBrainProfile
}

function isBrainType (x: unknown): x is BrainType {
  return x === 'Head' || x === 'Heart' || x === 'Gut'
}

function parseStoredFlowsBrainProfile (raw: unknown): FlowsBrainProfile | undefined {
  if (raw == null) return undefined
  if (typeof raw !== 'object') return undefined
  const o = raw as Record<string, unknown>
  if (!isBrainType(o.dominant)) return undefined
  const dominant = o.dominant
  if (o.secondary == null || o.secondary === undefined) {
    return { dominant, secondary: null }
  }
  if (!isBrainType(o.secondary)) return undefined
  const secondary = o.secondary
  if (o.tertiary == null || o.tertiary === undefined) {
    return { dominant, secondary }
  }
  if (!isBrainType(o.tertiary)) return undefined
  return { dominant, secondary, tertiary: o.tertiary }
}

function isValidLastOpenedShape (parsed: Partial<LastOpenedFlow>): parsed is LastOpenedFlow {
  const cid = parsed.contextId
  if (cid !== 1 && cid !== 2 && cid !== 3 && cid !== 4) return false
  if (typeof parsed.situationId !== 'string' || parsed.situationId.length === 0) return false
  return true
}

function normalizeLoadedFlow (input: {
  contextId: FlowContextId
  situationId: string
  openedAt: number
  brainProfile?: unknown
}): LastOpenedFlow {
  const brainProfile = parseStoredFlowsBrainProfile(input.brainProfile)
  const base: LastOpenedFlow = {
    contextId: input.contextId,
    situationId: input.situationId,
    openedAt: input.openedAt,
  }
  return brainProfile != null ? { ...base, brainProfile } : base
}

function appendRecentOpenInternal (
  contextId: FlowContextId,
  situationId: string,
  brainProfile?: FlowsBrainProfile
) {
  try {
    const next: LastOpenedFlow = {
      contextId,
      situationId,
      openedAt: Date.now(),
      ...(brainProfile ? { brainProfile } : {}),
    }
    const prev = loadRecentOpensRaw()
    const deduped = prev.filter((p) => p.contextId !== contextId || p.situationId !== situationId)
    const merged = [next, ...deduped].slice(0, RECENT_OPENS_MAX)
    localStorage.setItem(RECENT_OPENS_KEY, JSON.stringify(merged))
  } catch {
    // ignore
  }
}

function loadRecentOpensRaw (): LastOpenedFlow[] {
  try {
    const raw = localStorage.getItem(RECENT_OPENS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    const out: LastOpenedFlow[] = []
    for (const item of parsed) {
      if (!item || typeof item !== 'object') continue
      const rec = item as Partial<LastOpenedFlow>
      if (!isValidLastOpenedShape(rec)) continue
      out.push(
        normalizeLoadedFlow({
          contextId: rec.contextId,
          situationId: rec.situationId,
          openedAt: typeof rec.openedAt === 'number' ? rec.openedAt : Date.now(),
          brainProfile: (rec as { brainProfile?: unknown }).brainProfile,
        })
      )
    }
    return out.slice(0, RECENT_OPENS_MAX)
  } catch {
    return []
  }
}

/** Up to `RECENT_OPENS_MAX` flows the user opened, newest first (for Home quick-card cycling). */
export function loadRecentOpens (): LastOpenedFlow[] {
  return loadRecentOpensRaw()
}

export function loadLastOpenedFlow (): LastOpenedFlow | null {
  try {
    const raw = localStorage.getItem(LAST_OPENED_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<LastOpenedFlow>
    if (!isValidLastOpenedShape(parsed)) return null
    return normalizeLoadedFlow({
      contextId: parsed.contextId,
      situationId: parsed.situationId,
      openedAt: typeof parsed.openedAt === 'number' ? parsed.openedAt : Date.now(),
      brainProfile: (parsed as { brainProfile?: unknown }).brainProfile,
    })
  } catch {
    return null
  }
}

export function persistLastOpenedFlow (
  contextId: FlowContextId,
  situationId: string,
  brainProfile?: FlowsBrainProfile
) {
  try {
    const payload: LastOpenedFlow = {
      contextId,
      situationId,
      openedAt: Date.now(),
      ...(brainProfile ? { brainProfile } : {}),
    }
    localStorage.setItem(LAST_OPENED_KEY, JSON.stringify(payload))
    appendRecentOpenInternal(contextId, situationId, brainProfile)
  } catch {
    // ignore
  }
}

/** Updates stored brain wiring for the current flow without bumping `openedAt` or reordering recent opens. */
export function updatePersistedFlowBrainProfile (
  contextId: FlowContextId,
  situationId: string,
  brainProfile: FlowsBrainProfile
): void {
  try {
    const last = loadLastOpenedFlow()
    if (
      last &&
      last.contextId === contextId &&
      last.situationId === situationId
    ) {
      const next: LastOpenedFlow = { ...last, brainProfile }
      localStorage.setItem(LAST_OPENED_KEY, JSON.stringify(next))
    }

    const rawRecent = localStorage.getItem(RECENT_OPENS_KEY)
    if (!rawRecent) return
    const parsed = JSON.parse(rawRecent) as unknown
    if (!Array.isArray(parsed)) return
    let changed = false
    const out = parsed.map((item: unknown) => {
      if (!item || typeof item !== 'object') return item
      const rec = item as Partial<LastOpenedFlow>
      if (
        !isValidLastOpenedShape(rec) ||
        rec.contextId !== contextId ||
        rec.situationId !== situationId
      ) {
        return item
      }
      changed = true
      return {
        ...rec,
        brainProfile,
      }
    })
    if (changed) {
      localStorage.setItem(RECENT_OPENS_KEY, JSON.stringify(out))
    }
  } catch {
    // ignore
  }
}
