import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { BRAIN_PALETTE } from '../flowsContexts'
import { OVERALL_ARCHETYPES } from '../../Quiz/overallArchetypes'
import type { BrainType } from '../flowsData'
import type { FlowsBrainProfile } from '../Flows'
import './BrainTypeHero.css'

const BRAIN_ICONS: Record<BrainType, IconDefinition> = {
  Head: faDiamond,
  Heart: faHeart,
  Gut: faSquare,
}

interface BrainTypeHeroProps {
  brainProfile: FlowsBrainProfile
}

/**
 * Resolves a `FlowsBrainProfile` to the same key used by `OVERALL_ARCHETYPES`
 * in QuizResults so we can reuse the archetype label (e.g. "Diplomat").
 */
function brainComboLabel ({ dominant, secondary, tertiary }: FlowsBrainProfile): string {
  if (!secondary) return `${dominant} Strong`
  if (tertiary) return 'Head + Heart + Gut'
  return `${dominant} + ${secondary}`
}

export const BrainTypeHero = ({ brainProfile }: BrainTypeHeroProps) => {
  const label = brainComboLabel(brainProfile)
  const archetype = OVERALL_ARCHETYPES[label]?.archetype ?? null

  const brains: BrainType[] = [
    brainProfile.dominant,
    ...(brainProfile.secondary ? [brainProfile.secondary] : []),
    ...(brainProfile.tertiary ? [brainProfile.tertiary] : []),
  ]

  return (
    <section className="brain-type-hero" aria-label="Your brain type">
      <div className="brain-type-hero__text">
        <p className="brain-type-hero__eyebrow">{archetype ?? 'Your brain type'}</p>
        <h2 className="brain-type-hero__name">{label}</h2>
        <p className="brain-type-hero__sub">
          The flows below are sequenced for how you naturally lead. Open one to
          see the order tuned to your wiring.
        </p>
      </div>
      <div className="brain-type-hero__icons" aria-hidden>
        {brains.map((b) => (
          <span
            key={b}
            className="brain-type-hero__icon"
            style={{ color: BRAIN_PALETTE[b].color, background: '#ffffff' }}
            title={b}
          >
            <FontAwesomeIcon icon={BRAIN_ICONS[b]} />
          </span>
        ))}
      </div>
    </section>
  )
}
