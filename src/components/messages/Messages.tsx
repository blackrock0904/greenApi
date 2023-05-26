import React, {FC, useEffect} from "react";
import greenStore, {IMessage} from "../../store/greenStore";
import styles from "./Messages.module.css";
import {observer} from "mobx-react-lite";
import {Api, ReceiveNotificationData} from "../../utils/api";
import {AxiosResponse} from "axios";

const Messages: FC = () => {
    const {messages} = greenStore;

    useEffect(() => {
        let ticking: boolean;
        const timeId = setInterval(async () => {
            if (ticking || greenStore.messages.length < 1) {
                return;
            }
            ticking = true;

            try {
                const response = await Api.receiveNotification(greenStore.greenId, greenStore.greenToken) as AxiosResponse<ReceiveNotificationData>
                if (response.data?.receiptId) {
                    await Api.deleteNotification(greenStore.greenId, greenStore.greenToken, response.data.receiptId);
                    const newMessage: IMessage = {
                        id : response.data.body.idMessage,
                        text: response.data.body!.messageData.textMessageData.textMessage,
                        incoming: true
                    }
                    greenStore.addMessage(newMessage);
                }
            } catch {}
            ticking = false;
        }, 3000);

        return () => clearInterval(timeId);
    }, []);

    return (
        <div className={styles.container}>
            {messages.map(message => {
                return <div className={message.incoming ? styles.incoming : styles.outgoing} key={message.id}>
                    <div >
                        {message.text}
                    </div>
                </div>
            })}
        </div>
    );
};

export default observer(Messages);