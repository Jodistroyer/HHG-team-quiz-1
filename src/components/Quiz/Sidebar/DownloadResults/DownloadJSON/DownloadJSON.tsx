import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons'
import {
  buildQuizExportPayload,
  type QuizAnswer,
  type QuizOverallScores as OverallScores,
  type QuizSection as Section,
  type QuizSectionScores as SectionScores,
} from '../../../quizExport'
import '../DownloadResults.css'
import './DownloadJSON.css'

interface DownloadJSONProps {
  overall: OverallScores
  sectionSummaries: SectionScores[]
  sections: Section[]
  answers: Record<string, QuizAnswer>
  quizCompletedAt: string | null
  /** On mobile show only icon + "JSON" (no "Download" word) */
  iconOnly?: boolean
  onDownloadStart?: () => void
  onDownloadDone?: () => void
}

function fileStampForDownload (iso: string): string {
  return iso.replace(/[:.]/g, '-')
}

export function DownloadJSON ({ overall, sectionSummaries, sections, answers, quizCompletedAt, iconOnly, onDownloadStart, onDownloadDone }: DownloadJSONProps) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDownload = () => {
    if (loading) return
    onDownloadStart?.()
    setLoading(true)
    setProgress(0)
    requestAnimationFrame(() => {
      setProgress(35)
      requestAnimationFrame(() => {
        const payload = buildQuizExportPayload(overall, sectionSummaries, sections, answers, quizCompletedAt)
        /* Answers live only under sections[].questions[].answer (importer merges into quizAnswers). */
        const { answers: _answers, ...payloadForFile } = payload
        setProgress(75)
        const blob = new Blob([JSON.stringify(payloadForFile, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        const stamp = quizCompletedAt ? fileStampForDownload(quizCompletedAt) : new Date().toISOString().slice(0, 10)
        a.download = `quiz-results-${stamp}.json`
        a.click()
        URL.revokeObjectURL(url)
        setProgress(100)
        setTimeout(() => {
          setLoading(false)
          setProgress(0)
          onDownloadDone?.()
        }, 280)
      })
    })
  }

  return (
    <div className="download-result-btn-wrap">
      <button
        type="button"
        className={`btn btn-download-json ${iconOnly ? 'btn-download-icon-only' : ''} ${loading ? 'is-loading' : ''}`}
        onClick={handleDownload}
        disabled={loading}
        title="Download JSON"
        aria-label={loading ? 'Preparing JSON…' : 'Download JSON'}
        aria-busy={loading}
      >
        <FontAwesomeIcon
          icon={loading ? faSpinner : faDownload}
          className={`btn-download-icon ${loading ? 'btn-download-spinner' : ''}`}
          aria-hidden
        />
        {iconOnly ? <span>JSON</span> : <span>Download JSON</span>}
      </button>
      {loading && (
        <div
          className="download-result-progress"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="download-result-progress__bar" style={{ width: `${progress}%` }} />
          <span className="download-result-progress__label">{progress}%</span>
        </div>
      )}
    </div>
  )
}
