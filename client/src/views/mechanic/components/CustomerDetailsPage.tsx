import React from 'react'
import { ICustomer } from '../../../types/ICustomer'
import '../styles/CustomerDetailsPage.scss'

export const CustomerDetailsPage: (props: {
  customer: ICustomer | 'new'
  escape: () => void
}) => JSX.Element = (props) => {
  return (
    <div className={'customer-details-page'}>
      <button onClick={props.escape}>Escape</button>
      {props.customer == 'new' ? (
        <>
          <p>You are creating a new customer</p>
          <input type={'text'} />
        </>
      ) : (
        <p>Viewing {props.customer.name} in detail</p>
      )}
    </div>
  )
}
