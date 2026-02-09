import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskDetailsModal from '../Modals/TaskDetailsModal';
import { FaTasks } from 'react-icons/fa';
import styles from './TaskList.module.css';

const TaskList = ({ tasks, loading, error, onUpdate, onDelete, onStatusToggle }) => {
    const [selectedTask, setSelectedTask] = useState(null);

    // Sync selectedTask with updated task data when tasks array changes
    useEffect(() => {
        if (selectedTask) {
            const updatedTask = tasks.find(t => t.id === selectedTask.id);
            if (updatedTask) {
                setSelectedTask(updatedTask);
            } else {
                // Task was deleted, close the modal
                setSelectedTask(null);
            }
        }
    }, [tasks]);

    if (loading) {
        return (
            <div className={styles.center}>
                <div className={styles.spinner}></div>
                <p>Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.center}>
                <p className={styles.error}>{error}</p>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className={styles.emptyState}>
                <FaTasks className={styles.emptyIcon} />
                <h3>No tasks found</h3>
                <p>Create a task to get started!</p>
            </div>
        );
    }

    return (
        <>
            <div className={styles.grid}>
                {tasks.map(task => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={(t) => setSelectedTask(t)}
                        onDelete={onDelete}
                        onStatusToggle={onStatusToggle}
                        onClick={(t) => setSelectedTask(t)}
                    />
                ))}
            </div>

            <TaskDetailsModal
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
                task={selectedTask}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onStatusToggle={onStatusToggle}
            />
        </>
    );
};

export default TaskList;
