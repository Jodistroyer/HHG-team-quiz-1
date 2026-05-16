import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { BRAIN_PALETTE } from '../../flowsContexts'
import { OVERALL_ARCHETYPES } from '../../../Quiz/overallArchetypes'
import type { BrainType } from '../../flowsData'
import type { FlowsBrainProfile } from '../../flowsTypes'
import './BrainTypeHero.css'

const BRAIN_ICONS: Record<BrainType, IconDefinition> = {
  Head: faDiamond,
  Heart: faHeart,
  Gut: faSquare,
}

export type BrainTypeHeroTone = 'personalized' | 'catalog'

interface BrainTypeHeroProps {
  brainProfile: FlowsBrainProfile
  /** `catalog` = neutral library copy; `personalized` = quiz / Recommended flows framing. */
  tone?: BrainTypeHeroTone
  /** Replaces default body copy under the headline (e.g. per-context personalization note). */
  subOverride?: string
}

function brainComboLabel ({ dominant, secondary, tertiary }: FlowsBrainProfile): string {
  if (!secondary) return `${dominant} Strong`
  if (tertiary) return 'Head + Heart + Gut'
  return `${dominant} + ${secondary}`
}

export const BrainTypeHero = ({
  brainProfile,
  tone = 'personalized',
  subOverride,
}: BrainTypeHeroProps) => {
  const label = brainComboLabel(brainProfile)
  const archetype = OVERALL_ARCHETYPES[label]?.archetype ?? null

  const brains: BrainType[] = [
    brainProfile.dominant,
    ...(brainProfile.secondary ? [brainProfile.secondary] : []),
    ...(brainProfile.tertiary ? [brainProfile.tertiary] : []),
  ]

  const eyebrow =
    tone === 'catalog'
      ? 'Default sequence'
      : (archetype ?? 'Your brain type')

  const sub =
    subOverride ??
    (tone === 'catalog'
      ? 'Flows open on the Thinker (Head-strong) sequence by default. Use the brain-type sidebar in each flow to compare how the steps land for other leads.'
      : 'The flows below are sequenced for how you naturally lead. Open one to see the order tuned to your wiring.')

  const ariaLabel = tone === 'catalog' ? 'Default brain-type variant' : 'Your brain type'

  return (
    <section className="brain-type-hero" aria-label={ariaLabel}>
      <div className="brain-type-hero__text">
        <p className="brain-type-hero__eyebrow">{eyebrow}</p>
        <h2 className="brain-type-hero__name">{label}</h2>
        <p className="brain-type-hero__sub">{sub}</p>
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
