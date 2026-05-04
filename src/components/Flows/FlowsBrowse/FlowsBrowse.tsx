import { useEffect, type CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrainTypeHero } from './BrainTypeHero'
import { FlowCard } from './FlowCard'
import { FLOW_CONTEXTS, type FlowContextId } from '../flowsData'
import { FLOW_CONTEXT_META } from '../flowsContexts'
import { ContextArtThumb, CONTEXT_BACKGROUND, type QuizSelectedContextId } from '../../Quiz/ContextArt'
import type { FlowsBrainProfile } from '../Flows'
import './FlowsBrowse.css'

interface FlowsBrowseProps {
  brainProfile: FlowsBrainProfile
  onOpenSituation: (contextId: FlowContextId, situationId: string) => void
  /** When set, the corresponding context section scrolls into view on mount. */
  scrollToContextId?: FlowContextId | null
}

export function flowsBrowseSectionId (contextId: FlowContextId): string {
  return `flows-context-${contextId}`
}

export const FlowsBrowse = ({
  brainProfile,
  onOpenSituation,
  scrollToContextId,
}: FlowsBrowseProps) => {
  useEffect(() => {
    if (!scrollToContextId) return
    const target = document.getElementById(flowsBrowseSectionId(scrollToContextId))
    if (!target) return
    // Defer one frame so layout (gradient hero, art SVGs) settles before we scroll.
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [scrollToContextId])

  return (
    <div className="flows-browse">
      <header className="flows-browse__header">
        <h1 className="flows-browse__title">Flows</h1>
        <p className="flows-browse__intro">
          Step-by-step sequences for the situations that matter, tuned to how
          your Head, Heart, and Gut work together.
        </p>
      </header>

      <BrainTypeHero brainProfile={brainProfile} />

      <div className="flows-browse__sections">
        {FLOW_CONTEXTS.map((ctx) => {
          const meta = FLOW_CONTEXT_META[ctx.id]
          const sectionStyle = {
            '--section-context-color': CONTEXT_BACKGROUND[ctx.id as QuizSelectedContextId],
          } as CSSProperties
          return (
            <section
              key={ctx.id}
              id={flowsBrowseSectionId(ctx.id)}
              className="flows-browse__section"
              style={sectionStyle}
            >
              <div className="flows-browse__section-header">
                <ContextArtThumb id={ctx.id} size="md" />
                <div className="flows-browse__section-text">
                  <h2 className="flows-browse__section-title">
                    <span className="flows-browse__section-title-icon" aria-hidden>
                      <FontAwesomeIcon icon={meta.icon} />
                    </span>
                    {ctx.title}
                  </h2>
                  <p className="flows-browse__section-line">{ctx.contextLine}</p>
                </div>
              </div>

              <div className="flows-browse__grid">
                {ctx.situations.map((sit) => (
                  <FlowCard
                    key={sit.id}
                    contextId={ctx.id}
                    contextTitle={ctx.title}
                    situation={sit}
                    onClick={() => onOpenSituation(ctx.id, sit.id)}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
