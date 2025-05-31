'use client';
import type { UserRole } from '@/types';
import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { SidebarLogo } from '@/components/shared/app-logo';
import { SidebarNav } from './sidebar-nav';
import { AppHeader } from './app-header';


interface AppLayoutProps {
  children: React.ReactNode;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeNavItem: string;
  onNavigate: (item: string) => void;
}

export function AppLayout({ 
  children, 
  currentRole, 
  onRoleChange,
  activeNavItem,
  onNavigate
}: AppLayoutProps) {
  
  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader>
          <SidebarLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav currentRole={currentRole} activeItem={activeNavItem} onNavigate={onNavigate} />
        </SidebarContent>
        <SidebarFooter>
          {/* Can add elements to footer if needed */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <AppHeader currentRole={currentRole} onRoleChange={onRoleChange} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
