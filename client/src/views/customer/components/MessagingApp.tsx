import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/analytics'

import '../styles/messaging-app.scss'

const randomNumber = (max: number, min = 0) => {
  return Math.round(Math.random() * (max - min)) + min
}
const randomElement = (array: any[]) => {
  return array[randomNumber(array.length - 1)]
}
const colours = [
  '#365B80',
  '#6BB5FF',
  '#1E90FF',
  '#5C6E80',
  '#1872CC',
  // 'orange',
  // 'slateblue',
]
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
export const MessagingApp: (props: {
  onClick: () => void
  customerId: string
}) => JSX.Element = (props) => {
  const [name, setName] = useState<string>()
  const [showFirstMessage, setShowFirstMessage] = useState<boolean>(false)
  const [textMessageColour] = useState(randomElement(colours))
  const [timeOfMessage] = useState(randomNumber(59, 10))
  const [dayOfWeek] = useState(randomElement(days))
  useEffect(() => {
    let isMounted = true
    console.log(`${dayOfWeek}, 8:${timeOfMessage}am`)
    const messageDelay = randomNumber(1500, 500)
    setTimeout(() => {
      if (isMounted) setShowFirstMessage(true)
    }, messageDelay)
    setTimeout(() => {
      const callTime = new Date().valueOf()
      firebase
        .database()
        .ref('customers')
        .child(props.customerId)
        .child('name')
        .once('value')
        .then((customerName) => {
          const t = new Date().valueOf() - callTime // time taken
          console.log(`Name received from db: ${customerName.val()} in ${t}ms`)
          if (isMounted) setName(customerName.val())
        })
    }, messageDelay * 2)
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className={'customer-messages-container'}>
      <div
        className={'message-app-title'}
        style={{ background: textMessageColour }}>
        <p>Customer messaging app</p>
      </div>
      <div className={'user-icon'} style={{ background: textMessageColour }}>
        M
      </div>
      <div className={'text-timestamp'}>
        {dayOfWeek}, 8:{timeOfMessage}am
      </div>
      <>
        {showFirstMessage && (
          <>
            <div
              className={'message-bubble'}
              style={{ background: textMessageColour }}>
              <p>Welcome to the Repair Notifications Service!</p>
            </div>
          </>
        )}

        {name && (
          <>
            <div
              className={'message-bubble'}
              style={{ background: textMessageColour }}>
              <p>
                Hi {name || props.customerId}. You can track the status of your
                repair at any time by clicking this link:
                <span
                  onClick={() => {
                    firebase.analytics().logEvent('message_link_clicked', {
                      customer: props.customerId,
                    })
                    props.onClick()
                  }}
                  className={'message-link'}>
                  {' '}
                  notify.repair/{props.customerId.slice(15)}
                </span>
              </p>
            </div>
          </>
        )}
        <div className={'message-send-box'}>
          <span className={'cursor'}>|</span>
          <span>Text message</span>
        </div>
      </>
    </div>
  )
}
