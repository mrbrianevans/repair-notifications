import React, { useState } from 'react'
import { ICustomer } from '../../../types/ICustomer'
import '../styles/CustomerDetailsPage.scss'
import { NewCustomerForm } from './NewCustomerForm'
import firebase from 'firebase/app'
import 'firebase/database'
import { Insignia } from '../../../assets/Insignia'

export const CustomerDetailsPage: (props: {
  customer: ICustomer | 'new'
  escape: () => void
}) => JSX.Element = (props) => {
  const [notificationMessage, setNotificationMessage] = useState<string>()
  const sendNotification = () => {
    if (props.customer !== 'new' && notificationMessage)
      firebase
        .database()
        .ref('customers')
        .child(props.customer.key)
        .child('notifications')
        .child(String(Date.now()))
        .set(notificationMessage)
        .then(() => console.log('Save to firebase: ', notificationMessage))
        .then(() => setNotificationMessage(''))
  }
  return (
    <div className={'customer-details-page'}>
      <button onClick={props.escape}>Back</button>
      {props.customer == 'new' ? (
        <NewCustomerForm escape={props.escape} />
      ) : (
        <>
          <h2>Viewing {props.customer.name}</h2>
          <Insignia colour={props.customer.car.colour} />
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
              <textarea
                value={notificationMessage}
                placeholder={'Type a message...'}
                onChange={(v) =>
                  setNotificationMessage(v.target.value)
                }></textarea>
              <input
                value={notificationMessage}
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
