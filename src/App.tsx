import React from "react";
import Portal from "./components/portal/Portal";
import Credentials from "./components/credentials/Credentials";
import greenStore from "./store/greenStore";
import {observer} from "mobx-react-lite";
import Logout from "./components/logout/Logout";
import Chat from "./components/chat/Chat";
import styles from "./App.module.css";
import Phone from "./components/phone/Phone";

function App() {
    const {isEligible} = greenStore;

    return (
        <Portal>
            {isEligible && (
                <>
                    <div className={styles.phoneBox}>
                        <Phone/>
                    </div>
                    <div className={styles.logoutBox}>
                        <Logout/>
                    </div>
                    <Chat/>
                </>
            )}
            {!isEligible && <Credentials/>}
        </Portal>
    );
}

export default observer(App);
