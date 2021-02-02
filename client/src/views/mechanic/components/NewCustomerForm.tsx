import * as React from 'react'
import { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
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
        brand:
          carBrand.charAt(0).toUpperCase() + carBrand.slice(1).toLowerCase(),
        colour:
          carColour.charAt(0).toUpperCase() + carColour.slice(1).toLowerCase(),
        model:
          carModel.charAt(0).toUpperCase() + carModel.slice(1).toLowerCase(),
        licensePlate: 'LI"LI53 PL8"todo: install fakerjs to auto generate this content for demonstration purposes
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
