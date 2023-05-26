import React, {FC, FormEvent, useState} from "react";
import greenStore from "../../store/greenStore";
import styles from "./Credentials.module.css";
import {Api, GetSettingsData} from "../../utils/api";
import {AxiosResponse} from "axios";

const Credentials: FC = () => {
    const [error, setError] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [token, setToken] = useState<string>("");

    const submitHandle = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (id && token) {
            try {
                const response = await Api.getSettings(id, token) as AxiosResponse<GetSettingsData>;
                if (response.data.incomingWebhook === "no") {
                    await Api.setSettings(id, token, {"incomingWebhook": "yes"});
                }
                greenStore.greenId = id;
                greenStore.greenToken = token;
                greenStore.setEligible(true);
            } catch {
                setError("Try it one more time...")
            }
        }
    };

    return (
        <form onSubmit={submitHandle} className={styles.container}>
            <input
                type="text"
                autoComplete="off"
                placeholder="idInstance"
                name="idInstance"
                className={styles.input}
                required={true}
                value={id}
                onChange={e => setId(e.target.value)}
            />
            <input
                type="text"
                autoComplete="off"
                placeholder="apiTokenInstance"
                name="apiTokenInstance"
                className={styles.input}
                required={true}
                value={token}
                onChange={e => setToken(e.target.value)}
            />
            <button type="submit" className={styles.button}>Start</button>
            {error && <div className={styles.error}>{error}</div>}
        </form>
    );
};

export default Credentials;