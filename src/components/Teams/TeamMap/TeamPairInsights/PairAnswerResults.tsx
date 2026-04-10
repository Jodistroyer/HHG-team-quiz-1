import type { CSSProperties } from 'react'
import type { Person } from '../../PeoplePanel/types'
import type { QuizAnswer, QuizAnswerType, QuizQuestion, QuizSection } from '../../../Quiz/quizSections'
import { QUIZ_SECTIONS } from '../../../Quiz/quizSections'
import { calculateSectionScoresDetailed } from '../../../Quiz/quizScoring'
import { getBrainCombination } from '../../../Quiz/SectionResults/utils.tsx'
import '../../../Quiz/AnswerResults/AnswerResults.css'
import './PairAnswerResults.css'

function getOptionLabel (question: QuizQuestion, type: QuizAnswerType | null): string {
  if (!type) return '-'
  const opt = question.options.find((o) => o.type === type)
  return opt ? opt.label : type
}

function sectionHasAnyAnswer (section: QuizSection, answers: Record<string, QuizAnswer>): boolean {
  return section.questions.some((q) => {
    const ans = answers[q.id]
    return Boolean(ans?.firstChoice || ans?.secondChoice)
  })
}

function comboBadgeStyle (combo: ReturnType<typeof getBrainCombination>): CSSProperties {
  if (combo.colors.length === 1) {
    return { background: combo.colors[0] }
  }
  if (combo.colors.length === 2) {
    return { background: `linear-gradient(90deg, ${combo.colors[0]} 50%, ${combo.colors[1]} 50%)` }
  }
  return {
    background: `linear-gradient(90deg, ${combo.colors[0]} 33.33%, ${combo.colors[1]} 33.33%, ${combo.colors[1]} 66.66%, ${combo.colors[2]} 66.66%)`,
  }
}

function HeaderComboBadge ({
  person,
  section,
}: {
  person: Person
  section: QuizSection
}) {
  const answers = person.quizAnswers ?? {}
  const detailed = calculateSectionScoresDetailed(section.id, answers, QUIZ_SECTIONS)
  const combo = getBrainCombination(detailed.headPercent, detailed.heartPercent, detailed.gutPercent)
  const hasAnswers = sectionHasAnyAnswer(section, answers)
  const badgeTitle = `${person.name} — ${section.title}`

  return (
    <div className="pair-answer-results__th-badge-wrap">
      {hasAnswers ? (
        <span
          className="answer-results-combo-badge"
          style={comboBadgeStyle(combo)}
          title={badgeTitle}
        >
          {combo.label}
        </span>
      ) : (
        <span className="pair-answer-results__no-badge" title={badgeTitle}>
          No answers
        </span>
      )}
    </div>
  )
}

function PairSectionTable ({
  section,
  a,
  b,
  shortA,
  shortB,
}: {
  section: QuizSection
  a: Person
  b: Person
  shortA: string
  shortB: string
}) {
  const answersA = a.quizAnswers ?? {}
  const answersB = b.quizAnswers ?? {}

  return (
    <div className="answer-results-section pair-answer-results__section">
      <div className="answer-results-section-header pair-answer-results__section-header">
        <h4 className="answer-results-section-title">{section.title}</h4>
      </div>
      <div className="pair-answer-results__table-wrap">
        <table
          className="answer-results-table pair-answer-results__table"
          aria-label={`${section.title}: answers for ${shortA} and ${shortB}`}
        >
          <thead>
            <tr>
              <th scope="col" rowSpan={2} className="pair-answer-results__th-num">
                #
              </th>
              <th scope="col" rowSpan={2} className="pair-answer-results__th-question">
                Question
              </th>
              <th scope="colgroup" colSpan={2} className="pair-answer-results__th-person pair-answer-results__th-person--a">
                <div className="pair-answer-results__th-person-stack">
                  <span className="pair-answer-results__person-label" title={a.name}>
                    {shortA}
                  </span>
                  <HeaderComboBadge person={a} section={section} />
                </div>
              </th>
              <th scope="colgroup" colSpan={2} className="pair-answer-results__th-person pair-answer-results__th-person--b">
                <div className="pair-answer-results__th-person-stack">
                  <span className="pair-answer-results__person-label" title={b.name}>
                    {shortB}
                  </span>
                  <HeaderComboBadge person={b} section={section} />
                </div>
              </th>
            </tr>
            <tr>
              <th scope="col" className="pair-answer-results__th-sub">
                First
              </th>
              <th scope="col" className="pair-answer-results__th-sub">
                Second
              </th>
              <th scope="col" className="pair-answer-results__th-sub">
                First
              </th>
              <th scope="col" className="pair-answer-results__th-sub">
                Second
              </th>
            </tr>
          </thead>
          <tbody>
            {section.questions.map((q, idx) => {
              const ansA = answersA[q.id] ?? { firstChoice: null, secondChoice: null }
              const ansB = answersB[q.id] ?? { firstChoice: null, secondChoice: null }
              return (
                <tr key={q.id}>
                  <td className="answer-results-num">{idx + 1}</td>
                  <td className="answer-results-question pair-answer-results__question">{q.text}</td>
                  <td
                    className={`answer-results-choice answer-results-first answer-results-choice-${ansA.firstChoice?.toLowerCase() ?? 'none'}`}
                  >
                    {getOptionLabel(q, ansA.firstChoice)}
                  </td>
                  <td
                    className={`answer-results-choice answer-results-second answer-results-choice-${ansA.secondChoice?.toLowerCase() ?? 'none'}`}
                  >
                    {getOptionLabel(q, ansA.secondChoice)}
                  </td>
                  <td
                    className={`answer-results-choice answer-results-first answer-results-choice-${ansB.firstChoice?.toLowerCase() ?? 'none'}`}
                  >
                    {getOptionLabel(q, ansB.firstChoice)}
                  </td>
                  <td
                    className={`answer-results-choice answer-results-second answer-results-choice-${ansB.secondChoice?.toLowerCase() ?? 'none'}`}
                  >
                    {getOptionLabel(q, ansB.secondChoice)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function PairAnswerResults ({ people }: { people: [Person, Person] }) {
  const [a, b] = people
  const shortA = a.name.split(' ')[0] ?? a.name
  const shortB = b.name.split(' ')[0] ?? b.name

  const hasAnyData =
    Boolean(a.quizAnswers && Object.keys(a.quizAnswers).length > 0) ||
    Boolean(b.quizAnswers && Object.keys(b.quizAnswers).length > 0)

  if (!hasAnyData) {
    return (
      <section
        className="answer-results pair-answer-results"
        data-pdf-section="pair-answers"
        aria-label="Answers by section"
      >
        <h3 className="answer-results-title">Your answers by section</h3>
        <p className="pair-answer-results__empty">
          No per-question quiz data is stored for this pair. Answers appear here when each person is imported from a completed quiz (or equivalent data).
        </p>
      </section>
    )
  }

  return (
    <section
      id="pair-answers"
      className="answer-results pair-answer-results"
      data-pdf-section="pair-answers"
      aria-label="Pair answers by section"
    >
      <h3 className="answer-results-title">Your answers by section</h3>
      <div className="pair-answer-results__sections">
        {QUIZ_SECTIONS.map((section) => (
          <PairSectionTable
            key={section.id}
            section={section}
            a={a}
            b={b}
            shortA={shortA}
            shortB={shortB}
          />
        ))}
      </div>
    </section>
  )
}
