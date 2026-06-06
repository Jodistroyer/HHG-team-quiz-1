import type { ReactNode } from 'react'
import { NaturalDefaultArchetypePartArt } from '../naturalDefaultArchetypeArt'
import { archetypeNameForCombo } from '../overallArchetypes'
import { scrollToSection } from '../Sidebar/Navigation/NavSection'
import '../../Brains/Brains.css'
import '../NaturalDefaultArchetypeParts.css'
import './ChangeResults.css'

interface ChangeResultsComboCellProps {
  comboLabel?: string
  incomplete?: boolean
  incompleteContent?: ReactNode
  className?: string
  /** Results section element id to scroll to on click (e.g. under-pressure). */
  scrollTargetId?: string
  scrollTargetLabel?: string
  /** Hide archetype text under the vibe art (trait rows show the label separately). */
  hideArchetypeLabel?: boolean
}

export function ChangeResultsComboCell ({
  comboLabel = '',
  incomplete = false,
  incompleteContent,
  className,
  scrollTargetId,
  scrollTargetLabel,
  hideArchetypeLabel = false,
}: ChangeResultsComboCellProps) {
  const shellClass = ['brains-page__toc-cell', className].filter(Boolean).join(' ')

  if (incomplete) {
    return (
      <div className={shellClass}>
        <div className="change-results-combo-cell--incomplete">{incompleteContent}</div>
      </div>
    )
  }

  const displayTitle = archetypeNameForCombo(comboLabel)
  const linkLabel = scrollTargetLabel
    ? `Go to ${scrollTargetLabel}, ${comboLabel}, ${displayTitle}`
    : `${comboLabel}, ${displayTitle}`

  const linkContent = (
    <>
      <div className="archetype-part__art" aria-hidden="true">
        <NaturalDefaultArchetypePartArt archetypeKey={comboLabel} variant="vibe" />
      </div>
      {!hideArchetypeLabel && (
        <span className="brains-page__toc-archetype">{displayTitle}</span>
      )}
    </>
  )

  const linkClassName = [
    'brains-page__toc-link',
    hideArchetypeLabel ? 'brains-page__toc-link--art-only' : null,
    scrollTargetId ? null : 'brains-page__toc-link--static',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={shellClass}>
      {scrollTargetId ? (
        <button
          type="button"
          className={linkClassName}
          aria-label={linkLabel}
          title={`${comboLabel} — ${displayTitle}`}
          onClick={() => scrollToSection(scrollTargetId)}
        >
          {linkContent}
        </button>
      ) : (
        <div
          className={linkClassName}
          aria-label={linkLabel}
          title={`${comboLabel} — ${displayTitle}`}
        >
          {linkContent}
        </div>
      )}
    </div>
  )
}
