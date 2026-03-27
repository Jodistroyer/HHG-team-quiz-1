import { buildFacts, computeInsights } from './changeResultsLogic'
import { CombinationAcrossContexts } from './CombinationAcrossContexts'
import { WhatStandsOut } from './WhatStandsOut'
import './ChangeResults.css'

interface SectionScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

interface SectionTitle {
  id: number
  title: string
}

interface ChangeResultsProps {
  sectionSummaries: SectionScores[]
  sections: SectionTitle[]
}

export function ChangeResults({ sectionSummaries, sections }: ChangeResultsProps) {
  const titles = sections.slice(0, 4).map((s) => s.title)
  const facts = buildFacts(sectionSummaries, titles)
  const insights = computeInsights(facts)

  if (facts.rows.length === 0) return null

  return (
    <div className="change-results-card">
      <CombinationAcrossContexts rows={facts.rows} />
      <WhatStandsOut insights={insights} />
    </div>
  )
}
