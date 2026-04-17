import JSZip from 'jszip'
import { jsPDF } from 'jspdf'
import { QUIZ_SECTIONS } from '../Quiz/quizSections'
import type { Person } from './PeoplePanel/types'
import { buildPersonQuizResultDocument } from './personQuizResultExport'

const encoder = new TextEncoder()

export function byteLengthUtf8 (str: string): number {
  return encoder.encode(str).length
}

export function formatBytes (bytes: number): string {
  if (bytes < 1024) return `${Math.max(1, Math.round(bytes))} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Rough browser download time hint (assumes ~500 KB/s effective). */
export function estimateDownloadSeconds (bytes: number): string {
  const rate = 500 * 1024
  const sec = Math.max(0.5, bytes / rate)
  if (sec < 2) return '~1 s'
  if (sec < 8) return `~${Math.ceil(sec)} s`
  return `~${Math.ceil(sec / 5) * 5} s`
}

export function sanitizePathPart (name: string): string {
  return name.replace(/[/\\:*?"<>|]/g, '_').replace(/\s+/g, ' ').trim() || 'unnamed'
}

/**
 * File name inside ZIP: name + quiz completion date/time + id.
 * Falls back to `no-completion-date` when the profile has no stored completion time.
 */
export function zipExportPersonFileName (person: Person, ext: 'json' | 'pdf'): string {
  const namePart = sanitizePathPart(person.name)
  const idPart = sanitizePathPart(person.id)
  const datePart = person.quizCompletedAt
    ? sanitizePathPart(person.quizCompletedAt.replace(/:/g, '-').replace(/\./g, '_'))
    : 'no-completion-date'
  return `${namePart}__${datePart}__${idPart}.${ext}`
}

/**
 * Stable key order for library export: identity → completion & HHG → contextScores → quizAnswers last.
 */
export function serializePersonForLibraryJson (p: Person): Record<string, unknown> {
  const o: Record<string, unknown> = {
    id: p.id,
    name: p.name,
  }
  if (p.company !== undefined) o.company = p.company
  if (p.team !== undefined) o.team = p.team
  if (p.role !== undefined) o.role = p.role
  o.tags = p.tags
  if (p.quizCompletedAt !== undefined) o.quizCompletedAt = p.quizCompletedAt
  o.headPercent = p.headPercent
  o.heartPercent = p.heartPercent
  o.gutPercent = p.gutPercent
  o.dominant = p.dominant
  o.secondaryBrain = p.secondaryBrain
  if (p.sectionTendencies !== undefined) o.sectionTendencies = p.sectionTendencies
  if (p.contextScores !== undefined) o.contextScores = p.contextScores
  if (p.quizAnswers !== undefined) o.quizAnswers = p.quizAnswers
  return o
}

export function buildPeopleLibraryJson (people: Person[]): string {
  return JSON.stringify({ people: people.map(serializePersonForLibraryJson) }, null, 2)
}

function csvEscape (cell: string): string {
  if (/[",\n\r]/.test(cell)) return `"${cell.replace(/"/g, '""')}"`
  return cell
}

function snippetForHeader (text: string, max = 48): string {
  const t = text.replace(/\s+/g, ' ').trim().replace(/"/g, "'")
  if (t.length <= max) return t
  return `${t.slice(0, max - 1)}…`
}

function sectionLabel (sec: (typeof QUIZ_SECTIONS)[number]): string {
  return `S${sec.id} ${sec.title}`
}

/** Explains whether first/second choice cells are filled (requires imported quiz answers). */
function answerDataOnFileLabel (person: Person): string {
  const qa = person.quizAnswers
  if (!qa) return 'Profile only (no stored quiz answers)'
  const n = Object.values(qa).filter((a) => a?.firstChoice).length
  if (n === 0) return 'Profile only (no stored quiz answers)'
  return `Stored quiz answers (${n} answers)`
}

/** Human-readable headers: combination labels first, then %, then each section block with question text on answer columns. */
function buildReadablePeopleCsvHeaders (): string[] {
  const h: string[] = [
    'Exported at',
    'Quiz completed at',
    'Company',
    'Team',
    'Name',
    'Person ID',
    'Role',
    'Tags',
    'Answer data on file',
    'Combination - overall (natural default)',
  ]
  for (const sec of QUIZ_SECTIONS) {
    h.push(`Combination - ${sec.title}`)
  }
  h.push('Overall Head %', 'Overall Heart %', 'Overall Gut %')

  for (const sec of QUIZ_SECTIONS) {
    const p = sectionLabel(sec)
    h.push(
      `${p} | Summary Head %`,
      `${p} | Summary Heart %`,
      `${p} | Summary Gut %`,
      `${p} | Score Head %`,
      `${p} | Score Heart %`,
      `${p} | Score Gut %`,
      `${p} | Dominant`,
      `${p} | Secondary brain`
    )
    for (const q of sec.questions) {
      const qsnip = snippetForHeader(q.text)
      h.push(`${p} | ${q.id} | 1st choice (${qsnip})`, `${p} | ${q.id} | 2nd choice (${qsnip})`)
    }
  }
  return h
}

function buildReadablePeopleCsvRow (person: Person): string[] {
  const doc = buildPersonQuizResultDocument(person)
  const cells: string[] = [
    doc.exportedAt,
    doc.completedAt ?? '',
    doc.company ?? '',
    doc.team ?? '',
    doc.name,
    doc.personId,
    doc.role ?? '',
    doc.tags.join('; '),
    answerDataOnFileLabel(person),
    doc.naturalDefault.combinationLabel,
  ]
  for (let i = 0; i < QUIZ_SECTIONS.length; i++) {
    cells.push(doc.sectionSummaries[i]!.combinationLabel)
  }
  cells.push(
    String(doc.naturalDefault.headPercent),
    String(doc.naturalDefault.heartPercent),
    String(doc.naturalDefault.gutPercent)
  )

  for (let i = 0; i < QUIZ_SECTIONS.length; i++) {
    const sum = doc.sectionSummaries[i]!
    const block = doc.sections[i]!
    const sc = block.scores
    cells.push(
      String(sum.headPercent),
      String(sum.heartPercent),
      String(sum.gutPercent),
      String(sc.headPercent),
      String(sc.heartPercent),
      String(sc.gutPercent),
      sc.dominant,
      sc.secondaryBrain ?? ''
    )
    for (const q of block.questions) {
      cells.push(q.answer.firstChoice ?? '', q.answer.secondChoice ?? '')
    }
  }
  return cells.map((c) => csvEscape(String(c)))
}

/** All selected people as rows, sorted by company then team then name. Same data as individual JSON, organized for spreadsheets. */
export function buildPeopleCsv (people: Person[]): string {
  const header = buildReadablePeopleCsvHeaders()
  const sorted = [...people].sort((a, b) => {
    const ca = (a.company ?? 'Uncategorized').localeCompare(b.company ?? 'Uncategorized')
    if (ca !== 0) return ca
    const ta = (a.team ?? '').localeCompare(b.team ?? '')
    if (ta !== 0) return ta
    return a.name.localeCompare(b.name)
  })
  const rows = sorted.map((p) => buildReadablePeopleCsvRow(p).join(','))
  const body = [header.map((h) => csvEscape(h)).join(','), ...rows].join('\r\n')
  // UTF-8 BOM so Excel keeps readable headers and special characters
  return `\uFEFF${body}`
}

function personPdfBlob (person: Person): Blob {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const line = (y: number, text: string, size = 11) => {
    doc.setFontSize(size)
    doc.text(text, 14, y)
  }
  let y = 20
  doc.setFontSize(18)
  doc.text('HHG Quiz Results', 14, y)
  y += 12
  line(y, `Name: ${person.name}`)
  y += 7
  if (person.quizCompletedAt) {
    line(y, `Quiz completed: ${new Date(person.quizCompletedAt).toLocaleString()}`)
    y += 7
  }
  line(y, `ID: ${person.id}`)
  y += 7
  if (person.company) {
    line(y, `Company: ${person.company}`)
    y += 7
  }
  if (person.team) {
    line(y, `Team: ${person.team}`)
    y += 7
  }
  if (person.role) {
    line(y, `Role: ${person.role}`)
    y += 7
  }
  if (person.tags.length) {
    line(y, `Tags: ${person.tags.join(', ')}`)
    y += 7
  }
  y += 4
  line(y, 'Overall profile', 14)
  y += 8
  line(y, `Head ${person.headPercent.toFixed(1)}% · Heart ${person.heartPercent.toFixed(1)}% · Gut ${person.gutPercent.toFixed(1)}%`)
  y += 7
  line(y, `Dominant: ${person.dominant}${person.secondaryBrain ? ` · Secondary: ${person.secondaryBrain}` : ''}`)
  y += 10
  const ctx = person.contextScores
  if (ctx) {
    line(y, 'Contexts', 14)
    y += 8
    const labels: Record<string, string> = {
      underPressure: 'Under pressure',
      doingWork: 'Doing work',
      withPeople: 'With people',
      gettingBetter: 'Getting better',
    }
    for (const [k, label] of Object.entries(labels)) {
      const s = ctx[k as keyof typeof ctx]
      if (s && 'headPercent' in s) {
        line(y, `${label}: Head ${s.headPercent.toFixed(1)}% · Heart ${s.heartPercent.toFixed(1)}% · Gut ${s.gutPercent.toFixed(1)}%`)
        y += 6
        if (y > 270) {
          doc.addPage()
          y = 20
        }
      }
    }
  }
  doc.setFontSize(9)
  doc.setTextColor(100)
  doc.text(`Generated ${new Date().toISOString().slice(0, 10)} · Teams Library`, 14, 287)
  return doc.output('blob')
}

export type ExportProgressFn = (percent: number) => void

const yieldToMain = (): Promise<void> =>
  new Promise((r) => {
    requestAnimationFrame(() => r())
  })

export async function zipIndividualJsonExports (
  people: Person[],
  onProgress?: ExportProgressFn
): Promise<Blob> {
  const zip = new JSZip()
  const n = people.length
  for (let i = 0; i < n; i++) {
    const p = people[i]!
    const doc = buildPersonQuizResultDocument(p)
    const company = sanitizePathPart(p.company ?? 'Uncategorized')
    const team = sanitizePathPart(p.team ?? 'Other')
    const path = `${company}/${team}/${zipExportPersonFileName(p, 'json')}`
    zip.file(path, JSON.stringify(doc, null, 2))
    onProgress?.(Math.round(((i + 1) / n) * 80))
    await yieldToMain()
  }
  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' }, (meta) => {
    if (meta.percent != null) onProgress?.(80 + Math.round(meta.percent * 0.2))
  })
}

export async function zipIndividualPdfExports (
  people: Person[],
  onProgress?: ExportProgressFn
): Promise<Blob> {
  const zip = new JSZip()
  const n = people.length
  for (let i = 0; i < n; i++) {
    const p = people[i]!
    const company = sanitizePathPart(p.company ?? 'Uncategorized')
    const team = sanitizePathPart(p.team ?? 'Other')
    const path = `${company}/${team}/${zipExportPersonFileName(p, 'pdf')}`
    const blob = personPdfBlob(p)
    const buf = await blob.arrayBuffer()
    zip.file(path, buf)
    onProgress?.(Math.round(((i + 1) / n) * 80))
    await yieldToMain()
  }
  return zip.generateAsync({ type: 'blob', compression: 'DEFLATE' }, (meta) => {
    if (meta.percent != null) onProgress?.(80 + Math.round(meta.percent * 0.2))
  })
}

export function estimateJsonLibraryBytes (people: Person[]): number {
  return byteLengthUtf8(buildPeopleLibraryJson(people))
}

export function estimateCsvBytes (people: Person[]): number {
  return byteLengthUtf8(buildPeopleCsv(people))
}

export function estimateZipJsonBytes (people: Person[]): number {
  let sum = 0
  for (const p of people) {
    sum += byteLengthUtf8(JSON.stringify(buildPersonQuizResultDocument(p), null, 2))
  }
  return Math.round(sum * 1.12)
}

export function estimateZipPdfBytes (people: Person[]): number {
  return Math.max(8000 * people.length, estimateZipJsonBytes(people) * 2)
}

export function triggerDownload (blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
