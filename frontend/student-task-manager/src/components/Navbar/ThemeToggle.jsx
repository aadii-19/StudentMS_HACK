import React, { useContext } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import styles from './ThemeToggle.module.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            className={styles.toggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className={`${styles.slider} ${theme === 'dark' ? styles.dark : ''}`}>
                <div className={styles.iconWrapper}>
                    {theme === 'light' ? (
                        <FaSun className={styles.iconSun} />
                    ) : (
                        <FaMoon className={styles.iconMoon} />
                    )}
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;
