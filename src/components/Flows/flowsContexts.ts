/**
 * Per-context visual metadata: icon (matches the rest of the app) plus a small
 * accent color used for dots, card strips, and tab underlines so the four
 * contexts stay distinguishable while the page itself remains purple-led.
 *
 * Section icons mirror those used in Quiz / SectionResults so the Flows page
 * reads as part of the same product.
 */

import {
  faFire,
  faBriefcase,
  faPeopleGroup,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { BrainType, FlowContextId } from './flowsData'

export interface FlowContextMeta {
  id: FlowContextId
  icon: IconDefinition
  /** Small accent color for the context dot / card strip / tab underline. */
  accent: string
  /** Soft tinted background, used for hover/active surfaces. */
  accentSoft: string
}

/**
 * The per-context thumbnail background colors used by FlowCard live in
 * `Quiz/ContextArt.ts` (`CONTEXT_BACKGROUND`) so the same colors are shared
 * with SectionCard, QuizIntro, ChangeResults, and TeamPairInsights.
 */
export const FLOW_CONTEXT_META: Record<FlowContextId, FlowContextMeta> = {
  1: { id: 1, icon: faFire, accent: '#D85A30', accentSoft: '#FAECE7' },
  2: { id: 2, icon: faBriefcase, accent: '#185FA5', accentSoft: '#E0EDF7' },
  3: { id: 3, icon: faPeopleGroup, accent: '#1D9E75', accentSoft: '#E1F5EE' },
  4: { id: 4, icon: faChartLine, accent: '#7F77DD', accentSoft: '#EEEDFE' },
}

export interface BrainPalette {
  /** Solid color for icon / accent. Matches `getBrainIcons` "changeResults" palette. */
  color: string
  /** Soft tint for badges / step number circles. */
  soft: string
  /** Slightly stronger ink for text on the soft tint. */
  ink: string
}

export const BRAIN_PALETTE: Record<BrainType, BrainPalette> = {
  Head: { color: '#1368ce', soft: '#E0ECFA', ink: '#0c4a8e' },
  Heart: { color: '#e21b3c', soft: '#FBE3E8', ink: '#8b1023' },
  Gut: { color: '#26890c', soft: '#E1F1DC', ink: '#185708' },
}

/**
 * Muted Head / Heart / Gut (quiz-style). Used in Flows detail “How to do it”
 * steps and the brain-type sidebar so icons don’t compete with the bright
 * sequence strip.
 */
export const BRAIN_MUTED: Record<BrainType, string> = {
  Head: 'rgb(46, 111, 168)',
  Heart: '#bb3a3a',
  Gut: '#3a8c57',
}

/** Slightly darker muted ink for step titles on white. */
export const BRAIN_MUTED_INK: Record<BrainType, string> = {
  Head: '#1f4a6e',
  Heart: '#722929',
  Gut: '#2a5234',
}

/** Brand purple used across the project (also `--qi-purple` in some CSS). */
export const FLOWS_PURPLE = '#7d3dbd'
export const FLOWS_PURPLE_DEEP = '#5c2d8a'
export const FLOWS_PURPLE_SOFT = '#EEEDFE'
