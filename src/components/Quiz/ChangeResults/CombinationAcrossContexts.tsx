import type { CSSProperties } from 'react'
import type { ContextComboRow } from './changeResultsLogic'
import { ChangeResultsComboCell } from './ChangeResultsComboCell'
import { sectionContextForTitle } from '../sectionContext'
import { CONTEXT_BACKGROUND, ContextCardArt, contextIdForTitle } from '../ContextArt'
import { sectionNavIdForTitle } from '../sectionNavIds'
import { scrollToSection } from '../Sidebar/Navigation/NavSection'
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
          const contextLine = sectionContextForTitle(row.title)
          const sectionId = row.sectionId ?? sections.find((s) => s.title === row.title)?.id
          const canResume =
            row.incomplete &&
            showResumeButton &&
            typeof sectionId === 'number' &&
            typeof onRequestResume === 'function'

          const artId = contextIdForTitle(row.title)
          const sectionNavId = sectionNavIdForTitle(row.title)
          // Cascades to .change-results-row-art + .change-results-context-title via var(--section-context-color).
          const rowStyle: CSSProperties | undefined =
            artId != null
              ? ({ '--section-context-color': CONTEXT_BACKGROUND[artId] } as CSSProperties)
              : undefined

          return (
            <div
              key={row.title}
              className={`change-results-combo-row${artId != null ? ' change-results-combo-row--with-art' : ''}`}
              style={rowStyle}
            >
              {artId != null && sectionNavId != null && (
                <button
                  type="button"
                  className="change-results-row-art"
                  aria-label={`Go to ${row.title}`}
                  onClick={() => scrollToSection(sectionNavId)}
                >
                  <ContextCardArt id={artId} />
                </button>
              )}
              <dt className="change-results-combo-dt">
                <div className="change-results-context-heading">
                  <span className="change-results-context-title">{row.title}</span>
                </div>
                {contextLine && (
                  <p className="section-card-contexts">{contextLine}</p>
                )}
              </dt>
              <ChangeResultsComboCell
                comboLabel={row.rawLabel}
                scrollTargetId={sectionNavId}
                scrollTargetLabel={row.title}
                incomplete={row.incomplete}
                incompleteContent={
                  row.incomplete ? (
                    <>
                      <p className="change-results-incomplete-copy" />
                      {canResume && (
                        <button
                          type="button"
                          className={`btn change-results-finish-context-btn${
                            row.notInCurrentRun
                              ? ' change-results-finish-context-btn--add'
                              : ' btn-secondary'
                          }`}
                          onClick={() => onRequestResume(sectionId)}
                        >
                          {row.notInCurrentRun ? 'Add this context' : 'Finish this context'}
                        </button>
                      )}
                    </>
                  ) : undefined
                }
              />
            </div>
          )
        })}
      </dl>
    </div>
  )
}
