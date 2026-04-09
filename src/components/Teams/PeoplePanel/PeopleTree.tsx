import { useCallback, useState } from 'react'
import type { TreeNode as TreeNodeType, Person, ViewMode } from './types'
import type { EmptyTeams } from './data'
import { buildTree, getPersonIdsUnder } from './data'
import { TreeNode } from './TreeNode'
import './PeopleTree.css'

const TEAM_DRAG_PREFIX = 'hhg:team:'

function parseTeamDragPayload(raw: string): { company: string; teamKey: string; nodeId: string } | null {
  if (!raw.startsWith(TEAM_DRAG_PREFIX)) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(raw.slice(TEAM_DRAG_PREFIX.length))) as unknown
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      typeof (parsed as { company?: unknown }).company !== 'string' ||
      typeof (parsed as { teamKey?: unknown }).teamKey !== 'string' ||
      typeof (parsed as { nodeId?: unknown }).nodeId !== 'string'
    ) {
      return null
    }
    return parsed as { company: string; teamKey: string; nodeId: string }
  } catch {
    return null
  }
}

interface PeopleTreeProps {
  people: Person[]
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
  viewMode: ViewMode
  expandedIds: Set<string>
  onExpandedChange: (ids: Set<string>) => void
  onMovePerson?: (personId: string, targetNode: TreeNodeType) => void
  /** Organization view: move a whole team onto a target company (same name; disambiguate if taken). */
  onMoveTeam?: (
    sourceCompany: string,
    sourceTeamKey: string,
    sourceNodeId: string,
    targetNode: TreeNodeType
  ) => void
  emptyTeams: EmptyTeams
  onContextMenu?: (node: TreeNodeType, e: React.MouseEvent) => void
  onQuickAdd?: (node: TreeNodeType) => void
  editingNodeId: string | null
  editingValue: string
  onRenameChange: (value: string) => void
  onRenameCommit: (nodeId: string, kind: string, newLabel: string) => void
  onRenameCancel: () => void
}

export function PeopleTree({
  people,
  selectedIds,
  onSelectionChange,
  viewMode,
  expandedIds,
  onExpandedChange,
  onMovePerson,
  onMoveTeam,
  emptyTeams,
  onContextMenu,
  onQuickAdd,
  editingNodeId,
  editingValue,
  onRenameChange,
  onRenameCommit,
  onRenameCancel,
}: PeopleTreeProps) {
  const [dropTargetId, setDropTargetId] = useState<string | null>(null)
  const [draggingTeamId, setDraggingTeamId] = useState<string | null>(null)

  const tree = buildTree(people, viewMode, emptyTeams)

  const handleToggleExpand = useCallback(
    (id: string) => {
      const next = new Set(expandedIds)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      onExpandedChange(next)
    },
    [expandedIds, onExpandedChange]
  )

  const handleToggleSelect = useCallback(
    (ids: string[], checked: boolean) => {
      const next = new Set(selectedIds)
      if (checked) ids.forEach((id) => next.add(id))
      else ids.forEach((id) => next.delete(id))
      onSelectionChange(next)
    },
    [selectedIds, onSelectionChange]
  )

  const handleSelectGroup = useCallback(
    (node: TreeNodeType, checked: boolean) => {
      const ids = getPersonIdsUnder(node)
      handleToggleSelect(ids, checked)
    },
    [handleToggleSelect]
  )

  const handleDragOver = useCallback(
    (e: React.DragEvent, node: TreeNodeType) => {
      if (draggingTeamId) {
        if (node.kind !== 'company') return
        if (node.id === draggingTeamId) return
      } else if (node.kind !== 'company' && node.kind !== 'team') {
        return
      }
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      setDropTargetId(node.id)
    },
    [draggingTeamId]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent, node: TreeNodeType) => {
      e.preventDefault()
      setDropTargetId(null)
      setDraggingTeamId(null)
      const raw = e.dataTransfer.getData('text/plain')
      const teamPayload = parseTeamDragPayload(raw)
      if (teamPayload && onMoveTeam) {
        if (node.kind === 'company') {
          onMoveTeam(teamPayload.company, teamPayload.teamKey, teamPayload.nodeId, node)
          const next = new Set(expandedIds)
          next.add(node.id)
          onExpandedChange(next)
        }
        return
      }
      if (raw && onMovePerson) {
        onMovePerson(raw, node)
        const next = new Set(expandedIds)
        next.add(node.id)
        if (node.kind === 'team' && node.path?.[0]) next.add(`company-${node.path[0]}`)
        onExpandedChange(next)
      }
    },
    [onMovePerson, onMoveTeam, expandedIds, onExpandedChange]
  )

  const handleDragLeave = useCallback(() => {
    setDropTargetId(null)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDropTargetId(null)
    setDraggingTeamId(null)
  }, [])

  const handleTeamDragStart = useCallback((_e: React.DragEvent, nodeId: string) => {
    setDraggingTeamId(nodeId)
  }, [])

  const allowTeamDrag = viewMode === 'company' && !!onMoveTeam

  return (
    <div className="people-tree" onDragLeave={handleDragLeave}>
      {tree.length === 0 ? (
        <div className="people-tree__empty">No people to show. Add or import to get started.</div>
      ) : (
        tree.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            selectedIds={selectedIds}
            expandedIds={expandedIds}
            onToggleExpand={handleToggleExpand}
            onToggleSelect={handleToggleSelect}
            onSelectGroup={handleSelectGroup}
            dropTargetId={dropTargetId}
            teamDragActive={!!draggingTeamId}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={onMovePerson ? () => {} : undefined}
            onDragStartTeam={allowTeamDrag ? handleTeamDragStart : undefined}
            onDragEnd={handleDragEnd}
            onContextMenu={onContextMenu}
            onQuickAdd={onQuickAdd}
            editingNodeId={editingNodeId}
            editingValue={editingValue}
            onRenameChange={onRenameChange}
            onRenameCommit={onRenameCommit}
            onRenameCancel={onRenameCancel}
          />
        ))
      )}
    </div>
  )
}
