import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { getBrainCombination } from '../../../SectionResults/utils'
import '../DownloadResults.css'
import './DownloadJSON.css'

type AnswerType = 'Head' | 'Heart' | 'Gut'

interface OverallScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: 'Head' | 'Heart' | 'Gut'
  secondaryBrain: 'Head' | 'Heart' | 'Gut' | null
}

interface SectionScores {
  headPercent: number
  heartPercent: number
  gutPercent: number
  dominant: 'Head' | 'Heart' | 'Gut'
  secondaryBrain: 'Head' | 'Heart' | 'Gut' | null
}

interface Section {
  id: number
  title: string
  questions: { id: string; text: string; options: { label: string; type: AnswerType }[] }[]
}

interface Answer {
  firstChoice: AnswerType | null
  secondChoice: AnswerType | null
}

interface DownloadJSONProps {
  overall: OverallScores
  sectionSummaries: SectionScores[]
  sections: Section[]
  answers: Record<string, Answer>
  /** On mobile show only icon + "JSON" (no "Download" word) */
  iconOnly?: boolean
}

export function DownloadJSON ({ overall, sectionSummaries, sections, answers, iconOnly }: DownloadJSONProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = () => {
    if (loading) return
    setLoading(true)
    const combo = getBrainCombination(overall.headPercent, overall.heartPercent, overall.gutPercent)
    const payload = {
      exportedAt: new Date().toISOString(),
      naturalDefault: {
        headPercent: overall.headPercent,
        heartPercent: overall.heartPercent,
        gutPercent: overall.gutPercent,
        combinationLabel: combo.label
      },
      sectionSummaries: sectionSummaries.map((s, i) => ({
        sectionId: sections[i]?.id,
        sectionTitle: sections[i]?.title,
        headPercent: s.headPercent,
        heartPercent: s.heartPercent,
        gutPercent: s.gutPercent,
        combinationLabel: getBrainCombination(s.headPercent, s.heartPercent, s.gutPercent).label
      })),
      sections: sections.map((sec, idx) => ({
        id: sec.id,
        title: sec.title,
        scores: sectionSummaries[idx] ?? null,
        questions: sec.questions.map(q => ({
          id: q.id,
          text: q.text,
          answer: answers[q.id] ?? { firstChoice: null, secondChoice: null }
        }))
      })),
      answers: answers
    }
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
