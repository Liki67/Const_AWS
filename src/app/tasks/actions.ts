'use server';
import type { Task } from '@/types';
import { mockTasks as allMockTasks } from '@/lib/mock-data'; // Renaming to avoid conflict

// TODO: Replace this with actual Firestore database calls

export async function getTasks(): Promise<Task[]> {
  // Simulate fetching tasks from a database
  // In a real application, this would interact with Firestore
  console.log("Server Action: getTasks called. Returning mock data for now.");
  // Returning a copy to prevent accidental mutation of the mock source if it were more complex
  return Promise.resolve(JSON.parse(JSON.stringify(allMockTasks))); 
}

export async function createTask(taskData: Omit<Task, 'id'>): Promise<Task> {
  // Simulate creating a task in a database
  console.log("Server Action: createTask called with data:", taskData);
  const newTask: Task = {
    ...taskData,
    id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, // Generate a pseudo-unique ID
  };
  // In a real app, you'd add this to Firestore and then it might be re-fetched or added to a local cache.
  // For now, this won't update the client-side list automatically without further changes.
  allMockTasks.push(newTask); // This mutates the server-side mock data for demo, not ideal for real apps
  return Promise.resolve(newTask);
}

export async function updateTaskStatus(taskId: string, status: Task['status']): Promise<Task | null> {
  console.log("Server Action: updateTaskStatus called for task:", taskId, "to status:", status);
  const taskIndex = allMockTasks.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    allMockTasks[taskIndex]!.status = status;
    if (status === 'completed') {
        allMockTasks[taskIndex]!.completedAt = new Date().toISOString();
    }
    return Promise.resolve(JSON.parse(JSON.stringify(allMockTasks[taskIndex])));
  }
  return Promise.resolve(null);
}
