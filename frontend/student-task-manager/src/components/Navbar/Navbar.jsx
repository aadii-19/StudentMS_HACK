import React from 'react';
import styles from './Navbar.module.css';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import FilterControls from './FilterControls';
import ThemeToggle from './ThemeToggle';
import { FaPlus } from 'react-icons/fa';

const Navbar = ({
    onSearch,
    sortOrder,
    onSortChange,
    filters,
    onFilterChange,
    onAddTaskClick,
    theme,
    toggleTheme
}) => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logoSection}>
                    <h1 className={styles.logo}>TaskMaster</h1>
                </div>

                <div className={styles.searchSection}>
                    <SearchBar onSearch={onSearch} />
                </div>

                <div className={styles.controlsSection}>
                    <SortDropdown
                        sortOrder={sortOrder}
                        onSortChange={onSortChange}
                    />

                    <FilterControls
                        filters={filters}
                        onFilterChange={onFilterChange}
                    />

                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

                    <button
                        className={styles.addTaskButton}
                        onClick={onAddTaskClick}
                    >
                        <FaPlus />
                        <span>Add Task</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
