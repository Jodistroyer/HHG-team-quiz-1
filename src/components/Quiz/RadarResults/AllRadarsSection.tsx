import type { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { TreemapChart } from '../TreemapResults/TreemapChart'
import { SECTION_ICONS, getBrainCombination } from '../SectionResults/utils'
import { CONTEXT_BACKGROUND, type QuizSelectedContextId } from '../ContextArt'
import './AllRadarsSection.css'

function radarCardStyle (sectionId?: number): CSSProperties | undefined {
  if (sectionId === 1 || sectionId === 2 || sectionId === 3 || sectionId === 4) {
    const color = CONTEXT_BACKGROUND[sectionId as QuizSelectedContextId]
    return { '--section-context-color': color } as CSSProperties
  }
  return undefined
}

interface SectionScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

interface Section {
  id: number
  title: string
}

interface AllRadarsSectionProps {
  overall: SectionScores
  sectionSummaries: SectionScores[]
  sections: Section[]
}

function RadarCardTitle ({ title, sectionId }: { title: string; sectionId?: number }) {
  const icon = sectionId === undefined ? faChartPie : SECTION_ICONS[sectionId]
  return (
    <h4 className="all-radars-card-title">
      {icon && (
        <span className="all-radars-card-title__icon" aria-hidden="true">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <span className="all-radars-card-title__text">{title}</span>
    </h4>
  )
}

function RadarCardBadge({ headPercent, heartPercent, gutPercent }: SectionScores) {
  const combo = getBrainCombination(headPercent, heartPercent, gutPercent)
  const badgeStyle =
    combo.colors.length === 1
      ? { background: combo.colors[0] }
      : combo.colors.length === 2
        ? { background: `linear-gradient(90deg, ${combo.colors[0]} 50%, ${combo.colors[1]} 50%)` }
        : { background: `linear-gradient(90deg, ${combo.colors[0]} 33.33%, ${combo.colors[1]} 33.33%, ${combo.colors[1]} 66.66%, ${combo.colors[2]} 66.66%)` }
  return (
    <div className="all-radars-card-badges">
      <div className="all-radars-brain-combo-badge" style={badgeStyle}>
        {combo.label}
      </div>
    </div>
  )
}

function RadarCardDivider() {
  return <div className="all-radars-card-divider" role="separator" aria-hidden="true" />
}

export const AllRadarsSection = ({ overall, sectionSummaries, sections }: AllRadarsSectionProps) => {
  const sectionItems = sections.map((section, idx) => ({
    id: section.id,
    title: section.title,
    scores: sectionSummaries[idx] ?? { headPercent: 0, heartPercent: 0, gutPercent: 0 }
  }))

  return (
    <section id="balance" className="all-radars-section" data-pdf-section="balance">
      <h3 className="all-radars-section-title">Your balance across all sections</h3>
      <div className="all-radars-overall">
        <div className="all-radars-card all-radars-card-overall">
          <RadarCardTitle title="Overall" />
          <RadarCardBadge headPercent={overall.headPercent} heartPercent={overall.heartPercent} gutPercent={overall.gutPercent} />
          <RadarCardDivider />
          <div className="all-radars-card-chart">
            <TreemapChart
              headPercent={overall.headPercent}
              heartPercent={overall.heartPercent}
              gutPercent={overall.gutPercent}
            />
          </div>
        </div>
      </div>
      <div className="all-radars-grid all-radars-grid-sections">
        {sectionItems.map((item, i) => (
          <div key={i} className="all-radars-card" style={radarCardStyle(item.id)}>
            <RadarCardTitle title={item.title} sectionId={item.id} />
            <RadarCardBadge headPercent={item.scores.headPercent} heartPercent={item.scores.heartPercent} gutPercent={item.scores.gutPercent} />
            <RadarCardDivider />
            <div className="all-radars-card-chart">
              <TreemapChart
                headPercent={item.scores.headPercent}
                heartPercent={item.scores.heartPercent}
                gutPercent={item.scores.gutPercent}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
