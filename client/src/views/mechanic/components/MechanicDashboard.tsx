import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import { ICustomer } from '../../../types/ICustomer'

export const MechanicDashboard: () => JSX.Element = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([])
  useEffect(() => {
    firebase
      .database()
      .ref('customers')
      .on('child_added', (customer) => {
        setCustomers((prevState) => [...prevState, customer.val() as ICustomer])
      })
  }, [])
  return (
    <div className={'mechanic-dashboard'}>
      {customers?.map((customer, i) => (
        <div className={'customer-summary-container'} key={i}>
          {customer.name}
        </div>
      ))}
    </div>
  )
}
