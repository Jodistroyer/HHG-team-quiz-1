import { RadarChart } from './RadarChart'
import './OverallRadar.css'

interface OverallRadarProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
  balanceLabel?: string
}

export const OverallRadar = ({ headPercent, heartPercent, gutPercent, balanceLabel = 'Your balance' }: OverallRadarProps) => {
  return (
    <>
      <h3 className="overall-breakdown-label">{balanceLabel}</h3>
      <div className="radar-chart-container">
        <RadarChart
          headPercent={headPercent}
          heartPercent={heartPercent}
          gutPercent={gutPercent}
        />
      </div>
    </>
  )
}
