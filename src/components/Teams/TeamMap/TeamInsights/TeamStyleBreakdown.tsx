import type { ReactNode } from 'react'
import { getBrainLevelLabel } from '../../../Quiz/SectionResults/utils.tsx'
import './TeamStyleBreakdown.css'

interface TeamStyleBreakdownProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
  comboIcons?: ReactNode
}

const BREAKDOWN_ROWS = [
  {
    key: 'heart',
    label: 'Heart',
    percent: (p: TeamStyleBreakdownProps) => p.heartPercent,
    fillClass: 'team-style-breakdown__bar-fill--heart',
    percentClass: 'team-style-breakdown__percent--heart',
  },
  {
    key: 'head',
    label: 'Head',
    percent: (p: TeamStyleBreakdownProps) => p.headPercent,
    fillClass: 'team-style-breakdown__bar-fill--head',
    percentClass: 'team-style-breakdown__percent--head',
  },
  {
    key: 'gut',
    label: 'Gut',
    percent: (p: TeamStyleBreakdownProps) => p.gutPercent,
    fillClass: 'team-style-breakdown__bar-fill--gut',
    percentClass: 'team-style-breakdown__percent--gut',
  },
] as const

export function TeamStyleBreakdown ({ comboIcons, ...props }: TeamStyleBreakdownProps) {
  return (
    <section className="team-style-breakdown" aria-label="Team style breakdown">
      {comboIcons ? <div className="team-style-breakdown__header">{comboIcons}</div> : null}
      <div className="team-style-breakdown__grid">
        {BREAKDOWN_ROWS.map((row) => {
          const value = row.percent(props)
          const displayPercent = Math.round(value)
          const level = getBrainLevelLabel(displayPercent)
          const barWidth = Math.max(0, Math.min(100, value))

          return (
            <div key={row.key} className="team-style-breakdown__box">
              <div className="team-style-breakdown__box-head">
                <span className="team-style-breakdown__brain">{row.label}</span>
                <span className={`team-style-breakdown__percent ${row.percentClass}`}>
                  {displayPercent}%
                </span>
              </div>
              <span
                className={`team-style-breakdown__level team-style-breakdown__level--${level.toLowerCase()}`}
              >
                {level}
              </span>
              <div
                className="team-style-breakdown__track"
                role="img"
                aria-label={`${row.label} ${level}, ${displayPercent} percent`}
              >
                <div
                  className={`team-style-breakdown__bar-fill ${row.fillClass}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
