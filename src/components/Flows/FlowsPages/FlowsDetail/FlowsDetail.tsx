import { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {
  BrainTypeSidebar,
  brainProfileFromActiveId,
  profileToActiveId,
  type BrainTypeSidebarItemId,
} from './BrainTypeSidebar'
import { FlowSteps } from './FlowSteps'
import { WhyItWorks } from './WhyItWorks'
import { FlowSituationCardArt } from '../../FlowsShared/FlowSituationCardArt'
import { CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import { getContextById, getSituation, type FlowContextId } from '../../flowsData'
import { FLOW_CONTEXT_META } from '../../flowsContexts'
import type { FlowsBrainProfile } from '../../flowsTypes'
import './FlowsDetail.css'

function comboLabelForId (id: BrainTypeSidebarItemId): string {
  if (id === 'balanced') return 'Head + Heart + Gut'
  if (id === 'head-strong') return 'Head Strong'
  if (id === 'heart-strong') return 'Heart Strong'
  if (id === 'gut-strong') return 'Gut Strong'
  if (id === 'head-gut') return 'Head + Gut'
  if (id === 'head-heart') return 'Head + Heart'
  if (id === 'heart-gut') return 'Heart + Gut'
  if (id === 'heart-head') return 'Heart + Head'
  if (id === 'gut-head') return 'Gut + Head'
  return 'Gut + Heart'
}

interface FlowsDetailProps {
  brainProfile: FlowsBrainProfile
  contextId: FlowContextId
  situationId: string
  onBack: () => void
  /** When user picks another archetype in the sidebar (Thinker, Diplomat, …). */
  onBrainVariantChange?: (profile: FlowsBrainProfile) => void
}

export const FlowsDetail = ({
  brainProfile,
  contextId,
  situationId,
  onBack,
  onBrainVariantChange,
}: FlowsDetailProps) => {
  const context = getContextById(contextId)
  const situation = getSituation(contextId, situationId) ?? context?.situations[0]

  if (!context || !situation) return null

  const [selectedBrainId, setSelectedBrainId] = useState<BrainTypeSidebarItemId>(() =>
    profileToActiveId(brainProfile)
  )

  const selectedVariant = situation.variants?.[selectedBrainId]

  const steps = selectedVariant?.steps ?? situation.sequence
  const whyText = selectedVariant?.whyThisOrder ?? situation.whyText
  const sequenceSteps = useMemo(() => {
    if (!selectedVariant) return steps
    const parts = selectedVariant.coreFunctions
      .split('→')
      .map((p) => p.trim())
      .filter(Boolean)
    if (parts.length === 0) return steps
    return steps.map((step, idx) => ({
      ...step,
      label: parts[idx] ?? step.label,
    }))
  }, [selectedVariant, steps])

  return (
    <div className="flows-detail">
      <nav className="flows-detail__breadcrumb" aria-label="Breadcrumb">
        <button
          type="button"
          className="flows-detail__mobile-back flows-detail__crumb--link"
          onClick={onBack}
          aria-label={`Back to ${context.title}`}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="flows-detail__back-icon" aria-hidden />
          <span className="flows-detail__crumb-back-label">{context.title}</span>
        </button>

        <button
          type="button"
          className="flows-detail__crumb flows-detail__crumb--context flows-detail__crumb--link"
          onClick={onBack}
          aria-label={`Back to ${context.title}`}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="flows-detail__back-icon" aria-hidden />
          <span className="flows-detail__crumb-icon" aria-hidden>
            <FontAwesomeIcon icon={FLOW_CONTEXT_META[contextId].icon} />
          </span>
          <span className="flows-detail__crumb-label">{context.title}</span>
        </button>

        <h2
          className="flows-detail__crumb flows-detail__crumb--current"
          aria-current="page"
          style={{ ['--section-context-color' as never]: CONTEXT_BACKGROUND[contextId] }}
        >
          <span className="flows-detail__crumb-art" aria-hidden>
            <FlowSituationCardArt contextId={contextId} situationId={situation.id} />
          </span>
          {situation.cardTitle}
        </h2>
      </nav>

      <div className="flows-detail__shell">
        <div className="flows-detail__main">
          <div className="flows-detail__body">
            {/* <section className="flows-detail__section flows-detail__section--sequence">
              <FlowSequence steps={sequenceSteps} />
            </section> */}

            <section className="flows-detail__section flows-detail__section--why-order">
              <WhyItWorks text={whyText} archetypeKey={comboLabelForId(selectedBrainId)} />
            </section>

            <section className="flows-detail__section flows-detail__section--what-to-do" aria-label="How to do it">
              <FlowSteps
                steps={sequenceSteps}
                contextId={contextId}
                situationId={situation.id}
                variantId={selectedBrainId}
              />
            </section>
          </div>
        </div>

        <BrainTypeSidebar
          activeId={selectedBrainId}
          onSelect={(id) => {
            setSelectedBrainId(id)
            onBrainVariantChange?.(brainProfileFromActiveId(id))
          }}
        />
      </div>
    </div>
  )
}
