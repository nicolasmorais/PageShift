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
import { Trash2, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  onSave: (path: string, contentId: string, name?: string) => Promise<void>;
  onDelete: (path: string, name: string) => Promise<void>;
  contentOptions: ContentOption[];
}

export function RouteCard({ route, onSave, onDelete, contentOptions }: RouteCardProps) {
  const [selectedContent, setSelectedContent] = useState(route.contentId);
  const [routeName, setRouteName] = useState(route.name);
  const [isSaving, setIsSaving] = useState(false);

  const isChanged = selectedContent !== route.contentId || routeName !== route.name;

  const handleSave = async () => {
    if (!isChanged) return;
    setIsSaving(true);
    try {
      await onSave(route.path, selectedContent, routeName);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Input 
          className="h-9 text-xs bg-black/20 border-white/5 text-white rounded-xl placeholder:text-slate-600"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          placeholder="Apelido da rota"
        />
        <Select value={selectedContent} onValueChange={setSelectedContent}>
          <SelectTrigger className="h-9 text-xs bg-black/20 border-white/5 text-white rounded-xl">
            <SelectValue placeholder="Conteúdo" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-slate-900 border-white/10 text-white">
            {contentOptions.map(opt => (
              <SelectItem key={opt.id} value={opt.id} className="text-xs focus:bg-white/10 focus:text-white">
                {opt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-2">
        {isChanged && (
            <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="flex-1 h-8 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest"
            >
                {isSaving ? "..." : "Salvar"}
            </Button>
        )}
        <Button 
            variant="ghost" 
            onClick={() => onDelete(route.path, route.name)}
            className="h-8 px-3 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-500/10 text-[10px] uppercase font-bold"
        >
            Excluir
        </Button>
      </div>
    </div>
  );
}