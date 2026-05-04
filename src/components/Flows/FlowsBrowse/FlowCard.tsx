import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { CONTEXT_BACKGROUND, ContextCardArt } from '../../Quiz/ContextArt'
import type { FlowContextId, FlowSituation } from '../flowsData'
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
  const stepCount = situation.sequence.length
  const thumbBg = CONTEXT_BACKGROUND[contextId]

  return (
    <button type="button" className="flow-card" onClick={onClick}>
      <span
        className="flow-card__thumb"
        style={{ background: thumbBg }}
        aria-hidden
      >
        <ContextCardArt id={contextId} />
      </span>
      <span className="flow-card__body">
        <span className="flow-card__context">{contextTitle}</span>
        <span className="flow-card__title">{situation.cardTitle}</span>
        <span className="flow-card__meta">
          {stepCount}-step sequence · {situation.readMinutes} min read
        </span>
        <span className="flow-card__arrow" aria-hidden>
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </span>
    </button>
  )
}
