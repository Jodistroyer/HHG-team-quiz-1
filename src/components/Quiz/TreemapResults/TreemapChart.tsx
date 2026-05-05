import { useEffect, useMemo, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiamond, faHeart, faSquare } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import './TreemapChart.css'

export interface TreemapChartProps {
  headPercent: number
  heartPercent: number
  gutPercent: number
}

type Key = 'head' | 'heart' | 'gut'
type ViewMode = 'label' | 'percent'

type Block = {
  key: Key
  value: number
  label: string
  color: string
  icon: IconDefinition
}

type Rect = Block & { x: number; y: number; w: number; h: number }

function clamp01 (n: number) {
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(1, n))
}

function normPct (n: number) {
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(100, n))
}

function clamp (n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

/** HHG block colours are hex (e.g. #1368ce); PDF HTML cells need their own fill because SVG is hidden during capture. */
function hexToRgba (hex: string, alpha: number) {
  const h = hex.replace('#', '').trim()
  if (h.length !== 6 || Number.isNaN(Number.parseInt(h, 16))) return hex
  const r = Number.parseInt(h.slice(0, 2), 16)
  const g = Number.parseInt(h.slice(2, 4), 16)
  const b = Number.parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function fitTextFontSize (args: {
  w: number
  h: number
  text: string
  base: number
  min: number
  max: number
}) {
  const { w, h, text, base, min, max } = args
  const safeText = text.trim() || 'X'
  const maxByHeight = h * 0.62
  const estCharWidthEm = 0.56
  const maxByWidth = (w * 0.86) / (safeText.length * estCharWidthEm)
  return clamp(Math.min(base, maxByHeight, maxByWidth), min, max)
}

/** Same geometry as SVG cells (viewBox 0–100): shared by overlays + PDF HTML layer. */
function cellTypography (args: { w: number; h: number; label: string; value: number }) {
  const { w, h, label, value } = args
  const minDim = Math.max(0, Math.min(w, h))
  const pctShort = minDim < 18 ? `${Math.round(value)}%` : `${value.toFixed(1)}%`

  const labelFontSize = (() => {
    const iconEm = 1
    const gapEm = 0.45
    const estCharWidthEm = 0.56
    const estTextWidthEm = Math.max(1, label.length * estCharWidthEm)
    const estWidthEm = iconEm + gapEm + estTextWidthEm
    const base = minDim * 0.22
    const maxByHeight = h * 0.55
    const maxByWidth = (w * 0.88) / estWidthEm
    return clamp(Math.min(base, maxByHeight, maxByWidth), 6.5, 14)
  })()

  const percentFontSize = fitTextFontSize({
    w,
    h,
    text: pctShort,
    base: minDim * 0.26,
    min: 6.5,
    max: 16,
  })

  const forceCompact = minDim < 14 || w < 20 || h < 12
  const iconOnlyFontSize = clamp(minDim * 0.38, 6.5, 14)

  const percentFontSizeTinyOk = fitTextFontSize({
    w,
    h,
    text: pctShort,
    base: minDim * 0.28,
    min: 5,
    max: 16,
  })

  /* PDF HTML layer only (clone capture): larger than on-screen SVG so ~300px chart stays readable */
  // Requested: ~50% larger still.
  const PDF_LABEL_MAX = 54
  const PDF_PERCENT_MAX = 81
  const PDF_COMPACT_MAX = 66

  // PDF full layout: keep the same hierarchy as the user view:
  // - "Icon + title" is the smaller line
  // - Percentage is always larger (unless the box is extremely constrained)
  const pdfFullLabelRowPx = (() => {
    const iconEm = 1
    const gapEm = 0.45
    const estCharWidthEm = 0.56
    const estTextWidthEm = Math.max(1, label.length * estCharWidthEm)
    const estWidthEm = iconEm + gapEm + estTextWidthEm
    const base = minDim * 0.48
    const maxByHeight = h * 0.45
    const maxByWidth = (w * 0.9) / estWidthEm
    return clamp(Math.min(base, maxByHeight, maxByWidth), 18, PDF_LABEL_MAX)
  })()

  const pdfPercentPxFull = (() => {
    // Target: percentage ~1.45× label size, but must still fit.
    const target = pdfFullLabelRowPx * 1.45
    const fitted = fitTextFontSize({
      w,
      h: Math.max(9, h * 0.6),
      text: pctShort,
      base: target,
      min: 21,
      max: PDF_PERCENT_MAX,
    })
    // Enforce hierarchy: percent >= label, but never overflow due to the fitted cap.
    return Math.max(fitted, Math.min(pdfFullLabelRowPx, fitted))
  })()

  const pdfCompactIconPx = clamp(minDim * 0.9, 21, 45)
  const pdfCompactPctPx = (() => {
    const fitted = fitTextFontSize({
      w,
      h,
      text: pctShort,
      base: minDim * 0.75,
      min: 21,
      max: PDF_COMPACT_MAX,
    })
    return fitted
  })()

  return {
    pctShort,
    labelFontSize,
    percentFontSize,
    forceCompact,
    iconOnlyFontSize,
    percentFontSizeTinyOk,
    pdfFullLabelRowPx,
    pdfPercentPxFull,
    pdfCompactIconPx,
    pdfCompactPctPx,
  }
}

function layout (blocks: Block[]) {
  const total = blocks.reduce((sum, b) => sum + b.value, 0)
  const safeTotal = total > 0 ? total : 1
  const sorted = [...blocks].sort((a, b) => b.value - a.value)
  const [a, b, c] = sorted

  const aFrac = clamp01(a.value / safeTotal)
  const bFrac = clamp01(b.value / safeTotal)
  const cFrac = clamp01(c.value / safeTotal)

  const remainder = Math.max(0, 1 - aFrac)
  const remTotal = bFrac + cFrac || 1
  const bInRem = clamp01(bFrac / remTotal)
  const cInRem = clamp01(cFrac / remTotal)

  return [
    { ...a, x: 0, y: 0, w: 1, h: aFrac },
    { ...b, x: 0, y: aFrac, w: bInRem, h: remainder },
    { ...c, x: bInRem, y: aFrac, w: cInRem, h: remainder },
  ]
}

export function TreemapChart ({ headPercent, heartPercent, gutPercent }: TreemapChartProps) {
  const [mode, setMode] = useState<ViewMode>('label')
  const intervalRef = useRef<number | null>(null)
  const AUTO_SWAP_MS = 3200

  useEffect(() => {
    if (intervalRef.current != null) window.clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(() => {
      setMode((m) => (m === 'label' ? 'percent' : 'label'))
    }, AUTO_SWAP_MS)
    return () => {
      if (intervalRef.current != null) window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  function toggleNow () {
    setMode((m) => (m === 'label' ? 'percent' : 'label'))
  }

  const blocks: Block[] = [
    { key: 'head', value: normPct(headPercent), label: 'Head', color: '#1368ce', icon: faDiamond },
    { key: 'heart', value: normPct(heartPercent), label: 'Heart', color: '#e21b3c', icon: faHeart },
    { key: 'gut', value: normPct(gutPercent), label: 'Gut', color: '#26890c', icon: faSquare },
  ]

  const rects = useMemo(() => layout(blocks) as Rect[], [blocks[0].value, blocks[1].value, blocks[2].value])

  const ariaLabel =
    mode === 'label'
      ? 'Label view. Click to show percentages.'
      : `Percentages view. Head ${headPercent.toFixed(1)}%, Heart ${heartPercent.toFixed(1)}%, Gut ${gutPercent.toFixed(1)}%. Click to show labels.`

  return (
    <div
      className={`treemap-chart treemap-chart--${mode}`}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={toggleNow}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleNow()
        }
      }}
    >
      {/* Frame keeps square aspect when SVG is hidden during PDF capture */}
      <div className="treemap-chart__frame">
        <svg className="treemap-chart__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <g className="treemap-chart__svg-bg">
            {rects.map((r) => {
              const x = r.x * 100
              const y = r.y * 100
              const w = r.w * 100
              const h = r.h * 100
              return (
                <rect
                  key={`bg-${r.key}`}
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  fill={r.color}
                  opacity="0.92"
                  rx="4"
                  ry="4"
                />
              )
            })}
          </g>

          <g className="treemap-chart__svg-overlays">
            {rects.map((r) => {
              const x = r.x * 100
              const y = r.y * 100
              const w = r.w * 100
              const h = r.h * 100
              const cx = x + w / 2
              const cy = y + h / 2

              const label = r.label
              const ty = cellTypography({ w, h, label, value: r.value })

              return (
                <g key={r.key}>
                  {ty.forceCompact ? (
                    <>
                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="treemap-chart__text treemap-chart__text--percent treemap-chart__overlay treemap-chart__overlay--percent"
                        fontSize={ty.percentFontSizeTinyOk}
                      >
                        {ty.pctShort}
                      </text>
                      <foreignObject
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        className="treemap-chart__overlay treemap-chart__overlay--label"
                      >
                        <div
                          className="treemap-chart__fo treemap-chart__fo--icon-only"
                          style={{ fontSize: `${ty.iconOnlyFontSize}px` }}
                        >
                          <FontAwesomeIcon icon={r.icon} className="treemap-chart__label-icon" />
                        </div>
                      </foreignObject>
                    </>
                  ) : (
                    <>
                      <foreignObject
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        className="treemap-chart__overlay treemap-chart__overlay--label"
                      >
                        <div
                          className="treemap-chart__fo treemap-chart__fo--label"
                          style={{ fontSize: `${ty.labelFontSize}px` }}
                        >
                          <span className="treemap-chart__label-row">
                            <FontAwesomeIcon icon={r.icon} className="treemap-chart__label-icon" />
                            <span className="treemap-chart__label-text">{label}</span>
                          </span>
                        </div>
                      </foreignObject>

                      <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="treemap-chart__text treemap-chart__text--percent treemap-chart__overlay treemap-chart__overlay--percent"
                        fontSize={ty.percentFontSize}
                      >
                        {ty.pctShort}
                      </text>
                    </>
                  )}
                </g>
              )
            })}
          </g>
        </svg>

        {/*
         * PDF capture: plain HTML only (coloured cells + FA icons + text).
         * html2canvas often rasterizes SVG foreignObject/text incorrectly or twice — so in .pdf-export-view
         * we hide the entire SVG and render this layer alone (see TreemapChart.css + DownloadPDF PDF_EXPORT_CSS).
         */}
        <div className="treemap-chart__pdf" aria-hidden="true">
          {rects.map((r) => {
            const w = r.w * 100
            const h = r.h * 100
            const ty = cellTypography({ w, h, label: r.label, value: r.value })

            return (
              <div
                key={`pdf-${r.key}`}
                className="treemap-chart__pdf-cell"
                style={{
                  left: `${r.x * 100}%`,
                  top: `${r.y * 100}%`,
                  width: `${r.w * 100}%`,
                  height: `${r.h * 100}%`,
                  backgroundColor: hexToRgba(r.color, 0.92),
                }}
              >
                {ty.forceCompact ? (
                  <div
                    className="treemap-chart__pdf-stack treemap-chart__pdf-stack--compact"
                    style={{ fontSize: `${ty.pdfCompactIconPx}px` }}
                  >
                    <FontAwesomeIcon icon={r.icon} className="treemap-chart__pdf-icon" />
                    <span
                      className="treemap-chart__pdf-percent"
                      style={{ fontSize: `${ty.pdfCompactPctPx}px` }}
                    >
                      {ty.pctShort}
                    </span>
                  </div>
                ) : (
                  <div className="treemap-chart__pdf-stack treemap-chart__pdf-stack--full">
                    <span
                      className="treemap-chart__pdf-row"
                      style={{ fontSize: `${ty.pdfFullLabelRowPx}px` }}
                    >
                      <FontAwesomeIcon icon={r.icon} className="treemap-chart__pdf-icon" />
                      <span className="treemap-chart__pdf-name">{r.label}</span>
                    </span>
                    <span
                      className="treemap-chart__pdf-percent"
                      style={{ fontSize: `${ty.pdfPercentPxFull}px` }}
                    >
                      {ty.pctShort}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
