import type { ContextComboRow } from './changeResultsLogic'
import { contextComboLabelForSectionTitle } from './contextComboLabels'
import { sectionContextForTitle } from '../sectionContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faChartLine, faFire, faPeopleGroup, faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { ContextCardArt, contextIdForTitle } from '../ContextArt'
import '../SectionResults/SectionCard.css'
import './ChangeResults.css'

interface SectionForResume {
  id: number
  title: string
  questions: { id: string }[]
}

interface CombinationAcrossContextsProps {
  rows: ContextComboRow[]
  sections: SectionForResume[]
  /** Opens resume confirmation (parent owns modal + navigation). */
  onRequestResume?: (sectionId: number) => void
  showResumeButton?: boolean
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

export function CombinationAcrossContexts ({
  rows,
  sections,
  onRequestResume,
  showResumeButton = false,
}: CombinationAcrossContextsProps) {
  if (rows.length === 0) return null

  return (
    <div className="change-results-combo-block">
      <dl className="change-results-combo-list">
        {rows.map((row) => {
          const icon = contextIconForTitle(row.title)
          const contextLine = sectionContextForTitle(row.title)
          const sectionId = row.sectionId ?? sections.find((s) => s.title === row.title)?.id
          const canResume =
            row.incomplete &&
            showResumeButton &&
            typeof sectionId === 'number' &&
            typeof onRequestResume === 'function'

          const artId = contextIdForTitle(row.title)

          return (
            <div
              key={row.title}
              className={`change-results-combo-row${artId != null ? ' change-results-combo-row--with-art' : ''}`}
            >
              {artId != null && (
                <div className="change-results-row-art" aria-hidden="true">
                  <ContextCardArt id={artId} />
                </div>
              )}
              <dt className="change-results-combo-dt">
                <div className="change-results-context-heading">
                  {icon && (
                    <span className="change-results-context-icon" aria-hidden="true">
                      <FontAwesomeIcon icon={icon} />
                    </span>
                  )}
                  <span className="change-results-context-title">{row.title}</span>
                </div>
                {contextLine && (
                  <p className="section-card-contexts">{contextLine}</p>
                )}
              </dt>
              <dd className="change-results-combo-dd">
                <div className="change-results-combo-side">
                  {row.incomplete ? (
                    <>
                      <p className="change-results-incomplete-copy">
                        
                      </p>
                      {canResume && (
                        <button
                          type="button"
                          className="btn btn-secondary change-results-finish-context-btn"
                          onClick={() => onRequestResume(sectionId)}
                        >
                          {row.notInCurrentRun ? 'Add this context' : 'Finish this context'}
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="change-results-centres" aria-label={row.rawLabel}>
                        {row.centres.map((c) => {
                          const cfg = centreIcon(c)
                          return <FontAwesomeIcon key={c} icon={cfg.icon} className={cfg.className} />
                        })}
                      </div>
                      <span className="change-results-context-combo-label">
                        {contextComboLabelForSectionTitle(row.title, row.rawLabel)}
                      </span>
                    </>
                  )}
                </div>
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
