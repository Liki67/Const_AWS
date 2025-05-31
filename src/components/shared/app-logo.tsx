import { Building } from 'lucide-react';

export function AppLogo({ size = 'md', textColor = 'text-primary' }: { size?: 'sm' | 'md' | 'lg'; textColor?: string }) {
  const textSizeClass = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl';
  const iconSize = size === 'sm' ? 5 : size === 'md' ? 6 : 7;

  return (
    <div className="flex items-center gap-2">
      <Building className={`h-${iconSize} w-${iconSize} ${textColor}`} />
      <h1 className={`${textSizeClass} font-bold ${textColor}`}>Constructify</h1>
    </div>
  );
}

export function SidebarLogo() {
   return (
    <div className="flex items-center gap-2 p-1">
       <Building className="h-7 w-7 text-sidebar-primary-foreground" />
       <h1 className="text-2xl font-bold text-sidebar-primary-foreground group-data-[collapsible=icon]:hidden">
         Constructify
       </h1>
    </div>
   );
}
