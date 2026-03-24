import type { CSSProperties } from 'react'
import type { ContextComboRow } from './changeResultsLogic'
import '../SectionResults/SectionCard.css'
import './ChangeResults.css'

interface CombinationAcrossContextsProps {
  rows: ContextComboRow[]
}

function comboBadgeStyle(colors: string[]): CSSProperties {
  if (colors.length === 1) return { background: colors[0]! }
  if (colors.length === 2) {
    return { background: `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%)` }
  }
  return {
    background: `linear-gradient(90deg, ${colors[0]} 33.33%, ${colors[1]} 33.33%, ${colors[1]} 66.66%, ${colors[2]} 66.66%)`,
  }
}

export function CombinationAcrossContexts({ rows }: CombinationAcrossContextsProps) {
  if (rows.length === 0) return null

  return (
    <div className="change-results-combo-block">
      <h4 className="change-results-subtitle">Your combination across contexts</h4>
      <dl className="change-results-combo-list">
        {rows.map((row) => (
          <div key={row.title} className="change-results-combo-row">
            <dt>{row.title}</dt>
            <dd className="change-results-combo-dd">
              <div className="change-results-combo-badge-host">
                <div className="section-card-badges change-results-combo-badges">
                  <div className="brain-combo-badge" style={comboBadgeStyle(row.colors)}>
                    {row.rawLabel}
                  </div>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
