"use client";

import Link from "next/link";
import { Settings, Wand2, LayoutGrid, Zap, BarChart, Activity } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/auth/LogoutButton"; // Importando o botão de logout

const mainNavItems = [
  {
    href: "/dashboard",
    icon: Settings,
    label: "Route Control",
  },
  { // NEW: Status link
    href: "/dashboard/status",
    icon: Activity,
    label: "Status do Sistema",
  },
  { // Analytics link
    href: "/dashboard/analytics",
    icon: BarChart,
    label: "Analytics",
  },
];

const pagesNavItems = [
  {
    href: "/dashboard/approval-page",
    icon: Wand2,
    label: "Página de Aprovação",
  },
  {
    href: "/dashboard/custom-advertorials",
    icon: LayoutGrid,
    label: "Meus Advertoriais",
  },
];

const trackingNavItems = [ // Nova seção de rastreamento
  {
    href: "/dashboard/pixels",
    icon: Zap,
    label: "Gerenciamento de Pixels",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const LOGO_URL = "https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/94e94392-0815-4bb4-9cfa-ca4362c3495f%20%281%29-cQ9d9YZNOknrfYOmNv38Sj0LQVfjHp.png";

  // Cores do Modo Claro (Padrão)
  const lightBg = 'bg-white';
  const lightActiveBg = 'bg-gray-100'; // Fundo ativo
  const lightBorderColor = 'border-gray-200';
  const lightTextColor = 'text-gray-600';
  const lightActiveTextColor = 'text-gray-900';

  // Cores do Modo Escuro (Dark Mode)
  const darkBg = 'dark:bg-[#0f172a]';
  const darkActiveBg = 'dark:bg-[#1e293b]'; // Fundo ativo
  const darkBorderColor = 'dark:border-[#334155]';
  const darkTextColor = 'dark:text-zinc-400';
  const darkActiveTextColor = 'dark:text-zinc-50';

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href;
    
    // Base classes
    let classes = "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all";

    // Light Mode (Default text color)
    classes += ` ${lightTextColor}`;
    
    if (isActive) {
        // Active styles
        classes += ` ${lightActiveBg} ${lightActiveTextColor}`;
    } else {
        // Ensure no hover effect is applied
        classes += ` hover:bg-transparent hover:text-gray-600`; // Mantém a cor padrão no hover
    }

    // Dark Mode (Default text color)
    classes += ` ${darkTextColor}`;
    if (isActive) {
        // Active styles
        classes += ` ${darkActiveBg} ${darkActiveTextColor}`;
    } else {
        // Ensure no hover effect is applied
        classes += ` dark:hover:bg-transparent dark:hover:text-zinc-400`; // Mantém a cor padrão no hover
    }

    return classes;
  };

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r sm:flex", 
      lightBg, lightBorderColor, lightTextColor,
      darkBg, darkBorderColor, darkTextColor
    )}>
      <div className={cn("flex h-20 items-center justify-center px-6")}>
        <Link href="/dashboard">
          <img
            src={LOGO_URL}
            alt="PageShift Logo"
            className="h-12"
          />
        </Link>
      </div>
      <nav className="flex-1 space-y-4 p-4">
        <div>
          <h3 className={cn("mb-2 px-3 text-xs font-semibold uppercase", lightTextColor, darkTextColor)}>
            Principal
          </h3>
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getLinkClasses(item.href)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className={cn("mb-2 px-3 text-xs font-semibold uppercase", lightTextColor, darkTextColor)}>
            Páginas
          </h3>
          <div className="space-y-1">
            {pagesNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getLinkClasses(item.href)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        {/* Tracking Section */}
        <div>
          <h3 className={cn("mb-2 px-3 text-xs font-semibold uppercase", lightTextColor, darkTextColor)}>
            Rastreamento
          </h3>
          <div className="space-y-1">
            {trackingNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getLinkClasses(item.href)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Botão de Logout no final da Sidebar */}
      <div className="p-4 border-t border-gray-200 dark:border-[#334155]">
        <LogoutButton />
      </div>
    </aside>
  );
};