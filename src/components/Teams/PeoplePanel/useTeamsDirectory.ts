import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Person, ViewMode, SavedGroup, TreeNode as TreeNodeType } from './types'
import type { EmptyTeams } from './data'
import {
  SAMPLE_PEOPLE,
  filterPeopleBySearch,
  personFromQuizExport,
  peopleFromImport,
  isQuizExport,
  nextId,
} from './data'
import type { ContextMenuItem } from './ContextMenu'
import type { DeleteImpact } from './DeleteConfirmModal'

export interface UseTeamsDirectoryProps {
  onSelectedPeopleChange?: (people: Person[]) => void
  /** Called once on mount; receives a stable function that deselects a person by id. */
  onRegisterDeselect?: (deselect: (id: string) => void) => void
  /** Called once on mount; receives a stable function that clears the whole selection. */
  onRegisterClearAll?: (clearAll: () => void) => void
}

const STORAGE_KEY_PEOPLE = 'hhg.people.v1'
const STORAGE_KEY_SAVED_GROUPS = 'hhg.people.savedGroups.v1'
const STORAGE_KEY_EMPTY_TEAMS = 'hhg.people.emptyTeams.v1'

function groupNamesContainingIds(groups: SavedGroup[], ids: Set<string>): string[] {
  return groups.filter((g) => g.personIds.some((id) => ids.has(id))).map((g) => g.name)
}

function loadPeople(): Person[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PEOPLE)
    if (!raw) return SAMPLE_PEOPLE
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return SAMPLE_PEOPLE
    // Migrate old data: department → team
    return parsed.map((p: Person & { department?: string }) => {
      const { department, ...rest } = p
      return { ...rest, team: p.team ?? department } as Person
    })
  } catch {
    return SAMPLE_PEOPLE
  }
}

function loadSavedGroups(): SavedGroup[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED_GROUPS)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function loadEmptyTeams(): EmptyTeams {
  try {
    let raw = localStorage.getItem(STORAGE_KEY_EMPTY_TEAMS)
    if (!raw) {
      // Migrate from old key (emptyDepartments → emptyTeams)
      raw = localStorage.getItem('hhg.people.emptyDepartments.v1')
    }
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? parsed : {}
  } catch {
    return {}
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
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredPeople = filterPeopleBySearch(people, search)

  const persistPeople = useCallback((next: Person[]) => {
    setPeople(next)
    try {
      localStorage.setItem(STORAGE_KEY_PEOPLE, JSON.stringify(next))
    } catch {
      /* ignore */
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
      persistSavedGroups(savedGroups.filter((g) => g.id !== id))
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
        team = label
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
        const isUncategorized = oldName === 'Uncategorized'
        const nextPeople = people.map((p) => {
          const matches = isUncategorized
            ? (p.company == null || p.company === '' || p.company === 'Uncategorized')
            : p.company === oldName
          return matches ? { ...p, company: newLabel } : p
        })
        if (Object.keys(emptyTeams).includes(oldName)) {
          const next = { ...emptyTeams }
          next[newLabel] = next[oldName]
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
          const parts = newLabel.split(' — ')
          const name = parts[0]?.trim() ?? person.name
          const role = parts[1]?.trim() ?? person.role
          persistPeople(
            people.map((p) =>
              p.id === nodeId ? { ...p, name, role: role || undefined } : p
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
      const companyName = path[0]
      const teamName = node.label
      const count = people.filter((p) => p.company === companyName && p.team === teamName).length
      return [
        { id: 'add-person', label: 'Add Person', onClick: () => { setContextMenu(null); openAddPerson(companyName, teamName) } },
        { id: 'rename', label: 'Rename Team', onClick: () => startRename(node) },
        { id: 'delete', label: 'Delete Team', onClick: () => {
          setContextMenu(null)
          const teamRemovedIds = new Set(
            people
              .filter((p) => p.company === companyName && p.team === teamName)
              .map((p) => p.id)
          )
          const groupsRemovedFrom = groupNamesContainingIds(savedGroups, teamRemovedIds)
          setDeleteConfirm({
            title: 'Delete Team?',
            message: `"${teamName}" will be removed. People in this team will need to be moved or removed.`,
            impact: {
              peopleCount: count,
              ...(groupsRemovedFrom.length > 0 && { groupsRemovedFrom }),
            },
            onConfirm: () => {
              const removedIds = new Set(
                people
                  .filter((p) => p.company === companyName && p.team === teamName)
                  .map((p) => p.id)
              )
              persistPeople(people.filter((p) => !(p.company === companyName && p.team === teamName)))
              setSelectedIds((prev) => new Set([...prev].filter((id) => !removedIds.has(id))))
              const next = { ...emptyTeams }
              const list = (next[companyName] ?? []).filter((t) => t !== teamName)
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
        { id: 'add-to-group', label: 'Add to Group', onClick: () => { setContextMenu(null); setSelectedIds((prev) => new Set(prev).add(person.id)) } },
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
      message: `${selectedCount} people will be removed.`,
      impact: {
        peopleCount: selectedCount,
        ...(groupsRemovedFrom.length > 0 && { groupsRemovedFrom }),
      },
      onConfirm: () => {
        persistPeople(people.filter((p) => !selectedIds.has(p.id)))
        setSelectedIds(new Set())
        setDeleteConfirm(null)
      },
    })
  }, [selectedCount, selectedIds, people, savedGroups, persistPeople])

  const handleMultiSelectExport = useCallback(() => {
    const list = selectedPeople
    const blob = new Blob([JSON.stringify({ people: list }, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `people-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [selectedPeople])

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
    handleContextMenu,
    handleQuickAdd,
    handleRenameCommit,
    getContextMenuItems,
    selectedPeople,
    selectedCount,
    handleMultiSelectDelete,
    handleMultiSelectExport,
  }
}

export type TeamsDirectoryApi = ReturnType<typeof useTeamsDirectory>
