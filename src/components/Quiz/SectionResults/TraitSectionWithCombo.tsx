import type { ReactNode } from 'react'
import { ChangeResultsComboCell } from '../ChangeResults/ChangeResultsComboCell'

interface TraitSectionWithComboProps {
  comboLabel: string
  children: ReactNode
  className?: string
  scrollTargetId?: string
  scrollTargetLabel?: string
}

export function TraitSectionWithCombo ({
  comboLabel,
  children,
  className,
  scrollTargetId,
  scrollTargetLabel,
}: TraitSectionWithComboProps) {
  const rowClass = ['trait-section-row', className].filter(Boolean).join(' ')

  return (
    <div className={rowClass}>
      <ChangeResultsComboCell
        comboLabel={comboLabel}
        scrollTargetId={scrollTargetId}
        scrollTargetLabel={scrollTargetLabel}
        hideArchetypeLabel
      />
      {children}
    </div>
  )
}
