import React, {FC} from 'react';
import styles from './Portal.module.css';

interface Props {
    children?: React.ReactNode
}

const Portal: FC<Props> = ({children}): JSX.Element => {
    return (
        <div className={styles.portal}>
            {children}
        </div>
    );
};

export default Portal;