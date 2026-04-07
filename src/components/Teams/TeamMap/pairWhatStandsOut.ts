import type { Centre, ChangeFacts, ContextComboRow, Insight } from '../../Quiz/ChangeResults/changeResultsLogic'
import { buildFacts } from '../../Quiz/ChangeResults/changeResultsLogic'
import type { Person, TeamContextKey, TeamContextScores } from '../PeoplePanel/types'

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
  if (centres.length === 1) return `${centres[0]} leads`
  if (centres.length === 2) return `${centres[0]} and ${centres[1]} lead`
  return 'Full mix, every context'
}

const PAIR_LESS_ONE: Record<Centre, { headline: string; body: string }> = {
  Head: {
    headline: 'Head is faint on this map',
    body: 'When your scores are averaged across the four situations, Head does not show strongly yet. You can still slow down and think things through without losing what already works together.',
  },
  Heart: {
    headline: 'Heart is faint on this map',
    body: 'When your scores are averaged across the four situations, Heart does not show strongly yet. You can still pay attention to people and care without losing what already shows up here.',
  },
  Gut: {
    headline: 'Gut is faint on this map',
    body: 'When your scores are averaged across the four situations, Gut does not show strongly yet. You can still act with more ease and speed without losing what already grounds you both here.',
  },
}

function pairLessSeveralBody (missing: Centre[]): string {
  if (missing.length === 2) {
    const list = centreListPhrase(missing)
    return `${list} do not show strongly on this map yet, so the average leans on the other part(s). That hints at what you may lean on too much and what you could grow.`
  }
  return 'This map barely picks up Head, Heart, or Gut in the averages. Treat it as a thin snapshot. Real life together is usually richer than one screen of numbers.'
}

const LEADS_ALL_FOUR_PAIR: Record<Centre, string> = {
  Head:
    'Head shows in all four situations on this map, so thinking and clarity stay a steady part of how you handle pressure, work, people, and growth together.',
  Heart:
    'Heart shows in all four situations on this map, so care for people and what matters to them stays visible across how you work together.',
  Gut:
    'Gut shows in all four situations on this map, so momentum and willingness to act stay in the story you share in every row.',
}

function pairSameComboBody (row: ContextComboRow): string {
  const { centres } = row
  if (centres.length === 1) {
    return LEADS_ALL_FOUR_PAIR[centres[0]!]!
  }
  if (centres.length === 2) {
    const [x, y] = centres
    return `${x} and ${y} stay active in every row on this map for your average. The situation changes; your mix together does not. You can name that habit, plan around it, or change it on purpose when you need to.`
  }
  return 'Head, Heart, and Gut all show in every row on this map. Thinking, care, and instinct all stay in play, and none of the three drops out fully.'
}

const PAIR_STEADY_EVERYWHERE: Record<Centre, { headline: string; body: string }> = {
  Head: { headline: 'Head leads', body: LEADS_ALL_FOUR_PAIR.Head },
  Heart: { headline: 'Heart leads', body: LEADS_ALL_FOUR_PAIR.Heart },
  Gut: { headline: 'Gut leads', body: LEADS_ALL_FOUR_PAIR.Gut },
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
      `${c} runs through all four situations on this map. The scene changes; what you both reach for first does not.`,
      94
    )
    add(
      'Same label on purpose',
      `${row0.shortLabel} keeps showing up together. That repeat is a clue to what feels true when pressure changes.`,
      93
    )
  } else if (n === 2) {
    const [x, y] = row0.centres
    add(
      'Same pair of strengths, four times',
      `${x} and ${y} stay paired in your average in every row. It is a habit across situations, not a one-off.`,
      94
    )
    add(
      'A rhythm you can change',
      `Seeing ${row0.shortLabel} again and again is something you can keep or deliberately shift when the moment needs something else.`,
      93
    )
  } else if (n === 3) {
    add(
      'All three, every time',
      'Head, Heart, and Gut all show in every row on this map. Neither of you is leaving a whole part of the mix out when the row changes.',
      94
    )
    add(
      'Nothing dropped out',
      `Same full picture (${row0.shortLabel}) in all four rows. That kind of evenness is uncommon for two people on one map.`,
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
        ? `You both lean ${[...uniqueD][0]} strongest in every situation.`
        : 'In every situation, whoever leads (Head, Heart, or Gut) is the same for both of you, even when that leader changes by row.'
    add(
      'Matched in every situation',
      `${matchLine} Fitting this well can still mean you share the same blind spot.`,
      98
    )
  } else if (align === 0) {
    add(
      'Opposite tilts every time',
      'Who leads (Head, Heart, or Gut) never matches for both of you across these four situations. What is clear to one of you may need spelling out when the context changes.',
      98
    )
  } else if (align >= 2 && align < 4) {
    add(
      'Sometimes you match, sometimes not',
      'You line up in some situations and not in others. It helps to name when the context shifts, not only “we are different people.”',
      86
    )
  }
}

/**
 * Pair “what stands out”: same structural signals as the team map, phrased for two people,
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
    add('Several parts are quiet on this map', pairLessSeveralBody(missing), 100)
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
        `Your average looks like ${gA[0]!.shortLabel} in some rows and ${gB[0]!.shortLabel} in others. You switch between two familiar shapes instead of drifting at random.`,
        92
      )
    }
  }

  if (!allSameCombo && uniqueKeys.size === 4 && rows.length === 4) {
    add(
      'A different shape in every row',
      'No two rows match. How you read together changes with the situation. Same two people, different angles. Saying that out loud can help in arguments.',
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
        `${c} is strong across the map except in ${missingRow.title}, where you average closer to ${missingRow.shortLabel}. Ask what is different about that situation for both of you.`,
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
          `${centre} shows clearest in ${onlyRow.title} (${onlyRow.shortLabel}) and is softer in the other rows.`,
          87
        )
      }
    }
  }

  const tripleRows = rows.filter((row) => row.centres.length === 3)
  if (tripleRows.length === 1) {
    add(
      `${tripleRows[0]!.title}: only row with all three`,
      `${tripleRows[0]!.title} is the only row where Head, Heart, and Gut all stay in the mix in your average. Elsewhere at least one steps back. This is where you look most “all three on” together.`,
      84
    )
  }

  const singleRows = rows.filter((row) => row.centres.length === 1)
  if (singleRows.length === 1) {
    add(
      `${singleRows[0]!.title} is the simplest row`,
      `${singleRows[0]!.title} is the only row where your average narrows to one centre. The rest of the map is wider. When things get simple, this is your clearest single focus.`,
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
        `${wide.title} packs in more of Head, Heart, and Gut; ${lean.title} keeps the average smaller. That gap is the biggest swing on the map: where you feel richest together versus where you travel light.`,
        82
      )
    }
    if (maxIdx.length === 1 && maxN >= 2 && !hasWideLeanPair) {
      const r = rows[maxIdx[0]!]!
      add(
        `${r.title} is the fullest row`,
        `${r.title} is where the most of Head, Heart, and Gut show at once (${r.shortLabel}) in your average. The busiest row on this map.`,
        81
      )
    }
    if (minIdx.length === 1 && minN < maxN && !hasWideLeanPair) {
      const r = rows[minIdx[0]!]!
      add(
        `${r.title} stays small`,
        `${r.title} is where your average is smallest (${r.shortLabel}). Neither of you is trying to run every part at full strength there.`,
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
      `No single part wins the map; ${x} and ${y} show up equally often across rows. You blend those two rather than picking one boss.`,
      56
    )
  }
  if (!allSameCombo && topsAll.length === 3 && rows.length === 4) {
    add(
      'Three-way tie',
      'Head, Heart, and Gut each show up the same number of times across rows. You rotate instead of fixing one permanent leader.',
      55
    )
  }
  if (!allSameCombo && topsAll.length === 1 && maxCAll === 2) {
    const c = topsAll[0]!
    add(
      `${c} still shows in half the rows`,
      `${c} is missing from some rows but appears in half of them here. Enough to feel like a steady habit for this pair.`,
      54
    )
  }

  const tripleBandIdx = rows.findIndex((r) => r.centres.length === 3)
  if (tripleBandIdx >= 0 && tripleRows.length !== 1) {
    const r = rows[tripleBandIdx]!
    add(
      `${r.title}: all three here`,
      `In ${r.title} your average runs Head, Heart, and Gut together (${r.shortLabel}). Nothing is fully left out in that row.`,
      52
    )
  }

  if (rows.length === 4 && centreCountByContext.every((n) => n === 2)) {
    add(
      'Mostly two at a time',
      'Every row stays in a two-part mix in your average. You rarely look solo or full three-way in this snapshot; pairs of strengths are your default.',
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
      `${ra.title} leans ${ra.shortLabel} in your average; ${rb.title} leans ${rb.shortLabel}. Same two people, two different pictures.`,
      60 - i - j
    )
  }

  if (rows.length === 1) {
    const r = rows[0]!
    add(
      `${r.title} in focus`,
      `This read centers on ${r.title}: ${r.shortLabel}.`,
      12
    )
    add(
      `The mix in ${r.title}`,
      `${r.shortLabel} is the shape your average takes when ${r.title} is the frame.`,
      11
    )
    add(
      'What this row shows',
      `Every part named in ${r.shortLabel} is doing visible work in ${r.title} on this map.`,
      10
    )
  }

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]!
    add(
      r.title,
      `Average in this row: ${r.shortLabel}.`,
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
