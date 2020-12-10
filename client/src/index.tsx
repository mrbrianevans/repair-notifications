import * as React from 'react'
import ReactDOM from 'react-dom'
import { HomePage } from './HomePage'
// @ts-ignore
import firebase from 'firebase/app'
import 'firebase/analytics'
import { firebaseConfig } from './firebaseConfig'

const rootElement = document.createElement('div')
document.querySelector('body').appendChild(rootElement)

const initialiseFirebaseApp = () => {
  const startInitialiseTime = new Date()
  firebase.initializeApp(firebaseConfig)
  firebase.analytics()
  console.log(
    'App initialised in ' +
      (new Date().valueOf() - startInitialiseTime.valueOf()) +
      'ms'
  )
}

if (firebase.apps.length === 0) initialiseFirebaseApp()

ReactDOM.render(<HomePage />, rootElement)
