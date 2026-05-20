export interface TeamParticipationNoteProps {
  contributingCount: number
  totalSelected: number
  className?: string
}

/** Shown under team profile sections: how many members contributed to the average. */
export function TeamParticipationNote ({
  contributingCount,
  totalSelected,
  className = '',
}: TeamParticipationNoteProps) {
  if (totalSelected === 0) return null

  const memberWord = totalSelected === 1 ? 'team member' : 'team members'

  return (
    <p className={`team-map-results__participation${className ? ` ${className}` : ''}`}>
      Based on {contributingCount} of {totalSelected} {memberWord}
    </p>
  )
}
