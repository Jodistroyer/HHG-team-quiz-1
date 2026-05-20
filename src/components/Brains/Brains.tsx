import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  getBrainColorsFromComboLabel,
  getBrainIcons,
  getComboAccentGradient
} from '../Quiz/SectionResults/utils.tsx'
import '../Quiz/SectionResults/SectionCard.css'
import { NaturalDefaultArchetypeParts } from '../Quiz/NaturalDefaultArchetypeParts'
import { NaturalDefaultArchetypePartArt } from '../Quiz/naturalDefaultArchetypeArt'
import { OVERALL_ARCHETYPES } from '../Quiz/overallArchetypes'
import { useFlowsQuizSnapshot } from '../Flows/flowsQuizSnapshot'
import '../Flows/FlowsPages/FlowsHome/FlowsHome.css'
import '../Quiz/NaturalDefaultArchetypeParts.css'
import '../Quiz/QuizResults.css'
import './Brains.css'

const BRAIN_AXES = ['Head', 'Heart', 'Gut'] as const
type BrainAxis = (typeof BRAIN_AXES)[number]

/**
 * TOC matrix: columns Head · Heart · Gut; rows Head · Heart · Gut (+ Sovereign row).
 */
const BRAINS_TOC_ROWS = [
  ['Head Strong', 'Heart Strong', 'Gut Strong'],
  ['Head + Heart', 'Heart + Head', 'Gut + Heart'],
  ['Head + Gut', 'Heart + Gut', 'Gut + Head'],
  [null, 'Head + Heart + Gut', null],
] as const

type ComboLabel = Exclude<(typeof BRAINS_TOC_ROWS)[number][number], null>

const AXIS_COMBO_LABEL: Record<BrainAxis, ComboLabel> = {
  Head: 'Head Strong',
  Heart: 'Heart Strong',
  Gut: 'Gut Strong',
}

function TocAxisIcon ({ brain }: { brain: BrainAxis }) {
  return (
    <span className="brains-page__toc-axis" aria-hidden>
      {getBrainIcons(AXIS_COMBO_LABEL[brain], 'small', 'changeResults')}
    </span>
  )
}

function slugForCombo (comboLabel: string) {
  return comboLabel
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\+/g, 'plus')
}

function comboBadgeStyle (comboLabel: string): CSSProperties {
  const colors = getBrainColorsFromComboLabel(comboLabel, 'muted')
  if (colors.length === 1) return { background: colors[0] }
  const gradient = getComboAccentGradient(colors)
  return { background: gradient ?? colors[0] }
}

function BrainsQuizCta ({ onTakeQuiz }: { onTakeQuiz?: () => void }) {
  const quizSnap = useFlowsQuizSnapshot()
  if (quizSnap.hasCompletedQuiz || !onTakeQuiz) return null

  return (
    <section className="flows-home__start-card brains-page__quiz-cta" aria-label="Take the quiz">
      <p className="flows-home__start-eyebrow">Start here</p>
      <h2 className="flows-home__start-title">Find out which brain type you are</h2>
      <p className="flows-home__start-body">
        Take the short HHG quiz to discover your decision style, natural brain type and how you show up
        across contexts.
      </p>
      <button type="button" className="flows-home__start-cta" onClick={onTakeQuiz}>
        Take the quiz
      </button>
    </section>
  )
}

function ArchetypeEntry ({
  comboLabel,
  onTakeQuiz,
}: {
  comboLabel: ComboLabel
  onTakeQuiz?: () => void
}) {
  const data = OVERALL_ARCHETYPES[comboLabel]
  const isLongLabel = comboLabel === 'Head + Heart + Gut'

  return (
    <article
      id={slugForCombo(comboLabel)}
      className="brains-page__entry bento-grid"
    >
      <div className="brains-page__entry-inner">
        <div className="quiz-results__natural-default-hero">
          <div className="quiz-results__natural-default-meta">
            <p className="quiz-results__natural-default-label">{data.archetype}</p>
            <div className="brains-page__meta-end">
              <span className="brain-combo-badge" style={comboBadgeStyle(comboLabel)}>
                {comboLabel}
              </span>
              <div className="overall-badges-row quiz-results__natural-default-badges">
                <div
                  className={`overall-icon-badge ${isLongLabel ? 'long-label' : ''}`}
                  style={{ background: 'transparent' }}
                >
                  {getBrainIcons(comboLabel, 'large', 'changeResults')}
                </div>
              </div>
            </div>
          </div>
          <h2 className="quiz-results__natural-default-title">{data.headline}</h2>
        </div>

        <div className="quiz-results__natural-default-body">
          <NaturalDefaultArchetypeParts archetypeKey={comboLabel} parts={data.parts} />
          <BrainsQuizCta onTakeQuiz={onTakeQuiz} />
        </div>
      </div>
    </article>
  )
}

interface BrainsProps {
  onTakeQuiz?: () => void
}

const Brains = ({ onTakeQuiz }: BrainsProps) => {
  const [selectedCombo, setSelectedCombo] = useState<ComboLabel | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedCombo])

  if (selectedCombo != null) {
    return (
      <div className="brains-page brains-page--detail">
        <button
          type="button"
          className="brains-page__back"
          onClick={() => setSelectedCombo(null)}
        >
          ← All brain types
        </button>
        <ArchetypeEntry comboLabel={selectedCombo} onTakeQuiz={onTakeQuiz} />
      </div>
    )
  }

  return (
    <div className="brains-page brains-page--toc">
      <header className="brains-page__header">
        <h1 className="brains-page__title">3 Brain types</h1>
        <p className="brains-page__intro">
          10 Decision Making Archetypes
        </p>
        <nav className="brains-page__toc brains-page__toc-matrix" aria-label="Choose an archetype">
          {BRAIN_AXES.map((brain) => (
            <div
              key={`col-${brain}`}
              className="brains-page__toc-axis-cell brains-page__toc-axis-cell--col"
              aria-label={`${brain} column`}
            >
              <TocAxisIcon brain={brain} />
            </div>
          ))}
          {BRAINS_TOC_ROWS.map((row, rowIndex) =>
            row.map((comboLabel, colIndex) => {
                if (comboLabel === null) {
                  return (
                    <div
                      key={`spacer-${rowIndex}-${colIndex}`}
                      className="brains-page__toc-spacer"
                      aria-hidden
                    />
                  )
                }
                const data = OVERALL_ARCHETYPES[comboLabel]
                return (
                  <button
                    key={comboLabel}
                    type="button"
                    className="brains-page__toc-link"
                    aria-label={`${data.archetype}, ${comboLabel}`}
                    onClick={() => setSelectedCombo(comboLabel)}
                  >
                    <div className="archetype-part__art" aria-hidden>
                      <NaturalDefaultArchetypePartArt archetypeKey={comboLabel} variant="vibe" />
                    </div>
                    <span className="brains-page__toc-archetype">{data.archetype}</span>
                  </button>
                )
            })
          )}
        </nav>
        <BrainsQuizCta onTakeQuiz={onTakeQuiz} />
      </header>
    </div>
  )
}

export default Brains
