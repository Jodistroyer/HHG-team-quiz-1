import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import type { Person, TeamContextKey, TeamContextScores } from '../../PeoplePanel/types'
import { getBrainCombination, getBalanceTipBadge, getBrainIcons } from '../../../Quiz/SectionResults/utils.tsx'
import { OVERALL_ARCHETYPES } from '../../../Quiz/overallArchetypes'
import { PAIR_OVERALL_DESCRIPTIONS } from '../pairOverallArchetypes'
import { WhatStandsOut } from '../../../Quiz/ChangeResults/WhatStandsOut'
import { RadarChart as TeamRadarChart } from '../TeamRadarResults/TeamRadarChart'
import { buildPairWhatStandsOutFromPeople } from '../pairWhatStandsOut'
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

function PairPersonRadarCard ({ person }: { person: Person }) {
  const combo = getBrainCombination(person.headPercent, person.heartPercent, person.gutPercent)
  const isLongLabel = combo.label === 'Head + Heart + Gut'
  const archetypeData = OVERALL_ARCHETYPES[combo.label]

  return (
    <div className="team-pair-insights__person-natural">
      <p className="team-pair-insights__radar-identity">{person.name}</p>
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
          {a.name} &amp; {b.name}
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
        </section>

        {pairWhatStandsOutInsights.length > 0 && (
          <div className="team-pair-insights__what-stands-out">
            <WhatStandsOut insights={pairWhatStandsOutInsights} />
          </div>
        )}

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
