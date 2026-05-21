import type { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import './QuizIntroQuestionPreview.css'

const CONTROL_CENTERS: Array<{
  id: string
  label: string
  subtitle: string
  color: string
  icon: IconDefinition
}> = [
  { id: 'head', label: 'Head', subtitle: 'Logical', color: '#1368ce', icon: faDiamond },
  { id: 'heart', label: 'Heart', subtitle: 'Emotional', color: '#e21b3c', icon: faHeart },
  { id: 'gut', label: 'Gut', subtitle: 'Instinctual', color: '#26890c', icon: faSquare },
]

const SOURCE_URL =
  'https://www.researchgate.net/publication/283296213_Head_Heart_and_Gut_in_Decision_Making'

export function QuizIntroQuestionPreview () {
  return (
    <figure
      className="quiz-intro-control-centers"
      aria-labelledby="quiz-intro-control-centers-title"
    >
      <p className="quiz-intro-control-centers__source">
        Source:{' '}
        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="quiz-intro-control-centers__source-link"
        >
          ResearchGate – Head, Heart, and Gut in Decision Making
        </a>
      </p>

      <figcaption className="quiz-intro-control-centers__header">
        <p id="quiz-intro-control-centers-title" className="quiz-intro-control-centers__headline">
          These are our <strong>Control Centers</strong>.
        </p>
        <p className="quiz-intro-control-centers__tagline">They drive our actions.</p>
      </figcaption>

      <div className="quiz-intro-control-centers__grid" role="list">
        {CONTROL_CENTERS.map((center) => (
          <div
            key={center.id}
            className="quiz-intro-control-centers__item"
            role="listitem"
            style={{ '--center-color': center.color } as CSSProperties}
          >
            <div className="quiz-intro-control-centers__icon-wrap" aria-hidden="true">
              <FontAwesomeIcon icon={center.icon} className="quiz-intro-control-centers__icon" />
            </div>
            <div className="quiz-intro-control-centers__label">
              <span className="quiz-intro-control-centers__name">{center.label}</span>
              <span className="quiz-intro-control-centers__subtitle">({center.subtitle})</span>
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}
