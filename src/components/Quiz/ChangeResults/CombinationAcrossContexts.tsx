import type { CSSProperties } from 'react'
import type { ContextComboRow } from './changeResultsLogic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faChartLine, faFire, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
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

function contextIconForTitle(title: string): IconDefinition | null {
  switch (title.trim().toLowerCase()) {
    case 'under pressure':
      return faFire
    case 'doing work':
      return faBriefcase
    case 'with people':
      return faPeopleGroup
    case 'getting better':
      return faChartLine
    default:
      return null
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
            <dt>
              {contextIconForTitle(row.title) && (
                <span className="change-results-context-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={contextIconForTitle(row.title)!} />
                </span>
              )}
              <span className="change-results-context-title">{row.title}</span>
            </dt>
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
