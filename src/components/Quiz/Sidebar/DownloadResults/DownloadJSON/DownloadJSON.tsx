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
  /** On mobile show only icon + "JSON" (no "Download" word) */
  iconOnly?: boolean
}

export function DownloadJSON ({ overall, sectionSummaries, sections, answers, iconOnly }: DownloadJSONProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = () => {
    if (loading) return
    setLoading(true)
    const payload = buildQuizExportPayload(overall, sectionSummaries, sections, answers)
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quiz-results-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    // Brief visible feedback since the download is effectively instant
    setTimeout(() => setLoading(false), 300)
  }

  return (
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
  )
}
