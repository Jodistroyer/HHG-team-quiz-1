import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FlowsHome } from './FlowsPages/FlowsHome/FlowsHome'
import { FLOW_CONTEXT_PAGES } from './FlowsPages/FlowsContexts/contextPages'
import { FlowsDetail } from './FlowsPages/FlowsDetail/FlowsDetail'
import { getSituation, type FlowContextId } from './flowsData'
import {
  loadLastOpenedFlow,
  loadRecentOpens,
  persistLastOpenedFlow,
  updatePersistedFlowBrainProfile,
  type LastOpenedFlow,
} from './flowsLastOpened'
import { consumePendingFlow, FLOWS_NAVIGATE_EVENT, type PendingFlowTarget } from './flowsNavigation'
import { loadFlowsSession, persistFlowsSession } from './flowsSession'
import { FlowsLibrarySidebar, type FlowsLibraryView } from './FlowsSidebar/FlowsLibrarySidebar'
import { flowsBrainProfileForStoredContext } from './flowsQuizSnapshot'
import { FLOWS_BROWSE_DEFAULT_BRAIN_PROFILE, type FlowsBrainProfile } from './flowsTypes'
import './Flows.css'

export type { FlowsBrainProfile } from './flowsTypes'

type FlowsView =
  | { kind: 'browse' }
  | { kind: 'detail'; contextId: FlowContextId; situationId: string }

function brainProfileForPendingDetail (pending: PendingFlowTarget): FlowsBrainProfile {
  if (pending?.kind === 'detail' && pending.personalizedBrainProfile) {
    return flowsBrainProfileForStoredContext(pending.contextId)
  }
  return FLOWS_BROWSE_DEFAULT_BRAIN_PROFILE
}

function resolveInitialFlowsState (pending: PendingFlowTarget | null) {
  if (
    pending?.kind === 'detail' &&
    getSituation(pending.contextId, pending.situationId)
  ) {
    return {
      view: {
        kind: 'detail' as const,
        contextId: pending.contextId,
        situationId: pending.situationId,
      },
      libraryView: 'context' as FlowsLibraryView,
      libraryContextId: pending.contextId,
      detailBrainProfile: brainProfileForPendingDetail(pending),
      restoredFromSession: false,
    }
  }
  if (pending?.kind === 'browse-context') {
    return {
      view: { kind: 'browse' as const },
      libraryView: 'context' as FlowsLibraryView,
      libraryContextId: pending.contextId,
      detailBrainProfile: FLOWS_BROWSE_DEFAULT_BRAIN_PROFILE,
      restoredFromSession: false,
    }
  }

  const session = loadFlowsSession()
  if (session) {
    return {
      view: session.view,
      libraryView: session.libraryView,
      libraryContextId: session.libraryContextId,
      detailBrainProfile: session.brainProfile,
      restoredFromSession: true,
    }
  }

  return {
    view: { kind: 'browse' as const },
    libraryView: 'home' as FlowsLibraryView,
    libraryContextId: null,
    detailBrainProfile: FLOWS_BROWSE_DEFAULT_BRAIN_PROFILE,
    restoredFromSession: false,
  }
}

interface FlowsProps {
  onNavigate?: (page: string) => void
}

const Flows = ({ onNavigate }: FlowsProps) => {
  const pendingOnMount = consumePendingFlow()
  const initial = resolveInitialFlowsState(pendingOnMount)
  const skipDetailScrollToTopRef = useRef(initial.restoredFromSession)

  const [detailBrainProfile, setDetailBrainProfile] = useState<FlowsBrainProfile>(
    () => initial.detailBrainProfile
  )
  const [view, setView] = useState<FlowsView>(() => initial.view)
  const [libraryView, setLibraryView] = useState<FlowsLibraryView>(() => initial.libraryView)
  const [libraryContextId, setLibraryContextId] = useState<FlowContextId | null>(
    () => initial.libraryContextId
  )

  const [lastOpened, setLastOpened] = useState<LastOpenedFlow | null>(() => loadLastOpenedFlow())
  const [recentOpens, setRecentOpens] = useState<LastOpenedFlow[]>(() => loadRecentOpens())

  const detailScrollKey =
    view.kind === 'detail' ? `${view.contextId}:${view.situationId}` : null

  useEffect(() => {
    persistFlowsSession({
      view,
      libraryView,
      libraryContextId,
      brainProfile: detailBrainProfile,
    })
  }, [view, libraryView, libraryContextId, detailBrainProfile])

  const prevDetailScrollKeyRef = useRef<string | null>(null)
  useLayoutEffect(() => {
    if (detailScrollKey == null) {
      prevDetailScrollKeyRef.current = null
      return
    }
    if (skipDetailScrollToTopRef.current) {
      skipDetailScrollToTopRef.current = false
      prevDetailScrollKeyRef.current = detailScrollKey
      return
    }
    const prev = prevDetailScrollKeyRef.current
    prevDetailScrollKeyRef.current = detailScrollKey
    if (prev === detailScrollKey) return
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
    setLibraryView('context')
    setLibraryContextId(contextId)
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

  const openSituationRef = useRef(openSituation)
  openSituationRef.current = openSituation

  useEffect(() => {
    const applyPending = () => {
      const pending = consumePendingFlow()
      if (pending?.kind === 'detail' && getSituation(pending.contextId, pending.situationId)) {
        openSituationRef.current(
          pending.contextId,
          pending.situationId,
          pending.personalizedBrainProfile ? { personalizedBrainProfile: true } : undefined
        )
        return
      }
      if (pending?.kind === 'browse-context') {
        setLibraryView('context')
        setLibraryContextId(pending.contextId)
        setView({ kind: 'browse' })
      }
    }
    window.addEventListener(FLOWS_NAVIGATE_EVENT, applyPending)
    return () => window.removeEventListener(FLOWS_NAVIGATE_EVENT, applyPending)
  }, [])

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
        />

        <main className="flows__content">
          {view.kind === 'browse' && libraryView === 'context' && ContextPage ? (
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
