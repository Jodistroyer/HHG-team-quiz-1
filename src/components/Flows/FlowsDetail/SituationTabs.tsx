import type { FlowSituation } from '../flowsData'
import './SituationTabs.css'

interface SituationTabsProps {
  situations: FlowSituation[]
  activeSituationId: string
  onSwitchSituation: (situationId: string) => void
}

export const SituationTabs = ({
  situations,
  activeSituationId,
  onSwitchSituation,
}: SituationTabsProps) => {
  return (
    <div className="situation-tabs" role="tablist">
      {situations.map((sit) => {
        const isActive = sit.id === activeSituationId
        return (
          <button
            key={sit.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`situation-tabs__tab ${isActive ? 'situation-tabs__tab--active' : ''}`}
            onClick={() => onSwitchSituation(sit.id)}
          >
            {sit.title}
          </button>
        )
      })}
    </div>
  )
}
