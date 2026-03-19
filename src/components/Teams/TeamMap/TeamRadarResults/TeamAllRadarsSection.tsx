import { RadarChart } from './TeamRadarChart'
import { getBrainCombination } from '../../../Quiz/SectionResults/utils'
import './AllRadarsSection.css'

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

export const AllRadarsSection = ({ overall, sectionSummaries, sections }: AllRadarsSectionProps) => {
  const sectionItems = sections.map((section, idx) => ({
    title: section.title,
    scores: sectionSummaries[idx] ?? { headPercent: 0, heartPercent: 0, gutPercent: 0 }
  }))

  return (
    <section id="balance" className="all-radars-section" data-pdf-section="balance">
      <h3 className="all-radars-section-title">Your balance across all sections</h3>
      <div className="all-radars-overall">
        <div className="all-radars-card all-radars-card-overall">
          <h4 className="all-radars-card-title">Overall</h4>
          <RadarCardBadge headPercent={overall.headPercent} heartPercent={overall.heartPercent} gutPercent={overall.gutPercent} />
          <div className="all-radars-card-chart">
            <RadarChart
              headPercent={overall.headPercent}
              heartPercent={overall.heartPercent}
              gutPercent={overall.gutPercent}
            />
          </div>
        </div>
      </div>
      <div className="all-radars-grid all-radars-grid-sections">
        {sectionItems.map((item, i) => (
          <div key={i} className="all-radars-card">
            <h4 className="all-radars-card-title">{item.title}</h4>
            <RadarCardBadge headPercent={item.scores.headPercent} heartPercent={item.scores.heartPercent} gutPercent={item.scores.gutPercent} />
            <div className="all-radars-card-chart">
              <RadarChart
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
