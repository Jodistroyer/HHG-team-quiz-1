import './Vibes.css'

const Vibes = () => {
  return (
    <article className="labs-experience">
      <header className="labs-experience__header">
        <h1 className="labs-experience__title">
          <span className="labs-experience__emoji" aria-hidden>
            🌍
          </span>{' '}
          Vibes
        </h1>
        <p className="labs-experience__lead">
          A 3D world shaped by your mind. The environment, atmosphere, and motion change based on your cognitive
          style and you can compare how other minds feel in space.
        </p>
      </header>
      <div className="labs-experience__stage" aria-hidden>
        <div className="labs-experience__stage-inner vibes-preview">
          <span className="vibes-preview__plane vibes-preview__plane--a" />
          <span className="vibes-preview__plane vibes-preview__plane--b" />
          <span className="vibes-preview__mark" />
        </div>
      </div>
      <p className="labs-experience__note">Experience preview — full interaction coming soon.</p>
    </article>
  )
}

export default Vibes
