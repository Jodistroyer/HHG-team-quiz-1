import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UnderPressure } from './UnderPressure/UnderPressure'
import { DoingWork } from './DoingWork/DoingWork'
import { WithPeople } from './WithPeople/WithPeople'
import { GettingBetter } from './GettingBetter/GettingBetter'
import { SECTION_ICONS, getBrainCombination, getBrainIcons } from './utils.tsx'
import { SECTION_CONTEXT_BY_ID } from '../sectionContext'
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
  const combo = getBrainCombination(scores.headPercent, scores.heartPercent, scores.gutPercent)
  const badgeStyle =
    combo.colors.length === 1
      ? { background: combo.colors[0] }
      : combo.colors.length === 2
        ? { background: `linear-gradient(90deg, ${combo.colors[0]} 50%, ${combo.colors[1]} 50%)` }
        : { background: `linear-gradient(90deg, ${combo.colors[0]} 33.33%, ${combo.colors[1]} 33.33%, ${combo.colors[1]} 66.66%, ${combo.colors[2]} 66.66%)` }

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
        <div className="section-card-badges">
          <div className="brain-icon-badge" style={{ background: 'transparent' }}>
            {getBrainIcons(combo.label)}
          </div>
          <div className="brain-combo-badge" style={badgeStyle}>
            {combo.label}
          </div>
        </div>
      </div>
      {renderContent()}
    </div>
  )
}
