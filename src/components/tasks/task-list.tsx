import type { Task, UserRole } from '@/types';
import { TaskCard } from './task-card';

interface TaskListProps {
  tasks: Task[];
  title?: string;
  currentRole: UserRole;
}

export function TaskList({ tasks, title = "Tasks", currentRole }: TaskListProps) {
  const filteredTasks = tasks.filter(task => {
    if (currentRole === 'engineer') return true;
    if (currentRole === 'contractor') return task.assigneeRole === 'contractor' || task.assigneeRole === 'worker'; // Contractors see their tasks and worker tasks they might manage
    if (currentRole === 'worker') return task.assigneeRole === 'worker';
    return false;
  });

  const relevantTasks = filteredTasks.filter(task => {
    // For worker, only show tasks directly assigned or relevant
    if(currentRole === 'worker') return task.assignedTo && mockUsers.find(u => u.name === task.assignedTo && u.role === 'worker');
    // For contractor, show tasks assigned to them or workers
    if(currentRole === 'contractor') return (task.assignedTo && mockUsers.find(u => u.name === task.assignedTo && u.role === 'contractor')) || task.assigneeRole === 'worker';
    return true; // Engineers see all
  }).slice(0, 6); // Limit for display

  if (relevantTasks.length === 0 && currentRole !== 'engineer') {
     return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-muted-foreground">No tasks assigned to you at the moment.</p>
      </div>
     )
  }


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {relevantTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relevantTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
         <p className="text-muted-foreground">No tasks found matching current filters.</p>
      )}
    </div>
  );
}

// Minimal mockUsers needed for filtering logic within TaskList
const mockUsers = [
  { id: 'user-eng-1', name: 'Dr. Alice Smith', role: 'engineer' },
  { id: 'user-con-1', name: 'Bob Johnson', role: 'contractor' },
  { id: 'user-wrk-1', name: 'Charlie Brown', role: 'worker' },
  { id: 'user-wrk-2', name: 'Diana Prince', role: 'worker' },
];
