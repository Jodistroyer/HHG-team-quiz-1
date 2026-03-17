import { useCallback, useState } from 'react'
import type { TreeNode as TreeNodeType, Person, ViewMode } from './types'
import type { EmptyTeams } from './data'
import { buildTree, getPersonIdsUnder } from './data'
import { TreeNode } from './TreeNode'
import './PeopleTree.css'

interface PeopleTreeProps {
  people: Person[]
  selectedIds: Set<string>
  onSelectionChange: (ids: Set<string>) => void
  viewMode: ViewMode
  expandedIds: Set<string>
  onExpandedChange: (ids: Set<string>) => void
  onMovePerson?: (personId: string, targetNode: TreeNodeType) => void
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

  const handleDragOver = useCallback((e: React.DragEvent, node: TreeNodeType) => {
    if (node.kind !== 'company' && node.kind !== 'team') return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDropTargetId(node.id)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent, node: TreeNodeType) => {
      e.preventDefault()
      setDropTargetId(null)
      const personId = e.dataTransfer.getData('text/plain')
      if (personId && onMovePerson) {
        onMovePerson(personId, node)
        // Expand target so the moved person is visible
        const next = new Set(expandedIds)
        next.add(node.id)
        if (node.kind === 'team' && node.path?.[0]) next.add(`company-${node.path[0]}`)
        onExpandedChange(next)
      }
    },
    [onMovePerson, expandedIds, onExpandedChange]
  )

  const handleDragLeave = useCallback(() => {
    setDropTargetId(null)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDropTargetId(null)
  }, [])

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
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragStart={onMovePerson ? () => {} : undefined}
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
