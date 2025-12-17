"use client";

import React, { useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ContentOption {
  id: string;
  name: string;
}

interface CreateRouteDialogProps {
  contentOptions: ContentOption[];
  onRouteCreated: () => void;
}

export function CreateRouteDialog({ contentOptions, onRouteCreated }: CreateRouteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState('');
  const [name, setName] = useState('');
  const [contentId, setContentId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
  const selectContentBg = 'bg-white dark:bg-[#1e293b]'; 
  const primaryButtonClasses = 'bg-[#6B16ED] hover:bg-[#5512C7] text-white';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!path || !contentId) {
      toast.error("O caminho (URL) e o conteúdo são obrigatórios.");
      return;
    }

    setIsSaving(true);
    
    // Normaliza o path para garantir que comece com /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: normalizedPath, contentId, name }),
      });

      if (response.status === 201) {
        toast.success(`Nova rota ${normalizedPath} criada com sucesso!`);
        onRouteCreated();
        setIsOpen(false);
        setPath('');
        setName('');
        setContentId('');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Falha ao criar a rota.");
      }
    } catch (error) {
      toast.error("Erro de conexão ao criar a rota.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={primaryButtonClasses}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Nova Rota
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", cardBg, borderColor, "text-gray-900 dark:text-white")}>
        <DialogHeader>
          <DialogTitle>Criar Nova Rota</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-zinc-400">
            Defina um novo caminho (URL) e atribua um conteúdo a ele.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="new-path" className="text-gray-600 dark:text-zinc-300">Caminho (URL)</Label>
            <div className="flex items-center">
                <span className="text-gray-500 dark:text-zinc-500 pr-2">/</span>
                <Input
                    id="new-path"
                    value={path.startsWith('/') ? path.substring(1) : path}
                    onChange={(e) => setPath(e.target.value)}
                    placeholder="ex: promocao-especial"
                    className={cn(inputBg, borderColor, "text-gray-900 dark:text-white")}
                    required
                />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-name" className="text-gray-600 dark:text-zinc-300">Nome Interno (Opcional)</Label>
            <Input
              id="new-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome para identificação no painel"
              className={cn(inputBg, borderColor, "text-gray-900 dark:text-white")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-content" className="text-gray-600 dark:text-zinc-300">Conteúdo a Atribuir</Label>
            <Select value={contentId} onValueChange={setContentId} required>
              <SelectTrigger className={cn(inputBg, borderColor, "text-gray-900 dark:text-white")}>
                <SelectValue placeholder="Selecione o conteúdo" />
              </SelectTrigger>
              <SelectContent className={cn(selectContentBg, "text-gray-900 dark:text-white", borderColor)}>
                {contentOptions.map(opt => (
                  <SelectItem key={opt.id} value={opt.id} className="focus:bg-gray-100 dark:focus:bg-[#1e293b]">
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit" disabled={isSaving} className={primaryButtonClasses}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Criando..." : "Criar Rota"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}