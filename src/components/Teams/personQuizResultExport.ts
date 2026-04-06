import type { Person, TeamContextKey } from './PeoplePanel/types'
import { getBrainCombination } from '../Quiz/SectionResults/utils'
import { QUIZ_SECTIONS, type QuizAnswer, type QuizAnswerType } from '../Quiz/quizSections'
import { calculateSectionScoresDetailed } from '../Quiz/quizScoring'

const CONTEXT_BY_SECTION: TeamContextKey[] = [
  'underPressure',
  'doingWork',
  'withPeople',
  'gettingBetter',
]

function getSectionPercents (person: Person, sectionIndex: number): {
  headPercent: number
  heartPercent: number
  gutPercent: number
} {
  const key = CONTEXT_BY_SECTION[sectionIndex]
  const ctx = key ? person.contextScores?.[key] : undefined
  if (ctx) {
    return {
      headPercent: ctx.headPercent,
      heartPercent: ctx.heartPercent,
      gutPercent: ctx.gutPercent,
    }
  }
  return {
    headPercent: person.headPercent,
    heartPercent: person.heartPercent,
    gutPercent: person.gutPercent,
  }
}

function dominantSecondaryFromPoints (
  headPoints: number,
  heartPoints: number,
  gutPoints: number
): { dominant: QuizAnswerType; secondaryBrain: QuizAnswerType | null } {
  const rows = [
    { type: 'Head' as const, p: headPoints },
    { type: 'Heart' as const, p: heartPoints },
    { type: 'Gut' as const, p: gutPoints },
  ].sort((a, b) => b.p - a.p)
  const dominant = rows[0]!.type
  const second = rows[1]!
  const secondaryBrain = second.p > 0 ? second.type : null
  return { dominant, secondaryBrain }
}

/** When there are no per-question answers, approximate points from context % (7.5 pt scale per section). */
function syntheticPointsFromPercents (
  headPercent: number,
  heartPercent: number,
  gutPercent: number
): { headPoints: number; heartPoints: number; gutPoints: number; totalPoints: number } {
  const totalPoints = 7.5
  const headPoints = Math.round((headPercent / 100) * totalPoints * 100) / 100
  const heartPoints = Math.round((heartPercent / 100) * totalPoints * 100) / 100
  const gutPoints = Math.round((gutPercent / 100) * totalPoints * 100) / 100
  return { headPoints, heartPoints, gutPoints, totalPoints }
}

export interface PersonQuizResultDocument {
  exportedAt: string
  /** When the quiz was completed; omitted if unknown (e.g. manual profile only). */
  completedAt?: string
  personId: string
  name: string
  company?: string
  team?: string
  role?: string
  tags: string[]
  naturalDefault: {
    headPercent: number
    heartPercent: number
    gutPercent: number
    combinationLabel: string
  }
  sectionSummaries: Array<{
    sectionId: number
    sectionTitle: string
    headPercent: number
    heartPercent: number
    gutPercent: number
    combinationLabel: string
  }>
  sections: Array<{
    id: number
    title: string
    scores: {
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
    questions: Array<{
      id: string
      text: string
      answer: QuizAnswer
    }>
  }>
}

/**
 * Full quiz-shaped JSON for one person (metadata + section structure).
 * Uses stored `quizAnswers` when present; otherwise section scores come from context % with null answers.
 */
export function buildPersonQuizResultDocument (person: Person): PersonQuizResultDocument {
  const mergedAnswers: Record<string, QuizAnswer> = { ...(person.quizAnswers ?? {}) }
  const exportedAt = new Date().toISOString()
  const overallCombo = getBrainCombination(person.headPercent, person.heartPercent, person.gutPercent)

  const sectionSummaries = QUIZ_SECTIONS.map((sec, idx) => {
    const { headPercent, heartPercent, gutPercent } = getSectionPercents(person, idx)
    const combo = getBrainCombination(headPercent, heartPercent, gutPercent)
    return {
      sectionId: sec.id,
      sectionTitle: sec.title,
      headPercent,
      heartPercent,
      gutPercent,
      combinationLabel: combo.label,
    }
  })

  const sectionsOut = QUIZ_SECTIONS.map((sec, idx) => {
    const hasAnyAnswer = sec.questions.some((q) => mergedAnswers[q.id]?.firstChoice != null)

    const questions = sec.questions.map((q) => ({
      id: q.id,
      text: q.text,
      answer: mergedAnswers[q.id] ?? { firstChoice: null, secondChoice: null },
    }))

    if (hasAnyAnswer) {
      const d = calculateSectionScoresDetailed(sec.id, mergedAnswers, QUIZ_SECTIONS)
      return {
        id: sec.id,
        title: sec.title,
        scores: {
          headPoints: d.headPoints,
          heartPoints: d.heartPoints,
          gutPoints: d.gutPoints,
          headPercent: d.headPercent,
          heartPercent: d.heartPercent,
          gutPercent: d.gutPercent,
          dominant: d.dominant,
          secondaryBrain: d.secondaryBrain,
          totalPoints: d.totalPoints,
        },
        questions,
      }
    }

    const { headPercent, heartPercent, gutPercent } = getSectionPercents(person, idx)
    const pts = syntheticPointsFromPercents(headPercent, heartPercent, gutPercent)
    const { dominant, secondaryBrain } = dominantSecondaryFromPoints(
      pts.headPoints,
      pts.heartPoints,
      pts.gutPoints
    )

    return {
      id: sec.id,
      title: sec.title,
      scores: {
        headPoints: pts.headPoints,
        heartPoints: pts.heartPoints,
        gutPoints: pts.gutPoints,
        headPercent,
        heartPercent,
        gutPercent,
        dominant,
        secondaryBrain,
        totalPoints: pts.totalPoints,
      },
      questions,
    }
  })

  return {
    exportedAt,
    ...(person.quizCompletedAt ? { completedAt: person.quizCompletedAt } : {}),
    personId: person.id,
    name: person.name,
    company: person.company,
    team: person.team,
    role: person.role,
    tags: [...person.tags],
    naturalDefault: {
      headPercent: person.headPercent,
      heartPercent: person.heartPercent,
      gutPercent: person.gutPercent,
      combinationLabel: overallCombo.label,
    },
    sectionSummaries,
    sections: sectionsOut,
  }
}

type QuizResultsOverall = {
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: QuizAnswerType
  secondaryBrain: QuizAnswerType | null
}

type QuizResultsSectionScores = {
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: QuizAnswerType
  secondaryBrain: QuizAnswerType | null
}

/** Props shape for the quiz results screen; built from stored person + QUIZ_SECTIONS. */
export function buildQuizResultsPropsFromPerson (person: Person): {
  overall: QuizResultsOverall
  sectionSummaries: QuizResultsSectionScores[]
  sections: typeof QUIZ_SECTIONS
  answers: Record<string, QuizAnswer>
  quizCompletedAt: string | null
} {
  const doc = buildPersonQuizResultDocument(person)
  const answers: Record<string, QuizAnswer> = {}
  for (const sec of doc.sections) {
    for (const q of sec.questions) {
      answers[q.id] = q.answer
    }
  }
  const sectionSummaries: QuizResultsSectionScores[] = doc.sections.map((s) => ({
    headPercent: s.scores.headPercent,
    heartPercent: s.scores.heartPercent,
    gutPercent: s.scores.gutPercent,
    dominant: s.scores.dominant,
    secondaryBrain: s.scores.secondaryBrain,
  }))
  return {
    overall: {
      headPercent: person.headPercent,
      heartPercent: person.heartPercent,
      gutPercent: person.gutPercent,
      dominant: person.dominant,
      secondaryBrain: person.secondaryBrain,
    },
    sectionSummaries,
    sections: QUIZ_SECTIONS,
    answers,
    quizCompletedAt: person.quizCompletedAt ?? null,
  }
}
