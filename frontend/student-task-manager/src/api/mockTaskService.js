// Mock Task Service - simulates backend API for frontend testing
// This file replaces taskService.js when testing without backend

import { mockTasks, calculateSummary } from './mockData';

// Simulate network delay (optional - makes it feel more realistic)
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory tasks array (mutable copy of mock data)
let tasks = [...mockTasks];
let nextId = Math.max(...tasks.map(t => t.id)) + 1;

export const taskService = {
    // Get all tasks with optional filters and sorting
    getAllTasks: async (params = {}) => {
        await delay();

        let result = [...tasks];

        // Filter by priority
        if (params.priority) {
            result = result.filter(t => t.priority === params.priority);
        }

        // Filter by status
        if (params.status) {
            result = result.filter(t => t.status === params.status);
        }

        return result;
    },

    // Get a single task by ID
    getTaskById: async (id) => {
        await delay();
        const task = tasks.find(t => t.id === Number(id));
        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }
        return task;
    },

    // Create a new task
    createTask: async (taskData) => {
        await delay();
        const newTask = {
            id: nextId++,
            ...taskData,
            status: taskData.status || 'PENDING',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        tasks.push(newTask);
        console.log('[Mock] Created task:', newTask);
        return newTask;
    },

    // Update an existing task
    updateTask: async (id, taskData) => {
        await delay();
        const index = tasks.findIndex(t => t.id === Number(id));
        if (index === -1) {
            throw new Error(`Task with id ${id} not found`);
        }
        tasks[index] = {
            ...tasks[index],
            ...taskData,
            updatedAt: new Date().toISOString()
        };
        console.log('[Mock] Updated task:', tasks[index]);
        return tasks[index];
    },

    // Delete a task
    deleteTask: async (id) => {
        await delay();
        const index = tasks.findIndex(t => t.id === Number(id));
        if (index === -1) {
            throw new Error(`Task with id ${id} not found`);
        }
        const deleted = tasks.splice(index, 1)[0];
        console.log('[Mock] Deleted task:', deleted);
    },

    // Update task status (PATCH)
    updateTaskStatus: async (id, status) => {
        await delay();
        const index = tasks.findIndex(t => t.id === Number(id));
        if (index === -1) {
            throw new Error(`Task with id ${id} not found`);
        }
        tasks[index] = {
            ...tasks[index],
            status,
            updatedAt: new Date().toISOString()
        };
        console.log('[Mock] Updated status:', tasks[index]);
        return tasks[index];
    },

    // Get task summary
    getTaskSummary: async () => {
        await delay(100);
        const summary = calculateSummary(tasks);
        console.log('[Mock] Summary:', summary);
        return summary;
    },

    // Utility: Reset to initial mock data (useful for testing)
    resetMockData: () => {
        tasks = [...mockTasks];
        nextId = Math.max(...tasks.map(t => t.id)) + 1;
        console.log('[Mock] Data reset to initial state');
    }
};
