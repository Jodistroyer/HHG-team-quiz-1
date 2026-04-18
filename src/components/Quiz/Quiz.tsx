import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faBriefcase, faPeopleGroup, faChartLine, faHouse } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import './Quiz.css'
import { QuizResults } from './QuizResults'
import { QuizIntro, type QuizSelectedContextId } from './QuizIntro'
import {
  QUIZ_SECTIONS as sections,
  type QuizAnswer as Answer,
  type QuizAnswerType as AnswerType,
} from './quizSections'
import { calculateSectionScoresDetailed } from './quizScoring'
import { SECTION_CONTEXT_BY_ID } from './sectionContext'

const SECTION_ICONS: Record<number, IconDefinition> = {
  1: faFire,        // Under Pressure
  2: faBriefcase,   // Doing Work
  3: faPeopleGroup, // With People
  4: faChartLine    // Getting Better
}

const QUIZ_STORAGE_KEY = 'hhg.quiz.v2'

const DEFAULT_SELECTED_CONTEXTS: QuizSelectedContextId[] = [1, 2, 3, 4]

const QUESTION_WEIGHTS: Record<string, number> = {
  // Keep deterministic tie-breaks even with partial contexts.
  '1-1': 1.1, '1-2': 1.0, '1-3': 1.0, '1-4': 1.0, '1-5': 1.0,
  '2-1': 1.1, '2-2': 1.0, '2-3': 1.0, '2-4': 1.0, '2-5': 1.0,
  '3-1': 1.0, '3-2': 1.1, '3-3': 1.0, '3-4': 1.0, '3-5': 1.0,
  '4-1': 1.0, '4-2': 1.0, '4-3': 1.0, '4-4': 1.0, '4-5': 1.1,
}

function isQuizSelectedContextId (n: unknown): n is QuizSelectedContextId {
  return n === 1 || n === 2 || n === 3 || n === 4
}

function loadSavedQuizState (): {
  currentQuestionIndex: number
  answers: Record<string, Answer>
  showFinalSummary: boolean
  quizCompletedAt: string | null
  selectedContextIds: QuizSelectedContextId[]
  introDismissed: boolean
  addContextSectionId: QuizSelectedContextId | null
} {
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY) ?? localStorage.getItem('hhg.quiz.v1')
    if (!raw) {
      return {
        currentQuestionIndex: 0,
        answers: {},
        showFinalSummary: false,
        quizCompletedAt: null,
        selectedContextIds: [],
        introDismissed: false,
        addContextSectionId: null,
      }
    }
    const parsed = JSON.parse(raw) as {
      currentQuestionIndex?: number
      answers?: Record<string, Answer>
      showFinalSummary?: boolean
      quizCompletedAt?: string
      selectedContextIds?: QuizSelectedContextId[]
      introDismissed?: boolean
      addContextSectionId?: unknown
    }

    return {
      currentQuestionIndex:
        typeof parsed.currentQuestionIndex === 'number' && parsed.currentQuestionIndex >= 0
          ? parsed.currentQuestionIndex
          : 0,
      answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {},
      showFinalSummary: typeof parsed.showFinalSummary === 'boolean' ? parsed.showFinalSummary : false,
      quizCompletedAt: typeof parsed.quizCompletedAt === 'string' ? parsed.quizCompletedAt : null,
      selectedContextIds: Array.isArray(parsed.selectedContextIds)
        ? parsed.selectedContextIds.filter((x): x is QuizSelectedContextId => x === 1 || x === 2 || x === 3 || x === 4)
        : [],
      introDismissed: typeof parsed.introDismissed === 'boolean' ? parsed.introDismissed : false,
      addContextSectionId: isQuizSelectedContextId(parsed.addContextSectionId)
        ? parsed.addContextSectionId
        : null,
    }
  } catch {
    return {
      currentQuestionIndex: 0,
      answers: {},
      showFinalSummary: false,
      quizCompletedAt: null,
      selectedContextIds: [],
      introDismissed: false,
      addContextSectionId: null,
    }
  }
}

function Quiz() {
  const saved = loadSavedQuizState()

  // Initialize synchronously from localStorage so switching tabs doesn't "flash" the quiz start state.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(saved.currentQuestionIndex)
  const [answers, setAnswers] = useState<Record<string, Answer>>(saved.answers)
  const [showFinalSummary, setShowFinalSummary] = useState(saved.showFinalSummary)
  const [quizCompletedAt, setQuizCompletedAt] = useState<string | null>(saved.quizCompletedAt)
  const [selectedContextIds, setSelectedContextIds] = useState<QuizSelectedContextId[]>(saved.selectedContextIds)
  const [introDismissed, setIntroDismissed] = useState(saved.introDismissed)
  const [addContextSectionId, setAddContextSectionId] = useState<QuizSelectedContextId | null>(
    saved.addContextSectionId
  )

  useEffect(() => {
    if (addContextSectionId != null && !selectedContextIds.includes(addContextSectionId)) {
      setAddContextSectionId(null)
    }
  }, [addContextSectionId, selectedContextIds])

  // Persist progress + completion state.
  useEffect(() => {
    try {
      const payload = {
        currentQuestionIndex,
        answers,
        showFinalSummary,
        quizCompletedAt,
        selectedContextIds,
        introDismissed,
        addContextSectionId,
      }
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // ignore storage failures
    }
  }, [
    currentQuestionIndex,
    answers,
    showFinalSummary,
    quizCompletedAt,
    selectedContextIds,
    introDismissed,
    addContextSectionId,
  ])

  const clearSavedQuiz = () => {
    try {
      localStorage.removeItem(QUIZ_STORAGE_KEY)
      localStorage.removeItem('hhg.quiz.v1')
    } catch {
      // ignore
    }
  }

  const selectedSections = sections.filter((s) => selectedContextIds.includes(s.id as QuizSelectedContextId))
  /** When adding a new context from results, only that section’s questions appear until finished. */
  const quizFlowSections =
    addContextSectionId != null
      ? sections.filter((s) => s.id === addContextSectionId)
      : selectedSections
  const allQuestions = quizFlowSections.flatMap((section) => section.questions)
  const questionsInFullSelection = selectedSections.flatMap((s) => s.questions)
  const currentQuestion = allQuestions[currentQuestionIndex]
  const currentAnswer = currentQuestion ? (answers[currentQuestion.id] || { firstChoice: null, secondChoice: null }) : { firstChoice: null, secondChoice: null }
  const questionSection = currentQuestion
    ? quizFlowSections.find((s) => s.questions.some((q) => q.id === currentQuestion.id))
    : undefined

  const totalQuestions = allQuestions.length

  const calculateSectionScores = (sectionId: number) =>
    calculateSectionScoresDetailed(sectionId, answers, sections)

  const calculateOverallScores = () => {
    let totalHead = 0
    let totalHeart = 0
    let totalGut = 0
    let totalSecondary = 0

    selectedSections.forEach((section) => {
      const scores = calculateSectionScores(section.id)
      totalHead += scores.headPoints
      totalHeart += scores.heartPoints
      totalGut += scores.gutPoints
      totalSecondary += section.questions.filter(q => answers[q.id]?.secondChoice).length
    })

    const answeredPrimary = questionsInFullSelection.filter((q) => answers[q.id]?.firstChoice).length
    const totalPoints = answeredPrimary + totalSecondary * 0.5
    const headPercent = totalPoints > 0 ? (totalHead / totalPoints) * 100 : 0
    const heartPercent = totalPoints > 0 ? (totalHeart / totalPoints) * 100 : 0
    const gutPercent = totalPoints > 0 ? (totalGut / totalPoints) * 100 : 0

    // Determine dominant type with tie-breaking based on "Under Pressure" section first choice selections
    const maxScore = Math.max(totalHead, totalHeart, totalGut)
    const tiedTypes: AnswerType[] = []
    if (totalHead === maxScore) tiedTypes.push('Head')
    if (totalHeart === maxScore) tiedTypes.push('Heart')
    if (totalGut === maxScore) tiedTypes.push('Gut')

    let dominant: AnswerType
    if (tiedTypes.length === 1) {
      // No tie, use the single highest score
      dominant = tiedTypes[0]
    } else {
      // Tie exists. Break it using weighted first-choice selections across selected contexts.
      let weightedHead = 0
      let weightedHeart = 0
      let weightedGut = 0

      questionsInFullSelection.forEach((question) => {
        const answer = answers[question.id]
        const weight = QUESTION_WEIGHTS[question.id] ?? 1.0
        if (answer?.firstChoice === 'Head') weightedHead += weight
        if (answer?.firstChoice === 'Heart') weightedHeart += weight
        if (answer?.firstChoice === 'Gut') weightedGut += weight
      })

      // Among tied types, find the one with highest weighted sum.
      let maxWeightedSum = -1
      let winner: AnswerType | null = null
      
      tiedTypes.forEach(type => {
        const weightedSum = type === 'Head' ? weightedHead :
                           type === 'Heart' ? weightedHeart :
                           weightedGut
        if (weightedSum > maxWeightedSum) {
          maxWeightedSum = weightedSum
          winner = type
        }
      })

      dominant = winner || tiedTypes[0] || 'Head'
    }

    // Determine secondary brain: the second highest overall score
    const scores = [
      { type: 'Head' as AnswerType, score: totalHead },
      { type: 'Heart' as AnswerType, score: totalHeart },
      { type: 'Gut' as AnswerType, score: totalGut }
    ]
    
    // Sort by score descending
    scores.sort((a, b) => b.score - a.score)
    
    // Secondary brain is the type with the second highest score (excluding the dominant type)
    const secondaryBrain: AnswerType | null = scores.find(s => s.type !== dominant)?.type || null

    return { totalHead, totalHeart, totalGut, headPercent, heartPercent, gutPercent, dominant, secondaryBrain, totalPoints }
  }

  const getTypeColor = (type: AnswerType) => {
    switch (type) {
      case 'Head': return '#1368ce' // Blue
      case 'Heart': return '#e21b3c' // Red
      case 'Gut': return '#26890c' // Green
      default: return '#666'
    }
  }

  const getDarkerColor = (color: string) => {
    // Convert hex to RGB and darken by 20%
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    const darkerR = Math.max(0, Math.floor(r * 0.7))
    const darkerG = Math.max(0, Math.floor(g * 0.7))
    const darkerB = Math.max(0, Math.floor(b * 0.7))
    
    return `rgb(${darkerR}, ${darkerG}, ${darkerB})`
  }


  const formatOptionText = (text: string) => {
    // Split by • and remove empty strings, then trim each part
    return text.split('•').map(part => part.trim()).filter(part => part.length > 0)
  }

  const handleOptionClick = (type: AnswerType) => {
    if (!currentQuestion) return
    if (!currentAnswer.firstChoice) {
      // First selection
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          firstChoice: type,
          secondChoice: null
        }
      }))
    } else if (currentAnswer.firstChoice !== type && !currentAnswer.secondChoice) {
      // Second selection
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          secondChoice: type
        }
      }))
    } else if (currentAnswer.firstChoice === type) {
      // Deselect first choice
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          firstChoice: null,
          secondChoice: null
        }
      }))
    } else if (currentAnswer.secondChoice === type) {
      // Deselect second choice
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          secondChoice: null
        }
      }))
    }
  }

  // Auto-advance disabled - user controls navigation with buttons

  const shouldShowIntro =
    selectedSections.length === 0 ||
    (!introDismissed && !showFinalSummary && currentQuestionIndex === 0)

  if (shouldShowIntro) {
    return (
      <QuizIntro
        selectedContextIds={selectedContextIds}
        onToggleContext={(id) => {
          setSelectedContextIds((prev) => {
            const has = prev.includes(id)
            const next = has ? prev.filter((x) => x !== id) : [...prev, id]
            return next.length ? (next as QuizSelectedContextId[]) : []
          })
        }}
        onSelectAll={() => {
          setSelectedContextIds(DEFAULT_SELECTED_CONTEXTS)
        }}
        onStart={() => {
          if (selectedContextIds.length === 0) return
          setAddContextSectionId(null)
          setIntroDismissed(true)
          setCurrentQuestionIndex(0)
        }}
      />
    )
  }

  if (showFinalSummary) {
    const overall = calculateOverallScores()
    const sectionSummaries = selectedSections.map(section => calculateSectionScores(section.id))
    const sectionQuizComplete = selectedSections.map((sec) =>
      sec.questions.every((q) => answers[q.id]?.firstChoice != null)
    )

    const changeAcrossSummaries = sections.map((section) => calculateSectionScores(section.id))
    const changeAcrossComplete = sections.map((sec) =>
      selectedContextIds.includes(sec.id as QuizSelectedContextId) &&
      sec.questions.every((q) => answers[q.id]?.firstChoice != null)
    )
    const changeAcrossIncluded = sections.map((sec) =>
      selectedContextIds.includes(sec.id as QuizSelectedContextId)
    )

    return (
      <QuizResults
        overall={overall}
        sectionSummaries={sectionSummaries}
        sections={selectedSections}
        answers={answers}
        sectionQuizComplete={sectionQuizComplete}
        changeAcrossContextsSections={sections}
        changeAcrossContextsSummaries={changeAcrossSummaries}
        changeAcrossContextsComplete={changeAcrossComplete}
        changeAcrossContextsIncluded={changeAcrossIncluded}
        onResumeQuizContext={(sectionId) => {
          const sec = sections.find((s) => s.id === sectionId)
          if (!sec) return
          const firstUnansweredId = sec.questions.map((q) => q.id).find((id) => !answers[id]?.firstChoice)
          if (!firstUnansweredId) return

          const alreadyInRun = selectedContextIds.includes(sectionId as QuizSelectedContextId)
          const nextIds: QuizSelectedContextId[] = alreadyInRun
            ? selectedContextIds
            : ([...selectedContextIds, sectionId] as QuizSelectedContextId[]).sort((a, b) => a - b)

          const flowSections = alreadyInRun
            ? sections.filter((s) => nextIds.includes(s.id as QuizSelectedContextId))
            : [sec]
          const flowQuestions = flowSections.flatMap((s) => s.questions)
          const idx = flowQuestions.findIndex((q) => q.id === firstUnansweredId)
          if (idx < 0) return

          setSelectedContextIds(nextIds)
          setShowFinalSummary(false)
          if (alreadyInRun) {
            setAddContextSectionId(null)
          } else {
            setAddContextSectionId(sectionId as QuizSelectedContextId)
          }
          setCurrentQuestionIndex(idx)
        }}
        quizCompletedAt={quizCompletedAt}
        onStartOver={() => {
          clearSavedQuiz()
          setShowFinalSummary(false)
          setCurrentQuestionIndex(0)
          setAnswers({})
          setQuizCompletedAt(null)
          setSelectedContextIds([])
          setIntroDismissed(false)
          setAddContextSectionId(null)
        }}
      />
    )
  }

  // Calculate overall progress (total answered questions / selected questions)
  const getOverallProgress = () => {
    const answeredCount = allQuestions.filter(q => answers[q.id]?.firstChoice).length
    return (answeredCount / totalQuestions) * 100
  }

  // Calculate section progress for current section
  const getSectionProgress = () => {
    if (!questionSection) return 0
    const totalInSection = questionSection.questions.length
    // Include current question if it has an answer
    const currentAnswered = currentAnswer.firstChoice ? 1 : 0
    const currentIndex = questionSection.questions.findIndex(q => q.id === currentQuestion.id)
    const previousAnswered = questionSection.questions.slice(0, currentIndex).filter(q => {
      const answer = answers[q.id]
      return answer && answer.firstChoice
    }).length
    return ((previousAnswered + currentAnswered) / totalInSection) * 100
  }

  // Get current section index (0-based)
  const getCurrentSectionIndex = () => {
    if (!questionSection) return 0
    return quizFlowSections.findIndex((s) => s.id === questionSection.id)
  }

  // Get section color
  const getSectionColor = () => {
    return '#7d3dbd'
  }

  // Get options in the correct order for grid: Head (top-left), Heart (top-right), Gut (bottom-left)
  const getOrderedOptions = () => {
    if (!currentQuestion) return { headOption: undefined, heartOption: undefined, gutOption: undefined }
    const headOption = currentQuestion.options.find(opt => opt.type === 'Head')
    const heartOption = currentQuestion.options.find(opt => opt.type === 'Heart')
    const gutOption = currentQuestion.options.find(opt => opt.type === 'Gut')
    return { headOption, heartOption, gutOption }
  }

  const { headOption, heartOption, gutOption } = getOrderedOptions()
  const sectionProgress = getSectionProgress()
  const overallProgress = getOverallProgress()
  const currentSectionIndex = getCurrentSectionIndex()

  return (
    <div className="app quiz-page">
      <div className="container">
        <div className="question-container">
          {/* Horizontal Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar-wrapper">
              <div className="progress-bar-heading">
                {/* Section title + section counter (both on the left, next to each other) */}
                <div className="progress-bar-titles">
                  {questionSection && (
                    <>
                      {SECTION_ICONS[questionSection.id] && (
                        <span className="progress-bar-title-icon" aria-hidden="true">
                          <FontAwesomeIcon icon={SECTION_ICONS[questionSection.id]} />
                        </span>
                      )}
                      <div className="progress-bar-title current">
                        {questionSection.title}
                      </div>
                      <span className="progress-bar-title-sep" aria-hidden="true" />
                      <div className="progress-bar-section-counter">
                        Section {currentSectionIndex + 1} of {quizFlowSections.length}
                      </div>
                    </>
                  )}
                </div>
                {questionSection && SECTION_CONTEXT_BY_ID[questionSection.id] && (
                  <p className="progress-bar-section-context">{SECTION_CONTEXT_BY_ID[questionSection.id]}</p>
                )}
              </div>

              <div className="progress-bar-track-row">
                <div className="progress-bar">
                  {/* Overall progress fill */}
                  <div
                    className="progress-bar-overall-fill"
                    style={{
                      width: `${overallProgress}%`,
                    }}
                  />

                  {/* Section segments */}
                  {quizFlowSections.map((section, sectionIdx) => {
                    const sectionStart = (sectionIdx / quizFlowSections.length) * 100
                    const sectionWidth = 100 / quizFlowSections.length
                    const isCurrentSection = sectionIdx === currentSectionIndex
                    const sectionColor = getSectionColor()

                    return (
                      <div
                        key={section.id}
                        className={`progress-segment ${isCurrentSection ? 'current' : ''}`}
                        style={{
                          left: `${sectionStart}%`,
                          width: `${sectionWidth}%`,
                          backgroundColor: `${sectionColor}15`,
                        }}
                      >
                        {isCurrentSection && (
                          <div
                            className="progress-segment-indicator"
                            style={{
                              width: `${sectionProgress}%`,
                              background: sectionColor,
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className="progress-bar-counter" aria-label={`Question ${currentQuestionIndex + 1} of ${totalQuestions}`}>
                  {currentQuestionIndex + 1}/{totalQuestions}
                </div>
              </div>
            </div>
          </div>

          <h2 className="question-text">
            <span className="question-text-inner">{currentQuestion?.text}</span>
          </h2>

          <p className="quiz-instructions">
            Choose 1 or 2 choices.
          </p>
          
          <div className="options-grid">
            {/* Top-left: Blue (Head) */}
            {headOption && (
              <div
                className={`grid-option grid-option-top-left ${currentAnswer.firstChoice === 'Head' ? 'selected primary' : currentAnswer.secondChoice === 'Head' ? 'selected secondary' : ''}`}
                style={{
                  backgroundColor: getTypeColor('Head'),
                  borderColor: getTypeColor('Head'),
                  borderBottom: `4px solid ${getDarkerColor(getTypeColor('Head'))}`
                }}
                onClick={() => handleOptionClick('Head')}
              >
                <div className="option-text">
                  {formatOptionText(headOption.label).map((line, idx) => (
                    <div key={idx} className="option-line">{line}</div>
                  ))}
                </div>
                {currentAnswer.firstChoice === 'Head' && <span className="selection-marker">1</span>}
                {currentAnswer.secondChoice === 'Head' && <span className="selection-marker">2</span>}
              </div>
            )}

            {/* Top-right: Red (Heart) */}
            {heartOption && (
              <div
                className={`grid-option grid-option-top-right ${currentAnswer.firstChoice === 'Heart' ? 'selected primary' : currentAnswer.secondChoice === 'Heart' ? 'selected secondary' : ''}`}
                style={{
                  backgroundColor: getTypeColor('Heart'),
                  borderColor: getTypeColor('Heart'),
                  borderBottom: `4px solid ${getDarkerColor(getTypeColor('Heart'))}`
                }}
                onClick={() => handleOptionClick('Heart')}
              >
                <div className="option-text">
                  {formatOptionText(heartOption.label).map((line, idx) => (
                    <div key={idx} className="option-line">{line}</div>
                  ))}
                </div>
                {currentAnswer.firstChoice === 'Heart' && <span className="selection-marker">1</span>}
                {currentAnswer.secondChoice === 'Heart' && <span className="selection-marker">2</span>}
              </div>
            )}

            {/* Bottom-left: Green (Gut) */}
            {gutOption && (
              <div
                className={`grid-option grid-option-bottom-left ${currentAnswer.firstChoice === 'Gut' ? 'selected primary' : currentAnswer.secondChoice === 'Gut' ? 'selected secondary' : ''}`}
                style={{
                  backgroundColor: getTypeColor('Gut'),
                  borderColor: getTypeColor('Gut'),
                  borderBottom: `4px solid ${getDarkerColor(getTypeColor('Gut'))}`
                }}
                onClick={() => handleOptionClick('Gut')}
              >
                <div className="option-text">
                  {formatOptionText(gutOption.label).map((line, idx) => (
                    <div key={idx} className="option-line">{line}</div>
                  ))}
                </div>
                {currentAnswer.firstChoice === 'Gut' && <span className="selection-marker">1</span>}
                {currentAnswer.secondChoice === 'Gut' && <span className="selection-marker">2</span>}
              </div>
            )}

          </div>

          <div className="navigation">
            {currentQuestionIndex === 0 && addContextSectionId != null ? (
              <span className="quiz-nav-lead-spacer" aria-hidden />
            ) : currentQuestionIndex === 0 ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setIntroDismissed(false)
                  setCurrentQuestionIndex(0)
                }}
                aria-label="Back to home"
              >
                <FontAwesomeIcon icon={faHouse} className="btn-icon" aria-hidden />
                Back to home
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              >
                <span className="btn-icon">←</span>
                Previous
              </button>
            )}
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!currentQuestion || !currentAnswer.firstChoice) return

                const isLastQuestion = currentQuestionIndex === totalQuestions - 1

                if (isLastQuestion) {
                  if (addContextSectionId != null) {
                    setAddContextSectionId(null)
                  }
                  setQuizCompletedAt((prev) => prev ?? new Date().toISOString())
                  setShowFinalSummary(true)
                } else {
                  setCurrentQuestionIndex(prev => prev + 1)
                }
              }}
              disabled={!currentQuestion || !currentAnswer.firstChoice}
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'View Results' : 'Next'}
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz

