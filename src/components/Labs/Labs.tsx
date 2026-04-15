import { useState, type ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import BrainPortrait from './BrainPortrait/BrainPortrait'
import Vibes from './Vibes/Vibes'
import InnerSpeech from './InnerSpeech/InnerSpeech'
import './Labs.css'

type LabExperienceId = 'brain-portrait' | 'vibes' | 'inner-speech'

type LabCardConfig = {
  id: LabExperienceId
  emoji: string
  title: string
  description: string
  art: ReactNode
}

function BrainPortraitCardArt () {
  return (
    <svg className="labs-card__svg" viewBox="0 0 320 200" aria-hidden>
      <rect width="320" height="200" fill="#ffffff" />
      <circle cx="108" cy="96" r="56" fill="none" stroke="#7d3dbd" strokeWidth="2.5" opacity="0.85" />
      <circle cx="188" cy="88" r="48" fill="rgba(125, 61, 189, 0.08)" stroke="#7d3dbd" strokeWidth="2" />
      <path d="M200 148 Q 160 168 120 152" fill="none" stroke="#7d3dbd" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <rect x="214" y="62" width="72" height="52" rx="6" fill="none" stroke="#7d3dbd" strokeWidth="2" transform="rotate(12 250 88)" opacity="0.75" />
    </svg>
  )
}

function VibesCardArt () {
  return (
    <svg className="labs-card__svg" viewBox="0 0 320 200" aria-hidden>
      <rect width="320" height="200" fill="#ffffff" />
      <path d="M0 160 L 120 100 L 240 130 L 320 80 L 320 200 L 0 200 Z" fill="rgba(125, 61, 189, 0.06)" stroke="#7d3dbd" strokeWidth="1.75" />
      <path d="M0 180 L 100 120 L 200 150 L 320 95" fill="none" stroke="#7d3dbd" strokeWidth="2" opacity="0.55" />
      <circle cx="200" cy="72" r="8" fill="#7d3dbd" opacity="0.35" />
      <circle cx="248" cy="56" r="5" fill="#7d3dbd" opacity="0.5" />
      <path d="M60 48 L 100 48 L 100 88 L 60 88 Z" fill="none" stroke="#7d3dbd" strokeWidth="2" opacity="0.65" transform="rotate(-8 80 68)" />
    </svg>
  )
}

function InnerSpeechCardArt () {
  return (
    <svg className="labs-card__svg" viewBox="0 0 320 200" aria-hidden>
      <rect width="320" height="200" fill="#ffffff" />
      <path
        d="M48 56 h140 a12 12 0 0 1 12 12 v36 a12 12 0 0 1 -12 12 H92 L 64 148 L 72 116 H48 a12 12 0 0 1 -12 -12 V68 a12 12 0 0 1 12 -12 z"
        fill="rgba(125, 61, 189, 0.07)"
        stroke="#7d3dbd"
        strokeWidth="2"
      />
      <path
        d="M168 88 h112 a10 10 0 0 1 10 10 v32 a10 10 0 0 1 -10 10 h-72 l-28 36 10 -36 h-22 a10 10 0 0 1 -10 -10 v-32 a10 10 0 0 1 10 -10 z"
        fill="none"
        stroke="#7d3dbd"
        strokeWidth="2"
        opacity="0.85"
      />
      <circle cx="118" cy="92" r="4" fill="#7d3dbd" opacity="0.45" />
      <circle cx="136" cy="92" r="4" fill="#7d3dbd" opacity="0.45" />
      <circle cx="154" cy="92" r="4" fill="#7d3dbd" opacity="0.45" />
    </svg>
  )
}

const LAB_CARDS: LabCardConfig[] = [
  {
    id: 'brain-portrait',
    emoji: '🎨',
    title: 'Brain Portrait',
    description:
      'Your mind expressed as a painting of color, shape, and form. It translates your Head, Heart, and Gut into visual patterns showing how you think, feel, and respond as a single image.',
    art: <BrainPortraitCardArt />,
  },
  {
    id: 'vibes',
    emoji: '🌍',
    title: 'Vibes',
    description:
      'A 3D world shaped by your mind. The environment, atmosphere, and motion change based on your cognitive style and you can compare how other minds feel in space.',
    art: <VibesCardArt />,
  },
  {
    id: 'inner-speech',
    emoji: '💬',
    title: 'Inner Speech',
    description:
      'Your internal thoughts made visible as a conversation. See how your Head, Heart, and Gut interact when you make decisions and talk to them directly.',
    art: <InnerSpeechCardArt />,
  },
]

const Labs = () => {
  const [openLab, setOpenLab] = useState<LabExperienceId | null>(null)

  if (openLab) {
    return (
      <div className="labs labs--detail">
        <div className="labs-detail">
          <button
            type="button"
            className="labs-detail__back"
            onClick={() => setOpenLab(null)}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="labs-detail__back-icon" aria-hidden />
            Back to Labs
          </button>
          <div className="labs-detail__body">
            {openLab === 'brain-portrait' && <BrainPortrait />}
            {openLab === 'vibes' && <Vibes />}
            {openLab === 'inner-speech' && <InnerSpeech />}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="labs">
      <header className="labs__header">
        <h1 className="labs__title">Labs</h1>
        <p className="labs__intro">
          Experiments that translate your Head, Heart, and Gut into new formats. Choose a lab to explore.
        </p>
      </header>

      <div className="labs__grid" role="list">
        {LAB_CARDS.map((card) => (
          <article key={card.id} className="labs-card" role="listitem">
            <div className="labs-card__media" aria-hidden>
              {card.art}
            </div>
            <div className="labs-card__body">
              <h2 className="labs-card__title">
                <span className="labs-card__emoji" aria-hidden>
                  {card.emoji}
                </span>{' '}
                {card.title}
              </h2>
              <p className="labs-card__description">{card.description}</p>
              <button
                type="button"
                className="labs-card__play"
                onClick={() => setOpenLab(card.id)}
              >
                <span>Try It Now</span>
                <FontAwesomeIcon icon={faPlay} className="labs-card__play-icon" aria-hidden />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Labs
