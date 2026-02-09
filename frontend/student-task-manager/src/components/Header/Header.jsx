import React from 'react';
import styles from './Header.module.css';
import { FaGraduationCap } from 'react-icons/fa';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <FaGraduationCap className={styles.icon} />
                    <h1>Student Task Manager</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
