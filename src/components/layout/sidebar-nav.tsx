import type { UserRole } from '@/types';
import {
  LayoutDashboard,
  ClipboardList,
  MapPinned,
  TrendingUp,
  CalendarDays,
  Users,
  Settings,
  LogOut,
  MessageSquareQuote,
  Construction,
  Package,
} from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
  tooltip?: string;
}

const navItems: NavItem[] = [
  { href: '#dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['engineer', 'contractor', 'worker'], tooltip: "Overview" },
  { href: '#tasks', label: 'Tasks', icon: ClipboardList, roles: ['engineer', 'contractor', 'worker'], tooltip: "Manage Tasks" },
  { href: '#site-plans', label: 'Site Plans', icon: MapPinned, roles: ['engineer', 'contractor', 'worker'], tooltip: "View Blueprints" },
  { href: '#progress', label: 'Progress', icon: TrendingUp, roles: ['engineer', 'contractor'], tooltip: "Track Progress" },
  { href: '#inventory', label: 'Inventory', icon: Package, roles: ['engineer', 'contractor'], tooltip: "Manage Materials" },
  { href: '#calendar', label: 'Calendar', icon: CalendarDays, roles: ['engineer', 'contractor'], tooltip: "Schedule" },
  { href: '#ai-comments', label: 'AI Comments', icon: MessageSquareQuote, roles: ['engineer', 'contractor', 'worker'], tooltip: "AI Comment Tool" },
  { href: '#team', label: 'Team Mgmt', icon: Users, roles: ['engineer'], tooltip: "Manage Team" },
  { href: '#settings', label: 'Settings', icon: Settings, roles: ['engineer', 'contractor', 'worker'], tooltip: "App Settings" },
];

interface SidebarNavProps {
  currentRole: UserRole;
  activeItem: string;
  onNavigate: (item: string) => void;
}

export function SidebarNav({ currentRole, activeItem, onNavigate }: SidebarNavProps) {
  const filteredNavItems = navItems.filter(item => item.roles.includes(currentRole));

  return (
    <SidebarMenu>
      {filteredNavItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton
            onClick={() => onNavigate(item.href)}
            isActive={activeItem === item.href}
            tooltip={item.tooltip || item.label}
            aria-label={item.label}
          >
            <item.icon />
            <span>{item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      <SidebarMenuItem className="mt-auto">
        <SidebarMenuButton onClick={() => alert('Logout clicked')} tooltip="Log Out" aria-label="Log Out">
          <LogOut />
          <span>Log Out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
