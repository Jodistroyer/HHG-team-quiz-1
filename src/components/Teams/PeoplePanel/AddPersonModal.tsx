import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'
import type { Person, HHGCenter, TeamContextScores, TeamContextKey, QuizExportPayload } from './types'
import { isQuizExport, nextId, personFromQuizExport } from './data'
import { getBrainCombination, getBrainIcons } from '../../Quiz/SectionResults/utils'
import './AddPersonModal.css'

interface AddPersonModalProps {
  onClose: () => void
  onAdd: (person: Person) => void
  onUpdate?: (person: Person) => void
  /** Pre-fill when adding from a specific team (e.g. empty state). */
  initialCompany?: string
  initialTeam?: string
  /** When set, modal is in edit mode: pre-fill form and call onUpdate on submit. */
  personToEdit?: Person | null
  /** Optional prefilled quiz export (used by quiz sidebar "Save to Teams"). */
  initialQuizExport?: QuizExportPayload | null
  dialogTitle?: string
  submitLabel?: string
  existingPeople?: Person[]
}

const DEFAULT_TRIPLE: TeamContextScores = { headPercent: 33.33, heartPercent: 33.33, gutPercent: 33.34 }
const SECTION_CONFIG: Array<{ key: Exclude<TeamContextKey, 'overall'>; label: string }> = [
  { key: 'underPressure', label: 'Under Pressure' },
  { key: 'doingWork', label: 'Doing Work' },
  { key: 'withPeople', label: 'With People' },
  { key: 'gettingBetter', label: 'Getting Better' },
]

function cloneTriple(triple: TeamContextScores = DEFAULT_TRIPLE): TeamContextScores {
  return {
    headPercent: triple.headPercent,
    heartPercent: triple.heartPercent,
    gutPercent: triple.gutPercent,
  }
}

function defaultContextScores(): Record<Exclude<TeamContextKey, 'overall'>, TeamContextScores> {
  return {
    underPressure: cloneTriple(),
    doingWork: cloneTriple(),
    withPeople: cloneTriple(),
    gettingBetter: cloneTriple(),
  }
}

export function AddPersonModal({
  onClose,
  onAdd,
  onUpdate,
  initialCompany = '',
  initialTeam = '',
  personToEdit = null,
  initialQuizExport = null,
  dialogTitle,
  submitLabel,
  existingPeople = [],
}: AddPersonModalProps) {
  const isEdit = !!personToEdit
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState(personToEdit?.name ?? '')
  const [company, setCompany] = useState(personToEdit?.company ?? initialCompany)
  const [team, setTeam] = useState(personToEdit?.team ?? initialTeam)
  const [role, setRole] = useState(personToEdit?.role ?? '')
  const [tagsStr, setTagsStr] = useState(personToEdit?.tags?.join(', ') ?? '')
  const [headPercent, setHeadPercent] = useState(personToEdit?.headPercent ?? DEFAULT_TRIPLE.headPercent)
  const [heartPercent, setHeartPercent] = useState(personToEdit?.heartPercent ?? DEFAULT_TRIPLE.heartPercent)
  const [gutPercent, setGutPercent] = useState(personToEdit?.gutPercent ?? DEFAULT_TRIPLE.gutPercent)
  const [contextScores, setContextScores] = useState<Record<Exclude<TeamContextKey, 'overall'>, TeamContextScores>>(
    defaultContextScores
  )
  const [importError, setImportError] = useState('')

  const applyImportedProfile = (person: Person) => {
    setName(person.name ?? '')
    setHeadPercent(person.headPercent ?? DEFAULT_TRIPLE.headPercent)
    setHeartPercent(person.heartPercent ?? DEFAULT_TRIPLE.heartPercent)
    setGutPercent(person.gutPercent ?? DEFAULT_TRIPLE.gutPercent)
    setContextScores({
      underPressure: cloneTriple(person.contextScores?.underPressure),
      doingWork: cloneTriple(person.contextScores?.doingWork),
      withPeople: cloneTriple(person.contextScores?.withPeople),
      gettingBetter: cloneTriple(person.contextScores?.gettingBetter),
    })
  }

  useEffect(() => {
    if (personToEdit) {
      setName(personToEdit.name)
      setCompany(personToEdit.company ?? '')
      setTeam(personToEdit.team ?? '')
      setRole(personToEdit.role ?? '')
      setTagsStr(personToEdit.tags?.join(', ') ?? '')
      setHeadPercent(personToEdit.headPercent ?? DEFAULT_TRIPLE.headPercent)
      setHeartPercent(personToEdit.heartPercent ?? DEFAULT_TRIPLE.heartPercent)
      setGutPercent(personToEdit.gutPercent ?? DEFAULT_TRIPLE.gutPercent)
      setContextScores({
        underPressure: cloneTriple(personToEdit.contextScores?.underPressure),
        doingWork: cloneTriple(personToEdit.contextScores?.doingWork),
        withPeople: cloneTriple(personToEdit.contextScores?.withPeople),
        gettingBetter: cloneTriple(personToEdit.contextScores?.gettingBetter),
      })
      setImportError('')
    } else if (initialQuizExport) {
      setCompany(initialCompany)
      setTeam(initialTeam)
      setRole('')
      setTagsStr('')
      applyImportedProfile(personFromQuizExport(initialQuizExport, initialQuizExport.name ?? ''))
      setImportError('')
    } else {
      setName('')
      setCompany(initialCompany)
      setTeam(initialTeam)
      setRole('')
      setTagsStr('')
      setHeadPercent(DEFAULT_TRIPLE.headPercent)
      setHeartPercent(DEFAULT_TRIPLE.heartPercent)
      setGutPercent(DEFAULT_TRIPLE.gutPercent)
      setContextScores(defaultContextScores())
      setImportError('')
    }
  }, [personToEdit, initialCompany, initialQuizExport, initialTeam])

  const getDominantAndSecondary = (
    h: number,
    he: number,
    g: number
  ): { dominant: HHGCenter; secondaryBrain: HHGCenter | null } => {
    const scores: Array<{ type: HHGCenter; value: number }> = [
      { type: 'Head' as HHGCenter, value: h },
      { type: 'Heart' as HHGCenter, value: he },
      { type: 'Gut' as HHGCenter, value: g },
    ].sort((a, b) => b.value - a.value)

    return {
      dominant: scores[0]?.type ?? 'Head',
      secondaryBrain: scores[1] && scores[1].value > 0 ? scores[1].type : null,
    }
  }

  const overallTriple = useMemo(
    () => ({ headPercent, heartPercent, gutPercent }),
    [headPercent, heartPercent, gutPercent]
  )

  const existingCompanies = useMemo(
    () => Array.from(new Set(existingPeople.map((person) => person.company?.trim()).filter(Boolean) as string[])).sort(),
    [existingPeople]
  )
  const existingTeams = useMemo(() => {
    const targetCompany = company.trim().toLowerCase()
    const teams = existingPeople
      .filter((person) => !targetCompany || (person.company ?? '').trim().toLowerCase() === targetCompany)
      .map((person) => person.team?.trim())
      .filter(Boolean) as string[]
    return Array.from(new Set(teams)).sort()
  }, [existingPeople, company])
  const existingRoles = useMemo(() => {
    const targetCompany = company.trim().toLowerCase()
    const targetTeam = team.trim().toLowerCase()
    const roles = existingPeople
      .filter((person) => {
        const sameCompany = !targetCompany || (person.company ?? '').trim().toLowerCase() === targetCompany
        const sameTeam = !targetTeam || (person.team ?? '').trim().toLowerCase() === targetTeam
        return sameCompany && sameTeam
      })
      .map((person) => person.role?.trim())
      .filter(Boolean) as string[]
    return Array.from(new Set(roles)).sort()
  }, [existingPeople, company, team])

  const describeExisting = (value: string, options: string[], noun: string) => {
    const trimmed = value.trim()
    if (!trimmed) return `Enter a ${noun}.`
    return options.some((option) => option.toLowerCase() === trimmed.toLowerCase())
      ? `Existing ${noun}.`
      : `New ${noun}.`
  }

  const summaryCards = useMemo(
    () => [
      { label: 'Natural Default', scores: overallTriple },
      ...SECTION_CONFIG.map(({ key, label }) => ({ label, scores: contextScores[key] })),
    ],
    [contextScores, overallTriple]
  )

  const handleImportQuizJson = () => {
    fileInputRef.current?.click()
  }

  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string)
        if (!isQuizExport(parsed)) {
          setImportError('That file is not a quiz results JSON export.')
          return
        }
        applyImportedProfile(personFromQuizExport(parsed, parsed.name ?? (name || 'Imported')))
        setImportError('')
      } catch {
        setImportError('Could not read that JSON file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tags = tagsStr
      .split(/[,;]/)
      .map((t) => t.trim())
      .filter(Boolean)
    const { dominant, secondaryBrain } = getDominantAndSecondary(headPercent, heartPercent, gutPercent)
    const person: Person = {
      id: personToEdit?.id ?? nextId(),
      name: name.trim() || 'Unnamed',
      company: company.trim() || undefined,
      team: team.trim() || undefined,
      role: role.trim() || undefined,
      tags,
      headPercent,
      heartPercent,
      gutPercent,
      dominant,
      secondaryBrain,
      contextScores,
    }
    if (isEdit && onUpdate) {
      onUpdate(person)
    } else {
      onAdd(person)
    }
    onClose()
  }

  const resolvedTitle = dialogTitle ?? (isEdit ? 'Edit Person' : 'Add Person')
  const resolvedSubmitLabel = submitLabel ?? (isEdit ? 'Save' : 'Add')

  return createPortal(
    <div className="add-person-modal__backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-person-title">
      <div className="add-person-modal" onClick={(e) => e.stopPropagation()}>
        <h2 id="add-person-title" className="add-person-modal__title">{resolvedTitle}</h2>
        <form onSubmit={handleSubmit} className="add-person-modal__form">
          <div className="add-person-modal__toolbar">
            <button
              type="button"
              className="add-person-modal__import-btn"
              onClick={handleImportQuizJson}
            >
              <FontAwesomeIcon icon={faFileImport} aria-hidden />
              <span>Import Quiz JSON</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="add-person-modal__file-input"
              onChange={handleImportFileChange}
            />
          </div>
          {importError && <p className="add-person-modal__error">{importError}</p>}
          <label>
            Name *
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              autoFocus
            />
          </label>
          <label>
            Company
            <input
              type="text"
              list="add-person-existing-companies"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Acme Corp"
            />
            <span className="add-person-modal__hint">{describeExisting(company, existingCompanies, 'company')}</span>
          </label>
          <label>
            Team
            <input
              type="text"
              list="add-person-existing-teams"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              placeholder="e.g. Engineering"
            />
            <span className="add-person-modal__hint">{describeExisting(team, existingTeams, 'team')}</span>
          </label>
          <label>
            Role
            <input
              type="text"
              list="add-person-existing-roles"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Backend Engineer"
            />
            <span className="add-person-modal__hint">{describeExisting(role, existingRoles, 'role')}</span>
          </label>
          <label>
            Tags (comma-separated)
            <input
              type="text"
              value={tagsStr}
              onChange={(e) => setTagsStr(e.target.value)}
              placeholder="e.g. Leadership, AI Initiative"
            />
          </label>
          <section className="add-person-modal__summary">
            <h3 className="add-person-modal__summary-title">HHG Summary</h3>
            <div className="add-person-modal__summary-list">
              {summaryCards.map(({ label, scores }) => {
                const combo = getBrainCombination(scores.headPercent, scores.heartPercent, scores.gutPercent)
                return (
                  <div key={label} className="add-person-modal__summary-card">
                    <div className="add-person-modal__summary-top">
                      <span className="add-person-modal__summary-label">{label}</span>
                      <span className="add-person-modal__summary-icons">{getBrainIcons(combo.label)}</span>
                    </div>
                    <div className="add-person-modal__summary-row">
                      <span>Head {scores.headPercent.toFixed(1)}%</span>
                      <span>Heart {scores.heartPercent.toFixed(1)}%</span>
                      <span>Gut {scores.gutPercent.toFixed(1)}%</span>
                    </div>
                    <div className="add-person-modal__summary-combo">{combo.label}</div>
                  </div>
                )
              })}
            </div>
          </section>
          <datalist id="add-person-existing-companies">
            {existingCompanies.map((value) => (
              <option key={value} value={value} />
            ))}
          </datalist>
          <datalist id="add-person-existing-teams">
            {existingTeams.map((value) => (
              <option key={value} value={value} />
            ))}
          </datalist>
          <datalist id="add-person-existing-roles">
            {existingRoles.map((value) => (
              <option key={value} value={value} />
            ))}
          </datalist>
          <div className="add-person-modal__actions">
            <button type="button" onClick={onClose} className="add-person-modal__btn add-person-modal__btn--secondary">
              Cancel
            </button>
            <button type="submit" className="add-person-modal__btn add-person-modal__btn--primary">
              {resolvedSubmitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}
