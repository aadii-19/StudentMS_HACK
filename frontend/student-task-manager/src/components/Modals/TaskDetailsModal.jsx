import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import styles from './TaskDetailsModal.module.css';
import { formatDate } from '../../utils/dateUtils';
import { FaEdit, FaTrash, FaCheck, FaUndo, FaSave, FaTimes } from 'react-icons/fa';

const TaskDetailsModal = ({ isOpen, onClose, task, onUpdate, onDelete, onStatusToggle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'MEDIUM'
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description || '',
                dueDate: task.dueDate,
                priority: task.priority
            });
            setIsEditing(false);
        }
    }, [task, isOpen]);

    if (!task) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        onUpdate(task.id, formData);
        setIsEditing(false);
    };

    const isCompleted = task.status === 'COMPLETED';

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Task" : "Task Details"}>
            <div className={styles.container}>
                {!isEditing ? (
                    <>
                        <div className={styles.header}>
                            <div className={styles.statusBadge}>
                                <span className={`${styles.badge} ${styles[task.priority.toLowerCase()]}`}>
                                    {task.priority}
                                </span>
                                <span className={`${styles.badge} ${isCompleted ? styles.completedBadge : styles.pendingBadge}`}>
                                    {task.status}
                                </span>
                            </div>
                            <span className={styles.date}>Due: {formatDate(task.dueDate)}</span>
                        </div>

                        <h2 className={styles.title}>{task.title}</h2>
                        <div className={styles.description}>
                            <label>Description</label>
                            <p>{task.description || "No description provided."}</p>
                        </div>

                        <div className={styles.meta}>
                            <span>ID: {task.id}</span>
                            {task.createdAt && <span>Created: {formatDate(task.createdAt)}</span>}
                        </div>

                        <div className={styles.actions}>
                            <button
                                className={styles.actionButton}
                                onClick={() => setIsEditing(true)}
                                disabled={isCompleted}
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                className={styles.actionButton}
                                onClick={() => onStatusToggle(task.id, task.status)}
                            >
                                {isCompleted ? <><FaUndo /> Mark Pending</> : <><FaCheck /> Complete</>}
                            </button>
                            <button
                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                onClick={() => {
                                    if (window.confirm('Delete this task?')) {
                                        onDelete(task.id);
                                        onClose();
                                    }
                                }}
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleSave} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="edit-title">Title</label>
                            <input
                                type="text"
                                id="edit-title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="edit-description">Description</label>
                            <textarea
                                id="edit-description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className={styles.textarea}
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label htmlFor="edit-dueDate">Due Date</label>
                                <input
                                    type="date"
                                    id="edit-dueDate"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="edit-priority">Priority</label>
                                <select
                                    id="edit-priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className={styles.select}
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.editActions}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={styles.saveButton}
                            >
                                <FaSave /> Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
};

export default TaskDetailsModal;
