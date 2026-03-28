import { createPortal } from 'react-dom'
import type { TeamContextKey } from './types'
import { TeamsLibrary } from './TeamsLibrary'
import { SavedGroups } from './SavedGroups'
import { SelectedRoster } from './SelectedRoster'
import { AddPersonModal } from './AddPersonModal'
import { ContextMenu } from './ContextMenu'
import { DeleteConfirmModal } from './DeleteConfirmModal'
import { TeamsExportModal } from './TeamsExportModal'
import { useTeamsDirectory, type UseTeamsDirectoryProps } from './useTeamsDirectory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import './PeoplePanel.css'

export interface PeoplePanelProps extends UseTeamsDirectoryProps {
  activeContext: TeamContextKey
  onRemovePerson?: (id: string) => void
  onClearAll?: () => void
}

export function PeoplePanel({
  activeContext,
  onRemovePerson,
  onClearAll,
  ...directoryProps
}: PeoplePanelProps) {
  const api = useTeamsDirectory(directoryProps)

  return (
    <div className="people-panel">
      <div className="people-panel__body">
        <div className="people-panel__library-stack">
          <TeamsLibrary api={api} />

          <section className="saved-groups-card" aria-label="Saved groups">
            <h3 className="saved-groups-card__title">
              <FontAwesomeIcon icon={faBookmark} className="people-panel__title-icon" aria-hidden />
              Templates
            </h3>
            <div className="saved-groups-card__body">
              {api.savedGroups.length === 0 ? (
                <p className="saved-groups-card__empty">
                  Select two or more people in the library, then use <strong>Save as group</strong> to store them
                  here.
                </p>
              ) : (
                <SavedGroups
                  groups={api.savedGroups}
                  people={api.people}
                  onSelectGroup={api.handleSelectSavedGroup}
                  onDeleteGroup={api.handleDeleteSavedGroup}
                  showTitle={false}
                />
              )}
            </div>
          </section>
        </div>

        <div className="people-panel__selected">
          <SelectedRoster
            selectedPeople={api.selectedPeople}
            activeContext={activeContext}
            onRemovePerson={onRemovePerson}
            onClearAll={onClearAll}
          />
        </div>
      </div>

      {api.showAddModal && (
        <AddPersonModal
          onClose={() => {
            api.setShowAddModal(false)
            api.setAddPersonPreFill({})
            api.setEditingPerson(null)
          }}
          onAdd={api.handleAddPerson}
          onUpdate={api.handleUpdatePerson}
          initialCompany={api.addPersonPreFill.company}
          initialTeam={api.addPersonPreFill.team}
          personToEdit={api.editingPerson}
          existingPeople={api.people}
        />
      )}

      {api.contextMenu &&
        createPortal(
          <ContextMenu
            x={api.contextMenu.x}
            y={api.contextMenu.y}
            items={api.getContextMenuItems()}
            onClose={() => api.setContextMenu(null)}
          />,
          document.body
        )}

      {api.showExportModal &&
        createPortal(
          <TeamsExportModal
            people={api.selectedPeople}
            onClose={() => api.setShowExportModal(false)}
          />,
          document.body
        )}

      {api.deleteConfirm && (
        <DeleteConfirmModal
          title={api.deleteConfirm.title}
          message={api.deleteConfirm.message}
          impact={api.deleteConfirm.impact}
          onConfirm={api.deleteConfirm.onConfirm}
          onCancel={() => api.setDeleteConfirm(null)}
        />
      )}

      {api.showSaveGroupPrompt &&
        createPortal(
          <div
            className="people-panel__save-group-overlay"
            onClick={() => api.setShowSaveGroupPrompt(false)}
            role="presentation"
          >
            <div
              className="people-panel__save-group-modal"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="people-panel-save-group-title"
            >
              <h3 id="people-panel-save-group-title" className="people-panel__save-group-title">
                Save group
              </h3>
              <input
                type="text"
                className="people-panel__save-group-input"
                placeholder="e.g. Cross-Functional Team"
                value={api.saveGroupName}
                onChange={(e) => api.setSaveGroupName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && api.handleConfirmSaveGroup()}
              />
              <div className="people-panel__save-group-actions">
                <button type="button" onClick={() => api.setShowSaveGroupPrompt(false)}>
                  Cancel
                </button>
                <button type="button" onClick={api.handleConfirmSaveGroup}>
                  Save
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
