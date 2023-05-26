import axios, {AxiosResponse} from "axios";

export interface ISendData {
    chatId: string,
    message: string
}

export type GetSettingsData = Partial<typeof info>;
export type SendMessageData = Partial<typeof sendMessage>;
export type ReceiveNotificationData = Partial<typeof notification>;

export class Api {
    static getSettings = (id: string, token: string): Promise<AxiosResponse<GetSettingsData>> => {
        return axios.get(`https://api.green-api.com/waInstance${id}/getSettings/${token}/`);
    }

    static sendMessage = (id: string, token: string, data: ISendData): Promise<AxiosResponse<SendMessageData>> => {
        return axios.post(`https://api.green-api.com/waInstance${id}/sendMessage/${token}/`, data)
    }

    static receiveNotification = (id: string, token: string): Promise<AxiosResponse<ReceiveNotificationData>> => {
        return axios.get(`https://api.green-api.com/waInstance${id}/receiveNotification/${token}/`)
    }

    static DeleteNotification = (id: string, token: string, receiptId: string) => {
        return axios.delete(`https://api.green-api.com/waInstance${id}/deleteNotification/${token}/${receiptId}/`)
    }
}


// PS: не обращать внимание на данные ниже. Исключительно для описания типов для скорости разработки тестового

const info = {
    "data": {
        "wid": "79041471464@c.us",
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
        "incomingWebhook": "no",
        "deviceWebhook": "no",
        "statusInstanceWebhook": "no",
        "stateWebhook": "no",
        "enableMessagesHistory": "no",
        "keepOnlineStatus": "no"
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "494",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*"
        },
        "method": "get",
        "url": "https://api.green-api.com/waInstance1101824783/getSettings/1e9e5b2074ef4c55b215128d96fe93bdcbdcdd32da4a4e03a0/"
    },
    "request": {}
}

const sendMessage = {
    "data": {
        "idMessage": "BAE550AE7E95B4BC"
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "32",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        "method": "post",
        "url": "https://api.green-api.com/waInstance1101824783/sendMessage/1e9e5b2074ef4c55b215128d96fe93bdcbdcdd32da4a4e03a0",
        "data": "{\"chatId\":\"79501205563@c.us\",\"message\":\"Привет, не обращай внимание, это тесты\"}"
    },
    "request": {}
}

const notification = {
    "data": null,
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "4",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*"
        },
        "method": "get",
        "url": "https://api.green-api.com/waInstance1101824783/receiveNotification/1e9e5b2074ef4c55b215128d96fe93bdcbdcdd32da4a4e03a0/"
    },
    "request": {}
}