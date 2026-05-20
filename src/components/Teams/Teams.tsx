import { useEffect, useRef, useState } from 'react'
import { PeoplePanel } from './PeoplePanel/PeoplePanel'
import type { Person, TeamContextKey } from './PeoplePanel/types'
import { TeamMap } from './TeamMap/TeamMap'
import { useTeamInsightScroll } from './useTeamInsightScroll'
import './Teams.css'

function Teams() {
  const ACTIVE_PERSON_STORAGE_KEY = 'hhg.teams.activePersonId.v1'
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([])
  const [activePersonId, setActivePersonId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(ACTIVE_PERSON_STORAGE_KEY)
    } catch {
      return null
    }
  })
  /** Roster pulse/highlight from incomplete-members list only (not solo focus). */
  const [rosterHighlightId, setRosterHighlightId] = useState<string | null>(null)
  const activeContext: TeamContextKey = 'overall'
  const deselectRef = useRef<(id: string) => void>(() => {})
  const clearAllRef = useRef<() => void>(() => {})

  const { rememberScrollBeforeSolo } = useTeamInsightScroll(
    activePersonId,
    selectedPeople.length
  )

  useEffect(() => {
    try {
      if (activePersonId) localStorage.setItem(ACTIVE_PERSON_STORAGE_KEY, activePersonId)
      else localStorage.removeItem(ACTIVE_PERSON_STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [activePersonId])

  const handleActivePersonChange = (id: string | null) => {
    rememberScrollBeforeSolo(id, activePersonId)
    setRosterHighlightId(null)
    setActivePersonId(id)
  }

  return (
    <div className="teams">
      <aside className="teams__panel">
        <PeoplePanel
          activeContext={activeContext}
          onRemovePerson={(id) => deselectRef.current(id)}
          onClearAll={() => clearAllRef.current()}
          onSelectedPeopleChange={(people) => {
            setSelectedPeople(people)
            if (activePersonId && !people.some((p) => p.id === activePersonId)) setActivePersonId(null)
            if (rosterHighlightId && !people.some((p) => p.id === rosterHighlightId)) setRosterHighlightId(null)
          }}
          onRegisterDeselect={(fn) => { deselectRef.current = fn }}
          onRegisterClearAll={(fn) => { clearAllRef.current = fn }}
          activePersonId={activePersonId}
          onActivePersonChange={handleActivePersonChange}
          rosterHighlightId={rosterHighlightId}
          onRosterHighlightChange={setRosterHighlightId}
        />
      </aside>
      <main className="teams__main">
        <TeamMap
          selectedPeople={selectedPeople}
          activePersonId={activePersonId}
          rosterHighlightId={rosterHighlightId}
          onRosterHighlightChange={setRosterHighlightId}
        />
      </main>
    </div>
  )
}

export default Teams
