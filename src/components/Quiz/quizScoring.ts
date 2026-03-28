import type { QuizAnswer, QuizAnswerType, QuizSection } from './quizSections'
import { QUIZ_SECTIONS } from './quizSections'

/** First-choice weights per question for tie-breaking within a section (matches Quiz.tsx). */
const SECTION_QUESTION_WEIGHTS: Record<string, Record<string, number>> = {
  '1': { '1-1': 1.1, '1-2': 1.0, '1-3': 1.0, '1-4': 1.0, '1-5': 1.0 },
  '2': { '2-1': 1.1, '2-2': 1.0, '2-3': 1.0, '2-4': 1.0, '2-5': 1.0 },
  '3': { '3-1': 1.0, '3-2': 1.1, '3-3': 1.0, '3-4': 1.0, '3-5': 1.0 },
  '4': { '4-1': 1.0, '4-2': 1.0, '4-3': 1.0, '4-4': 1.0, '4-5': 1.1 },
}

export interface SectionScoresDetailed {
  headPoints: number
  heartPoints: number
  gutPoints: number
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: QuizAnswerType
  secondaryBrain: QuizAnswerType | null
  totalPoints: number
}

export function calculateSectionScoresDetailed (
  sectionId: number,
  answers: Record<string, QuizAnswer>,
  allSections: QuizSection[] = QUIZ_SECTIONS
): SectionScoresDetailed {
  const section = allSections[sectionId - 1]
  if (!section) {
    return {
      headPoints: 0,
      heartPoints: 0,
      gutPoints: 0,
      headPercent: 0,
      heartPercent: 0,
      gutPercent: 0,
      dominant: 'Head',
      secondaryBrain: null,
      totalPoints: 0,
    }
  }

  const sectionAnswers = section.questions.map((q) => answers[q.id] ?? { firstChoice: null, secondChoice: null })

  let headPoints = 0
  let heartPoints = 0
  let gutPoints = 0

  sectionAnswers.forEach((answer) => {
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

  const totalPoints =
    sectionAnswers.length + sectionAnswers.filter((a) => a.secondChoice).length * 0.5
  const headPercent = totalPoints > 0 ? (headPoints / totalPoints) * 100 : 0
  const heartPercent = totalPoints > 0 ? (heartPoints / totalPoints) * 100 : 0
  const gutPercent = totalPoints > 0 ? (gutPoints / totalPoints) * 100 : 0

  const maxScore = Math.max(headPoints, heartPoints, gutPoints)
  const tiedTypes: QuizAnswerType[] = []
  if (headPoints === maxScore) tiedTypes.push('Head')
  if (heartPoints === maxScore) tiedTypes.push('Heart')
  if (gutPoints === maxScore) tiedTypes.push('Gut')

  let dominant: QuizAnswerType
  if (tiedTypes.length === 1) {
    dominant = tiedTypes[0]!
  } else {
    const weights = SECTION_QUESTION_WEIGHTS[String(sectionId)] ?? {}

    let weightedHead = 0
    let weightedHeart = 0
    let weightedGut = 0

    section.questions.forEach((question) => {
      const answer = answers[question.id]
      const weight = weights[question.id] ?? 1.0

      if (answer?.firstChoice === 'Head') weightedHead += weight
      if (answer?.firstChoice === 'Heart') weightedHeart += weight
      if (answer?.firstChoice === 'Gut') weightedGut += weight
    })

    let maxWeightedSum = -1
    let winner: QuizAnswerType | null = null

    tiedTypes.forEach((type) => {
      const weightedSum =
        type === 'Head' ? weightedHead : type === 'Heart' ? weightedHeart : weightedGut
      if (weightedSum > maxWeightedSum) {
        maxWeightedSum = weightedSum
        winner = type
      }
    })

    dominant =
      winner ??
      (tiedTypes.includes('Head') ? 'Head' : tiedTypes.includes('Heart') ? 'Heart' : 'Gut')
  }

  const scores = [
    { type: 'Head' as QuizAnswerType, points: headPoints },
    { type: 'Heart' as QuizAnswerType, points: heartPoints },
    { type: 'Gut' as QuizAnswerType, points: gutPoints },
  ]
    .filter((s) => s.type !== dominant)
    .sort((a, b) => b.points - a.points)

  const secondaryBrain = scores.length > 0 && scores[0]!.points > 0 ? scores[0]!.type : null

  return {
    headPoints,
    heartPoints,
    gutPoints,
    headPercent,
    heartPercent,
    gutPercent,
    dominant,
    secondaryBrain,
    totalPoints,
  }
}
