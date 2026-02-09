import React, { useMemo } from 'react';
import styles from './TaskHistory.module.css';
import { formatDate, isOverdue } from '../../utils/dateUtils';
import clsx from 'clsx'; // Assuming clsx is installed or available, if not use template literals

const TaskHistory = ({ tasks }) => {
    const historyTasks = useMemo(() => {
        return tasks.filter(task => {
            const overdue = isOverdue(task.dueDate, task.status);
            // Include if completed OR if pending and NOT overdue
            return task.status === 'COMPLETED' || (task.status === 'PENDING' && !overdue);
        });
    }, [tasks]);

    if (historyTasks.length === 0) {
        return (
            <div className={styles.emptyHistory}>
                <p>No task history available.</p>
            </div>
        );
    }

    return (
        <div className={styles.historyContainer}>
            <h2>Task History</h2>
            <div className={styles.historyList}>
                {historyTasks.map(task => (
                    <div
                        key={task.id}
                        className={clsx(styles.historyItem, {
                            [styles.completed]: task.status === 'COMPLETED',
                            [styles.pending]: task.status === 'PENDING'
                        })}
                    >
                        <div className={styles.statusIndicator}></div>
                        <div className={styles.info}>
                            <h4 className={styles.title}>{task.title}</h4>
                            <div className={styles.details}>
                                <span className={clsx(styles.priority, styles[task.priority.toLowerCase()])}>
                                    {task.priority}
                                </span>
                                <span className={styles.date}>Due: {formatDate(task.dueDate)}</span>
                            </div>
                        </div>
                        <div className={styles.status}>
                            {task.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskHistory;
