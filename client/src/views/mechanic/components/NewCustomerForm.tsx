import * as React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import { useState } from 'react'
import { ICustomer } from '../../../types/ICustomer'

type Props = {
  escape: () => void
}

export const NewCustomerForm: (props: Props) => JSX.Element = (props) => {
  const [newName, setNewName] = useState('')
  const [carBrand, setCarBrand] = useState('')
  const [carColour, setCarColour] = useState('')
  const [carModel, setCarModel] = useState('')
  const handleNewCustomer = () => {
    const newCustomer: ICustomer = {
      name: newName,
      car: {
        brand: carBrand,
        colour: carColour,
        model: carModel,
        licensePlate: 'LI53 PL8',
      },
      notifications: {},
    }
    newCustomer.notifications[Date.now()] = 'Car checked in'
    firebase
      .database()
      .ref('customers')
      .push(newCustomer)
      .then(props.escape)
      .catch((e) => {
        console.error('Could not create new customer', e.message)
        console.log(JSON.stringify(newCustomer))
      })
  }
  return (
    <>
      <p>You are creating a new customer</p>
      <div>
        <input
          type={'text'}
          onChange={(v) => setNewName(v.target.value)}
          placeholder={'Name'}
        />
      </div>

      <input
        type={'text'}
        onChange={(v) => setCarBrand(v.target.value)}
        placeholder={'Car brand'}
      />
      <input
        type={'text'}
        onChange={(v) => setCarModel(v.target.value)}
        placeholder={'Car model'}
      />
      <input
        type={'text'}
        onChange={(v) => setCarColour(v.target.value)}
        placeholder={'Car colour'}
      />
      <div>
        <button onClick={handleNewCustomer}>Add</button>
      </div>
    </>
  )
}
