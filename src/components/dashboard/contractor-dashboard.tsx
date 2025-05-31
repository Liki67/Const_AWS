import type { Task, SitePlan, Material } from '@/types';
import { TaskList } from '@/components/tasks/task-list';
import { SitePlanDisplay } from '@/components/site-plan/site-plan-display';
import { TaskCalendar } from '@/components/calendar/task-calendar';
import { AiCommentRouter } from '@/components/comments/ai-comment-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PackageSearch, Download } from 'lucide-react';

interface ContractorDashboardProps {
  tasks: Task[];
  sitePlans: SitePlan[];
  materials: Material[];
  activeSection: string;
}

export function ContractorDashboard({ tasks, sitePlans, materials, activeSection }: ContractorDashboardProps) {
  const currentSitePlan = sitePlans[0] || null;

  const renderSection = () => {
    switch (activeSection) {
      case '#dashboard':
        return (
          <div className="grid gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common contractor tasks.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline"><PackageSearch className="mr-2 h-4 w-4"/> Request Materials</Button>
                <Button className="w-full" variant="outline"><Download className="mr-2 h-4 w-4"/> Download Inventory Report</Button>
              </CardContent>
            </Card>
            <TaskList tasks={tasks} title="Your Assigned Tasks" currentRole="contractor" />
          </div>
        );
      case '#tasks':
        return <TaskList tasks={tasks} title="Manage Your Tasks" currentRole="contractor" />;
      case '#site-plans':
        return currentSitePlan ? <SitePlanDisplay sitePlan={currentSitePlan} tasks={tasks} currentRole="contractor" /> : <p>No site plans relevant to your tasks.</p>;
       case '#inventory':
        return <Card><CardHeader><CardTitle>Inventory Overview</CardTitle></CardHeader><CardContent><p>View material stock levels and request history.</p><ul className="list-disc pl-5 mt-2">{materials.slice(0,5).map(m => <li key={m.id}>{m.name} ({m.quantity} {m.unit}) - <span className={`font-semibold ${m.status === 'low-stock' ? 'text-yellow-600' : m.status === 'out-of-stock' ? 'text-red-600' : 'text-green-600'}`}>{m.status}</span></li>)}</ul></CardContent></Card>;
      case '#calendar':
        return <TaskCalendar tasks={tasks.filter(t => t.assigneeRole === 'contractor' || t.assigneeRole === 'worker')} />;
      case '#ai-comments':
        return <AiCommentRouter />;
      case '#settings':
        return <Card><CardHeader><CardTitle>Settings</CardTitle></CardHeader><CardContent><p>Application settings and profile configuration.</p></CardContent></Card>;
      default:
        return <h2 className="text-xl font-semibold">Welcome, Contractor! Select a section from the sidebar.</h2>;
    }
  };
  
  return <div className="space-y-6">{renderSection()}</div>;
}
