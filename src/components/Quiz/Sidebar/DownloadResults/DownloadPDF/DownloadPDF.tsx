import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import '../DownloadResults.css'
import './DownloadPDF.css'
import { ExportNameModal } from './ExportNameModal'

interface DownloadPDFProps {
  /** Ref to the container that holds all elements with data-pdf-section (e.g. .final-summary) */
  containerRef: React.RefObject<HTMLDivElement | null>
  quizCompletedAt: string | null
  /** On mobile show only icon + "PDF" (no "Download" word) */
  iconOnly?: boolean
  onDownloadStart?: () => void
  onDownloadDone?: () => void
}

function fileStampForDownload (iso: string): string {
  return iso.replace(/[:.]/g, '-')
}

const PDF_PAGE_WIDTH_MM = 210
const PDF_PAGE_HEIGHT_MM = 297
const PDF_CONTENT_WIDTH_PX = 800

const PDF_EXPORT_CSS = `
.pdf-export-view{box-sizing:border-box;overflow:visible;width:800px!important;min-width:800px!important;max-width:800px!important}
.pdf-export-view .recommended-flows{display:none!important}
.pdf-export-view>*{width:100%!important;min-width:800px!important;max-width:800px!important;box-sizing:border-box}
.pdf-export-view *{box-sizing:border-box;word-wrap:break-word;overflow-wrap:break-word}
.pdf-export-view .quiz-results-page__main-title{color:#7d3dbd!important}
.pdf-export-view .profile-table__toggle{display:none!important}
.pdf-export-view .profile-table-row--extra{display:table-row!important}
.pdf-export-view .quiz-intro-card__media,.pdf-export-view .quiz-context-thumb,.pdf-export-view .section-card-art,.pdf-export-view .change-results-row-art{display:flex!important;align-items:center!important;justify-content:center!important}
.pdf-export-view .quiz-intro-card__svg{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important}
.pdf-export-view .section-archetype-block::before{display:none!important}
.pdf-export-view .section-archetype-block{overflow:visible!important}
.pdf-export-view .section-archetype-name,.pdf-export-view .section-archetype-description,.pdf-export-view .section-archetype-quote{position:static!important;display:block!important;overflow:visible!important}
.pdf-export-view .section-card-context{color:rgba(255,255,255,0.88)!important;font-family:'Montserrat',sans-serif!important;font-size:0.9375rem!important;font-weight:500!important;line-height:1.6!important;max-width:52ch!important;margin:0!important;padding:0!important;letter-spacing:0.01em!important}
.pdf-export-view table{table-layout:fixed;width:100%}
.pdf-export-view th,.pdf-export-view td{word-wrap:break-word;overflow-wrap:break-word;white-space:normal!important;overflow:visible}
.pdf-export-view .section-archetype-name{font-size:1.25rem !important}
.pdf-export-view .section-archetype-description,.pdf-export-view .section-archetype-quote{font-size:1rem !important}
.pdf-export-view .pressure-profile-table thead,.pdf-export-view .work-style-table thead,.pdf-export-view .social-map-table thead,.pdf-export-view .feedback-style-table thead{display:table-header-group !important}
.pdf-export-view .pressure-profile-table tbody tr,.pdf-export-view .work-style-table tbody tr,.pdf-export-view .social-map-table tbody tr,.pdf-export-view .feedback-style-table tbody tr{display:table-row !important}
.pdf-export-view .pressure-profile-table tbody th,.pdf-export-view .work-style-table tbody th,.pdf-export-view .social-map-table tbody th,.pdf-export-view .feedback-style-table tbody th{display:table-cell !important;width:11em !important;min-width:0!important;padding:0.65rem 1rem !important;font-size:0.85rem !important;color:#64748b !important;word-wrap:break-word;overflow-wrap:break-word}
.pdf-export-view .pressure-profile-table tbody td,.pdf-export-view .work-style-table tbody td,.pdf-export-view .social-map-table tbody td,.pdf-export-view .feedback-style-table tbody td{display:table-cell !important;padding:0.65rem 1rem !important;font-size:0.95rem !important;min-width:0!important;word-wrap:break-word;overflow-wrap:break-word}
.pdf-export-view .pressure-profile-title,.pdf-export-view .work-style-title,.pdf-export-view .social-map-title,.pdf-export-view .feedback-style-title{position:static!important;display:block!important}
.pdf-export-view .bento-grid{grid-template-columns:1fr 1.3fr !important;min-width:0}
.pdf-export-view .overall-archetype-name{font-size:1.75rem !important}
.pdf-export-view .overall-archetype-description,.pdf-export-view .overall-archetype-quote{font-size:0.95rem !important}
.pdf-export-view .overall-brain-badge,.pdf-export-view .overall-icon-badge{font-size:1.5rem !important;padding:1.25rem 2rem !important;white-space:normal!important}
/* Charts: fixed size in PDF for consistent capture */
.pdf-export-view .radar-chart-container{width:360px!important;min-width:360px!important;max-width:360px!important;height:360px!important;min-height:360px!important;max-height:360px!important;overflow:visible!important;padding:0!important;margin-left:auto!important;margin-right:auto!important}
.pdf-export-view .all-radars-card-title{font-weight:700!important}
.pdf-export-view .all-radars-card-title__icon,.pdf-export-view .all-radars-card-title__text{color:var(--section-context-color,#7d3dbd)!important;font-weight:700!important}
.pdf-export-view .all-radars-card,.pdf-export-view .all-radars-card-overall{overflow:visible!important;padding:12px!important}
.pdf-export-view .all-radars-grid-sections{gap:16px!important}
.pdf-export-view .all-radars-card-chart,.pdf-export-view .all-radars-card-overall .all-radars-card-chart{width:340px!important;min-width:340px!important;max-width:340px!important;height:340px!important;min-height:340px!important;max-height:340px!important;overflow:visible!important;margin-left:auto!important;margin-right:auto!important}
.pdf-export-view .radar-chart,.pdf-export-view .radar-chart-labels{overflow:visible!important}
.pdf-export-view .radar-chart{width:360px!important;min-width:360px!important;max-width:360px!important;height:360px!important;min-height:360px!important;max-height:360px!important}
.pdf-export-view .radar-chart svg{width:360px!important;height:360px!important;min-width:360px!important;min-height:360px!important;max-width:360px!important;max-height:360px!important}
.pdf-export-view .all-radars-grid-sections{grid-template-columns:repeat(2,1fr)!important}
.pdf-export-view .radar-chart-label{font-size:12px!important;text-align:center!important;align-items:center!important;max-width:none!important;overflow:visible!important;contain:none!important}
.pdf-export-view .radar-chart-label-name,.pdf-export-view .radar-chart-label-value{text-align:center!important}
.pdf-export-view .radar-chart-label-name{font-size:12px!important}
.pdf-export-view .radar-chart-label-value{font-size:14px!important}
.pdf-export-view .radar-chart-label-head{top:25%!important;left:61%!important;right:auto!important;bottom:auto!important;transform:translate(-50%,-50%)!important}
.pdf-export-view .radar-chart-label-heart{top:96%!important;left:30%!important;right:auto!important;bottom:auto!important;transform:translate(-50%,-50%)!important}
.pdf-export-view .radar-chart-label-gut{top:96%!important;left:92%!important;right:auto!important;bottom:auto!important;transform:translate(-50%,-50%)!important}
.pdf-export-view .radar-chart-icon-wrap{width:48px!important;height:48px!important;min-width:48px!important;min-height:48px!important;overflow:visible!important;contain:none!important;flex-shrink:0!important;transform:scale(0.5)!important;transform-origin:center center!important;margin-bottom:0!important;margin-left:1px!important}
.pdf-export-view .radar-chart-label .radar-chart-label-icon{display:block!important;overflow:visible!important;contain:none!important;width:48px!important;height:48px!important;min-width:48px!important;min-height:48px!important;max-width:48px!important;max-height:48px!important}
.pdf-export-view .radar-chart-label .radar-chart-label-icon svg{width:48px!important;height:48px!important;min-width:48px!important;min-height:48px!important;max-width:48px!important;max-height:48px!important;overflow:visible!important;display:block!important;contain:none!important}
/* Treemap: PDF must capture HTML cells only (hide/remove SVG — avoids ghost/double layers in html2canvas). */
.pdf-export-view .treemap-chart{cursor:default!important}
.pdf-export-view .treemap-chart__frame{position:relative!important;width:100%!important;aspect-ratio:1/1!important}
.pdf-export-view .treemap-chart__svg{display:none!important;visibility:hidden!important;width:0!important;height:0!important;overflow:hidden!important;pointer-events:none!important}
.pdf-export-view .treemap-chart__pdf{display:block!important;position:absolute!important;inset:0!important;width:100%!important;height:100%!important;border-radius:16px!important;overflow:hidden!important}
.pdf-export-view .treemap-chart__pdf-cell{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;padding:3px!important}
.pdf-export-view .treemap-chart__pdf-stack{gap:6px!important}
.pdf-export-view .treemap-chart__pdf-stack--compact{gap:4px!important}
.pdf-export-view .answer-results-question{min-width:0!important;max-width:100%}
.pdf-export-view .answer-results-choice{min-width:0!important;max-width:100%}
/* Your answers by section: match on-screen AnswerResults (Montserrat) */
.pdf-export-view .answer-results,.pdf-export-view .answer-results-title,.pdf-export-view .answer-results-section,.pdf-export-view .answer-results-section-title,.pdf-export-view .answer-results-section-header,.pdf-export-view .answer-results-table,.pdf-export-view .answer-results-table th,.pdf-export-view .answer-results-table td,.pdf-export-view .answer-results-combo-badge,.pdf-export-view .answer-results-question,.pdf-export-view .answer-results-choice{font-family:'Montserrat',sans-serif!important;-webkit-font-smoothing:antialiased!important}
`

/**
 * Capture one section for PDF with a fixed layout so PC and mobile produce the same output.
 * - windowWidth/windowHeight: clone is laid out at 800px width so @media (max-width: 588px) does not apply.
 * - viewport meta: set to width=800 in clone so layout uses desktop width.
 * - PDF_EXPORT_CSS: every radar (and other) layout value is set with !important so no viewport-dependent rule can change the result.
 */
async function captureSectionForPdf (
  element: HTMLElement,
  options: { scale: number; backgroundColor: string; exportName?: string }
): Promise<HTMLCanvasElement> {
  return html2canvas(element, {
    scale: options.scale,
    useCORS: true,
    logging: false,
    backgroundColor: options.backgroundColor,
    allowTaint: true,
    scrollX: 0,
    scrollY: 0,
    windowWidth: PDF_CONTENT_WIDTH_PX,
    windowHeight: 2400,
    onclone: (clonedDoc, clonedElement) => {
      // Fixed viewport so mobile and PC get identical layout in the PDF
      let viewport = clonedDoc.querySelector('meta[name="viewport"]')
      if (!viewport) {
        viewport = clonedDoc.createElement('meta')
        viewport.setAttribute('name', 'viewport')
        if (clonedDoc.head) clonedDoc.head.insertBefore(viewport, clonedDoc.head.firstChild)
      }
      viewport.setAttribute('content', `width=${PDF_CONTENT_WIDTH_PX}`)

      const style = clonedDoc.createElement('style')
      style.textContent = PDF_EXPORT_CSS
      if (clonedDoc.head) clonedDoc.head.appendChild(style)

      const wrapper = clonedDoc.createElement('div')
      wrapper.className = 'pdf-export-view'
      wrapper.style.cssText = [
        `width: ${PDF_CONTENT_WIDTH_PX}px`,
        `min-width: ${PDF_CONTENT_WIDTH_PX}px`,
        `max-width: ${PDF_CONTENT_WIDTH_PX}px`,
        'box-sizing: border-box',
        'overflow: visible',
      ].join('; ')
      const parent = clonedElement.parentNode
      if (parent) {
        parent.replaceChild(wrapper, clonedElement)
        wrapper.appendChild(clonedElement)
        // Move wrapper to body so no flex/grid ancestor can shrink it (fixes squished text on PC)
        const root = clonedDoc.documentElement
        const body = clonedDoc.body
        root.style.width = `${PDF_CONTENT_WIDTH_PX}px`
        root.style.minWidth = `${PDF_CONTENT_WIDTH_PX}px`
        body.style.width = `${PDF_CONTENT_WIDTH_PX}px`
        body.style.minWidth = `${PDF_CONTENT_WIDTH_PX}px`
        body.style.boxSizing = 'border-box'
        body.style.margin = '0'
        body.style.padding = '0'
        body.appendChild(wrapper)
      }

      // Inject export name into the main title (PDF-only).
      const exportName = options.exportName?.trim()
      if (exportName) {
        const apostrophe = '’'
        const raw = exportName.replace(/\s+/g, ' ').trim()
        const nameMaxChars = 28
        const displayName =
          raw.length <= nameMaxChars
            ? raw
            : nameMaxChars <= 1
              ? '…'
              : `${raw.slice(0, nameMaxChars - 1)}…`

        const isEndsWithS = /s$/i.test(displayName)
        const possessive = isEndsWithS ? `${displayName}${apostrophe}` : `${displayName}${apostrophe}s`
        const newTitle = `${possessive} Profile`

        const titleEl = clonedDoc.querySelector<HTMLElement>('.quiz-results-page__main-title')
        if (titleEl) {
          titleEl.textContent = newTitle
          titleEl.setAttribute('title', newTitle)
        }
      }

      /* Drop treemap SVG from clone entirely — html2canvas still paints foreignObject/text ghosts otherwise */
      clonedDoc.querySelectorAll('.treemap-chart__svg').forEach((svg) => svg.remove())
    },
  })
}

export function DownloadPDF ({ containerRef, quizCompletedAt, iconOnly, onDownloadStart, onDownloadDone }: DownloadPDFProps) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isNameModalOpen, setIsNameModalOpen] = useState(false)
  const [pendingName, setPendingName] = useState('')

  const runDownload = async (exportName: string) => {
    const container = containerRef.current
    if (!container || loading) return

    const sections = container.querySelectorAll<HTMLElement>('[data-pdf-section]')
    if (sections.length === 0) return

    const total = sections.length
    onDownloadStart?.()
    setLoading(true)
    setProgress(0)
    try {
      // Ensure fonts are settled so clone layout is stable (avoids jumbled text on Windows)
      await document.fonts?.ready
      setProgress(5)

      const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
      const pageW = PDF_PAGE_WIDTH_MM
      const pageH = PDF_PAGE_HEIGHT_MM
      const margin = 8
      const contentW = pageW - margin * 2
      const contentH = pageH - margin * 2

      setProgress(10)

      // Pages 1..N: captured sections
      for (let i = 0; i < sections.length; i++) {
        const el = sections[i]
        try {
          const canvas = await captureSectionForPdf(el, {
            scale: 2,
            backgroundColor: '#ffffff',
            exportName,
          })

          const imgW = canvas.width
          const imgH = canvas.height
          const ratio = imgW / imgH

          let drawW = contentW
          let drawH = contentW / ratio
          if (drawH > contentH) {
            drawH = contentH
            drawW = contentH * ratio
          }

          const x = margin + (contentW - drawW) / 2
          const y = margin + (contentH - drawH) / 2

          const imgData = canvas.toDataURL('image/png', 1.0)
          if (i !== 0) pdf.addPage()
          pdf.addImage(imgData, 'PNG', x, y, drawW, drawH, undefined, 'FAST')
        } catch (err) {
          console.warn('PDF section capture failed:', el.getAttribute('data-pdf-section'), err)
        }
        setProgress(10 + Math.round(((i + 1) / total) * 85))
      }

      // Last page: cover / metadata
      pdf.addPage()
      pdf.setFontSize(18)
      pdf.text('Quiz results', margin, 22)
      pdf.setFontSize(11)
      let coverY = 34
      if (quizCompletedAt) {
        pdf.text(
          `Quiz completed: ${new Date(quizCompletedAt).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}`,
          margin,
          coverY
        )
        coverY += 8
      }
      pdf.text(
        `PDF generated: ${new Date().toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}`,
        margin,
        coverY
      )

      const stamp = quizCompletedAt ? fileStampForDownload(quizCompletedAt) : new Date().toISOString().slice(0, 10)
      setProgress(100)
      pdf.save(`quiz-results-${stamp}.pdf`)
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
        onDownloadDone?.()
      }, 350)
    } catch {
      setLoading(false)
      setProgress(0)
    }
  }

  return (
    <div className="download-result-btn-wrap">
      {isNameModalOpen && (
        <ExportNameModal
          initialValue={pendingName}
          onCancel={() => setIsNameModalOpen(false)}
          onConfirm={(name) => {
            setPendingName(name)
            setIsNameModalOpen(false)
            void runDownload(name)
          }}
        />
      )}
      <button
        type="button"
        className={`btn btn-download-pdf ${iconOnly ? 'btn-download-icon-only' : ''} ${loading ? 'is-loading' : ''}`}
        onClick={() => setIsNameModalOpen(true)}
        disabled={loading}
        title="Download PDF"
        aria-label={loading ? 'Preparing PDF…' : 'Download PDF'}
        aria-busy={loading}
      >
        <FontAwesomeIcon
          icon={loading ? faSpinner : faDownload}
          className={`btn-download-icon ${loading ? 'btn-download-spinner' : ''}`}
          aria-hidden
        />
        {iconOnly ? <span>PDF</span> : <span>Download PDF</span>}
      </button>
      {loading && (
        <div
          className="download-result-progress"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="download-result-progress__bar" style={{ width: `${progress}%` }} />
          <span className="download-result-progress__label">{progress}%</span>
        </div>
      )}
    </div>
  )
}
