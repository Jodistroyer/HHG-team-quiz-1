import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import './RadarChart.css'

export interface RadarChartProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

export const RadarChart = ({ headPercent, heartPercent, gutPercent }: RadarChartProps) => {
  const size = 350
  const center = size / 2
  const radius = 130

  const headRadius = (headPercent / 100) * radius
  const heartRadius = (heartPercent / 100) * radius
  const gutRadius = (gutPercent / 100) * radius

  const angle = Math.PI / 6
  const headX = center
  const headY = center - radius
  const heartX = center - radius * Math.cos(angle)
  const heartY = center + radius * Math.sin(angle)
  const gutX = center + radius * Math.cos(angle)
  const gutY = center + radius * Math.sin(angle)

  const headDataX = center
  const headDataY = center - headRadius
  const heartDataX = center - heartRadius * Math.cos(angle)
  const heartDataY = center + heartRadius * Math.sin(angle)
  const gutDataX = center + gutRadius * Math.cos(angle)
  const gutDataY = center + gutRadius * Math.sin(angle)

  const pathData = `M ${headDataX} ${headDataY} L ${heartDataX} ${heartDataY} L ${gutDataX} ${gutDataY} Z`

  const gridLevels = [0.33, 0.66, 1.0]

  return (
    <div className="radar-chart">
      <svg viewBox={`-50 -100 ${size + 100} ${size + 120}`} preserveAspectRatio="xMidYMid meet">
        {gridLevels.map((level, idx) => {
          const gridRadius = radius * level
          const gridHeadY = center - gridRadius
          const gridHeartX = center - gridRadius * Math.cos(angle)
          const gridHeartY = center + gridRadius * Math.sin(angle)
          const gridGutX = center + gridRadius * Math.cos(angle)
          const gridGutY = center + gridRadius * Math.sin(angle)
          const gridPath = `M ${center} ${gridHeadY} L ${gridHeartX} ${gridHeartY} L ${gridGutX} ${gridGutY} Z`
          return (
            <g key={idx}>
              <path
                d={gridPath}
                fill="none"
                stroke="#94a3b8"
                strokeWidth={level === 1 ? '1.25' : '1'}
                opacity={level === 1 ? 0.4 : 0.24}
              />
            </g>
          )
        })}
        <line x1={center} y1={center} x2={headX} y2={headY} stroke="#cbd5e1" strokeWidth="1" opacity="0.45" />
        <line x1={center} y1={center} x2={heartX} y2={heartY} stroke="#cbd5e1" strokeWidth="1" opacity="0.45" />
        <line x1={center} y1={center} x2={gutX} y2={gutY} stroke="#cbd5e1" strokeWidth="1" opacity="0.45" />
        <path d={pathData} fill="#7d3dbd" fillOpacity="0.72" stroke="none" />

      </svg>
      <div className="radar-chart-labels">
        <div className="radar-chart-label radar-chart-label-head" aria-hidden="true">
          <span className="radar-chart-icon-wrap">
            <FontAwesomeIcon icon={faDiamond} className="radar-chart-label-icon" style={{ fontSize: '14px', width: '14px', height: '14px' }} />
          </span>
          <span className="radar-chart-label-name">Head</span>
          <span className="radar-chart-label-value">{headPercent.toFixed(1)}%</span>
        </div>
        <div className="radar-chart-label radar-chart-label-heart" aria-hidden="true">
          <span className="radar-chart-icon-wrap">
            <FontAwesomeIcon icon={faHeart} className="radar-chart-label-icon" style={{ fontSize: '14px', width: '14px', height: '14px' }} />
          </span>
          <span className="radar-chart-label-name">Heart</span>
          <span className="radar-chart-label-value">{heartPercent.toFixed(1)}%</span>
        </div>
        <div className="radar-chart-label radar-chart-label-gut" aria-hidden="true">
          <span className="radar-chart-icon-wrap">
            <FontAwesomeIcon icon={faSquare} className="radar-chart-label-icon" style={{ fontSize: '14px', width: '14px', height: '14px' }} />
          </span>
          <span className="radar-chart-label-name">Gut</span>
          <span className="radar-chart-label-value">{gutPercent.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}
