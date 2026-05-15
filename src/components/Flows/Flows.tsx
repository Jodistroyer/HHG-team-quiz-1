import { useState } from 'react'
import { FlowsHome } from './FlowsPages/FlowsHome/FlowsHome'
import { FLOW_CONTEXT_PAGES } from './FlowsPages/FlowsContexts/contextPages'
import { FlowsDetail } from './FlowsPages/FlowsDetail/FlowsDetail'
import { FlowsRecommended } from './FlowsPages/FlowsRecommended/FlowsRecommended'
import { FlowsSaved } from './FlowsPages/FlowsSaved/FlowsSaved'
import { getSituation, type FlowContextId } from './flowsData'
import { consumePendingFlow } from './flowsNavigation'
import { FlowsLibrarySidebar, type FlowsLibraryView } from './FlowsSidebar/FlowsLibrarySidebar'
import type { FlowsBrainProfile } from './flowsTypes'
import './Flows.css'

export type { FlowsBrainProfile } from './flowsTypes'

type FlowsView =
  | { kind: 'browse' }
  | { kind: 'detail'; contextId: FlowContextId; situationId: string }

const PLACEHOLDER_BRAIN_PROFILE: FlowsBrainProfile = {
  dominant: 'Head',
  secondary: 'Heart',
}

const Flows = () => {
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

  const ContextPage =
    libraryContextId != null ? FLOW_CONTEXT_PAGES[libraryContextId] : null

  return (
    <div className={view.kind === 'detail' ? 'flows flows--detail' : 'flows'}>
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
          {libraryView === 'recommended' ? (
            <FlowsRecommended />
          ) : libraryView === 'saved' ? (
            <FlowsSaved />
          ) : view.kind === 'browse' && libraryView === 'context' && ContextPage ? (
            <ContextPage onOpenSituation={openSituation} />
          ) : view.kind === 'browse' ? (
            <FlowsHome
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
