import { RadarChart } from './RadarChart'
import './OverallRadar.css'

interface OverallRadarProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

export const OverallRadar = ({ headPercent, heartPercent, gutPercent }: OverallRadarProps) => {
  return (
    <>
      <h3 className="overall-breakdown-label">Your balance</h3>
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
