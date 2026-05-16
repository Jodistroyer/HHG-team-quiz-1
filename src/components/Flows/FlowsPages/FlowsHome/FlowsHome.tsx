import { Fragment, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faChevronRight,
  faDiamond,
  faHeart,
  faSquare,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { CONTEXT_BACKGROUND, ContextCardArt } from '../../../Quiz/ContextArt'
import { FlowSituationCardArt } from '../../FlowsShared/FlowSituationCardArt'
import '../../FlowsShared/FlowCard.css'
import { BRAIN_MUTED, BRAIN_PALETTE } from '../../flowsContexts'
import {
  FLOW_CONTEXTS,
  getSituation,
  type BrainType,
  type FlowContextId,
  type FlowSituation,
} from '../../flowsData'
import { getCompletedFlowsContextIdsForMatchedFlows, getMatchedFlowPreviews } from '../../flowsHomeMatched'
import type { LastOpenedFlow } from '../../flowsLastOpened'
import { flowsBrainProfileForStoredContext, useFlowsQuizSnapshot } from '../../flowsQuizSnapshot'
import type { FlowsBrainProfile } from '../../flowsTypes'
import { profileToActiveId } from '../FlowsDetail/BrainTypeSidebar'
import './FlowsHome.css'

const CONTEXT_MOMENT_LINES: Record<FlowContextId, string> = {
  1: 'Overwhelm · Conflict · Decisions',
  2: 'Focus · Decisions · Blocks',
  3: 'Social energy · Conflict · Connection',
  4: 'Setbacks · Habits · Recovery',
}

type QuickCyclePhase = 'recent' | 'matched' | 'random'

interface QuickCycleTarget {
  contextId: FlowContextId
  situationId: string
  phase: QuickCyclePhase
  /** Present for recent opens — matches what Flow detail used for that open. */
  brainProfile?: FlowsBrainProfile
}

const RECENT_CYCLE_MAX = 3

function flowPairKey (contextId: FlowContextId, situationId: string): string {
  return `${contextId}:${situationId}`
}

function hashString (s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32 (seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffleWithSeed<T>(items: T[], seed: number): T[] {
  const rng = mulberry32(seed)
  const a = items.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function quickEyebrow (phase: QuickCyclePhase, ctxTitle: string, cycleIndex: number): string {
  if (phase === 'recent' && cycleIndex === 0) return `Last used · ${ctxTitle}`
  if (phase === 'recent') return `Recently opened · ${ctxTitle}`
  if (phase === 'matched') return `Matched to you · ${ctxTitle}`
  return `Suggested · ${ctxTitle}`
}

interface FlowsHomeProps {
  /**
   * Opens flow. Pass `brainProfile` from the quick card so detail matches what was shown;
   * omit it for “Matched to you” cards (quiz-derived profile per context).
   */
  onOpenMatchedFlow: (
    contextId: FlowContextId,
    situationId: string,
    brainProfile?: FlowsBrainProfile
  ) => void
  onGoToRecommended: () => void
  onPickContext: (contextId: FlowContextId) => void
  onTakeQuiz: () => void
  lastOpened: LastOpenedFlow | null
  /** Newest first; used with `lastOpened` to cycle “Not this” through recent opens. */
  recentOpens: LastOpenedFlow[]
}

export function flowsHomeSectionId (contextId: FlowContextId): string {
  return `flows-context-${contextId}`
}

/** @deprecated Use `flowsHomeSectionId` — kept for deep-link scroll targets. */
export const flowsBrowseSectionId = flowsHomeSectionId

const DEFAULT_HEAD_HEART_GUT: BrainType[] = ['Head', 'Heart', 'Gut']
const FLOW_HOME_BRAIN_ICON: Record<BrainType, IconDefinition> = {
  Head: faDiamond,
  Heart: faHeart,
  Gut: faSquare,
}

function sequenceBrainsForProfile (situation: FlowSituation, brainProfile: FlowsBrainProfile): BrainType[] {
  const variantId = profileToActiveId(brainProfile)
  const variant = situation.variants?.[variantId]
  const steps = variant?.steps ?? situation.sequence
  const brains = steps.map((s) => s.brain)
  return brains.length > 0 ? brains : DEFAULT_HEAD_HEART_GUT
}

function sequenceAriaLabel (brains: BrainType[]): string {
  if (brains.length === 0) return 'Sequence'
  return `Sequence: ${brains.join(', then ')}`
}

function FlowsHomeSequencePills ({ brains, variant }: { brains: BrainType[]; variant: 'quick' | 'sit' }) {
  const pillCls = variant === 'quick' ? 'flows-home__pill' : 'flows-home__sit-pill'
  const arrCls = variant === 'quick' ? 'flows-home__seq-arr' : 'flows-home__sit-arr'
  return (
    <>
      {brains.map((brain, index) => (
        <Fragment key={`${brain}-${index}`}>
          <span className={pillCls} style={{ background: BRAIN_PALETTE[brain].soft }}>
            <FontAwesomeIcon icon={FLOW_HOME_BRAIN_ICON[brain]} style={{ color: BRAIN_MUTED[brain] }} />
          </span>
          {index < brains.length - 1 ? (
            <span className={arrCls} aria-hidden>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          ) : null}
        </Fragment>
      ))}
    </>
  )
}

function greetingLine (): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function brainIcons ({ dominant, secondary, tertiary }: FlowsBrainProfile) {
  const order = tertiary
    ? (['Head', 'Heart', 'Gut'] as const)
    : secondary
      ? ([dominant, secondary] as const)
      : ([dominant] as const)

  const muted = {
    Head: '#2e6fa8',
    Heart: '#bb3a3a',
    Gut: '#3a8c57',
  } as const

  return order.map((brain) => {
    if (brain === 'Head') return { icon: faDiamond, color: muted.Head }
    if (brain === 'Heart') return { icon: faHeart, color: muted.Heart }
    return { icon: faSquare, color: muted.Gut }
  })
}

export const FlowsHome = ({
  onOpenMatchedFlow,
  onGoToRecommended,
  onPickContext,
  onTakeQuiz,
  lastOpened,
  recentOpens,
}: FlowsHomeProps) => {
  const quizSnap = useFlowsQuizSnapshot()
  const [quickCycleIndex, setQuickCycleIndex] = useState(0)

  const completedFlowsContextIds = getCompletedFlowsContextIdsForMatchedFlows()
  const completedContextsKey = completedFlowsContextIds.join(',')

  const matchedPreviews = useMemo(
    () =>
      quizSnap.hasCompletedQuiz && completedFlowsContextIds.length > 0
        ? getMatchedFlowPreviews(completedFlowsContextIds, 8)
        : [],
    [quizSnap.hasCompletedQuiz, completedContextsKey]
  )

  const matchedForCycle = useMemo(
    () =>
      quizSnap.hasCompletedQuiz && completedFlowsContextIds.length > 0
        ? getMatchedFlowPreviews(completedFlowsContextIds, 500)
        : [],
    [quizSnap.hasCompletedQuiz, completedContextsKey]
  )

  const recentOpensSig = useMemo(
    () =>
      JSON.stringify(
        recentOpens.map((r) => ({
          c: r.contextId,
          s: r.situationId,
          p: r.brainProfile ?? null,
        }))
      ),
    [recentOpens]
  )

  const lastOpenedSig = useMemo(
    () =>
      lastOpened == null
        ? ''
        : JSON.stringify({
            c: lastOpened.contextId,
            s: lastOpened.situationId,
            p: lastOpened.brainProfile ?? null,
          }),
    [lastOpened]
  )

  const quickCycleTargets = useMemo((): QuickCycleTarget[] => {
    if (!quizSnap.hasCompletedQuiz || lastOpened == null) return []

    const seen = new Set<string>()
    const out: QuickCycleTarget[] = []

    const add = (
      contextId: FlowContextId,
      situationId: string,
      phase: QuickCyclePhase,
      brainProfile?: FlowsBrainProfile
    ) => {
      if (!getSituation(contextId, situationId)) return
      const k = flowPairKey(contextId, situationId)
      if (seen.has(k)) return
      seen.add(k)
      out.push({ contextId, situationId, phase, ...(brainProfile ? { brainProfile } : {}) })
    }

    const recentMerged: LastOpenedFlow[] = []
    const rk = new Set<string>()
    const pushRecent = (r: LastOpenedFlow | null) => {
      if (!r || !getSituation(r.contextId, r.situationId)) return
      const k = flowPairKey(r.contextId, r.situationId)
      if (rk.has(k)) return
      rk.add(k)
      recentMerged.push(r)
    }
    pushRecent(lastOpened)
    for (const r of recentOpens) {
      if (recentMerged.length >= RECENT_CYCLE_MAX) break
      pushRecent(r)
    }
    const recentSlice = recentMerged.slice(0, RECENT_CYCLE_MAX)
    for (const r of recentSlice) add(r.contextId, r.situationId, 'recent', r.brainProfile)

    for (const m of matchedForCycle) add(m.contextId, m.situation.id, 'matched')

    const randomPool: { contextId: FlowContextId; situationId: string }[] = []
    for (const ctx of FLOW_CONTEXTS) {
      for (const sit of ctx.situations) {
        const k = flowPairKey(ctx.id, sit.id)
        if (seen.has(k)) continue
        randomPool.push({ contextId: ctx.id, situationId: sit.id })
      }
    }
    randomPool.sort((a, b) => flowPairKey(a.contextId, a.situationId).localeCompare(flowPairKey(b.contextId, b.situationId)))
    const seed = hashString(randomPool.map((t) => flowPairKey(t.contextId, t.situationId)).join('|'))
    for (const t of shuffleWithSeed(randomPool, seed)) add(t.contextId, t.situationId, 'random')

    return out
  }, [
    quizSnap.hasCompletedQuiz,
    lastOpenedSig,
    recentOpensSig,
    matchedForCycle,
  ])

  const lastSituation =
    lastOpened != null ? getSituation(lastOpened.contextId, lastOpened.situationId) : null

  const displayedQuick =
    quickCycleTargets.length > 0
      ? quickCycleTargets[quickCycleIndex % quickCycleTargets.length]
      : lastOpened != null &&
          lastSituation != null &&
          getSituation(lastOpened.contextId, lastOpened.situationId)
        ? {
            contextId: lastOpened.contextId,
            situationId: lastOpened.situationId,
            phase: 'recent' as const,
            brainProfile: lastOpened.brainProfile,
          }
        : null

  const displayedSituation =
    displayedQuick != null ? getSituation(displayedQuick.contextId, displayedQuick.situationId) : null
  const displayedContext =
    displayedQuick != null ? FLOW_CONTEXTS.find((c) => c.id === displayedQuick.contextId) : null
  const displayedBrainProfile =
    displayedQuick != null
      ? (displayedQuick.brainProfile ?? flowsBrainProfileForStoredContext(displayedQuick.contextId))
      : null

  const quickSequenceBrains = useMemo(() => {
    if (displayedSituation == null || displayedBrainProfile == null) return DEFAULT_HEAD_HEART_GUT
    return sequenceBrainsForProfile(displayedSituation, displayedBrainProfile)
  }, [displayedSituation, displayedBrainProfile])

  const showQuickCard =
    quizSnap.hasCompletedQuiz &&
    displayedQuick != null &&
    displayedSituation != null &&
    displayedContext != null &&
    displayedBrainProfile != null

  const advanceQuickCycle = () => {
    if (quickCycleTargets.length <= 1) return
    setQuickCycleIndex((i) => (i + 1) % quickCycleTargets.length)
  }

  useEffect(() => {
    setQuickCycleIndex(0)
  }, [lastOpened?.contextId, lastOpened?.situationId, lastOpenedSig, recentOpensSig])

  useEffect(() => {
    setQuickCycleIndex((i) => {
      if (quickCycleTargets.length === 0) return 0
      return Math.min(i, quickCycleTargets.length - 1)
    })
  }, [quickCycleTargets.length])

  const layoutMods = [
    'flows-home__layout',
    quizSnap.combo ? null : 'flows-home__layout--no-rail',
  ]
    .filter(Boolean)
    .join(' ')

  const brainStrip =
    quizSnap.hasCompletedQuiz && quizSnap.combo ? (
      <section className="flows-home__brain-strip" aria-label="Your brain type">
        <p className="flows-home__brain-label">Your brain type</p>
        <div className="flows-home__brain-row">
          <span className="flows-home__brain-badge">{quizSnap.combo.label}</span>
          {quizSnap.archetypeName ? (
            <span className="flows-home__brain-desc">{quizSnap.archetypeName}</span>
          ) : null}
        </div>
      </section>
    ) : null

  return (
    <div className="flows-home">
      <div className={layoutMods}>
        <div className="flows-home__intro">
          <header className="flows-home__hero">
            {quizSnap.hasCompletedQuiz ? (
              <>
                <h1 className="flows-home__greeting">{greetingLine()}</h1>
                <p className="flows-home__greeting-sub">What are you walking into today?</p>
              </>
            ) : (
              <>
                <h1 className="flows-home__greeting">Welcome to HHG Flows</h1>
                <p className="flows-home__greeting-sub">Find your sequence. Act with your wiring.</p>
              </>
            )}
          </header>

          {quizSnap.hasCompletedQuiz && showQuickCard && displayedContext && displayedSituation && displayedQuick ? (
            <div className="flows-home__quick-wrap">
              <section
                className={`flows-home__quick-card flows-home__quick-card--ctx-${displayedQuick.contextId}`}
                aria-label={
                  displayedQuick.phase === 'recent' && quickCycleIndex === 0
                    ? 'Continue last flow'
                    : 'Suggested flow'
                }
              >
                <div className="flows-home__quick-top">
                  <p className="flows-home__quick-label">
                    {quickEyebrow(displayedQuick.phase, displayedContext.title, quickCycleIndex)}
                  </p>
                  <div className="flows-home__quick-brain" aria-label={`Brain type for ${displayedContext.title}`}>
                    <span className="flows-home__quick-brain-icons" aria-hidden>
                      {brainIcons(displayedBrainProfile!).map(({ icon, color }, idx) => (
                        <FontAwesomeIcon key={`flows-quick-brain-icon-${idx}`} icon={icon} style={{ color }} />
                      ))}
                    </span>
                  </div>
                </div>
                <div className="flows-home__quick-body">
                  <div className="flows-home__quick-body-main">
                    <p className="flows-home__quick-title">{displayedSituation.cardTitle}</p>
                    <div className="flows-home__seq-pills" aria-label={sequenceAriaLabel(quickSequenceBrains)}>
                      <FlowsHomeSequencePills brains={quickSequenceBrains} variant="quick" />
                    </div>
                  </div>
                  <span
                    className="flows-home__quick-art"
                    style={{ background: CONTEXT_BACKGROUND[displayedQuick.contextId] }}
                    aria-hidden
                  >
                    <FlowSituationCardArt
                      contextId={displayedQuick.contextId}
                      situationId={displayedQuick.situationId}
                    />
                  </span>
                </div>
                <div className="flows-home__quick-actions">
                  <button
                    type="button"
                    className="flows-home__btn flows-home__btn--primary"
                    onClick={() =>
                      onOpenMatchedFlow(
                        displayedQuick.contextId,
                        displayedQuick.situationId,
                        displayedBrainProfile!
                      )
                    }
                  >
                    Open flow
                  </button>
                  <button type="button" className="flows-home__btn flows-home__btn--ghost" onClick={advanceQuickCycle}>
                    Not this
                  </button>
                </div>
              </section>
            </div>
          ) : null}

          {!quizSnap.hasCompletedQuiz ? (
            <section className="flows-home__start-card" aria-label="Take the quiz">
              <p className="flows-home__start-eyebrow">Start here</p>
              <h2 className="flows-home__start-title">Find your brain type to unlock personalised flows</h2>
              <p className="flows-home__start-body">
                A short quiz. No right or wrong answers. Your sequences reflect how you naturally think across
                contexts.
              </p>
              <button type="button" className="flows-home__start-cta" onClick={onTakeQuiz}>
                Take the quiz
              </button>
            </section>
          ) : null}
        </div>

        {brainStrip ? <aside className="flows-home__rail">{brainStrip}</aside> : null}

        <div className="flows-home__feed">
          <div className="flows-home__section-head">
            <h2 className="flows-home__section-title">
              {quizSnap.hasCompletedQuiz ? "What's happening now" : 'Browse all situations'}
            </h2>
          </div>

          <ul className="flows-home__moments" role="list">
            {FLOW_CONTEXTS.map((ctx) => {
              const tagline = CONTEXT_MOMENT_LINES[ctx.id]
              const countLabel = `${ctx.situations.length} situation${ctx.situations.length === 1 ? '' : 's'}`
              return (
                <li key={ctx.id} className="flows-home__moment">
                  <button
                    type="button"
                    className="flows-home__moment-btn"
                    onClick={() => onPickContext(ctx.id)}
                  >
                    <span
                      className="flows-home__moment-art"
                      style={{ background: CONTEXT_BACKGROUND[ctx.id] }}
                      aria-hidden
                    >
                      <ContextCardArt id={ctx.id} />
                    </span>
                    <span className="flows-home__moment-text">
                      <span className="flows-home__moment-title">{ctx.title}</span>
                      <span
                        className={`flows-home__moment-sub${quizSnap.hasCompletedQuiz ? '' : ' flows-home__moment-sub--dual'}`}
                      >
                        <span className="flows-home__moment-sub-primary">{tagline}</span>
                        {!quizSnap.hasCompletedQuiz ? (
                          <span className="flows-home__moment-sub-secondary">{countLabel}</span>
                        ) : null}
                      </span>
                    </span>
                    <FontAwesomeIcon icon={faChevronRight} className="flows-home__moment-chevron" />
                  </button>
                </li>
              )
            })}
          </ul>

          {quizSnap.hasCompletedQuiz ? (
            <>
              <hr className="flows-home__divider" />

              <div className="flows-home__section-head flows-home__section-head--row">
                <h2 className="flows-home__section-title">Matched to you</h2>
                <button type="button" className="flows-home__section-link" onClick={onGoToRecommended}>
                  See all
                </button>
              </div>

              {matchedPreviews.length > 0 ? (
                <div className="flows-home__cards-scroll" role="list">
                  {matchedPreviews.map(({ contextId, situation, featured }) => {
                    const ctx = FLOW_CONTEXTS.find((c) => c.id === contextId)
                    if (!ctx) return null
                    const matchedStripProfile = flowsBrainProfileForStoredContext(contextId)
                    const stripSequenceBrains = sequenceBrainsForProfile(situation, matchedStripProfile)
                    return (
                      <div key={`${contextId}-${situation.id}`} className="flows-home__cards-item" role="listitem">
                        <button
                          type="button"
                          className={`flows-home__sit-card flows-home__sit-card--ctx-${contextId}${featured ? ' flows-home__sit-card--featured' : ''}`}
                          onClick={() => onOpenMatchedFlow(contextId, situation.id)}
                        >
                          <span
                            className="flows-home__sit-thumb"
                            style={{ background: CONTEXT_BACKGROUND[contextId] }}
                            aria-hidden
                          >
                            <FlowSituationCardArt contextId={contextId} situationId={situation.id} />
                          </span>
                          <div className="flows-home__sit-card-body">
                            <div className="flows-home__sit-card-top">
                              <span className={`flows-home__sit-ctx flows-home__sit-ctx--${contextId}`}>
                                {ctx.title}
                              </span>
                              {featured ? (
                                <span className="flows-home__sit-star" aria-label="Featured">
                                  <FontAwesomeIcon icon={faStar} />
                                </span>
                              ) : null}
                            </div>
                            <span className="flows-home__sit-title">{situation.cardTitle}</span>
                            {situation.cardDescription ? (
                              <span className="flow-card__desc">{situation.cardDescription}</span>
                            ) : null}
                            <div className="flows-home__sit-seq" aria-label={sequenceAriaLabel(stripSequenceBrains)}>
                              <FlowsHomeSequencePills brains={stripSequenceBrains} variant="sit" />
                            </div>
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="flows-home__matched-empty">
                  Finish every question in a quiz context to see matched situations here. You can still open any flow
                  from Browse.
                </p>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
