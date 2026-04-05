import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faBuilding, faChartSimple, faFileImport, faFloppyDisk, faTag, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import type { Person, HHGCenter, TeamContextScores, TeamContextKey, QuizExportPayload } from './types'
import type { QuizAnswer } from '../../Quiz/quizSections'
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
type SuggestionField = 'company' | 'team' | 'role' | null

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
    defaultContextScores()
  )
  const [quizAnswers, setQuizAnswers] = useState<Record<string, QuizAnswer> | undefined>(undefined)
  const [quizCompletedAt, setQuizCompletedAt] = useState<string | undefined>(undefined)
  const [importError, setImportError] = useState('')
  const [openSuggestions, setOpenSuggestions] = useState<SuggestionField>(null)

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
      setQuizAnswers(personToEdit.quizAnswers ? { ...personToEdit.quizAnswers } : undefined)
      setQuizCompletedAt(personToEdit.quizCompletedAt)
      setImportError('')
    } else if (initialQuizExport) {
      setCompany(initialCompany)
      setTeam(initialTeam)
      setRole('')
      setTagsStr('')
      const imported = personFromQuizExport(initialQuizExport, initialQuizExport.name ?? '')
      applyImportedProfile(imported)
      setQuizAnswers(imported.quizAnswers ? { ...imported.quizAnswers } : undefined)
      setQuizCompletedAt(imported.quizCompletedAt)
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
      setQuizAnswers(undefined)
      setQuizCompletedAt(undefined)
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
    if (!trimmed) return { label: 'Suggested', tone: 'suggested' as const }
    return options.some((option) => option.toLowerCase() === trimmed.toLowerCase())
      ? { label: `Existing ${noun}`, tone: 'existing' as const }
      : { label: `New ${noun}`, tone: 'new' as const }
  }

  const filterSuggestions = (options: string[], query: string) => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return options.slice(0, 8)
    return options.filter((option) => option.toLowerCase().includes(trimmed)).slice(0, 8)
  }

  const companyStatus = describeExisting(company, existingCompanies, 'company')
  const teamStatus = describeExisting(team, existingTeams, 'team')
  const roleStatus = describeExisting(role, existingRoles, 'role')

  const companySuggestions = useMemo(() => filterSuggestions(existingCompanies, company), [existingCompanies, company])
  const teamSuggestions = useMemo(() => filterSuggestions(existingTeams, team), [existingTeams, team])
  const roleSuggestions = useMemo(() => filterSuggestions(existingRoles, role), [existingRoles, role])

  const normalizedTags = useMemo(
    () =>
      tagsStr
        .split(/[,;]/)
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
        .sort(),
    [tagsStr]
  )

  const duplicateMatch = useMemo(() => {
    const normalize = (value?: string) => (value ?? '').trim().toLowerCase()
    const sameTriple = (a: TeamContextScores | undefined, b: TeamContextScores | undefined) =>
      Math.abs((a?.headPercent ?? DEFAULT_TRIPLE.headPercent) - (b?.headPercent ?? DEFAULT_TRIPLE.headPercent)) < 0.01 &&
      Math.abs((a?.heartPercent ?? DEFAULT_TRIPLE.heartPercent) - (b?.heartPercent ?? DEFAULT_TRIPLE.heartPercent)) < 0.01 &&
      Math.abs((a?.gutPercent ?? DEFAULT_TRIPLE.gutPercent) - (b?.gutPercent ?? DEFAULT_TRIPLE.gutPercent)) < 0.01

    return existingPeople.find((person) => {
      if (personToEdit && person.id === personToEdit.id) return false
      const personTags = [...(person.tags ?? [])].map((tag) => tag.trim().toLowerCase()).filter(Boolean).sort()
      return (
        normalize(person.name) === normalize(name) &&
        normalize(person.company) === normalize(company) &&
        normalize(person.team) === normalize(team) &&
        normalize(person.role) === normalize(role) &&
        JSON.stringify(personTags) === JSON.stringify(normalizedTags) &&
        sameTriple(
          { headPercent: person.headPercent, heartPercent: person.heartPercent, gutPercent: person.gutPercent },
          overallTriple
        ) &&
        sameTriple(person.contextScores?.underPressure, contextScores.underPressure) &&
        sameTriple(person.contextScores?.doingWork, contextScores.doingWork) &&
        sameTriple(person.contextScores?.withPeople, contextScores.withPeople) &&
        sameTriple(person.contextScores?.gettingBetter, contextScores.gettingBetter)
      )
    })
  }, [company, contextScores, existingPeople, name, normalizedTags, overallTriple, personToEdit, role, team])

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
        const imported = personFromQuizExport(parsed, parsed.name ?? (name || 'Imported'))
        applyImportedProfile(imported)
        setQuizAnswers(imported.quizAnswers ? { ...imported.quizAnswers } : undefined)
        setQuizCompletedAt(imported.quizCompletedAt)
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
      ...(quizAnswers && Object.keys(quizAnswers).length > 0 ? { quizAnswers: { ...quizAnswers } } : {}),
      ...(quizCompletedAt ? { quizCompletedAt } : {}),
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
        <h2 id="add-person-title" className="add-person-modal__title">
          <FontAwesomeIcon icon={faUsers} className="add-person-modal__title-icon" aria-hidden />
          <span>{resolvedTitle}</span>
        </h2>
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
            <div className="add-person-modal__toolbar-actions">
              <button type="button" onClick={onClose} className="add-person-modal__btn add-person-modal__btn--secondary">
                Cancel
              </button>
              <button type="submit" className="add-person-modal__btn add-person-modal__btn--primary">
                <FontAwesomeIcon icon={faFloppyDisk} className="add-person-modal__btn-icon" aria-hidden />
                {resolvedSubmitLabel}
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="add-person-modal__file-input"
              onChange={handleImportFileChange}
            />
          </div>
          {importError && <p className="add-person-modal__error">{importError}</p>}
          {duplicateMatch && (
            <div className="add-person-modal__notice add-person-modal__notice--warning" role="status">
              <p className="add-person-modal__notice-title">This looks like a pre-existing person.</p>
              <ul className="add-person-modal__notice-list">
                <li>
                  Name: <strong>{duplicateMatch.name}</strong>
                </li>
                {duplicateMatch.company ? (
                  <li>
                    Company: <strong>{duplicateMatch.company}</strong>
                  </li>
                ) : null}
                {duplicateMatch.team ? (
                  <li>
                    Team: <strong>{duplicateMatch.team}</strong>
                  </li>
                ) : null}
                {duplicateMatch.role ? (
                  <li>
                    Role: <strong>{duplicateMatch.role}</strong>
                  </li>
                ) : null}
              </ul>
              <p className="add-person-modal__notice-copy">
                Saving will add a new entry and will not override the existing one.
              </p>
            </div>
          )}
          <label className="add-person-modal__field">
            <span className="add-person-modal__label-text">
              <FontAwesomeIcon icon={faUser} className="add-person-modal__label-icon" aria-hidden />
              <span>Name *</span>
            </span>
            <input
              type="text"
              value={name}
              onFocus={() => setOpenSuggestions(null)}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              autoFocus
            />
          </label>
          <label className="add-person-modal__field">
            <span className="add-person-modal__label-row">
              <span className="add-person-modal__label-text">
                <FontAwesomeIcon icon={faBuilding} className="add-person-modal__label-icon" aria-hidden />
                <span>Company</span>
              </span>
              <span className={`add-person-modal__hint add-person-modal__hint--${companyStatus.tone}`}>
                {companyStatus.label}
              </span>
            </span>
            <div className="add-person-modal__suggestion-wrap">
              <input
                type="text"
                value={company}
                onFocus={() => setOpenSuggestions('company')}
                onBlur={() => window.setTimeout(() => setOpenSuggestions((current) => (current === 'company' ? null : current)), 120)}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Corp"
              />
              {openSuggestions === 'company' && companySuggestions.length > 0 && (
                <div className="add-person-modal__suggestions" role="listbox" aria-label="Existing companies">
                  {companySuggestions.map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="add-person-modal__suggestion-item"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        setCompany(value)
                        setOpenSuggestions(null)
                      }}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </label>
          <label className="add-person-modal__field">
            <span className="add-person-modal__label-row">
              <span className="add-person-modal__label-text">
                <FontAwesomeIcon icon={faUsers} className="add-person-modal__label-icon" aria-hidden />
                <span>Team</span>
              </span>
              <span className={`add-person-modal__hint add-person-modal__hint--${teamStatus.tone}`}>
                {teamStatus.label}
              </span>
            </span>
            <div className="add-person-modal__suggestion-wrap">
              <input
                type="text"
                value={team}
                onFocus={() => setOpenSuggestions('team')}
                onBlur={() => window.setTimeout(() => setOpenSuggestions((current) => (current === 'team' ? null : current)), 120)}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="e.g. Engineering"
              />
              {openSuggestions === 'team' && teamSuggestions.length > 0 && (
                <div className="add-person-modal__suggestions" role="listbox" aria-label="Existing teams">
                  {teamSuggestions.map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="add-person-modal__suggestion-item"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        setTeam(value)
                        setOpenSuggestions(null)
                      }}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </label>
          <label className="add-person-modal__field">
            <span className="add-person-modal__label-row">
              <span className="add-person-modal__label-text">
                <FontAwesomeIcon icon={faBriefcase} className="add-person-modal__label-icon" aria-hidden />
                <span>Role</span>
              </span>
              <span className={`add-person-modal__hint add-person-modal__hint--${roleStatus.tone}`}>
                {roleStatus.label}
              </span>
            </span>
            <div className="add-person-modal__suggestion-wrap">
              <input
                type="text"
                value={role}
                onFocus={() => setOpenSuggestions('role')}
                onBlur={() => window.setTimeout(() => setOpenSuggestions((current) => (current === 'role' ? null : current)), 120)}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Backend Engineer"
              />
              {openSuggestions === 'role' && roleSuggestions.length > 0 && (
                <div className="add-person-modal__suggestions" role="listbox" aria-label="Existing roles">
                  {roleSuggestions.map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="add-person-modal__suggestion-item"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        setRole(value)
                        setOpenSuggestions(null)
                      }}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </label>
          <label className="add-person-modal__field">
            <span className="add-person-modal__label-text">
              <FontAwesomeIcon icon={faTag} className="add-person-modal__label-icon" aria-hidden />
              <span>Tags (comma-separated)</span>
            </span>
            <input
              type="text"
              value={tagsStr}
              onFocus={() => setOpenSuggestions(null)}
              onChange={(e) => setTagsStr(e.target.value)}
              placeholder="e.g. Leadership, AI Initiative"
            />
          </label>
          <section className="add-person-modal__summary">
            <h3 className="add-person-modal__summary-title">
              <FontAwesomeIcon icon={faChartSimple} className="add-person-modal__summary-title-icon" aria-hidden />
              <span>HHG Summary</span>
            </h3>
            <div className="add-person-modal__summary-list">
              {summaryCards.map(({ label, scores }) => {
                const combo = getBrainCombination(scores.headPercent, scores.heartPercent, scores.gutPercent)
                const bars = [
                  { label: 'Head', percent: scores.headPercent, className: 'add-person-modal__bar-fill--head' },
                  { label: 'Heart', percent: scores.heartPercent, className: 'add-person-modal__bar-fill--heart' },
                  { label: 'Gut', percent: scores.gutPercent, className: 'add-person-modal__bar-fill--gut' },
                ]
                return (
                  <div key={label} className="add-person-modal__summary-card">
                    <div className="add-person-modal__summary-top">
                      <div className="add-person-modal__summary-heading">
                        <span className="add-person-modal__summary-label">{label}</span>
                        <span className="add-person-modal__summary-icons">{getBrainIcons(combo.label, 'small', 'changeResults')}</span>
                      </div>
                    </div>
                    <div className="add-person-modal__summary-combo-row">
                      <div className="add-person-modal__summary-combo">{combo.label.toUpperCase()}</div>
                    </div>
                    <div className="add-person-modal__summary-bars">
                      {bars.map((bar) => (
                        <div key={bar.label} className="add-person-modal__bar-row">
                          <span className="add-person-modal__bar-label">{bar.label}</span>
                          <div className="add-person-modal__bar-track" aria-hidden="true">
                            <div
                              className={`add-person-modal__bar-fill ${bar.className}`}
                              style={{ width: `${Math.max(0, Math.min(100, bar.percent))}%` }}
                            />
                          </div>
                          <span className="add-person-modal__bar-value">{bar.percent.toFixed(0)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </form>
      </div>
    </div>,
    document.body
  )
}
