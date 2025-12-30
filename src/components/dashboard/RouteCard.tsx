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
import { Trash2, Save, ExternalLink, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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
    <div className="bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 space-y-4 transition-all hover:border-slate-200 dark:hover:border-slate-700 group">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 overflow-hidden">
            <Globe className="h-4 w-4 text-[#6B16ED] shrink-0" />
            <span className="font-mono text-xs font-bold text-slate-500 truncate">{route.path}</span>
        </div>
        <div className="flex items-center gap-1">
            <Link href={route.path} target="_blank">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-[#6B16ED]">
                    <ExternalLink className="h-4 w-4" />
                </Button>
            </Link>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400" htmlFor={`name-${route.path}`}>Apelido Interno</Label>
          <Input 
            className="h-10 text-sm bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl"
            id={`name-${route.path}`} 
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
          />
        </div>
        
        <div className="space-y-1">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Conteúdo de Destino</Label>
          <Select value={selectedContent} onValueChange={setSelectedContent}>
            <SelectTrigger className="h-10 text-sm bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl">
              <SelectValue placeholder="Selecione o conteúdo" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
              {contentOptions.map(opt => (
                <SelectItem key={opt.id} value={opt.id} className="text-sm rounded-lg">
                  {opt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isChanged && (
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="w-full h-10 bg-[#6B16ED] hover:bg-[#5512C7] text-white rounded-xl font-bold text-xs animate-in slide-in-from-top-2"
        >
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      )}
    </div>
  );
}