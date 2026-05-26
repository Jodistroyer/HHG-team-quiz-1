import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Person, ViewMode, SavedGroup, TreeNode as TreeNodeType } from './types'
import type { EmptyTeams } from './data'
import {
  filterPeopleBySearch,
  parsePersonDisplayLabel,
  personFromQuizExport,
  peopleFromImport,
  isQuizExport,
  nextId,
} from './data'
import {
  loadPeople,
  loadSavedGroups,
  loadEmptyTeams,
  savePeopleToStorage,
  STORAGE_KEY_PEOPLE,
  PEOPLE_UPDATED_EVENT,
} from '../peopleStorage'
import type { ContextMenuItem } from './ContextMenu'
import type { DeleteImpact } from './DeleteConfirmModal'

export interface UseTeamsDirectoryProps {
  onSelectedPeopleChange?: (people: Person[]) => void
  /** Called once on mount; receives a stable function that deselects a person by id. */
  onRegisterDeselect?: (deselect: (id: string) => void) => void
  /** Called once on mount; receives a stable function that clears the whole selection. */
  onRegisterClearAll?: (clearAll: () => void) => void
}

const STORAGE_KEY_SAVED_GROUPS = 'hhg.people.savedGroups.v1'
const STORAGE_KEY_EMPTY_TEAMS = 'hhg.people.emptyTeams.v1'
const STORAGE_KEY_SELECTED_IDS = 'hhg.teams.selectedPeopleIds.v1'

function groupNamesContainingIds(groups: SavedGroup[], ids: Set<string>): string[] {
  return groups.filter((g) => g.personIds.some((id) => ids.has(id))).map((g) => g.name)
}

function personMatchesCompanyLabel(p: Person, companyLabel: string): boolean {
  if (companyLabel === 'Uncategorized') {
    return p.company == null || p.company === '' || p.company === 'Uncategorized'
  }
  return p.company === companyLabel
}

function personMatchesTeamKey(p: Person, teamKey: string): boolean {
  if (teamKey === '_') return p.team == null || p.team === '' || p.team === '_'
  return p.team === teamKey
}

function teamNameStoredOnPerson(p: Person): string | null {
  const t = p.team
  if (t == null || t === '' || t === '_') return null
  return t
}

/** Team names already used under a company (people + empty slots), excluding people being moved away. */
function collectUsedTeamNamesInCompany(
  targetCompanyLabel: string,
  peopleList: Person[],
  emptySlots: string[],
  excludeIfMoving: (p: Person) => boolean
): Set<string> {
  const used = new Set<string>()
  for (const p of peopleList) {
    if (!personMatchesCompanyLabel(p, targetCompanyLabel)) continue
    if (excludeIfMoving(p)) continue
    const tn = teamNameStoredOnPerson(p)
    if (tn) used.add(tn)
  }
  for (const slot of emptySlots) {
    if (slot !== '_') used.add(slot)
  }
  return used
}

/** Keep `base` if free; otherwise `base (1)`, `base (2)`, … */
function pickDisambiguatedTeamName(base: string, used: Set<string>): string {
  if (!used.has(base)) return base
  let n = 1
  while (used.has(`${base} (${n})`)) n += 1
  return `${base} (${n})`
}

function pullEmptyTeamSlot(prev: EmptyTeams, companyLabel: string, teamKey: string): EmptyTeams {
  const list = prev[companyLabel]
  if (!list?.includes(teamKey)) return prev
  const filtered = list.filter((t) => t !== teamKey)
  const next = { ...prev }
  if (filtered.length === 0) delete next[companyLabel]
  else next[companyLabel] = filtered
  return next
}

function pushEmptyTeamSlot(prev: EmptyTeams, companyLabel: string, teamKey: string): EmptyTeams {
  const set = new Set(prev[companyLabel] ?? [])
  set.add(teamKey)
  const next = { ...prev }
  next[companyLabel] = Array.from(set).sort()
  return next
}

/** After removing people, keep company/team shells in emptyTeams so org rows stay in the tree. */
function emptyTeamsAfterRemovingPeople(
  peopleBefore: Person[],
  removedIds: Set<string>,
  prevEmpty: EmptyTeams
): EmptyTeams {
  const nextPeople = peopleBefore.filter((p) => !removedIds.has(p.id))
  const nextEmpty: EmptyTeams = { ...prevEmpty }

  for (const p of peopleBefore) {
    if (!removedIds.has(p.id)) continue
    const company = p.company ?? 'Uncategorized'
    const team = p.team ?? '_'

    const stillInCompany = nextPeople.filter((x) => (x.company ?? 'Uncategorized') === company)
    if (stillInCompany.length === 0) {
      const existing = new Set(nextEmpty[company] ?? [])
      existing.add(team)
      nextEmpty[company] = Array.from(existing).sort()
    } else {
      const stillInTeam = stillInCompany.filter((x) => (x.team ?? '_') === team).length
      if (stillInTeam === 0) {
        const existing = new Set(nextEmpty[company] ?? [])
        existing.add(team)
        nextEmpty[company] = Array.from(existing).sort()
      }
    }
  }
  return nextEmpty
}

function loadSelectedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SELECTED_IDS)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((x) => typeof x === 'string'))
  } catch {
    return new Set()
  }
}

export function useTeamsDirectory({
  onSelectedPeopleChange,
  onRegisterDeselect,
  onRegisterClearAll,
}: UseTeamsDirectoryProps) {
  const [people, setPeople] = useState<Person[]>(loadPeople)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('company')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(loadSelectedIds)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [savedGroups, setSavedGroups] = useState<SavedGroup[]>(loadSavedGroups)
  const [emptyTeams, setEmptyTeams] = useState<EmptyTeams>(loadEmptyTeams)
  const [showAddModal, setShowAddModal] = useState(false)
  const [addPersonPreFill, setAddPersonPreFill] = useState<{ company?: string; team?: string }>({})
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const [saveGroupName, setSaveGroupName] = useState('')
  const [showSaveGroupPrompt, setShowSaveGroupPrompt] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; node: TreeNodeType } | null>(null)
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<{
    title: string
    message: string
    impact: DeleteImpact
    onConfirm: () => void
  } | null>(null)
  const [showExportModal, setShowExportModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredPeople = filterPeopleBySearch(people, search)

  const persistPeople = useCallback((next: Person[]) => {
    setPeople(next)
    savePeopleToStorage(next)
  }, [])

  // Teams stays mounted when switching NavBar tabs; Quiz "Save to Teams" writes storage only.
  useEffect(() => {
    const syncPeopleFromStorage = () => setPeople(loadPeople())
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_PEOPLE || e.key === null) syncPeopleFromStorage()
    }
    window.addEventListener(PEOPLE_UPDATED_EVENT, syncPeopleFromStorage)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener(PEOPLE_UPDATED_EVENT, syncPeopleFromStorage)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const persistSavedGroups = useCallback((next: SavedGroup[]) => {
    setSavedGroups(next)
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_GROUPS, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }, [])

  const persistEmptyTeams = useCallback((next: EmptyTeams) => {
    setEmptyTeams(next)
    try {
      localStorage.setItem(STORAGE_KEY_EMPTY_TEAMS, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }, [])

  const handleSelectionChange = useCallback((ids: Set<string>) => {
    setSelectedIds(ids)
  }, [])

  // Persist selection across tab switches (Teams is unmounted when leaving the page).
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SELECTED_IDS, JSON.stringify(Array.from(selectedIds)))
    } catch {
      /* ignore */
    }
  }, [selectedIds])

  // If the library changes (imports/deletes), drop any selected ids that no longer exist.
  useEffect(() => {
    const existing = new Set(people.map((p) => p.id))
    setSelectedIds((prev) => {
      const next = new Set([...prev].filter((id) => existing.has(id)))
      return next.size === prev.size ? prev : next
    })
  }, [people])

  const handleAddPerson = useCallback(
    (person: Person) => {
      persistPeople([...people, person])
      setShowAddModal(false)
      setAddPersonPreFill({})
      setEditingPerson(null)
    },
    [people, persistPeople]
  )

  const handleUpdatePerson = useCallback(
    (person: Person) => {
      persistPeople(people.map((p) => (p.id === person.id ? person : p)))
      setShowAddModal(false)
      setEditingPerson(null)
    },
    [people, persistPeople]
  )

  const openAddPerson = useCallback((company?: string, team?: string) => {
    setEditingPerson(null)
    setAddPersonPreFill({ company, team })
    setShowAddModal(true)
  }, [])

  const openEditPerson = useCallback((person: Person) => {
    setEditingPerson(person)
    setAddPersonPreFill({})
    setShowAddModal(true)
  }, [])

  const handleNewCompany = useCallback(() => {
    const base = 'New Company'
    let name = base
    const existing = new Set([...people.map((p) => p.company), ...Object.keys(emptyTeams)].filter(Boolean))
    let n = 1
    while (existing.has(name)) {
      name = `${base} ${n}`
      n++
    }
    const next: EmptyTeams = { ...emptyTeams, [name]: [] }
    persistEmptyTeams(next)
    const companyId = `company-${name}`
    setExpandedIds((prev) => new Set(prev).add(companyId))
    setEditingNodeId(companyId)
    setEditingValue(name)
  }, [people, emptyTeams, persistEmptyTeams])

  const handleImportJson = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string)
          if (isQuizExport(data)) {
            const name = data.name ?? file.name.replace(/\.json$/i, '')
            const person = personFromQuizExport(data, name)
            persistPeople([...people, person])
          } else {
            const imported = peopleFromImport(data)
            if (imported.length > 0) {
              const existingIds = new Set(people.map((p) => p.id))
              const merged = [...people]
              for (const p of imported) {
                let id = p.id
                while (existingIds.has(id)) id = nextId('import')
                existingIds.add(id)
                merged.push({ ...p, id })
              }
              persistPeople(merged)
            }
          }
        } catch {
          /* invalid JSON */
        }
      }
      reader.readAsText(file)
      e.target.value = ''
    },
    [people, persistPeople]
  )

  const handleSaveGroup = useCallback(() => {
    if (selectedIds.size < 2) return
    setShowSaveGroupPrompt(true)
  }, [selectedIds])

  const handleConfirmSaveGroup = useCallback(() => {
    const name = saveGroupName.trim() || `Custom Group (${selectedIds.size})`
    const newGroup: SavedGroup = {
      id: nextId('group'),
      name,
      personIds: Array.from(selectedIds),
    }
    persistSavedGroups([...savedGroups, newGroup])
    setSaveGroupName('')
    setShowSaveGroupPrompt(false)
  }, [saveGroupName, selectedIds, savedGroups, persistSavedGroups])

  const handleSelectSavedGroup = useCallback((group: SavedGroup) => {
    setSelectedIds(new Set(group.personIds))
  }, [])

  const handleDeleteSavedGroup = useCallback(
    (id: string) => {
      const group = savedGroups.find((g) => g.id === id)
      if (!group) return
      setDeleteConfirm({
        title: 'Delete saved group?',
        message: `This will remove "${group.name}" from your templates. People in the library are not deleted.`,
        impact: { peopleCount: 0 },
        onConfirm: () => {
          persistSavedGroups(savedGroups.filter((g) => g.id !== id))
          setDeleteConfirm(null)
        },
      })
    },
    [savedGroups, persistSavedGroups]
  )

  const handleMovePerson = useCallback(
    (personId: string, targetNode: TreeNodeType) => {
      const person = people.find((p) => p.id === personId)
      if (!person) return
      const path = targetNode.path ?? []
      const label = targetNode.label
      let company: string | undefined
      let team: string | undefined
      if (targetNode.kind === 'company') {
        company = label
        team = undefined
      } else if (targetNode.kind === 'team') {
        company = path[0]
        const tk = targetNode.teamKey
        if (tk === '_') team = undefined
        else if (tk !== undefined && tk !== '') team = tk
        else team = label === 'Other' ? undefined : label
      } else {
        return
      }
      const updated: Person = {
        ...person,
        company: company || person.company,
        team: team ?? person.team,
        role: person.role,
      }
      persistPeople(people.map((p) => (p.id === personId ? updated : p)))
    },
    [people, persistPeople]
  )

  const handleMoveTeam = useCallback(
    (
      sourceCompany: string,
      sourceTeamKey: string,
      sourceNodeId: string,
      targetNode: TreeNodeType
    ) => {
      if (targetNode.kind !== 'company') return
      if (targetNode.id === sourceNodeId) return

      const targetLabel = targetNode.label
      const inSourceTeam = (p: Person) =>
        personMatchesCompanyLabel(p, sourceCompany) && personMatchesTeamKey(p, sourceTeamKey)

      const hadPeopleInTeam = people.some(inSourceTeam)
      const hadEmptySlot = (emptyTeams[sourceCompany] ?? []).includes(sourceTeamKey)

      let resolvedTeamName: string | undefined
      if (sourceTeamKey === '_') {
        resolvedTeamName = undefined
      } else {
        const used = collectUsedTeamNamesInCompany(
          targetLabel,
          people,
          emptyTeams[targetLabel] ?? [],
          inSourceTeam
        )
        resolvedTeamName = pickDisambiguatedTeamName(sourceTeamKey, used)
      }

      const nextPeople = people.map((p) => (inSourceTeam(p) ? { ...p, company: targetLabel, team: resolvedTeamName } : p))

      let nextEmpty = pullEmptyTeamSlot(emptyTeams, sourceCompany, sourceTeamKey)
      if (!hadPeopleInTeam && hadEmptySlot) {
        if (sourceTeamKey === '_') {
          nextEmpty = pushEmptyTeamSlot(nextEmpty, targetLabel, '_')
        } else {
          nextEmpty = pushEmptyTeamSlot(nextEmpty, targetLabel, resolvedTeamName!)
        }
      }

      persistEmptyTeams(nextEmpty)
      persistPeople(nextPeople)
    },
    [people, emptyTeams, persistPeople, persistEmptyTeams]
  )

  const handleContextMenu = useCallback((node: TreeNodeType, e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY, node })
  }, [])

  const handleQuickAdd = useCallback(
    (node: TreeNodeType) => {
      if (node.kind === 'company') {
        const companyName = node.label
        const next: EmptyTeams = { ...emptyTeams }
        const list = next[companyName] ?? []
        const name = 'New Team'
        let teamName = name
        let i = 0
        while (list.includes(teamName)) {
          i++
          teamName = `${name} ${i}`
        }
        next[companyName] = [teamName, ...list]
        persistEmptyTeams(next)
        setExpandedIds((prev) => new Set(prev).add(node.id))
        const teamId = `team-${companyName}-${teamName}`
        setEditingNodeId(teamId)
        setEditingValue(teamName)
      } else if (node.kind === 'team') {
        const path = node.path ?? []
        const company = path[0]
        const team = node.label
        openAddPerson(company, team)
      }
    },
    [emptyTeams, persistEmptyTeams, openAddPerson]
  )

  const handleRenameCommit = useCallback(
    (nodeId: string, kind: string, newLabel: string) => {
      if (kind === 'company') {
        const oldName = nodeId.replace(/^company-/, '')
        const newLabelTrim = newLabel.trim()
        if (newLabelTrim === oldName) {
          setEditingNodeId(null)
          setEditingValue('')
          return
        }
        const isUncategorized = oldName === 'Uncategorized'
        const nextPeople = people.map((p) => {
          const matches = isUncategorized
            ? (p.company == null || p.company === '' || p.company === 'Uncategorized')
            : p.company === oldName
          return matches ? { ...p, company: newLabelTrim } : p
        })
        if (Object.keys(emptyTeams).includes(oldName)) {
          const next = { ...emptyTeams }
          next[newLabelTrim] = next[oldName]
          delete next[oldName]
          persistEmptyTeams(next)
        }
        persistPeople(nextPeople)
      } else if (kind === 'team') {
        const match = nodeId.match(/^team-(.+)-(.+)$/)
        if (match) {
          const [, companyName, oldTeam] = match
          const isOther = oldTeam === '_'
          const nextPeople = people.map((p) => {
            const companyMatches = p.company === companyName || (companyName === 'Uncategorized' && (p.company == null || p.company === ''))
            const teamMatches = isOther
              ? (p.team == null || p.team === '' || p.team === '_')
              : p.team === oldTeam
            return companyMatches && teamMatches ? { ...p, team: newLabel } : p
          })
          persistPeople(nextPeople)
          const next = { ...emptyTeams }
          const list = next[companyName] ?? []
          if (list.includes(oldTeam)) {
            next[companyName] = list.map((t) => (t === oldTeam ? newLabel : t))
            persistEmptyTeams(next)
          }
        }
      } else if (kind === 'person') {
        const person = people.find((p) => p.id === nodeId)
        if (person) {
          const { name: parsedName, role: parsedRole } = parsePersonDisplayLabel(newLabel)
          const name = parsedName || person.name
          persistPeople(
            people.map((p) =>
              p.id === nodeId ? { ...p, name, role: parsedRole || undefined } : p
            )
          )
        }
      }
      setEditingNodeId(null)
      setEditingValue('')
    },
    [people, emptyTeams, persistPeople, persistEmptyTeams]
  )

  const startRename = useCallback((node: TreeNodeType) => {
    setContextMenu(null)
    setEditingNodeId(node.id)
    setEditingValue(node.label)
  }, [])

  const getContextMenuItems = useCallback((): (ContextMenuItem | 'separator')[] => {
    if (!contextMenu) return []
    const { node } = contextMenu
    if (node.kind === 'company') {
      const companyName = node.label
      return [
        { id: 'add-team', label: 'Add Team', onClick: () => { setContextMenu(null); handleQuickAdd(node) } },
        { id: 'rename', label: 'Rename Company', onClick: () => startRename(node) },
        { id: 'delete', label: 'Delete Company', onClick: () => {
          setContextMenu(null)
          const count = people.filter((p) => p.company === companyName).length
          const removedIds = new Set(people.filter((p) => p.company === companyName).map((p) => p.id))
          const groupsRemovedFrom = groupNamesContainingIds(savedGroups, removedIds)
          setDeleteConfirm({
            title: 'Delete Company?',
            message: `"${companyName}" and all its teams and people will be removed.`,
            impact: {
              peopleCount: count,
              ...(groupsRemovedFrom.length > 0 && { groupsRemovedFrom }),
            },
            onConfirm: () => {
              persistPeople(people.filter((p) => p.company !== companyName))
              setSelectedIds((prev) => new Set([...prev].filter((id) => !removedIds.has(id))))
              const next = { ...emptyTeams }
              delete next[companyName]
              persistEmptyTeams(next)
              setDeleteConfirm(null)
            },
          })
        } },
        'separator',
        { id: 'export', label: 'Export Company', onClick: () => {
          setContextMenu(null)
          const list = people.filter((p) => p.company === companyName)
          const blob = new Blob([JSON.stringify({ people: list }, null, 2)], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `company-${companyName}-${new Date().toISOString().slice(0, 10)}.json`
          a.click()
          URL.revokeObjectURL(url)
        } },
        { id: 'collapse', label: 'Collapse All', onClick: () => { setExpandedIds(new Set()); setContextMenu(null) } },
      ]
    }
    if (node.kind === 'team') {
      const path = node.path ?? []
      const companyName = path[0] ?? ''
      const teamName = node.label
      const teamKey = node.teamKey ?? (teamName === 'Other' ? '_' : teamName)
      const inTeam = (p: Person) =>
        personMatchesCompanyLabel(p, companyName) && personMatchesTeamKey(p, teamKey)
      const count = people.filter(inTeam).length
      return [
        { id: 'add-person', label: 'Add Person', onClick: () => { setContextMenu(null); openAddPerson(companyName, teamName === 'Other' ? '' : teamName) } },
        { id: 'rename', label: 'Rename Team', onClick: () => startRename(node) },
        { id: 'delete', label: 'Delete Team', onClick: () => {
          setContextMenu(null)
          const teamRemovedIds = new Set(people.filter(inTeam).map((p) => p.id))
          const groupsRemovedFrom = groupNamesContainingIds(savedGroups, teamRemovedIds)
          setDeleteConfirm({
            title: 'Delete Team?',
            message: `"${teamName}" will be removed. People in this team will need to be moved or removed.`,
            impact: {
              peopleCount: count,
              ...(groupsRemovedFrom.length > 0 && { groupsRemovedFrom }),
            },
            onConfirm: () => {
              const removedIds = new Set(people.filter(inTeam).map((p) => p.id))
              persistPeople(people.filter((p) => !inTeam(p)))
              setSelectedIds((prev) => new Set([...prev].filter((id) => !removedIds.has(id))))
              const next = { ...emptyTeams }
              const list = (next[companyName] ?? []).filter((t) => t !== teamKey)
              if (list.length === 0) delete next[companyName]
              else next[companyName] = list
              persistEmptyTeams(next)
              setDeleteConfirm(null)
            },
          })
        } },
        'separator',
        { id: 'collapse', label: 'Collapse', onClick: () => { setExpandedIds((prev) => { const n = new Set(prev); n.delete(node.id); return n }); setContextMenu(null) } },
      ]
    }
    if (node.kind === 'person' && node.person) {
      const person = node.person
      return [
        { id: 'view-profile', label: 'View Profile', onClick: () => { setContextMenu(null) } },
        { id: 'edit', label: 'Edit Person', onClick: () => { setContextMenu(null); if (node.person) openEditPerson(node.person) } },
        'separator',
        { id: 'view-assessments', label: 'View Assessments', onClick: () => { setContextMenu(null) } },
        'separator',
        { id: 'delete', label: 'Delete Person', onClick: () => {
          setContextMenu(null)
          const groupsRemovedFrom = groupNamesContainingIds(savedGroups, new Set([person.id]))
          setDeleteConfirm({
            title: 'Delete Person?',
            message: `"${person.name}" will be removed.`,
            impact: {
              peopleCount: 1,
              ...(groupsRemovedFrom.length > 0 && { groupsRemovedFrom }),
            },
            onConfirm: () => {
              persistPeople(people.filter((p) => p.id !== person.id))
              setSelectedIds((prev) => {
                const next = new Set(prev)
                next.delete(person.id)
                return next
              })
              setDeleteConfirm(null)
            },
          })
        } },
      ]
    }
    return []
  }, [contextMenu, people, emptyTeams, savedGroups, persistPeople, persistEmptyTeams, handleQuickAdd, startRename, openAddPerson, openEditPerson])

  const selectedPeople = useMemo(
    () => people.filter((p) => selectedIds.has(p.id)),
    [people, selectedIds]
  )
  const selectedCount = selectedPeople.length

  useEffect(() => {
    onSelectedPeopleChange?.(selectedPeople)
  }, [onSelectedPeopleChange, selectedPeople])

  // Register a stable deselect function so parent can trigger removal from outside.
  // setSelectedIds is stable (React guarantee), so empty deps is intentional.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    onRegisterDeselect?.((id) => {
      setSelectedIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    })
  }, [])

  useEffect(() => {
    onRegisterClearAll?.(() => {
      setSelectedIds(new Set())
    })
  }, [])

  const handleMultiSelectDelete = useCallback(() => {
    const groupsRemovedFrom = groupNamesContainingIds(savedGroups, selectedIds)
    setDeleteConfirm({
      title: 'Delete selected people?',
      message: `${selectedCount} people will be removed from the library. Companies and teams stay in the tree; empty spots are kept so you can add people again.`,
      impact: {
        peopleCount: selectedCount,
        ...(groupsRemovedFrom.length > 0 && { groupsRemovedFrom }),
      },
      onConfirm: () => {
        const removed = new Set(selectedIds)
        const nextPeople = people.filter((p) => !removed.has(p.id))
        const nextEmpty = emptyTeamsAfterRemovingPeople(people, removed, emptyTeams)
        persistPeople(nextPeople)
        persistEmptyTeams(nextEmpty)
        setSelectedIds(new Set())
        setDeleteConfirm(null)
      },
    })
  }, [selectedCount, selectedIds, people, savedGroups, emptyTeams, persistPeople, persistEmptyTeams])

  const handleMultiSelectExport = useCallback(() => {
    setShowExportModal(true)
  }, [])

  return {
    people,
    search,
    setSearch,
    viewMode,
    setViewMode,
    selectedIds,
    handleSelectionChange,
    expandedIds,
    setExpandedIds,
    savedGroups,
    emptyTeams,
    showAddModal,
    setShowAddModal,
    addPersonPreFill,
    setAddPersonPreFill,
    editingPerson,
    setEditingPerson,
    saveGroupName,
    setSaveGroupName,
    showSaveGroupPrompt,
    setShowSaveGroupPrompt,
    contextMenu,
    setContextMenu,
    editingNodeId,
    setEditingNodeId,
    editingValue,
    setEditingValue,
    deleteConfirm,
    setDeleteConfirm,
    fileInputRef,
    filteredPeople,
    handleAddPerson,
    handleUpdatePerson,
    openAddPerson,
    handleNewCompany,
    handleImportJson,
    handleFileChange,
    handleSaveGroup,
    handleConfirmSaveGroup,
    handleSelectSavedGroup,
    handleDeleteSavedGroup,
    handleMovePerson,
    handleMoveTeam,
    handleContextMenu,
    handleQuickAdd,
    handleRenameCommit,
    getContextMenuItems,
    selectedPeople,
    selectedCount,
    handleMultiSelectDelete,
    handleMultiSelectExport,
    showExportModal,
    setShowExportModal,
  }
}

export type TeamsDirectoryApi = ReturnType<typeof useTeamsDirectory>
