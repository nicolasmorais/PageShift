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
import { RouteCard } from '@/components/dashboard/RouteCard'; // Importando o novo componente
import { cn } from '@/lib/utils';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const skeletonBg = 'bg-[#1e293b]';
  const cardBg = 'bg-[#0f172a]';
  const borderColor = 'border-[#1e293b]';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={cn(cardBg, borderColor, "rounded-lg shadow-sm border p-6 flex flex-col space-y-6")}>
          <div className="flex-grow space-y-4">
            <Skeleton className={cn("h-4 w-1/3", skeletonBg)} />
            <Skeleton className={cn("h-10 w-full", skeletonBg)} />
            <Skeleton className={cn("h-4 w-1/4", skeletonBg)} />
            <Skeleton className={cn("h-10 w-full", skeletonBg)} />
            <Skeleton className={cn("h-4 w-1/3", skeletonBg)} />
            <Skeleton className={cn("h-10 w-full", skeletonBg)} />
          </div>
          <div className="flex justify-end pt-4 border-t border-[#1e293b]">
            <Skeleton className={cn("h-8 w-20", skeletonBg)} />
          </div>
        </div>
      ))}
    </div>
  );
};


export default function DashboardPage() {
  const [routes, setRoutes] = useState<RouteMapping[]>([]);
  const [contentOptions, setContentOptions] = useState<ContentOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterContentId, setFilterContentId] = useState('all');

  const baseOptions: ContentOption[] = [
    { id: 'v1', name: 'Advertorial V1' },
    { id: 'v2', name: 'Advertorial V2' },
    { id: 'v3', name: 'Advertorial V3' },
    { id: 'ap', name: 'Página de Aprovação (AP)' },
  ];

  const fetchRoutesAndContent = async () => {
    setIsLoading(true);
    try {
      const [routesRes, customAdvRes] = await Promise.all([
        fetch('/api/routes'),
        fetch('/api/custom-advertorials'),
      ]);

      if (!routesRes.ok || !customAdvRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const routesData = await routesRes.json();
      const customAdvData: { id: string, name: string }[] = await customAdvRes.json();

      const dynamicOptions: ContentOption[] = customAdvData.map(adv => ({
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

  const handleSaveRoute = async (path: string, contentId: string) => {
    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, contentId }),
      });
      if (!response.ok) throw new Error('Failed to save');
      toast.success(`Rota ${path} atualizada com sucesso!`);
      // Refetch all data to ensure consistency
      fetchRoutesAndContent();
    } catch (error) {
      toast.error(`Falha ao atualizar a rota ${path}.`);
    }
  };
  
  // A função onDelete não será implementada agora, pois requer lógica complexa de remoção de rotas fixas.
  const handleDeleteRoute = async (path: string, name: string) => {
    toast.warning(`A exclusão da rota ${name} (${path}) não é suportada pela API atual.`);
  };

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          route.path.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterContentId === 'all' || route.contentId === filterContentId;

    return matchesSearch && matchesFilter;
  });

  // Cores ajustadas: Card #0f172a, Borda #1e293b, Input #00030a
  const cardBg = 'bg-[#0f172a]';
  const borderColor = 'border-[#1e293b]';
  const inputBg = 'bg-[#00030a]';
  const selectContentBg = 'bg-[#00030a]';

  return (
    <>
      <Toaster richColors />
      
      <header className="mb-8 pt-4">
        <h1 className="text-3xl font-bold text-white">Gerenciamento de Rotas</h1>
        <p className="mt-1 text-zinc-400">Controle qual conteúdo é exibido para cada rota (URL) do seu site.</p>
      </header>

      {/* Filtros e Pesquisa */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <Input 
            aria-label="Pesquisar rota" 
            className={cn("w-full pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#0bc839] focus:border-[#0bc839] transition-colors text-white", inputBg, borderColor)} 
            placeholder="Pesquisar por nome ou caminho..." 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative w-full sm:w-56">
          <Select value={filterContentId} onValueChange={setFilterContentId}>
            <SelectTrigger className={cn("w-full sm:w-56 appearance-none pl-4 pr-10 py-2.5 rounded-lg focus:ring-2 focus:ring-[#0bc839] focus:border-[#0bc839] transition-colors text-white", inputBg, borderColor)}>
              <Filter className="h-5 w-5 text-zinc-500 mr-2" />
              <SelectValue placeholder="Filtrar por conteúdo" />
            </SelectTrigger>
            <SelectContent className={cn(selectContentBg, "text-white", borderColor)}>
              <SelectItem value="all" className="focus:bg-[#0f172a]">Todos os Conteúdos</SelectItem>
              {contentOptions.map(opt => (
                <SelectItem key={opt.id} value={opt.id} className="focus:bg-[#0f172a]">
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
          <Card className={cn(cardBg, borderColor, "col-span-full text-center p-8 text-zinc-400")}>
            <CardTitle className="text-xl">Nenhuma rota encontrada</CardTitle>
            <CardDescription className="mt-2 text-zinc-500">Ajuste os filtros ou a pesquisa.</CardDescription>
          </Card>
        ) : (
          filteredRoutes.map(route => (
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