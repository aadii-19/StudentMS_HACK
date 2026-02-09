import React from 'react';
import { FaEdit, FaTrash, FaCheck, FaUndo, FaExclamationCircle } from 'react-icons/fa';
import styles from './TaskCard.module.css';
import { formatDate, isOverdue, isDueToday } from '../../utils/dateUtils';
import clsx from 'clsx';

const TaskCard = ({ task, onEdit, onDelete, onStatusToggle, onClick }) => {
    const { id, title, description, dueDate, priority, status } = task;
    const overdue = isOverdue(dueDate, status);
    const dueToday = isDueToday(dueDate);
    const isCompleted = status === 'COMPLETED';

    const handleAction = (e, action) => {
        e.stopPropagation();
        action();
    };

    return (
        <div
            className={clsx(styles.card, {
                [styles.completed]: isCompleted,
                [styles.overdue]: overdue && !isCompleted,
                [styles.dueToday]: dueToday && !isCompleted
            })}
            onClick={() => onClick(task)}
        >
            <div className={styles.header}>
                <div className={styles.badges}>
                    <span className={clsx(styles.badge, styles[priority.toLowerCase()])}>
                        {priority}
                    </span>
                    {overdue && !isCompleted && (
                        <span className={clsx(styles.badge, styles.badgeOverdue)}>
                            Overdue
                        </span>
                    )}
                </div>
                <div className={styles.date}>
                    {formatDate(dueDate)}
                </div>
            </div>

            <h3 className={styles.title}>{title}</h3>

            <p className={styles.description}>
                {description || 'No description provided.'}
            </p>

            <div className={styles.footer}>
                <div className={styles.actions}>
                    <button
                        className={styles.iconButton}
                        title="Edit Task"
                        onClick={(e) => handleAction(e, () => onEdit(task))}
                        disabled={isCompleted}
                    >
                        <FaEdit />
                    </button>
                    <button
                        className={styles.iconButton}
                        title="Delete Task"
                        onClick={(e) => handleAction(e, () => onDelete(id))}
                    >
                        <FaTrash />
                    </button>
                </div>

                <button
                    className={clsx(styles.statusButton, {
                        [styles.statusCompleted]: isCompleted,
                        [styles.statusPending]: !isCompleted
                    })}
                    onClick={(e) => handleAction(e, () => onStatusToggle(id, status))}
                >
                    {isCompleted ? <FaUndo /> : <FaCheck />}
                    <span>{isCompleted ? 'Mark Pending' : 'Complete'}</span>
                </button>
            </div>
        </div>
    );
};

export default React.memo(TaskCard);
