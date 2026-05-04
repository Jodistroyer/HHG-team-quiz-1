import { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
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
        return (
          <Fragment key={`${step.brain}-${index}`}>
            <div className="flow-sequence__step">
              <span
                className="flow-sequence__num"
                style={{ background: palette.soft, color: palette.ink }}
              >
                {index + 1}
              </span>
              <span className="flow-sequence__brain">{step.brain}</span>
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
