import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
                <span className={'protocol'}>https:</span>
                {'//'}
                <span>notify.repair</span>
              </h1>
              <p className={'header-description'}>
                This is a prototype of a notification delivery system for car
                mechanics to inform their customers about the status of their
                repair. It was built for the{' '}
                <a href={'http://www.keyloop.co.uk/dealertech/index.html'}>
                  Keyloop Dealertech competition
                </a>{' '}
                by{' '}
                <a href={'https://www.linkedin.com/in/brianevanstech/'}>
                  Brian Evans
                </a>{' '}
                .
              </p>
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
