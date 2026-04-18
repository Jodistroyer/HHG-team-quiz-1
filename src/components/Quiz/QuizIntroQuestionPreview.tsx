import { useState } from 'react'
import './QuizIntroQuestionPreview.css'
import { QUIZ_SECTIONS } from './quizSections'
import type { QuizAnswerType } from './quizSections'

const PREVIEW_QUESTION = QUIZ_SECTIONS[0].questions[0]

const TYPE_COLORS: Record<QuizAnswerType, string> = {
  Head: '#1368ce',
  Heart: '#e21b3c',
  Gut: '#26890c',
}

function getDarkerColor (hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgb(${Math.max(0, Math.floor(r * 0.7))}, ${Math.max(0, Math.floor(g * 0.7))}, ${Math.max(0, Math.floor(b * 0.7))})`
}

function formatOptionText (text: string): string[] {
  return text.split('•').map((p) => p.trim()).filter((p) => p.length > 0)
}

function optionByType (type: QuizAnswerType) {
  return PREVIEW_QUESTION.options.find((o) => o.type === type)
}

/**
 * Replica of the real quiz question UI (Under Pressure Q1). Desktop: scaled 800px
 * board. Viewport ≤768px: same 2×2 option layout as the live quiz (Quiz.css).
 * Choice buttons mirror primary / secondary selection locally; nothing is saved.
 */
export function QuizIntroQuestionPreview () {
  const [firstChoice, setFirstChoice] = useState<QuizAnswerType | null>(null)
  const [secondChoice, setSecondChoice] = useState<QuizAnswerType | null>(null)

  const head = optionByType('Head')
  const heart = optionByType('Heart')
  const gut = optionByType('Gut')

  const handleOptionClick = (type: QuizAnswerType) => {
    if (!firstChoice) {
      setFirstChoice(type)
      setSecondChoice(null)
      return
    }
    if (firstChoice !== type && !secondChoice) {
      setSecondChoice(type)
      return
    }
    if (firstChoice === type) {
      setFirstChoice(null)
      setSecondChoice(null)
      return
    }
    if (secondChoice === type) {
      setSecondChoice(null)
    }
  }

  const cell = (type: QuizAnswerType, option: { label: string; type: QuizAnswerType } | undefined, gridClass: string) => {
    if (!option) return null
    const bg = TYPE_COLORS[type]
    const primary = firstChoice === type
    const secondary = secondChoice === type
    const selClass = primary ? ' selected primary' : secondary ? ' selected secondary' : ''
    return (
      <button
        key={type}
        type="button"
        className={`qip-grid-option ${gridClass}${selClass}`}
        style={{
          backgroundColor: bg,
          borderColor: bg,
          borderBottom: `4px solid ${getDarkerColor(bg)}`,
        }}
        onClick={() => handleOptionClick(type)}
        aria-pressed={primary || secondary}
        aria-label={
          primary
            ? `Preview: ${type}, first choice (${option.label})`
            : secondary
              ? `Preview: ${type}, second choice (${option.label})`
              : `Preview: ${type} (${option.label})`
        }
      >
        <div className="qip-option-text">
          {formatOptionText(option.label).map((line, idx) => (
            <div key={idx} className="qip-option-line">
              {line}
            </div>
          ))}
        </div>
        {primary && <span className="qip-selection-marker">1</span>}
        {secondary && <span className="qip-selection-marker">2</span>}
      </button>
    )
  }

  return (
    <div
      className="quiz-intro-question-preview"
      role="region"
      aria-label="Sample Under Pressure question. Try choosing one or two answers; nothing is saved."
    >
      <div className="quiz-intro-question-preview__viewport">
        <p className="quiz-intro-question-preview__header">Click the Preview here. Try It Out!</p>
        <div className="quiz-intro-question-preview__board-wrap">
          <div className="quiz-intro-question-preview__board-slot">
            <div className="quiz-intro-question-preview__board">
              <h2 className="qip-question-text">
                <span className="qip-question-text-inner">{PREVIEW_QUESTION.text}</span>
              </h2>
              <p className="qip-quiz-instructions">Choose 1 or 2 choices.</p>
              <div className="qip-options-grid">
                {cell('Head', head, 'qip-grid-option-top-left')}
                {cell('Heart', heart, 'qip-grid-option-top-right')}
                {cell('Gut', gut, 'qip-grid-option-bottom-left')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
