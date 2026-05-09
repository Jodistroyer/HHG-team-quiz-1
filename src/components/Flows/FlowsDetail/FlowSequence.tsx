import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import { BRAIN_PALETTE } from '../flowsContexts'
import type { FlowSequenceStep } from '../flowsData'
import './FlowSequence.css'

interface FlowSequenceProps {
  steps: FlowSequenceStep[]
}

/**
 * Numbered horizontal sequence: e.g. (1 Head) → (2 Heart) → (3 Gut).
 * Step number circle is tinted using the brain's palette.
 */
export const FlowSequence = ({ steps }: FlowSequenceProps) => {
  return (
    <div className="flow-sequence" aria-label="Sequence overview">
      {steps.map((step, index) => {
        const palette = BRAIN_PALETTE[step.brain]
        const brainIcon =
          step.brain === 'Head' ? faDiamond : step.brain === 'Heart' ? faHeart : faSquare
        return (
          <Fragment key={`${step.brain}-${index}`}>
            <div className="flow-sequence__step">
              <span
                className="flow-sequence__num"
                  style={{ ['--seq-accent' as never]: palette.color }}
              >
                <span className="flow-sequence__num-icon" aria-hidden>
                  <FontAwesomeIcon icon={brainIcon} />
                </span>
                <span className="flow-sequence__num-text">{index + 1}</span>
              </span>
                <span className="flow-sequence__brain" style={{ color: palette.color }}>
                  {step.brain}
                </span>
              <span className="flow-sequence__sub">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <span className="flow-sequence__arrow" aria-hidden>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
