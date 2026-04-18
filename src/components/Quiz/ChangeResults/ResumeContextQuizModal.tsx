import { estimateTimeLabel } from '../QuizIntro'
import './ResumeContextQuizModal.css'

export interface ResumeContextQuizModalProps {
  open: boolean
  contextTitle: string
  remainingQuestions: number
  /** `add` when the context was not in the user’s selected quiz run yet. */
  variant?: 'add' | 'finish'
  onClose: () => void
  onConfirm: () => void
}

export function ResumeContextQuizModal ({
  open,
  contextTitle,
  remainingQuestions,
  variant = 'finish',
  onClose,
  onConfirm,
}: ResumeContextQuizModalProps) {
  if (!open) return null

  const timeLabel = estimateTimeLabel(remainingQuestions)
  const qLabel = remainingQuestions === 1 ? '1 question' : `${remainingQuestions} questions`
  const isAdd = variant === 'add'

  return (
    <div className="resume-context-modal-root" role="presentation">
      <button type="button" className="resume-context-modal-backdrop" aria-label="Close dialog" onClick={onClose} />
      <div
        className="resume-context-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-context-modal-title"
      >
        <h2 id="resume-context-modal-title" className="resume-context-modal-title">
          {isAdd ? `Add “${contextTitle}” to your quiz?` : `Finish “${contextTitle}”?`}
        </h2>
        <div className="resume-context-modal-body">
          <p>
            {isAdd
              ? 'This context will be added to your quiz results. Your profile, overall results, calculations will update once you answer these questions.'
              : 'Completing these answers will update your profile. Overall results and context-by-context calculations will change once the new responses are included.'}
          </p>
          <p className="resume-context-modal-meta">
            About <strong>{qLabel}</strong> <strong>{timeLabel}</strong>
          </p>
        </div>
        <div className="resume-context-modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            {isAdd ? 'Add and continue' : 'Continue quiz'}
          </button>
        </div>
      </div>
    </div>
  )
}
