import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './ExportNameModal.css'

interface ExportNameModalProps {
  initialValue?: string
  onCancel: () => void
  onConfirm: (name: string) => void
}

export function ExportNameModal ({ initialValue, onCancel, onConfirm }: ExportNameModalProps) {
  const titleId = useId()
  const descId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(initialValue ?? '')

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return createPortal(
    <div className="export-name-backdrop" onClick={onCancel} role="presentation">
      <div
        className="export-name-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id={titleId} className="export-name-title">Add your name to the PDF</h3>
        <p id={descId} className="export-name-message">
          This name will appear in the main quiz results title in the exported PDF.
        </p>

        <form
          className="export-name-form"
          onSubmit={(e) => {
            e.preventDefault()
            onConfirm(value.trim())
          }}
        >
          <label className="export-name-label">
            Your name
            <input
              ref={inputRef}
              className="export-name-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. Alex Chen"
              autoComplete="name"
            />
          </label>
          <div className="export-name-hint">Leaving this blank will export the PDF without a name.</div>

          <div className="export-name-actions">
            <button type="button" className="export-name-btn export-name-btn--cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="export-name-btn export-name-btn--confirm">
              Download PDF
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}

