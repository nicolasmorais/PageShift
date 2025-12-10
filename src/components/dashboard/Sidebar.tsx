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

  // Cores ajustadas: Fundo #00030a, Hover/Ativo #0f172a, Borda #1e293b
  const sidebarBg = 'bg-[#00030a]';
  const hoverActiveBg = 'bg-[#0f172a]';
  const borderColor = 'border-[#1e293b]';

  return (
    <aside className={cn("fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r text-white sm:flex", sidebarBg, borderColor)}>
      <div className={cn("flex h-20 items-center justify-center border-b px-6", borderColor)}>
        <Link href="/dashboard">
          <img
            src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/94e94392-0815-4bb4-9cfa-ca4362c3495f-zzhjEezm98VoMWqEUpkxkCiEYvH7rp.png"
            alt="PageShift Logo"
            className="h-12"
          />
        </Link>
      </div>
      <nav className="flex-1 space-y-4 p-4">
        <div>
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-zinc-400">
            Principal
          </h3>
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-all hover:text-zinc-50",
                  `hover:${hoverActiveBg}`,
                  pathname === item.href && `${hoverActiveBg} text-zinc-50`
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-zinc-400">
            Páginas
          </h3>
          <div className="space-y-1">
            {pagesNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-400 transition-all hover:text-zinc-50",
                  `hover:${hoverActiveBg}`,
                  pathname === item.href && `${hoverActiveBg} text-zinc-50`
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