
'use server';
import type { Task, UserRole } from '@/types';
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
  serverTimestamp,
  FieldValue,
  // deleteField, // Import if you want to completely remove fields
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
    const q = query(tasksCollection, orderBy('createdAt', 'desc'), limit(50));
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
    return [];
  }
}

// Interface for the data structure being sent to Firestore for new tasks
interface CreateTaskFirestorePayload {
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'pending-verification';
  assignedTo?: string;
  assigneeRole?: UserRole;
  dueDate?: Timestamp;
  completedAt?: Timestamp;
  completionPhotoUrl?: string;
  comments?: string;
  sitePlanZone?: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export async function createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
  console.log("Server Action: createTask called with data:", taskData);
  try {
    const tasksCollection = collection(db, TASKS_COLLECTION);
    
    const { dueDate, completedAt, ...restOfTaskData } = taskData;

    const newTaskDataForFirestore: CreateTaskFirestorePayload = {
      ...restOfTaskData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (dueDate) {
      newTaskDataForFirestore.dueDate = Timestamp.fromDate(new Date(dueDate));
    }
    if (completedAt) { // Allows creating a task that is already completed
      newTaskDataForFirestore.completedAt = Timestamp.fromDate(new Date(completedAt));
    }

    const docRef = await addDoc(tasksCollection, newTaskDataForFirestore);
    
    revalidatePath('/');

    // Return a representation of the task; server-generated timestamps are approximated.
    return {
      ...taskData, // This includes original string dates if they were part of input
      id: docRef.id,
      createdAt: new Date().toISOString(), // Approximation
      updatedAt: new Date().toISOString(), // Approximation
    } as Task;

  } catch (error) {
    console.error("Error creating task in Firestore:", error);
    throw new Error('Failed to create task in Firestore.');
  }
}

// Interface for the data structure used to update tasks in Firestore
interface UpdateTaskFirestorePayload {
  status: Task['status'];
  updatedAt: FieldValue;
  completedAt?: FieldValue | null; // Can be serverTimestamp() or null
  // other fields can be added here if they are updatable
}

export async function updateTaskStatus(taskId: string, status: Task['status']): Promise<Task | null> {
  console.log("Server Action: updateTaskStatus called for task:", taskId, "to status:", status);
  try {
    const taskDocRef = doc(db, TASKS_COLLECTION, taskId);
    
    const updateDataForFirestore: UpdateTaskFirestorePayload = {
      status: status,
      updatedAt: serverTimestamp(),
    };

    if (status === 'completed') {
      updateDataForFirestore.completedAt = serverTimestamp();
    } else {
      // If the task is being moved to any status other than 'completed',
      // set completedAt to null. This handles reopening tasks or correcting mistakes.
      updateDataForFirestore.completedAt = null; 
      // If you wanted to completely remove the field, you would use:
      // updateDataForFirestore.completedAt = deleteField(); 
      // But null is often sufficient and simpler.
    }
    
    await updateDoc(taskDocRef, updateDataForFirestore as any); // Using 'as any' for updateDoc with potentially 'null' values for FieldValue types
    revalidatePath('/'); 

    // For returning the updated task, ideally, fetch it again.
    // Returning a simplified object for now.
    // const updatedDoc = await getDoc(taskDocRef);
    // if (updatedDoc.exists()) {
    //   return { ...convertTimestamps(updatedDoc.data()), id: updatedDoc.id } as Task;
    // }
    return { id: taskId, status } as Partial<Task> as Task; // Simplified return
  } catch (error) {
    console.error("Error updating task status in Firestore:", error);
    throw new Error('Failed to update task status in Firestore.');
  }
}
