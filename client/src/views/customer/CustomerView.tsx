import React, { useEffect, useState } from 'react'
import { CustomerPhone } from './components/CustomerPhone'
import './styles/CustomerView.scss'
import firebase from 'firebase/app'
import 'firebase/database'

export const CustomerView: (props: {
  numberOfPhones: number
}) => JSX.Element = (props) => {
  //Done:
  // - take number of phones and call the database with a count limit of that
  // - get their id's  passed as props to CustomerPhone using map
  const [customerIds, setCustomerIds] = useState<string[]>([])
  useEffect(() => {
    let isMounted = true
    firebase
      .database()
      .ref('customers')
      .limitToLast(props.numberOfPhones)
      .on('child_added', (customerId) => {
        if (isMounted)
          setCustomerIds((prevState) => [customerId.key, ...prevState])
        console.log('Customer IDS: ', customerIds)
      })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className={'phone-container'}>
      {customerIds?.slice(0, props.numberOfPhones)?.map((customerId) => (
        <CustomerPhone customerId={customerId} key={customerId} />
      ))}
    </div>
  )
}
