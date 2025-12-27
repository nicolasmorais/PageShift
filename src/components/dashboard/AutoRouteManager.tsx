"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AutoRoute {
  slug: string;
  advertorialId: string;
}

interface ContentOption {
  id: string;
  name: string;
}

interface AutoRouteManagerProps {
  autoRoutes: AutoRoute[];
  contentOptions: ContentOption[];
  onRefresh: () => void;
}

export function AutoRouteManager({ autoRoutes, contentOptions, onRefresh }: AutoRouteManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [slug, setSlug] = useState('');
  const [selectedContentId, setSelectedContentId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
  const selectContentBg = 'bg-white dark:bg-[#1e293b]'; 
  const primaryButtonClasses = 'bg-[#6B16ED] hover:bg-[#5512C7] text-white';
  const textColor = 'text-gray-900 dark:text-white';
  const labelColor = 'text-gray-600 dark:text-zinc-300';

  const handleCreateRoute = async () => {
    if (!slug || !selectedContentId) {
      toast.error("O slug e o conteúdo são obrigatórios.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/auto-routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ advertorialId: selectedContentId, slug }),
      });

      if (response.status === 409) {
        toast.error("Este slug já está em uso por outro conteúdo.");
      } else if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Falha ao criar a rota.");
      } else {
        const result = await response.json();
        toast.success(`Rota /${result.slug} criada com sucesso!`);
        setSlug('');
        setSelectedContentId('');
        onRefresh();
      }
    } catch (error) {
      toast.error("Erro de conexão ao criar a rota.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRoute = async (slugToDelete: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir a rota /${slugToDelete}?`)) {
      return;
    }

    setIsDeleting(slugToDelete);
    try {
      const response = await fetch('/api/auto-routes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slugToDelete }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Falha ao excluir a rota.");
      } else {
        toast.success(`Rota /${slugToDelete} excluída com sucesso!`);
        onRefresh();
      }
    } catch (error) {
      toast.error("Erro de conexão ao excluir a rota.");
    } finally {
      setIsDeleting(null);
    }
  };

  // Filtra rotas que já existem para mostrar como "ocupadas"
  const occupiedSlugs = Object.keys(autoRoutes);

  return (
    <Card className={cn(cardBg, borderColor, textColor)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>⚡ Rotas Automáticas</span>
          <Button onClick={onRefresh} variant="outline" size="sm" className={borderColor}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </CardTitle>
        <CardDescription className={labelColor}>
          Crie redirecionamentos automáticos (ex: /menopausa → /ad-ap). Ao excluir, a rota volta ao conteúdo original.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Lista de Rotas Existentes */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Rotas Criadas</h3>
          {occupiedSlugs.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-zinc-500 py-4">
              Nenhuma rota automática criada ainda.
            </p>
          ) : (
            <div className="space-y-2">
              {occupiedSlugs.map((slugKey) => {
                const route = autoRoutes[slugKey];
                const contentName = contentOptions.find(opt => opt.id === route)?.name || route;
                return (
                  <div 
                    key={slugKey}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border",
                      borderColor
                    )}
                  >
                    <div className="flex-1">
                      <div className="font-mono text-sm">
                        <span className="text-green-600 dark:text-green-400">/{slugKey}</span>
                        <span className="mx-2 text-gray-500">→</span>
                        <span className="text-blue-600 dark:text-blue-400">/{route}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-zinc-400">
                        Conteúdo: {contentName}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteRoute(slugKey)}
                      disabled={isDeleting === slugKey}
                    >
                      {isDeleting === slugKey ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Botão para Criar Nova Rota */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className={primaryButtonClasses}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Nova Rota
            </Button>
          </DialogTrigger>
          <DialogContent className={cn("sm:max-w-[500px]", cardBg, borderColor, textColor)}>
            <DialogHeader>
              <DialogTitle>Criar Rota Automática</DialogTitle>
              <DialogDescription className={labelColor}>
                Defina um slug amigável que apontará para um conteúdo existente.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className={labelColor}>Slug (URL)</Label>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-zinc-500 pr-2">/</span>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="ex: menopausa"
                    className={cn(inputBg, borderColor, textColor)}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-zinc-500">
                  O usuário acessará: https://seusite.com/<strong>{slug || 'seu-slug'}</strong>
                </p>
              </div>

              <div className="space-y-2">
                <Label className={labelColor}>Conteúdo de Destino</Label>
                <Select value={selectedContentId} onValueChange={setSelectedContentId}>
                  <SelectTrigger className={cn(inputBg, borderColor, textColor)}>
                    <SelectValue placeholder="Selecione o conteúdo de destino" />
                  </SelectTrigger>
                  <SelectContent className={cn(selectContentBg, textColor, borderColor)}>
                    {contentOptions.map(opt => (
                      <SelectItem 
                        key={opt.id} 
                        value={opt.id} 
                        className="focus:bg-gray-100 dark:focus:bg-[#1e293b]"
                      >
                        {opt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 dark:text-zinc-500">
                  O conteúdo original será exibido quando acessado pelo slug.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsOpen(false)} variant="outline">Cancelar</Button>
              <Button 
                onClick={handleCreateRoute} 
                disabled={isSaving || !slug || !selectedContentId} 
                className={primaryButtonClasses}
              >
                {isSaving ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isSaving ? "Criando..." : "Criar Rota"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}