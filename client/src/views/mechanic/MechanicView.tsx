import React from 'react'
import { MechanicSideBar } from './components/MechanicSideBar'
import { MechanicIPad } from './components/MechanicIPad'
import { MechanicDashboard } from './components/MechanicDashboard'

export const MechanicView: () => JSX.Element = () => {
  return (
    <MechanicIPad>
      <MechanicSideBar />
      <MechanicDashboard />
    </MechanicIPad>
  )
}
