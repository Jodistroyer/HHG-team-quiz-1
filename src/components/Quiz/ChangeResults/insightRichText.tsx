import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import { SECTION_ICONS } from '../SectionResults/utils.tsx'
import { CONTEXT_BACKGROUND, type QuizSelectedContextId } from '../ContextArt'

type SectionId = 1 | 2 | 3 | 4
type Centre = 'Head' | 'Heart' | 'Gut'

const CENTRE_META: Record<Centre, { icon: typeof faDiamond; color: string }> = {
  Head: { icon: faDiamond, color: '#1368ce' },
  Heart: { icon: faHeart, color: '#e21b3c' },
  Gut: { icon: faSquare, color: '#26890c' },
}

function ciSliceMatch(s: string, i: number, needle: string): string | null {
  const end = i + needle.length
  if (end > s.length) return null
  const slice = s.slice(i, end)
  return slice.toLowerCase() === needle.toLowerCase() ? slice : null
}

function CentreIcons({ centres }: { centres: Centre[] }) {
  return (
    <>
      {centres.map((c) => (
        <FontAwesomeIcon
          key={c}
          icon={CENTRE_META[c].icon}
          className="insight-inline-icon insight-inline-icon--centre"
          style={{ color: CENTRE_META[c].color }}
          aria-hidden
        />
      ))}
    </>
  )
}

function SectionIcon({ id }: { id: SectionId }) {
  return (
    <FontAwesomeIcon
      icon={SECTION_ICONS[id]}
      className="insight-inline-icon insight-inline-icon--section"
      aria-hidden
    />
  )
}

function Token({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      className={className ? `insight-token ${className}` : 'insight-token'}
      style={style}
    >
      {children}
    </span>
  )
}

function sectionTokenStyle (id: SectionId): CSSProperties {
  return { '--section-context-color': CONTEXT_BACKGROUND[id as QuizSelectedContextId] } as CSSProperties
}

/** Longest phrase first (case-insensitive match; output preserves source casing). */
const SECTION_PHRASES: { needle: string; sectionId: SectionId }[] = [
  { needle: 'Reflecting on growth', sectionId: 4 as SectionId },
  { needle: 'reflecting on growth', sectionId: 4 as SectionId },
  { needle: 'Getting Better', sectionId: 4 as SectionId },
  { needle: 'Under Pressure', sectionId: 1 as SectionId },
  { needle: 'getting better', sectionId: 4 as SectionId },
  { needle: 'under pressure', sectionId: 1 as SectionId },
  { needle: 'Doing Work', sectionId: 2 as SectionId },
  { needle: 'With People', sectionId: 3 as SectionId },
  { needle: 'doing work', sectionId: 2 as SectionId },
  { needle: 'with people', sectionId: 3 as SectionId },
  { needle: 'in the work', sectionId: 2 as SectionId },
  { needle: 'with others', sectionId: 3 as SectionId },
].sort((a, b) => b.needle.length - a.needle.length)

const CENTRE_PHRASES: { needle: string; centres: Centre[] }[] = [
  { needle: 'Head + Heart + Gut', centres: ['Head', 'Heart', 'Gut'] as Centre[] },
  { needle: 'Head, Heart, and Gut', centres: ['Head', 'Heart', 'Gut'] as Centre[] },
  { needle: 'Head Strong', centres: ['Head'] as Centre[] },
  { needle: 'Heart only', centres: ['Heart'] as Centre[] },
  { needle: 'Gut only', centres: ['Gut'] as Centre[] },
].sort((a, b) => b.needle.length - a.needle.length)

const PAIR_RE = /^(Head|Heart|Gut) \+ (Head|Heart|Gut)/
const SINGLE_RE = /^(Head|Heart|Gut)\b/

interface Hit {
  len: number
  node: ReactNode
}

function tryHit(s: string, i: number): Hit | null {
  const slice = s.slice(i)

  for (const { needle, sectionId } of SECTION_PHRASES) {
    const raw = ciSliceMatch(s, i, needle)
    if (raw) {
      return {
        len: raw.length,
        node: (
          <Token className="insight-token--section" style={sectionTokenStyle(sectionId)}>
            <SectionIcon id={sectionId} />
            {raw}
          </Token>
        ),
      }
    }
  }

  for (const { needle, centres } of CENTRE_PHRASES) {
    const raw = ciSliceMatch(s, i, needle)
    if (raw) {
      return {
        len: raw.length,
        node: (
          <Token className="insight-token--centres">
            <CentreIcons centres={centres} />
            {raw}
          </Token>
        ),
      }
    }
  }

  const pair = PAIR_RE.exec(slice)
  if (pair) {
    const a = pair[1] as Centre
    const b = pair[2] as Centre
    const raw = pair[0]
    return {
      len: raw.length,
      node: (
        <Token className="insight-token--centres">
          <CentreIcons centres={[a, b]} />
          {raw}
        </Token>
      ),
    }
  }

  const single = SINGLE_RE.exec(slice)
  if (single) {
    const c = single[1] as Centre
    const raw = single[0]
    return {
      len: raw.length,
      node: (
        <Token className="insight-token--centres">
          <CentreIcons centres={[c]} />
          {raw}
        </Token>
      ),
    }
  }

  return null
}

/**
 * Renders insight copy with inline Head / Heart / Gut and section-context icons
 * (Under Pressure, Doing Work, With People, Getting Better) where those phrases appear.
 */
export function insightRichText(text: string): ReactNode {
  const out: ReactNode[] = []
  let i = 0
  let buf = ''
  let k = 0

  const flush = () => {
    if (buf.length > 0) {
      out.push(
        <Fragment key={k++}>
          {buf}
        </Fragment>
      )
      buf = ''
    }
  }

  while (i < text.length) {
    const hit = tryHit(text, i)
    if (hit) {
      flush()
      out.push(<Fragment key={k++}>{hit.node}</Fragment>)
      i += hit.len
    } else {
      buf += text[i]
      i += 1
    }
  }
  flush()

  return <>{out}</>
}
