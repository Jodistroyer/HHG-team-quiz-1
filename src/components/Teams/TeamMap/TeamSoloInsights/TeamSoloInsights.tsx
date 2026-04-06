import { useMemo } from 'react'
import type { Person } from '../../PeoplePanel/types'
import { buildQuizResultsPropsFromPerson } from '../../personQuizResultExport'
import { QuizResults } from '../../../Quiz/QuizResults'
import './TeamSoloInsights.css'

interface TeamSoloInsightsProps {
  person: Person
}

export function TeamSoloInsights ({ person }: TeamSoloInsightsProps) {
  const props = useMemo(() => buildQuizResultsPropsFromPerson(person), [person])

  return (
    <div className="team-solo-insights">
      <QuizResults
        {...props}
        resultsTitle={`${person.name}'s profile:`}
        onStartOver={() => {}}
        hideStartOver
        embedded
      />
    </div>
  )
}
