import { useState, useEffect } from 'react'
import type { Person, HHGCenter } from './types'
import { nextId } from './data'
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
}

const DEFAULT_PERCENT = 33

export function AddPersonModal({
  onClose,
  onAdd,
  onUpdate,
  initialCompany = '',
  initialTeam = '',
  personToEdit = null,
}: AddPersonModalProps) {
  const isEdit = !!personToEdit

  const [name, setName] = useState(personToEdit?.name ?? '')
  const [company, setCompany] = useState(personToEdit?.company ?? initialCompany)
  const [team, setTeam] = useState(personToEdit?.team ?? initialTeam)
  const [role, setRole] = useState(personToEdit?.role ?? '')
  const [tagsStr, setTagsStr] = useState(personToEdit?.tags?.join(', ') ?? '')
  const [headPercent, setHeadPercent] = useState(personToEdit?.headPercent ?? DEFAULT_PERCENT)
  const [heartPercent, setHeartPercent] = useState(personToEdit?.heartPercent ?? DEFAULT_PERCENT)
  const [gutPercent, setGutPercent] = useState(personToEdit?.gutPercent ?? DEFAULT_PERCENT)

  useEffect(() => {
    if (personToEdit) {
      setName(personToEdit.name)
      setCompany(personToEdit.company ?? '')
      setTeam(personToEdit.team ?? '')
      setRole(personToEdit.role ?? '')
      setTagsStr(personToEdit.tags?.join(', ') ?? '')
      setHeadPercent(personToEdit.headPercent ?? DEFAULT_PERCENT)
      setHeartPercent(personToEdit.heartPercent ?? DEFAULT_PERCENT)
      setGutPercent(personToEdit.gutPercent ?? DEFAULT_PERCENT)
    } else {
      setName('')
      setCompany(initialCompany)
      setTeam(initialTeam)
      setRole('')
      setTagsStr('')
      setHeadPercent(DEFAULT_PERCENT)
      setHeartPercent(DEFAULT_PERCENT)
      setGutPercent(DEFAULT_PERCENT)
    }
  }, [personToEdit, initialCompany, initialTeam])

  const getDominant = (): HHGCenter => {
    if (headPercent >= heartPercent && headPercent >= gutPercent) return 'Head'
    if (heartPercent >= gutPercent) return 'Heart'
    return 'Gut'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tags = tagsStr
      .split(/[,;]/)
      .map((t) => t.trim())
      .filter(Boolean)
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
      dominant: getDominant(),
      secondaryBrain: personToEdit?.secondaryBrain ?? null,
    }
    if (isEdit && onUpdate) {
      onUpdate(person)
    } else {
      onAdd(person)
    }
    onClose()
  }

  return (
    <div className="add-person-modal__backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-person-title">
      <div className="add-person-modal" onClick={(e) => e.stopPropagation()}>
        <h2 id="add-person-title" className="add-person-modal__title">{isEdit ? 'Edit Person' : 'Add Person'}</h2>
        <form onSubmit={handleSubmit} className="add-person-modal__form">
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
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Acme Corp"
            />
          </label>
          <label>
            Team
            <input
              type="text"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              placeholder="e.g. Engineering"
            />
          </label>
          <label>
            Role
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Backend Engineer"
            />
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
          <fieldset className="add-person-modal__hhg">
            <legend>HHG % (optional)</legend>
            <label>
              Head
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={headPercent}
                onChange={(e) => setHeadPercent(Number(e.target.value) || 0)}
              />
            </label>
            <label>
              Heart
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={heartPercent}
                onChange={(e) => setHeartPercent(Number(e.target.value) || 0)}
              />
            </label>
            <label>
              Gut
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={gutPercent}
                onChange={(e) => setGutPercent(Number(e.target.value) || 0)}
              />
            </label>
          </fieldset>
          <div className="add-person-modal__actions">
            <button type="button" onClick={onClose} className="add-person-modal__btn add-person-modal__btn--secondary">
              Cancel
            </button>
            <button type="submit" className="add-person-modal__btn add-person-modal__btn--primary">
              {isEdit ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
