import type { FlowSequenceStep, FlowSituation } from './flowTypes'

export const PLACEHOLDER_BODY =
  'Placeholder copy. Replace with real guidance for this step.'

export const PLACEHOLDER_WHY =
  'Placeholder explanation of why this order works best for your brain type.'

export function makeSequence (
  labels: [string, string, string] = ['Step label', 'Step label', 'Step label']
): FlowSequenceStep[] {
  return [
    { brain: 'Head', label: labels[0], title: 'Step title goes here', body: PLACEHOLDER_BODY },
    { brain: 'Heart', label: labels[1], title: 'Step title goes here', body: PLACEHOLDER_BODY },
    { brain: 'Gut', label: labels[2], title: 'Step title goes here', body: PLACEHOLDER_BODY },
  ]
}

export function makeSituation (id: string, title: string, cardDescription?: string): FlowSituation {
  return {
    id,
    title,
    /* Placeholder: in real content this is a longer "How to ..." sentence. */
    cardTitle: title,
    cardDescription,
    readMinutes: 1,
    sequence: makeSequence(),
    whyText: PLACEHOLDER_WHY,
  }
}
