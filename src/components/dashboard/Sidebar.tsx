"use client";

import Link from "next/link";
import { Settings, Wand2, LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mainNavItems = [
  {
    href: "/dashboard",
    icon: Settings,
    label: "Gerenciamento de Rotas",
  },
];

const pagesNavItems = [
  {
    href: "/dashboard/approval-page",
    icon: Wand2,
    label: "Editor da Página AP",
  },
  {
    href: "/dashboard/custom-advertorials",
    icon: LayoutGrid,
    label: "Advertoriais Dinâmicos",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const LOGO_URL = "https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/94e94392-0815-4bb4-9cfa-ca4362c3495f%20%281%29-cQ9d9YZNOknrfYOmNv38Sj0LQVfjHp.png";

  // Cores do Modo Claro (Padrão)
  const lightBg = 'bg-white';
  const lightHoverActiveBg = 'bg-gray-100';
  const lightBorderColor = 'border-gray-200';
  const lightTextColor = 'text-gray-600';
  const lightActiveTextColor = 'text-gray-900';

  // Cores do Modo Escuro (Dark Mode - O esquema anterior)
  const darkBg = 'dark:bg-[#0f172a]';
  const darkHoverActiveBg = 'dark:bg-[#1e293b]';
  const darkBorderColor = 'dark:border-[#334155]';
  const darkTextColor = 'dark:text-zinc-400';
  const darkActiveTextColor = 'dark:text-zinc-50';

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r sm:flex", 
      lightBg, lightBorderColor, lightTextColor,
      darkBg, darkBorderColor, darkTextColor
    )}>
      <div className={cn("flex h-20 items-center justify-center border-b px-6", lightBorderColor, darkBorderColor)}>
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
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                  // Light Mode
                  lightTextColor, lightHoverActiveBg, 'hover:text-gray-900',
                  pathname === item.href && `${lightHoverActiveBg} ${lightActiveTextColor}`,
                  // Dark Mode
                  darkTextColor, darkHoverActiveBg, 'dark:hover:text-zinc-50',
                  pathname === item.href && `${darkHoverActiveBg} ${darkActiveTextColor}`
                )}
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
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                  // Light Mode
                  lightTextColor, lightHoverActiveBg, 'hover:text-gray-900',
                  pathname === item.href && `${lightHoverActiveBg} ${lightActiveTextColor}`,
                  // Dark Mode
                  darkTextColor, darkHoverActiveBg, 'dark:hover:text-zinc-50',
                  pathname === item.href && `${darkHoverActiveBg} ${darkActiveTextColor}`
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};