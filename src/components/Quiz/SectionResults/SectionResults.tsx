import { SectionCard } from './SectionCard'
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

interface SectionResultsProps {
  sections: Section[]
  sectionSummaries: SectionScores[]
}

export const SectionResults = ({ sections, sectionSummaries }: SectionResultsProps) => {
  return (
    <div className="section-breakdown-cards">
      <div className="section-cards">
        {sections.map((section, idx) => (
          <SectionCard
            key={section.id}
            section={section}
            scores={sectionSummaries[idx] ?? { headPercent: 0, heartPercent: 0, gutPercent: 0 }}
          />
        ))}
      </div>
    </div>
  )
}
