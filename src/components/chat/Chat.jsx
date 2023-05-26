import React, {FC} from "react";
import styles from "./Chat.module.css";
import {observer} from "mobx-react-lite";
import greenStore from "../../store/greenStore";
import SendMessage from "../sendMessage/SendMessage";
import Messages from "../messages/Messages";

const Chat: FC<{}> = () => {
    const {phone} = greenStore;

    return (
        <div className={styles.container}>
            {phone && (
                <div className={styles.header}>
                    Chat with: {phone}
                </div>
            )}
            <div className={styles.body}>
                <Messages/>
            </div>
            {phone && (
                <div className={styles.footer}>
                    <SendMessage/>
                </div>
            )}
        </div>
    );
};

export default observer(Chat);