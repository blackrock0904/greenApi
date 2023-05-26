import React, {FormEvent, useState} from "react";
import greenStore from "../../store/greenStore";
import styles from "./Credentials.module.css";
import {Api, GetSettingsData} from "../../utils/api";

const ID = "1101825047";
const TOKEN = "6ed1143490a845cd9915079ae71a80c855fe1d440ae94ae2be";

const Credentials = () => {
    const [networkError, setNetworkError] = useState<string>("");

    const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const idInstance = (e.currentTarget.children[0] as HTMLInputElement).value;
        const apiTokenInstance =  (e.currentTarget.children[1] as HTMLInputElement).value;
        if (!idInstance || !apiTokenInstance) return;

        try {
            const response = await Api.getSettings(ID, TOKEN) as GetSettingsData;
            if (response.data?.incomingWebhook !== "yes") {
                setNetworkError("Switch on receiving message...")
            }
            greenStore.greenId = ID;
            greenStore.greenToken = TOKEN;
            greenStore.setEligible(true);

        } catch {
            setNetworkError("Bad params. Try it one more time...")
        }
    }

    return (
        <form
            onSubmit={submitHandle}
            className={styles.container}
        >
            <input
                type="text"
                autoComplete="off"
                placeholder="idInstance"
                name="idInstance"
                className={styles.input}
                required={true}
            />
            <input
                type="text"
                autoComplete="off"
                placeholder="apiTokenInstance"
                name="apiTokenInstance"
                className={styles.input}
                required={true}
            />
            <button
                type="submit"
                className={styles.button}
            >
                Start
            </button>
            {networkError && <div className={styles.error}>{networkError}</div>}
        </form>
    );
};

export default Credentials;