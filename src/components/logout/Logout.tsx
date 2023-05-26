import React, {FC} from "react";
import styles from "./Logout.module.css";
import greenStore from "../../store/greenStore";

const Logout: FC<{}> = () => {
    return (
        <button
            className={styles.logout}
            onClick={() => greenStore.logout()}
        >
            Exit
        </button>
    );
};

export default Logout;