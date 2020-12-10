export interface ICustomer {
  key?: string
  name: string
  notifications: { [key: string]: string }
  car: {
    brand: string
    model: string
    colour: string
  }
}
