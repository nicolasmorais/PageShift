"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';

interface RouteMapping {
  path: string;
  contentId: string;
  name: string;
}

const contentOptions = [
  { id: 'v1', name: 'Advertorial V1' },
  { id: 'v2', name: 'Advertorial V2' },
  { id: 'v3', name: 'Advertorial V3' },
  { id: 'ap', name: 'Página de Aprovação' },
];

function RouteCard({ route, onSave }: { route: RouteMapping, onSave: (path: string, contentId: string) => Promise<void> }) {
  const [selectedContent, setSelectedContent] = useState(route.contentId);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(route.path, selectedContent);
    setIsSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{route.name}</CardTitle>
        <CardDescription>Caminho da URL: <code>{route.path}</code></CardDescription>
      </CardHeader>
      <CardContent>
        <Label htmlFor={`content-for-${route.path}`}>Conteúdo Exibido</Label>
        <Select value={selectedContent} onValueChange={setSelectedContent}>
          <SelectTrigger id={`content-for-${route.path}`}>
            <SelectValue placeholder="Selecione o conteúdo" />
          </SelectTrigger>
          <SelectContent>
            {contentOptions.map(opt => (
              <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving || selectedContent === route.contentId}>
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </CardFooter>
    </Card>
  );
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
      fetchRoutes(); // Refresh data after save
    } catch (error) {
      toast.error(`Falha ao atualizar a rota ${path}.`);
    }
  };

  return (
    <>
      <Toaster richColors />
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Gerenciamento de Rotas</h1>
        <p className="text-muted-foreground">
          Controle qual conteúdo é exibido para cada rota (URL).
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Skeleton className="h-10 w-20" />
                </CardFooter>
              </Card>
            ))
          ) : (
            routes.map(route => (
              <RouteCard key={route.path} route={route} onSave={handleSaveRoute} />
            ))
          )}
        </div>
      </div>
    </>
  );
}