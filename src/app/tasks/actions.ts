
'use server';
import type { Task } from '@/types';
import { db } from '@/lib/firebase'; // Import Firestore instance
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  Timestamp,
  query,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const TASKS_COLLECTION = 'tasks';

// Helper function to convert Firestore Timestamps to ISO strings
const convertTimestamps = (data: any): any => {
  const result: any = { ...data };
  for (const key in result) {
    if (result[key] instanceof Timestamp) {
      result[key] = result[key].toDate().toISOString();
    }
  }
  return result;
};

export async function getTasks(): Promise<Task[]> {
  console.log("Server Action: getTasks called. Fetching from Firestore.");
  try {
    const tasksCollection = collection(db, TASKS_COLLECTION);
    // Optionally, order by creation date or due date
    const q = query(tasksCollection, orderBy('createdAt', 'desc'), limit(50)); // Get latest 50 tasks
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map(docSnap => {
      const data = docSnap.data();
      return {
        ...convertTimestamps(data),
        id: docSnap.id,
      } as Task;
    });
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks from Firestore:", error);
    // Consider how to handle this error in the UI. For now, returning empty.
    return [];
  }
}

export async function createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
  console.log("Server Action: createTask called with data:", taskData);
  try {
    const tasksCollection = collection(db, TASKS_COLLECTION);
    const newTaskData: any = {
      ...taskData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (taskData.dueDate) {
      newTaskData.dueDate = Timestamp.fromDate(new Date(taskData.dueDate));
    }
    if (taskData.completedAt) {
      newTaskData.completedAt = Timestamp.fromDate(new Date(taskData.completedAt));
    }


    const docRef = await addDoc(tasksCollection, newTaskData);
    
    revalidatePath('/'); // Revalidate the home page to show the new task

    // For returning the created task, we'd ideally fetch it or construct it carefully.
    // Firestore serverTimestamp() resolves on the server, so we can't immediately get the string.
    // For simplicity, we'll return the input data with a placeholder ID and current date strings.
    // A more robust solution might involve fetching the doc again, or structuring the client to handle optimistic updates.
    return {
      ...taskData,
      id: docRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Task;

  } catch (error) {
    console.error("Error creating task in Firestore:", error);
    throw new Error('Failed to create task in Firestore.');
  }
}

export async function updateTaskStatus(taskId: string, status: Task['status']): Promise<Task | null> {
  console.log("Server Action: updateTaskStatus called for task:", taskId, "to status:", status);
  try {
    const taskDocRef = doc(db, TASKS_COLLECTION, taskId);
    const updateData: any = {
      status: status,
      updatedAt: serverTimestamp(),
    };

    if (status === 'completed') {
      updateData.completedAt = serverTimestamp();
    } else {
      // If moving away from completed, you might want to clear completedAt
      // updateData.completedAt = null; // or deleteField() if you want to remove it
    }
    
    await updateDoc(taskDocRef, updateData);
    revalidatePath('/'); // Revalidate the home page

    // To return the updated task, you'd typically fetch it again.
    // For now, we'll return a simplified object.
    // const updatedDoc = await getDoc(taskDocRef);
    // if (updatedDoc.exists()) {
    //   return { ...convertTimestamps(updatedDoc.data()), id: updatedDoc.id } as Task;
    // }
    return { id: taskId, status } as Partial<Task> as Task; // Simplified return for now
  } catch (error) {
    console.error("Error updating task status in Firestore:", error);
    throw new Error('Failed to update task status in Firestore.');
  }
}
