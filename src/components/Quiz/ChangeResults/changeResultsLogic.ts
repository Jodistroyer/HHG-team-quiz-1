import { getBrainCombination } from '../SectionResults/utils.tsx'

export type Centre = 'Head' | 'Heart' | 'Gut'

export interface SectionScoresInput {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

export interface ContextComboRow {
  title: string
  rawLabel: string
  shortLabel: string
  centres: Centre[]
  /** Head / Heart / Gut colours for combo badge gradient (same as SectionCard). */
  colors: string[]
}

export interface ChangeFacts {
  rows: ContextComboRow[]
  centreCounts: Record<Centre, number>
  centreCountByContext: number[]
  allSameCombo: boolean
  comboKeys: string[]
}

/** Normalise "Head Strong" to "Head only" for display. */
export function shortComboLabel(rawLabel: string): string {
  return rawLabel.replace(/ Strong$/, ' only')
}

/** Centres active in a context from the same label rules as SectionResults. */
export function parseCentres(rawLabel: string): Centre[] {
  if (rawLabel === 'Head + Heart + Gut') return ['Head', 'Heart', 'Gut']
  const strong = /^(Head|Heart|Gut) Strong$/.exec(rawLabel)
  if (strong) return [strong[1] as Centre]
  const pair = /^(Head|Heart|Gut) \+ (Head|Heart|Gut)$/.exec(rawLabel)
  if (pair) return [pair[1] as Centre, pair[2] as Centre]
  return []
}

function sortedComboKey(centres: Centre[]): string {
  const order: Centre[] = ['Head', 'Heart', 'Gut']
  return order.filter((c) => centres.includes(c)).join(',')
}

export function buildFacts(sectionSummaries: SectionScoresInput[], sectionTitles: string[]): ChangeFacts {
  const rows: ContextComboRow[] = sectionSummaries.slice(0, 4).map((scores, i) => {
    const combo = getBrainCombination(scores.headPercent, scores.heartPercent, scores.gutPercent)
    const centres = parseCentres(combo.label)
    return {
      title: sectionTitles[i] ?? `Context ${i + 1}`,
      rawLabel: combo.label,
      shortLabel: shortComboLabel(combo.label),
      centres,
      colors: combo.colors,
    }
  })

  const centreCounts: Record<Centre, number> = { Head: 0, Heart: 0, Gut: 0 }
  for (const r of rows) {
    for (const c of r.centres) {
      centreCounts[c]++
    }
  }

  const centreCountByContext = rows.map((r) => r.centres.length)
  const comboKeys = rows.map((r) => sortedComboKey(r.centres))
  const allSameCombo = comboKeys.length > 0 && comboKeys.every((k) => k === comboKeys[0])

  return { rows, centreCounts, centreCountByContext, allSameCombo, comboKeys }
}

export interface Insight {
  headline: string
  body: string
  priority: number
}

const centreListPhrase = (centres: Centre[]): string => {
  if (centres.length === 1) return centres[0]!
  if (centres.length === 2) return `${centres[0]} and ${centres[1]}`
  return `${centres[0]}, ${centres[1]}, and ${centres[2]}`
}

/** Standard advice when a centre never appears in any context (single centre). */
const MISSING_ONE_TEMPLATE: Record<
  Centre,
  { headline: string; body: string }
> = {
  Head: {
    headline: 'Head is quiet here',
    body: "Head isn't showing up clearly across your contexts yet, which means there's an opportunity to slow down, think things through, and name what's true before you move, alongside your existing strengths.",
  },
  Heart: {
    headline: 'Heart is quiet here',
    body: "Heart isn't showing up clearly across your contexts yet, which means there's an opportunity to notice impact on people, care, and what matters in the room, alongside your existing strengths.",
  },
  Gut: {
    headline: 'Gut is quiet here',
    body: "Gut isn't showing up clearly across your contexts yet, which means there's an opportunity to trust yourself more and act with less hesitation, alongside your existing strengths.",
  },
}

function missingCentresInsight(missing: Centre[]): Insight {
  if (missing.length === 1) {
    const c = missing[0]!
    const t = MISSING_ONE_TEMPLATE[c]
    return {
      priority: 100,
      headline: t.headline,
      body: t.body,
    }
  }
  const list = centreListPhrase(missing)
  return {
    priority: 100,
    headline: 'Several centres are quiet here',
    body: `${list} aren't showing up clearly across your contexts yet, which means there's room to grow into those ways of operating while leaning on the centres that already show up for you in this snapshot.`,
  }
}

const INSIGHT_TARGET_COUNT = 3

function insightKey(i: Insight): string {
  return `${i.headline}|${i.body}`
}

function tryAddInsight(out: Insight[], used: Set<string>, insight: Insight): boolean {
  const key = insightKey(insight)
  if (used.has(key)) return false
  used.add(key)
  out.push(insight)
  return true
}

/** Pairwise contrasts when keys differ (interpretive, not stats). */
function pushPairwiseContrasts(candidates: Insight[], rows: ContextComboRow[], comboKeys: string[], basePriority: number): void {
  const pairs: [number, number][] = [
    [0, 2],
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [2, 3],
  ]
  let p = basePriority
  for (const [i, j] of pairs) {
    if (i >= rows.length || j >= rows.length) continue
    if (comboKeys[i] === comboKeys[j]) continue
    const a = rows[i]!
    const b = rows[j]!
    candidates.push({
      priority: p,
      headline: `${a.title} vs ${b.title}`,
      body: `${a.title} leans ${a.shortLabel}; ${b.title} shifts you toward ${b.shortLabel}. Same you, different doorway in.`,
    })
    p -= 1
  }
}

/** Extra interpretive lines when every context shares one combo. */
function pushAllSameDepth(candidates: Insight[], rows: ContextComboRow[]): void {
  if (rows.length === 0) return
  const n = rows[0]!.centres.length
  if (n === 1) {
    const c = rows[0]!.centres[0]!
    candidates.push({
      priority: 88,
      headline: 'One lead, four rooms',
      body: `${c} is the through-line whether you are under pressure, in the work, with people, or growing. The situation changes; the centre you trust first does not, in this snapshot.`,
    })
    candidates.push({
      priority: 87,
      headline: 'No lite version',
      body: `You are not swapping in a "smaller" self for easier contexts here. ${rows[0]!.shortLabel} repeats on purpose.`,
    })
  } else if (n === 3) {
    candidates.push({
      priority: 88,
      headline: 'Integrated by default',
      body: `Head, Heart, and Gut all get a seat in every scene in this profile. You are not holding parts of yourself back when the context label switches.`,
    })
    candidates.push({
      priority: 87,
      headline: 'Nothing gets the edit',
      body: `Same full mix (${rows[0]!.shortLabel}) in all four stories. That is a rare kind of steadiness.`,
    })
  } else if (n === 2) {
    const [x, y] = rows[0]!.centres
    candidates.push({
      priority: 88,
      headline: 'Same duet, four stages',
      body: `${x} and ${y} stay in conversation no matter which context is live. You found a partnership between centres and run it like a habit.`,
    })
    candidates.push({
      priority: 87,
      headline: 'Rhythm you trust',
      body: `${rows[0]!.shortLabel} on repeat is not boredom; it is a signal about what feels honest when stakes change.`,
    })
  }
}

function pushCoolGapFillers(candidates: Insight[], facts: ChangeFacts): void {
  const { rows, centreCounts, centreCountByContext, allSameCombo, comboKeys } = facts
  if (rows.length < 2) return

  const maxC = Math.max(centreCounts.Head, centreCounts.Heart, centreCounts.Gut)
  const tops = (['Head', 'Heart', 'Gut'] as const).filter((c) => centreCounts[c] === maxC)

  if (!allSameCombo && tops.length === 2 && maxC >= 2) {
    const [a, b] = tops
    candidates.push({
      priority: 52,
      headline: `${a} and ${b} co-lead`,
      body: `No single centre owns the story; ${a} and ${b} both hit ${maxC} contexts. You are wired to blend those voices rather than crown one.`,
    })
  }

  if (!allSameCombo && tops.length === 3 && rows.length === 4) {
    candidates.push({
      priority: 51,
      headline: 'Three-way split',
      body: `Head, Heart, and Gut each show up the same number of times across contexts. You rotate rather than crown a permanent boss.`,
    })
  }

  if (!allSameCombo && tops.length === 1 && maxC === 2) {
    const c = tops[0]!
    candidates.push({
      priority: 50,
      headline: `${c} still anchors half the map`,
      body: `${c} is not everywhere, but it is in half of your contexts here. That is enough to feel like a familiar hand on the wheel.`,
    })
  }

  const tripleIdx = rows.findIndex((r) => r.centres.length === 3)
  if (tripleIdx >= 0) {
    const r = rows[tripleIdx]!
    candidates.push({
      priority: 48,
      headline: `${r.title}: full band`,
      body: `In ${r.title} you run Head + Heart + Gut together (${r.shortLabel}). That is the moment nothing is off the table.`,
    })
  }

  if (rows.length === 4) {
    const allPairs = centreCountByContext.every((n) => n === 2)
    if (allPairs) {
      candidates.push({
        priority: 47,
        headline: 'Living in pairs',
        body: `Every context here stays in two-centre mode. You rarely go solo or full trio in this snapshot; you like a duet.`,
      })
    }
  }

  for (const c of ['Head', 'Heart', 'Gut'] as const) {
    if (centreCounts[c] === 1) {
      const r = rows.find((row) => row.centres.includes(c))
      if (r) {
        candidates.push({
          priority: 46,
          headline: `${c} has one spotlight`,
          body: `${c} only fully steps forward in ${r.title} (${r.shortLabel}). Elsewhere it listens more than it leads.`,
        })
      }
      break
    }
  }

  const uniqueKeys = new Set(comboKeys)
  if (!allSameCombo && uniqueKeys.size === 2) {
    candidates.push({
      priority: 44,
      headline: 'Two signatures',
      body: `You mostly oscillate between two centre mixes across these four contexts, not a dozen. That is a clear inner dial.`,
    })
  }

  if (rows.length === 4) {
    const maxN = Math.max(...centreCountByContext)
    const maxIdx = centreCountByContext.map((n, i) => (n === maxN ? i : -1)).filter((i) => i >= 0)
    if (maxIdx.length === 1 && maxN >= 2) {
      const r = rows[maxIdx[0]!]!
      candidates.push({
        priority: 43,
        headline: `${r.title} runs widest`,
        body: `${r.title} is where you let more of the model in at once (${r.shortLabel}). It is your most layered scene in this read.`,
      })
    }
    const minN = Math.min(...centreCountByContext)
    const minIdx = centreCountByContext.map((n, i) => (n === minN ? i : -1)).filter((i) => i >= 0)
    if (minIdx.length === 1 && minN < maxN) {
      const r = rows[minIdx[0]!]!
      candidates.push({
        priority: 42,
        headline: `${r.title} stays lean`,
        body: `${r.title} is where you strip it down (${r.shortLabel}). You are not trying to run every centre at full volume there.`,
      })
    }
  }

  pushPairwiseContrasts(candidates, rows, comboKeys, 38)

  if (rows.length >= 2 && !allSameCombo) {
    candidates.push({
      priority: 30,
      headline: 'Context rewrites the mix',
      body: `Same life, different doors: your centre recipe shifts when the scene changes. That is adaptation, not inconsistency.`,
    })
  }
}

/** Interpretive rules only; always returns exactly three when there is context data. */
export function computeInsights(facts: ChangeFacts, maxInsights = INSIGHT_TARGET_COUNT): Insight[] {
  const { rows, centreCounts, centreCountByContext, allSameCombo, comboKeys } = facts

  if (rows.length === 0) {
    return []
  }

  const candidates: Insight[] = []

  const missing = (['Head', 'Heart', 'Gut'] as const).filter((c) => centreCounts[c] === 0)
  if (missing.length > 0) {
    candidates.push(missingCentresInsight(missing))
  }

  if (allSameCombo && rows.length > 0) {
    candidates.push({
      headline: 'Same pattern everywhere',
      body:
        rows.length >= 4
          ? `You show up the same way (${rows[0]!.shortLabel}) in each context.`
          : `Each scene in this snapshot lines up as ${rows[0]!.shortLabel}.`,
      priority: 95,
    })
    pushAllSameDepth(candidates, rows)
  }

  const maxC = Math.max(centreCounts.Head, centreCounts.Heart, centreCounts.Gut)
  const tops = (['Head', 'Heart', 'Gut'] as const).filter((c) => centreCounts[c] === maxC)
  if (!allSameCombo && tops.length === 1 && maxC >= 3) {
    const c = tops[0]!
    candidates.push({
      headline: `${c} leads`,
      body: `${c} shows up in ${maxC} of your 4 contexts, making it a strong and consistent part of how you approach situations.`,
      priority: 85,
    })
  }

  if (!allSameCombo && tops.length === 1 && maxC === 3) {
    const c = tops[0]!
    const absentIndices = rows.map((r, i) => (!r.centres.includes(c) ? i : -1)).filter((i) => i >= 0)
    if (absentIndices.length === 1) {
      const idx = absentIndices[0]!
      const ctx = rows[idx]!.title
      const short = rows[idx]!.shortLabel
      const headline =
        ctx.toLowerCase() === 'with people' ? 'Shifts with people' : `Shifts in ${ctx}`
      candidates.push({
        headline,
        body: `${ctx} is your only context where ${c} steps back; ${short} takes over there.`,
        priority: 80,
      })
    }
  }

  if (rows.length === 4) {
    const minCentres = Math.min(...centreCountByContext)
    const minIdx = centreCountByContext
      .map((n, i) => (n === minCentres ? i : -1))
      .filter((i) => i >= 0)
    const maxCentres = Math.max(...centreCountByContext)
    if (minIdx.length === 1 && minIdx[0] === 0 && minCentres < maxCentres) {
      const pTitle = rows[0]!.title
      candidates.push({
        headline: 'You narrow under pressure',
        body: `${pTitle} is where you use the fewest active centres: ${rows[0]!.shortLabel}.`,
        priority: 70,
      })
    }
  }

  if (rows.length === 4) {
    const g = centreCountByContext[3]!
    if (g > centreCountByContext[0]! && g > centreCountByContext[1]! && g > centreCountByContext[2]!) {
      const gTitle = rows[3]!.title
      candidates.push({
        headline: 'More of you when growing',
        body: `${gTitle} pulls in more centres at once (${rows[3]!.shortLabel}) than your other contexts here.`,
        priority: 65,
      })
    }
  }

  const heartRows = rows.map((r, i) => (r.centres.includes('Heart') ? i : -1)).filter((i) => i >= 0)
  if (
    heartRows.length === 2 &&
    heartRows.includes(2) &&
    heartRows.includes(3) &&
    !heartRows.includes(0) &&
    !heartRows.includes(1)
  ) {
    candidates.push({
      headline: 'Heart is quiet',
      body: `Heart only fully shows up when you're with others or reflecting on growth.`,
      priority: 60,
    })
  }

  const uniqueKeys = new Set(comboKeys)
  if (!allSameCombo && uniqueKeys.size === 4) {
    candidates.push({
      headline: 'Lots of variation',
      body: `Each context uses a different mix; you don't rely on one fixed recipe everywhere.`,
      priority: 45,
    })
  }

  if (!allSameCombo && uniqueKeys.size >= 3 && candidates.filter((x) => x.priority >= 60).length === 0) {
    candidates.push({
      headline: 'Context matters',
      body: `Your centre mix changes noticeably by situation; you adapt rather than repeat one pattern.`,
      priority: 42,
    })
  }

  pushCoolGapFillers(candidates, facts)

  candidates.sort((a, b) => b.priority - a.priority)

  const used = new Set<string>()
  const out: Insight[] = []
  for (const c of candidates) {
    tryAddInsight(out, used, c)
    if (out.length >= maxInsights) break
  }

  const contrastBodies = (i: number, j: number, variant: number): string => {
    const a = rows[i]!
    const b = rows[j]!
    const bodies = [
      `${a.title} runs ${a.shortLabel}; ${b.title} asks for ${b.shortLabel}. Same you, retuned for the room.`,
      `When the frame is ${a.title}, ${a.shortLabel} leads. Shift to ${b.title} and ${b.shortLabel} moves forward.`,
      `${a.title} and ${b.title} are different playlists: ${a.shortLabel} versus ${b.shortLabel}.`,
    ]
    return bodies[variant % bodies.length]!
  }

  let variant = 0
  while (out.length < maxInsights && rows.length >= 2) {
    let anyAdded = false
    for (let i = 0; i < rows.length && out.length < maxInsights; i++) {
      for (let j = i + 1; j < rows.length && out.length < maxInsights; j++) {
        if (comboKeys[i] === comboKeys[j]) continue
        const added = tryAddInsight(out, used, {
          priority: 8 - variant,
          headline: `${rows[i]!.title} → ${rows[j]!.title}`,
          body: contrastBodies(i, j, variant),
        })
        if (added) anyAdded = true
        variant++
      }
    }
    if (!anyAdded) break
  }

  if (out.length < maxInsights && rows.length === 1) {
    const r = rows[0]!
    const singles: Insight[] = [
      {
        priority: 7,
        headline: `${r.title} in focus`,
        body: `This read is anchored in ${r.title}: ${r.shortLabel}.`,
      },
      {
        priority: 6,
        headline: `That mix in ${r.title}`,
        body: `${r.shortLabel} is the shape you reach for when ${r.title} is the frame.`,
      },
      {
        priority: 5,
        headline: 'Signal in the stack',
        body: `Every centre named in ${r.shortLabel} is doing visible work in ${r.title} in this slice.`,
      },
    ]
    for (const s of singles) {
      tryAddInsight(out, used, s)
      if (out.length >= maxInsights) break
    }
  }

  return out
}
