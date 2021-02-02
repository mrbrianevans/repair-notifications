import React, { useState } from 'react'
import { ICustomer } from '../../../types/ICustomer'
import '../styles/CustomerDetailsPage.scss'
import { NewCustomerForm } from './NewCustomerForm'
import firebase from 'firebase/app'
import 'firebase/database'

export const CustomerDetailsPage: (props: {
  customer: ICustomer | 'new'
  escape: () => void
}) => JSX.Element = (props) => {
  const [notificationMessage, setNotificationMessage] = useState('')
  const sendNotification = () => {
    if (props.customer !== 'new')
      firebase
        .database()
        .ref('customers')
        .child(props.customer.key)
        .child('notifications')
        .child(String(Date.now()))
        .set(notificationMessage)
        .then((r) => console.log(r))
    console.log('Save to firebase: ', notificationMessage)
  }
  return (
    <div className={'customer-details-page'}>
      <button onClick={props.escape}>Escape</button>
      {props.customer == 'new' ? (
        <NewCustomerForm escape={props.escape} />
      ) : (
        <>
          <h2>Viewing {props.customer.name}</h2>
          <div>
            <h3>Car:</h3>
            <p>
              {props.customer.car.colour} {props.customer.car.brand}{' '}
              {props.customer.car.model}
            </p>
            <p>License plate: {props.customer.car.licensePlate}</p>
          </div>
          <div>
            <h3>Send notification</h3>
            <div>
              <input
                type={'textarea'}
                placeholder={'Type a message...'}
                onChange={(v) => setNotificationMessage(v.target.value)}
              />
            </div>
            <button onClick={sendNotification}>Send</button>
          </div>
        </>
      )}
    </div>
  )
}
