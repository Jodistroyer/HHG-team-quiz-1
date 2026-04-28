import { useRef, useState } from 'react'
import { PeoplePanel } from './PeoplePanel/PeoplePanel'
import type { Person, TeamContextKey } from './PeoplePanel/types'
import { TeamMap } from './TeamMap/TeamMap'
import './Teams.css'

function Teams() {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([])
  const [activePersonId, setActivePersonId] = useState<string | null>(null)
  const activeContext: TeamContextKey = 'overall'
  const deselectRef = useRef<(id: string) => void>(() => {})
  const clearAllRef = useRef<() => void>(() => {})

  return (
    <div className="teams">
      <aside className="teams__panel">
        <PeoplePanel
          activeContext={activeContext}
          onRemovePerson={(id) => deselectRef.current(id)}
          onClearAll={() => clearAllRef.current()}
          onSelectedPeopleChange={(people) => {
            setSelectedPeople(people)
            // If the focused person is no longer selected, drop focus.
            if (activePersonId && !people.some((p) => p.id === activePersonId)) setActivePersonId(null)
          }}
          onRegisterDeselect={(fn) => { deselectRef.current = fn }}
          onRegisterClearAll={(fn) => { clearAllRef.current = fn }}
          activePersonId={activePersonId}
          onActivePersonChange={setActivePersonId}
        />
      </aside>
      <main className="teams__main">
        <TeamMap selectedPeople={selectedPeople} activePersonId={activePersonId} />
      </main>
    </div>
  )
}

export default Teams
