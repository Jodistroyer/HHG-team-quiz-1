import { getBrainCombination } from '../SectionResults/utils'
import './AnswerResults.css'

type AnswerType = 'Head' | 'Heart' | 'Gut'

interface SectionScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

interface Question {
  id: string
  text: string
  options: { label: string; type: AnswerType }[]
}

interface SectionWithQuestions {
  id: number
  title: string
  questions: Question[]
}

interface Answer {
  firstChoice: AnswerType | null
  secondChoice: AnswerType | null
}

interface AnswerResultsProps {
  sections: SectionWithQuestions[]
  sectionSummaries: SectionScores[]
  answers: Record<string, Answer>
}

function getOptionLabel(question: Question, type: AnswerType | null): string {
  if (!type) return '-'
  const opt = question.options.find(o => o.type === type)
  return opt ? opt.label : type
}

export const AnswerResults = ({ sections, sectionSummaries, answers }: AnswerResultsProps) => {
  return (
    <section id="answers" className="answer-results" data-pdf-section="answers">
      <h3 className="answer-results-title">Your answers by section</h3>
      <div className="answer-results-tables">
        {sections.map((section, idx) => {
          const scores = sectionSummaries[idx] ?? { headPercent: 0, heartPercent: 0, gutPercent: 0 }
          const combo = getBrainCombination(scores.headPercent, scores.heartPercent, scores.gutPercent)
          const badgeStyle =
            combo.colors.length === 1
              ? { background: combo.colors[0] }
              : combo.colors.length === 2
                ? { background: `linear-gradient(90deg, ${combo.colors[0]} 50%, ${combo.colors[1]} 50%)` }
                : { background: `linear-gradient(90deg, ${combo.colors[0]} 33.33%, ${combo.colors[1]} 33.33%, ${combo.colors[1]} 66.66%, ${combo.colors[2]} 66.66%)` }
          return (
          <div key={section.id} className="answer-results-section">
            <div className="answer-results-section-header">
              <h4 className="answer-results-section-title">{section.title}</h4>
              <span className="answer-results-combo-badge" style={badgeStyle}>
                {combo.label}
              </span>
            </div>
            <div className="answer-results-table-wrap">
              <table className="answer-results-table" aria-label={`Answers for ${section.title}`}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Question</th>
                    <th scope="col">First choice</th>
                    <th scope="col">Second choice</th>
                  </tr>
                </thead>
                <tbody>
                  {section.questions.map((q, idx) => {
                    const answer = answers[q.id] ?? { firstChoice: null, secondChoice: null }
                    return (
                      <tr key={q.id}>
                        <td className="answer-results-num">{idx + 1}</td>
                        <td className="answer-results-question">{q.text}</td>
                        <td
                          className={`answer-results-choice answer-results-first answer-results-choice-${answer.firstChoice?.toLowerCase() ?? 'none'}`}
                        >
                          {getOptionLabel(q, answer.firstChoice)}
                        </td>
                        <td
                          className={`answer-results-choice answer-results-second answer-results-choice-${answer.secondChoice?.toLowerCase() ?? 'none'}`}
                        >
                          {getOptionLabel(q, answer.secondChoice)}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          )
        })}
      </div>
    </section>
  )
}
