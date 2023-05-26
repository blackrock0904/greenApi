import React, {FC, ReactNode} from 'react';
import styles from './Portal.module.css';

interface Props {
    children?: ReactNode
}

const Portal: FC<Props> = ({children}): JSX.Element => {
    return (
        <div className={styles.portal}>
            {children}
        </div>
    );
};

export default Portal;