import axios from 'axios';

const API_BASE_URL = 'https://nondisciplinable-deerfly-avery.ngrok-free.dev/api/tasks';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // Skip ngrok's HTML interstitial
  },
});

export const taskService = {
  // Get all tasks with optional filters and sorting
  getAllTasks: async (params = {}) => {
    try {
      const response = await api.get('', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Get a single task by ID
  getTaskById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      throw error;
    }
  },

  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await api.post('', taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update an existing task
  updateTask: async (id, taskData) => {
    try {
      const response = await api.put(`/${id}`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      throw error;
    }
  },

  // Update task status (PATCH)
  updateTaskStatus: async (id, status) => {
    try {
      const response = await api.patch(`/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for task ${id}:`, error);
      throw error;
    }
  },

  // Get task summary
  getTaskSummary: async () => {
    try {
      const response = await api.get('/summary');
      return response.data;
    } catch (error) {
      console.error('Error fetching task summary:', error);
      throw error;
    }
  }
};
