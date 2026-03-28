import type { Centre, ChangeFacts, ContextComboRow, Insight } from '../../Quiz/ChangeResults/changeResultsLogic'

const INSIGHT_TARGET = 3

const centreListPhrase = (centres: Centre[]): string => {
  if (centres.length === 1) return centres[0]!
  if (centres.length === 2) return `${centres[0]} and ${centres[1]}`
  return `${centres[0]}, ${centres[1]}, and ${centres[2]}`
}

/** One centre absent from every row: same voice as quiz “quiet here”, team map wording. */
const LESS_ONE: Record<Centre, { headline: string; body: string }> = {
  Head: {
    headline: 'Head is quiet here',
    body: "Head isn't showing up clearly on this map yet, which means there's an opportunity for the team to slow down, think things through, and name what's true before moving, alongside the centres that already show up strongly.",
  },
  Heart: {
    headline: 'Heart is quiet here',
    body: "Heart isn't showing up clearly on this map yet, which means there's an opportunity to notice impact on people, care, and what matters in the room, alongside the centres that already show up strongly.",
  },
  Gut: {
    headline: 'Gut is quiet here',
    body: "Gut isn't showing up clearly on this map yet, which means there's an opportunity for the team to trust itself more and act with less hesitation, alongside the centres that already show up strongly.",
  },
}

function lessSeveralBody(missing: Centre[]): string {
  if (missing.length === 2) {
    const list = centreListPhrase(missing)
    return `${list} aren't showing up clearly on this map yet, which means there's room to grow into those ways of operating while leaning on the centre that already shows up for the team in this snapshot.`
  }
  return "This map isn't picking up much from Head, Heart, or Gut in the averages yet, so treat it as a thin snapshot. The real team in the room is almost always wider than one screen of numbers."
}

/** Short headline when every context shares the same combination (archetype-style label). */
function sameComboHeadline(row: ContextComboRow): string {
  const { centres } = row
  if (centres.length === 1) return `${centres[0]} leads`
  if (centres.length === 2) return `${centres[0]} and ${centres[1]} lead`
  return 'Full mix, every context'
}

/** Bodies aligned with quiz LEADS / Sovereign tone, team voice. */
const LEADS_ALL_FOUR_TEAM: Record<Centre, string> = {
  Head:
    'Head shows up in all four contexts, making it a strong and consistent part of how the team approaches situations together, often guiding the group to think things through and rely on clarity and understanding before acting.',
  Heart:
    'Heart shows up in all four contexts, making it a strong and consistent part of how the team approaches situations together, often steering not just by what works, but by what feels right and meaningful.',
  Gut:
    'Gut shows up in all four contexts, making it a strong and consistent part of how the team approaches situations together, often nudging the group to trust momentum and act without overthinking every step.',
}

function sameComboBody(row: ContextComboRow): string {
  const { centres } = row
  if (centres.length === 1) {
    return LEADS_ALL_FOUR_TEAM[centres[0]!]!
  }
  if (centres.length === 2) {
    const [a, b] = centres
    return `${a} and ${b} show up in every row on this map, so that pairing stays steady in the team average no matter the situation. The context changes; the blend does not. A clear rhythm to recognise and build on.`
  }
  return 'Head, Heart, and Gut all stay in play across every context on this map, so the team snapshot reads integrated: mind, care, and instinct are all in the room on average, and nobody is leaving a whole channel behind.'
}

/** One centre present in every row while combos differ: same bodies as “all four” lead. */
const STEADY_EVERYWHERE: Record<Centre, { headline: string; body: string }> = {
  Head: { headline: 'Head leads', body: LEADS_ALL_FOUR_TEAM.Head },
  Heart: { headline: 'Heart leads', body: LEADS_ALL_FOUR_TEAM.Heart },
  Gut: { headline: 'Gut leads', body: LEADS_ALL_FOUR_TEAM.Gut },
}

/** Extra lines when every row shares one combination (team voice); fills out the story without generic fallbacks. */
function pushTeamAllSameDepth(
  add: (headline: string, body: string, priority: number) => void,
  row0: ContextComboRow
) {
  const n = row0.centres.length
  if (n === 1) {
    const c = row0.centres[0]!
    add(
      'One lead, four rooms',
      `${c} is the through-line across Under Pressure, Doing Work, With People, and Getting Better. The situation changes; what the team reaches for first does not.`,
      94
    )
    add(
      'No lite version here',
      `${row0.shortLabel} repeats on purpose.`,
      93
    )
  } else if (n === 2) {
    const [x, y] = row0.centres
    add(
      'Same duet, four stages',
      `${x} and ${y} stay in conversation no matter which row you read. The team runs that partnership like a habit across situations.`,
      94
    )
    add(
      'Rhythm you can trust',
      `${row0.shortLabel} on repeat is not noise; it is a signal about what feels honest when stakes change.`,
      93
    )
  } else if (n === 3) {
    add(
      'Integrated by default',
      'Head, Heart, and Gut all get a seat in every row on this map. The team is not holding parts of the blend back when the label switches.',
      94
    )
    add(
      'Nothing gets edited out',
      `Same full mix (${row0.shortLabel}) in all four stories. That is a rare kind of steadiness for a group average.`,
      93
    )
  }
}

/**
 * Team “what stands out”: ranked candidates from this map only. The lowest tier is one line per row
 * (title + average label) so we always have enough distinct, data-bound options; no generic UI copy.
 */
export function buildTeamWhatStandsOut(facts: ChangeFacts): Insight[] {
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

  const contextsWithCentre = (centre: Centre) =>
    rows.filter((row) => row.centres.includes(centre)).map((row) => row.title)

  const missing = (['Head', 'Heart', 'Gut'] as const).filter((c) => centreCounts[c] === 0)
  if (missing.length === 1) {
    const t = LESS_ONE[missing[0]!]!
    add(t.headline, t.body, 100)
  } else if (missing.length > 1) {
    add('Several centres are quiet here', lessSeveralBody(missing), 100)
  }

  if (allSameCombo && rows[0]) {
    add(sameComboHeadline(rows[0]), sameComboBody(rows[0]), 96)
    pushTeamAllSameDepth(add, rows[0])
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
      const a = grouped[0]!
      const b = grouped[1]!
      add(
        'Two clear team modes',
        `The map settles into ${a[0]!.shortLabel} in some places and ${b[0]!.shortLabel} in others, so the team toggles between two repeatable shapes rather than drifting.`,
        92
      )
    }
  }

  if (!allSameCombo && uniqueKeys.size === 4 && rows.length === 4) {
    add(
      'Every context has its own shape',
      'No two rows match on this map, which means the team flexes its average read from situation to situation. Same group, different doorways in. That is adaptability you can name and use.',
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
        `${c} holds most of the map`,
        `${c} shows up strongly across the map and reads a little lighter in ${missingRow.title}, where the team lands on ${missingRow.shortLabel} instead. That row is the exception, so it is worth asking what is different about that situation.`,
        88
      )
    } else if (titles.length === 4) {
      const steady = STEADY_EVERYWHERE[c]!
      add(steady.headline, steady.body, 88)
    }
  }

  for (const centre of ['Head', 'Heart', 'Gut'] as const) {
    if (centreCounts[centre] === 1) {
      const onlyRow = rows.find((row) => row.centres.includes(centre))
      if (onlyRow) {
        add(
          `${centre} spikes in one place`,
          `${centre} reads clearest in ${onlyRow.title} (${onlyRow.shortLabel}) and fades in the other averages.`,
          87
        )
      }
    }
  }

  const tripleRows = rows.filter((row) => row.centres.length === 3)
  if (tripleRows.length === 1) {
    add(
      `${tripleRows[0]!.title} is the only full-spectrum context`,
      `${tripleRows[0]!.title} is the only row where Head, Heart, and Gut all stay in the mix together on average. Everywhere else, at least one channel steps back, so this row is where the team looks most balanced.`,
      84
    )
  }

  const singleRows = rows.filter((row) => row.centres.length === 1)
  if (singleRows.length === 1) {
    add(
      `${singleRows[0]!.title} is the leanest read`,
      `${singleRows[0]!.title} is the only row where the average narrows to a single centre. The rest of the map runs wider, so this row is your clearest “one note” moment, good for spotting what dominates when things simplify.`,
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
        `${wide.title} runs widest, ${lean.title} runs leanest`,
        `${wide.title} pulls more centres into the average; ${lean.title} strips the read back. That gap is the biggest swing on the map, so it tells you where the team feels richest versus where it travels light.`,
        82
      )
    }
    if (maxIdx.length === 1 && maxN >= 2 && !hasWideLeanPair) {
      const r = rows[maxIdx[0]!]!
      add(
        `${r.title} runs widest`,
        `${r.title} is where this map lets the most centres in at once (${r.shortLabel}). It is the team's most layered row in this read.`,
        81
      )
    }
    if (minIdx.length === 1 && minN < maxN && !hasWideLeanPair) {
      const r = rows[minIdx[0]!]!
      add(
        `${r.title} stays lean`,
        `${r.title} is where the average strips down (${r.shortLabel}). The team is not trying to run every centre at full volume there.`,
        80
      )
    }
  }

  const maxCAll = Math.max(centreCounts.Head, centreCounts.Heart, centreCounts.Gut)
  const topsAll = (['Head', 'Heart', 'Gut'] as const).filter((c) => centreCounts[c] === maxCAll)
  if (!allSameCombo && topsAll.length === 2 && maxCAll >= 2) {
    const [a, b] = topsAll
    add(
      `${a} and ${b} co-lead`,
      `No single centre owns the map; ${a} and ${b} both show up equally often across rows. The team blends those voices rather than crowning one.`,
      56
    )
  }
  if (!allSameCombo && topsAll.length === 3 && rows.length === 4) {
    add(
      'Three-way split',
      'Head, Heart, and Gut each show up the same number of times across rows. The team rotates rather than picking a permanent boss centre.',
      55
    )
  }
  if (!allSameCombo && topsAll.length === 1 && maxCAll === 2) {
    const c = topsAll[0]!
    add(
      `${c} still anchors half the map`,
      `${c} is not in every row, but it is in half of them here. Enough to feel like a familiar hand on the wheel for the team average.`,
      54
    )
  }

  const tripleBandIdx = rows.findIndex((r) => r.centres.length === 3)
  if (tripleBandIdx >= 0 && tripleRows.length !== 1) {
    const r = rows[tripleBandIdx]!
    add(
      `${r.title}: full band`,
      `In ${r.title} the team runs Head, Heart, and Gut together (${r.shortLabel}). That is the row where nothing is off the table in the average.`,
      52
    )
  }

  if (rows.length === 4 && centreCountByContext.every((n) => n === 2)) {
    add(
      'Living in pairs',
      'Every row on this map stays in two-centre mode. The team rarely goes solo or full trio in this snapshot; it likes a duet.',
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
    const a = rows[i]!
    const b = rows[j]!
    add(
      `${a.title} and ${b.title} diverge`,
      `${a.title} leans ${a.shortLabel}; ${b.title} pulls the average toward ${b.shortLabel}. Same team, two different doorways in.`,
      60 - i - j
    )
  }

  if (rows.length === 1) {
    const r = rows[0]!
    add(
      `${r.title} in focus`,
      `This team's read is anchored in ${r.title}: ${r.shortLabel}.`,
      12
    )
    add(
      `The mix in ${r.title}`,
      `${r.shortLabel} is the shape the team average takes when ${r.title} is the frame.`,
      11
    )
    add(
      'Signal in this slice',
      `Every centre named in ${r.shortLabel} is doing visible work in ${r.title} on this map.`,
      10
    )
  }

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]!
    add(
      r.title,
      `Team average in this slice: ${r.shortLabel}.`,
      4 - i
    )
  }

  out.sort((a, b) => b.priority - a.priority)
  return out.slice(0, INSIGHT_TARGET)
}
