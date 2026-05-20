import type { CSSProperties, ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond, faHeart, faSquare, faFire, faBriefcase, faPeopleGroup, faChartLine } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type AnswerType = 'Head' | 'Heart' | 'Gut'

export const SECTION_ICONS: Record<number, IconDefinition> = {
  1: faFire,        // Under Pressure
  2: faBriefcase,   // Doing Work
  3: faPeopleGroup, // With People
  4: faChartLine    // Getting Better
}

export const getTier = (percent: number): 'Dominant' | 'Secondary' | 'Weak' => {
  if (percent >= 50) return 'Dominant'
  if (percent >= 35) return 'Secondary'
  return 'Weak'
}

/** Returns HHG combination key (e.g. "Head", "Head+Gut", "Head+Heart+Gut") for section lookup. */
export const getBrainCombinationKey = (headPercent: number, heartPercent: number, gutPercent: number): string => {
  const brains: { type: AnswerType; percent: number; tier: string }[] = [
    { type: 'Head', percent: headPercent, tier: getTier(headPercent) },
    { type: 'Heart', percent: heartPercent, tier: getTier(heartPercent) },
    { type: 'Gut', percent: gutPercent, tier: getTier(gutPercent) }
  ]
  brains.sort((a, b) => b.percent - a.percent)
  const first = brains[0]
  const second = brains[1]
  const third = brains[2]
  if (first.percent >= 30 && second.percent >= 30 && third.percent >= 30) return 'Head+Heart+Gut'
  if (first.tier === 'Dominant' && second.percent <= 34 && third.percent <= 34) return first.type
  if (first.percent >= 35 && second.percent >= 35) return `${first.type}+${second.type}`
  if (first.percent - second.percent <= 15 && second.percent >= 25) return `${first.type}+${second.type}`
  return first.type
}

export const getBalanceTipBadge = (brainCombination: string): string => {
  const map: Record<string, string> = {
    Head: 'Heart + Gut',
    'Head + Gut': 'Heart',
    'Head + Heart': 'Gut',
    Heart: 'Head + Gut',
    'Heart + Gut': 'Head',
    'Heart + Head': 'Gut',
    Gut: 'Head + Heart',
    'Gut + Head': 'Heart',
    'Gut + Heart': 'Head',
    'Head + Heart + Gut': 'Focus'
  }

  return map[brainCombination] ?? 'Focus'
}

/** Muted section palette vs Change Results combo row (`.change-results-centre-icon--*`). */
export type BrainIconPalette = 'muted' | 'changeResults'

const BRAIN_ICON_COLORS: Record<BrainIconPalette, { head: string; heart: string; gut: string }> = {
  muted: { head: '#2e6fa8', heart: '#bb3a3a', gut: '#3a8c57' },
  changeResults: { head: '#1368ce', heart: '#e21b3c', gut: '#26890c' }
}

export const getBrainIcons = (
  label: string,
  size: 'small' | 'large' = 'small',
  palette: BrainIconPalette = 'muted'
): ReactElement[] => {
  const icons: ReactElement[] = []
  const iconSize = size === 'large' ? '1.2rem' : '0.9rem'
  const iconMargin = size === 'large' ? '8px' : '4px'
  const colors = BRAIN_ICON_COLORS[palette]
  const parts = label.split(/\+|Strong/).map(part => part.trim()).filter(part => part.length > 0)
  parts.forEach((part, index) => {
    if (part.includes('Head')) {
      icons.push(<FontAwesomeIcon key={`head-${index}`} icon={faDiamond} style={{ color: colors.head, fontSize: iconSize, marginRight: index < parts.length - 1 ? iconMargin : '0' }} />)
    } else if (part.includes('Heart')) {
      icons.push(<FontAwesomeIcon key={`heart-${index}`} icon={faHeart} style={{ color: colors.heart, fontSize: iconSize, marginRight: index < parts.length - 1 ? iconMargin : '0' }} />)
    } else if (part.includes('Gut')) {
      icons.push(<FontAwesomeIcon key={`gut-${index}`} icon={faSquare} style={{ color: colors.gut, fontSize: iconSize, marginRight: index < parts.length - 1 ? iconMargin : '0' }} />)
    }
  })
  return icons
}

/** Brain accent colors for a combo label, in label order (matches `getBrainIcons`). */
export function getBrainColorsFromComboLabel (
  label: string,
  palette: BrainIconPalette = 'changeResults'
): string[] {
  const { head, heart, gut } = BRAIN_ICON_COLORS[palette]
  const colorByType = { Head: head, Heart: heart, Gut: gut }
  const parts = label.split(/\+|Strong/).map((part) => part.trim()).filter((part) => part.length > 0)
  const colors: string[] = []
  for (const part of parts) {
    if (part.includes('Head')) colors.push(colorByType.Head)
    else if (part.includes('Heart')) colors.push(colorByType.Heart)
    else if (part.includes('Gut')) colors.push(colorByType.Gut)
  }
  return colors
}

/** Segmented horizontal gradient for multi-brain accents (badges, borders). */
export function getComboAccentGradient (colors: string[]): string | null {
  if (colors.length <= 1) return null
  if (colors.length === 2) {
    return `linear-gradient(90deg, ${colors[0]} 50%, ${colors[1]} 50%)`
  }
  return `linear-gradient(90deg, ${colors[0]} 33.33%, ${colors[1]} 33.33%, ${colors[1]} 66.66%, ${colors[2]} 66.66%)`
}

export const getBrainCombination = (headPercent: number, heartPercent: number, gutPercent: number): { label: string; colors: string[] } => {
  const brains: { type: AnswerType; percent: number; tier: string }[] = [
    { type: 'Head', percent: headPercent, tier: getTier(headPercent) },
    { type: 'Heart', percent: heartPercent, tier: getTier(heartPercent) },
    { type: 'Gut', percent: gutPercent, tier: getTier(gutPercent) }
  ]
  brains.sort((a, b) => b.percent - a.percent)
  const first = brains[0]
  const second = brains[1]
  const third = brains[2]
  const colorMap: Record<AnswerType, string> = {
    // Muted palette for combo badge backgrounds (keep icon colors separate)
    'Head': '#2e6fa8',
    'Heart': '#bb3a3a',
    'Gut': '#3a8c57'
  }
  if (first.percent >= 30 && second.percent >= 30 && third.percent >= 30) {
    return { label: 'Head + Heart + Gut', colors: [colorMap.Head, colorMap.Heart, colorMap.Gut] }
  }
  if (first.tier === 'Dominant' && second.percent <= 34 && third.percent <= 34) {
    return { label: `${first.type} Strong`, colors: [colorMap[first.type]] }
  }
  if (first.percent >= 35 && second.percent >= 35) {
    return { label: `${first.type} + ${second.type}`, colors: [colorMap[first.type], colorMap[second.type]] }
  }
  if (first.percent - second.percent <= 15 && second.percent >= 25) {
    return { label: `${first.type} + ${second.type}`, colors: [colorMap[first.type], colorMap[second.type]] }
  }
  return { label: `${first.type} Strong`, colors: [colorMap[first.type]] }
}

export function getBalanceTipBadgeStyle(badgeText: string): CSSProperties {
  const colorMap: Record<string, string> = {
    // Muted palette for balance-tip badge backgrounds
    Head: '#2e6fa8',
    Heart: '#bb3a3a',
    Gut: '#3a8c57'
  }
  if (badgeText === 'Focus') {
    return { background: '#1e293b' }
  }
  const parts = badgeText.split('+').map((p) => p.trim()).filter(Boolean)
  const colors = parts.map((p) => colorMap[p]).filter(Boolean)
  if (colors.length === 1) {
    return { background: colors[0] }
  }
  if (colors.length === 2) {
    return { background: `linear-gradient(135deg, ${colors[0]} 50%, ${colors[1]} 50%)` }
  }
  if (colors.length >= 3) {
    return {
      background: `linear-gradient(135deg, ${colors[0]} 33.33%, ${colors[1]} 33.33%, ${colors[1]} 66.66%, ${colors[2]} 66.66%)`
    }
  }
  return { background: '#1e293b' }
}
