import type { Task } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertCircle, Circle, Clock, UserCircle, CalendarDays, Paperclip } from 'lucide-react';
import Image from 'next/image';

interface TaskCardProps {
  task: Task;
}

const statusIcons = {
  'not-started': <AlertCircle className="h-4 w-4 text-destructive" />,
  'in-progress': <Clock className="h-4 w-4 text-blue-500" />,
  'completed': <CheckCircle2 className="h-4 w-4 text-accent" />,
  'pending-verification': <Circle className="h-4 w-4 text-yellow-500" />,
};

const statusColors: Record<Task['status'], string> = {
  'not-started': 'bg-red-100 text-red-800 border-red-300',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
  'completed': 'bg-green-100 text-green-800 border-green-300',
  'pending-verification': 'bg-yellow-100 text-yellow-800 border-yellow-300',
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <Badge variant="outline" className={`${statusColors[task.status]}`}>
            {statusIcons[task.status]}
            <span className="ml-1">{task.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
          </Badge>
        </div>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        {task.assignedTo && (
          <div className="flex items-center text-sm text-muted-foreground">
            <UserCircle className="h-4 w-4 mr-2" />
            Assigned to: {task.assignedTo} ({task.assigneeRole})
          </div>
        )}
        {task.dueDate && (
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 mr-2" />
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
        {task.completionPhotoUrl && (
          <div className="mt-2">
            <p className="text-sm font-medium mb-1">Completion Photo:</p>
            <Image 
              src={task.completionPhotoUrl} 
              alt={`Completion photo for ${task.title}`} 
              width={300} 
              height={200} 
              className="rounded-md object-cover"
              data-ai-hint="task completion" 
            />
          </div>
        )}
        {task.comments && (
          <p className="text-sm text-muted-foreground italic mt-1">"{task.comments}"</p>
        )}
      </CardContent>
      <CardFooter>
        {task.sitePlanZone && (
          <Badge variant="secondary">Zone: {task.sitePlanZone}</Badge>
        )}
      </CardFooter>
    </Card>
  );
}
