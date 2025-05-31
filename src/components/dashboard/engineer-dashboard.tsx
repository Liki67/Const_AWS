import type { Task, SitePlan, Material } from '@/types';
import { TaskList } from '@/components/tasks/task-list';
import { SitePlanDisplay } from '@/components/site-plan/site-plan-display';
import { ProgressOverview } from '@/components/progress/progress-overview';
import { TaskCalendar } from '@/components/calendar/task-calendar';
import { AiCommentRouter } from '@/components/comments/ai-comment-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PackagePlus, Download, MessageSquarePlus } from 'lucide-react';

interface EngineerDashboardProps {
  tasks: Task[];
  sitePlans: SitePlan[];
  materials: Material[];
  activeSection: string;
}

export function EngineerDashboard({ tasks, sitePlans, materials, activeSection }: EngineerDashboardProps) {
  const currentSitePlan = sitePlans[0] || null;

  const renderSection = () => {
    switch (activeSection) {
      case '#dashboard':
        return (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            <div className="lg:col-span-2 xl:col-span-3">
              <ProgressOverview tasks={tasks} />
            </div>
            <Card className="xl:col-span-1 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common engineer tasks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline"><MessageSquarePlus className="mr-2 h-4 w-4"/> Assign Task</Button>
                <Button className="w-full" variant="outline"><PackagePlus className="mr-2 h-4 w-4"/> Manage Materials</Button>
                <Button className="w-full" variant="outline"><Download className="mr-2 h-4 w-4"/> Download Reports</Button>
              </CardContent>
            </Card>
             <div className="lg:col-span-2 xl:col-span-2">
              <TaskList tasks={tasks} title="Recent Task Updates" currentRole="engineer" />
            </div>
          </div>
        );
      case '#tasks':
        return <TaskList tasks={tasks} title="All Tasks" currentRole="engineer" />;
      case '#site-plans':
        return currentSitePlan ? <SitePlanDisplay sitePlan={currentSitePlan} tasks={tasks} currentRole="engineer" /> : <p>No site plans available.</p>;
      case '#progress':
        return <ProgressOverview tasks={tasks} />;
      case '#inventory':
        return <Card><CardHeader><CardTitle>Inventory Management</CardTitle></CardHeader><CardContent><p>Material list and management tools will be here.</p><ul className="list-disc pl-5 mt-2">{materials.slice(0,5).map(m => <li key={m.id}>{m.name} ({m.quantity} {m.unit}) - <span className={`font-semibold ${m.status === 'low-stock' ? 'text-yellow-600' : m.status === 'out-of-stock' ? 'text-red-600' : 'text-green-600'}`}>{m.status}</span></li>)}</ul> </CardContent></Card>;
      case '#calendar':
        return <TaskCalendar tasks={tasks} />;
      case '#ai-comments':
        return <AiCommentRouter />;
      case '#team':
         return <Card><CardHeader><CardTitle>Team Management</CardTitle></CardHeader><CardContent><p>Team member list and role assignments will be here.</p></CardContent></Card>;
      case '#settings':
        return <Card><CardHeader><CardTitle>Settings</CardTitle></CardHeader><CardContent><p>Application settings and profile configuration.</p></CardContent></Card>;
      default:
        return <h2 className="text-xl font-semibold">Welcome, Engineer! Select a section from the sidebar.</h2>;
    }
  };

  return <div className="space-y-6">{renderSection()}</div>;
}
