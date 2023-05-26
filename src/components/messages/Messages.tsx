import React, {useEffect} from "react";
import greenStore, {IMessage} from "../../store/greenStore";
import styles from "./Messages.module.css";
import {observer} from "mobx-react-lite";
import {Api, ReceiveNotificationData} from "../../utils/api";
import {AxiosResponse} from "axios";

const Messages = () => {
    const {messages} = greenStore;

    useEffect(() => {
        let ticking: boolean;
        const timer = setInterval(async () => {
            if (ticking || greenStore.messages.length < 1) {
                return;
            }
            ticking = true;
            try {
                const response = await Api.receiveNotification(greenStore.greenId, greenStore.greenToken) as AxiosResponse<ReceiveNotificationData>
                if (response.data) {
                    const newMessage = {
                        id : response.data.body?.idMessage,
                        data: {
                            text: response.data.body!.messageData?.textMessageData?.textMessage,
                            incoming: true
                        }
                    }
                    greenStore.addMessage(newMessage as IMessage);
                    const receiptId = response.data.receiptId;
                    if (receiptId) {
                        await Api.deleteNotification(greenStore.greenId, greenStore.greenToken, receiptId);
                    }
                }
            } catch {

            }
            ticking = false;
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.container}>
            {messages.map(message => {
                return <div className={message.data.incoming ? styles.incoming : styles.outgoing} key={message.id}>
                    <div >
                        {message.data.text}
                    </div>
                </div>
            })}
        </div>
    );
};

export default observer(Messages);