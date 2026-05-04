import { useState } from 'react'
import { FlowsBrowse } from './FlowsBrowse/FlowsBrowse'
import { FlowsDetail } from './FlowsDetail/FlowsDetail'
import { FLOW_CONTEXTS, getSituation, type FlowContextId } from './flowsData'
import type { BrainType } from './flowsData'
import { consumePendingFlow } from './flowsNavigation'
import './Flows.css'

type FlowsView =
  | { kind: 'browse' }
  | { kind: 'detail'; contextId: FlowContextId; situationId: string }

/**
 * Placeholder brain type for the framework. Will later be derived from the
 * user's quiz result (see Quiz/quizScoring.ts and overallArchetypes.ts).
 *
 * Shape mirrors the quiz output:
 *   - dominant only       → "Head Strong" / "Heart Strong" / "Gut Strong"
 *   - dominant + secondary → "Head + Heart", "Heart + Gut", etc.
 *   - balanced (all three) → set `tertiary` so combo resolves to
 *     "Head + Heart + Gut" (the archetype key uses fixed order).
 */
export interface FlowsBrainProfile {
  dominant: BrainType
  secondary: BrainType | null
  tertiary?: BrainType | null
}

const PLACEHOLDER_BRAIN_PROFILE: FlowsBrainProfile = {
  dominant: 'Head',
  secondary: 'Heart',
}

const Flows = () => {
  // Initialize synchronously so a deep-link from the Quiz Results "Recommended
  // Flows" cards opens directly into the detail view without a flicker.
  // App.tsx mounts/unmounts Flows on each tab switch, so the pending target is
  // always picked up here on first render.
  const pendingOnMount = consumePendingFlow()

  const [view, setView] = useState<FlowsView>(() => {
    if (
      pendingOnMount?.kind === 'detail' &&
      getSituation(pendingOnMount.contextId, pendingOnMount.situationId)
    ) {
      return {
        kind: 'detail',
        contextId: pendingOnMount.contextId,
        situationId: pendingOnMount.situationId,
      }
    }
    return { kind: 'browse' }
  })

  // If the pending target asked for "browse with scroll-to-context", remember
  // it so FlowsBrowse can scrollIntoView on mount. Detail-mode pending is
  // already consumed above.
  const browseScrollContextId =
    pendingOnMount?.kind === 'browse-context' ? pendingOnMount.contextId : null

  const openSituation = (contextId: FlowContextId, situationId: string) => {
    setView({ kind: 'detail', contextId, situationId })
  }

  const goBrowse = () => setView({ kind: 'browse' })

  const switchContext = (contextId: FlowContextId) => {
    const next = FLOW_CONTEXTS.find((c) => c.id === contextId)
    if (!next || next.situations.length === 0) return
    setView({
      kind: 'detail',
      contextId,
      situationId: next.situations[0]!.id,
    })
  }

  const switchSituation = (situationId: string) => {
    if (view.kind !== 'detail') return
    setView({ ...view, situationId })
  }

  return (
    <div className="flows">
      {view.kind === 'browse' ? (
        <FlowsBrowse
          brainProfile={PLACEHOLDER_BRAIN_PROFILE}
          onOpenSituation={openSituation}
          scrollToContextId={browseScrollContextId}
        />
      ) : (
        <FlowsDetail
          brainProfile={PLACEHOLDER_BRAIN_PROFILE}
          contextId={view.contextId}
          situationId={view.situationId}
          onBack={goBrowse}
          onSwitchContext={switchContext}
          onSwitchSituation={switchSituation}
        />
      )}
    </div>
  )
}

export default Flows
