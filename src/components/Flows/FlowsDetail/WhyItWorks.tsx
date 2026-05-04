import './WhyItWorks.css'

interface WhyItWorksProps {
  text: string
}

/**
 * Purple-accented callout below the step list explaining why the sequence is
 * ordered the way it is for this brain type. Real copy will be authored later.
 */
export const WhyItWorks = ({ text }: WhyItWorksProps) => {
  return (
    <aside className="why-it-works" aria-label="Why this order">
      <p className="why-it-works__title">Why this order works for you</p>
      <p className="why-it-works__body">{text}</p>
    </aside>
  )
}
