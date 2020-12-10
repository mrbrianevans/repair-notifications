import React, { useEffect, useState } from 'react'
import { CustomerPhone } from './components/CustomerPhone'
import './styles/CustomerView.scss'
import firebase from 'firebase/app'
import 'firebase/database'

export const CustomerView: (props: {
  numberOfPhones: number
}) => JSX.Element = (props) => {
  //TODO:
  // - take number of phones and call the database with a count limit of that
  // - get their id's  passed as props to CustomerPhone using map
  const [customerIds, setCustomerIds] = useState<string[]>()
  useEffect(() => {
    const callTime = Date.now()
    firebase
      .database()
      .ref('customers')
      .limitToFirst(props.numberOfPhones)
      .once('value')
      .then((customerIds) => {
        console.log(
          'Customer Ids: ' +
            Object.keys(customerIds.val()) +
            ' in ' +
            (Date.now() - callTime) +
            'ms'
        )
        setCustomerIds(Object.keys(customerIds.val()))
      })
  }, [])

  return (
    <div className={'phone-container'}>
      {customerIds?.map((customerId) => (
        <CustomerPhone customerId={customerId} key={customerId} />
      ))}
    </div>
  )
}
