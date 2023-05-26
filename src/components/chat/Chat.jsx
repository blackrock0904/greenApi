import React, {FC} from "react";
import styles from "./Chat.module.css";
import {observer} from "mobx-react-lite";
import greenStore from "../../store/greenStore";
import Phone from "../phone/Phone";
import {Api} from "../../utils/api";

const Chat: FC<{}> = () => {
    const {phone} = greenStore;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {phone}
            </div>

            <div className={styles.body}>body</div>

            {phone && (
                <div className={styles.footer}>
                    <input
                        type="text"
                        placeholder="Text message"
                        className={styles.input}
                    />
                    <button
                        className={styles.button}
                        onClick={() => {
                            Api.sendMessage(greenStore.greenId, greenStore.greenToken, {
                                chatId: "38268586571@с.us",
                                message: "Test"
                            })
                        }}
                    >Send</button>
                </div>
            )}
        </div>
    );
};

export default observer(Chat);