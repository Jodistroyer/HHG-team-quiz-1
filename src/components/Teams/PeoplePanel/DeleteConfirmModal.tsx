import './DeleteConfirmModal.css'

export interface DeleteImpact {
  peopleCount: number
  /** Names of saved groups the person(s) will be removed from */
  groupsRemovedFrom?: string[]
  /** Optional e.g. assessments - for future use */
  extra?: { label: string; count: number }[]
}

interface DeleteConfirmModalProps {
  title: string
  message: string
  impact: DeleteImpact
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmModal({
  title,
  message,
  impact,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  const hasImpact =
    impact.peopleCount > 0 ||
    (impact.extra?.length ?? 0) > 0 ||
    (impact.groupsRemovedFrom?.length ?? 0) > 0

  return (
    <div className="delete-confirm-backdrop" onClick={onCancel}>
      <div className="delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="delete-confirm-title">{title}</h3>
        <p className="delete-confirm-message">{message}</p>
        {hasImpact && (
          <div className="delete-confirm-impact">
            <div className="delete-confirm-impact-title">This will remove:</div>
            <ul>
              {impact.peopleCount > 0 && (
                <li>{impact.peopleCount} {impact.peopleCount === 1 ? 'person' : 'people'}</li>
              )}
              {impact.groupsRemovedFrom && impact.groupsRemovedFrom.length > 0 && (
                <li>
                  {impact.groupsRemovedFrom.length === 1
                    ? 'Removed from saved group: '
                    : 'Removed from saved groups: '}
                  {impact.groupsRemovedFrom.join(', ')}
                </li>
              )}
              {impact.extra?.map((e, i) => (
                <li key={i}>{e.count} {e.label}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="delete-confirm-actions">
          <button type="button" className="delete-confirm-btn delete-confirm-btn--cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="delete-confirm-btn delete-confirm-btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
