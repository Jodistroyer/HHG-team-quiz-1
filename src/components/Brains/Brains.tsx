import { getBrainIcons } from '../Quiz/SectionResults/utils.tsx'
import { NaturalDefaultArchetypeParts } from '../Quiz/NaturalDefaultArchetypeParts'
import { OVERALL_ARCHETYPES } from '../Quiz/overallArchetypes'
import '../Quiz/QuizResults.css'
import './Brains.css'

/** Stable display order for the Brains reference page (matches quiz combo labels). */
const ARCHETYPE_COMBO_ORDER = [
  'Head Strong',
  'Head + Gut',
  'Head + Heart',
  'Heart Strong',
  'Heart + Gut',
  'Heart + Head',
  'Gut Strong',
  'Gut + Head',
  'Gut + Heart',
  'Head + Heart + Gut',
] as const

function slugForCombo (comboLabel: string) {
  return comboLabel
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\+/g, 'plus')
}

const Brains = () => {
  return (
    <div className="brains-page">
      <header className="brains-page__header">
        <h1 className="brains-page__title">Brain types</h1>
        <p className="brains-page__intro">
          Reference for all ten natural-default archetypes: combo label, hero copy, vibe and
          challenge art, and question block (same markup as quiz results).
        </p>
        <nav className="brains-page__toc" aria-label="Jump to archetype">
          {ARCHETYPE_COMBO_ORDER.map((comboLabel) => {
            const data = OVERALL_ARCHETYPES[comboLabel]
            return (
              <a key={comboLabel} className="brains-page__toc-link" href={`#${slugForCombo(comboLabel)}`}>
                <span className="brains-page__toc-archetype">{data.archetype}</span>
                <span className="brains-page__toc-combo">{comboLabel}</span>
              </a>
            )
          })}
        </nav>
      </header>

      <div className="brains-page__list">
        {ARCHETYPE_COMBO_ORDER.map((comboLabel) => {
          const data = OVERALL_ARCHETYPES[comboLabel]
          const isLongLabel = comboLabel === 'Head + Heart + Gut'
          return (
            <article
              key={comboLabel}
              id={slugForCombo(comboLabel)}
              className="brains-page__entry bento-grid"
            >
              <div className="brains-page__entry-inner">
                <div className="quiz-results__natural-default-hero">
                  <div className="quiz-results__natural-default-meta">
                    <p className="quiz-results__natural-default-label">{data.archetype}</p>
                    <div className="overall-badges-row quiz-results__natural-default-badges">
                      <div
                        className={`overall-icon-badge ${isLongLabel ? 'long-label' : ''}`}
                        style={{ background: 'transparent' }}
                      >
                        {getBrainIcons(comboLabel, 'large', 'changeResults')}
                      </div>
                    </div>
                  </div>
                  <p className="brains-page__combo-label">{comboLabel}</p>
                  <h2 className="quiz-results__natural-default-title">{data.headline}</h2>
                  <p className="overall-archetype-quote brains-page__quote">{data.quote}</p>
                </div>

                <div className="quiz-results__natural-default-body">
                  <NaturalDefaultArchetypeParts archetypeKey={comboLabel} parts={data.parts} />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Brains
