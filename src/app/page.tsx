'use client';
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { EngineerDashboard } from '@/components/dashboard/engineer-dashboard';
import { ContractorDashboard } from '@/components/dashboard/contractor-dashboard';
import { WorkerDashboard } from '@/components/dashboard/worker-dashboard';
import type { UserRole } from '@/types';
import { mockTasks, mockSitePlans, mockMaterials, mockUsers } from '@/lib/mock-data';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const [currentRole, setCurrentRole] = useState<UserRole>('engineer');
  const [activeNavItem, setActiveNavItem] = useState<string>('#dashboard'); // Default to dashboard
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data or authentication
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);
  
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setActiveNavItem('#dashboard'); // Reset to dashboard on role change
  };

  const handleNavigate = (itemHref: string) => {
    setActiveNavItem(itemHref);
  };

  const renderDashboard = () => {
    if (isLoading) {
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
        return <EngineerDashboard tasks={mockTasks} sitePlans={mockSitePlans} materials={mockMaterials} activeSection={activeNavItem} />;
      case 'contractor':
        return <ContractorDashboard tasks={mockTasks} sitePlans={mockSitePlans} materials={mockMaterials} activeSection={activeNavItem} />;
      case 'worker':
        return <WorkerDashboard tasks={mockTasks} sitePlans={mockSitePlans} activeSection={activeNavItem} />;
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
