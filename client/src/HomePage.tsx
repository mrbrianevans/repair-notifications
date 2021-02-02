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
            <h1 className={'big-link'}>
              <span>notify.repair</span>
            </h1>
            <div className={'view-options-container'}>
              <div>
                <Link to={'/customer'}>
                  <p>View customer side</p>
                </Link>
                <CustomerView numberOfPhones={1} />
              </div>
              <div>
                <Link to={'/splitscreen'}>
                  <p>Fullscreen</p>
                </Link>
              </div>
              <div>
                <Link to={'/mechanic'}>
                  <p>View mechanic side</p>
                </Link>
                <MechanicView />
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
