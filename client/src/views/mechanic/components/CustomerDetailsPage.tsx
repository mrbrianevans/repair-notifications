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
            <div className={'paragraph-row'}>
              <p>
                {props.customer.car.colour} {props.customer.car.brand}{' '}
                {props.customer.car.model}
              </p>
              <p> | </p>
              <p>License plate: {props.customer.car.licensePlate}</p>
            </div>
          </div>
          <div>
            <h3>Send notification</h3>
            <div>
              <input
                className={'send-message-box'}
                value={notificationMessage}
                placeholder={'Type a message...'}
                onChange={(v) => setNotificationMessage(v.target.value)}
                list={'prewritten-messages'}
              />
              <datalist id={'prewritten-messages'}>
                <option>Your car is finished, and ready to be collected</option>
                <option>Approximately 2 hours until we finish</option>
                <option>There has been a problem, please call me</option>
                <option>An additional part is required for the repair</option>
                <option>
                  We have been delayed, the repair will take longer than
                  expected
                </option>
              </datalist>
            </div>
            <button
              onClick={sendNotification}
              className={'send-message-button'}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  )
}
