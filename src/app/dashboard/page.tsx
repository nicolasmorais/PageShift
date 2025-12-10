"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { RouteRow } from '@/components/dashboard/RouteRow';
import { cn } from '@/lib/utils'; // Importação corrigida

interface RouteMapping {
  path: string;
  contentId: string;
  name: string;
}

interface ContentOption {
  id: string;
  name: string;
}

export default function DashboardPage() {
  const [routes, setRoutes] = useState<RouteMapping[]>([]);
  const [contentOptions, setContentOptions] = useState<ContentOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Cores ajustadas: Card #0f172a, Borda #1e293b, Hover Tabela #1e293b
  const cardBg = 'bg-[#0f172a]';
  const borderColor = 'border-[#1e293b]';
  const hoverBg = 'hover:bg-[#1e293b]';
  const skeletonBg = 'bg-[#1e293b]';

  return (
    <>
      <Toaster richColors />
      <Card className={cn(cardBg, borderColor, "text-white")}>
        <CardHeader>
          <CardTitle>Gerenciamento de Rotas</CardTitle>
          <CardDescription className="text-zinc-400">
            Controle qual conteúdo é exibido para cada rota (URL) do seu site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className={cn(borderColor, hoverBg)}>
                <TableHead className="text-zinc-400">Nome da Rota</TableHead>
                <TableHead className="text-zinc-400">Caminho (URL)</TableHead>
                <TableHead className="text-zinc-400">Conteúdo Atribuído</TableHead>
                <TableHead className="text-right text-zinc-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i} className={borderColor}>
                    <TableCell><Skeleton className={cn("h-5 w-3/4", skeletonBg)} /></TableCell>
                    <TableCell><Skeleton className={cn("h-5 w-1/2", skeletonBg)} /></TableCell>
                    <TableCell><Skeleton className={cn("h-10 w-full", skeletonBg)} /></TableCell>
                    <TableCell className="text-right"><Skeleton className={cn("h-10 w-20", skeletonBg)} /></TableCell>
                  </TableRow>
                ))
              ) : (
                routes.map(route => (
                  <RouteRow 
                    key={route.path} 
                    route={route} 
                    onSave={handleSaveRoute} 
                    contentOptions={contentOptions}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}