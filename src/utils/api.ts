import axios, {AxiosError, AxiosResponse} from "axios";

export interface ISendData {
    chatId: string,
    message: string
}

export interface ICheckWhatsappData {
    phoneNumber: number
}

export interface ISaveSettingData {
    saveSettings: boolean
}

export interface ISendMessage {
    idMessage: string
}

export interface IExistWhatsApp {
    existsWhatsapp: boolean
}

export interface IDeleteNotification {
    result: boolean
}

export type GetSettingsData = typeof info;
export type ReceiveNotificationData = typeof notification;

export class Api {
    static getSettings = (id: string, token: string): Promise<AxiosResponse<GetSettingsData> | AxiosError> => {
        return axios.get(`https://api.green-api.com/waInstance${id}/getSettings/${token}/`);
    };

    static setSettings = (id: string, token: string, data: {[key: string]: string}): Promise<AxiosResponse<ISaveSettingData> | AxiosError> => {
        return axios.post(`https://api.green-api.com/waInstance${id}/setSettings/${token}/`, data);
    };

    static checkWhatsapp = (id: string, token: string, phone: number): Promise<AxiosResponse<IExistWhatsApp> | AxiosError> => {
        const data: ICheckWhatsappData = {
            phoneNumber: phone
        };
        return axios.post(`https://api.green-api.com/waInstance${id}/checkWhatsapp/${token}`, data);
    };

    static sendMessage = (id: string, token: string, data: ISendData): Promise<AxiosResponse<ISendMessage> | AxiosError> => {
        return axios.post(`https://api.green-api.com/waInstance${id}/sendMessage/${token}/`, data);
    };

    static receiveNotification = (id: string, token: string): Promise<AxiosResponse<ReceiveNotificationData> | AxiosError> => {
        return axios.get(`https://api.green-api.com/waInstance${id}/receiveNotification/${token}/`);
    };

    static deleteNotification = (id: string, token: string, receiptId: string | number): Promise<AxiosResponse<IDeleteNotification> | AxiosError> => {
        return axios.delete(`https://api.green-api.com/waInstance${id}/deleteNotification/${token}/${receiptId}/`);
    };
}

// PS: не обращать внимание на данные ниже. Исключительно для описания типов для скорости разработки тестового

const info = {
    "wid": "38268586571@c.us",
    "countryInstance": "",
    "typeAccount": "",
    "webhookUrl": "",
    "webhookUrlToken": "",
    "delaySendMessagesMilliseconds": 0,
    "markIncomingMessagesReaded": "no",
    "markIncomingMessagesReadedOnReply": "no",
    "sharedSession": "no",
    "proxyInstance": "system proxy",
    "outgoingWebhook": "no",
    "outgoingMessageWebhook": "no",
    "outgoingAPIMessageWebhook": "no",
    "incomingWebhook": "yes",
    "deviceWebhook": "no",
    "statusInstanceWebhook": "no",
    "stateWebhook": "no",
    "enableMessagesHistory": "no",
    "keepOnlineStatus": "no"
}

const notification = {
    "receiptId": 1,
    "body": {
        "typeWebhook": "incomingMessageReceived",
        "instanceData": {
            "idInstance": 1101825047,
            "wid": "38268586571@c.us",
            "typeInstance": "whatsapp"
        },
        "timestamp": 1685117351,
        "idMessage": "ABD7D6D07B06C50C39F254E731F94CC3",
        "senderData": {
            "chatId": "79041471464@c.us",
            "chatName": "Макс",
            "sender": "79041471464@c.us",
            "senderName": "Макс"
        },
        "messageData": {
            "typeMessage": "textMessage",
            "textMessageData": {
                "textMessage": "Еееааа"
            }
        }
    }
}
