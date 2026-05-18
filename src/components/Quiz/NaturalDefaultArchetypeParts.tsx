import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import ReactMarkdown from 'react-markdown'
import type { ArchetypeParts } from './overallArchetypes'
import { NaturalDefaultArchetypePartArt } from './naturalDefaultArchetypeArt'
import './NaturalDefaultArchetypeParts.css'

interface NaturalDefaultArchetypePartsProps {
  archetypeKey: string
  parts: ArchetypeParts
}

function ArchetypePartBlock ({
  label,
  part,
  variant,
  archetypeKey,
}: {
  label: string
  part: ArchetypeParts['vibe']
  variant: 'vibe' | 'challenge' | 'question'
  archetypeKey: string
}) {
  const isQuestion = variant === 'question'
  const showArt = variant === 'vibe' || variant === 'challenge'

  return (
    <section className={`archetype-part archetype-part--${variant}`}>
      {isQuestion ? (
        <span className="archetype-part__icon" aria-label={label} role="img">
          <FontAwesomeIcon icon={faQuestionCircle} aria-hidden />
        </span>
      ) : (
        <p className="archetype-part__label">{label}</p>
      )}
      {showArt ? (
        <div className="archetype-part__art" aria-hidden>
          <NaturalDefaultArchetypePartArt archetypeKey={archetypeKey} variant={variant} />
        </div>
      ) : null}
      {isQuestion ? (
        <blockquote className="archetype-part__quote">{part.headline}</blockquote>
      ) : (
        <h4 className="archetype-part__headline">{part.headline}</h4>
      )}
      {part.body ? (
        <div className="archetype-part__body">
          <ReactMarkdown>{part.body}</ReactMarkdown>
        </div>
      ) : null}
    </section>
  )
}

export function NaturalDefaultArchetypeParts ({ archetypeKey, parts }: NaturalDefaultArchetypePartsProps) {
  return (
    <div
      className="archetype-parts overall-archetype-description quiz-results__natural-default-description"
      aria-label="Your natural default breakdown"
    >
      <div className="archetype-parts__pair">
        <ArchetypePartBlock label="vibe" part={parts.vibe} variant="vibe" archetypeKey={archetypeKey} />
        <ArchetypePartBlock label="challenges" part={parts.challenge} variant="challenge" archetypeKey={archetypeKey} />
      </div>
      <ArchetypePartBlock label="question" part={parts.question} variant="question" archetypeKey={archetypeKey} />
    </div>
  )
}
