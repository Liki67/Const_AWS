
export type UserRole = 'engineer' | 'contractor' | 'worker';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'pending-verification';
  assignedTo?: string; // User ID or Name
  assigneeRole?: UserRole;
  dueDate?: string; // ISO Date string
  completedAt?: string; // ISO Date string
  createdAt?: string; // ISO Date string
  updatedAt?: string; // ISO Date string
  completionPhotoUrl?: string;
  comments?: string;
  sitePlanZone?: string; // ID or coordinates for site plan
}

export interface SitePlan {
  id: string;
  name: string;
  imageUrl: string;
  annotations: Array<{
    zoneId: string;
    taskId?: string;
    label: string;
    coordinates: { x: number; y: number; width: number; height: number };
    status?: 'not-started' | 'in-progress' | 'completed';
  }>;
}

export interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  status?: 'available' | 'low-stock' | 'out-of-stock';
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}
