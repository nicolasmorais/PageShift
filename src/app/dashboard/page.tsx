"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Route, Plus, RefreshCw, Layout, Search, Globe, Activity, Zap, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CreateRouteDialog } from '@/components/dashboard/CreateRouteDialog';
import { UTMLinkGenerator } from '@/components/dashboard/UTMLinkGenerator';
import { RouteCard } from '@/components/dashboard/RouteCard';
import { AutoRouteManager } from '@/components/dashboard/AutoRouteManager';
import { Input } from '@/components/ui/input';

interface CustomAdvertorial {
  id: string;
  name: string;
}

interface ExistingRoute {
  path: string;
  name: string;
  contentId: string;
}

interface AutoRoute {
  [slug: string]: string;
}

const STATIC_CONTENT_OPTIONS: CustomAdvertorial[] = [
    { id: 'v1', name: 'Advertorial V1 (Original)' },
    { id: 'v2', name: 'Advertorial V2' },
    { id: 'v3', name: 'Advertorial V3' },
    { id: 'ap', name: 'Página de Aprovação (AP)' },
    { id: 'menopausa', name: 'Menopausa Nunca Mais' },
];

export default function DashboardPage() {
  const [advertorials, setAdvertorials] = useState<CustomAdvertorial[]>([]);
  const [existingRoutes, setExistingRoutes] = useState<ExistingRoute[]>([]);
  const [autoRoutes, setAutoRoutes] = useState<AutoRoute>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');

  const allContentOptions = [...STATIC_CONTENT_OPTIONS, ...advertorials];

  const fetchAllData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const [advRes, routeRes, autoRouteRes] = await Promise.all([
        fetch('/api/custom-advertorials'),
        fetch('/api/routes'),
        fetch('/api/auto-routes')
      ]);

      const routeData = await routeRes.json();
      const advData = await advRes.json();
      const autoRouteData = await autoRouteRes.json();

      setAdvertorials(advData);
      setExistingRoutes(routeData);
      setAutoRoutes(autoRouteData);
    } catch (error: any) {
      toast.error(`Falha ao carregar os dados.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const filteredRoutes = useMemo(() => {
    return existingRoutes.filter(r => 
        r.path.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [existingRoutes, searchQuery]);

  const handleSaveRoute = async (path: string, contentId: string, name?: string): Promise<void> => {
    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, contentId, name }),
      });
      if (!response.ok) throw new Error('Failed to save route');
      toast.success(`Rota atualizada!`);
      fetchAllData();
    } catch (error) {
      toast.error("Falha ao salvar.");
    }
  };

  const handleDeleteRoute = async (path: string, name: string): Promise<void> => {
    if (!window.confirm(`Excluir rota: ${name}?`)) return;
    try {
      const response = await fetch('/api/routes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });
      if (!response.ok) throw new Error('Failed to delete');
      toast.success(`Rota removida.`);
      fetchAllData();
    } catch (error) {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      
      <div className="max-w-[1400px] mx-auto space-y-10 pb-20">
        
        {/* Modern Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              Route Control 
              <span className="text-xs bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-1 rounded-full font-bold uppercase tracking-widest">Enterprise</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                Gerenciamento centralizado de tráfego e redirecionamentos inteligentes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <UTMLinkGenerator />
            <Button onClick={fetchAllData} variant="outline" className="h-12 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold px-6">
                <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
                Sincronizar
            </Button>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl text-blue-600">
                    <Globe size={28} />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Rotas Mapeadas</p>
                    <p className="text-3xl font-black">{existingRoutes.length + Object.keys(autoRoutes).length}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl text-purple-600">
                    <Zap size={28} />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Automáticos</p>
                    <p className="text-3xl font-black">{Object.keys(autoRoutes).length}</p>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl text-green-600">
                    <Activity size={28} />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Status do Banco</p>
                    <p className="text-xl font-black text-green-600 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        Conectado
                    </p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* Main Action Area: Auto Routes & Management */}
          <div className="xl:col-span-8 space-y-10">
            <section className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-black flex items-center gap-3">
                        <Zap className="text-yellow-500" /> Redirecionamentos Instantâneos
                    </h2>
                </div>
                <AutoRouteManager 
                    autoRoutes={autoRoutes}
                    contentOptions={allContentOptions}
                    onRefresh={fetchAllData}
                />
            </section>
          </div>

          {/* Side Area: Fixed/Legacy Routes */}
          <div className="xl:col-span-4 space-y-6">
            <div className="bg-slate-900 dark:bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Route size={120} />
                </div>
                <h2 className="text-2xl font-black mb-2 relative z-10">Rotas Fixas</h2>
                <p className="text-slate-400 mb-8 relative z-10 font-medium">URLs permanentes configuradas no banco de dados.</p>
                
                <div className="space-y-4 relative z-10">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input 
                            placeholder="Buscar rota..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/10 border-white/10 text-white placeholder:text-slate-500 h-12 rounded-2xl pl-10 focus:ring-purple-500"
                        />
                    </div>
                    
                    <CreateRouteDialog 
                        contentOptions={allContentOptions}
                        onRouteCreated={fetchAllData}
                    />
                </div>

                <div className="mt-10 space-y-4 relative z-10 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-32 w-full rounded-3xl bg-white/5" />
                        ))
                    ) : filteredRoutes.length === 0 ? (
                        <div className="text-center py-10 opacity-30">
                            <p className="text-sm">Nenhuma rota fixa.</p>
                        </div>
                    ) : (
                        filteredRoutes.map((route) => (
                            <div key={route.path} className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-3xl p-5 transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-mono text-xs text-purple-400 font-bold">{route.path}</span>
                                    <div className="flex gap-2">
                                        <Link href={route.path} target="_blank">
                                            <ArrowUpRight size={16} className="text-slate-500 hover:text-white transition-colors" />
                                        </Link>
                                    </div>
                                </div>
                                <RouteCard
                                    route={route}
                                    contentOptions={allContentOptions}
                                    onSave={handleSaveRoute}
                                    onDelete={handleDeleteRoute}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}