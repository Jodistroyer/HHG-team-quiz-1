import { useMemo } from 'react'
import type { Person, TeamContextKey, TeamContextScores } from '../../PeoplePanel/types'
import { getBrainCombination } from '../../../Quiz/SectionResults/utils.tsx'
import './TeamCultureInsights.css'

interface TeamCultureInsightsProps {
  people: Person[]
}

function ctxScores (person: Person, key: TeamContextKey): TeamContextScores {
  return (
    person.contextScores?.[key] ?? {
      headPercent: person.headPercent,
      heartPercent: person.heartPercent,
      gutPercent: person.gutPercent,
    }
  )
}

function averageTeam (people: Person[], context: TeamContextKey): TeamContextScores {
  if (people.length === 0) return { headPercent: 0, heartPercent: 0, gutPercent: 0 }
  const t = people.reduce(
    (acc, p) => {
      const s = context === 'overall' ? { headPercent: p.headPercent, heartPercent: p.heartPercent, gutPercent: p.gutPercent } : ctxScores(p, context)
      return {
        headPercent: acc.headPercent + s.headPercent,
        heartPercent: acc.heartPercent + s.heartPercent,
        gutPercent: acc.gutPercent + s.gutPercent,
      }
    },
    { headPercent: 0, heartPercent: 0, gutPercent: 0 }
  )
  const n = people.length
  return {
    headPercent: t.headPercent / n,
    heartPercent: t.heartPercent / n,
    gutPercent: t.gutPercent / n,
  }
}

function spread (people: Person[], pick: (p: Person) => number): number {
  const vals = people.map(pick)
  return Math.max(...vals) - Math.min(...vals)
}

export function TeamCultureInsights ({ people }: TeamCultureInsightsProps) {
  const copy = useMemo(() => {
    const overall = averageTeam(people, 'overall')
    const combo = getBrainCombination(overall.headPercent, overall.heartPercent, overall.gutPercent)
    const underP = averageTeam(people, 'underPressure')

    const heartLeader = [...people].sort((p, q) => q.heartPercent - p.heartPercent)[0]!
    const headSpread = spread(people, (p) => p.headPercent)
    const gutSpread = spread(people, (p) => p.gutPercent)

    const lowestBrain =
      overall.headPercent <= overall.heartPercent && overall.headPercent <= overall.gutPercent
        ? 'Head'
        : overall.heartPercent <= overall.gutPercent
          ? 'Heart'
          : 'Gut'

    const pressureShift =
      Math.abs(underP.headPercent - overall.headPercent) +
      Math.abs(underP.heartPercent - overall.heartPercent) +
      Math.abs(underP.gutPercent - overall.gutPercent)

    const linchpin = [...people].sort(
      (p, q) =>
        Math.abs(p.headPercent - overall.headPercent) +
        Math.abs(p.heartPercent - overall.heartPercent) +
        Math.abs(p.gutPercent - overall.gutPercent) -
        (Math.abs(q.headPercent - overall.headPercent) +
          Math.abs(q.heartPercent - overall.heartPercent) +
          Math.abs(q.gutPercent - overall.gutPercent))
    )[0]!
    const outlier = [...people].sort(
      (p, q) =>
        Math.abs(q.headPercent - overall.headPercent) +
        Math.abs(q.heartPercent - overall.heartPercent) +
        Math.abs(q.gutPercent - overall.gutPercent) -
        (Math.abs(p.headPercent - overall.headPercent) +
          Math.abs(p.heartPercent - overall.heartPercent) +
          Math.abs(p.gutPercent - overall.gutPercent))
    )[0]!

    const silent =
      combo.label === 'Head + Heart + Gut'
        ? 'The unspoken rule is “we can do anything”, which often means nobody decides who decides when trade-offs bite.'
        : `The unspoken rule is “we’re a ${combo.label.replace(/\s+Strong$/, '')} group”. Strengths become expectations, and expectations become invisible.`

    const invisibleWork = `${heartLeader.name} is the most likely to carry relational load off-script (checking tone, repairing friction, or translating between people) without it appearing in plans or KPIs.`


    const stuck =
      headSpread < 12 && gutSpread < 12
        ? 'You tend to get stuck in the same cognitive groove: agreement feels fast, but novelty and challenge may arrive late.'
        : headSpread > 28 || gutSpread > 28
          ? 'You stall when different instincts pull hard. The pattern is less “we don’t know” than “we’re solving different problems under the same words”.'
          : 'Stuck points may alternate: sometimes alignment, sometimes polarization, depending on which two voices dominate that day.'

    const pressure =
      pressureShift < 10
        ? 'Under pressure versus a calm week, this group barely shifts shape: reliable, but watch for the same blind spot repeating.'
        : 'Under pressure, the team’s average balance moves, so what feels “like us” on a good day may not be what others experience when stakes rise.'

    const leaving =
      linchpin.id === outlier.id
        ? `If ${linchpin.name} left, you’d lose both the closest anchor to the group average and the starkest counter-example: a bigger cultural gap than a headcount of one suggests.`
        : `If ${linchpin.name} left, you’d lose the person nearest the group’s centre of gravity; if ${outlier.name} left, you’d lose contrast (the voice that often forces the team to see itself differently).`

    const neverAsked =
      lowestBrain === 'Head'
        ? 'What would we stop doing if we admitted we don’t actually know the causal story behind our metrics?'
        : lowestBrain === 'Heart'
          ? 'Who here is paying a personal cost so the rest of us can stay comfortable?'
          : 'What are we pretending is decided so we don’t have to move?'

    return {
      silent,
      invisibleWork,
      lowestBrain,
      stuck,
      pressure,
      leaving,
      neverAsked,
    }
  }, [people])

  return (
    <section className="team-culture-insights" aria-label="Team culture insights">
      <h2 className="results-section-title team-culture-insights__title">Team insights</h2>
      <p className="team-culture-insights__intro">
        Team insights are about a <strong>culture</strong>: what a group has become together, often without deciding to. A team insight explains a pattern.
      </p>

      <article className="team-culture-insights__block">
        <h3 className="team-culture-insights__block-title">What the group has silently agreed</h3>
        <p className="team-culture-insights__text">{copy.silent}</p>
      </article>

      <article className="team-culture-insights__block">
        <h3 className="team-culture-insights__block-title">Who&apos;s doing invisible work</h3>
        <p className="team-culture-insights__text">{copy.invisibleWork}</p>
      </article>

      <article className="team-culture-insights__block">
        <h3 className="team-culture-insights__block-title">What the team is missing</h3>
        <p className="team-culture-insights__text">
          The team&apos;s average profile under-weights <strong>{copy.lowestBrain}</strong> in the room: the style of that brain (questions it would ask, pace it would set) may be underrepresented even when the work technically &quot;covers&quot; it.
        </p>
      </article>

      <article className="team-culture-insights__block">
        <h3 className="team-culture-insights__block-title">Where the team gets stuck</h3>
        <p className="team-culture-insights__text">{copy.stuck}</p>
      </article>

      <article className="team-culture-insights__block">
        <h3 className="team-culture-insights__block-title">Pressure versus a good day</h3>
        <p className="team-culture-insights__text">{copy.pressure}</p>
      </article>

      <article className="team-culture-insights__block">
        <h3 className="team-culture-insights__block-title">What one person leaving would cost</h3>
        <p className="team-culture-insights__text">{copy.leaving}</p>
      </article>

      <article className="team-culture-insights__block">
        <h3 className="team-culture-insights__block-title">The question the team has never asked itself</h3>
        <p className="team-culture-insights__text team-culture-insights__text--emphasis">{copy.neverAsked}</p>
      </article>

      <aside className="team-culture-insights__key" aria-label="Pair versus team">
        <h3 className="team-culture-insights__key-title">Pair vs team</h3>
        <p className="team-culture-insights__key-text">
          A <strong>pair</strong> insight explains a friction or a flow between two people. A <strong>team</strong> insight explains a pattern the whole group keeps repeating.
        </p>
      </aside>
    </section>
  )
}
