import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import './homepage-styles.scss'
import { CustomerView } from './views/customer/CustomerView'
import { MechanicView } from './views/mechanic/MechanicView'
import { SplitScreen } from './views/splitscreen/SplitScreen'

export const HomePage: () => JSX.Element = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path={'/customer'}>
            <CustomerView numberOfPhones={3} />
          </Route>
          <Route path={'/mechanic'}>
            <MechanicView />
          </Route>
          <Route path={'/splitscreen'}>
            <SplitScreen />
          </Route>

          {/* HOMEPAGE */}
          <Route path={'/'}>
            <header>
              <h1 className={'big-link'}>
                <span className={'protocol'}>https:// </span>
                <span>notify.repair</span>
              </h1>
              <div className={'homepage-links-section'}>
                <Link to={'/customer'}>
                  <p>View customer side</p>
                </Link>
                <Link to={'/splitscreen'}>
                  <p>Fullscreen</p>
                </Link>
                <Link to={'/mechanic'}>
                  <p>View mechanic side</p>
                </Link>
              </div>
            </header>
            <div className={'view-options-container'}>
              <div>
                <CustomerView numberOfPhones={1} />
              </div>
              <div>
                <MechanicView />
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
