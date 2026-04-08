import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Person, TeamContextKey, TeamContextScores } from '../../PeoplePanel/types'
import { getBrainCombination, getBalanceTipBadge, getBrainIcons } from '../../../Quiz/SectionResults/utils.tsx'
import { OVERALL_ARCHETYPES } from '../../../Quiz/overallArchetypes'
import type { Centre } from '../../../Quiz/ChangeResults/changeResultsLogic'
import type { Insight } from '../../../Quiz/ChangeResults/changeResultsLogic'
import { parseCentres } from '../../../Quiz/ChangeResults/changeResultsLogic'
import { contextComboLabel } from '../../../Quiz/ChangeResults/contextComboLabels'
import { PAIR_OVERALL_DESCRIPTIONS } from './pairOverallArchetypes'
import { WhatStandsOut } from '../../../Quiz/ChangeResults/WhatStandsOut'
import { RadarChart as TeamRadarChart } from '../TeamRadarResults/TeamRadarChart'
import { buildPairWhatStandsOutFromPeople } from './pairWhatStandsOut'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBriefcase,
  faChartLine,
  faDiamond,
  faFire,
  faHeart,
  faPeopleGroup,
  faSquare,
} from '@fortawesome/free-solid-svg-icons'
import '../../../Quiz/ChangeResults/ChangeResults.css'
import '../../../Quiz/RadarResults/OverallRadar.css'
import '../../../Quiz/QuizResults.css'
import '../TeamMap.css'
import './TeamPairInsights.css'

interface TeamPairInsightsProps {
  people: [Person, Person]
}

const CONTEXTS: TeamContextKey[] = ['underPressure', 'doingWork', 'withPeople', 'gettingBetter']
const CONTEXT_LABELS = ['Under Pressure', 'Doing Work', 'With People', 'Getting Better']

type PairContextKey = Extract<TeamContextKey, 'underPressure' | 'doingWork' | 'withPeople' | 'gettingBetter'>

/** Pair-voice line under the averaged radar (not the solo quiz headline). */
const PAIR_NATURAL_DEFAULT_TITLE_BY_COMBO: Record<string, string> = {
  'Head Strong': 'Together, thinking and clarity lead.',
  'Head + Gut': 'Together, clear thinking and decisive action show up.',
  'Head + Heart': 'Together, careful thinking and care for people show up.',
  'Heart Strong': 'Together, people and emotional attunement lead.',
  'Heart + Gut': 'Together, feeling and momentum show up.',
  'Heart + Head': 'Together, people-first care and clear thinking show up.',
  'Gut Strong': 'Together, instinct and momentum lead.',
  'Gut + Head': 'Together, speed and structure show up.',
  'Gut + Heart': 'Together, urgency and care show up.',
  'Head + Heart + Gut': 'Together, thinking, feeling, and action all stay in play.',
}

function pairNaturalDefaultTitle (comboLabel: string): string {
  return PAIR_NATURAL_DEFAULT_TITLE_BY_COMBO[comboLabel] ?? `Together, this pair reads as ${comboLabel}.`
}

function scoresFor (person: Person, context: TeamContextKey): TeamContextScores {
  if (context === 'overall') {
    return {
      headPercent: person.headPercent,
      heartPercent: person.heartPercent,
      gutPercent: person.gutPercent,
    }
  }
  return person.contextScores?.[context] ?? {
    headPercent: person.headPercent,
    heartPercent: person.heartPercent,
    gutPercent: person.gutPercent,
  }
}

function averageScores (a: TeamContextScores, b: TeamContextScores): TeamContextScores {
  return {
    headPercent: (a.headPercent + b.headPercent) / 2,
    heartPercent: (a.heartPercent + b.heartPercent) / 2,
    gutPercent: (a.gutPercent + b.gutPercent) / 2,
  }
}

function dominantType (s: TeamContextScores): 'Head' | 'Heart' | 'Gut' {
  const rows = [
    { t: 'Head' as const, p: s.headPercent },
    { t: 'Heart' as const, p: s.heartPercent },
    { t: 'Gut' as const, p: s.gutPercent },
  ]
  rows.sort((x, y) => y.p - x.p)
  return rows[0]!.t
}

function contextIconForTitle (title: string): IconDefinition | null {
  switch (title.trim().toLowerCase()) {
    case 'under pressure':
      return faFire
    case 'doing work':
      return faBriefcase
    case 'with people':
      return faPeopleGroup
    case 'getting better':
      return faChartLine
    default:
      return null
  }
}

function centreIcon (centre: Centre): { icon: IconDefinition; className: string } {
  switch (centre) {
    case 'Head':
      return { icon: faDiamond, className: 'change-results-centre-icon change-results-centre-icon--head' }
    case 'Heart':
      return { icon: faHeart, className: 'change-results-centre-icon change-results-centre-icon--heart' }
    case 'Gut':
      return { icon: faSquare, className: 'change-results-centre-icon change-results-centre-icon--gut' }
  }
}

function ComboIcons ({ label }: { label: string }) {
  const centres = parseCentres(label)
  return (
    <div className="change-results-centres" aria-label={label}>
      {centres.map((c) => {
        const cfg = centreIcon(c)
        return <FontAwesomeIcon key={c} icon={cfg.icon} className={cfg.className} />
      })}
    </div>
  )
}

function PairAcrossContextsCard ({ people, insights }: { people: [Person, Person]; insights: Insight[] }) {
  const [a, b] = people
  const shortA = a.name.split(' ')[0] ?? a.name
  const shortB = b.name.split(' ')[0] ?? b.name

  const rows = useMemo(() => {
    return (CONTEXTS as PairContextKey[]).map((ctx, i) => {
      const title = CONTEXT_LABELS[i] ?? ctx
      const sa = scoresFor(a, ctx)
      const sb = scoresFor(b, ctx)
      const ca = getBrainCombination(sa.headPercent, sa.heartPercent, sa.gutPercent).label
      const cb = getBrainCombination(sb.headPercent, sb.heartPercent, sb.gutPercent).label

      const aLabel = contextComboLabel(ctx, ca)
      const bLabel = contextComboLabel(ctx, cb)

      return { title, ca, cb, aLabel, bLabel }
    })
  }, [a, b])

  if (rows.length === 0 && insights.length === 0) return null

  return (
    <div className="change-results-stack team-pair-insights__pair-change-stack">
      <div className="change-results-card change-results-card--combo team-pair-insights__pair-change-card">
        <div className="change-results-combo-block">
          <div className="team-pair-insights__pair-change-columns">
            <div className="team-pair-insights__pair-change-column-headings">
              <span
                className="team-pair-insights__pair-change-column-heading team-pair-insights__pair-change-column-heading--left team-pair-insights__name-truncate"
                title={a.name}
              >
                {shortA}
              </span>
              <span className="team-pair-insights__pair-change-column-heading team-pair-insights__pair-change-column-heading--center">
                Context
              </span>
              <span
                className="team-pair-insights__pair-change-column-heading team-pair-insights__pair-change-column-heading--right team-pair-insights__name-truncate"
                title={b.name}
              >
                {shortB}
              </span>
            </div>
          </div>
          <dl className="change-results-combo-list">
            {rows.map((row) => (
              <div key={row.title} className="team-pair-insights__pair-change-row">
                <dd className="change-results-combo-dd team-pair-insights__pair-change-dd team-pair-insights__pair-change-dd--left">
                  <div className="team-pair-insights__pair-change-side">
                    <ComboIcons label={row.ca} />
                    <span className="team-pair-insights__pair-change-label-under-icons">{row.aLabel}</span>
                  </div>
                </dd>

                <dt className="team-pair-insights__pair-change-dt">
                  <div className="team-pair-insights__pair-change-title-row">
                    {contextIconForTitle(row.title) && (
                      <span className="change-results-context-icon" aria-hidden="true">
                        <FontAwesomeIcon icon={contextIconForTitle(row.title)!} />
                      </span>
                    )}
                    <span className="change-results-context-title">{row.title}</span>
                  </div>
                </dt>

                <dd className="change-results-combo-dd team-pair-insights__pair-change-dd team-pair-insights__pair-change-dd--right">
                  <div className="team-pair-insights__pair-change-side">
                    <ComboIcons label={row.cb} />
                    <span className="team-pair-insights__pair-change-label-under-icons">{row.bLabel}</span>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      {insights.length > 0 && <WhatStandsOut insights={insights} />}
    </div>
  )
}

function PairPersonRadarCard ({ person }: { person: Person }) {
  const combo = getBrainCombination(person.headPercent, person.heartPercent, person.gutPercent)
  const isLongLabel = combo.label === 'Head + Heart + Gut'
  const archetypeData = OVERALL_ARCHETYPES[combo.label]

  return (
    <div className="team-pair-insights__person-natural">
      <p className="team-pair-insights__radar-identity team-pair-insights__name-truncate" title={person.name}>
        {person.name}
      </p>
      <div className="quiz-results__natural-default-meta team-pair-insights__pair-natural-meta">
        {archetypeData && (
          <p className="quiz-results__natural-default-label">{archetypeData.archetype}</p>
        )}
        <div className="overall-badges-row quiz-results__natural-default-badges">
          <div
            className={`overall-icon-badge ${isLongLabel ? 'long-label' : ''}`}
            style={{ background: 'transparent' }}
          >
            {getBrainIcons(combo.label, 'large', 'changeResults')}
          </div>
        </div>
      </div>
      <hr className="team-pair-insights__radar-meta-divider" aria-hidden="true" />
      <div className="radar-chart-container team-pair-insights__radar-chart-wrap">
        <TeamRadarChart
          headPercent={person.headPercent}
          heartPercent={person.heartPercent}
          gutPercent={person.gutPercent}
        />
      </div>
      <h3 className="quiz-results__natural-default-title team-pair-insights__pair-natural-title">
        {archetypeData?.headline ?? combo.label}
      </h3>
    </div>
  )
}

/** Same layout as `TeamGroupInsights` natural default: `team-map-results__section` + bento + hero + `overall-breakdown` radar. */
function PairOverallAsTeamMapSection ({ pairOverall }: { pairOverall: TeamContextScores }) {
  const combo = getBrainCombination(pairOverall.headPercent, pairOverall.heartPercent, pairOverall.gutPercent)
  const isLongLabel = combo.label === 'Head + Heart + Gut'
  const archetypeData = OVERALL_ARCHETYPES[combo.label]
  const pairDescription = PAIR_OVERALL_DESCRIPTIONS[combo.label]

  return (
    <div
      className="team-map-results__section team-pair-insights__pair-overall-team-section"
      data-team-section="pair-natural-default"
    >
      <div className="bento-grid team-map-results__natural-default-grid">
        <div className="team-map-results__natural-default-hero">
          <div className="team-map-results__natural-default-meta">
            {archetypeData && (
              <p className="team-map-results__natural-default-label">{archetypeData.archetype}</p>
            )}
            <div className="overall-badges-row team-map-results__natural-default-badges">
              <div
                className={`overall-icon-badge ${isLongLabel ? 'long-label' : ''}`}
                style={{ background: 'transparent' }}
              >
                {getBrainIcons(combo.label, 'large', 'changeResults')}
              </div>
            </div>
          </div>
          <h3 className="team-map-results__natural-default-title">{pairNaturalDefaultTitle(combo.label)}</h3>
        </div>

        <div className="overall-breakdown">
          <div className="radar-chart-container">
            <TeamRadarChart
              headPercent={pairOverall.headPercent}
              heartPercent={pairOverall.heartPercent}
              gutPercent={pairOverall.gutPercent}
            />
          </div>
        </div>
      </div>
      {pairDescription && (
        <div className="team-map-results__natural-default-body">
          <div className="overall-archetype-description team-map-results__natural-default-description">
            <ReactMarkdown>{pairDescription}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

export function TeamPairInsights ({ people }: TeamPairInsightsProps) {
  const [a, b] = people

  const copy = useMemo(() => {
    const pairOverall = averageScores(scoresFor(a, 'overall'), scoresFor(b, 'overall'))
    const pairCombo = getBrainCombination(pairOverall.headPercent, pairOverall.heartPercent, pairOverall.gutPercent)
    const comboKey = pairCombo.label.replace(/\s+Strong$/, '').trim()
    const balanceTip = getBalanceTipBadge(comboKey)

    const alignParts: string[] = []
    const clashParts: string[] = []
    CONTEXTS.forEach((ctx, i) => {
      const sa = scoresFor(a, ctx)
      const sb = scoresFor(b, ctx)
      const da = dominantType(sa)
      const db = dominantType(sb)
      const label = CONTEXT_LABELS[i] ?? ctx
      if (da === db) {
        alignParts.push(`${label} (${da})`)
      } else {
        clashParts.push(`${label}: ${a.name.split(' ')[0]} leans ${da}, ${b.name.split(' ')[0]} leans ${db}`)
      }
    })

    const short = (p: Person) => p.name.split(' ')[0] ?? p.name
    const gutLeader = a.gutPercent >= b.gutPercent ? a : b
    const headLeader = a.headPercent >= b.headPercent ? a : b
    let expandContractBody: string
    if (gutLeader.id === headLeader.id) {
      expandContractBody = `${short(gutLeader)} both push for momentum and hold the analytical frame. Tension may read as “you’re never satisfied” when it’s really two instincts in one person, mirrored in the other.`
    } else if (Math.abs(a.gutPercent - b.gutPercent) < 6 && Math.abs(a.headPercent - b.headPercent) < 6) {
      expandContractBody =
        'Your overall shapes are close; most expand/contract moments are situational. Watch for external pressure flipping who leads without you naming the handoff.'
    } else {
      expandContractBody = `${short(gutLeader)} tends to expand the pairing toward action and visible progress; ${short(headLeader)} tends to contract it toward clarity and defensible choices. The strain usually shows up as “too slow” vs “too fuzzy”, not as bad intent.`
    }

    const experiments: Record<string, string> = {
      Heart:
        'In your next 1:1, spend the first five minutes only naming impact on people (no solutions), then switch to tasks.',
      Gut: 'Pick a small decision, set a 10-minute timer, and commit to one trial action you can reverse.',
      Head: 'Agree on one metric or success criterion before you debate options, even if it’s provisional.',
      'Heart + Gut':
        'Run one short session: Gut picks a trial move, Heart names who it affects, Head writes the one-line hypothesis you’re testing.',
      'Head + Gut':
        'Pair a one-page brief (Head) with a single time-boxed experiment (Gut); debrief only against what the brief said you’d measure.',
      'Head + Heart':
        'Before deciding, alternate sentences: one fact, one feeling, until you have six of each, then choose.',
      Focus:
        'Try alternating who leads check-ins for two weeks and note where the quality of disagreement changes.',
    }
    const experiment = experiments[balanceTip] ?? experiments.Focus

    const produceTogetherIsTriple = pairCombo.label === 'Head + Heart + Gut'

    const alignText =
      alignParts.length > 0
        ? `You often move similarly in: ${alignParts.join('; ')}.`
        : 'Your situational profiles diverge in every context. This is a high-contrast pairing.'
    const clashText =
      clashParts.length > 0
        ? `Tension can appear quietly where: ${clashParts.join('; ')}. Often neither of you names it as a values clash.`
        : 'You rarely fight “head vs heart” in the same moment; when things snag, look outside HHG (goals, time, status).'

    const invisible =
      balanceTip === 'Focus'
        ? 'Because you’re both inside this rhythm, you may not see how often the pair waits for a “perfect” signal that never arrives.'
        : `The pair’s shared blind spot skews toward ${balanceTip}: what’s obvious to outsiders can feel abstract or optional when you’re together.`

    return {
      pairComboLabel: pairCombo.label,
      produceTogetherIsTriple,
      alignText,
      clashText,
      expandContractBody,
      invisible,
      experiment,
    }
  }, [a, b])

  const pairWhatStandsOutInsights = useMemo(() => buildPairWhatStandsOutFromPeople([a, b]), [a, b])

  const pairOverall = useMemo(
    () => averageScores(scoresFor(a, 'overall'), scoresFor(b, 'overall')),
    [a, b]
  )

  return (
    <section className="team-pair-insights quiz-results-page" aria-label="Pair insights">
      <div className="team-pair-insights__inner final-summary">
        <h1 className="title team-pair-insights__page-title">Pair insights</h1>
        <p className="team-pair-insights__names">
          <span className="team-pair-insights__names-part team-pair-insights__name-truncate" title={a.name}>
            {a.name}
          </span>
          <span className="team-pair-insights__names-sep" aria-hidden="true">
            {' '}
            &amp;{' '}
          </span>
          <span className="team-pair-insights__names-part team-pair-insights__name-truncate" title={b.name}>
            {b.name}
          </span>
        </p>

        <section className="team-pair-insights__radar-section" aria-label="Natural default comparison">
          <h2 className="results-section-title team-pair-insights__heading">Natural default</h2>
          <p className="team-pair-insights__lead">
            Pair average of your natural defaults, then each person side by side.
          </p>
          <PairOverallAsTeamMapSection pairOverall={pairOverall} />
          <div className="team-pair-insights__radar-row">
            <div className="team-pair-insights__radar-col">
              <PairPersonRadarCard person={a} />
            </div>
            <div className="team-pair-insights__radar-col">
              <PairPersonRadarCard person={b} />
            </div>
          </div>
          <div className="team-pair-insights__pair-change-outer">
            <h3 className="results-section-title team-pair-insights__pair-change-heading">How You Change Across Contexts</h3>
            <p className="team-pair-insights__lead team-pair-insights__pair-change-lead">
              Side-by-side shifts, then what stands out between you.
            </p>
            <PairAcrossContextsCard people={people} insights={pairWhatStandsOutInsights} />
          </div>
        </section>

        <article className="team-pair-insights__block">
          <h2 className="results-section-title team-pair-insights__heading">What these two produce together</h2>
          <p className="team-pair-insights__lead">Not who they are individually, but what shows up between them.</p>
          <p className="team-pair-insights__body">
            {copy.produceTogetherIsTriple ? (
              'Together you can touch analysis, care, and action. The risk is that each of you assumes the other two brains are covered, so nobody fully owns the next step.'
            ) : (
              <>
                Together, this pair shows up as <strong>{copy.pairComboLabel}</strong>. That blend is what the relationship &quot;outputs&quot; to others: calmer or sharper than either of you alone.
              </>
            )}
          </p>
        </article>

        <article className="team-pair-insights__block">
          <h2 className="results-section-title team-pair-insights__heading">Rhythms: align and clash</h2>
          <p className="team-pair-insights__lead">Where their rhythms naturally align and where they clash without either person knowing why.</p>
          <p className="team-pair-insights__body">{copy.alignText}</p>
          <p className="team-pair-insights__body">{copy.clashText}</p>
        </article>

        <article className="team-pair-insights__block">
          <h2 className="results-section-title team-pair-insights__heading">Effect on each other</h2>
          <p className="team-pair-insights__lead">What each person does to the other&apos;s behaviour: who expands in this pairing and who contracts.</p>
          <p className="team-pair-insights__body">{copy.expandContractBody}</p>
        </article>

        <article className="team-pair-insights__block">
          <h2 className="results-section-title team-pair-insights__heading">What the pair makes invisible</h2>
          <p className="team-pair-insights__lead">The thing neither of them sees because they&apos;re both inside it.</p>
          <p className="team-pair-insights__body">{copy.invisible}</p>
        </article>

        <article className="team-pair-insights__block">
          <h2 className="results-section-title team-pair-insights__heading">Worth trying</h2>
          <p className="team-pair-insights__lead">One small experiment for the manager to test with this specific pair.</p>
          <p className="team-pair-insights__body">{copy.experiment}</p>
        </article>

        <aside className="team-pair-insights__key" aria-label="Pair versus team insights">
          <h3 className="team-pair-insights__key-title">Key difference</h3>
          <p className="team-pair-insights__key-body">
            Pair insights are about a <strong>relationship</strong>: two people creating something between them, for better or worse. A pair insight explains a friction or a flow.
          </p>
        </aside>
      </div>
    </section>
  )
}
