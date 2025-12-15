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

interface CustomAdvertorial {
  id: string;
  name: string;
}

interface AutoRoute {
  id: string;
  slug: string;
  name: string;
  url: string;
}

export default function DashboardPage() {
  const [advertorials, setAdvertorials] = useState<CustomAdvertorial[]>([]);
  const [autoRoutes, setAutoRoutes] = useState<AutoRoute[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedAdvertorialId, setSelectedAdvertorialId] = useState<string>('');
  const [customSlug, setCustomSlug] = useState<string>('');

  const fetchAdvertorials = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/custom-advertorials');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: CustomAdvertorial[] = await res.json();
      setAdvertorials(data);
      
      // Gera as rotas automáticas baseadas nos advertoriais
      const routes = data.map(adv => ({
        id: adv.id,
        slug: adv.id, // Por padrão, o slug é o próprio ID
        name: adv.name,
        url: `/${adv.id}`
      }));
      setAutoRoutes(routes);

    } catch (error) {
      toast.error("Falha ao carregar os advertoriais.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertorials();
  }, []);

  const handleGenerateRoute = async () => {
    if (!selectedAdvertorialId) {
      toast.error("Selecione um advertorial para gerar a rota.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/auto-routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          advertorialId: selectedAdvertorialId, 
          slug: customSlug || undefined 
        }),
      });

      if (!response.ok) throw new Error('Failed to generate route');

      const result = await response.json();
      toast.success(`Rota gerada: ${result.url}`);
      
      // Atualiza a lista de rotas automáticas
      setAutoRoutes(prev => prev.map(route => 
        route.id === selectedAdvertorialId 
          ? { ...route, slug: result.slug, url: result.url }
          : route
      ));

      // Limpa o formulário
      setSelectedAdvertorialId('');
      setCustomSlug('');

    } catch (error) {
      toast.error("Falha ao gerar a rota.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
  const selectContentBg = 'bg-white dark:bg-[#1e293b]'; 
  const primaryButtonClasses = 'bg-[#38bdf8] hover:bg-[#0ea5e9] text-white'; // sky-400

  return (
    <>
      <Toaster richColors />
      
      <header className="mb-8 pt-4 flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerador de Rotas Automáticas</h1>
            <p className="mt-1 text-gray-500 dark:text-zinc-400">Crie URLs amigáveis para seus advertoriais dinâmicos.</p>
        </div>
        <Button onClick={fetchAdvertorials} variant="outline" className={borderColor}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar Lista
        </Button>
      </header>

      <main className="space-y-8">
        {/* Card de Geração de Rota */}
        <Card className={cn(cardBg, borderColor, "text-gray-900 dark:text-white")}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Route className="h-5 w-5" />
                    Gerar Nova Rota
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-zinc-400">
                    Escolha um advertorial e atribua uma URL personalizada (opcional).
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label className="text-gray-600 dark:text-zinc-300">Escolher Advertorial</Label>
                    <Select value={selectedAdvertorialId} onValueChange={setSelectedAdvertorialId}>
                        <SelectTrigger className={cn(inputBg, borderColor, "text-gray-900 dark:text-white")}>
                            <SelectValue placeholder="Selecione um advertorial" />
                        </SelectTrigger>
                        <SelectContent className={cn(selectContentBg, "text-gray-900 dark:text-white", borderColor)}>
                            {advertorials.map((adv) => (
                                <SelectItem key={adv.id} value={adv.id} className="focus:bg-gray-100 dark:focus:bg-[#1e293b]">
                                    {adv.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                <div>
                    <Label className="text-gray-600 dark:text-zinc-300">URL Personalizada (Opcional)</Label>
                    <Input 
                        className={cn(inputBg, borderColor, "text-gray-900 dark:text-white")} 
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        placeholder="ex: promocao-de-verao (deixe em branco para usar o ID)"
                    />
                    <p className="text-xs text-gray-500 dark:text-zinc-500 mt-1">
                        Se não preenchida, a URL será o ID do advertorial.
                    </p>
                </div>

                <Button 
                    onClick={handleGenerateRoute} 
                    disabled={isGenerating || !selectedAdvertorialId} 
                    className={primaryButtonClasses}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    {isGenerating ? "Gerando..." : "Gerar Rota"}
                </Button>
            </CardContent>
        </Card>

        {/* Card de Rotas Existentes */}
        <Card className={cn(cardBg, borderColor, "text-gray-900 dark:text-white")}>
            <CardHeader>
                <CardTitle>Rotas Automáticas Existentes</CardTitle>
                <CardDescription className="text-gray-500 dark:text-zinc-400">
                    Lista de URLs que já apontam para seus advertoriais.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full bg-gray-200 dark:bg-[#334155]" />
                        ))}
                    </div>
                ) : autoRoutes.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-zinc-500">
                        Nenhuma rota automática encontrada. Crie uma nova acima.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {autoRoutes.map((route) => (
                            <div key={route.id} className={cn("flex items-center justify-between p-3 rounded-md border", borderColor, "bg-gray-50 dark:bg-[#0f172a]")}>
                                <div>
                                    <p className="font-medium">{route.name}</p>
                                    <code className="text-sm text-gray-600 dark:text-zinc-400">{route.url}</code>
                                </div>
                                <a href={route.url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm" className={borderColor}>
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
      </main>
    </>
  );
}