import React, { useState } from 'react'
import '../styles/CustomerPhone.scss'
import { RepairApp } from './RepairApp'
import { MessagingApp } from './MessagingApp'

export const CustomerPhone: (props: { customerId?: string }) => JSX.Element = (
  props
) => {
  const [inRepairApp, setInRepairApp] = useState<boolean>(false)
  return (
    <div className={'phone'}>
      <div>
        {inRepairApp ? (
          <RepairApp customerId={props.customerId} />
        ) : (
          <MessagingApp
            onClick={() => {
              setInRepairApp(true)
            }}
            customerId={props.customerId}
          />
        )}
      </div>
    </div>
  )
}
