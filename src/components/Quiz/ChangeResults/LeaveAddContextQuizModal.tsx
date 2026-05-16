import './ResumeContextQuizModal.css'

export interface LeaveAddContextQuizModalProps {
  open: boolean
  contextTitle: string
  onClose: () => void
  onConfirmLeave: () => void
}

export function LeaveAddContextQuizModal ({
  open,
  contextTitle,
  onClose,
  onConfirmLeave,
}: LeaveAddContextQuizModalProps) {
  if (!open) return null

  return (
    <div className="resume-context-modal-root" role="presentation">
      <button type="button" className="resume-context-modal-backdrop" aria-label="Stay on quiz" onClick={onClose} />
      <div
        className="resume-context-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leave-add-context-modal-title"
      >
        <h2 id="leave-add-context-modal-title" className="resume-context-modal-title">
          Leave before finishing “{contextTitle}”?
        </h2>
        <div className="resume-context-modal-body">
          <p>
            Answers for <strong>{contextTitle}</strong> will not be saved unless you finish this section now in one
            sitting.
          </p>
          <p>Your previous quiz results stay exactly as they are.</p>
          <p>You can come back and add this context later when you are ready.</p>
        </div>
        <div className="resume-context-modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Stay on quiz
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirmLeave}>
            Leave anyway
          </button>
        </div>
      </div>
    </div>
  )
}
