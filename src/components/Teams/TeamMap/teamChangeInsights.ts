import type { Centre, ChangeFacts, ContextComboRow, Insight } from '../../Quiz/ChangeResults/changeResultsLogic'

const INSIGHT_TARGET = 3

/** Team-voice “what stands out” from the same facts structure as quiz Change results. */
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

  const joinTitles = (titles: string[]) => {
    if (titles.length === 1) return titles[0]!
    if (titles.length === 2) return `${titles[0]} and ${titles[1]}`
    return `${titles.slice(0, -1).join(', ')}, and ${titles[titles.length - 1]}`
  }

  const contextsWithCentre = (centre: Centre) =>
    rows.filter((row) => row.centres.includes(centre)).map((row) => row.title)

  const rowSummary = (row: ContextComboRow) => `${row.title} = ${row.shortLabel}`

  const missing = (['Head', 'Heart', 'Gut'] as const).filter((c) => centreCounts[c] === 0)
  if (missing.length === 1) {
    const c = missing[0]!
    add(
      `${c} never enters the picture`,
      `${c} does not appear in any of the four situational combinations. ${rows.map(rowSummary).join('; ')}.`,
      100
    )
  } else if (missing.length > 1) {
    add(
      'The team is working from a very narrow band',
      `${missing.join(' and ')} never appear in the situational combinations. ${rows.map(rowSummary).join('; ')}.`,
      100
    )
  }

  if (allSameCombo && rows[0]) {
    add(
      'Same shape in every context',
      `${joinTitles(rows.map((row) => row.title))} all land on ${rows[0].shortLabel}. The team is not changing its average pattern across situations.`,
      96
    )
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
        `${joinTitles(a.map((row) => row.title))} land on ${a[0]!.shortLabel}, while ${joinTitles(b.map((row) => row.title))} land on ${b[0]!.shortLabel}. The team toggles between two repeatable shapes rather than drifting.`,
        92
      )
    }
  }

  if (!allSameCombo && uniqueKeys.size === 4 && rows.length === 4) {
    add(
      'Every context has its own shape',
      `${rows.map(rowSummary).join('; ')}. No two contexts share the same average combination.`,
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
        `${c} holds almost the whole map`,
        `${c} appears in ${joinTitles(titles)} and only drops out in ${missingRow.title}, where the team shifts to ${missingRow.shortLabel}.`,
        88
      )
    } else if (titles.length === 4) {
      add(
        `${c} never leaves the mix`,
        `${c} appears in all four contexts: ${rows.map(rowSummary).join('; ')}.`,
        88
      )
    }
  }

  for (const centre of ['Head', 'Heart', 'Gut'] as const) {
    if (centreCounts[centre] === 1) {
      const onlyRow = rows.find((row) => row.centres.includes(centre))
      if (onlyRow) {
        add(
          `${centre} shows up in one place only`,
          `${centre} appears only in ${onlyRow.title}, where the team lands on ${onlyRow.shortLabel}. In the other contexts, that centre drops out of the average mix.`,
          87
        )
      }
    }
  }

  const tripleRows = rows.filter((row) => row.centres.length === 3)
  if (tripleRows.length === 1) {
    add(
      `${tripleRows[0]!.title} is the only full-spectrum context`,
      `${tripleRows[0]!.title} is the only place where Head, Heart, and Gut all stay active together (${tripleRows[0]!.shortLabel}).`,
      84
    )
  }

  const singleRows = rows.filter((row) => row.centres.length === 1)
  if (singleRows.length === 1) {
    add(
      `${singleRows[0]!.title} is the leanest read`,
      `${singleRows[0]!.title} is the only single-centre context, landing on ${singleRows[0]!.shortLabel} while the other contexts carry a wider mix.`,
      83
    )
  }

  if (rows.length === 4) {
    const maxN = Math.max(...centreCountByContext)
    const minN = Math.min(...centreCountByContext)
    const maxIdx = centreCountByContext.map((n, i) => (n === maxN ? i : -1)).filter((i) => i >= 0)
    const minIdx = centreCountByContext.map((n, i) => (n === minN ? i : -1)).filter((i) => i >= 0)
    if (maxIdx.length === 1 && minIdx.length === 1 && maxN > minN) {
      const wide = rows[maxIdx[0]!]!
      const lean = rows[minIdx[0]!]!
      add(
        `${wide.title} runs widest, ${lean.title} runs leanest`,
        `${wide.title} brings in ${wide.shortLabel}, while ${lean.title} strips back to ${lean.shortLabel}. That is the biggest spread in the team's situational read.`,
        82
      )
    }
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
      `${a.title} lands on ${a.shortLabel}; ${b.title} lands on ${b.shortLabel}. Those two contexts pull the team into different average shapes.`,
      60 - i - j
    )
  }

  out.sort((a, b) => b.priority - a.priority)
  return out.slice(0, INSIGHT_TARGET)
}
