import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { ContextCardArt } from '../../Quiz/ContextArt'
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
 * Layout: edge-to-edge purple SVG thumbnail on top, padded body below.
 * The thumbnail reuses the same `ContextCardArt` SVG used on Quiz section
 * headers and the Flows browse view, so the whole product reads as one piece.
 */
export const FlowCard = ({ contextId, contextTitle, situation, onClick }: FlowCardProps) => {
  const stepCount = situation.sequence.length

  return (
    <button type="button" className="flow-card" onClick={onClick}>
      <span className="flow-card__thumb" aria-hidden>
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
