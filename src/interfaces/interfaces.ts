
export interface MessageType {
    id?: string,
    messageType: string,
}

export interface NotificationType {
    id?: string,
    notificationType: string,
}

export interface LogHistory {
    id: string,
    message: string,
    messageType: MessageType,
    notificationType: NotificationType,
    user?: string,
    creationDate: Date
}