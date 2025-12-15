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
import { Plus, Route, ExternalLink, RefreshCw, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomAdvertorial {
  id: string;
  name: string;
}

interface ExistingRoute {
  path: string;
  name: string;
  contentId: string;
}

export default function DashboardPage() {
  const [advertorials, setAdvertorials] = useState<CustomAdvertorial[]>([]);
  const [existingRoutes, setExistingRoutes] = useState<ExistingRoute[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isAssigning, setIsAssigning] = useState<boolean>(false);

  // States for "Gerar Nova Rota"
  const [selectedAdvertorialId, setSelectedAdvertorialId] = useState<string>('');
  const [customSlug, setCustomSlug] = useState<string>('');

  // States for "Atribuir Conteúdo a Rota Existente"
  const [selectedRoutePath, setSelectedRoutePath] = useState<string>('');
  const [selectedAdvertorialIdForAssignment, setSelectedAdvertorialIdForAssignment] = useState<string>('');

  const fetchAdvertorialsAndRoutes = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const [advRes, routeRes] = await Promise.all([
        fetch('/api/custom-advertorials'),
        fetch('/api/routes')
      ]);

      if (!advRes.ok || !routeRes.ok) throw new Error('Failed to fetch data');

      const advData: CustomAdvertorial[] = await advRes.json();
      const routeData: ExistingRoute[] = await routeRes.json();

      setAdvertorials(advData);
      setExistingRoutes(routeData);

    } catch (error) {
      toast.error("Falha ao carregar os dados.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertorialsAndRoutes();
  }, []);

  const handleGenerateRoute = async () => {
    if (!selectedAdvertorialId) {
      toast.error("Selecione um advertorial para gerar a rota.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contentId: selectedAdvertorialId, 
          path: customSlug || undefined,
          name: `Rota para ${advertorials.find(a => a.id === selectedAdvertorialId)?.name}`
        }),
      });

      if (!response.ok) throw new Error('Failed to generate route');

      const result = await response.json();
      toast.success(`Rota gerada: ${result.route.path}`);
      
      // Limpa o formulário
      setSelectedAdvertorialId('');
      setCustomSlug('');
      fetchAdvertorialsAndRoutes(); // Atualiza a lista de rotas

    } catch (error) {
      toast.error("Falha ao gerar a rota.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAssignContent = async () => {
    if (!selectedRoutePath || !selectedAdvertorialIdForAssignment) {
      toast.error("Selecione uma rota e um advertorial.");
      return;
    }

    setIsAssigning(true);
    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contentId: selectedAdvertorialIdForAssignment, 
          path: selectedRoutePath,
          name: `Rota para ${advertorials.find(a => a.id === selectedAdvertorialIdForAssignment)?.name}`
        }),
      });

      if (!response.ok) throw new Error('Failed to assign content');

      const result = await response.json();
      toast.success(`Conteúdo atribuído à rota: ${result.route.path}`);
      
      // Limpa o formulário
      setSelectedRoutePath('');
      setSelectedAdvertorialIdForAssignment('');
      fetchAdvertorialsAndRoutes(); // Atualiza a lista de rotas

    } catch (error) {
      toast.error("Falha ao atribuir o conteúdo.");
    } finally {
      setIsAssigning(false);
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gerenciamento de Rotas</h1>
            <p className="mt-1 text-gray-500 dark:text-zinc-400">Crie novas rotas ou atribua conteúdo de advertoriais a URLs existentes.</p>
        </div>
        <Button onClick={fetchAdvertorialsAndRoutes} variant="outline" className={borderColor}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar Lista
        </Button>
      </header>

      <main className="space-y-8">
        {/* Card 1: Gerar Nova Rota */}
        <Card className={cn(cardBg, borderColor, "text-gray-900 dark:text-white")}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Route className="h-5 w-5" />
                    Gerar Nova Rota
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-zinc-400">
                    Crie uma nova URL para um advertorial.
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

        {/* Card 2: Atribuir Conteúdo a Rota Existente */}
        <Card className={cn(cardBg, borderColor, "text-gray-900 dark:text-white")}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ArrowRightLeft className="h-5 w-5" />
                    Atribuir Conteúdo a Rota Existente
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-zinc-400">
                    Altere o conteúdo de uma URL existente para o de outro advertorial.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label className="text-gray-600 dark:text-zinc-300">Rota Existente (URL)</Label>
                    <Select value={selectedRoutePath} onValueChange={setSelectedRoutePath}>
                        <SelectTrigger className={cn(inputBg, borderColor, "text-gray-900 dark:text-white")}>
                            <SelectValue placeholder="Selecione uma rota existente" />
                        </SelectTrigger>
                        <SelectContent className={cn(selectContentBg, "text-gray-900 dark:text-white", borderColor)}>
                            {existingRoutes.map((route) => (
                                <SelectItem key={route.path} value={route.path} className="focus:bg-gray-100 dark:focus:bg-[#1e293b]">
                                    {route.path} (Atual: {route.name})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label className="text-gray-600 dark:text-zinc-300">Advertorial a ser Atribuído</Label>
                    <Select value={selectedAdvertorialIdForAssignment} onValueChange={setSelectedAdvertorialIdForAssignment}>
                        <SelectTrigger className={cn(inputBg, borderColor, "text-gray-900 dark:text-white")}>
                            <SelectValue placeholder="Selecione um advertorial" />
                        </SelectTrigger>
                        <SelectContent className={cn(selectContentBg, "text-gray-900 dark:text-white", borderColor)}>
                            {advertorials.map((adv) => (
                                <SelectItem key={adv.id} value={adv.id} className="focus:bg-gray-100 dark:focus-bg-[#1e293b]">
                                    {adv.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 mt-1">
                        Se não escolher nenhum, a rota voltará ao seu conteúdo original (se houver).
                    </p>
                </div>

                <Button 
                    onClick={handleAssignContent} 
                    disabled={isAssigning || !selectedRoutePath} 
                    className={primaryButtonClasses}
                >
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    {isAssigning ? "Atribuindo..." : "Atribuir Conteúdo"}
                </Button>
            </CardContent>
        </Card>

        {/* Card 3: Rotas Existentes */}
        <Card className={cn(cardBg, borderColor, "text-gray-900 dark:text-white")}>
            <CardHeader>
                <CardTitle>Rotas Existentes</CardTitle>
                <CardDescription className="text-gray-500 dark:text-zinc-400">
                    Lista de todas as URLs mapeadas no sistema.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full bg-gray-200 dark:bg-[#334155]" />
                        ))}
                    </div>
                ) : existingRoutes.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-zinc-500">
                        Nenhuma rota encontrada. Crie uma nova acima.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {existingRoutes.map((route) => (
                            <div key={route.path} className={cn("flex items-center justify-between p-3 rounded-md border", borderColor, "bg-gray-50 dark:bg-[#0f172a]")}>
                                <div>
                                    <p className="font-medium">{route.name}</p>
                                    <code className="text-sm text-gray-600 dark:text-zinc-400">{route.path}</code>
                                </div>
                                <a href={route.path} target="_blank" rel="noopener noreferrer">
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