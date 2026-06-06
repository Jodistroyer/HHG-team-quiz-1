import type { CSSProperties } from 'react'
import type { SituationalContextKey } from '../../../Quiz/ChangeResults/contextComboLabels'
import { ChangeResultsComboCell } from '../../../Quiz/ChangeResults/ChangeResultsComboCell'
import { archetypeNameForCombo } from '../../../Quiz/overallArchetypes'
import { SITUATIONAL_CONTEXT_NAV_ID, SITUATIONAL_CONTEXT_TITLE } from '../../../Quiz/sectionNavIds'
import { CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import { getBrainIcons } from '../../../Quiz/SectionResults/utils.tsx'
import '../../../Brains/Brains.css'
import '../../../Quiz/SectionResults/SectionResults.css'

const CONTEXT_SECTION_ID: Record<SituationalContextKey, 1 | 2 | 3 | 4> = {
  underPressure: 1,
  doingWork: 2,
  withPeople: 3,
  gettingBetter: 4,
}

interface TeamContextInsightHeadlineProps {
  contextKey: SituationalContextKey
  combo: { label: string; colors: string[] }
  insightTitleId: string
  insightTitle: string
}

export function TeamContextInsightHeadline ({
  contextKey,
  combo,
  insightTitleId,
  insightTitle,
}: TeamContextInsightHeadlineProps) {
  const sectionId = CONTEXT_SECTION_ID[contextKey]
  const traitHeaderStyle = {
    '--section-context-color': CONTEXT_BACKGROUND[sectionId],
  } as CSSProperties

  return (
    <div className="team-context-insight__headline-block">
      <div className="trait-section-row team-context-insight__trait-section-row">
        <ChangeResultsComboCell
          comboLabel={combo.label}
          scrollTargetId={SITUATIONAL_CONTEXT_NAV_ID[contextKey]}
          scrollTargetLabel={SITUATIONAL_CONTEXT_TITLE[contextKey]}
          hideArchetypeLabel
        />
        <div
          className="trait-section-header team-context-insight__trait-header"
          style={traitHeaderStyle}
        >
          <div className="trait-section-title-row">
            <span className="brains-page__toc-archetype">{archetypeNameForCombo(combo.label)}</span>
            <span className="brain-icon-badge brain-icon-badge--inline" aria-label="Team brain combination icons">
              {getBrainIcons(combo.label)}
            </span>
          </div>
        </div>
      </div>
      <h4
        id={insightTitleId}
        className="team-context-insight__title team-map-results__context-card-insight-title"
      >
        {insightTitle}
      </h4>
    </div>
  )
}
