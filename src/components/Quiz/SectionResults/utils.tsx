import type { ReactElement } from 'react'
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

export const getBrainIcons = (label: string, size: 'small' | 'large' = 'small'): ReactElement[] => {
  const icons: ReactElement[] = []
  const iconSize = size === 'large' ? '1.2rem' : '0.9rem'
  const iconMargin = size === 'large' ? '8px' : '4px'
  const parts = label.split(/\+|Strong/).map(part => part.trim()).filter(part => part.length > 0)
  parts.forEach((part, index) => {
    if (part.includes('Head')) {
      icons.push(<FontAwesomeIcon key={`head-${index}`} icon={faDiamond} style={{ color: '#1368ce', fontSize: iconSize, marginRight: index < parts.length - 1 ? iconMargin : '0' }} />)
    } else if (part.includes('Heart')) {
      icons.push(<FontAwesomeIcon key={`heart-${index}`} icon={faHeart} style={{ color: '#e21b3c', fontSize: iconSize, marginRight: index < parts.length - 1 ? iconMargin : '0' }} />)
    } else if (part.includes('Gut')) {
      icons.push(<FontAwesomeIcon key={`gut-${index}`} icon={faSquare} style={{ color: '#26890c', fontSize: iconSize, marginRight: index < parts.length - 1 ? iconMargin : '0' }} />)
    }
  })
  return icons
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
    'Head': '#1368ce',
    'Heart': '#e21b3c',
    'Gut': '#26890c'
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
