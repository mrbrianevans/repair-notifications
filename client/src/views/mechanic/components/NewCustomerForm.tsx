import * as React from 'react'
import { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import { ICustomer } from '../../../types/ICustomer'
type Props = {
  escape: () => void
}

export const NewCustomerForm: (props: Props) => JSX.Element = (props) => {
  const [newName, setNewName] = useState(name.firstName())
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
        licensePlate: 'LI53 PL8', //todo: install fakerjs to auto generate this content for demonstration purposes
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
          value={newName}
        />
      </div>

      <input
        type={'text'}
        onChange={(v) => setCarBrand(v.target.value)}
        placeholder={'Car brand'}
        value={carBrand}
      />
      <input
        type={'text'}
        onChange={(v) => setCarModel(v.target.value)}
        placeholder={'Car model'}
        value={carModel}
      />
      <input
        type={'text'}
        onChange={(v) => setCarColour(v.target.value)}
        placeholder={'Car colour'}
        value={carColour}
      />
      <div>
        <button onClick={handleNewCustomer}>Add</button>
      </div>
    </>
  )
}

const colours = [
  'blue',
  'orange',
  'black',
  'grey',
  'white',
  'silver',
  'red',
  'yellow',
  'green',
]

class RandomColour {
  static colour = () => {
    return colours[Math.floor(Math.random() * colours.length)]
  }
}

class name {
  static firstName = () => {
    const names = ['Bob', 'Alice', 'Charlie', 'Dianna', 'Amy', 'Richard']
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
