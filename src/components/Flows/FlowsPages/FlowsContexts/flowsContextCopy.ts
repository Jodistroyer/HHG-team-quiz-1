import type { FlowContextId } from '../../flowsData'

/** Per-situation prompt on each context browse page quick card (cycles with "Not this"). */
const SITUATION_QUICK_QUESTIONS: Record<FlowContextId, Record<string, string>> = {
  1: {
    'speaking-to-authority': 'Walking into a tough conversation?',
    'conflict-response': 'Need to respond without escalating things?',
  },
  2: {
    'burnout-loop': 'Caught in an exhaustion spiral at work?',
    'burnout-recovery': 'Trying to recover from burnout?',
    'stay-or-go': 'Deciding whether to stay or go?',
    'thrive-zone': 'Want to find your best way to thrive at work?',
  },
  3: {
    'managing-social-energy': 'Heading into a social situation?',
    'relationship-needs': 'Need to say what you need in a relationship?',
  },
  4: {
    'learning-style': 'Trying to turn what you learn into real skill?',
    'dealing-with-grief': 'Processing something from yesterday?',
  },
}

/** Fallback when a situation has no dedicated question yet. */
const CONTEXT_QUICK_QUESTION_FALLBACK: Record<FlowContextId, string> = {
  1: 'Walking into a tough conversation?',
  2: 'Deep work session coming up?',
  3: 'Heading into a social situation?',
  4: 'Processing something from yesterday?',
}

export function getContextQuickQuestion (
  contextId: FlowContextId,
  situationId: string
): string {
  return (
    SITUATION_QUICK_QUESTIONS[contextId][situationId] ??
    CONTEXT_QUICK_QUESTION_FALLBACK[contextId]
  )
}
