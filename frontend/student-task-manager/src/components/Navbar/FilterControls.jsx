import React from 'react';
import styles from './FilterControls.module.css';

const FilterControls = ({ filters, onFilterChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div className={styles.filterContainer}>
            <select
                name="priority"
                value={filters.priority}
                onChange={handleChange}
                className={styles.select}
            >
                <option value="">All Priorities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
            </select>

            <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className={styles.select}
            >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
            </select>
        </div>
    );
};

export default FilterControls;
