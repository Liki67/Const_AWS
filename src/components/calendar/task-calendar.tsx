'use client';
import type { Task } from '@/types';
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format, isSameDay, parseISO } from 'date-fns';

interface TaskCalendarProps {
  tasks: Task[];
}

export function TaskCalendar({ tasks }: TaskCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const tasksForSelectedDate = selectedDate
    ? tasks.filter(task => task.dueDate && isSameDay(parseISO(task.dueDate), selectedDate))
    : [];

  const taskDueDates = tasks.map(task => task.dueDate ? parseISO(task.dueDate) : undefined).filter(Boolean) as Date[];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Task Calendar</CardTitle>
        <CardDescription>Overview of task deadlines and assignments.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{ due: taskDueDates }}
            modifiersClassNames={{ due: 'border-primary border-2 rounded-md' }}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Tasks for {selectedDate ? format(selectedDate, 'PPP') : 'selected date'}
          </h3>
          {tasksForSelectedDate.length > 0 ? (
            <ScrollArea className="h-[300px] pr-4">
              <ul className="space-y-3">
                {tasksForSelectedDate.map(task => (
                  <li key={task.id} className="p-3 border rounded-md bg-card hover:bg-accent/10">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">Assigned to: {task.assignedTo || 'Unassigned'}</p>
                    <Badge variant={task.status === 'completed' ? 'default' : 'secondary'} className={`mt-1 ${task.status === 'completed' ? 'bg-accent text-accent-foreground' : ''}`}>
                      {task.status.replace('-', ' ')}
                    </Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <p className="text-muted-foreground">No tasks due on this day.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
