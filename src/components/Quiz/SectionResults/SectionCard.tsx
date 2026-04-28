import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UnderPressure } from './Sections/UnderPressure'
import { DoingWork } from './Sections/DoingWork'
import { WithPeople } from './Sections/WithPeople'
import { GettingBetter } from './Sections/GettingBetter'
import { SECTION_ICONS } from './utils.tsx'
import { SECTION_CONTEXT_BY_ID } from '../sectionContext'
import { ContextCardArt, type QuizSelectedContextId } from '../ContextArt'
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
  return (
    <div id={sectionSlug} className="section-card expanded" data-pdf-section={sectionSlug}>
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
    </div>
  )
}
