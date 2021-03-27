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
  const respondToNewPart = (
    notificationTime: number,
    result: 'accept' | 'reject'
  ) => {
    const editingNotification = notifications.find(
      (notification) => notification.timestamp === notificationTime
    )
    if (editingNotification.notification.type === 'part-request') {
      editingNotification.notification.data.result = result
      setNotifications((prevState) => [
        ...prevState.filter(
          (notification) => notification.timestamp !== notificationTime
        ),
        editingNotification,
      ])
      firebase
        .database()
        .ref('customers')
        .child(props.customerId)
        .child('notifications')
        .child(String(notificationTime))
        .child('data')
        .child('result')
        .set(result)
      console.log(
        'Part',
        editingNotification.notification.data.name,
        result + 'ed'
      )
    }
  }
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
          {notifications
            ?.sort((a, b) => a.timestamp - b.timestamp)
            .map((notification) => (
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
                    <a className={'call-button'} href={'tel:01488662662'}>
                      <span className={'material-icons'}>call</span>
                    </a>
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
                    {notification.notification.data.result ? (
                      <p>
                        You {notification.notification.data.result}ed the new
                        part
                      </p>
                    ) : (
                      <div className={'button-row'}>
                        <button
                          className={'accept-button'}
                          onClick={() =>
                            respondToNewPart(notification.timestamp, 'accept')
                          }>
                          <span className={'material-icons'}>price_check</span>
                        </button>
                        <button
                          className={'reject-button'}
                          onClick={() =>
                            respondToNewPart(notification.timestamp, 'reject')
                          }>
                          <span className={'material-icons'}>block</span>
                        </button>
                      </div>
                    )}
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
