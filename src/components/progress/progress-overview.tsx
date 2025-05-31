
import type { Task } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, CheckCircle, ListChecks } from 'lucide-react';

interface ProgressOverviewProps {
  tasks: Task[];
}

export function ProgressOverview({ tasks }: ProgressOverviewProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const notStartedTasks = tasks.filter(task => task.status === 'not-started').length;
  const pendingVerificationTasks = tasks.filter(task => task.status === 'pending-verification').length;

  const overallCompletion = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            <span>Site Progress Overview</span>
          </div>
        </CardTitle>
        <CardDescription>A summary of task completion across the site.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-sm font-medium">Overall Completion</h4>
            <span className="text-sm font-semibold text-primary">{overallCompletion.toFixed(0)}%</span>
          </div>
          <Progress value={overallCompletion} aria-label={`Overall project completion: ${overallCompletion.toFixed(0)}%`} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <MiniStatCard title="Total Tasks" value={totalTasks} icon={<ListChecks className="text-muted-foreground"/>} />
          <MiniStatCard title="Completed" value={completedTasks} icon={<CheckCircle className="text-accent"/>} color="text-accent" />
          <MiniStatCard title="In Progress" value={inProgressTasks} icon={<ListChecks className="text-blue-500"/>} color="text-blue-500" />
          <MiniStatCard title="Pending" value={pendingVerificationTasks} icon={<ListChecks className="text-yellow-500"/>} color="text-yellow-500" />
          <MiniStatCard title="Not Started" value={notStartedTasks} icon={<ListChecks className="text-destructive"/>} color="text-destructive" />
        </div>
        
        {/* Placeholder for more detailed charts or Gantt view */}
        {/* <div className="mt-6 pt-6 border-t">
          <h4 className="text-lg font-semibold mb-2">Project Timeline (Gantt Chart Placeholder)</h4>
          <div className="h-40 bg-muted rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Gantt Chart Coming Soon</p>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
}

interface MiniStatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}

function MiniStatCard({ title, value, icon, color = 'text-foreground' }: MiniStatCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-center mb-2 opacity-70">{icon}</div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{title}</p>
      <p className={`text-2xl font-semibold ${color}`}>{value}</p>
    </Card>
  );
}
