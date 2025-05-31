import type { Task, SitePlan } from '@/types';
import { TaskList } from '@/components/tasks/task-list';
import { SitePlanDisplay } from '@/components/site-plan/site-plan-display';
import { AiCommentRouter } from '@/components/comments/ai-comment-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, PackagePlusIcon, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface WorkerDashboardProps {
  tasks: Task[];
  sitePlans: SitePlan[];
  activeSection: string;
}

export function WorkerDashboard({ tasks, sitePlans, activeSection }: WorkerDashboardProps) {
  const currentSitePlan = sitePlans[0] || null; // Simplified: show first plan, needs logic for relevant plan section

  const renderSection = () => {
    switch (activeSection) {
      case '#dashboard':
        return (
          <div className="grid gap-6">
             <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Worker Actions</CardTitle>
                <CardDescription>Your daily tasks and tools.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline"><Camera className="mr-2 h-4 w-4"/> Upload Completion Photo</Button>
                <Button className="w-full" variant="outline"><PackagePlusIcon className="mr-2 h-4 w-4"/> Raise Material Request</Button>
              </CardContent>
            </Card>
            <TaskList tasks={tasks} title="Your Daily Tasks" currentRole="worker" />
          </div>
        );
      case '#tasks':
        return <TaskList tasks={tasks} title="Your Task List" currentRole="worker" />;
      case '#site-plans':
        // Workers should see only relevant sections. This is a simplified version.
        return currentSitePlan ? <SitePlanDisplay sitePlan={currentSitePlan} tasks={tasks} currentRole="worker" /> : <p>No site plan sections relevant to your tasks.</p>;
      case '#ai-comments':
        return <AiCommentRouter />;
      case '#settings':
        return <Card><CardHeader><CardTitle>Settings</CardTitle></CardHeader><CardContent><p>View your profile and preferences.</p></CardContent></Card>;
      default:
        return <h2 className="text-xl font-semibold">Welcome, Worker! Select a section from the sidebar.</h2>;
    }
  };

  return (
    <div className="space-y-6">
      <Alert variant="default" className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Using Mock Data</AlertTitle>
        <AlertDescription>
          Please note: The data displayed in this dashboard (tasks, site plans, etc.) is currently sample data for demonstration purposes. Changes are not saved persistently as no backend database is configured yet.
        </AlertDescription>
      </Alert>
      {renderSection()}
    </div>
  );
}
