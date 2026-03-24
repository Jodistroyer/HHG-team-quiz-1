import type { Insight } from './changeResultsLogic'
import './ChangeResults.css'

interface WhatStandsOutProps {
  insights: Insight[]
}

export function WhatStandsOut({ insights }: WhatStandsOutProps) {
  if (insights.length === 0) return null

  return (
    <div className="change-results-insights-block">
      <h4 className="change-results-subtitle">What stands out</h4>
      <ul className="change-results-insight-list">
        {insights.map((item) => (
          <li key={`${item.headline}-${item.body}`} className="change-results-insight-item">
            <span className="change-results-insight-headline">{item.headline}</span>
            <span className="change-results-insight-body">{item.body}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
