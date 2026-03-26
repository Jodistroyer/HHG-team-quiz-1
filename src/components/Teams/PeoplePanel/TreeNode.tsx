import { useEffect, useRef, useState } from 'react'
import type { TreeNode as TreeNodeType } from './types'
import { getPersonIdsUnder } from './data'
import './TreeNode.css'

interface TreeNodeProps {
  node: TreeNodeType
  depth: number
  selectedIds: Set<string>
  expandedIds: Set<string>
  onToggleExpand: (id: string) => void
  onToggleSelect: (ids: string[], checked: boolean) => void
  onSelectGroup: (node: TreeNodeType, checked: boolean) => void
  /** Id of the node currently highlighted as drop target (so this node can compute isDropTarget) */
  dropTargetId?: string | null
  /** When set (e.g. person under a team), this row delegates drop to that node so hover over people also accepts drop */
  parentDropNode?: TreeNodeType | null
  onDragOver?: (e: React.DragEvent, node: TreeNodeType) => void
  onDrop?: (e: React.DragEvent, node: TreeNodeType) => void
  onDragStart?: (e: React.DragEvent, personId: string) => void
  onDragEnd?: () => void
  /** Right-click context menu */
  onContextMenu?: (node: TreeNodeType, e: React.MouseEvent) => void
  /** Hover: quick add (company → add team, team → add person) */
  onQuickAdd?: (node: TreeNodeType) => void
  /** Inline rename */
  editingNodeId: string | null
  editingValue: string
  onRenameChange: (value: string) => void
  onRenameCommit: (nodeId: string, kind: string, newLabel: string) => void
  onRenameCancel: () => void
}

export function TreeNode({
  node,
  depth,
  selectedIds,
  expandedIds,
  onToggleExpand,
  onToggleSelect,
  onSelectGroup,
  dropTargetId,
  parentDropNode,
  onDragOver,
  onDrop,
  onDragStart,
  onDragEnd,
  onContextMenu,
  onQuickAdd,
  editingNodeId,
  editingValue,
  onRenameChange,
  onRenameCommit,
  onRenameCancel,
}: TreeNodeProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const isExpanded = expandedIds.has(node.id)
  const hasChildren = node.children.length > 0
  const isPerson = node.kind === 'person' && node.person
  const isDropTarget = dropTargetId === node.id
  const canAcceptDrop = (node.kind === 'company' || node.kind === 'team') && onDrop
  /** Person rows delegate to parent team so hovering over people in a team also accepts drop */
  const delegateDropToParent = isPerson && parentDropNode && (parentDropNode.kind === 'company' || parentDropNode.kind === 'team') && onDrop
  const personIds = isPerson ? [node.person!.id] : getPersonIdsUnder(node)
  const allSelected = personIds.length > 0 && personIds.every((id) => selectedIds.has(id))
  const someSelected = personIds.some((id) => selectedIds.has(id))
  const indeterminate = someSelected && !allSelected
  const checkboxRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const isEditing = editingNodeId === node.id

  useEffect(() => {
    const el = checkboxRef.current
    if (el) el.indeterminate = indeterminate
  }, [indeterminate])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    if (isPerson) {
      onToggleSelect(personIds, checked)
    } else {
      onSelectGroup(node, checked)
    }
  }

  const handleDragStart = (e: React.DragEvent) => {
    if (!isPerson || !node.person || !onDragStart) return
    e.dataTransfer.setData('text/plain', node.person.id)
    e.dataTransfer.effectAllowed = 'move'
    setIsDragging(true)
    onDragStart(e, node.person.id)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    onDragEnd?.()
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    if (isEditing) return
    e.preventDefault()
    onContextMenu?.(node, e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const v = (e.target as HTMLInputElement).value.trim()
      if (v) onRenameCommit(node.id, node.kind, v)
      else onRenameCancel()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onRenameCancel()
    }
  }

  const showHoverActions =
    (node.kind === 'company' || node.kind === 'team' || node.kind === 'person') &&
    (onContextMenu || onQuickAdd) &&
    !isEditing

  return (
    <div
      className={`tree-node tree-node--depth-${depth} ${isDropTarget ? 'tree-node--drop-target' : ''} ${isDragging ? 'tree-node--dragging' : ''}`}
      style={{ paddingLeft: depth * 14 }}
    >
      <div
        className="tree-node__row"
        draggable={isPerson && !!onDragStart}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={(canAcceptDrop || delegateDropToParent) && onDragOver ? (e) => onDragOver(e, delegateDropToParent ? parentDropNode! : node) : undefined}
        onDrop={(canAcceptDrop || delegateDropToParent) ? (e) => onDrop?.(e, delegateDropToParent ? parentDropNode! : node) : undefined}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className="tree-node__expand"
          role="button"
          tabIndex={0}
          onClick={() => hasChildren && onToggleExpand(node.id)}
          onKeyDown={(e) => e.key === 'Enter' && hasChildren && onToggleExpand(node.id)}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          {hasChildren ? (isExpanded ? '▾' : '▸') : ' '}
        </span>
        <label className="tree-node__label">
          <input
            type="checkbox"
            checked={allSelected}
            ref={checkboxRef}
            onChange={handleCheck}
            className="tree-node__checkbox"
          />
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              className="tree-node__inline-input"
              value={editingValue}
              onChange={(e) => onRenameChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                const v = editingValue.trim()
                if (v) onRenameCommit(node.id, node.kind, v)
                onRenameCancel()
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <>
              <span className="tree-node__title">
                {node.label}
                {node.count != null && node.count > 0 && (
                  <span className="tree-node__count"> ({node.count})</span>
                )}
              </span>
              {node.indicatorDotColors && node.indicatorDotColors.length > 0 && (
                <span
                  className="tree-node__dots"
                  aria-label={node.aggregateLabel ? `HHG balance: ${node.aggregateLabel}` : 'HHG balance'}
                >
                  {node.indicatorDotColors.map((color, i) => (
                    <span key={i} className="tree-node__dot" style={{ backgroundColor: color }} />
                  ))}
                </span>
              )}
            </>
          )}
        </label>
        {showHoverActions && isHovered && (
          <div className="tree-node__hover-actions">
            {(node.kind === 'company' || node.kind === 'team') && onQuickAdd && (
              <button
                type="button"
                className="tree-node__hover-btn tree-node__hover-btn--add"
                onClick={(e) => {
                  e.stopPropagation()
                  onQuickAdd(node)
                }}
                title={node.kind === 'company' ? 'Add Team' : 'Add Person'}
                aria-label={node.kind === 'company' ? 'Add Team' : 'Add Person'}
              >
                +
              </button>
            )}
            {onContextMenu && (
              <button
                type="button"
                className="tree-node__hover-btn tree-node__hover-btn--menu"
                onClick={(e) => {
                  e.stopPropagation()
                  onContextMenu(node, e)
                }}
                title="Menu"
                aria-label="Open menu"
              >
                ⋯
              </button>
            )}
          </div>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="tree-node__children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedIds={selectedIds}
              expandedIds={expandedIds}
              onToggleExpand={onToggleExpand}
              onToggleSelect={onToggleSelect}
              onSelectGroup={onSelectGroup}
              dropTargetId={dropTargetId}
              parentDropNode={node.kind === 'team' || node.kind === 'company' ? node : parentDropNode}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onContextMenu={onContextMenu}
              onQuickAdd={onQuickAdd}
              editingNodeId={editingNodeId}
              editingValue={editingValue}
              onRenameChange={onRenameChange}
              onRenameCommit={onRenameCommit}
              onRenameCancel={onRenameCancel}
            />
          ))}
        </div>
      )}
      {node.kind === 'team' && node.children.length === 0 && (
        <div className="tree-node__empty-state" style={{ paddingLeft: (depth + 1) * 14 + 20 }}>
          <div className="tree-node__empty-text">No people yet</div>
          {onQuickAdd && (
            <button
              type="button"
              className="tree-node__empty-add"
              onClick={() => onQuickAdd(node)}
            >
              + Add Person
            </button>
          )}
        </div>
      )}
    </div>
  )
}
