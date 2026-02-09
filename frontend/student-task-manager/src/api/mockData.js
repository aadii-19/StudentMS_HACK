// Mock data for testing the frontend without a backend

export const mockTasks = [
  {
    id: 1,
    title: "Complete React Assignment",
    description: "Build a task management application using React with CRUD operations and responsive design.",
    priority: "HIGH",
    status: "PENDING",
    dueDate: "2026-02-15",
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-02-01T10:00:00Z"
  },
  {
    id: 2,
    title: "Study for Database Exam",
    description: "Review SQL queries, normalization, and database design concepts for the upcoming exam.",
    priority: "HIGH",
    status: "PENDING",
    dueDate: "2026-02-12",
    createdAt: "2026-02-02T09:30:00Z",
    updatedAt: "2026-02-02T09:30:00Z"
  },
  {
    id: 3,
    title: "Submit Lab Report",
    description: "Complete and submit the physics lab report on electromagnetic induction.",
    priority: "MEDIUM",
    status: "COMPLETED",
    dueDate: "2026-02-08",
    createdAt: "2026-02-03T14:00:00Z",
    updatedAt: "2026-02-07T16:00:00Z"
  },
  {
    id: 4,
    title: "Team Project Meeting",
    description: "Attend weekly meeting with project team to discuss progress on the software engineering project.",
    priority: "MEDIUM",
    status: "PENDING",
    dueDate: "2026-02-10",
    createdAt: "2026-02-04T11:00:00Z",
    updatedAt: "2026-02-04T11:00:00Z"
  },
  {
    id: 5,
    title: "Read Chapter 5 - Data Structures",
    description: "Read and take notes on binary trees and graph algorithms from the DSA textbook.",
    priority: "LOW",
    status: "PENDING",
    dueDate: "2026-02-20",
    createdAt: "2026-02-05T08:00:00Z",
    updatedAt: "2026-02-05T08:00:00Z"
  },
  {
    id: 6,
    title: "Prepare Presentation Slides",
    description: "Create slides for the machine learning course presentation on neural networks.",
    priority: "HIGH",
    status: "PENDING",
    dueDate: "2026-02-14",
    createdAt: "2026-02-06T13:00:00Z",
    updatedAt: "2026-02-06T13:00:00Z"
  },
  {
    id: 7,
    title: "Fix Bug in Login Page",
    description: "Debug and fix the authentication issue in the login page of the web development project.",
    priority: "MEDIUM",
    status: "COMPLETED",
    dueDate: "2026-02-05",
    createdAt: "2026-02-01T15:00:00Z",
    updatedAt: "2026-02-04T18:00:00Z"
  },
  {
    id: 8,
    title: "Complete Online Quiz",
    description: "Take the online quiz for the operating systems course - covers process scheduling.",
    priority: "LOW",
    status: "PENDING",
    dueDate: "2026-02-18",
    createdAt: "2026-02-07T10:00:00Z",
    updatedAt: "2026-02-07T10:00:00Z"
  }
];

// Helper to calculate summary from tasks
export const calculateSummary = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'COMPLETED').length;
  const pending = tasks.filter(t => t.status === 'PENDING').length;
  const highPriority = tasks.filter(t => t.priority === 'HIGH' && t.status === 'PENDING').length;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const overdue = tasks.filter(t => {
    const dueDate = new Date(t.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return t.status === 'PENDING' && dueDate < today;
  }).length;
  
  const dueSoon = tasks.filter(t => {
    const dueDate = new Date(t.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return t.status === 'PENDING' && dueDate >= today && dueDate <= weekFromNow;
  }).length;

  return {
    total,
    completed,
    pending,
    highPriority,
    overdue,
    dueSoon
  };
};
