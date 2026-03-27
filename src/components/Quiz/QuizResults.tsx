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
  onStartOver: () => void
}

export const QuizResults = ({ overall, sectionSummaries, sections, answers, onStartOver }: QuizResultsProps) => {
  const resultsContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="app quiz-results-page">
      <div className="quiz-results-layout">
        <div className="container container-results">
          <div className="quiz-results-main">
            <h1 className="title">Your Profile:</h1>

            <div className="final-summary" ref={resultsContainerRef}>
              <div data-pdf-section="natural-default">
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
                                {getBrainIcons(combo.label, 'large')}
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
                          <p className="overall-archetype-description quiz-results__natural-default-description">
                            {archetypeData.description}
                          </p>
                        </div>
                      )}
                    </>
                  )
                })()}
              </div>

              <h3 className="results-section-title">How You Change Across Contexts</h3>
              <ChangeResults sections={sections} sectionSummaries={sectionSummaries} />
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
            onStartOver={onStartOver}
          />
        </div>
      </div>
    </div>
  )
}

