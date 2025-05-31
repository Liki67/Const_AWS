import type { Task, SitePlan, User, Material } from '@/types';

export const mockUsers: User[] = [
  { id: 'user-eng-1', name: 'Dr. Alice Smith', role: 'engineer' },
  { id: 'user-con-1', name: 'Bob Johnson', role: 'contractor' },
  { id: 'user-wrk-1', name: 'Charlie Brown', role: 'worker' },
  { id: 'user-wrk-2', name: 'Diana Prince', role: 'worker' },
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Foundation Pouring - Section A',
    description: 'Pour concrete for foundation in Section A as per blueprint A-001. Ensure proper curing time.',
    status: 'in-progress',
    assignedTo: 'Bob Johnson',
    assigneeRole: 'contractor',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    sitePlanZone: 'zone-a',
  },
  {
    id: 'task-2',
    title: 'Install Electrical Wiring - Room 101',
    description: 'Install all necessary electrical wiring in Room 101, including outlets and fixtures.',
    status: 'not-started',
    assignedTo: 'Charlie Brown',
    assigneeRole: 'worker',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    sitePlanZone: 'zone-b-room-101',
  },
  {
    id: 'task-3',
    title: 'Perimeter Wall Construction - Phase 1',
    description: 'Construct the perimeter wall, phase 1, north side. Use type B bricks.',
    status: 'completed',
    assignedTo: 'Bob Johnson',
    assigneeRole: 'contractor',
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    completionPhotoUrl: 'https://placehold.co/600x400.png',
    comments: 'Completed ahead of schedule. Materials were sufficient.',
    sitePlanZone: 'zone-c',
  },
  {
    id: 'task-4',
    title: 'Safety Railing Installation - Floor 2 Balcony',
    description: 'Install safety railings on the second floor balcony, east wing.',
    status: 'pending-verification',
    assignedTo: 'Diana Prince',
    assigneeRole: 'worker',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date().toISOString(),
    completionPhotoUrl: 'https://placehold.co/600x400.png',
    comments: 'Task complete. Photo uploaded for verification.',
    sitePlanZone: 'zone-d-floor-2',
  },
  {
    id: 'task-5',
    title: 'Window Installation - West Wing',
    description: 'Install all windows on the west wing, ground floor.',
    status: 'not-started',
    assignedTo: 'Bob Johnson',
    assigneeRole: 'contractor',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    sitePlanZone: 'zone-e',
  },
];

export const mockSitePlans: SitePlan[] = [
  {
    id: 'plan-1',
    name: 'Main Building - Ground Floor',
    imageUrl: 'https://placehold.co/800x600.png',
    annotations: [
      { zoneId: 'zone-a', taskId: 'task-1', label: 'Section A - Foundation', coordinates: { x: 50, y: 50, width: 200, height: 150 }, status: 'in-progress' },
      { zoneId: 'zone-b-room-101', taskId: 'task-2', label: 'Room 101 - Electrical', coordinates: { x: 300, y: 100, width: 100, height: 80 }, status: 'not-started' },
      { zoneId: 'zone-c', taskId: 'task-3', label: 'Perimeter Wall - N', coordinates: { x: 50, y: 300, width: 700, height: 50 }, status: 'completed'},
      { zoneId: 'zone-d-floor-2', taskId: 'task-4', label: 'Balcony Railings F2', coordinates: { x: 600, y: 150, width: 150, height: 100 }, status: 'pending-verification' },
      { zoneId: 'zone-e', taskId: 'task-5', label: 'West Wing Windows', coordinates: { x: 50, y: 400, width: 300, height: 100 }, status: 'not-started' },
    ],
  },
];

export const mockMaterials: Material[] = [
  { id: 'mat-1', name: 'Cement Bags', quantity: 500, unit: 'bags', status: 'available' },
  { id: 'mat-2', name: 'Steel Rods 12mm', quantity: 2000, unit: 'meters', status: 'available' },
  { id: 'mat-3', name: 'Bricks Type A', quantity: 50, unit: 'pallets', status: 'low-stock' },
  { id: 'mat-4', name: 'Sand', quantity: 100, unit: 'cubic meters', status: 'available' },
  { id: 'mat-5', name: 'Safety Helmets', quantity: 5, unit: 'units', status: 'out-of-stock' },
];
