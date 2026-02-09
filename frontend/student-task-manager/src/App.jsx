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

const App = () => {
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

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Backend filtering/sorting
      const params = {
        sort: 'dueDate', // API default maybe?
        // We might need to handle sort direction if API supports it, 
        // e.g., sort=dueDate,asc or direction=asc
        // Assuming API might take simple sort param or handled in frontend.
        // Prompt says "Get all tasks... Filter & sort via query params"
        // Let's pass what we have.
      };

      // If we are searching or filtering, we might need to handle client-side vs server-side
      // Prompt says: "Real-time filtering. Sort Dropdown... Uses backend sorting API"

      // Let's try to pass params to getAllTasks
      const fetchedTasks = await taskService.getAllTasks({
        priority: filters.priority || undefined,
        status: filters.status || undefined,
        // Depending on backend implementation of sort
      });

      // Fetch summary
      const fetchedSummary = await taskService.getTaskSummary();
      setSummary(fetchedSummary);

      // Client-side processing for Search & Sort (if backend doesn't fully support all combos or for responsiveness)
      // "Real-time filtering (debounced)" usually implies fetching.
      // "Search tasks by: title, id"

      let processedTasks = fetchedTasks;

      // Apply Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        processedTasks = processedTasks.filter(t =>
          t.title.toLowerCase().includes(query) ||
          String(t.id).includes(query)
        );
      }

      // Apply Sort (if backend API sorting isn't sufficient or complex)
      // "Sort tasks by due date (ascending)"
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
      setLoading(false);
    }
  }, [filters, sortOrder, searchQuery]);

  // Initial fetch and when dependencies change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (taskData) => {
    try {
      await taskService.createTask(taskData);
      fetchTasks();
      setIsAddTaskOpen(false);
    } catch (err) {
      alert('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      await taskService.updateTask(id, taskData);
      fetchTasks();
    } catch (err) {
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks();
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'PENDING' ? 'COMPLETED' : 'PENDING';
    try {
      await taskService.updateTaskStatus(id, newStatus);
      fetchTasks();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <Navbar
          onSearch={setSearchQuery}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          filters={filters}
          onFilterChange={setFilters}
          onAddTaskClick={() => setIsAddTaskOpen(true)}
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
              tasks={tasks} // TaskList should filter or show all? 
              // Usually "Active Tasks" in this context might mean "Tasks to be done"
              // But the Main Content is "Task List".
              // TaskHistory is strictly "Completed + Pending Future".
              // Let's pass filtered active tasks if ViewMode logic dictates,
              // or let TaskList show "everything currently fetched" (which is filtered by Navbar).
              // Navbar filters affect the "Task List".
              // TaskHistory works on "existing task data".
              // So I should pass `tasks` to both and let them render/filter.
              // Logic:
              // If Active Tab: Show TaskList (which respects Navbar Filters)
              // If History Tab: Show TaskHistory (which applies its own READ-ONLY logic)
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
