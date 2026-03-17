import { PeoplePanel } from './PeoplePanel/PeoplePanel'
import './Teams.css'

function Teams() {
  return (
    <div className="teams">
      <aside className="teams__panel">
        <PeoplePanel />
      </aside>
      <main className="teams__main">
        <h1>Teams</h1>
        <p className="teams__intro">
          Use the People panel on the left to organize and select people. Finished quizzes can be
          imported via &quot;Import JSON&quot; or add people manually. Selected people feed into the
          interaction map and team analysis.
        </p>
      </main>
    </div>
  )
}

export default Teams
