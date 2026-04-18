import { useState } from 'react'
import { buildFacts, computeInsights } from './changeResultsLogic'
import { CombinationAcrossContexts } from './CombinationAcrossContexts'
import { WhatStandsOut } from './WhatStandsOut'
import { ResumeContextQuizModal } from './ResumeContextQuizModal'
import './ChangeResults.css'

interface SectionScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

interface SectionForResume {
  id: number
  title: string
  questions: { id: string }[]
}

interface AnswerShape {
  firstChoice: string | null
  secondChoice: string | null
}

interface ChangeResultsProps {
  sectionSummaries: SectionScores[]
  sections: SectionForResume[]
  sectionQuizComplete?: boolean[]
  /** When aligned with `sections`, false means this HHG context is not in the user’s selected quiz run (in-app). */
  sectionIncludedInQuiz?: boolean[]
  answers?: Record<string, AnswerShape>
  onResumeQuizContext?: (sectionId: number) => void
}

function countRemainingInSection (
  section: SectionForResume,
  answers: Record<string, AnswerShape> | undefined
): number {
  if (!answers) return section.questions.length
  return section.questions.filter((q) => !answers[q.id]?.firstChoice).length
}

export function ChangeResults ({
  sectionSummaries,
  sections,
  sectionQuizComplete,
  sectionIncludedInQuiz,
  answers,
  onResumeQuizContext,
}: ChangeResultsProps) {
  const labels = sections.slice(0, 4).map((s) => ({ id: s.id, title: s.title }))
  const facts = buildFacts(sectionSummaries, labels, sectionQuizComplete, sectionIncludedInQuiz)
  const insights = computeInsights(facts)

  const [resumeTarget, setResumeTarget] = useState<{ sectionId: number; variant: 'add' | 'finish' } | null>(null)

  if (facts.rows.length === 0) return null

  const resumeSection =
    resumeTarget != null ? sections.find((s) => s.id === resumeTarget.sectionId) : undefined
  const remainingForModal =
    resumeSection != null ? countRemainingInSection(resumeSection, answers) : 0

  return (
    <div className="change-results-stack">
      <div className="change-results-card change-results-card--combo">
        <CombinationAcrossContexts
          rows={facts.rows}
          sections={sections}
          onRequestResume={(sectionId) => {
            const row = facts.rows.find((r) => r.sectionId === sectionId)
            setResumeTarget({
              sectionId,
              variant: row?.notInCurrentRun ? 'add' : 'finish',
            })
          }}
          showResumeButton={Boolean(onResumeQuizContext)}
        />
      </div>
      <WhatStandsOut insights={insights} />

      <ResumeContextQuizModal
        open={resumeTarget != null && Boolean(resumeSection)}
        variant={resumeTarget?.variant ?? 'finish'}
        contextTitle={resumeSection?.title ?? ''}
        remainingQuestions={Math.max(1, remainingForModal)}
        onClose={() => setResumeTarget(null)}
        onConfirm={() => {
          if (resumeTarget != null) onResumeQuizContext?.(resumeTarget.sectionId)
          setResumeTarget(null)
        }}
      />
    </div>
  )
}
