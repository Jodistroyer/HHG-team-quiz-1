/**
 * Cross-page navigation glue for opening a specific flow from elsewhere in the
 * app (e.g. the "Recommended Flows" cards on the Quiz Results page).
 *
 * The pending target is written to localStorage and a window event fires; the
 * top-level App listens for that event to switch to the Flows tab, and the
 * Flows component reads + clears the pending target on mount.
 */

import type { FlowContextId } from './flowsData'

export const FLOWS_PENDING_KEY = 'hhg.flows.pendingOpen.v1'
export const FLOWS_NAVIGATE_EVENT = 'hhg:navigate-to-flows'

export interface PendingFlowDetail {
  kind: 'detail'
  contextId: FlowContextId
  situationId: string
  /**
   * When true, Flows detail should open with the user's quiz-derived profile
   * (quiz-derived profile). All other entry points use the browse default
   * (Head-strong first variant).
   */
  personalizedBrainProfile?: boolean
}

export interface PendingFlowBrowseContext {
  kind: 'browse-context'
  contextId: FlowContextId
}

export type PendingFlowTarget = PendingFlowDetail | PendingFlowBrowseContext

function isFlowContextId (n: unknown): n is FlowContextId {
  return n === 1 || n === 2 || n === 3 || n === 4
}

function dispatchNavigate () {
  try {
    window.dispatchEvent(new CustomEvent(FLOWS_NAVIGATE_EVENT))
  } catch {
    // ignore in non-DOM environments
  }
}

function writePending (target: PendingFlowTarget) {
  try {
    localStorage.setItem(FLOWS_PENDING_KEY, JSON.stringify(target))
  } catch {
    // ignore storage failures
  }
}

export type RequestOpenFlowOptions = {
  personalizedBrainProfile?: boolean
}

/** Card click (e.g. quiz scroller or Flows library) → open detail view directly. */
export function requestOpenFlow (
  target: { contextId: FlowContextId; situationId: string },
  options?: RequestOpenFlowOptions
) {
  const detail: PendingFlowDetail = {
    kind: 'detail',
    contextId: target.contextId,
    situationId: target.situationId,
  }
  if (options?.personalizedBrainProfile) {
    detail.personalizedBrainProfile = true
  }
  writePending(detail)
  dispatchNavigate()
}

/** "See more" tile → open browse view, scrolled to that context. */
export function requestOpenFlowsContext (contextId: FlowContextId) {
  writePending({ kind: 'browse-context', contextId })
  dispatchNavigate()
}

/** Used by `Flows.tsx` on mount to pick up a deep-link from another page. */
export function consumePendingFlow (): PendingFlowTarget | null {
  try {
    const raw = localStorage.getItem(FLOWS_PENDING_KEY)
    if (!raw) return null
    localStorage.removeItem(FLOWS_PENDING_KEY)
    const parsed = JSON.parse(raw) as Partial<PendingFlowTarget>
    if (!isFlowContextId(parsed.contextId)) return null
    if (parsed.kind === 'detail') {
      if (typeof parsed.situationId !== 'string' || parsed.situationId.length === 0) return null
      const personalized = parsed.personalizedBrainProfile === true
      return {
        kind: 'detail',
        contextId: parsed.contextId,
        situationId: parsed.situationId,
        ...(personalized ? { personalizedBrainProfile: true as const } : {}),
      }
    }
    if (parsed.kind === 'browse-context') {
      return { kind: 'browse-context', contextId: parsed.contextId }
    }
    return null
  } catch {
    return null
  }
}
