import React, {ChangeEvent, FC, useState} from 'react';
import styles from "./Phone.module.css";
import greenStore from "../../store/greenStore";
import {Api, ExistWhatsApp} from "../../utils/api";
import {AxiosResponse} from "axios";

const Phone: FC<{}> = () => {
    const {greenId, greenToken} = greenStore;
    const [inputPhone, setInputPhone] = useState("");
    const [error, setError] = useState("");

    const onStart = async () => {
        if (!inputPhone || !greenId || !greenToken) {
            return;
        }
        setError("");

        try {
            const response = await Api.checkWhatsapp(greenId, greenToken, +inputPhone) as AxiosResponse<ExistWhatsApp>;
            if (response.data.existsWhatsapp) {
                greenStore.setPhone(+inputPhone);
            } else {
                setError("Phone does not exist in WhatsApp");
                greenStore.setPhone(null);
            }
        } catch {
            setError("Bad request");
            greenStore.setPhone(null);
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement >) => {
        setInputPhone(e.target.value.replace(/[^[0-9]/i, ""));
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                value={inputPhone}
                placeholder="Phone number"
                className={styles.input}
                onChange={onChange}
            />
            <button
                className={styles.button}
                onClick={onStart}
            >Start new chat
            </button>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
};

export default Phone;