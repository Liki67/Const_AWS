'use client';
import type { UserRole } from '@/types';
import { AppLogo } from '@/components/shared/app-logo';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Menu } from 'lucide-react';

interface AppHeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function AppHeader({ currentRole, onRoleChange }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <div className="md:hidden">
        <SidebarTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SidebarTrigger>
      </div>
      <div className="hidden md:block">
        <AppLogo size="md" />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Select value={currentRole} onValueChange={(value) => onRoleChange(value as UserRole)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="engineer">Engineer</SelectItem>
            <SelectItem value="contractor">Contractor</SelectItem>
            <SelectItem value="worker">Worker</SelectItem>
          </SelectContent>
        </Select>
        {/* User profile dropdown could go here */}
      </div>
    </header>
  );
}
