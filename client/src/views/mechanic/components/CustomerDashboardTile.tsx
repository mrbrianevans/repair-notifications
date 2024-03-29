import React from 'react'
import { ICustomer } from '../../../types/ICustomer'
import '../styles/CustomerDashboardTile.scss'
import { Insignia } from '../../../assets/Insignia'

export const CustomerDashboardTile: (props: {
  customer: ICustomer
  onClick: () => void
}) => JSX.Element = (props) => {
  return (
    <div className={'customer-dashboard-tile'} onClick={props.onClick}>
      <p>{props.customer.name}</p>
      <Insignia colour={props.customer.car.colour} />
    </div>
  )
}
