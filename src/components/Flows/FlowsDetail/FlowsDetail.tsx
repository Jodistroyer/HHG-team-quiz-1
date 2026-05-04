import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { ContextSidebar } from './ContextSidebar'
import { SituationTabs } from './SituationTabs'
import { FlowSequence } from './FlowSequence'
import { FlowSteps } from './FlowSteps'
import { WhyItWorks } from './WhyItWorks'
import { getContextById, getSituation, type FlowContextId } from '../flowsData'
import type { FlowsBrainProfile } from '../Flows'
import './FlowsDetail.css'

interface FlowsDetailProps {
  brainProfile: FlowsBrainProfile
  contextId: FlowContextId
  situationId: string
  onBack: () => void
  onSwitchContext: (contextId: FlowContextId) => void
  onSwitchSituation: (situationId: string) => void
}

function brainComboLabel ({ dominant, secondary }: FlowsBrainProfile): string {
  if (!secondary) return `${dominant} Strong`
  return `${dominant} + ${secondary}`
}

export const FlowsDetail = ({
  brainProfile,
  contextId,
  situationId,
  onBack,
  onSwitchContext,
  onSwitchSituation,
}: FlowsDetailProps) => {
  const context = getContextById(contextId)
  const situation = getSituation(contextId, situationId) ?? context?.situations[0]

  if (!context || !situation) return null

  const brainLabel = brainComboLabel(brainProfile)

  return (
    <div className="flows-detail">
      <button type="button" className="flows-detail__back" onClick={onBack}>
        <FontAwesomeIcon icon={faArrowLeft} className="flows-detail__back-icon" aria-hidden />
        Back to Flows
      </button>

      <div className="flows-detail__shell">
        <ContextSidebar activeContextId={contextId} onSwitchContext={onSwitchContext} />

        <div className="flows-detail__main">
          <div className="flows-detail__top-bar">
            <p className="flows-detail__context-heading">{context.title}</p>
            <h2 className="flows-detail__page-title">{context.pageTitle}</h2>
            <SituationTabs
              situations={context.situations}
              activeSituationId={situation.id}
              onSwitchSituation={onSwitchSituation}
            />
          </div>

          <div className="flows-detail__body">
            <div className="flows-detail__brain">
              <p className="flows-detail__brain-label">Your brain type</p>
              <span className="flows-detail__brain-badge">
                <span className="flows-detail__brain-glyph" aria-hidden>✦</span>
                {brainLabel}
              </span>
            </div>

            <section className="flows-detail__section">
              <h3 className="flows-detail__section-title">
                Your sequence for this situation
              </h3>
              <FlowSequence steps={situation.sequence} />
            </section>

            <section className="flows-detail__section">
              <h3 className="flows-detail__section-title">What to do</h3>
              <FlowSteps steps={situation.sequence} />
            </section>

            <WhyItWorks text={situation.whyText} />
          </div>
        </div>
      </div>
    </div>
  )
}
