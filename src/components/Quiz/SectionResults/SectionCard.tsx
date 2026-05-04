import type { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UnderPressure } from './Sections/UnderPressure'
import { DoingWork } from './Sections/DoingWork'
import { WithPeople } from './Sections/WithPeople'
import { GettingBetter } from './Sections/GettingBetter'
import { SECTION_ICONS } from './utils.tsx'
import { SECTION_CONTEXT_BY_ID } from '../sectionContext'
import { CONTEXT_BACKGROUND, ContextCardArt, type QuizSelectedContextId } from '../ContextArt'
import { RecommendedFlows } from '../../Flows/RecommendedFlows'
import type { FlowContextId } from '../../Flows/flowsData'
import './SectionCard.css'

interface Section {
  id: number
  title: string
}

interface SectionScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

interface SectionCardProps {
  section: Section
  scores: SectionScores
}

export const SectionCard = ({ section, scores }: SectionCardProps) => {
  const renderContent = () => {
    switch (section.id) {
      case 1:
        return (
          <div className="section-expanded-content">
            <UnderPressure headPercent={scores.headPercent} heartPercent={scores.heartPercent} gutPercent={scores.gutPercent} />
          </div>
        )
      case 2:
        return (
          <div className="section-expanded-content">
            <DoingWork headPercent={scores.headPercent} heartPercent={scores.heartPercent} gutPercent={scores.gutPercent} />
          </div>
        )
      case 3:
        return (
          <div className="section-expanded-content">
            <WithPeople headPercent={scores.headPercent} heartPercent={scores.heartPercent} gutPercent={scores.gutPercent} />
          </div>
        )
      case 4:
        return (
          <div className="section-expanded-content">
            <GettingBetter headPercent={scores.headPercent} heartPercent={scores.heartPercent} gutPercent={scores.gutPercent} />
          </div>
        )
      default:
        return null
    }
  }

  const sectionSlug = section.title.toLowerCase().replace(/\s+/g, '-')
  const isFlowContext = section.id === 1 || section.id === 2 || section.id === 3 || section.id === 4
  const sectionBg = CONTEXT_BACKGROUND[section.id as QuizSelectedContextId]
  // Cascades to .section-card-top / .section-card-art / .profile-table__toggle
  // / .profile-table-title / .trait-section-title etc. inside this card.
  const sectionStyle = { '--section-context-color': sectionBg } as CSSProperties
  return (
    <div
      id={sectionSlug}
      className="section-card expanded"
      data-pdf-section={sectionSlug}
      style={sectionStyle}
    >
      <div className="section-card-top">
        <div className="section-card-top__text">
          <div className="section-card-header">
            <div className="section-header-content">
              {SECTION_ICONS[section.id] && (
                <span className="section-title-icon" aria-hidden="true">
                  <FontAwesomeIcon icon={SECTION_ICONS[section.id]} />
                </span>
              )}
              <h4>{section.title}</h4>
            </div>
          </div>
          {SECTION_CONTEXT_BY_ID[section.id] && (
            <p className="section-card-context">{SECTION_CONTEXT_BY_ID[section.id]}</p>
          )}
        </div>
        <div className="section-card-art" aria-hidden="true">
          <ContextCardArt id={section.id as QuizSelectedContextId} />
        </div>
      </div>
      {renderContent()}
      {isFlowContext && (
        <RecommendedFlows contextId={section.id as FlowContextId} />
      )}
    </div>
  )
}
