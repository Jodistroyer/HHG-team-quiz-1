import { useRef, useState } from 'react'
import { PeoplePanel } from './PeoplePanel/PeoplePanel'
import type { Person, TeamContextKey } from './PeoplePanel/types'
import { TeamMap } from './TeamMap/TeamMap'
import './Teams.css'

function Teams() {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([])
  const [activeContext, setActiveContext] = useState<TeamContextKey>('underPressure')
  const deselectRef = useRef<(id: string) => void>(() => {})
  const clearAllRef = useRef<() => void>(() => {})

  return (
    <div className="teams">
      <aside className="teams__panel">
        <PeoplePanel
          activeContext={activeContext}
          onRemovePerson={(id) => deselectRef.current(id)}
          onClearAll={() => clearAllRef.current()}
          onSelectedPeopleChange={setSelectedPeople}
          onRegisterDeselect={(fn) => { deselectRef.current = fn }}
          onRegisterClearAll={(fn) => { clearAllRef.current = fn }}
        />
      </aside>
      <main className="teams__main">
        <TeamMap
          selectedPeople={selectedPeople}
          activeContext={activeContext}
          onActiveContextChange={setActiveContext}
        />
      </main>
    </div>
  )
}

export default Teams
