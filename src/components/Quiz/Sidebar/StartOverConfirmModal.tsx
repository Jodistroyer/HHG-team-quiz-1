import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import './StartOverConfirmModal.css'

interface StartOverConfirmModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export function StartOverConfirmModal ({ onConfirm, onCancel }: StartOverConfirmModalProps) {
  const titleId = useId()
  const descId = useId()
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    cancelRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return createPortal(
    <div className="start-over-confirm-backdrop" onClick={onCancel} role="presentation">
      <div
        className="start-over-confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id={titleId} className="start-over-confirm-title">
          Start over?
        </h3>
        <p id={descId} className="start-over-confirm-message">
          Are you sure you want to redo the quiz? Your current results will not be saved unless you have already
          exported them (for example with Download JSON or Download PDF).
        </p>
        <div className="start-over-confirm-actions">
          <button ref={cancelRef} type="button" className="start-over-confirm-btn start-over-confirm-btn--cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="start-over-confirm-btn start-over-confirm-btn--confirm" onClick={onConfirm}>
            Start over
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
