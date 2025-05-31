'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { EngineerDashboard } from '@/components/dashboard/engineer-dashboard';
import { ContractorDashboard } from '@/components/dashboard/contractor-dashboard';
import { WorkerDashboard } from '@/components/dashboard/worker-dashboard';
import type { UserRole, Task, SitePlan, Material } from '@/types';
import { mockSitePlans, mockMaterials } from '@/lib/mock-data'; // mockUsers is used by TaskList directly
import { getTasks } from '@/app/tasks/actions'; // Import the server action
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const [currentRole, setCurrentRole] = useState<UserRole>('engineer');
  const [activeNavItem, setActiveNavItem] = useState<string>('#dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast({
        title: "Error Loading Tasks",
        description: "Could not fetch tasks from the server. Please try again later.",
        variant: "destructive",
      });
      setTasks([]); // Set to empty array on error
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setActiveNavItem('#dashboard'); 
  };

  const handleNavigate = (itemHref: string) => {
    setActiveNavItem(itemHref);
  };

  const renderDashboard = () => {
    if (isLoading && tasks.length === 0) { // Show skeleton only if tasks are not yet loaded
      return (
        <div className="space-y-6 p-4">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      );
    }
    switch (currentRole) {
      case 'engineer':
        return <EngineerDashboard tasks={tasks} sitePlans={mockSitePlans} materials={mockMaterials} activeSection={activeNavItem} />;
      case 'contractor':
        return <ContractorDashboard tasks={tasks} sitePlans={mockSitePlans} materials={mockMaterials} activeSection={activeNavItem} />;
      case 'worker':
        return <WorkerDashboard tasks={tasks} sitePlans={mockSitePlans} activeSection={activeNavItem} />;
      default:
        return <p>Invalid role selected.</p>;
    }
  };

  return (
    <AppLayout 
      currentRole={currentRole} 
      onRoleChange={handleRoleChange}
      activeNavItem={activeNavItem}
      onNavigate={handleNavigate}
    >
      {renderDashboard()}
    </AppLayout>
  );
}
