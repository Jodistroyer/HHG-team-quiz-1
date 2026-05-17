import { useLayoutEffect, useState } from 'react'
import { FlowsHome } from './FlowsPages/FlowsHome/FlowsHome'
import { FLOW_CONTEXT_PAGES } from './FlowsPages/FlowsContexts/contextPages'
import { FlowsDetail } from './FlowsPages/FlowsDetail/FlowsDetail'
import { FlowsSaved } from './FlowsPages/FlowsSaved/FlowsSaved'
import { getSituation, type FlowContextId } from './flowsData'
import {
  loadLastOpenedFlow,
  loadRecentOpens,
  persistLastOpenedFlow,
  updatePersistedFlowBrainProfile,
  type LastOpenedFlow,
} from './flowsLastOpened'
import { consumePendingFlow } from './flowsNavigation'
import { FlowsLibrarySidebar, type FlowsLibraryView } from './FlowsSidebar/FlowsLibrarySidebar'
import { flowsBrainProfileForStoredContext } from './flowsQuizSnapshot'
import { FLOWS_BROWSE_DEFAULT_BRAIN_PROFILE, type FlowsBrainProfile } from './flowsTypes'
import './Flows.css'

export type { FlowsBrainProfile } from './flowsTypes'

type FlowsView =
  | { kind: 'browse' }
  | { kind: 'detail'; contextId: FlowContextId; situationId: string }

function initialDetailBrainProfile (pending: ReturnType<typeof consumePendingFlow>): FlowsBrainProfile {
  if (pending?.kind === 'detail' && pending.personalizedBrainProfile) {
    return flowsBrainProfileForStoredContext(pending.contextId)
  }
  return FLOWS_BROWSE_DEFAULT_BRAIN_PROFILE
}

interface FlowsProps {
  onNavigate?: (page: string) => void
}

const Flows = ({ onNavigate }: FlowsProps) => {
  const pendingOnMount = consumePendingFlow()

  const [detailBrainProfile, setDetailBrainProfile] = useState<FlowsBrainProfile>(() =>
    initialDetailBrainProfile(pendingOnMount)
  )

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

  const [libraryView, setLibraryView] = useState<FlowsLibraryView>(() => {
    if (pendingOnMount?.kind === 'browse-context') return 'context'
    return 'home'
  })

  const [libraryContextId, setLibraryContextId] = useState<FlowContextId | null>(() => {
    if (pendingOnMount?.kind === 'browse-context') return pendingOnMount.contextId
    return null
  })

  const [lastOpened, setLastOpened] = useState<LastOpenedFlow | null>(() => loadLastOpenedFlow())
  const [recentOpens, setRecentOpens] = useState<LastOpenedFlow[]>(() => loadRecentOpens())

  const detailScrollKey =
    view.kind === 'detail' ? `${view.contextId}:${view.situationId}` : null

  // Browse → detail stays on the Flows tab, so App does not reset window scroll.
  useLayoutEffect(() => {
    if (detailScrollKey == null) return
    window.scrollTo(0, 0)
  }, [detailScrollKey])

  const openSituation = (
    contextId: FlowContextId,
    situationId: string,
    opts?: { personalizedBrainProfile?: boolean; brainProfile?: FlowsBrainProfile }
  ) => {
    const brainProfile =
      opts?.brainProfile ??
      (opts?.personalizedBrainProfile
        ? flowsBrainProfileForStoredContext(contextId)
        : FLOWS_BROWSE_DEFAULT_BRAIN_PROFILE)
    persistLastOpenedFlow(contextId, situationId, brainProfile)
    setLastOpened({
      contextId,
      situationId,
      openedAt: Date.now(),
      brainProfile,
    })
    setRecentOpens(loadRecentOpens())
    setDetailBrainProfile(brainProfile)
    setView({ kind: 'detail', contextId, situationId })
  }

  const commitBrainVariantForDetail = (brainProfile: FlowsBrainProfile) => {
    if (view.kind !== 'detail') return
    const { contextId, situationId } = view
    updatePersistedFlowBrainProfile(contextId, situationId, brainProfile)
    setLastOpened((prev) =>
      prev != null && prev.contextId === contextId && prev.situationId === situationId
        ? { ...prev, brainProfile }
        : prev
    )
    setRecentOpens(loadRecentOpens())
    setDetailBrainProfile(brainProfile)
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
          onSaved={() => {
            setLibraryView('saved')
            setLibraryContextId(null)
            setView({ kind: 'browse' })
          }}
        />

        <main className="flows__content">
          {libraryView === 'saved' ? (
            <FlowsSaved />
          ) : view.kind === 'browse' && libraryView === 'context' && ContextPage ? (
            <ContextPage
              onOpenMatchedFlow={(contextId, situationId, brainProfile) =>
                openSituation(
                  contextId,
                  situationId,
                  brainProfile != null
                    ? { brainProfile }
                    : { personalizedBrainProfile: true }
                )
              }
              onTakeQuiz={() => onNavigate?.('quiz')}
              onFinishContext={() => onNavigate?.('quiz')}
            />
          ) : view.kind === 'browse' ? (
            <FlowsHome
              lastOpened={lastOpened}
              recentOpens={recentOpens}
              onOpenMatchedFlow={(contextId, situationId, brainProfile) =>
                openSituation(
                  contextId,
                  situationId,
                  brainProfile != null
                    ? { brainProfile }
                    : { personalizedBrainProfile: true }
                )
              }
              onPickContext={(contextId) => {
                setLibraryView('context')
                setLibraryContextId(contextId)
                setView({ kind: 'browse' })
              }}
              onTakeQuiz={() => onNavigate?.('quiz')}
            />
          ) : (
            <FlowsDetail
              key={`${view.contextId}-${view.situationId}-${detailBrainProfile.dominant}-${detailBrainProfile.secondary ?? 'none'}-${detailBrainProfile.tertiary ?? 'none'}`}
              brainProfile={detailBrainProfile}
              contextId={view.contextId}
              situationId={view.situationId}
              onBack={goBrowse}
              onBrainVariantChange={commitBrainVariantForDetail}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default Flows
