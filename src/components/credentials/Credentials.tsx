import React, {FormEvent, useState} from "react";
import greenStore from "../../store/greenStore";
import styles from "./Credentials.module.css";
import {Api} from "../../utils/api";

const ID = "1101824783";
const TOKEN = "1e9e5b2074ef4c55b215128d96fe93bdcbdcdd32da4a4e03a0";

const Credentials = () => {
    const [networkError, setNetworkError] = useState<string>("");

    const submitHandle = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const idInstance = (e.currentTarget.children[0] as HTMLInputElement).value;
        const apiTokenInstance =  (e.currentTarget.children[1] as HTMLInputElement).value;
        if (!idInstance || !apiTokenInstance) return;

        Api.getSettings(ID, TOKEN)
            .then(data => {
                greenStore.greenId = ID;
                greenStore.greenToken = TOKEN;
                greenStore.setEligible(true)
            })
            .catch(() => setNetworkError("Bad params. Try it one more time..."))
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