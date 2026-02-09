import React from 'react';
import styles from './SummaryBar.module.css';

const SummaryBar = ({ summary }) => {
    if (!summary) return null;

    return (
        <div className={styles.bar}>
            <div className={styles.container}>
                <div className={styles.stat}>
                    <span className={styles.label}>Total Tasks</span>
                    <span className={styles.value}>{summary.totalTasks || 0}</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.label}>Completed</span>
                    <span className={`${styles.value} ${styles.success}`}>{summary.completedTasks || 0}</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.label}>Pending</span>
                    <span className={`${styles.value} ${styles.warning}`}>{summary.pendingTasks || 0}</span>
                </div>
            </div>
        </div>
    );
};

export default SummaryBar;
