import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import './homepage-styles.scss'
import { CustomerView } from './views/customer/CustomerView'
import { MechanicView } from './views/mechanic/MechanicView'

export const HomePage: () => JSX.Element = () => {
  return (
    <div>
      <Router>
        <Switch>
          {/* HOMEPAGE */}
          <Route path={'/'}>
            <header>
              <h1 className={'big-link'}>
                <span className={'protocol'}>https:</span>//
                <span>notify.repair</span>
              </h1>
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
