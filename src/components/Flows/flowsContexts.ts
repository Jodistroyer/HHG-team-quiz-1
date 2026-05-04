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

/** Brand purple used across the project (also `--qi-purple` in some CSS). */
export const FLOWS_PURPLE = '#7d3dbd'
export const FLOWS_PURPLE_DEEP = '#5c2d8a'
export const FLOWS_PURPLE_SOFT = '#EEEDFE'
