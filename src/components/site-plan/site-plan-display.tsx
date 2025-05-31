'use client';
import type { SitePlan, Task, UserRole } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

interface SitePlanDisplayProps {
  sitePlan: SitePlan;
  tasks: Task[];
  currentRole: UserRole;
}

const statusColors: Record<Task['status'], string> = {
  'not-started': 'border-red-500 bg-red-500/20',
  'in-progress': 'border-blue-500 bg-blue-500/20',
  'completed': 'border-green-500 bg-green-500/20',
  'pending-verification': 'border-yellow-500 bg-yellow-500/20',
};

export function SitePlanDisplay({ sitePlan, tasks, currentRole }: SitePlanDisplayProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const relevantAnnotations = sitePlan.annotations.filter(annotation => {
    if (currentRole === 'engineer') return true;
    const task = tasks.find(t => t.id === annotation.taskId);
    if (!task) return false;
    if (currentRole === 'contractor') return task.assigneeRole === 'contractor' || task.assigneeRole === 'worker';
    if (currentRole === 'worker') return task.assigneeRole === 'worker';
    return false;
  });

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{sitePlan.name}</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setScale(s => Math.max(0.5, s - 0.1))}><ZoomOut className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon" onClick={() => setScale(s => Math.min(3, s + 0.1))}><ZoomIn className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon" onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }}><RotateCcw className="h-4 w-4" /></Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden border rounded-md relative w-full aspect-[4/3] bg-muted-foreground/10">
          <div
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
            style={{ transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`, transition: 'transform 0.1s ease-out' }}
            // Basic drag functionality could be added here with onMouseDown, onMouseMove, onMouseUp
          >
            <Image
              src={sitePlan.imageUrl}
              alt={sitePlan.name}
              layout="fill"
              objectFit="contain"
              data-ai-hint="blueprint construction"
            />
            {relevantAnnotations.map(annotation => {
              const task = tasks.find(t => t.id === annotation.taskId);
              const taskStatus = task?.status || 'not-started';
              return (
                <div
                  key={annotation.zoneId}
                  className={`absolute border-2 rounded ${statusColors[taskStatus]} p-1 text-xs shadow-md`}
                  style={{
                    left: `${annotation.coordinates.x / 8}%`, // Assuming image width is 800px for percentage
                    top: `${annotation.coordinates.y / 6}%`,  // Assuming image height is 600px for percentage
                    width: `${annotation.coordinates.width / 8}%`,
                    height: `${annotation.coordinates.height / 6}%`,
                  }}
                  title={`${annotation.label}${task ? ` (${task.title} - ${taskStatus.replace('-', ' ')})` : ''}`}
                >
                  <Badge variant="secondary" className="opacity-80 truncate ">{annotation.label}</Badge>
                  {task && <p className="text-[10px] truncate font-semibold">{task.title}</p>}
                </div>
              );
            })}
          </div>
        </div>
         <div className="mt-4">
          <h4 className="font-semibold mb-2">Legend:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statusColors).map(([status, className]) => (
              <div key={status} className="flex items-center gap-1 text-xs">
                <span className={`h-3 w-3 rounded-sm border ${className.split(' ')[0]} ${className.split(' ')[1]?.replace('/20', '/50')}`}></span>
                {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
