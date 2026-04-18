import { useRef } from 'react'
import './Quiz.css'
import './QuizResults.css'
import { SectionResults } from './SectionResults/SectionResults'
import { getBrainCombination, getBrainIcons } from './SectionResults/utils.tsx'
import { OverallRadar } from './RadarResults/OverallRadar'
import { AllRadarsSection } from './RadarResults/AllRadarsSection'
import { AnswerResults } from './AnswerResults/AnswerResults'
import { Sidebar } from './Sidebar/Sidebar'
import { ChangeResults } from './ChangeResults/ChangeResults'
import { OVERALL_ARCHETYPES } from './overallArchetypes'
import ReactMarkdown from 'react-markdown'

type AnswerType = 'Head' | 'Heart' | 'Gut'

interface Section {
  id: number
  title: string
  questions: { id: string; text: string; options: { label: string; type: AnswerType }[] }[]
}

interface OverallScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: 'Head' | 'Heart' | 'Gut'
  secondaryBrain: 'Head' | 'Heart' | 'Gut' | null
}

interface SectionScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: 'Head' | 'Heart' | 'Gut'
  secondaryBrain: 'Head' | 'Heart' | 'Gut' | null
}

interface Answer {
  firstChoice: AnswerType | null
  secondChoice: AnswerType | null
}

interface QuizResultsProps {
  overall: OverallScores
  sectionSummaries: SectionScores[]
  sections: Section[]
  answers: Record<string, Answer>
  /** Per section (same order as `sections`): every question has a first choice. */
  sectionQuizComplete?: boolean[]
  /** Optional override for “How You Change Across Contexts” only (e.g. all four HHG contexts in the app quiz). */
  changeAcrossContextsSections?: Section[]
  changeAcrossContextsSummaries?: SectionScores[]
  changeAcrossContextsComplete?: boolean[]
  /** Same order as change-across sections: context is in the user’s selected quiz run. */
  changeAcrossContextsIncluded?: boolean[]
  /** In-app quiz only: jump back to the first unanswered question in this HHG context. */
  onResumeQuizContext?: (sectionId: number) => void
  /** ISO time when the quiz was completed (last question). */
  quizCompletedAt: string | null
  onStartOver: () => void
  /** Main heading above results (default: “Your Profile:”). */
  resultsTitle?: string
  /** Optional longer label for native tooltip (e.g. full name when `resultsTitle` is abbreviated). */
  resultsTitleTooltip?: string
  /** Hide “Start over” when embedded (e.g. Teams map for one person). */
  hideStartOver?: boolean
  /** Omit root `.app` when already inside the app shell (e.g. Teams page). */
  embedded?: boolean
}

export const QuizResults = ({
  overall,
  sectionSummaries,
  sections,
  answers,
  sectionQuizComplete,
  changeAcrossContextsSections,
  changeAcrossContextsSummaries,
  changeAcrossContextsComplete,
  changeAcrossContextsIncluded,
  onResumeQuizContext,
  quizCompletedAt,
  onStartOver,
  resultsTitle = 'Your Profile:',
  resultsTitleTooltip,
  hideStartOver = false,
  embedded = false,
}: QuizResultsProps) => {
  const resultsContainerRef = useRef<HTMLDivElement>(null)
  const rootClass = embedded ? 'quiz-results-page quiz-results-page--embedded' : 'app quiz-results-page'

  const changeSections = changeAcrossContextsSections ?? sections
  const changeSummaries = changeAcrossContextsSummaries ?? sectionSummaries
  const changeComplete = changeAcrossContextsComplete ?? sectionQuizComplete

  return (
    <div className={rootClass}>
      <div className="quiz-results-layout">
        <div className="container container-results">
          <div className="quiz-results-main">
            <div className="final-summary" ref={resultsContainerRef}>
              <div data-pdf-section="natural-default">
                <h1
                  className="title quiz-results-page__main-title"
                  title={resultsTitleTooltip ?? resultsTitle}
                >
                  {resultsTitle}
                </h1>
                <h3 className="results-section-title">Natural Default</h3>
                {(() => {
                  const combo = getBrainCombination(overall.headPercent, overall.heartPercent, overall.gutPercent)
                  const isLongLabel = combo.label === 'Head + Heart + Gut'
                  const archetypeData = OVERALL_ARCHETYPES[combo.label]
                  return (
                    <>
                      <div className="bento-grid quiz-results__natural-default-grid">
                        <div className="quiz-results__natural-default-hero">
                          <div className="quiz-results__natural-default-meta">
                            {archetypeData && (
                              <p className="quiz-results__natural-default-label">{archetypeData.archetype}</p>
                            )}
                            <div className="overall-badges-row quiz-results__natural-default-badges">
                              <div
                                className={`overall-icon-badge ${isLongLabel ? 'long-label' : ''}`}
                                style={{ background: 'transparent' }}
                              >
                                {getBrainIcons(combo.label, 'large', 'changeResults')}
                              </div>
                            </div>
                          </div>
                          <h3 className="quiz-results__natural-default-title">
                            {archetypeData?.headline ?? combo.label}
                          </h3>
                        </div>

                        <div className="overall-breakdown">
                          <OverallRadar
                            headPercent={overall.headPercent}
                            heartPercent={overall.heartPercent}
                            gutPercent={overall.gutPercent}
                          />
                        </div>
                      </div>

                      {archetypeData && (
                        <div className="quiz-results__natural-default-body">
                          <div className="overall-archetype-description quiz-results__natural-default-description">
                            <ReactMarkdown>{archetypeData.description}</ReactMarkdown>
                          </div>
                        </div>
                      )}
                    </>
                  )
                })()}
              </div>

              <div data-pdf-section="change-across-contexts-summary" id="change-across-contexts-summary">
                <h3 className="results-section-title">How You Change Across Contexts</h3>
                <ChangeResults
                  sections={changeSections}
                  sectionSummaries={changeSummaries}
                  sectionQuizComplete={changeComplete}
                  sectionIncludedInQuiz={changeAcrossContextsIncluded}
                  answers={answers}
                  onResumeQuizContext={onResumeQuizContext}
                />
              </div>
              <SectionResults sections={sections} sectionSummaries={sectionSummaries} />

              <AllRadarsSection
                overall={overall}
                sectionSummaries={sectionSummaries}
                sections={sections}
              />

              <AnswerResults sections={sections} sectionSummaries={sectionSummaries} answers={answers} />

            </div>
          </div>
        </div>

        <div className="results-sidebar-outer">
          <Sidebar
            containerRef={resultsContainerRef}
            overall={overall}
            sectionSummaries={sectionSummaries}
            sections={sections}
            answers={answers}
            quizCompletedAt={quizCompletedAt}
            onStartOver={onStartOver}
            hideStartOver={hideStartOver}
          />
        </div>
      </div>
    </div>
  )
}

