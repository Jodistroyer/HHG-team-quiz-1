import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserGroup, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import './TeamMapEmptyIntro.css'

const MODES = [
  {
    icon: faUser,
    countLabel: 'One person',
    title: 'Solo insights',
    body: 'Select a single person from the library to open their full profile: the same Natural Default, context shifts, radars, and answers as the quiz, right here in Teams.',
  },
  {
    icon: faUserGroup,
    countLabel: 'Two people',
    title: 'Pair insights',
    body: 'Select two people to see how they show up together: where they align, where they clash, what each does to the other’s behaviour, and one small experiment to try.',
  },
  {
    icon: faPeopleGroup,
    countLabel: 'Three or more',
    title: 'Team insights',
    body: 'Select three or more people for averaged HHG maps plus culture-focused prompts: unspoken rules, invisible work, what the group is missing, and how it shifts under pressure.',
  },
] as const

export function TeamMapEmptyIntro () {
  return (
    <div className="team-map-empty-intro quiz-results-page">
      <h1 className="title team-map-empty-intro__page-title">Team map</h1>
      <ul className="team-map-empty-intro__row" aria-label="Selection modes">
        {MODES.map((mode) => (
          <li key={mode.title} className="team-map-empty-intro__card">
            <div className="team-map-empty-intro__icon-wrap" aria-hidden>
              <FontAwesomeIcon icon={mode.icon} className="team-map-empty-intro__icon" />
            </div>
            <p className="team-map-empty-intro__count">{mode.countLabel}</p>
            <h2 className="team-map-empty-intro__title">{mode.title}</h2>
            <p className="team-map-empty-intro__body">{mode.body}</p>
          </li>
        ))}
      </ul>
      <p className="team-map-empty-intro__subtitle">
        Choose people from the library on the left. What you see here depends on how many are selected.
      </p>
    </div>
  )
}
