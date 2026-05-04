import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FLOW_CONTEXTS, type FlowContextId } from '../flowsData'
import { FLOW_CONTEXT_META } from '../flowsContexts'
import './ContextSidebar.css'

interface ContextSidebarProps {
  activeContextId: FlowContextId
  onSwitchContext: (contextId: FlowContextId) => void
}

export const ContextSidebar = ({ activeContextId, onSwitchContext }: ContextSidebarProps) => {
  return (
    <aside className="context-sidebar" aria-label="Flow contexts">
      <p className="context-sidebar__label">Context</p>
      <div className="context-sidebar__list">
        {FLOW_CONTEXTS.map((ctx) => {
          const meta = FLOW_CONTEXT_META[ctx.id]
          const isActive = ctx.id === activeContextId
          return (
            <button
              key={ctx.id}
              type="button"
              className={`context-sidebar__item ${isActive ? 'context-sidebar__item--active' : ''}`}
              onClick={() => onSwitchContext(ctx.id)}
            >
              <span
                className="context-sidebar__icon"
                style={{ background: meta.accentSoft, color: meta.accent }}
                aria-hidden
              >
                <FontAwesomeIcon icon={meta.icon} />
              </span>
              <span className="context-sidebar__title">{ctx.title}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
