import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faBriefcase, faPeopleGroup, faChartLine } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import './Quiz.css'
import { QuizResults } from './QuizResults'

const SECTION_ICONS: Record<number, IconDefinition> = {
  1: faFire,        // Under Pressure
  2: faBriefcase,   // Doing Work
  3: faPeopleGroup, // With People
  4: faChartLine    // Getting Better
}

type AnswerType = 'Head' | 'Heart' | 'Gut'

interface Question {
  id: string
  text: string
  options: {
    label: string
    type: AnswerType
  }[]
}

interface Answer {
  firstChoice: AnswerType | null
  secondChoice: AnswerType | null
}

interface Section {
  id: number
  title: string
  questions: Question[]
}

const sections: Section[] = [
  {
    id: 1,
    title: 'Under Pressure',
    questions: [
      {
        "id": "1-1",
        "text": "Something went wrong. First step?",
        "options": [
          { label: "Analyze • Diagnose • Think", "type": "Head" },
          { label: "Check people • Feel • Sense impact", "type": "Heart" },
          { label: "Act • Trust gut • Try", "type": "Gut" }
        ]
      },
      {
        id: '1-2',
        text: "You're unsure about the right move. What do you lean on?",
        options: [
          { label: 'Logic • Frameworks • Proven thinking', type: 'Head' },
          { label: 'Values • Feeling • Relationships', type: 'Heart' },
          { label: 'Instinct • Commitment • Forward motion', type: 'Gut' }
        ]
      },
      {
        "id": "1-3",
        "text": "Someone criticizes your idea. First reaction?",
        "options": [
          { label: 'Evidence • Reason • Clarity', type: 'Head' },
          { label: "Hurt • Feel • Connect", "type": "Heart" },
          { label: "React • Defend • Act", "type": "Gut" }
        ]
      },
      {
        "id": "1-4",
        "text": "Under Pressure You:",
        "options": [
          { label: "Clarify • Structure • Control", "type": "Head" },
          { label: "Notice • Sense • Connect", "type": "Heart" },
          { label: "Push • Assert • Take charge", "type": "Gut" }
        ]
      },      
      {
        "id": "1-5",
        "text": "Decide with incomplete info. Your response?",
        "options": [
          { label: "Analyze • Gather • Plan", "type": "Head" },
          { label: "Notice • Sense • Connect", "type": "Heart" },
          { label: "Act • Adjust later • Move ahead", "type": "Gut" }
        ]
      }
      
    ]
  },
  {
    id: 2,
    title: 'Doing Work',
    questions: [
      {
        id: '2-1',
        text: "Starting a big project, your first focus?",
        options: [
          { label: 'Planning • Steps • Clear Metrics', type: 'Head' },
          { label: 'Alignment • Shared Vision • Buy-in', type: 'Heart' },
          { label: 'Get Started • Momentum • Learn By Doing', type: 'Gut' }
        ]
      },
      {
        id: '2-2',
        text: "Choosing between two options, what matters most?",
        options: [
          { label: 'Accuracy • Reliability • Being correct', type: 'Head' },
          { label: 'Collaboration • Shared purpose • People', type: 'Heart' },
          { label: 'Momentum • Opportunity • Progress', type: 'Gut' }
        ]
      },
      {
        id: '2-3',
        text: "Deciding What To Work On Next. How Do You Choose?",
        options: [
          { label: 'Impact • Plan • Priority', type: 'Head' },
          { label: 'People • Care • Values', type: 'Heart' },
          { label: 'Action • Speed • Flow', type: 'Gut' }
        ]
      },
      {
        id: '2-4',
        text: 'A deadline is coming up. What gives you confidence?',
        options: [
          { label: 'Prepared • Organized • Clear', type: 'Head' },
          { label: 'Supported • Connected • Committed', type: 'Heart' },
          { label: 'Drive • Momentum • Grit', type: 'Gut' }
        ]
      },
      {
        id: '2-5',
        text: "You're preparing for something important. What feels most critical?",
        options: [
          { label: 'Backup plans • Risk coverage', type: 'Head' },
          { label: 'Atmosphere • Energy • How people feel', type: 'Heart' },
          { label: 'Resources • Readiness • Handling issues', type: 'Gut' }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'With People',
    questions: [
      {
        id: '3-1',
        text: 'People are arguing. What stands out most?',
        options: [
          { label: 'Logic • Flaws • Mistakes', type: 'Head' },
          { label: 'Hurt • Connection • Feelings', type: 'Heart' },
          { label: 'Chaos • Tension • Control', type: 'Gut' }
        ]
      },
      {
        id: '3-2',
        text: 'Someone has a very different opinion. What hits you first?',
        options: [
          { label: 'Analyze assumptions • Check reasoning', type: 'Head' },
          { label: 'Try to understand perspective', type: 'Heart' },
          { label: 'Immediate yes/no feeling', type: 'Gut' }
        ]
      },
      {
        id: '3-3',
        text: 'In group settings, what do you naturally contribute?',
        options: [
          { label: 'Clarifying ideas • Structuring discussion', type: 'Head' },
          { label: 'Supporting others • Smoothing tension', type: 'Heart' },
          { label: 'Leading action • Making decisions', type: 'Gut' }
        ]
      },
      {
        id: '3-4',
        text: 'You made a mistake. How does your mind respond first?',
        options: [
          { label: 'Figure out what went wrong and fix it', type: 'Head' },
          { label: 'Think about who was affected', type: 'Heart' },
          { label: 'Move on quickly and refocus', type: 'Gut' }
        ]
      },
      {
        id: '3-5',
        text: 'When you think about past experiences, what do you dwell on most?',
        options: [
          { label: 'What would have been the smarter choice', type: 'Head' },
          { label: 'How it felt and what it meant', type: 'Heart' },
          { label: "What I'd do differently next time", type: 'Gut' }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Getting Better',
    questions: [
      {
        id: '4-1',
        text: 'In conversations, what do you pay attention to most?',
        options: [
          { label: 'Accuracy • Details • How things work', type: 'Head' },
          { label: 'Stories • Motivations • Feelings', type: 'Heart' },
          { label: 'Outcomes • Actions • What\'s next', type: 'Gut' }
        ]
      },
      {
        id: '4-2',
        text: 'When learning something new, what helps you most?',
        options: [
          { label: 'Clear models • Systems • Principles', type: 'Head' },
          { label: 'Real stories • Human examples', type: 'Heart' },
          { label: 'Trying it myself • Hands-on', type: 'Gut' }
        ]
      },
      {
        id: '4-3',
        text: 'What does "success" mean most to you?',
        options: [
          { label: 'Mastery • Competence • Expertise', type: 'Head' },
          { label: 'Strong relationships • Belonging', type: 'Heart' },
          { label: 'Progress • Independence • Results', type: 'Gut' }
        ]
      },
      {
        id: '4-4',
        text: 'After finishing a big project, what do you judge it by first?',
        options: [
          { label: 'Whether it met the original standards', type: 'Head' },
          { label: 'How people felt during the process', type: 'Heart' },
          { label: 'How decisively it was executed', type: 'Gut' }
        ]
      },
      {
        id: '4-5',
        text: "When you're given a lot of new information, what do you do first?",
        options: [
          { label: 'Organize and make sense of it', type: 'Head' },
          { label: 'Look for meaning or relevance', type: 'Heart' },
          { label: 'Pull out what I can use right away', type: 'Gut' }
        ]
      }
    ]
  }
]

const QUIZ_STORAGE_KEY = 'hhg.quiz.v1'

function loadSavedQuizState(): {
  currentQuestionIndex: number
  answers: Record<string, Answer>
  showFinalSummary: boolean
} {
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY)
    if (!raw) {
      return { currentQuestionIndex: 0, answers: {}, showFinalSummary: false }
    }
    const parsed = JSON.parse(raw) as {
      currentQuestionIndex?: number
      answers?: Record<string, Answer>
      showFinalSummary?: boolean
    }

    return {
      currentQuestionIndex:
        typeof parsed.currentQuestionIndex === 'number' && parsed.currentQuestionIndex >= 0
          ? parsed.currentQuestionIndex
          : 0,
      answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {},
      showFinalSummary: typeof parsed.showFinalSummary === 'boolean' ? parsed.showFinalSummary : false
    }
  } catch {
    return { currentQuestionIndex: 0, answers: {}, showFinalSummary: false }
  }
}

function Quiz() {
  const saved = loadSavedQuizState()

  // Initialize synchronously from localStorage so switching tabs doesn't "flash" the quiz start state.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(saved.currentQuestionIndex)
  const [answers, setAnswers] = useState<Record<string, Answer>>(saved.answers)
  const [showFinalSummary, setShowFinalSummary] = useState(saved.showFinalSummary)

  // Persist progress + completion state.
  useEffect(() => {
    try {
      const payload = {
        currentQuestionIndex,
        answers,
        showFinalSummary
      }
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // ignore storage failures
    }
  }, [currentQuestionIndex, answers, showFinalSummary])

  const clearSavedQuiz = () => {
    try {
      localStorage.removeItem(QUIZ_STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  const allQuestions = sections.flatMap(section => section.questions)
  const currentQuestion = allQuestions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestion.id] || { firstChoice: null, secondChoice: null }
  const questionSection = sections.find(s => s.questions.some(q => q.id === currentQuestion.id))
  

  const totalQuestions = allQuestions.length

  // Configurable weights for tie-breaking within each section (first choice only)
  // Adjust these weights to ensure no ties - at least one weight should differ
  const sectionQuestionWeights: Record<string, Record<string, number>> = {
    // Section 1: Under Pressure
    '1': {
      '1-1': 1.1,  // Q1
      '1-2': 1.0,  // Q2
      '1-3': 1.0,  // Q3
      '1-4': 1.0,  // Q4
      '1-5': 1.0   // Q5
    },
    // Section 2: Doing Work
    '2': {
      '2-1': 1.1,  // Q1
      '2-2': 1.0,  // Q2
      '2-3': 1.0,  // Q3
      '2-4': 1.0,  // Q4
      '2-5': 1.0   // Q5
    },
    // Section 3: With People
    '3': {
      '3-1': 1.0,  // Q1
      '3-2': 1.1,  // Q2
      '3-3': 1.0,  // Q3
      '3-4': 1.0,  // Q4
      '3-5': 1.0   // Q5
    },
    // Section 4: Getting Better
    '4': {
      '4-1': 1.0,  // Q1
      '4-2': 1.0,  // Q2
      '4-3': 1.0,  // Q3
      '4-4': 1.0,  // Q4
      '4-5': 1.1   // Q5
    }
  }

  const calculateSectionScores = (sectionId: number) => {
    const section = sections[sectionId - 1]
    const sectionAnswers = section.questions.map(q => answers[q.id] || { firstChoice: null, secondChoice: null })
    
    let headPoints = 0
    let heartPoints = 0
    let gutPoints = 0

    sectionAnswers.forEach(answer => {
      if (answer.firstChoice) {
        if (answer.firstChoice === 'Head') headPoints += 1
        if (answer.firstChoice === 'Heart') heartPoints += 1
        if (answer.firstChoice === 'Gut') gutPoints += 1
      }
      if (answer.secondChoice) {
        if (answer.secondChoice === 'Head') headPoints += 0.5
        if (answer.secondChoice === 'Heart') heartPoints += 0.5
        if (answer.secondChoice === 'Gut') gutPoints += 0.5
      }
    })

    const totalPoints = sectionAnswers.length + sectionAnswers.filter(a => a.secondChoice).length * 0.5
    const headPercent = totalPoints > 0 ? (headPoints / totalPoints) * 100 : 0
    const heartPercent = totalPoints > 0 ? (heartPoints / totalPoints) * 100 : 0
    const gutPercent = totalPoints > 0 ? (gutPoints / totalPoints) * 100 : 0

    // Determine dominant type with weighted tie-breaking
    const maxScore = Math.max(headPoints, heartPoints, gutPoints)
    const tiedTypes: AnswerType[] = []
    if (headPoints === maxScore) tiedTypes.push('Head')
    if (heartPoints === maxScore) tiedTypes.push('Heart')
    if (gutPoints === maxScore) tiedTypes.push('Gut')

    let dominant: AnswerType
    if (tiedTypes.length === 1) {
      // No tie, use the single highest score
      dominant = tiedTypes[0]
    } else {
      // Tie exists - break it using weighted first choice selections
      const weights = sectionQuestionWeights[String(sectionId)] || {}
      
      let weightedHead = 0
      let weightedHeart = 0
      let weightedGut = 0

      section.questions.forEach(question => {
        const answer = answers[question.id]
        const weight = weights[question.id] || 1.0
        
        if (answer?.firstChoice === 'Head') weightedHead += weight
        if (answer?.firstChoice === 'Heart') weightedHeart += weight
        if (answer?.firstChoice === 'Gut') weightedGut += weight
      })

      // Among tied types, find the one with highest weighted sum
      // Because weights are non-identical, exact ties are mathematically impossible
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

      dominant = winner || (tiedTypes.includes('Head') ? 'Head' :
                           tiedTypes.includes('Heart') ? 'Heart' : 'Gut')
    }

    // Calculate secondary brain (second highest score, excluding dominant)
    const scores = [
      { type: 'Head' as AnswerType, points: headPoints },
      { type: 'Heart' as AnswerType, points: heartPoints },
      { type: 'Gut' as AnswerType, points: gutPoints }
    ].filter(s => s.type !== dominant).sort((a, b) => b.points - a.points)
    
    const secondaryBrain = scores.length > 0 && scores[0].points > 0 ? scores[0].type : null

    return { headPoints, heartPoints, gutPoints, headPercent, heartPercent, gutPercent, dominant, secondaryBrain, totalPoints }
  }

  const calculateOverallScores = () => {
    let totalHead = 0
    let totalHeart = 0
    let totalGut = 0
    let totalSecondary = 0

    sections.forEach((section) => {
      const scores = calculateSectionScores(section.id)
      totalHead += scores.headPoints
      totalHeart += scores.heartPoints
      totalGut += scores.gutPoints
      totalSecondary += section.questions.filter(q => answers[q.id]?.secondChoice).length
    })

    const totalPoints = 20 + totalSecondary * 0.5
    const headPercent = (totalHead / totalPoints) * 100
    const heartPercent = (totalHeart / totalPoints) * 100
    const gutPercent = (totalGut / totalPoints) * 100

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
      // Tie exists - break it using weighted first choice selections from "Under Pressure" section (section 1)
      const pressureSection = sections[0] // Section 1: "Under Pressure"
      
      // Define weights for each question: Q1 = 1.05, Q3 = 0.95, Q2/Q4/Q5 = 1.0
      const questionWeights: Record<string, number> = {
        '1-1': 1.1, // Q1
        '1-2': 1.0,  // Q2
        '1-3': 1.0, // Q3
        '1-4': 1.0,  // Q4
        '1-5': 1.0   // Q5
      }

      // Calculate weighted sums for each brain type (only first choices)
      let weightedHead = 0
      let weightedHeart = 0
      let weightedGut = 0

      pressureSection.questions.forEach(question => {
        const answer = answers[question.id]
        const weight = questionWeights[question.id] || 1.0
        
        if (answer?.firstChoice === 'Head') weightedHead += weight
        if (answer?.firstChoice === 'Heart') weightedHeart += weight
        if (answer?.firstChoice === 'Gut') weightedGut += weight
      })

      // Among tied types, find the one with highest weighted sum in "Under Pressure"
      // Because weights are non-identical, exact ties are mathematically impossible
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

      dominant = winner || (tiedTypes.includes('Head') ? 'Head' :
                           tiedTypes.includes('Heart') ? 'Heart' : 'Gut')
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

  if (showFinalSummary) {
    const overall = calculateOverallScores()
    const sectionSummaries = sections.map(section => calculateSectionScores(section.id))

    return (
      <QuizResults
        overall={overall}
        sectionSummaries={sectionSummaries}
        sections={sections}
        answers={answers}
        onStartOver={() => {
          clearSavedQuiz()
          setShowFinalSummary(false)
          setCurrentQuestionIndex(0)
          setAnswers({})
        }}
      />
    )
  }

  // Calculate overall progress (total answered questions / 20)
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
    return questionSection.id - 1
  }

  // Get section color
  const getSectionColor = () => {
    return '#7d3dbd'
  }

  // Get options in the correct order for grid: Head (top-left), Heart (top-right), Gut (bottom-left)
  const getOrderedOptions = () => {
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
    <div className="app">
      <div className="container">
        <div className="question-container">
          {/* Horizontal Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar-wrapper">
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
                      Section {currentSectionIndex + 1} of {sections.length}
                    </div>
                  </>
                )}
              </div>
              
              <div className="progress-bar">
                {/* Overall progress fill */}
                <div 
                  className="progress-bar-overall-fill"
                  style={{
                    width: `${overallProgress}%`
                  }}
                />
                
                {/* Section segments */}
                {sections.map((section, sectionIdx) => {
                  const sectionStart = (sectionIdx / sections.length) * 100
                  const sectionWidth = 100 / sections.length
                  const isCurrentSection = sectionIdx === currentSectionIndex
                  const sectionColor = getSectionColor()
                  
                  return (
                    <div
                      key={section.id}
                      className={`progress-segment ${isCurrentSection ? 'current' : ''}`}
                      style={{
                        left: `${sectionStart}%`,
                        width: `${sectionWidth}%`,
                        backgroundColor: `${sectionColor}15`
                      }}
                    >
                      {isCurrentSection && (
                        <div 
                          className="progress-segment-indicator"
                          style={{
                            width: `${sectionProgress}%`,
                            background: sectionColor
                          }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="progress-bar-counter">
              {currentQuestionIndex + 1}/{totalQuestions}
            </div>
          </div>

          <h2 className="question-text">
            <span className="question-text-inner">{currentQuestion.text}</span>
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
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
            >
              <span className="btn-icon">←</span>
              Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!currentAnswer.firstChoice) return

                const isLastQuestion = currentQuestionIndex === totalQuestions - 1

                if (isLastQuestion) {
                  setShowFinalSummary(true)
                } else {
                  setCurrentQuestionIndex(prev => prev + 1)
                }
              }}
              disabled={!currentAnswer.firstChoice}
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

