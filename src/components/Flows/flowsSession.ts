import { getSituation, type FlowContextId } from './flowsData'
import type { FlowsBrainProfile } from './flowsTypes'
import { FLOWS_BROWSE_DEFAULT_BRAIN_PROFILE } from './flowsTypes'
import { parseStoredFlowsBrainProfile } from './flowsLastOpened'
import type { FlowsLibraryView } from './FlowsSidebar/FlowsLibrarySidebar'

const SESSION_KEY = 'hhg.flows.session.v1'

export type FlowsSessionView =
  | { kind: 'browse' }
  | { kind: 'detail'; contextId: FlowContextId; situationId: string }

export interface PersistedFlowsSession {
  view: FlowsSessionView
  libraryView: FlowsLibraryView
  libraryContextId: FlowContextId | null
  brainProfile: FlowsBrainProfile
}

function isFlowContextId (n: unknown): n is FlowContextId {
  return n === 1 || n === 2 || n === 3 || n === 4
}

function isLibraryView (v: unknown): v is FlowsLibraryView {
  return v === 'home' || v === 'context'
}

function parseView (raw: unknown): FlowsSessionView | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (o.kind === 'browse') return { kind: 'browse' }
  if (o.kind === 'detail' && isFlowContextId(o.contextId) && typeof o.situationId === 'string') {
    if (o.situationId.length === 0) return null
    if (!getSituation(o.contextId, o.situationId)) return null
    return { kind: 'detail', contextId: o.contextId, situationId: o.situationId }
  }
  return null
}

export function loadFlowsSession (): PersistedFlowsSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Record<string, unknown>
    const view = parseView(parsed.view)
    if (!view) return null
    const libraryView = parsed.libraryView
    if (!isLibraryView(libraryView)) return null
    let libraryContextId =
      parsed.libraryContextId == null
        ? null
        : isFlowContextId(parsed.libraryContextId)
          ? parsed.libraryContextId
          : null
    const brainProfile =
      parseStoredFlowsBrainProfile(parsed.brainProfile) ?? FLOWS_BROWSE_DEFAULT_BRAIN_PROFILE
    if (view.kind === 'detail') {
      libraryContextId = view.contextId
      return { view, libraryView: 'context', libraryContextId, brainProfile }
    }
    return { view, libraryView, libraryContextId, brainProfile }
  } catch {
    return null
  }
}

export function persistFlowsSession (session: PersistedFlowsSession): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // ignore
  }
}
