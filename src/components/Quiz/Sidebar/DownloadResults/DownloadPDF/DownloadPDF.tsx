import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import '../DownloadResults.css'
import './DownloadPDF.css'

interface DownloadPDFProps {
  /** Ref to the container that holds all elements with data-pdf-section (e.g. .final-summary) */
  containerRef: React.RefObject<HTMLDivElement | null>
  /** On mobile show only icon + "PDF" (no "Download" word) */
  iconOnly?: boolean
}

const PDF_PAGE_WIDTH_MM = 210
const PDF_PAGE_HEIGHT_MM = 297
const PDF_CONTENT_WIDTH_PX = 800

const PDF_EXPORT_CSS = `
.pdf-export-view{box-sizing:border-box;overflow:visible;width:800px!important;min-width:800px!important;max-width:800px!important}
.pdf-export-view>*{width:100%!important;min-width:800px!important;max-width:800px!important;box-sizing:border-box}
.pdf-export-view *{box-sizing:border-box;word-wrap:break-word;overflow-wrap:break-word}
.pdf-export-view .section-archetype-block::before{display:none!important}
.pdf-export-view .section-archetype-block{overflow:visible!important}
.pdf-export-view .section-archetype-name,.pdf-export-view .section-archetype-description,.pdf-export-view .section-archetype-quote{position:static!important;display:block!important;overflow:visible!important}
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
/* Radar: identical size on mobile and PC – fixed width and height in px */
.pdf-export-view .radar-chart-container{width:300px!important;min-width:300px!important;max-width:300px!important;height:314px!important;min-height:314px!important;max-height:314px!important;overflow:visible!important;padding:0!important;margin-left:auto!important;margin-right:auto!important}
.pdf-export-view .all-radars-card,.pdf-export-view .all-radars-card-overall{overflow:visible!important}
.pdf-export-view .all-radars-card-chart,.pdf-export-view .all-radars-card-overall .all-radars-card-chart{width:300px!important;min-width:300px!important;max-width:300px!important;height:314px!important;min-height:314px!important;max-height:314px!important;overflow:visible!important;margin-left:auto!important;margin-right:auto!important}
.pdf-export-view .radar-chart,.pdf-export-view .radar-chart-labels{overflow:visible!important}
.pdf-export-view .radar-chart{width:300px!important;min-width:300px!important;max-width:300px!important;height:314px!important;min-height:314px!important;max-height:314px!important}
.pdf-export-view .radar-chart svg{width:300px!important;height:314px!important;min-width:300px!important;min-height:314px!important;max-width:300px!important;max-height:314px!important}
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
.pdf-export-view .answer-results-question{min-width:0!important;max-width:100%}
.pdf-export-view .answer-results-choice{min-width:0!important;max-width:100%}
/* Your answers by section: use same font as on-screen tables (system UI stack) */
.pdf-export-view .answer-results,.pdf-export-view .answer-results-title,.pdf-export-view .answer-results-section,.pdf-export-view .answer-results-section-title,.pdf-export-view .answer-results-section-header,.pdf-export-view .answer-results-table,.pdf-export-view .answer-results-table th,.pdf-export-view .answer-results-table td,.pdf-export-view .answer-results-combo-badge,.pdf-export-view .answer-results-question,.pdf-export-view .answer-results-choice{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif!important;-webkit-font-smoothing:antialiased!important}
`

/**
 * Capture one section for PDF with a fixed layout so PC and mobile produce the same output.
 * - windowWidth/windowHeight: clone is laid out at 800px width so @media (max-width: 588px) does not apply.
 * - viewport meta: set to width=800 in clone so layout uses desktop width.
 * - PDF_EXPORT_CSS: every radar (and other) layout value is set with !important so no viewport-dependent rule can change the result.
 */
async function captureSectionForPdf (
  element: HTMLElement,
  options: { scale: number; backgroundColor: string }
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
    },
  })
}

export function DownloadPDF ({ containerRef, iconOnly }: DownloadPDFProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    const container = containerRef.current
    if (!container || loading) return

    const sections = container.querySelectorAll<HTMLElement>('[data-pdf-section]')
    if (sections.length === 0) return

    setLoading(true)
    try {
      // Ensure fonts are settled so clone layout is stable (avoids jumbled text on Windows)
      await document.fonts?.ready

      const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageW = PDF_PAGE_WIDTH_MM
    const pageH = PDF_PAGE_HEIGHT_MM
    const margin = 8
    const contentW = pageW - margin * 2
    const contentH = pageH - margin * 2

    for (let i = 0; i < sections.length; i++) {
        const el = sections[i]
        try {
          const canvas = await captureSectionForPdf(el, {
            scale: 2,
            backgroundColor: '#ffffff',
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
          if (i > 0) pdf.addPage()
          pdf.addImage(imgData, 'PNG', x, y, drawW, drawH, undefined, 'FAST')
        } catch (err) {
          console.warn('PDF section capture failed:', el.getAttribute('data-pdf-section'), err)
        }
      }

      pdf.save(`quiz-results-${new Date().toISOString().slice(0, 10)}.pdf`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      className={`btn btn-download-pdf ${iconOnly ? 'btn-download-icon-only' : ''} ${loading ? 'is-loading' : ''}`}
      onClick={handleDownload}
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
  )
}
