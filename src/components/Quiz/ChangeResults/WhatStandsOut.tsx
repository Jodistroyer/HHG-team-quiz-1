import type { Insight } from './changeResultsLogic'
import { insightRichText } from './insightRichText'
import './ChangeResults.css'

interface WhatStandsOutProps {
  insights: Insight[]
}

export function WhatStandsOut({ insights }: WhatStandsOutProps) {
  if (insights.length === 0) return null

  return (
    <div className="change-results-insights-block">
      <h3 className="results-section-title">What stands out</h3>
      <ul className="change-results-insight-list">
        {insights.map((item) => (
          <li key={`${item.headline}-${item.body}`} className="change-results-insight-item">
            <span className="change-results-insight-headline">{insightRichText(item.headline)}</span>
            <span className="change-results-insight-body">{insightRichText(item.body)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
