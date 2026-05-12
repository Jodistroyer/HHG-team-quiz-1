import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './WhyItWorks.css'

interface WhyItWorksProps {
  text: string
}

/**
 * Purple-accented callout explaining why the sequence fits this brain type.
 */
export const WhyItWorks = ({ text }: WhyItWorksProps) => {
  return (
    <aside className="why-it-works" aria-labelledby="why-it-works-heading">
      <div className="why-it-works__icon-wrap" aria-hidden>
        <FontAwesomeIcon icon={faStar} className="why-it-works__icon" />
      </div>
      {/* <h3 id="why-it-works-heading" className="why-it-works__title">
        Why this order works for you
      </h3> */}
      <p className="why-it-works__body">{text}</p>
    </aside>
  )
}
