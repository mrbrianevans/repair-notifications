export interface INotification {
  timestamp?: number
  notification: IDatabaseNotification
}
export type IDatabaseNotification = IPartRequest | ICallRequest | IMessage

interface IPartRequest {
  type: 'part-request'
  data: {
    result?: 'accept' | 'reject'
    name: string
    price: number
  }
}

interface ICallRequest {
  type: 'call-request'
}

interface IMessage {
  type: 'message'
  data: {
    message: string
  }
}
