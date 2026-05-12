import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import { BRAIN_MUTED, BRAIN_MUTED_INK } from '../flowsContexts'
import type { FlowSequenceStep } from '../flowsData'
import './FlowSteps.css'

interface FlowStepsProps {
  steps: FlowSequenceStep[]
}

function brainIconFor (brain: FlowSequenceStep['brain']) {
  if (brain === 'Head') return faDiamond
  if (brain === 'Heart') return faHeart
  return faSquare
}

/** First sentence/clause mark; the bold span includes this char plus closing quotes right after it. */
const BODY_LEAD_PUNCT = /[.?!,;:\u2026]/

/** Quotes / guillemets that may immediately follow the lead punctuation (e.g. `word."`). */
const QUOTE_CLOSER = /["'\u201c\u201d\u2018\u2019«»]/

function splitBodyLeadingPhrase (text: string): { lead: string; rest: string } {
  const i = text.search(BODY_LEAD_PUNCT)
  if (i === -1) return { lead: text.trimEnd(), rest: '' }
  if (i === 0) return { lead: '', rest: text }
  let end = i + 1
  while (end < text.length && QUOTE_CLOSER.test(text[end])) {
    end++
  }
  const lead = text.slice(0, end).trimEnd()
  const rest = text.slice(end)
  if (!lead) return { lead: '', rest: text }
  return { lead, rest }
}

function FlowStepsBody ({ body }: { body: string }) {
  const { lead, rest } = splitBodyLeadingPhrase(body)
  if (!lead) {
    return <span className="flow-steps__body-rest">{body}</span>
  }
  return (
    <>
      <strong className="flow-steps__body-lead">{lead}</strong>
      {rest ? <span className="flow-steps__body-rest">{rest}</span> : null}
    </>
  )
}

/**
 * Vertical stack of “how to do it” steps, one per sequence step.
 * Each row uses the same brain badge treatment as the horizontal sequence
 * (large tinted icon + step number).
 */
export const FlowSteps = ({ steps }: FlowStepsProps) => {
  return (
    <div className="flow-steps">
      {steps.map((step, index) => {
        const accent = BRAIN_MUTED[step.brain]
        const titleInk = BRAIN_MUTED_INK[step.brain]
        return (
          <article
            key={`${step.brain}-${index}`}
            className="flow-steps__card"
            aria-label={`Step ${index + 1}, ${step.brain}: ${step.title}`}
            style={{ ['--seq-accent' as never]: accent }}
          >
            <div className="flow-steps__badge" aria-hidden>
              <span className="flow-steps__num">
                <span className="flow-steps__num-icon">
                  <FontAwesomeIcon icon={brainIconFor(step.brain)} />
                </span>
                <span className="flow-steps__num-text">{index + 1}</span>
              </span>
            </div>
            <div className="flow-steps__main">
              <h4 className="flow-steps__title" style={{ color: titleInk }}>
                {step.title}
              </h4>
              <p className="flow-steps__body">
                <FlowStepsBody body={step.body} />
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
