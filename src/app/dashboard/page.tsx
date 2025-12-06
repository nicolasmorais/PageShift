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

interface RouteMapping {
  path: string;
  contentId: string;
  name: string;
}

export default function DashboardPage() {
  const [routes, setRoutes] = useState<RouteMapping[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRoutes = () => {
    setIsLoading(true);
    fetch('/api/routes')
      .then((res) => res.json())
      .then((data) => {
        setRoutes(data);
      })
      .catch(() => {
        toast.error("Falha ao carregar as rotas.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRoutes();
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
      // We need to refetch to update the "original" state in each row
      fetchRoutes();
    } catch (error) {
      toast.error(`Falha ao atualizar a rota ${path}.`);
    }
  };

  return (
    <>
      <Toaster richColors />
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Rotas</CardTitle>
          <CardDescription>
            Controle qual conteúdo é exibido para cada rota (URL) do seu site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Rota</TableHead>
                <TableHead>Caminho (URL)</TableHead>
                <TableHead>Conteúdo Atribuído</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-10 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : (
                routes.map(route => (
                  <RouteRow key={route.path} route={route} onSave={handleSaveRoute} />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}