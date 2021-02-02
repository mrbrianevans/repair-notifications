import React from 'react'
import { MechanicIPad } from './components/MechanicIPad'
import { MechanicDashboard } from './components/MechanicDashboard'
import firebase from 'firebase/app'
import 'firebase/auth'

export const MechanicView: () => JSX.Element = () => {
  console.log(firebase.auth().currentUser)
  firebase
    .auth()
    .onAuthStateChanged((u) =>
      console.log('Auth state changed, logged in', u !== null)
    )
  if (firebase.auth().currentUser === null)
    firebase
      .auth()
      .signInAnonymously()
      .then(() =>
        console.log('Signed in anonymously. Admin privileges granted')
      )
  return (
    <MechanicIPad>
      <MechanicDashboard />
    </MechanicIPad>
  )
}
