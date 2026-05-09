import { useState } from 'react'
import { FlowsBrowse } from './FlowsBrowse/FlowsBrowse'
import { FlowsContextPage } from './FlowsContextPage'
import { FlowsDetail } from './FlowsDetail/FlowsDetail'
import { getSituation, type FlowContextId } from './flowsData'
import type { BrainType } from './flowsData'
import { consumePendingFlow } from './flowsNavigation'
import { FlowsLibrarySidebar, type FlowsLibraryView } from './FlowsLibrarySidebar'
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

  const [libraryView, setLibraryView] = useState<FlowsLibraryView>(() => {
    if (pendingOnMount?.kind === 'browse-context') return 'context'
    return 'home'
  })

  const [libraryContextId, setLibraryContextId] = useState<FlowContextId | null>(() => {
    if (pendingOnMount?.kind === 'browse-context') return pendingOnMount.contextId
    return null
  })

  const openSituation = (contextId: FlowContextId, situationId: string) => {
    setView({ kind: 'detail', contextId, situationId })
  }

  const goBrowse = () => setView({ kind: 'browse' })

  return (
    <div className="flows">
      <div className="flows__layout">
        <FlowsLibrarySidebar
          activeView={libraryView}
          activeContextId={libraryContextId}
          onHome={() => {
            setLibraryView('home')
            setLibraryContextId(null)
            setView({ kind: 'browse' })
          }}
          onPickContext={(contextId) => {
            setLibraryView('context')
            setLibraryContextId(contextId)
            setView({ kind: 'browse' })
          }}
          onRecommended={() => {
            setLibraryView('recommended')
            setLibraryContextId(null)
          }}
          onSaved={() => {
            setLibraryView('saved')
            setLibraryContextId(null)
          }}
        />

        <main className="flows__content">
          {libraryView === 'recommended' || libraryView === 'saved' ? (
            <section className="flows-library-view" aria-label="My flows">
              <h1 className="flows-library-view__title">
                {libraryView === 'recommended' ? 'Recommended' : 'Saved'}
              </h1>
              <p className="flows-library-view__body">
                This view is coming soon. For now, use the context buttons to browse flows.
              </p>
            </section>
          ) : view.kind === 'browse' && libraryView === 'context' && libraryContextId ? (
            <FlowsContextPage contextId={libraryContextId} onOpenSituation={openSituation} />
          ) : view.kind === 'browse' ? (
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
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default Flows
