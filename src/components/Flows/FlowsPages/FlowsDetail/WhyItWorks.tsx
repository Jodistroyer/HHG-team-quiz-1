import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './WhyItWorks.css'

interface WhyItWorksProps {
  text: string
}

function splitWhyLead (text: string): { lead: string | null; body: string } {
  const i = text.indexOf(':')
  if (i === -1) return { lead: null, body: text.trim() }
  const lead = text.slice(0, i + 1).trim()
  const body = text.slice(i + 1).trim()
  if (!lead) return { lead: null, body: text.trim() }
  return { lead, body }
}

/**
 * Purple-accented callout explaining why the sequence fits this brain type.
 */
export const WhyItWorks = ({ text }: WhyItWorksProps) => {
  const { lead, body } = splitWhyLead(text)

  return (
    <aside className="why-it-works" aria-labelledby="why-it-works-heading">
      <div className="why-it-works__icon-wrap" aria-hidden>
        <FontAwesomeIcon icon={faStar} className="why-it-works__icon" />
      </div>
      {lead ? (
        <div className="why-it-works__main">
          <p id="why-it-works-heading" className="why-it-works__lead">
            {lead}
          </p>
          {body ? <p className="why-it-works__body">{body}</p> : null}
        </div>
      ) : (
        <p id="why-it-works-heading" className="why-it-works__body why-it-works__body--solo">
          {body}
        </p>
      )}
    </aside>
  )
}
