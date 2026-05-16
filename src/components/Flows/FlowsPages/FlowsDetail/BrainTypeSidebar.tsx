import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import type { FlowsBrainProfile } from '../../flowsTypes'
import { BRAIN_MUTED } from '../../flowsContexts'
import '../../../Quiz/Sidebar/Navigation/NavSection.css'
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

function labelForId (id: BrainTypeSidebarItemId): string {
  if (id === 'balanced') return BALANCED_ITEM.label
  for (const g of GROUPS) {
    const it = g.items.find((i) => i.id === id)
    if (it) return it.label
  }
  return 'Brain type'
}

function ItemIcons ({
  itemId,
  group,
}: {
  itemId: BrainTypeSidebarItemId
  group?: (typeof GROUPS)[number]
}) {
  if (itemId === 'balanced') {
    return (
      <span className="braintype-sidebar__item-icons braintype-sidebar__item-icons--dropdown" aria-hidden>
        {itemBrains('balanced').map((brain) => (
          <FontAwesomeIcon key={brain} icon={brainIcon(brain)} style={{ color: BRAIN_MUTED[brain] }} />
        ))}
      </span>
    )
  }
  if (!group) return null
  const groupLead = groupBrain(group.groupId)
  const brains = itemBrains(itemId).filter((brain) => brain !== groupLead)
  const showGroupIconForStrong =
    brains.length === 0 && itemId === `${group.groupId}-strong`
  const groupColor =
    group.groupId === 'head'
      ? BRAIN_MUTED.Head
      : group.groupId === 'heart'
        ? BRAIN_MUTED.Heart
        : BRAIN_MUTED.Gut
  const groupIcon =
    group.groupId === 'head' ? faDiamond : group.groupId === 'heart' ? faHeart : faSquare

  return (
    <span className="braintype-sidebar__item-icons braintype-sidebar__item-icons--dropdown" aria-hidden>
      {showGroupIconForStrong ? (
        <FontAwesomeIcon icon={groupIcon} style={{ color: groupColor }} />
      ) : (
        brains.map((brain, idx) => (
          <FontAwesomeIcon
            key={`${itemId}-${brain}-${idx}`}
            icon={brainIcon(brain)}
            style={{ color: BRAIN_MUTED[brain] }}
          />
        ))
      )}
    </span>
  )
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

/** Inverse of `profileToActiveId` — sidebar archetype id → detail `FlowsBrainProfile`. */
export function brainProfileFromActiveId (id: BrainTypeSidebarItemId): FlowsBrainProfile {
  switch (id) {
    case 'balanced':
      return { dominant: 'Head', secondary: 'Heart', tertiary: 'Gut' }
    case 'head-strong':
      return { dominant: 'Head', secondary: null }
    case 'heart-strong':
      return { dominant: 'Heart', secondary: null }
    case 'gut-strong':
      return { dominant: 'Gut', secondary: null }
    case 'head-heart':
      return { dominant: 'Head', secondary: 'Heart' }
    case 'head-gut':
      return { dominant: 'Head', secondary: 'Gut' }
    case 'heart-head':
      return { dominant: 'Heart', secondary: 'Head' }
    case 'heart-gut':
      return { dominant: 'Heart', secondary: 'Gut' }
    case 'gut-head':
      return { dominant: 'Gut', secondary: 'Head' }
    case 'gut-heart':
      return { dominant: 'Gut', secondary: 'Heart' }
    default:
      return { dominant: 'Head', secondary: null }
  }
}

const DESKTOP_BRAIN_SIDEBAR_MQ = '(min-width: 769px)'

/** Desktop only (`max-width: 768px` is mobile in BrainTypeSidebar.css): open one accordion group from initial archetype. */
function defaultOpenGroupsForDesktopId (
  activeId: BrainTypeSidebarItemId
): { head: boolean; heart: boolean; gut: boolean } {
  const closed = { head: false, heart: false, gut: false }
  if (activeId === 'balanced') return closed
  if (activeId.startsWith('head-')) return { ...closed, head: true }
  if (activeId.startsWith('heart-')) return { ...closed, heart: true }
  if (activeId.startsWith('gut-')) return { ...closed, gut: true }
  return closed
}

interface BrainTypeSidebarProps {
  activeId: BrainTypeSidebarItemId
  onSelect: (id: BrainTypeSidebarItemId) => void
}

export const BrainTypeSidebar = ({ activeId, onSelect }: BrainTypeSidebarProps) => {
  const [openGroups, setOpenGroups] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(DESKTOP_BRAIN_SIDEBAR_MQ).matches
      ? defaultOpenGroupsForDesktopId(activeId)
      : { head: false, heart: false, gut: false }
  )

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_BRAIN_SIDEBAR_MQ)
    const sync = () => {
      if (!mq.matches) return
      setOpenGroups(defaultOpenGroupsForDesktopId(activeId))
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [activeId])

  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileRef = useRef<HTMLDivElement>(null)

  const activeGroup = useMemo(
    () => GROUPS.find((g) => g.items.some((i) => i.id === activeId)),
    [activeId]
  )
  const activeLabel = labelForId(activeId)

  useEffect(() => {
    if (!mobileOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileOpen])

  const selectAndCloseMobile = (id: BrainTypeSidebarItemId) => {
    onSelect(id)
    setMobileOpen(false)
  }

  return (
    <aside className="braintype-sidebar" aria-label="Brain type options">
      <div className="braintype-sidebar__mobile" ref={mobileRef}>
        <p className="braintype-sidebar__mobile-eyebrow">Brain type</p>
        <div className="nav-section-dropdown">
          <button
            type="button"
            className="nav-section-dropdown-trigger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-haspopup="listbox"
            aria-label={`Brain type: ${activeLabel}`}
            style={{ ['--section-context-color' as never]: itemAccent(activeId) }}
          >
            <span className="nav-section-dropdown-trigger-label">
              <ItemIcons itemId={activeId} group={activeGroup} />
              <span className="nav-section-btn-label">{activeLabel}</span>
            </span>
            <span className="braintype-sidebar__mobile-caret" aria-hidden />
          </button>
          {mobileOpen && (
            <ul className="nav-section-dropdown-panel" role="listbox">
              {GROUPS.map((group) => (
                <Fragment key={group.groupId}>
                  <li className="braintype-sidebar__mobile-section-title" role="presentation">
                    {group.title}
                  </li>
                  {group.items.map((item) => {
                    const isActive = item.id === activeId
                    return (
                      <li key={item.id} role="option" aria-selected={isActive}>
                        <button
                          type="button"
                          className={`nav-section-dropdown-item ${isActive ? 'is-current' : ''}`}
                          onClick={() => selectAndCloseMobile(item.id)}
                          style={{ ['--section-context-color' as never]: itemAccent(item.id) }}
                        >
                          <ItemIcons itemId={item.id} group={group} />
                          <span className="nav-section-btn-label">{item.label}</span>
                        </button>
                      </li>
                    )
                  })}
                </Fragment>
              ))}
              <li className="nav-section-divider" aria-hidden="true" />
              <li className="braintype-sidebar__mobile-section-title" role="presentation">
                Balanced
              </li>
              <li role="option" aria-selected={activeId === 'balanced'}>
                <button
                  type="button"
                  className={`nav-section-dropdown-item ${activeId === 'balanced' ? 'is-current' : ''}`}
                  onClick={() => selectAndCloseMobile('balanced')}
                  style={{ ['--section-context-color' as never]: itemAccent('balanced') }}
                >
                  <ItemIcons itemId="balanced" />
                  <span className="nav-section-btn-label">{BALANCED_ITEM.label}</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="braintype-sidebar__desktop">
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
      </div>
    </aside>
  )
}

