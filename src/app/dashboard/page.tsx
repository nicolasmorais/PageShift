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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Route, ExternalLink, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CreateRouteDialog } from '@/components/dashboard/CreateRouteDialog';
import { UTMLinkGenerator } from '@/components/dashboard/UTMLinkGenerator';
import { RouteCard } from '@/components/dashboard/RouteCard';
import { AutoRouteManager } from '@/components/dashboard/AutoRouteManager';

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
  [slug: string]: string; // slug -> advertorialId
}

// Conteúdos estáticos disponíveis
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

  const allContentOptions = [...STATIC_CONTENT_OPTIONS, ...advertorials];

  const fetchAllData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      console.log("Dashboard: Buscando dados...");
      
      const [advRes, routeRes, autoRouteRes] = await Promise.all([
        fetch('/api/custom-advertorials'),
        fetch('/api/routes'),
        fetch('/api/auto-routes')
      ]);

      console.log("Dashboard: Respostas recebidas - Adv:", advRes.status, "Routes:", routeRes.status, "AutoRoutes:", autoRouteRes.status);

      if (!advRes.ok || !routeRes.ok || !autoRouteRes.ok) {
        throw new Error(`Falha ao buscar dados. Adv: ${advRes.status}, Routes: ${routeRes.status}, AutoRoutes: ${autoRouteRes.status}`);
      }

      const routeData: ExistingRoute[] = await routeRes.json();
      const advData: CustomAdvertorial[] = await advRes.json();
      const autoRouteData: AutoRoute = await autoRouteRes.json();
      
      console.log("Dashboard: Dados recebidos - Advertoriais:", advData.length, "Rotas:", routeData.length, "AutoRotas:", Object.keys(autoRouteData).length);

      setAdvertorials(advData);
      setExistingRoutes(routeData);
      setAutoRoutes(autoRouteData);

      if (advData.length === 0) {
        toast.warning("Nenhum advertorial dinâmico encontrado. Crie um novo em 'Meus Advertoriais'.");
      }

    } catch (error: any) {
      console.error("Dashboard: Erro ao buscar dados:", error);
      toast.error(`Falha ao carregar os dados: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleSaveRoute = async (path: string, contentId: string, name?: string): Promise<void> => {
    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          path, 
          contentId, 
          name: name || `Rota Personalizada: ${path}`
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save route');
      }

      const result = await response.json();
      toast.success(`Rota ${path} atualizada com sucesso!`);
      fetchAllData(); // Atualiza todos os dados
    } catch (error) {
      console.error("Erro ao salvar rota:", error);
      toast.error(error instanceof Error ? error.message : "Falha ao salvar a rota.");
      throw error; // Re-lança para que o RouteCard possa tratar
    }
  };

  const handleDeleteRoute = async (path: string, name: string): Promise<void> => {
    if (!window.confirm(`Tem certeza que deseja excluir a rota: ${name} (${path})?`)) {
      return;
    }
    
    try {
      const response = await fetch('/api/routes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete route');
      }

      toast.success(`Rota ${path} excluída com sucesso!`);
      fetchAllData(); // Atualiza todos os dados
    } catch (error) {
      console.error("Erro ao excluir rota:", error);
      toast.error("Falha ao excluir a rota.");
    }
  };

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
  const selectContentBg = 'bg-white dark:bg-[#1e293b]'; 
  const primaryButtonClasses = 'bg-[#6B16ED] hover:bg-[#5512C7] text-white';
  const textColor = 'text-gray-900 dark:text-white';
  const labelColor = 'text-gray-600 dark:text-zinc-300';

  return (
    <>
      <Toaster richColors />
      
      <header className="mb-8 pt-4 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciamento de Rotas</h1>
            <p className="mt-1 text-gray-500 dark:text-zinc-400">Crie novas rotas ou atribua conteúdo de advertoriais a URLs existentes.</p>
        </div>
        <Button onClick={fetchAllData} variant="outline" className={borderColor}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Atualizar Lista
        </Button>
      </header>

      <main className="space-y-8">
        
        {/* NOVO: Auto Route Manager */}
        <AutoRouteManager 
          autoRoutes={autoRoutes}
          contentOptions={allContentOptions}
          onRefresh={fetchAllData}
        />

        {/* Card 1: Criar Nova Rota */}
        <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Rotas Fixas (Legado)
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-zinc-400">
                    Crie rotas permanentes no banco de dados. Use as "Rotas Automáticas" acima para redirecionamentos dinâmicos.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateRouteDialog 
                    contentOptions={allContentOptions}
                    onRouteCreated={fetchAllData}
                />
            </CardContent>
        </Card>

        {/* Card 2: Gerador de Links UTM */}
        <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Route className="h-5 w-5" />
                    Gerador de Links UTM
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-zinc-400">
                    Crie links com parâmetros UTM e macros da Taboola para rastreamento de campanhas.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <UTMLinkGenerator />
            </CardContent>
        </Card>

        {/* Card 3: Rotas Existentes */}
        <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader>
                <CardTitle>Rotas Fixas Existentes</CardTitle>
                <CardDescription className="text-gray-500 dark:text-zinc-400">
                    Lista de todas as URLs permanentes mapeadas no sistema.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-24 w-full bg-gray-200 dark:bg-[#334155]" />
                        ))}
                    </div>
                ) : existingRoutes.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-zinc-500">
                        Nenhuma rota fixa encontrada. Crie uma nova acima.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {existingRoutes.map((route) => (
                            <RouteCard
                                key={route.path}
                                route={route}
                                contentOptions={allContentOptions}
                                onSave={handleSaveRoute}
                                onDelete={handleDeleteRoute}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
      </main>
    </>
  );
}