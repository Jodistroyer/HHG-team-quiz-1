/** Short context line for each quiz section (title is shown separately in the header). */
export const SECTION_CONTEXT_BY_ID: Record<number, string> = {
  1: 'How you act when stakes are high.',
  2: 'Your normal execution style.',
  3: 'Who you are in relationships and social dynamics.',
  4: 'How you reflect, grow, and improve over time.',
}

const SECTION_TITLE_TO_ID: Record<string, number> = {
  'under pressure': 1,
  'doing work': 2,
  'with people': 3,
  'getting better': 4,
}

/** Same copy as `section-card-context` on SectionCard, keyed by section title. */
export function sectionContextForTitle (title: string): string | undefined {
  const id = SECTION_TITLE_TO_ID[title.trim().toLowerCase()]
  return id !== undefined ? SECTION_CONTEXT_BY_ID[id] : undefined
}
