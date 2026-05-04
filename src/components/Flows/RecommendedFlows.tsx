import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faDiagramProject } from '@fortawesome/free-solid-svg-icons'
import { FlowCard } from './FlowsBrowse/FlowCard'
import { getContextById, type FlowContextId } from './flowsData'
import { requestOpenFlow, requestOpenFlowsContext } from './flowsNavigation'
import './RecommendedFlows.css'

interface RecommendedFlowsProps {
  contextId: FlowContextId
  /** Optional title override (default: "Recommended Flows"). */
  heading?: string
  /**
   * How many situations to render in the scroller before the "See more" tile.
   * Defaults to all available situations for the context.
   */
  limit?: number
}

/**
 * Horizontal scroller of flow cards rendered under each Quiz Result section.
 * - Cards open the flow's detail view in the Flows tab.
 * - Trailing "See more" tile opens the Flows browse view, scrolled to that
 *   context's section.
 */
export const RecommendedFlows = ({
  contextId,
  heading = 'Recommended Flows',
  limit,
}: RecommendedFlowsProps) => {
  const context = getContextById(contextId)
  if (!context || context.situations.length === 0) return null

  const situations =
    typeof limit === 'number' ? context.situations.slice(0, limit) : context.situations

  return (
    <section className="recommended-flows" aria-label={heading}>
      <header className="recommended-flows__header">
        <span className="recommended-flows__icon" aria-hidden>
          <FontAwesomeIcon icon={faDiagramProject} />
        </span>
        <h4 className="recommended-flows__title">{heading}</h4>
      </header>

      <div className="recommended-flows__scroller" role="list">
        {situations.map((sit) => (
          <div className="recommended-flows__item" role="listitem" key={sit.id}>
            <FlowCard
              contextId={context.id}
              contextTitle={context.title}
              situation={sit}
              onClick={() => requestOpenFlow({ contextId: context.id, situationId: sit.id })}
            />
          </div>
        ))}

        <div className="recommended-flows__item recommended-flows__item--more" role="listitem">
          <button
            type="button"
            className="recommended-flows__see-more"
            onClick={() => requestOpenFlowsContext(context.id)}
          >
            <span className="recommended-flows__see-more-label">See more</span>
            <span className="recommended-flows__see-more-sub">
              All {context.title} flows
            </span>
            <span className="recommended-flows__see-more-arrow" aria-hidden>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
