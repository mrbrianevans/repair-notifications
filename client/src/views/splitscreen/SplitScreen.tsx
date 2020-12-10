import { CustomerView } from '../customer/CustomerView'
import { MechanicView } from '../mechanic/MechanicView'
import React from 'react'
import './splitscreen-container.scss'

export const SplitScreen: () => JSX.Element = () => {
  // show customer and mechanic views side by side
  return (
    <div className={'splitscreen-container'}>
      <div className={'splitscreen-element'}>
        <CustomerView numberOfPhones={1} />
      </div>
      <div className={'splitscreen-element'}>
        <MechanicView />
      </div>
    </div>
  )
}
