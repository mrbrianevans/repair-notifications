import { ICar } from './ICar'

export interface ICustomer {
  key?: string
  name: string
  notifications: { [key: string]: string }
  car: ICar
}
