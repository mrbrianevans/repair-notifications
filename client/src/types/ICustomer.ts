import { ICar } from './ICar'
import { IDatabaseNotification } from './INotification'

export interface ICustomer {
  key?: string
  name: string
  notifications: { [key: string]: IDatabaseNotification }
  car: ICar
}
