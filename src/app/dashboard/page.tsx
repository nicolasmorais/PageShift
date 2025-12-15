"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { RouteCard } from '@/components/dashboard/RouteCard';
import { CreateRouteDialog } from '@/components/dashboard/CreateRouteDialog';
import { cn } from '@/lib/utils';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

interface RouteMapping {
  path: string;
  contentId: string;
  name: string;
}

interface ContentOption {
  id: string;
  name: string;
}

const LoadingSkeleton = () => {
  const darkSkeletonBg = 'dark:bg-[#334155]';
  const darkCardBg = 'dark:bg-[#1e293b]';
  const darkBorderColor = 'dark:border-[#334155]';
  const lightCardBg = 'bg-white';
  const lightBorderColor = 'border-gray-200';
  const lightSkeletonBg = 'bg-gray-200';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i: number) => (
        <div key={i} className={cn(lightCardBg, lightBorderColor, darkCardBg, darkBorderColor, "rounded-lg shadow-sm border p-6 flex flex-col space-y-6")}>
          <div className="flex-grow space-y-4">
            <Skeleton className={cn("h-4 w-1/3", lightSkeletonBg, darkSkeletonBg)} />
            <Skeleton className={cn("h-10 w-full", lightSkeletonBg, darkSkeletonBg)} />
            <Skeleton className={cn("h-4 w-1/4", lightSkeletonBg, darkSkeletonBg)} />
            <Skeleton className={cn("h-10 w-full", lightSkeletonBg, darkSkeletonBg)} />
            <Skeleton className={cn("h-4 w-1/3", lightSkeletonBg, darkSkeletonBg)} />
            <Skeleton className={cn("h-10 w-full", lightSkeletonBg, darkSkeletonBg)} />
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-[#334155]">
            <Skeleton className={cn("h-8 w-20", lightSkeletonBg, darkSkeletonBg)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const [routes, setRoutes] = useState<RouteMapping[]>([]);
  const [contentOptions, setContentOptions] = useState<ContentOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterContentId, setFilterContentId] = useState<string>('all');

  const baseOptions: ContentOption[] = [
    { id: 'v1', name: 'Advertorial V1' },
    { id: 'v2', name: 'Advertorial V2' },
    { id: 'v3', name: 'Advertorial V3' },
    { id: 'ap', name: 'Página de Aprovação (AP)' },
  ];

  const fetchRoutesAndContent = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const [routesRes, customAdvRes] = await Promise.all([
        fetch('/api/routes'),
        fetch('/api/custom-advertorials'),
      ]);

      if (!routesRes.ok || !customAdvRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const routesData: RouteMapping[] = await routesRes.json();
      const customAdvData: { id: string, name: string }[] = await customAdvRes.json();

      const dynamicOptions: ContentOption[] = customAdvData.map((adv: { id: string, name: string }) => ({
        id: adv.id,
        name: `Dinâmico: ${adv.name}`,
      }));

      setRoutes(routesData);
      setContentOptions([...baseOptions, ...dynamicOptions]);

    } catch (error) {
      toast.error("Falha ao carregar rotas ou conteúdos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutesAndContent();
  }, []);

  const handleSaveRoute = async (path: string, contentId: string): Promise<void> => {
    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, contentId }),
      });
      if (!response.ok) throw new Error('Failed to save');
      toast.success(`Rota ${path} atualizada com sucesso!`);
      await fetchRoutesAndContent();
    } catch (error) {
      toast.error(`Falha ao atualizar a rota ${path}.`);
    }
  };
  
  const handleDeleteRoute = async (path: string, name: string): Promise<void> => {
    toast.warning(`A exclusão da rota ${name} (${path}) não é suportada pela API atual.`);
  };

  const filteredRoutes = routes.filter((route: RouteMapping) => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          route.path.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterContentId === 'all' || route.contentId === filterContentId;

    return matchesSearch && matchesFilter;
  });

  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
  const selectContentBg = 'bg-white dark:bg-[#1e293b]'; 
  const primaryButtonClasses = 'bg-[#38bdf8] hover:bg-[#0ea5e9] text-white';

  return (
    <>
      <Toaster richColors />
      
      <DashboardHeader />
      
      <header className="mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciamento de Rotas</h1>
            <p className="mt-1 text-gray-500 dark:text-zinc-400">Controle qual conteúdo é exibido para cada rota (URL) do seu site.</p>
        </div>
        <CreateRouteDialog 
            contentOptions={contentOptions} 
            onRouteCreated={fetchRoutesAndContent} 
        />
      </header>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-zinc-500" />
          <Input 
            aria-label="Pesquisar rota" 
            className={cn("w-full pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#38bdf8] focus:border-[#38bdf8] transition-colors text-gray-900 dark:text-white", inputBg, borderColor)} 
            placeholder="Pesquisar por nome ou caminho..." 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative w-full sm:w-56">
          <Select value={filterContentId} onValueChange={setFilterContentId}>
            <SelectTrigger className={cn("w-full sm:w-56 appearance-none pl-4 pr-10 py-2.5 rounded-lg focus:ring-2 focus:ring-[#38bdf8] focus:border-[#38bdf8] transition-colors text-gray-900 dark:text-white", inputBg, borderColor)}>
              <Filter className="h-5 w-5 text-gray-500 dark:text-zinc-500 mr-2" />
              <SelectValue placeholder="Filtrar por conteúdo" />
            </SelectTrigger>
            <SelectContent className={cn(selectContentBg, "text-gray-900 dark:text-white", borderColor)}>
              <SelectItem value="all" className="focus:bg-gray-100 dark:focus:bg-[#1e293b]">Todos os Conteúdos</SelectItem>
              {contentOptions.map((opt: ContentOption) => (
                <SelectItem key={opt.id} value={opt.id} className="focus:bg-gray-100 dark:focus:bg-[#1e293b]">
                  {opt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredRoutes.length === 0 ? (
          <Card className={cn(cardBg, borderColor, "col-span-full text-center p-8 text-gray-500 dark:text-zinc-400")}>
            <CardTitle className="text-xl text-gray-900 dark:text-white">Nenhuma rota encontrada</CardTitle>
            <CardDescription className="mt-2 text-gray-500 dark:text-zinc-500">Ajuste os filtros ou a pesquisa.</CardDescription>
          </Card>
        ) : (
          filteredRoutes.map((route: RouteMapping) => (
            <RouteCard 
              key={route.path} 
              route={route} 
              onSave={handleSaveRoute} 
              onDelete={handleDeleteRoute}
              contentOptions={contentOptions}
            />
          ))
        )}
      </main>
    </>
  );
}