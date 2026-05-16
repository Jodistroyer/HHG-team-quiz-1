import { useEffect, useMemo, useState } from 'react'
import type { QuizSelectedContextId } from '../Quiz/QuizIntro'
import { loadPersistedQuizState, QUIZ_UPDATED_EVENT } from '../Quiz/quizResumeContext'
import { QUIZ_SECTIONS as sections } from '../Quiz/quizSections'
import type { QuizAnswer as Answer } from '../Quiz/quizSections'
import { calculateSectionScoresDetailed } from '../Quiz/quizScoring'
import { getBrainCombination } from '../Quiz/SectionResults/utils'
import { OVERALL_ARCHETYPES } from '../Quiz/overallArchetypes'
import type { BrainType, FlowContextId } from './flowsData'
import type { FlowsBrainProfile } from './flowsTypes'
import { FLOWS_RECOMMENDED_PLACEHOLDER_BRAIN_PROFILE } from './flowsTypes'

export function loadQuizAnswersFromStorage (): {
  answers: Record<string, Answer>
  quizCompletedAt: string | null
  selectedContextIds: QuizSelectedContextId[]
  completedWithContextIds: QuizSelectedContextId[]
} {
  const state = loadPersistedQuizState()
  return {
    answers: state.answers,
    quizCompletedAt: state.quizCompletedAt,
    selectedContextIds: state.selectedContextIds,
    completedWithContextIds: state.completedWithContextIds,
  }
}

function computeOverallPercents (
  answers: Record<string, Answer>,
  completedWithContextIds: QuizSelectedContextId[]
): { headPercent: number; heartPercent: number; gutPercent: number } | null {
  const selectedSections = sections.filter((s) =>
    completedWithContextIds.includes(s.id as QuizSelectedContextId)
  )
  if (selectedSections.length === 0) return null

  const calculateSectionScores = (sectionId: number) =>
    calculateSectionScoresDetailed(sectionId, answers, sections)

  let totalHead = 0
  let totalHeart = 0
  let totalGut = 0
  let totalSecondary = 0

  selectedSections.forEach((section) => {
    const scores = calculateSectionScores(section.id)
    totalHead += scores.headPoints
    totalHeart += scores.heartPoints
    totalGut += scores.gutPoints
    totalSecondary += section.questions.filter((q) => answers[q.id]?.secondChoice).length
  })

  const questionsInFullSelection = selectedSections.flatMap((s) => s.questions)
  const answeredPrimary = questionsInFullSelection.filter((q) => answers[q.id]?.firstChoice).length
  const totalPoints = answeredPrimary + totalSecondary * 0.5
  if (totalPoints <= 0) return null

  const headPercent = (totalHead / totalPoints) * 100
  const heartPercent = (totalHeart / totalPoints) * 100
  const gutPercent = (totalGut / totalPoints) * 100

  return { headPercent, heartPercent, gutPercent }
}

export interface FlowsQuizSnapshot {
  hasCompletedQuiz: boolean
  combo: { label: string; colors: string[] } | null
  archetypeName: string | null
}

/** Every question in the quiz section has a primary (first) choice — same bar as advancing the quiz. */
export function isQuizSectionCompleteForFlows (
  quizSectionId: FlowContextId,
  answers: Record<string, Answer>
): boolean {
  const section = sections[quizSectionId - 1]
  if (!section) return false
  return section.questions.every((q) => answers[q.id]?.firstChoice != null)
}

/** Flow contexts (quiz sections 1–4) the user has fully answered. */
export function getCompletedFlowContextIdsFromStorage (): FlowContextId[] {
  const { answers } = loadQuizAnswersFromStorage()
  const out: FlowContextId[] = []
  for (const id of [1, 2, 3, 4] as const) {
    if (isQuizSectionCompleteForFlows(id, answers)) out.push(id)
  }
  return out
}

export function readFlowsQuizSnapshot (): FlowsQuizSnapshot {
  const { answers, quizCompletedAt, completedWithContextIds } = loadQuizAnswersFromStorage()
  const hasCompletedQuiz = quizCompletedAt != null && quizCompletedAt.length > 0

  if (!hasCompletedQuiz) {
    return { hasCompletedQuiz: false, combo: null, archetypeName: null }
  }

  const percents = computeOverallPercents(answers, completedWithContextIds)
  if (!percents) {
    return { hasCompletedQuiz: true, combo: null, archetypeName: null }
  }

  const combo = getBrainCombination(percents.headPercent, percents.heartPercent, percents.gutPercent)
  const archetypeName = OVERALL_ARCHETYPES[combo.label]?.archetype ?? null

  return { hasCompletedQuiz: true, combo, archetypeName }
}

export function comboLabelToFlowsBrainProfile (label: string): FlowsBrainProfile {
  const balanced = label.replace(/\s+/g, ' ').trim()
  if (balanced === 'Head + Heart + Gut') {
    return { dominant: 'Head', secondary: 'Heart', tertiary: 'Gut' }
  }
  if (balanced.endsWith('Strong')) {
    const token = balanced.replace(/\s*Strong\s*$/i, '').trim()
    if (token === 'Head' || token === 'Heart' || token === 'Gut') {
      return { dominant: token, secondary: null }
    }
  }
  const parts = balanced.split(/\s*\+\s*/).map((p) => p.trim()).filter(Boolean)
  if (parts.length === 2) {
    const a = parts[0] as BrainType
    const b = parts[1] as BrainType
    if (
      (a === 'Head' || a === 'Heart' || a === 'Gut') &&
      (b === 'Head' || b === 'Heart' || b === 'Gut')
    ) {
      return { dominant: a, secondary: b }
    }
  }
  return FLOWS_RECOMMENDED_PLACEHOLDER_BRAIN_PROFILE
}

/**
 * Section brain combo → Flows detail profile (same percents + `getBrainCombination` as section results).
 */
export function flowsBrainProfileForQuizContext (
  contextId: FlowContextId,
  answers: Record<string, Answer>
): FlowsBrainProfile {
  if (!isQuizSectionCompleteForFlows(contextId, answers)) {
    return FLOWS_RECOMMENDED_PLACEHOLDER_BRAIN_PROFILE
  }
  const scores = calculateSectionScoresDetailed(contextId, answers, sections)
  if (scores.totalPoints <= 0) {
    return FLOWS_RECOMMENDED_PLACEHOLDER_BRAIN_PROFILE
  }
  const combo = getBrainCombination(scores.headPercent, scores.heartPercent, scores.gutPercent)
  return comboLabelToFlowsBrainProfile(combo.label)
}

export function flowsBrainProfileForStoredContext (contextId: FlowContextId): FlowsBrainProfile {
  const { answers } = loadQuizAnswersFromStorage()
  return flowsBrainProfileForQuizContext(contextId, answers)
}

/** Section combo label (e.g. "Gut Strong") when that quiz context is complete. */
export function flowsContextComboLabelForStoredContext (contextId: FlowContextId): string | null {
  const { answers } = loadQuizAnswersFromStorage()
  if (!isQuizSectionCompleteForFlows(contextId, answers)) return null
  const scores = calculateSectionScoresDetailed(contextId, answers, sections)
  if (scores.totalPoints <= 0) return null
  return getBrainCombination(scores.headPercent, scores.heartPercent, scores.gutPercent).label
}

export function recommendedBrainProfileFromSnapshot (snap: FlowsQuizSnapshot): FlowsBrainProfile {
  if (snap.hasCompletedQuiz && snap.combo) {
    return comboLabelToFlowsBrainProfile(snap.combo.label)
  }
  return FLOWS_RECOMMENDED_PLACEHOLDER_BRAIN_PROFILE
}

export function useFlowsQuizSnapshot (): FlowsQuizSnapshot {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const bump = () => setTick((n) => n + 1)
    window.addEventListener('storage', bump)
    window.addEventListener('focus', bump)
    window.addEventListener(QUIZ_UPDATED_EVENT, bump)
    return () => {
      window.removeEventListener('storage', bump)
      window.removeEventListener('focus', bump)
      window.removeEventListener(QUIZ_UPDATED_EVENT, bump)
    }
  }, [])
  return useMemo(() => readFlowsQuizSnapshot(), [tick])
}
