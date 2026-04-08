import { useMemo } from 'react'
import type { Person } from '../../PeoplePanel/types'
import { buildQuizResultsPropsFromPerson } from '../../personQuizResultExport'
import { QuizResults } from '../../../Quiz/QuizResults'
import './TeamSoloInsights.css'

interface TeamSoloInsightsProps {
  person: Person
}

/** Max chars from first name token shown in the H1 (left-aligned line can carry a bit more; full name on hover). */
const SOLO_PROFILE_HEADING_NAME_MAX = 22

function soloProfileHeading (person: Person): { display: string; tooltip: string } {
  const full = person.name.trim()
  if (!full) {
    return { display: 'Profile', tooltip: 'Profile' }
  }
  const token = full.split(/\s+/)[0] ?? full
  const short =
    token.length > SOLO_PROFILE_HEADING_NAME_MAX
      ? `${token.slice(0, SOLO_PROFILE_HEADING_NAME_MAX - 1)}…`
      : token
  const tooltip = `${full}'s profile:`
  return {
    display: `${short}'s profile:`,
    tooltip,
  }
}

export function TeamSoloInsights ({ person }: TeamSoloInsightsProps) {
  const props = useMemo(() => buildQuizResultsPropsFromPerson(person), [person])
  const { display, tooltip } = useMemo(() => soloProfileHeading(person), [person])

  return (
    <div className="team-solo-insights">
      <QuizResults
        {...props}
        resultsTitle={display}
        resultsTitleTooltip={tooltip}
        onStartOver={() => {}}
        hideStartOver
        embedded
      />
    </div>
  )
}
