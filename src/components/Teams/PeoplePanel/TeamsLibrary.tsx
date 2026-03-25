import { PeopleSearch } from './PeopleSearch'
import { ViewModeToggle } from './ViewModeToggle'
import { PeopleTree } from './PeopleTree'
import type { TeamsDirectoryApi } from './useTeamsDirectory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpen,
  faBuilding,
  faDownload,
  faFileImport,
  faFloppyDisk,
  faTrash,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import './TeamsLibrary.css'

export interface TeamsLibraryProps {
  api: TeamsDirectoryApi
}

/** Tree, search, and actions for people in the organization (Teams Library card). */
export function TeamsLibrary({ api }: TeamsLibraryProps) {
  const {
    search,
    setSearch,
    filteredPeople,
    viewMode,
    setViewMode,
    selectedIds,
    handleSelectionChange,
    expandedIds,
    setExpandedIds,
    emptyTeams,
    handleMovePerson,
    handleContextMenu,
    handleQuickAdd,
    editingNodeId,
    editingValue,
    setEditingValue,
    handleRenameCommit,
    openAddPerson,
    handleNewCompany,
    handleImportJson,
    fileInputRef,
    handleFileChange,
    handleSaveGroup,
    handleMultiSelectExport,
    handleMultiSelectDelete,
    selectedCount,
    setEditingNodeId,
  } = api

  return (
    <div className="teams-library">
      <header className="teams-library__header">
        <h2 className="teams-library__title">
          <FontAwesomeIcon icon={faBookOpen} className="teams-library__title-icon" aria-hidden />
          Teams Library
        </h2>
      </header>

      <div className="teams-library__search">
        <PeopleSearch value={search} onChange={setSearch} />
      </div>

      <div className="teams-library__actions">
        <button type="button" className="teams-library__btn teams-library__btn--add" onClick={() => openAddPerson()}>
          <FontAwesomeIcon icon={faUserPlus} className="teams-library__btn-icon" aria-hidden />
          Add Person
        </button>
        <button type="button" className="teams-library__btn teams-library__btn--secondary" onClick={handleNewCompany}>
          <FontAwesomeIcon icon={faBuilding} className="teams-library__btn-icon" aria-hidden />
          Add Company
        </button>
        <button type="button" className="teams-library__btn teams-library__btn--import" onClick={handleImportJson}>
          <FontAwesomeIcon icon={faFileImport} className="teams-library__btn-icon" aria-hidden />
          Import JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          className="teams-library__file-input"
          onChange={handleFileChange}
          aria-hidden
        />
      </div>

      <ViewModeToggle value={viewMode} onChange={setViewMode} />

      <div className="teams-library__tree-wrap">
        <PeopleTree
          people={filteredPeople}
          selectedIds={selectedIds}
          onSelectionChange={handleSelectionChange}
          viewMode={viewMode}
          expandedIds={expandedIds}
          onExpandedChange={setExpandedIds}
          onMovePerson={handleMovePerson}
          emptyTeams={emptyTeams}
          onContextMenu={handleContextMenu}
          onQuickAdd={handleQuickAdd}
          editingNodeId={editingNodeId}
          editingValue={editingValue}
          onRenameChange={setEditingValue}
          onRenameCommit={handleRenameCommit}
          onRenameCancel={() => {
            setEditingNodeId(null)
            setEditingValue('')
          }}
        />
      </div>

      <div className="teams-library__footer">
        <div className="teams-library__footer-buttons">
          {selectedCount >= 2 && (
            <button type="button" className="teams-library__save-group-btn" onClick={handleSaveGroup}>
              <FontAwesomeIcon icon={faFloppyDisk} className="teams-library__btn-icon" aria-hidden />
              Save as group ({selectedCount})
            </button>
          )}

          {selectedCount >= 1 && (
            <div className="teams-library__footer-actions">
              <button type="button" className="teams-library__footer-btn" onClick={handleMultiSelectExport}>
                <FontAwesomeIcon icon={faDownload} className="teams-library__btn-icon" aria-hidden />
                Export
              </button>
              <button
                type="button"
                className="teams-library__footer-btn teams-library__footer-btn--danger"
                onClick={handleMultiSelectDelete}
              >
                <FontAwesomeIcon icon={faTrash} className="teams-library__btn-icon" aria-hidden />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
