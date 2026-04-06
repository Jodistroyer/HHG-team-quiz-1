import { useMemo } from 'react'
import type { Person, TeamContextKey, TeamContextScores } from '../../PeoplePanel/types'
import { getBrainCombination, getBalanceTipBadge } from '../../../Quiz/SectionResults/utils.tsx'
import './TeamPairInsights.css'

interface TeamPairInsightsProps {
  people: [Person, Person]
}

const CONTEXTS: TeamContextKey[] = ['underPressure', 'doingWork', 'withPeople', 'gettingBetter']
const CONTEXT_LABELS = ['Under Pressure', 'Doing Work', 'With People', 'Getting Better']

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
        : `The pair’s shared blind spot skews toward ${balanceTip}: what’s obvious to outsiders can feel abstract or optional between you.`

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

  return (
    <section className="team-pair-insights quiz-results-page" aria-label="Pair insights">
      <div className="team-pair-insights__inner final-summary">
        <h1 className="title team-pair-insights__page-title">Pair insights</h1>
        <p className="team-pair-insights__names">
          {a.name} &amp; {b.name}
        </p>

        <article className="team-pair-insights__block">
          <h2 className="results-section-title team-pair-insights__heading">What these two produce together</h2>
          <p className="team-pair-insights__lead">Not who they are individually, but what shows up between them.</p>
          <p className="team-pair-insights__body">
            {copy.produceTogetherIsTriple ? (
              'Together you can touch analysis, care, and action. The risk is that each of you assumes the other two brains are covered, so nobody fully owns the next step.'
            ) : (
              <>
                Averaged between you, this pair shows up as <strong>{copy.pairComboLabel}</strong>. That blend is what the relationship &quot;outputs&quot; to others: calmer or sharper than either of you alone.
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
