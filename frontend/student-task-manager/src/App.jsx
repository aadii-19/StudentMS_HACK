import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import TaskList from './components/Tasks/TaskList';
import TaskHistory from './components/Tasks/TaskHistory';
import AddTaskModal from './components/Modals/AddTaskModal';
import SummaryBar from './components/SummaryBar/SummaryBar';
// Switch between mock and real service:
// For testing (no backend): use mockTaskService
// For production (with backend): use taskService
// import { taskService } from './api/mockTaskService';
import { taskService } from './api/taskService';
import styles from './App.module.css';
import useTheme from './hooks/useTheme';

const App = () => {
  const { theme, toggleTheme } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);

  // Filter & Sort State
  const [filters, setFilters] = useState({ priority: '', status: '' });
  const [sortOrder, setSortOrder] = useState('asc'); // asc | desc
  const [searchQuery, setSearchQuery] = useState('');

  // UI State
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [viewMode, setViewMode] = useState('active'); // 'active' | 'history'

  /* 
    Optimized Fetch: 'silent' parameter prevents loading spinner flicker 
    on background updates.
  */
  const fetchTasks = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const fetchedTasks = await taskService.getAllTasks({
        priority: filters.priority || undefined,
        status: filters.status || undefined,
      });

      const fetchedSummary = await taskService.getTaskSummary();
      setSummary(fetchedSummary);

      let processedTasks = fetchedTasks;

      // Apply Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        processedTasks = processedTasks.filter(t =>
          t.title.toLowerCase().includes(query) ||
          String(t.id).includes(query)
        );
      }

      // Apply Sort
      if (sortOrder) {
        processedTasks.sort((a, b) => {
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
      }

      setTasks(processedTasks);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
    } finally {
      if (!silent) setLoading(false);
    }
  }, [filters, sortOrder, searchQuery]);

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = useCallback(async (taskData) => {
    // Optimistic expectation: Loader will show, but we can also just append locally if we knew the ID.
    // For creation, a loader/refresh is acceptable.
    try {
      await taskService.createTask(taskData);
      fetchTasks(true); // Silent refresh
      setIsAddTaskOpen(false);
    } catch (err) {
      alert('Failed to create task');
    }
  }, [fetchTasks]);

  const handleUpdateTask = useCallback(async (id, taskData) => {
    // Optimistic Update
    const originalTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...taskData } : t));

    try {
      await taskService.updateTask(id, taskData);
      fetchTasks(true); // Silent sync
    } catch (err) {
      setTasks(originalTasks); // Revert
      alert('Failed to update task');
    }
  }, [tasks, fetchTasks]);

  const handleDeleteTask = useCallback(async (id) => {
    // Optimistic Delete
    const originalTasks = [...tasks];
    setTasks(prev => prev.filter(t => t.id !== id));

    try {
      await taskService.deleteTask(id);
      fetchTasks(true); // Silent sync
    } catch (err) {
      setTasks(originalTasks); // Revert
      alert('Failed to delete task');
    }
  }, [tasks, fetchTasks]);

  const handleStatusToggle = useCallback(async (id, currentStatus) => {
    const newStatus = currentStatus === 'PENDING' ? 'COMPLETED' : 'PENDING';

    // Optimistic Toggle
    const originalTasks = [...tasks];
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));

    try {
      await taskService.updateTaskStatus(id, newStatus);
      fetchTasks(true); // Silent sync
    } catch (err) {
      setTasks(originalTasks); // Revert
      alert('Failed to update status');
    }
  }, [tasks, fetchTasks]);

  return (
    <div className={styles.app} data-theme={theme}>
      <Header />

      <main className={styles.main}>
        <Navbar
          onSearch={setSearchQuery}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          filters={filters}
          onFilterChange={setFilters}
          onAddTaskClick={() => setIsAddTaskOpen(true)}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className={styles.contentContainer}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.tab} ${viewMode === 'active' ? styles.activeTab : ''}`}
              onClick={() => setViewMode('active')}
            >
              Active Tasks
            </button>
            <button
              className={`${styles.tab} ${viewMode === 'history' ? styles.activeTab : ''}`}
              onClick={() => setViewMode('history')}
            >
              Task History
            </button>
          </div>

          {viewMode === 'active' ? (
            <TaskList
              tasks={tasks}
              loading={loading}
              error={error}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onStatusToggle={handleStatusToggle}
            />
          ) : (
            <TaskHistory tasks={tasks} />
          )}
        </div>
      </main>

      <SummaryBar summary={summary} />

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleCreateTask}
      />
    </div>
  );
};

export default App;
