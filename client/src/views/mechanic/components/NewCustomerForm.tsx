import * as React from 'react'
import { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import '../styles/NewCustomerForm.scss'
import { ICustomer } from '../../../types/ICustomer'
type Props = {
  escape: () => void
}

export const NewCustomerForm: (props: Props) => JSX.Element = (props) => {
  const [newName, setNewName] = useState(name.firstName())
  const [licensePlate, setLicensePlate] = useState('LI53 PL8')
  const { brand: randomBrand, model: randomModel } = vehicle.getVehicle()
  const [carBrand, setCarBrand] = useState(randomBrand)
  const [carColour, setCarColour] = useState(RandomColour.colour())
  const [carModel, setCarModel] = useState(randomModel)
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
        licensePlate: licensePlate,
      },
      notifications: {},
    }
    newCustomer.notifications[Date.now()] = {
      type: 'message',
      data: { message: 'Car checked in' },
    }
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
      <button onClick={props.escape}>Back</button>
      <p>You are creating a new customer</p>
      <div>
        <label>
          <span className={'new-customer-input-label'}>Name:</span>
          <input
            type={'text'}
            onChange={(v) => setNewName(v.target.value)}
            placeholder={'Name'}
            value={newName}
            className={'new-customer-input'}
          />
        </label>
      </div>
      <div>
        <label>
          <span className={'new-customer-input-label'}>License plate:</span>
          <input
            type={'text'}
            onChange={(v) => setLicensePlate(v.target.value)}
            placeholder={'Name'}
            value={licensePlate}
            className={'new-customer-input'}
          />
        </label>
      </div>
      <div>
        <label>
          <span className={'new-customer-input-label'}>Car manufacturer:</span>
          <input
            type={'text'}
            onChange={(v) => setCarBrand(v.target.value)}
            placeholder={'Car brand'}
            value={carBrand}
            className={'new-customer-input'}
          />
        </label>
      </div>
      <div>
        <label>
          <span className={'new-customer-input-label'}>Model:</span>
          <input
            type={'text'}
            onChange={(v) => setCarModel(v.target.value)}
            placeholder={'Car model'}
            value={carModel}
            className={'new-customer-input'}
          />
        </label>
      </div>
      <div>
        <label>
          <span className={'new-customer-input-label'}>Colour:</span>
          <input
            type={'text'}
            onChange={(v) => setCarColour(v.target.value)}
            placeholder={'Car colour'}
            value={carColour}
            className={'new-customer-input'}
            list={'list-of-colours'}
          />
        </label>
      </div>

      <datalist id={'list-of-colours'}>
        {colours.map((colour, index) => (
          <option key={index}>{colour}</option>
        ))}
      </datalist>
      <div>
        <button onClick={handleNewCustomer}>Add</button>
      </div>
    </>
  )
}

const colours = [
  'blue',
  'light blue',
  'black',
  'grey',
  'white',
  'silver',
  'red',
]

class RandomColour {
  static colour = () => {
    return colours[Math.floor(Math.random() * colours.length)]
  }
}

class name {
  static firstName = () => {
    const names = [
      'Bob',
      'Alice',
      'Charlie',
      'Amy',
      'Richard',
      'Emily',
      'Benjamin',
      'Thomas',
      'Ryan',
      'Adam',
      'Toby',
      'Zoe',
      'Dan',
    ]
    return names[Math.floor(Math.random() * names.length)]
  }
}

class vehicle {
  static getVehicle = () => {
    const models = [
      { brand: 'Tesla', model: 'Model 3' },
      { brand: 'Tesla', model: 'Model S' },
      { brand: 'Vauxhall', model: 'Insignia' },
      { brand: 'Ford', model: 'Mondeo' },
      { brand: 'Kia', model: 'Optima' },
      { brand: 'VW', model: 'Passat' },
      { brand: 'VW', model: 'Jetta' },
      { brand: 'Audi', model: 'A7' },
    ]
    return models[Math.floor(Math.random() * models.length)]
  }
}
