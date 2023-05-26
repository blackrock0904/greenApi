import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./SendMessage.module.css";
import {Api, ISendData} from "../../utils/api";
import greenStore, {IMessage} from "../../store/greenStore";
import {AxiosResponse} from "axios";
import {reaction} from "mobx";

const SendMessage = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setMessage(e.currentTarget.value);
    };

    useEffect(() => {
        return reaction(() => greenStore.phone, () => {
            setError("");
        })
    }, [])

    const sendMessage = async (): Promise<void> => {
        if (!message) {
            return;
        }
        const data: ISendData = {
            chatId: `${greenStore.phone}@c.us`,
            message
        }
        setError("");

        try {
            const response = await Api.sendMessage(greenStore.greenId, greenStore.greenToken, data) as AxiosResponse<{ idMessage: string}>
            const newMessage: IMessage = {
               id: response.data.idMessage,
               data: {
                   incoming: false,
                   text: message
               }
            };
            greenStore.addMessage(newMessage);
            setMessage("");
        } catch  {
            setError("Bad request");
        }
    };

    return (
        <>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Text message"
                    className={styles.input}
                    onChange={onChange}
                    value={message}
                />
                <button
                    className={styles.button}
                    onClick={sendMessage}
                >Send</button>
            </div>
        </>

    );
};

export default SendMessage;