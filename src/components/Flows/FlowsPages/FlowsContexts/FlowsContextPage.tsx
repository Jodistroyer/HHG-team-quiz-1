import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FlowCard } from '../../FlowsShared/FlowCard'
import { getContextById, type FlowContextId } from '../../flowsData'
import { FLOW_CONTEXT_META } from '../../flowsContexts'
import { CONTEXT_BACKGROUND, ContextCardArt } from '../../../Quiz/ContextArt'
import './FlowsContextPage.css'

export interface FlowsContextPageProps {
  contextId: FlowContextId
  onOpenSituation: (contextId: FlowContextId, situationId: string) => void
}

export const FlowsContextPage = ({ contextId, onOpenSituation }: FlowsContextPageProps) => {
  const context = getContextById(contextId)
  if (!context) return null

  const accent = CONTEXT_BACKGROUND[contextId]
  const meta = FLOW_CONTEXT_META[contextId]

  return (
    <div className="flows-context">
      <header
        className="flows-context__header"
        style={{ ['--section-context-color' as never]: accent }}
      >
        <div className="flows-context__art" aria-hidden>
          <ContextCardArt id={contextId} />
        </div>
        <div className="flows-context__header-body">
          <h1 className="flows-context__title">
            <span className="flows-context__title-icon" aria-hidden>
              <FontAwesomeIcon icon={meta.icon} />
            </span>
            {context.title}
          </h1>
          <p className="flows-context__line">{context.contextLine}</p>
        </div>
      </header>

      <div className="flows-context__grid">
        {context.situations.map((sit) => (
          <FlowCard
            key={sit.id}
            contextId={context.id}
            contextTitle={context.title}
            situation={sit}
            onClick={() => onOpenSituation(context.id, sit.id)}
          />
        ))}
      </div>
    </div>
  )
}
