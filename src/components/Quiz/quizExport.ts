import { getBrainCombination } from './SectionResults/utils'

export type QuizAnswerType = 'Head' | 'Heart' | 'Gut'

export interface QuizOverallScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: 'Head' | 'Heart' | 'Gut'
  secondaryBrain: 'Head' | 'Heart' | 'Gut' | null
}

export interface QuizSectionScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: 'Head' | 'Heart' | 'Gut'
  secondaryBrain: 'Head' | 'Heart' | 'Gut' | null
}

export interface QuizSection {
  id: number
  title: string
  questions: { id: string; text: string; options: { label: string; type: QuizAnswerType }[] }[]
}

export interface QuizAnswer {
  firstChoice: QuizAnswerType | null
  secondChoice: QuizAnswerType | null
}

export interface QuizExportPayload {
  exportedAt: string
  naturalDefault: {
    headPercent: number
    heartPercent: number
    gutPercent: number
    combinationLabel: string
  }
  sectionSummaries: Array<{
    sectionId: number | undefined
    sectionTitle: string | undefined
    headPercent: number
    heartPercent: number
    gutPercent: number
    combinationLabel: string
  }>
  sections: Array<{
    id: number
    title: string
    scores: QuizSectionScores | null
    questions: Array<{
      id: string
      text: string
      answer: QuizAnswer
    }>
  }>
  answers: Record<string, QuizAnswer>
  name?: string
}

export function buildQuizExportPayload(
  overall: QuizOverallScores,
  sectionSummaries: QuizSectionScores[],
  sections: QuizSection[],
  answers: Record<string, QuizAnswer>
): QuizExportPayload {
  const combo = getBrainCombination(overall.headPercent, overall.heartPercent, overall.gutPercent)

  return {
    exportedAt: new Date().toISOString(),
    naturalDefault: {
      headPercent: overall.headPercent,
      heartPercent: overall.heartPercent,
      gutPercent: overall.gutPercent,
      combinationLabel: combo.label,
    },
    sectionSummaries: sectionSummaries.map((s, i) => ({
      sectionId: sections[i]?.id,
      sectionTitle: sections[i]?.title,
      headPercent: s.headPercent,
      heartPercent: s.heartPercent,
      gutPercent: s.gutPercent,
      combinationLabel: getBrainCombination(s.headPercent, s.heartPercent, s.gutPercent).label,
    })),
    sections: sections.map((sec, idx) => ({
      id: sec.id,
      title: sec.title,
      scores: sectionSummaries[idx] ?? null,
      questions: sec.questions.map((q) => ({
        id: q.id,
        text: q.text,
        answer: answers[q.id] ?? { firstChoice: null, secondChoice: null },
      })),
    })),
    answers,
  }
}
