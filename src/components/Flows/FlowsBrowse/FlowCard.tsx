import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons'
import { CONTEXT_BACKGROUND } from '../../Quiz/ContextArt'
import { FlowSituationCardArt } from '../FlowSituationCardArt'
import type { FlowContextId, FlowSituation } from '../flowsData'
import { FLOW_CONTEXT_META } from '../flowsContexts'
import './FlowCard.css'

interface FlowCardProps {
  contextId: FlowContextId
  contextTitle: string
  situation: FlowSituation
  onClick: () => void
}

/**
 * Single flow situation as a clickable card.
 * Layout: edge-to-edge SVG thumbnail on top, padded body below. The thumbnail
 * background is per-context (warm/cool/pink/green) so the four contexts read
 * distinctly while the body still sits on the white surface used elsewhere.
 */
export const FlowCard = ({ contextId, contextTitle, situation, onClick }: FlowCardProps) => {
  const thumbBg = CONTEXT_BACKGROUND[contextId]

  return (
    <button type="button" className="flow-card" onClick={onClick}>
      <span
        className="flow-card__thumb"
        style={{ background: thumbBg }}
        aria-hidden
      >
        <FlowSituationCardArt contextId={contextId} situationId={situation.id} />
      </span>
      <span className="flow-card__body">
        <span className="flow-card__context">
          <span className="flow-card__context-icon" aria-hidden>
            <FontAwesomeIcon icon={FLOW_CONTEXT_META[contextId].icon} />
          </span>
          {contextTitle}
        </span>
        <span className="flow-card__title">{situation.cardTitle}</span>
        {situation.cardDescription ? (
          <span className="flow-card__desc">{situation.cardDescription}</span>
        ) : null}
        <span className="flow-card__meta">

          <span className="flow-card__meta-minutes">
            <span className="flow-card__meta-icon" aria-hidden>
              <FontAwesomeIcon icon={faClock} />
            </span>
            {situation.readMinutes} min
          </span>
        </span>
        <span className="flow-card__arrow" aria-hidden>
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </span>
    </button>
  )
}
