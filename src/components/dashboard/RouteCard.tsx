"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Save, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { toast } from 'sonner';

interface RouteMapping {
  path: string;
  contentId: string;
  name: string;
}

interface ContentOption {
  id: string;
  name: string;
}

interface RouteCardProps {
  route: RouteMapping;
  onSave: (path: string, contentId: string) => Promise<void>;
  onDelete: (path: string, name: string) => Promise<void>;
  contentOptions: ContentOption[];
}

export function RouteCard({ route, onSave, onDelete, contentOptions }: RouteCardProps) {
  const [selectedContent, setSelectedContent] = useState(route.contentId);
  const [routeName, setRouteName] = useState(route.name);
  const [isSaving, setIsSaving] = useState(false);

  const isContentChanged = selectedContent !== route.contentId;
  const isNameChanged = routeName !== route.name;
  const isChanged = isContentChanged || isNameChanged;

  const handleSave = async () => {
    if (!isChanged) return;
    setIsSaving(true);
    
    if (isContentChanged) {
        await onSave(route.path, selectedContent);
    } else if (isNameChanged) {
        toast.warning("A alteração do nome da rota não é suportada pela API atual.");
    }
    
    setIsSaving(false);
  };

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
  const selectContentBg = 'bg-white dark:bg-[#1e293b]'; 
  const primaryButtonClasses = 'bg-[#6B16ED] hover:bg-[#5512C7] text-white';
  const deleteButtonClasses = 'text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20';

  return (
    <div className={cn(cardBg, borderColor, "rounded-lg shadow-sm border p-6 flex flex-col space-y-6 text-gray-900 dark:text-white")}>
      <div className="flex-grow space-y-4">
        
        {/* Nome da Rota */}
        <div>
          <Label className="block text-sm font-medium text-gray-600 dark:text-zinc-300 mb-1" htmlFor={`routeName-${route.path}`}>Nome da Rota</Label>
          <Input 
            className={cn(inputBg, borderColor, "text-gray-900 dark:text-white")} 
            id={`routeName-${route.path}`} 
            type="text" 
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
          />
        </div>
        
        {/* Caminho (URL) */}
        <div>
          <Label className="block text-sm font-medium text-gray-600 dark:text-zinc-300 mb-1" htmlFor={`routePath-${route.path}`}>Caminho (URL)</Label>
          <Input 
            className={cn(inputBg, borderColor, "text-gray-500 dark:text-zinc-400")} 
            id={`routePath-${route.path}`} 
            type="text" 
            value={route.path}
            readOnly
          />
        </div>
        
        {/* Conteúdo Atribuído */}
        <div>
          <Label className="block text-sm font-medium text-gray-600 dark:text-zinc-300 mb-1" htmlFor={`routeContent-${route.path}`}>Conteúdo Atribuído</Label>
          <Select value={selectedContent} onValueChange={setSelectedContent}>
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
      </div>
      
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-[#334155]">
        
        {/* Link de Visualização */}
        <Link href={route.path} target="_blank">
            <Button variant="outline" size="sm" className={cn(borderColor, "hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-900 dark:text-white")}>
                <ExternalLink className="h-4 w-4" />
            </Button>
        </Link>

        {/* Botão Salvar */}
        <Button 
          onClick={handleSave} 
          disabled={isSaving || !isChanged}
          size="sm"
          className={primaryButtonClasses}
        >
          <Save className="h-4 w-4 mr-1.5" />
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
}