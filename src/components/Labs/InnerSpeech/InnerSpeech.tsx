import './InnerSpeech.css'

const InnerSpeech = () => {
  return (
    <article className="labs-experience">
      <header className="labs-experience__header">
        <h1 className="labs-experience__title">
          <span className="labs-experience__emoji" aria-hidden>
            💬
          </span>{' '}
          Inner Speech
        </h1>
        <p className="labs-experience__lead">
          Your internal thoughts made visible as a conversation. See how your Head, Heart, and Gut interact when
          you make decisions and talk to them directly.
        </p>
      </header>
      <div className="labs-experience__stage" aria-hidden>
        <div className="labs-experience__stage-inner inner-speech-preview">
          <div className="inner-speech-preview__bubble inner-speech-preview__bubble--one" />
          <div className="inner-speech-preview__bubble inner-speech-preview__bubble--two" />
        </div>
      </div>
      <p className="labs-experience__note">Experience preview — full interaction coming soon.</p>
    </article>
  )
}

export default InnerSpeech
