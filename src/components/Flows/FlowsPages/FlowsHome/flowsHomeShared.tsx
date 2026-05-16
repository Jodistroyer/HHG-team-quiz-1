import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type ReactNode,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faDiamond,
  faHeart,
  faSquare,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { BRAIN_MUTED, BRAIN_PALETTE } from '../../flowsContexts'
import type { BrainType, FlowSituation } from '../../flowsData'
import type { FlowsBrainProfile } from '../../flowsTypes'
import { profileToActiveId } from '../FlowsDetail/BrainTypeSidebar'

export const DEFAULT_HEAD_HEART_GUT: BrainType[] = ['Head', 'Heart', 'Gut']

const QUICK_AUTO_CYCLE_MS = 4500

/** One leg of quick-card crossfade; keep in sync with `--flows-home-quick-cycle-fade` in FlowsHome.css */
export const QUICK_CYCLE_FADE_MS = 340

export function useQuickCardAutoCycle (
  length: number,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  options?: { resetToken?: string | number; intervalMs?: number }
) {
  const enabled = length > 1
  const intervalMs = options?.intervalMs ?? QUICK_AUTO_CYCLE_MS
  const resetToken = options?.resetToken
  const [cycleKey, setCycleKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current != null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const tick = useCallback(() => {
    if (!enabled) return
    setIndex((i) => (i + 1) % length)
    setCycleKey((k) => k + 1)
  }, [enabled, length, setIndex])

  const startTimer = useCallback(() => {
    clearTimer()
    if (!enabled || paused) return
    intervalRef.current = setInterval(tick, intervalMs)
  }, [clearTimer, enabled, intervalMs, paused, tick])

  const advanceManual = useCallback(() => {
    if (!enabled) return
    setIndex((i) => (i + 1) % length)
    setCycleKey((k) => k + 1)
    startTimer()
  }, [enabled, length, setIndex, startTimer])

  useEffect(() => {
    startTimer()
    return clearTimer
  }, [startTimer, clearTimer])

  useEffect(() => {
    if (paused) clearTimer()
    else startTimer()
  }, [paused, clearTimer, startTimer])

  useEffect(() => {
    setCycleKey(0)
    startTimer()
  }, [resetToken, startTimer])

  const pauseProps = enabled
    ? {
        onMouseEnter: () => setPaused(true),
        onMouseLeave: () => setPaused(false),
        onFocusCapture: () => setPaused(true),
        onBlurCapture: (e: FocusEvent<HTMLElement>) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setPaused(false)
          }
        },
      }
    : {}

  return { cycleKey, advanceManual, pauseProps, enabled }
}

function prefersReducedMotion (): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function FlowsHomeQuickCycleRegion ({
  cycleKey,
  children,
  className,
}: {
  cycleKey: number
  children: ReactNode
  className?: string
}) {
  const [shown, setShown] = useState(children)
  const [visible, setVisible] = useState(true)
  const prevCycleKey = useRef(cycleKey)
  /** While true, ignore children prop — shown updates only after fade-out (or reduced-motion swap). */
  const holdShownFromChildren = useRef(false)
  const childrenRef = useRef(children)
  childrenRef.current = children
  const fadeOutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fadeInRafRef = useRef<number | null>(null)
  const transitionGenRef = useRef(0)

  if (cycleKey !== prevCycleKey.current) {
    holdShownFromChildren.current = true
  }

  const clearFadeTimers = useCallback(() => {
    if (fadeOutTimerRef.current != null) {
      clearTimeout(fadeOutTimerRef.current)
      fadeOutTimerRef.current = null
    }
    if (fadeInRafRef.current != null) {
      cancelAnimationFrame(fadeInRafRef.current)
      fadeInRafRef.current = null
    }
  }, [])

  useEffect(() => {
    if (holdShownFromChildren.current) return
    setShown(children)
  }, [children])

  useEffect(() => {
    if (cycleKey === prevCycleKey.current) return
    prevCycleKey.current = cycleKey
    holdShownFromChildren.current = true
    const gen = ++transitionGenRef.current
    clearFadeTimers()

    if (prefersReducedMotion()) {
      setShown(childrenRef.current)
      setVisible(true)
      holdShownFromChildren.current = false
      return
    }

    setVisible(false)
    fadeOutTimerRef.current = setTimeout(() => {
      fadeOutTimerRef.current = null
      if (transitionGenRef.current !== gen) return
      setShown(childrenRef.current)
      fadeInRafRef.current = requestAnimationFrame(() => {
        fadeInRafRef.current = requestAnimationFrame(() => {
          fadeInRafRef.current = null
          if (transitionGenRef.current !== gen) return
          setVisible(true)
          holdShownFromChildren.current = false
        })
      })
    }, QUICK_CYCLE_FADE_MS)

    return clearFadeTimers
  }, [cycleKey, clearFadeTimers])

  const cls = [
    'flows-home__quick-cycle',
    visible ? '' : 'flows-home__quick-cycle--hidden',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={cls}>{shown}</div>
}

const FLOW_HOME_BRAIN_ICON: Record<BrainType, IconDefinition> = {
  Head: faDiamond,
  Heart: faHeart,
  Gut: faSquare,
}

export function sequenceBrainsForProfile (
  situation: FlowSituation,
  brainProfile: FlowsBrainProfile
): BrainType[] {
  const variantId = profileToActiveId(brainProfile)
  const variant = situation.variants?.[variantId]
  const steps = variant?.steps ?? situation.sequence
  const brains = steps.map((s) => s.brain)
  return brains.length > 0 ? brains : DEFAULT_HEAD_HEART_GUT
}

export function sequenceAriaLabel (brains: BrainType[]): string {
  if (brains.length === 0) return 'Sequence'
  return `Sequence: ${brains.join(', then ')}`
}

export function FlowsHomeSequencePills ({
  brains,
  variant,
}: {
  brains: BrainType[]
  variant: 'quick' | 'sit'
}) {
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

export function brainIcons ({ dominant, secondary, tertiary }: FlowsBrainProfile) {
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
