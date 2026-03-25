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

type ArchetypeKey = string

const OVERALL_ARCHETYPES: Record<ArchetypeKey, { archetype: string; description: string; quote: string }> = {
  'Head Strong': {
    archetype: 'Thinker',
    description: 'You live in models. You don\'t react, you analyze. Feelings are data. People are systems. You\'d rather be right than liked. Silence is where you sharpen your edge.',
    quote: 'If I understand it, I can control it.'
  },
  'Head + Gut': {
    archetype: 'Tactician',
    description: 'You don\'t just think, you calculate impact. Every move has timing. Every word has weight. You hate chaos, but you love winning. You trust your instincts after you audit them.',
    quote: 'Precision beats passion.'
  },
  'Head + Heart': {
    archetype: 'Diplomat',
    description: 'You read rooms like spreadsheets. You understand people without losing logic. You want harmony, but not at the cost of truth. You are the bridge nobody notices holding the war apart.',
    quote: 'Peace, but intelligent.'
  },
  'Heart Strong': {
    archetype: 'Empath',
    description: 'You feel everything, even what isn\'t yours. People open up to you without knowing why. You lead with care, but you get hurt easily. Connection is oxygen.',
    quote: 'If you feel it, it matters.'
  },
  'Heart + Gut': {
    archetype: 'Shepherd',
    description: 'You protect your people fiercely. Your loyalty runs deeper than logic. You don\'t care who\'s right, you care who\'s safe. Cross someone you love and you will see your fire.',
    quote: 'My people first.'
  },
  'Heart + Head': {
    archetype: 'Advisor',
    description: 'You give counsel like it is second nature. People trust you because you understand both truth and emotion. You don\'t dominate, you guide. You are often the wisdom behind someone else\'s success.',
    quote: 'Let me help you see clearly.'
  },
  'Gut Strong': {
    archetype: 'Doer',
    description: 'You move. While others think, you act. You hate overcomplication. Results matter more than theories. Stillness feels like death.',
    quote: 'Enough talk.'
  },
  'Gut + Head': {
    archetype: 'Engineer',
    description: 'You build systems that work. You don\'t guess, you optimize. Efficiency is your love language. If it is broken, you redesign it.',
    quote: 'Make it better.'
  },
  'Gut + Heart': {
    archetype: 'Hero',
    description: 'You step in when others hesitate. You act from conviction, not calculation. You feel deeply, but you fight anyway. You would rather bleed than watch someone else suffer.',
    quote: 'Someone has to.'
  },
  'Head + Heart + Gut': {
    archetype: 'Sovereign',
    description: 'You integrate mind, emotion, and instinct. You don\'t react, you decide. People feel steadier around you. You see the whole board and the human cost.',
    quote: 'I choose.'
  }
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
            <div className="bento-grid">
            <div className="overall-result">
              {(() => {
                const combo = getBrainCombination(overall.headPercent, overall.heartPercent, overall.gutPercent)
                const isLongLabel = combo.label === 'Head + Heart + Gut'
                const archetypeData = OVERALL_ARCHETYPES[combo.label]
                return (
                  <div className="overall-result-inner">
                    {archetypeData && (
                      <div className="overall-archetype">
                        <h3 className="overall-archetype-name">{archetypeData.archetype}</h3>
                        <div className="overall-badges-row">
                          <div
                            className={`overall-icon-badge ${isLongLabel ? 'long-label' : ''}`}
                            style={{ background: 'transparent' }}
                          >
                            {getBrainIcons(combo.label, 'large')}
                          </div>
                          {/* <div className={`overall-brain-badge ${isLongLabel ? 'long-label' : ''}`}>{combo.label}</div> */}
                        </div>
                        <p className="overall-archetype-description">{archetypeData.description}</p>
                        {/* <blockquote className="overall-archetype-quote">"{archetypeData.quote}"</blockquote> */}
                      </div>
                    )}
                    {!archetypeData && (
                      <div className="overall-badges-row">
                        <div
                          className={`overall-icon-badge ${isLongLabel ? 'long-label' : ''}`}
                          style={{ background: 'transparent' }}
                        >
                          {getBrainIcons(combo.label, 'large')}
                        </div>
                        {/* <div className={`overall-brain-badge ${isLongLabel ? 'long-label' : ''}`}>{combo.label}</div> */}
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>

            <div className="overall-breakdown">
              <OverallRadar
                headPercent={overall.headPercent}
                heartPercent={overall.heartPercent}
                gutPercent={overall.gutPercent}
              />
            </div>
          </div>
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

