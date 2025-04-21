
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
    typeMessage: MessageType,
    channel: NotificationType,
    user?: User,
    creationDate: string
}

export interface LogHistoryReport {
  id?: string,
  typeMessage: MessageType,
  channel: NotificationType,
  creationDate: string,
  userName: string,
  email: string,
  phoneNumber: string
}

export interface AdminReportInterface {
    id?: string,
    name: string,
    email: string,
    phoneNumber: string,
    subscribed: string,
    channels: string
}