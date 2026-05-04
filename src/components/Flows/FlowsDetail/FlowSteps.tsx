import { BRAIN_PALETTE } from '../flowsContexts'
import type { FlowSequenceStep } from '../flowsData'
import './FlowSteps.css'

interface FlowStepsProps {
  steps: FlowSequenceStep[]
}

/**
 * Vertical stack of "what to do" insight cards, one per sequence step.
 * Each card carries a colored side strip in the brain's palette so the
 * Head/Heart/Gut order is reinforced visually.
 */
export const FlowSteps = ({ steps }: FlowStepsProps) => {
  return (
    <div className="flow-steps">
      {steps.map((step, index) => {
        const palette = BRAIN_PALETTE[step.brain]
        return (
          <article
            key={`${step.brain}-${index}`}
            className="flow-steps__card"
            style={{ borderLeftColor: palette.color }}
          >
            <p className="flow-steps__meta">
              Step {index + 1} · <span style={{ color: palette.color }}>{step.brain}</span>
            </p>
            <h4 className="flow-steps__title">{step.title}</h4>
            <p className="flow-steps__body">{step.body}</p>
          </article>
        )
      })}
    </div>
  )
}
