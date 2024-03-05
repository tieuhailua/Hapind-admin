export class Notification {
    id: number;
    message: string;

    constructor(notification) {
        this.id = notification.id;
        this.message= notification.message;
    }
}