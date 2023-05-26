import React, {FC} from "react";
import styles from "./Logout.module.css";
import greenStore from "../../store/greenStore";

const Logout: FC = () => {
    const onClick = () => greenStore.logout();

    return <button className={styles.logout} onClick={onClick}>Exit</button>;
};

export default Logout;