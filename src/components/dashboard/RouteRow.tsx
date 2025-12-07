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

  return (
    <TableRow className="border-zinc-800 hover:bg-zinc-900">
      <TableCell>
        <div className="font-medium">{route.name}</div>
      </TableCell>
      <TableCell>
        <code className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md text-sm">{route.path}</code>
      </TableCell>
      <TableCell>
        <Select value={selectedContent} onValueChange={setSelectedContent}>
          <SelectTrigger className="bg-zinc-800 border-zinc-700">
            <SelectValue placeholder="Selecione o conteúdo" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 text-white border-zinc-800">
            {contentOptions.map(opt => (
              <SelectItem key={opt.id} value={opt.id} className="focus:bg-zinc-800">
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
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </TableCell>
    </TableRow>
  );
}