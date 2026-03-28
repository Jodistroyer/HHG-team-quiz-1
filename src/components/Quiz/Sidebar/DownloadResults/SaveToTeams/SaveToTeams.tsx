import { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { AddPersonModal } from '../../../../Teams/PeoplePanel/AddPersonModal'
import { loadPeople, savePeopleToStorage } from '../../../../Teams/peopleStorage'
import {
  buildQuizExportPayload,
  type QuizAnswer,
  type QuizOverallScores as OverallScores,
  type QuizSection,
  type QuizSectionScores as SectionScores,
} from '../../../quizExport'

interface SaveToTeamsProps {
  overall: OverallScores
  sectionSummaries: SectionScores[]
  sections: QuizSection[]
  answers: Record<string, QuizAnswer>
  quizCompletedAt: string | null
  iconOnly?: boolean
}

export function SaveToTeams({ overall, sectionSummaries, sections, answers, quizCompletedAt, iconOnly }: SaveToTeamsProps) {
  const [showModal, setShowModal] = useState(false)

  const payload = useMemo(
    () => buildQuizExportPayload(overall, sectionSummaries, sections, answers, quizCompletedAt),
    [overall, sectionSummaries, sections, answers, quizCompletedAt]
  )

  return (
    <>
      <button
        type="button"
        className={`btn btn-primary results-sidebar-save-to-teams${iconOnly ? ' results-sidebar-save-to-teams--icon-only' : ''}`}
        onClick={() => setShowModal(true)}
        title="Save to Teams"
        aria-label="Save to Teams"
      >
        <FontAwesomeIcon icon={faUsers} className="results-sidebar-save-to-teams-icon" aria-hidden />
        {iconOnly ? <span>Teams</span> : <span>Save to Teams</span>}
      </button>

      {showModal && (
        <AddPersonModal
          onClose={() => setShowModal(false)}
          onAdd={(person) => {
            const current = loadPeople()
            savePeopleToStorage([...current, person])
            setShowModal(false)
          }}
          initialQuizExport={payload}
          dialogTitle="Save to Teams"
          submitLabel="Save to Teams"
          existingPeople={loadPeople()}
        />
      )}
    </>
  )
}
