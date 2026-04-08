import type { Centre, ChangeFacts, ContextComboRow, Insight } from '../../../Quiz/ChangeResults/changeResultsLogic'
import { buildFacts } from '../../../Quiz/ChangeResults/changeResultsLogic'
import type { Person, TeamContextKey, TeamContextScores } from '../../PeoplePanel/types'

const INSIGHT_TARGET = 3

const PAIR_CONTEXTS: TeamContextKey[] = ['underPressure', 'doingWork', 'withPeople', 'gettingBetter']
const PAIR_CONTEXT_LABELS = ['Under Pressure', 'Doing Work', 'With People', 'Getting Better']

function scoresFor (person: Person, context: TeamContextKey): TeamContextScores {
  if (context === 'overall') {
    return {
      headPercent: person.headPercent,
      heartPercent: person.heartPercent,
      gutPercent: person.gutPercent,
    }
  }
  return (
    person.contextScores?.[context] ?? {
      headPercent: person.headPercent,
      heartPercent: person.heartPercent,
      gutPercent: person.gutPercent,
    }
  )
}

function averageScores (a: TeamContextScores, b: TeamContextScores): TeamContextScores {
  return {
    headPercent: (a.headPercent + b.headPercent) / 2,
    heartPercent: (a.heartPercent + b.heartPercent) / 2,
    gutPercent: (a.gutPercent + b.gutPercent) / 2,
  }
}

function dominantCentre (s: TeamContextScores): Centre {
  const rows: { t: Centre; p: number }[] = [
    { t: 'Head', p: s.headPercent },
    { t: 'Heart', p: s.heartPercent },
    { t: 'Gut', p: s.gutPercent },
  ]
  rows.sort((x, y) => y.p - x.p)
  return rows[0]!.t
}

const centreListPhrase = (centres: Centre[]): string => {
  if (centres.length === 1) return centres[0]!
  if (centres.length === 2) return `${centres[0]} and ${centres[1]}`
  return `${centres[0]}, ${centres[1]}, and ${centres[2]}`
}

function sameComboHeadline (row: ContextComboRow): string {
  const { centres } = row
  if (centres.length === 1) return `${centres[0]} leads the pair average`
  if (centres.length === 2) return `${centres[0]} and ${centres[1]} lead together`
  return 'Full mix in every context'
}

const PAIR_LESS_ONE: Record<Centre, { headline: string; body: string }> = {
  Head: {
    headline: 'Head is faint for this pair',
    body: 'Across the four situations, your combined scores barely lift Head. That does not mean neither of you thinks clearly. It means the average between you hides analysis as a shared lead. You can still choose to slow down and reason together when it matters.',
  },
  Heart: {
    headline: 'Heart is faint for this pair',
    body: 'Across the four situations, your combined scores barely lift Heart. One of you may still be very people-led in life; on this map the midpoint between you does not show care as the shared headline. You can still name feelings and check in on purpose.',
  },
  Gut: {
    headline: 'Gut is faint for this pair',
    body: 'Across the four situations, your combined scores barely lift Gut. The pair average does not show instinct and momentum as your joint story yet. You can still move faster or trust a hunch together without forcing it to match the map.',
  },
}

function pairLessSeveralBody (missing: Centre[]): string {
  if (missing.length === 2) {
    const list = centreListPhrase(missing)
    return `${list} barely register in the pair average, so the midpoint between you leans hard on whatever is left. Compare that to how each of you feels alone: the gap is a conversation about balance, not a verdict on either person.`
  }
  return 'Head, Heart, and Gut all sit quiet in the combined averages. Treat this as a thin snapshot of the space between you. Day to day, each of you is almost certainly fuller than this midpoint suggests.'
}

const LEADS_ALL_FOUR_PAIR: Record<Centre, string> = {
  Head:
    'In every situation row, the pair average still leads with Head. However different you are one on one, together you keep landing on thinking, structure, and clarity as the shared first move.',
  Heart:
    'In every situation row, the pair average still leads with Heart. However you divide tasks, the combined picture keeps people, values, and emotional truth in front.',
  Gut:
    'In every situation row, the pair average still leads with Gut. Together you keep momentum, instinct, and readiness to act in the story, not just in one context.',
}

function pairSameComboBody (row: ContextComboRow): string {
  const { centres } = row
  if (centres.length === 1) {
    return LEADS_ALL_FOUR_PAIR[centres[0]!]!
  }
  if (centres.length === 2) {
    const [x, y] = centres
    return `${x} and ${y} both stay in the pair average for every situation. Context shifts, but the midpoint between you does not. That is worth comparing to each of your solo maps: are you amplifying each other here, or meeting in the middle?`
  }
  return 'Head, Heart, and Gut all show in every row of the pair average. Neither of you is pulling the combined picture toward a single centre alone. The three stay in play together across all four situations.'
}

const PAIR_STEADY_EVERYWHERE: Record<Centre, { headline: string; body: string }> = {
  Head: { headline: 'Head leads for both', body: LEADS_ALL_FOUR_PAIR.Head },
  Heart: { headline: 'Heart leads for both', body: LEADS_ALL_FOUR_PAIR.Heart },
  Gut: { headline: 'Gut leads for both', body: LEADS_ALL_FOUR_PAIR.Gut },
}

function pushPairAllSameDepth (
  add: (headline: string, body: string, priority: number) => void,
  row0: ContextComboRow
) {
  const n = row0.centres.length
  if (n === 1) {
    const c = row0.centres[0]!
    add(
      'One lead, four situations',
      `${c} runs through all four situation rows in the pair average. The context changes; the combined tilt does not. Check whether that matches how each of you would describe yourselves apart.`,
      94
    )
    add(
      'Same label on purpose',
      `${row0.shortLabel} keeps showing up between you. That repeat is a clue to what this partnership defaults to when stakes shift.`,
      93
    )
  } else if (n === 2) {
    const [x, y] = row0.centres
    add(
      'Same pair of strengths, four times',
      `${x} and ${y} stay paired in the pair average in every row. That is a stable blend between you, not a fluke in one context.`,
      94
    )
    add(
      'A rhythm you can change',
      `Seeing ${row0.shortLabel} again and again is something you two can keep, or you can agree to try a different split when the moment needs it.`,
      93
    )
  } else if (n === 3) {
    add(
      'All three, every time',
      'Head, Heart, and Gut all show in every row of the pair average. As a duo you are not letting a whole centre vanish when the situation changes.',
      94
    )
    add(
      'Nothing dropped out',
      `Same full picture (${row0.shortLabel}) in all four rows. That kind of evenness across situations is uncommon for two profiles averaged together.`,
      93
    )
  }
}

function pushPairRelationalSignals (
  add: (headline: string, body: string, priority: number) => void,
  people: [Person, Person]
) {
  const [a, b] = people
  let align = 0
  const dominantsPerContext: Centre[] = []
  PAIR_CONTEXTS.forEach((ctx) => {
    const da = dominantCentre(scoresFor(a, ctx))
    const db = dominantCentre(scoresFor(b, ctx))
    dominantsPerContext.push(da)
    if (da === db) align++
  })

  if (align === 4) {
    const uniqueD = new Set(dominantsPerContext)
    const matchLine =
      uniqueD.size === 1
        ? `Person by person, you both lead with ${[...uniqueD][0]} in every situation on this map.`
        : 'Row by row, whoever leads between Head, Heart, and Gut is the same person for both of you, even when that leader changes from one situation to the next.'
    add(
      'Matched in every situation',
      `${matchLine} Similarity here can still mean you share the same blind spot, so compare notes, not just comfort.`,
      98
    )
  } else if (align === 0) {
    add(
      'Opposite tilts every time',
      'Across these four situations, the stronger centre never matches: when one of you is most Head, Heart, or Gut, the other is not on the same one. What feels obvious to one of you may land as a surprise to the other when the context shifts.',
      98
    )
  } else if (align >= 2 && align < 4) {
    add(
      'Sometimes you match, sometimes not',
      'You line up in some situations and diverge in others. Naming the situation often helps more than saying only that you are two different people.',
      86
    )
  }
}

/**
 * Pair "what stands out": same structural signals as the team map, phrased for two people,
 * plus lines from comparing the two individuals situation by situation.
 */
export function buildPairWhatStandsOut (facts: ChangeFacts, people: [Person, Person]): Insight[] {
  const { rows, centreCounts, centreCountByContext, allSameCombo, comboKeys } = facts
  if (rows.length === 0) return []

  const out: Insight[] = []
  const seen = new Set<string>()
  const uniqueKeys = new Set(comboKeys)

  const add = (headline: string, body: string, priority: number) => {
    const key = `${headline}|${body}`
    if (seen.has(key)) return
    seen.add(key)
    out.push({ headline, body, priority })
  }

  pushPairRelationalSignals(add, people)

  const contextsWithCentre = (centre: Centre) =>
    rows.filter((row) => row.centres.includes(centre)).map((row) => row.title)

  const missing = (['Head', 'Heart', 'Gut'] as const).filter((c) => centreCounts[c] === 0)
  if (missing.length === 1) {
    const t = PAIR_LESS_ONE[missing[0]!]!
    add(t.headline, t.body, 100)
  } else if (missing.length > 1) {
    add('Several parts are quiet for this pair', pairLessSeveralBody(missing), 100)
  }

  if (allSameCombo && rows[0]) {
    add(sameComboHeadline(rows[0]), pairSameComboBody(rows[0]), 96)
    pushPairAllSameDepth(add, rows[0])
  }

  if (uniqueKeys.size === 2) {
    const groups = new Map<string, ContextComboRow[]>()
    rows.forEach((row, i) => {
      const key = comboKeys[i]!
      const list = groups.get(key) ?? []
      list.push(row)
      groups.set(key, list)
    })
    const grouped = [...groups.values()].sort((a, b) => b.length - a.length)
    if (grouped.length === 2) {
      const gA = grouped[0]!
      const gB = grouped[1]!
      add(
        'Two repeating patterns',
        `The pair average looks like ${gA[0]!.shortLabel} in some rows and ${gB[0]!.shortLabel} in others. You two flip between two familiar combined shapes instead of drifting at random.`,
        92
      )
    }
  }

  if (!allSameCombo && uniqueKeys.size === 4 && rows.length === 4) {
    add(
      'A different shape in every row',
      'No two rows share the same combined pattern. The pair picture shifts with each situation, even though it is still the two of you. Saying that out loud can reduce friction when you assume you are seeing the same thing.',
      91
    )
  }

  const maxC = Math.max(centreCounts.Head, centreCounts.Heart, centreCounts.Gut)
  const tops = (['Head', 'Heart', 'Gut'] as const).filter((c) => centreCounts[c] === maxC)
  if (!allSameCombo && tops.length === 1) {
    const c = tops[0]!
    const titles = contextsWithCentre(c)
    const missingTitles = rows.filter((row) => !row.centres.includes(c)).map((row) => row.title)
    if (titles.length === 3 && missingTitles.length === 1) {
      const missingRow = rows.find((row) => row.title === missingTitles[0])!
      add(
        `${c} runs most of the map`,
        `${c} is strong across the pair average except in ${missingRow.title}, where the midpoint between you shifts toward ${missingRow.shortLabel}. Ask what is different about that situation for each of you and for you together.`,
        88
      )
    } else if (titles.length === 4) {
      const steady = PAIR_STEADY_EVERYWHERE[c]!
      add(steady.headline, steady.body, 88)
    }
  }

  for (const centre of ['Head', 'Heart', 'Gut'] as const) {
    if (centreCounts[centre] === 1) {
      const onlyRow = rows.find((row) => row.centres.includes(centre))
      if (onlyRow) {
        add(
          `${centre} strongest in one row only`,
          `${centre} shows clearest in the pair average for ${onlyRow.title} (${onlyRow.shortLabel}) and sits softer in the other rows. Compare whether one of you drives that spike or you both meet there.`,
          87
        )
      }
    }
  }

  const tripleRows = rows.filter((row) => row.centres.length === 3)
  if (tripleRows.length === 1) {
    add(
      `${tripleRows[0]!.title}: only row with all three`,
      `${tripleRows[0]!.title} is the only row where Head, Heart, and Gut all stay in the pair average. Elsewhere at least one centre steps back for the two of you combined. This row is where you look most fully three-way together.`,
      84
    )
  }

  const singleRows = rows.filter((row) => row.centres.length === 1)
  if (singleRows.length === 1) {
    add(
      `${singleRows[0]!.title} is the simplest row`,
      `${singleRows[0]!.title} is the only row where the pair average narrows to one centre. The rest of the map is wider for both of you. When things get simple, this is your clearest shared single focus.`,
      83
    )
  }

  if (rows.length === 4) {
    const maxN = Math.max(...centreCountByContext)
    const minN = Math.min(...centreCountByContext)
    const maxIdx = centreCountByContext.map((n, i) => (n === maxN ? i : -1)).filter((i) => i >= 0)
    const minIdx = centreCountByContext.map((n, i) => (n === minN ? i : -1)).filter((i) => i >= 0)
    const hasWideLeanPair = maxIdx.length === 1 && minIdx.length === 1 && maxN > minN
    if (hasWideLeanPair) {
      const wide = rows[maxIdx[0]!]!
      const lean = rows[minIdx[0]!]!
      add(
        `${wide.title} is fullest, ${lean.title} is tightest`,
        `${wide.title} packs more of Head, Heart, and Gut into the pair average; ${lean.title} keeps the combined picture smaller. That gap is the biggest swing between you on this map: richest together versus lightest together.`,
        82
      )
    }
    if (maxIdx.length === 1 && maxN >= 2 && !hasWideLeanPair) {
      const r = rows[maxIdx[0]!]!
      add(
        `${r.title} is the fullest row`,
        `${r.title} is where the most of Head, Heart, and Gut show at once (${r.shortLabel}) in the pair average. The busiest combined row on this map.`,
        81
      )
    }
    if (minIdx.length === 1 && minN < maxN && !hasWideLeanPair) {
      const r = rows[minIdx[0]!]!
      add(
        `${r.title} stays small`,
        `${r.title} is where the pair average is smallest (${r.shortLabel}). Together you are not trying to run every part at full strength in that situation.`,
        80
      )
    }
  }

  const maxCAll = Math.max(centreCounts.Head, centreCounts.Heart, centreCounts.Gut)
  const topsAll = (['Head', 'Heart', 'Gut'] as const).filter((c) => centreCounts[c] === maxCAll)
  if (!allSameCombo && topsAll.length === 2 && maxCAll >= 2) {
    const [x, y] = topsAll
    add(
      `${x} and ${y} tie`,
      `No single centre wins the pair map; ${x} and ${y} show up equally often across rows. The two of you blend those strengths in the combined picture instead of one centre owning the story.`,
      56
    )
  }
  if (!allSameCombo && topsAll.length === 3 && rows.length === 4) {
    add(
      'Three-way tie',
      'Head, Heart, and Gut each show up the same number of times across rows in the pair average. Together you rotate the lead instead of fixing one permanent boss for both of you.',
      55
    )
  }
  if (!allSameCombo && topsAll.length === 1 && maxCAll === 2) {
    const c = topsAll[0]!
    add(
      `${c} still shows in half the rows`,
      `${c} is missing from some rows but appears in half of them in the pair average. Enough to feel like a steady shared habit, even if one of you feels it more than the other.`,
      54
    )
  }

  const tripleBandIdx = rows.findIndex((r) => r.centres.length === 3)
  if (tripleBandIdx >= 0 && tripleRows.length !== 1) {
    const r = rows[tripleBandIdx]!
    add(
      `${r.title}: all three here`,
      `In ${r.title} the pair average runs Head, Heart, and Gut together (${r.shortLabel}). Nothing is fully left out for the two of you in that row.`,
      52
    )
  }

  if (rows.length === 4 && centreCountByContext.every((n) => n === 2)) {
    add(
      'Mostly two at a time',
      'Every row stays in a two-part mix in the pair average. The two of you rarely look solo or full three-way in this snapshot. A duo of strengths is your default combined shape.',
      51
    )
  }

  const contrastPairs: [number, number][] = [
    [0, 2],
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [2, 3],
  ]

  for (const [i, j] of contrastPairs) {
    if (i >= rows.length || j >= rows.length) continue
    if (comboKeys[i] === comboKeys[j]) continue
    const ra = rows[i]!
    const rb = rows[j]!
    add(
      `${ra.title} and ${rb.title} look different`,
      `${ra.title} leans ${ra.shortLabel} in the pair average; ${rb.title} leans ${rb.shortLabel}. Same two people, two different combined pictures side by side.`,
      60 - i - j
    )
  }

  if (rows.length === 1) {
    const r = rows[0]!
    add(
      `${r.title} in focus`,
      `This pair read centers on ${r.title}: ${r.shortLabel}.`,
      12
    )
    add(
      `The mix in ${r.title}`,
      `${r.shortLabel} is the shape the pair average takes when ${r.title} is the frame.`,
      11
    )
    add(
      'What this row shows',
      `Every part named in ${r.shortLabel} is doing visible work for both of you together in ${r.title} on this map.`,
      10
    )
  }

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]!
    add(
      r.title,
      `Pair average in this row: ${r.shortLabel}.`,
      4 - i
    )
  }

  out.sort((a, b) => b.priority - a.priority)
  return out.slice(0, INSIGHT_TARGET)
}

export function buildPairWhatStandsOutFromPeople (people: [Person, Person]): Insight[] {
  const [a, b] = people
  const summaries = PAIR_CONTEXTS.map((ctx) => averageScores(scoresFor(a, ctx), scoresFor(b, ctx)))
  const facts = buildFacts(summaries, PAIR_CONTEXT_LABELS)
  return buildPairWhatStandsOut(facts, [a, b])
}
