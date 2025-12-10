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
    
    // If only the name changed, we still call onSave with the current contentId
    // Note: The current API only supports updating contentId based on path. 
    // We need to update the API later if we want to persist route name changes.
    // For now, we only save if contentId changes.
    if (isContentChanged) {
        await onSave(route.path, selectedContent);
    } else if (isNameChanged) {
        // Since the current API doesn't support updating route name, we'll just show a toast for now.
        // In a real scenario, we'd need a dedicated API endpoint for route management (name/path).
        toast.warning("A alteração do nome da rota não é suportada pela API atual.");
    }
    
    setIsSaving(false);
  };

  // Cores ajustadas: Card #0f172a, Borda #1e293b, Input #00030a, Botão Primário #0bc839
  const cardBg = 'bg-[#0f172a]';
  const borderColor = 'border-[#1e293b]';
  const inputBg = 'bg-[#00030a]';
  const primaryButtonClasses = 'bg-[#0bc839] hover:bg-[#09a82e] text-white';
  const deleteButtonClasses = 'text-red-500 hover:bg-red-900/20';
  const codeBg = 'bg-[#00030a]';
  const selectContentBg = 'bg-[#00030a]';

  return (
    <div className={cn(cardBg, borderColor, "rounded-lg shadow-sm border p-6 flex flex-col space-y-6 text-white")}>
      <div className="flex-grow space-y-4">
        
        {/* Nome da Rota */}
        <div>
          <Label className="block text-sm font-medium text-zinc-300 mb-1" htmlFor={`routeName-${route.path}`}>Nome da Rota</Label>
          <Input 
            className={cn(inputBg, borderColor, "text-white")} 
            id={`routeName-${route.path}`} 
            type="text" 
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
          />
        </div>
        
        {/* Caminho (URL) */}
        <div>
          <Label className="block text-sm font-medium text-zinc-300 mb-1" htmlFor={`routePath-${route.path}`}>Caminho (URL)</Label>
          <Input 
            className={cn(inputBg, borderColor, "text-zinc-400")} 
            id={`routePath-${route.path}`} 
            type="text" 
            value={route.path}
            readOnly
          />
        </div>
        
        {/* Conteúdo Atribuído */}
        <div>
          <Label className="block text-sm font-medium text-zinc-300 mb-1" htmlFor={`routeContent-${route.path}`}>Conteúdo Atribuído</Label>
          <Select value={selectedContent} onValueChange={setSelectedContent}>
            <SelectTrigger className={cn(inputBg, borderColor, "text-white")}>
              <SelectValue placeholder="Selecione o conteúdo" />
            </SelectTrigger>
            <SelectContent className={cn(selectContentBg, "text-white", borderColor)}>
              {contentOptions.map(opt => (
                <SelectItem key={opt.id} value={opt.id} className="focus:bg-[#0f172a]">
                  {opt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1e293b]">
        
        {/* Link de Visualização */}
        <Link href={route.path} target="_blank">
            <Button variant="outline" size="sm" className={cn(borderColor, "hover:bg-[#1e293b] text-white")}>
                <ExternalLink className="h-4 w-4" />
            </Button>
        </Link>

        {/* Botão Excluir (Apenas para rotas dinâmicas, se implementarmos) */}
        {/* <Button 
          onClick={() => onDelete(route.path, route.name)}
          variant="ghost"
          size="sm"
          className={deleteButtonClasses}
        >
          <Trash2 className="h-4 w-4 mr-1.5" />
          Excluir
        </Button> */}
        
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