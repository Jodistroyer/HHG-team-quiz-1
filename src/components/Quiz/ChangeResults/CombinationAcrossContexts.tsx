import type { ContextComboRow } from './changeResultsLogic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faChartLine, faFire, faPeopleGroup, faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import '../SectionResults/SectionCard.css'
import './ChangeResults.css'

interface CombinationAcrossContextsProps {
  rows: ContextComboRow[]
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

function centreIcon(centre: ContextComboRow['centres'][number]): { icon: IconDefinition; className: string } {
  switch (centre) {
    case 'Head':
      return { icon: faDiamond, className: 'change-results-centre-icon change-results-centre-icon--head' }
    case 'Heart':
      return { icon: faHeart, className: 'change-results-centre-icon change-results-centre-icon--heart' }
    case 'Gut':
      return { icon: faSquare, className: 'change-results-centre-icon change-results-centre-icon--gut' }
  }
}

export function CombinationAcrossContexts({ rows }: CombinationAcrossContextsProps) {
  if (rows.length === 0) return null

  return (
    <div className="change-results-combo-block">
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
              {/* Brain combo badges (rawLabel) intentionally hidden — show centres as icons instead. */}
              <div className="change-results-centres" aria-label={row.rawLabel}>
                {row.centres.map((c) => {
                  const cfg = centreIcon(c)
                  return <FontAwesomeIcon key={c} icon={cfg.icon} className={cfg.className} />
                })}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
