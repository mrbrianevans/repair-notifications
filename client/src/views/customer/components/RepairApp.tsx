import React, { useEffect, useState } from 'react'
import '../styles/RepairApp.scss'
import { INotification } from '../../../types/INotification'
import firebase from 'firebase/app'
import 'firebase/database'
import { ICar } from '../../../types/ICar'
import { Insignia } from '../../../assets/Insignia'

export const RepairApp: (props: { customerId: string }) => JSX.Element = (
  props
) => {
  const [notifications, setNotifications] = useState<INotification[]>()
  const [name, setName] = useState<string>()
  const [car, setCar] = useState<ICar>()
  useEffect(() => {
    setNotifications([])
    const initialStartTime = Date.now()
    firebase
      .database()
      .ref('customers')
      .child(props.customerId)
      .once('value')
      .then((initialData) => {
        console.log(
          'received initial details from DB in ' +
            (Date.now() - initialStartTime) +
            'ms'
        )
        setName(initialData.child('name').val())
        setCar(initialData.child('car').val() as ICar)
      })
      .then(() => {
        firebase
          .database()
          .ref('customers')
          .child(props.customerId)
          .child('notifications')
          .on('child_added', (newNotification) => {
            console.log(
              newNotification.val(),
              'notification received in',
              Date.now() - Number(newNotification.key),
              'ms'
            )
            // this is when a new notification is added
            setNotifications((prevState) => [
              ...prevState,
              {
                timestamp: Number(newNotification.key),
                notification: newNotification.val(),
              },
            ])
          })
      })
  }, [])
  return (
    <div className={'notifications-container'}>
      <div className={'repair-app-header-bar'}>Website on customers phone</div>
      <div>
        <h3>Repair notifications</h3>
        <div>
          <p>
            Viewing {name || ''}&apos;{name?.endsWith('s') ? '' : 's'} car
            repair status
          </p>
          <p>
            {car?.colour} {car?.brand} {car?.model}
          </p>
          <div>
            <Insignia colour={car?.colour} />
          </div>
        </div>
        <div>
          {notifications?.map((notification) => (
            <div
              key={notification.timestamp}
              className={
                notification.notification.type + '-notification-container'
              }>
              <p className={'notification-timestamp'}>
                at {getReadableTime(notification.timestamp)}
              </p>

              {notification.notification.type === 'message' && (
                <p className={'notification-message'}>
                  {notification.notification.data.message}
                </p>
              )}
              {notification.notification.type === 'call-request' && (
                <div className={'button-row'}>
                  <p className={'notification-message'}>
                    Mechanic requested you to call him
                  </p>
                  <button className={'call-button'}>
                    <span className={'material-icons'}>call</span>
                  </button>
                </div>
              )}
              {notification.notification.type === 'part-request' && (
                <>
                  <p className={'notification-message'}>
                    Mechanic requested to buy a
                    {' ' + notification.notification.data.name + ' '}
                    for
                    {' ' + notification.notification.data.price}
                  </p>
                  <div className={'button-row'}>
                    <button className={'accept-button'}>
                      <span className={'material-icons'}>price_check</span>
                    </button>
                    <button className={'reject-button'}>
                      <span className={'material-icons'}>block</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const getReadableTime = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
