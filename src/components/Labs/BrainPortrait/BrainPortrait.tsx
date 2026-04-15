import './BrainPortrait.css'

const BrainPortrait = () => {
  return (
    <article className="labs-experience">
      <header className="labs-experience__header">
        <h1 className="labs-experience__title">
          <span className="labs-experience__emoji" aria-hidden>
            🎨
          </span>{' '}
          Brain Portrait
        </h1>
        <p className="labs-experience__lead">
          Your mind expressed as a painting of color, shape, and form. It translates your Head, Heart, and Gut
          into visual patterns showing how you think, feel, and respond as a single image.
        </p>
      </header>
      <div className="labs-experience__stage" aria-hidden>
        <div className="labs-experience__stage-inner labs-experience__stage-inner--portrait" />
      </div>
      <p className="labs-experience__note">Experience preview — full interaction coming soon.</p>
    </article>
  )
}

export default BrainPortrait
