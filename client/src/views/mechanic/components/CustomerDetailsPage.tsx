import React, { useEffect, useState } from 'react'
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
  const [callRequested, setCallRequested] = useState<boolean>(false)
  const [newPartName, setNewPartName] = useState<string>()
  const [newPartPrice, setNewPartPrice] = useState<number>()
  const [responseMessage, setResponseMessage] = useState<string>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [partsRequested, setPartsRequested] = useState<{
    [key: number]: { name: string; price: number; accepted?: boolean }
  }>({})
  useEffect(() => {
    if (props.customer !== 'new')
      firebase
        .database()
        .ref('customers')
        .child(props.customer.key)
        .child('notifications')
        .get()
        .then((notifications) => {
          console.log(
            'Fetched',
            notifications.numChildren(),
            'notifications from DB'
          )
          notifications.forEach((notificationSnapshot) => {
            if (notificationSnapshot.child('type').val() === 'part-request') {
              setPartsRequested((prevState) => {
                prevState[Number(notificationSnapshot.key)] = {
                  name: notificationSnapshot.child('data').child('name').val(),
                  price: notificationSnapshot
                    .child('data')
                    .child('price')
                    .val(),
                  accepted: notificationSnapshot
                    .child('data')
                    .child('result')
                    .exists()
                    ? notificationSnapshot
                        .child('data')
                        .child('result')
                        .val() === 'accept'
                    : undefined,
                }
                return prevState
              })
            }
          })
        })
  }, [])
  const sendNotification = () => {
    if (props.customer !== 'new' && notificationMessage)
      firebase
        .database()
        .ref('customers')
        .child(props.customer.key)
        .child('notifications')
        .child(String(Date.now()))
        .set({ type: 'message', data: { message: notificationMessage } })
        .then(() => updateResponseMessage('Sent message to customer'))
        .then(() => setNotificationMessage(''))
    else if (props.customer === 'new')
      setErrorMessage('Cannot send notification before creating customer')
    else if (!notificationMessage)
      setErrorMessage("Can't send empty notification")
  }
  const sendCallRequest = () => {
    if (props.customer !== 'new' && !callRequested)
      firebase
        .database()
        .ref('customers')
        .child(props.customer.key)
        .child('notifications')
        .child(String(Date.now()))
        .set({ type: 'call-request' })
        .then(() => updateResponseMessage('Sent call request to customer'))
        .then(() => setCallRequested(true))
        .then(() => setTimeout(() => setCallRequested(false), 5000))
    else if (callRequested)
      setErrorMessage('Already requested the customer to call')
  }
  const sendPartRequest = () => {
    //todo: listen for responses to part requests
    if (props.customer !== 'new' && newPartName && newPartPrice) {
      const partRequest = { name: newPartName, price: newPartPrice }
      const timeOfPartRequest = Date.now()
      setPartsRequested((prevState) => {
        prevState[timeOfPartRequest] = partRequest
        return prevState
      })
      const customerNotificationReference = firebase
        .database()
        .ref('customers')
        .child(props.customer.key)
        .child('notifications')
        .child(String(timeOfPartRequest))
      customerNotificationReference
        .set({
          type: 'part-request',
          data: partRequest,
        })
        .then(() => updateResponseMessage('Sent part request to customer'))
        .then(() => setNewPartPrice(undefined))
        .then(() => setNewPartName(undefined))
        .then(() =>
          customerNotificationReference
            .child('data')
            .child('result')
            .on('value', (data) => {
              const result = data.val()
              if (result === 'accept' || result === 'reject') {
                console.log('Result is ' + result)
                setPartsRequested((prevState) => {
                  prevState[timeOfPartRequest].accepted = result === 'accept'
                  return prevState
                })
                customerNotificationReference
                  .child('data')
                  .child('result')
                  .off('value')
              }
            })
        )
    }
    //listen for updates on the same path
    else if (!newPartName)
      setErrorMessage('Part name required to send notification')
    else if (!newPartPrice)
      setErrorMessage('Part price required to send notification')
  }
  const [clearMessageTimeout, setClearMessageTimeout] = useState<
    undefined | NodeJS.Timeout
  >()
  const updateResponseMessage = (newMessage: string) => {
    setResponseMessage(newMessage)
    if (clearMessageTimeout) clearTimeout(clearMessageTimeout)
    setClearMessageTimeout(
      setTimeout(() => setResponseMessage(undefined), 5000)
    )
  }
  return (
    <div className={'customer-details-page'}>
      {props.customer == 'new' ? (
        <NewCustomerForm escape={props.escape} />
      ) : (
        <>
          <div
            className={'paragraph-row'}
            style={{ justifyContent: 'flex-start' }}>
            <button onClick={props.escape} className={'back-button'}>
              <span className="material-icons">clear</span>
            </button>
            <h2>Viewing {props.customer.name}</h2>
          </div>

          <Insignia colour={props.customer.car.colour} />
          <div>
            <div className={'paragraph-row'}>
              <p>
                {props.customer.car.colour} {props.customer.car.brand}{' '}
                {props.customer.car.model}
              </p>
              <p>
                License plate:{' '}
                <span className={'license-plate'}>
                  {props.customer.car.licensePlate}
                </span>
              </p>
            </div>
          </div>
          <div>
            <h3>
              Send notification{' '}
              <span className={'mechanic-response-message'}>
                {responseMessage}
              </span>
              <span className={'mechanic-response-error-message'}>
                {errorMessage}
              </span>
            </h3>
            <div className={'mechanic-send-message'}>
              <input
                className={'send-message-box'}
                value={notificationMessage || ''}
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
              <button
                onClick={sendNotification}
                className={'send-message-button'}>
                <span>Send</span>
                <span className="material-icons">send</span>
              </button>
            </div>
            <br />
            <div className={'paragraph-row'}>
              <input
                placeholder={'Part name'}
                value={newPartName || ''}
                onChange={(v) => setNewPartName(v.target.value)}
              />
              <input
                placeholder={'Part price'}
                type={'number'}
                value={newPartPrice || ''}
                onChange={(v) => setNewPartPrice(Number(v.target.value))}
              />
              <button
                onClick={sendPartRequest}
                className={'send-message-button'}>
                Request part
              </button>
              <button
                onClick={sendCallRequest}
                disabled={callRequested}
                className={'send-message-button'}>
                Request call
              </button>
            </div>
            {Object.keys(partsRequested).length && (
              <div>
                <h3>Parts requested</h3>
                <ul>
                  {Object.keys(partsRequested).map((partRequestTimestamp) => {
                    const partRequest =
                      partsRequested[Number(partRequestTimestamp)]
                    return (
                      <li key={partRequestTimestamp}>
                        {partRequest.name} for &pound;{partRequest.price}{' '}
                        {partRequest.accepted === undefined
                          ? 'pending approval'
                          : partRequest.accepted
                          ? 'accepted'
                          : 'rejected'}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
