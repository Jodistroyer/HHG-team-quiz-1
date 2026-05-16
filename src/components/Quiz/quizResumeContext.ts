import type { QuizSelectedContextId } from './QuizIntro'
import { QUIZ_SECTIONS as sections, type QuizAnswer as Answer } from './quizSections'

const QUIZ_STORAGE_KEY = 'hhg.quiz.v2'

export const QUIZ_UPDATED_EVENT = 'hhg.quiz.updated'

export interface PersistedQuizState {
  currentQuestionIndex: number
  answers: Record<string, Answer>
  showFinalSummary: boolean
  quizCompletedAt: string | null
  selectedContextIds: QuizSelectedContextId[]
  introDismissed: boolean
  addContextSectionId: QuizSelectedContextId | null
  /** Contexts included when the user first completed the quiz (or later finished an add-context session). */
  completedWithContextIds: QuizSelectedContextId[]
}

function isQuizSelectedContextId (n: unknown): n is QuizSelectedContextId {
  return n === 1 || n === 2 || n === 3 || n === 4
}

function sortContextIds (ids: QuizSelectedContextId[]): QuizSelectedContextId[] {
  return [...ids].sort((a, b) => a - b)
}

function migrateCompletedWithContextIds (
  parsed: {
    completedWithContextIds?: unknown
    quizCompletedAt?: string | null
    selectedContextIds?: QuizSelectedContextId[]
    addContextSectionId?: QuizSelectedContextId | null
  },
  selectedContextIds: QuizSelectedContextId[]
): QuizSelectedContextId[] {
  if (Array.isArray(parsed.completedWithContextIds)) {
    return parsed.completedWithContextIds.filter((x): x is QuizSelectedContextId => isQuizSelectedContextId(x))
  }
  if (typeof parsed.quizCompletedAt !== 'string' || !parsed.quizCompletedAt) {
    return []
  }
  if (parsed.addContextSectionId != null) {
    return selectedContextIds.filter((id) => id !== parsed.addContextSectionId)
  }
  return [...selectedContextIds]
}

export function loadPersistedQuizState (): PersistedQuizState {
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
        completedWithContextIds: [],
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
      completedWithContextIds?: unknown
    }

    const selectedContextIds = Array.isArray(parsed.selectedContextIds)
      ? parsed.selectedContextIds.filter((x): x is QuizSelectedContextId => isQuizSelectedContextId(x))
      : []

    return {
      currentQuestionIndex:
        typeof parsed.currentQuestionIndex === 'number' && parsed.currentQuestionIndex >= 0
          ? parsed.currentQuestionIndex
          : 0,
      answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {},
      showFinalSummary: typeof parsed.showFinalSummary === 'boolean' ? parsed.showFinalSummary : false,
      quizCompletedAt: typeof parsed.quizCompletedAt === 'string' ? parsed.quizCompletedAt : null,
      selectedContextIds,
      introDismissed: typeof parsed.introDismissed === 'boolean' ? parsed.introDismissed : false,
      addContextSectionId: isQuizSelectedContextId(parsed.addContextSectionId)
        ? parsed.addContextSectionId
        : null,
      completedWithContextIds: migrateCompletedWithContextIds(parsed, selectedContextIds),
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
      completedWithContextIds: [],
    }
  }
}

function writePersistedQuizState (state: PersistedQuizState): void {
  try {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state))
    window.dispatchEvent(new Event(QUIZ_UPDATED_EVENT))
  } catch {
    // ignore storage failures
  }
}

/** True when this HHG context was committed in a completed quiz run (initial or finished add-context). */
export function isQuizContextCommittedToResults (
  contextId: QuizSelectedContextId,
  completedWithContextIds: QuizSelectedContextId[]
): boolean {
  return completedWithContextIds.includes(contextId)
}

/**
 * True when the user should see “Add this context” UX (not in committed results yet).
 * Replaces checking `selectedContextIds` only — partial add-context attempts are not committed.
 */
export function isQuizContextNotInCurrentRun (
  contextId: QuizSelectedContextId,
  completedWithContextIds: QuizSelectedContextId[]
): boolean {
  return !isQuizContextCommittedToResults(contextId, completedWithContextIds)
}

export function finishContextButtonLabel (
  contextId: QuizSelectedContextId,
  completedWithContextIds: QuizSelectedContextId[]
): 'Add this context' | 'Finish this context' {
  return isQuizContextNotInCurrentRun(contextId, completedWithContextIds)
    ? 'Add this context'
    : 'Finish this context'
}

export function countRemainingQuizQuestionsInSection (
  sectionId: QuizSelectedContextId,
  answers: Record<string, Answer>
): number {
  const sec = sections.find((s) => s.id === sectionId)
  if (!sec) return 0
  return sec.questions.filter((q) => answers[q.id]?.firstChoice == null).length
}

/** User is mid add-context quiz (single-sitting flow); leaving should warn and discard partial answers. */
export function isInProgressAddContextQuiz (state?: PersistedQuizState): boolean {
  const s = state ?? loadPersistedQuizState()
  return s.addContextSectionId != null && s.quizCompletedAt != null
}

/**
 * Discard an in-progress add-context session and restore prior quiz results.
 * No-op when not in add-context flow.
 */
export function abandonInProgressAddContext (): void {
  const state = loadPersistedQuizState()
  const sectionId = state.addContextSectionId
  if (sectionId == null) return

  const sec = sections.find((s) => s.id === sectionId)
  const wasAddedThisSession = !state.completedWithContextIds.includes(sectionId)

  const nextAnswers = { ...state.answers }
  if (sec && wasAddedThisSession) {
    for (const q of sec.questions) {
      delete nextAnswers[q.id]
    }
  }

  const nextSelected = wasAddedThisSession
    ? state.selectedContextIds.filter((id) => id !== sectionId)
    : state.selectedContextIds

  writePersistedQuizState({
    ...state,
    answers: nextAnswers,
    selectedContextIds: nextSelected,
    addContextSectionId: null,
    showFinalSummary: state.quizCompletedAt != null,
    currentQuestionIndex: 0,
  })
}

/**
 * Same persisted state as Quiz results “Add / Finish this context” (see `Quiz.tsx` `onResumeQuizContext`).
 * @returns false when the section is missing or already fully answered.
 */
export function persistResumeQuizContext (sectionId: QuizSelectedContextId): boolean {
  const state = loadPersistedQuizState()
  const sec = sections.find((s) => s.id === sectionId)
  if (!sec) return false

  const firstUnansweredId = sec.questions
    .map((q) => q.id)
    .find((id) => state.answers[id]?.firstChoice == null)
  if (firstUnansweredId == null) return false

  const alreadyInRun = state.completedWithContextIds.includes(sectionId)
  const nextIds: QuizSelectedContextId[] = state.selectedContextIds.includes(sectionId)
    ? state.selectedContextIds
    : sortContextIds([...state.selectedContextIds, sectionId])

  const flowSections = alreadyInRun
    ? sections.filter((s) => nextIds.includes(s.id as QuizSelectedContextId))
    : [sec]
  const flowQuestions = flowSections.flatMap((s) => s.questions)
  const idx = flowQuestions.findIndex((q) => q.id === firstUnansweredId)
  if (idx < 0) return false

  writePersistedQuizState({
    ...state,
    selectedContextIds: nextIds,
    showFinalSummary: false,
    addContextSectionId: alreadyInRun ? null : sectionId,
    currentQuestionIndex: idx,
    introDismissed: state.introDismissed || state.quizCompletedAt != null,
  })
  return true
}

export function loadQuizResumeUiState (): {
  selectedContextIds: QuizSelectedContextId[]
  completedWithContextIds: QuizSelectedContextId[]
  answers: Record<string, Answer>
} {
  const state = loadPersistedQuizState()
  return {
    selectedContextIds: state.selectedContextIds,
    completedWithContextIds: state.completedWithContextIds,
    answers: state.answers,
  }
}
