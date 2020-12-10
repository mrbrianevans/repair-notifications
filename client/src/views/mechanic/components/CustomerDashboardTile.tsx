import React from 'react'
import { ICustomer } from '../../../types/ICustomer'
import '../styles/CustomerDashboardTile.scss'

export const CustomerDashboardTile: (props: {
  customer: ICustomer
  onClick: () => void
}) => JSX.Element = (props) => {
  return (
    <div className={'customer-dashboard-tile'}>
      <p>Name: {props.customer.name}</p>
      <p>[image of car]</p>
      <button onClick={props.onClick}>View</button>
    </div>
  )
}
