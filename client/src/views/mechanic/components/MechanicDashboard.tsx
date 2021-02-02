import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import { ICustomer } from '../../../types/ICustomer'
import { CustomerDetailsPage } from './CustomerDetailsPage'
import { CustomerDashboardTile } from './CustomerDashboardTile'
import '../styles/MechanicDashboard.scss'
import '../styles/CustomerDashboardTile.scss'

export const MechanicDashboard: () => JSX.Element = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([])
  useEffect(() => {
    firebase
      .database()
      .ref('customers')
      .on('child_added', (customer) => {
        const tempCustomer = customer.val() as ICustomer
        tempCustomer.key = customer.key // get customer ID
        setCustomers((prevState) => [tempCustomer, ...prevState])
      })
  }, [])
  const [selectedCustomer, setSelectedCustomer] = useState<
    ICustomer | undefined | 'new'
  >()
  return (
    <div className={'mechanic-dashboard'}>
      <h1 className={'dashboard-title'}>Mechanics iPad</h1>
      {selectedCustomer ? (
        <CustomerDetailsPage
          customer={selectedCustomer}
          escape={() => setSelectedCustomer(undefined)}
        />
      ) : (
        <div className={'dashboard-tile-container'}>
          <div
            className={'customer-dashboard-tile' + ' ' + 'new-customer-button'}
            onClick={() => setSelectedCustomer('new')}>
            <span>+</span>
          </div>
          {customers?.map((customer, i) => (
            <CustomerDashboardTile
              key={i}
              customer={customer}
              onClick={() => setSelectedCustomer(customer)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
