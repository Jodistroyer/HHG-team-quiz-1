import { useCallback, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCode, faFilePdf, faFileZipper, faTable } from '@fortawesome/free-solid-svg-icons'
import type { Person } from './types'
import {
  buildPeopleCsv,
  buildPeopleLibraryJson,
  estimateCsvBytes,
  estimateDownloadSeconds,
  estimateJsonLibraryBytes,
  estimateZipJsonBytes,
  estimateZipPdfBytes,
  formatBytes,
  triggerDownload,
  zipIndividualJsonExports,
  zipIndividualPdfExports,
} from '../teamsBulkExport'
import './TeamsExportModal.css'

export interface TeamsExportModalProps {
  people: Person[]
  onClose: () => void
}

type ExportKind = 'libraryJson' | 'csv' | 'zipJson' | 'zipPdf'

export function TeamsExportModal ({ people, onClose }: TeamsExportModalProps) {
  const [busyKind, setBusyKind] = useState<ExportKind | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busyKind) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busyKind, onClose])

  const counts = useMemo(() => {
    const companies = new Set(people.map((p) => p.company ?? 'Uncategorized'))
    const teams = new Set(people.map((p) => `${p.company ?? 'Uncategorized'}|${p.team ?? 'Other'}`))
    return { people: people.length, companies: companies.size, teams: teams.size }
  }, [people])

  const options = useMemo(() => {
    const jsonLib = estimateJsonLibraryBytes(people)
    const csvB = estimateCsvBytes(people)
    const zipJ = estimateZipJsonBytes(people)
    const zipP = estimateZipPdfBytes(people)
    return [
      {
        kind: 'libraryJson' as const,
        icon: faFileCode,
        iconVariant: 'library-json' as const,
        title: 'Library JSON',
        summary: `Single file: all ${counts.people} people as stored in the library (scores, org fields, tags, etc).`,
        bytes: jsonLib,
        eta: estimateDownloadSeconds(jsonLib),
      },
      {
        kind: 'csv' as const,
        icon: faTable,
        iconVariant: 'csv' as const,
        title: 'CSV spreadsheet',
        summary: `One row per person (company → team → name). Combination labels first, then overall %, then each section (summary %, score %, dominant, answers). Answer columns are labeled with question text; blanks mean no stored quiz answers.`,
        bytes: csvB,
        eta: estimateDownloadSeconds(csvB),
      },
      {
        kind: 'zipJson' as const,
        icon: faFileZipper,
        iconVariant: 'zip-json' as const,
        title: 'ZIP — individual JSON',
        summary: `One JSON per person (${counts.companies} companies, ${counts.teams} team folders) with full quiz-shaped results, metadata, and section scores.`,
        bytes: zipJ,
        eta: estimateDownloadSeconds(zipJ),
      },
      {
        kind: 'zipPdf' as const,
        icon: faFilePdf,
        iconVariant: 'zip-pdf' as const,
        title: 'ZIP — individual PDFs',
        summary: `One PDF per person in the same folder layout; each file summarizes profile and context scores (file name = person).`,
        bytes: zipP,
        eta: estimateDownloadSeconds(zipP),
      },
    ]
  }, [people, counts])

  const runExport = useCallback(
    async (kind: ExportKind) => {
      if (busyKind) return
      setBusyKind(kind)
      setProgress(0)
      const date = new Date().toISOString().slice(0, 10)
      try {
        if (kind === 'libraryJson') {
          const str = buildPeopleLibraryJson(people)
          triggerDownload(new Blob([str], { type: 'application/json' }), `people-export-${date}.json`)
          setProgress(100)
        } else if (kind === 'csv') {
          const str = buildPeopleCsv(people)
          triggerDownload(new Blob([str], { type: 'text/csv;charset=utf-8' }), `people-export-${date}.csv`)
          setProgress(100)
        } else if (kind === 'zipJson') {
          const blob = await zipIndividualJsonExports(people, setProgress)
          triggerDownload(blob, `hhg-quiz-json-${date}.zip`)
        } else {
          const blob = await zipIndividualPdfExports(people, setProgress)
          triggerDownload(blob, `hhg-quiz-pdf-${date}.zip`)
        }
      } finally {
        setBusyKind(null)
        setProgress(0)
      }
    },
    [busyKind, people]
  )

  return (
    <div className="teams-export-overlay" onClick={onClose} role="presentation">
      <div
        className="teams-export-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="teams-export-title"
      >
        <header className="teams-export-modal__header">
          <h2 id="teams-export-title" className="teams-export-modal__title">
            Export selection
          </h2>
          <p className="teams-export-modal__lede">
            {counts.people} people selected. Pick a format; estimates help you choose before downloading.
          </p>
        </header>

        <ul className="teams-export-options">
          {options.map((opt) => {
            const active = busyKind === opt.kind
            return (
              <li
                key={opt.kind}
                className={`teams-export-option teams-export-option--${opt.iconVariant}`}
              >
                <div className="teams-export-option__row">
                  <span className="teams-export-option__icon-wrap" aria-hidden>
                    <FontAwesomeIcon icon={opt.icon} className="teams-export-option__icon" />
                  </span>
                  <div className="teams-export-option__main">
                    <div className="teams-export-option__head">
                      <h3 className="teams-export-option__title">{opt.title}</h3>
                      <div className="teams-export-option__meta">
                        <span className="teams-export-option__size">{formatBytes(opt.bytes)}</span>
                        <span className="teams-export-option__sep" aria-hidden>
                          ·
                        </span>
                        <span className="teams-export-option__eta">{opt.eta}</span>
                      </div>
                    </div>
                    <p className="teams-export-option__summary">{opt.summary}</p>
                    {active && (
                      <div className="teams-export-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                        <div className="teams-export-progress__bar" style={{ width: `${progress}%` }} />
                        <span className="teams-export-progress__label">{progress}%</span>
                      </div>
                    )}
                    <button
                      type="button"
                      className="teams-export-option__btn"
                      onClick={() => void runExport(opt.kind)}
                      disabled={busyKind != null}
                    >
                      {active ? 'Working…' : 'Download'}
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <footer className="teams-export-modal__footer">
          <button type="button" className="teams-export-modal__close" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  )
}
