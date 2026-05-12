import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import type { FlowsBrainProfile } from '../Flows'
import { BRAIN_MUTED } from '../flowsContexts'
import '../../Quiz/Sidebar/Navigation/NavSection.css'
import './BrainTypeSidebar.css'

export type BrainTypeSidebarItemId =
  | 'head-strong'
  | 'head-gut'
  | 'head-heart'
  | 'heart-strong'
  | 'heart-gut'
  | 'heart-head'
  | 'gut-strong'
  | 'gut-head'
  | 'gut-heart'
  | 'balanced'

type BrainKey = 'Head' | 'Heart' | 'Gut'

const GROUPS: {
  groupId: 'head' | 'heart' | 'gut'
  title: string
  items: { id: BrainTypeSidebarItemId; label: string }[]
}[] = [
  {
    groupId: 'head',
    title: 'Head',
    items: [
      { id: 'head-strong', label: 'Thinker' },
      { id: 'head-gut', label: 'Tactician' },
      { id: 'head-heart', label: 'Diplomat' },
    ],
  },
  {
    groupId: 'heart',
    title: 'Heart',
    items: [
      { id: 'heart-strong', label: 'Empath' },
      { id: 'heart-gut', label: 'Defender' },
      { id: 'heart-head', label: 'Advisor' },
    ],
  },
  {
    groupId: 'gut',
    title: 'Gut',
    items: [
      { id: 'gut-strong', label: 'Doer' },
      { id: 'gut-head', label: 'Engineer' },
      { id: 'gut-heart', label: 'Hero' },
    ],
  },
]

const BALANCED_ITEM: { id: BrainTypeSidebarItemId; label: string } = {
  id: 'balanced',
  label: 'Sovereign',
}

function itemBrains (id: BrainTypeSidebarItemId): BrainKey[] {
  if (id === 'balanced') return ['Head', 'Heart', 'Gut']
  if (id === 'head-strong') return ['Head']
  if (id === 'heart-strong') return ['Heart']
  if (id === 'gut-strong') return ['Gut']

  if (id.startsWith('head-')) return ['Head', id === 'head-heart' ? 'Heart' : 'Gut']
  if (id.startsWith('heart-')) return ['Heart', id === 'heart-head' ? 'Head' : 'Gut']
  return ['Gut', id === 'gut-head' ? 'Head' : 'Heart']
}

function brainIcon (brain: BrainKey) {
  if (brain === 'Head') return faDiamond
  if (brain === 'Heart') return faHeart
  return faSquare
}

function itemAccent (id: BrainTypeSidebarItemId): string {
  const brains = itemBrains(id)
  const lead = brains[0] ?? 'Head'
  return BRAIN_MUTED[lead]
}

function groupBrain (groupId: 'head' | 'heart' | 'gut'): BrainKey {
  if (groupId === 'head') return 'Head'
  if (groupId === 'heart') return 'Heart'
  return 'Gut'
}

export function profileToActiveId (profile: FlowsBrainProfile): BrainTypeSidebarItemId {
  const { dominant, secondary, tertiary } = profile
  if (tertiary) return 'balanced'
  if (!secondary) {
    if (dominant === 'Head') return 'head-strong'
    if (dominant === 'Heart') return 'heart-strong'
    return 'gut-strong'
  }

  const combo = `${dominant}-${secondary}`.toLowerCase()
  if (combo === 'head-heart') return 'head-heart'
  if (combo === 'head-gut') return 'head-gut'
  if (combo === 'heart-head') return 'heart-head'
  if (combo === 'heart-gut') return 'heart-gut'
  if (combo === 'gut-head') return 'gut-head'
  if (combo === 'gut-heart') return 'gut-heart'

  return 'balanced'
}

interface BrainTypeSidebarProps {
  activeId: BrainTypeSidebarItemId
  onSelect: (id: BrainTypeSidebarItemId) => void
}

export const BrainTypeSidebar = ({ activeId, onSelect }: BrainTypeSidebarProps) => {
  const [openGroups, setOpenGroups] = useState({
    head: false,
    heart: false,
    gut: false,
  })

  return (
    <aside className="braintype-sidebar" aria-label="Brain type options">
      <p className="braintype-sidebar__label">Brain type</p>
      <div className="braintype-sidebar__groups">
        {GROUPS.map((group) => {
          const groupLead = groupBrain(group.groupId)
          const groupColor =
            group.groupId === 'head'
              ? BRAIN_MUTED.Head
              : group.groupId === 'heart'
                ? BRAIN_MUTED.Heart
                : BRAIN_MUTED.Gut
          const groupIcon =
            group.groupId === 'head'
              ? faDiamond
              : group.groupId === 'heart'
                ? faHeart
                : faSquare

          return (
            <details
              key={group.groupId}
              className="braintype-sidebar__group"
              open={openGroups[group.groupId]}
              onToggle={(e) => {
                const el = e.currentTarget
                const nextOpen = el.open
                setOpenGroups((prev) => ({ ...prev, [group.groupId]: nextOpen }))
              }}
              style={{ ['--brain-accent' as never]: groupColor }}
            >
              <summary className="braintype-sidebar__group-summary">
                <span className="braintype-sidebar__group-title">
                  <span className="braintype-sidebar__group-icon" aria-hidden>
                    <FontAwesomeIcon icon={groupIcon} />
                  </span>
                  {group.title}
                </span>
              </summary>
              <ul className="nav-section-list braintype-sidebar__list">
                {group.items.map((item) => {
                  const isActive = item.id === activeId
                  const brains = itemBrains(item.id).filter((brain) => brain !== groupLead)
                  const showGroupIconForStrong =
                    brains.length === 0 && item.id === `${group.groupId}-strong`

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`nav-section-btn ${isActive ? 'is-current' : ''}`}
                        aria-current={isActive ? 'true' : undefined}
                        onClick={() => onSelect(item.id)}
                        style={{ ['--section-context-color' as never]: itemAccent(item.id) }}
                      >
                        <span className="nav-section-btn-icon braintype-sidebar__item-icons" aria-hidden>
                          {showGroupIconForStrong ? (
                            <FontAwesomeIcon icon={groupIcon} style={{ color: groupColor }} />
                          ) : (
                            brains.map((brain, idx) => (
                              <FontAwesomeIcon
                                key={`${item.id}-${brain}-${idx}`}
                                icon={brainIcon(brain)}
                                style={{ color: BRAIN_MUTED[brain] }}
                              />
                            ))
                          )}
                        </span>
                        <span className="nav-section-btn-label">{item.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
          </details>
          )
        })}

        <div className="braintype-sidebar__balanced">
          <ul className="nav-section-list">
            <li>
              <button
                type="button"
                className={`nav-section-btn ${activeId === 'balanced' ? 'is-current' : ''}`}
                aria-current={activeId === 'balanced' ? 'true' : undefined}
                onClick={() => onSelect('balanced')}
                style={{ ['--section-context-color' as never]: itemAccent('balanced') }}
              >
                <span className="nav-section-btn-icon braintype-sidebar__item-icons" aria-hidden>
                  {itemBrains('balanced').map((brain) => (
                    <FontAwesomeIcon
                      key={`balanced-${brain}`}
                      icon={brainIcon(brain)}
                      style={{ color: BRAIN_MUTED[brain] }}
                    />
                  ))}
                </span>
                <span className="nav-section-btn-label">{BALANCED_ITEM.label}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

