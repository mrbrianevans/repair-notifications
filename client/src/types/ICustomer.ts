export interface ICustomer {
  name: string
  notifications: { [key: string]: string }
  car: {
    brand: string
    model: string
    colour: string
  }
}
