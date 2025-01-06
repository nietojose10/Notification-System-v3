
export interface User {
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
}

export interface MessageType {
    id?: string,
    messageType: string,
}

export interface NotificationType {
    id?: string,
    notificationType: string,
}

export interface LogHistory {
    id?: string,
    message?: string,
    messageType: MessageType,
    notificationType: NotificationType,
    user?: User,
    creationDate: string
}

export interface LogHistoryReport {
  id?: number,
  messageType: MessageType,
  notificationType: NotificationType,
  creationDate: string,
  userName: string,
  email: string,
  phoneNumber: string
}