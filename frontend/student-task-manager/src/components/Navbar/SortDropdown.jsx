import React from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import styles from './SortDropdown.module.css';

const SortDropdown = ({ sortOrder, onSortChange }) => {
    return (
        <div className={styles.sortContainer}>
            <label htmlFor="sort-select" className={styles.label}>
                Sort by Due Date:
            </label>
            <button
                className={styles.sortButton}
                onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
                title={`Sort by Due Date ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
                {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                <span>{sortOrder === 'asc' ? 'Earliest First' : 'Latest First'}</span>
            </button>
        </div>
    );
};

export default SortDropdown;
