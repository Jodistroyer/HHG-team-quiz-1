import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import { BrainTypeSidebar } from './BrainTypeSidebar'
import { FlowSequence } from './FlowSequence'
import { FlowSteps } from './FlowSteps'
import { WhyItWorks } from './WhyItWorks'
import { getContextById, getSituation, type FlowContextId } from '../flowsData'
import { FLOW_CONTEXT_META } from '../flowsContexts'
import { ContextCardArt, CONTEXT_BACKGROUND } from '../../Quiz/ContextArt'
import type { FlowsBrainProfile } from '../Flows'
import './FlowsDetail.css'

interface FlowsDetailProps {
  brainProfile: FlowsBrainProfile
  contextId: FlowContextId
  situationId: string
  onBack: () => void
}

function brainComboLabel ({ dominant, secondary }: FlowsBrainProfile): string {
  if (!secondary) return `${dominant} Strong`
  return `${dominant} + ${secondary}`
}

function brainIcons ({ dominant, secondary, tertiary }: FlowsBrainProfile) {
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

function brainComboBadgeBackground (profile: FlowsBrainProfile): string {
  const muted = {
    Head: '#2e6fa8',
    Heart: '#bb3a3a',
    Gut: '#3a8c57',
  } as const

  const parts = profile.tertiary
    ? (['Head', 'Heart', 'Gut'] as const)
    : profile.secondary
      ? ([profile.dominant, profile.secondary] as const)
      : ([profile.dominant] as const)

  const colors = parts.map((p) => muted[p])
  if (colors.length === 1) return colors[0]
  if (colors.length === 2) {
    // Match quiz `brain-combo-badge` exactly.
    return `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%)`
  }
  return `linear-gradient(90deg, ${colors[0]} 33.33%, ${colors[1]} 33.33%, ${colors[1]} 66.66%, ${colors[2]} 66.66%)`
}

function archetypeLabel ({ dominant, secondary, tertiary }: FlowsBrainProfile): string {
  if (tertiary) return 'Sovereign'
  if (!secondary) {
    if (dominant === 'Head') return 'Thinker'
    if (dominant === 'Heart') return 'Empath'
    return 'Doer'
  }

  const combo = `${dominant}-${secondary}`.toLowerCase()
  if (combo === 'head-gut') return 'Tactician'
  if (combo === 'head-heart') return 'Diplomat'
  if (combo === 'heart-gut') return 'Defender'
  if (combo === 'heart-head') return 'Advisor'
  if (combo === 'gut-head') return 'Engineer'
  if (combo === 'gut-heart') return 'Hero'

  return 'Sovereign'
}

export const FlowsDetail = ({
  brainProfile,
  contextId,
  situationId,
  onBack,
}: FlowsDetailProps) => {
  const context = getContextById(contextId)
  const situation = getSituation(contextId, situationId) ?? context?.situations[0]

  if (!context || !situation) return null

  const brainLabel = brainComboLabel(brainProfile)
  const archetype = archetypeLabel(brainProfile)
  const archetypeIcons = brainIcons(brainProfile)
  const brainBadgeBackground = brainComboBadgeBackground(brainProfile)

  return (
    <div className="flows-detail">
      <button type="button" className="flows-detail__back" onClick={onBack}>
        <FontAwesomeIcon icon={faArrowLeft} className="flows-detail__back-icon" aria-hidden />
        Back to Flows
      </button>

      <div className="flows-detail__shell">
        <div className="flows-detail__main">
          <div className="flows-detail__top-bar">
            <div className="flows-detail__top-bar-header">
              <div
                className="flows-detail__top-bar-art"
                style={{ background: CONTEXT_BACKGROUND[contextId] }}
                aria-hidden
              >
                <ContextCardArt id={contextId} />
              </div>

              <div className="flows-detail__top-bar-text">
                <p className="flows-detail__context-heading">
                  <span className="flows-detail__context-heading-icon" aria-hidden>
                    <FontAwesomeIcon icon={FLOW_CONTEXT_META[contextId].icon} />
                  </span>
                  {context.title}
                </p>
                <h2 className="flows-detail__page-title">{situation.cardTitle}</h2>
              </div>

              <div className="flows-detail__top-bar-right">
                <span className="flows-detail__archetype flows-detail__archetype--right">
                  <span className="flows-detail__archetype-icons" aria-hidden>
                    {archetypeIcons.map(({ icon, color }, idx) => (
                      <FontAwesomeIcon key={`${archetype}-right-${idx}`} icon={icon} style={{ color }} />
                    ))}
                  </span>
                  {archetype}
                </span>
                <span className="flows-detail__brain-badge" style={{ background: brainBadgeBackground }}>
                  {brainLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flows-detail__body">
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

        <BrainTypeSidebar brainProfile={brainProfile} />
      </div>
    </div>
  )
}
