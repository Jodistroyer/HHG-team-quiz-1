import type { CSSProperties } from 'react'
import { contextComboLabel, type SituationalContextKey } from '../../../Quiz/ChangeResults/contextComboLabels'
import { CONTEXT_BACKGROUND } from '../../../Quiz/ContextArt'
import { getBrainIcons } from '../../../Quiz/SectionResults/utils.tsx'
import '../../../Quiz/SectionResults/SectionResults.css'

const CONTEXT_SECTION_ID: Record<SituationalContextKey, 1 | 2 | 3 | 4> = {
  underPressure: 1,
  doingWork: 2,
  withPeople: 3,
  gettingBetter: 4,
}

function brainComboBadgeStyle (combo: { colors: string[] }): CSSProperties {
  const { colors } = combo
  if (colors.length === 1) return { background: colors[0] }
  if (colors.length === 2) {
    return { background: `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%)` }
  }
  return {
    background: `linear-gradient(90deg, ${colors[0]} 33.33%, ${colors[1]} 33.33%, ${colors[1]} 66.66%, ${colors[2]} 66.66%)`,
  }
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
      <div
        className="trait-section-header team-context-insight__trait-header"
        style={traitHeaderStyle}
      >
        <div className="trait-section-title-row">
          <h4 className="trait-section-title">{contextComboLabel(contextKey, combo.label)}</h4>
          <span className="brain-icon-badge brain-icon-badge--inline" aria-label="Team brain combination icons">
            {getBrainIcons(combo.label)}
          </span>
        </div>
        <div className="trait-section-badges">
          <span className="brain-combo-badge" style={brainComboBadgeStyle(combo)}>
            {combo.label}
          </span>
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
