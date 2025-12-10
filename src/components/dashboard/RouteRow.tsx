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
import { TableCell, TableRow } from "@/components/ui/table";
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

interface RouteRowProps {
  route: RouteMapping;
  onSave: (path: string, contentId: string) => Promise<void>;
  contentOptions: ContentOption[];
}

export function RouteRow({ route, onSave, contentOptions }: RouteRowProps) {
  const [selectedContent, setSelectedContent] = useState(route.contentId);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(route.path, selectedContent);
    setIsSaving(false);
  };

  // Cores ajustadas: Borda #1e293b, Hover Tabela #1e293b, Code #0f172a, Select #0f172a, Botão Primário #0bc839
  const borderColor = 'border-[#1e293b]';
  const hoverBg = 'hover:bg-[#1e293b]';
  const codeBg = 'bg-[#0f172a]';
  const selectBg = 'bg-[#0f172a]';
  const selectContentBg = 'bg-[#00030a]';
  const primaryButtonClasses = 'bg-[#0bc839] hover:bg-[#09a82e] text-white';

  return (
    <TableRow className={cn(borderColor, hoverBg)}>
      <TableCell>
        <div className="font-medium">{route.name}</div>
      </TableCell>
      <TableCell>
        <code className={cn(codeBg, "text-zinc-300 px-2 py-1 rounded-md text-sm")}>{route.path}</code>
      </TableCell>
      <TableCell>
        <Select value={selectedContent} onValueChange={setSelectedContent}>
          <SelectTrigger className={cn(selectBg, borderColor)}>
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
      </TableCell>
      <TableCell className="text-right">
        <Button 
          onClick={handleSave} 
          disabled={isSaving || selectedContent === route.contentId}
          size="sm"
          className={primaryButtonClasses}
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </TableCell>
    </TableRow>
  );
}