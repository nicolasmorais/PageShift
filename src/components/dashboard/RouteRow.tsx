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

const contentOptions = [
  { id: 'v1', name: 'Advertorial V1' },
  { id: 'v2', name: 'Advertorial V2' },
  { id: 'v3', name: 'Advertorial V3' },
  { id: 'ap', name: 'Página de Aprovação' },
];

interface RouteRowProps {
  route: RouteMapping;
  onSave: (path: string, contentId: string) => Promise<void>;
}

export function RouteRow({ route, onSave }: RouteRowProps) {
  const [selectedContent, setSelectedContent] = useState(route.contentId);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(route.path, selectedContent);
    setIsSaving(false);
  };

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{route.name}</div>
      </TableCell>
      <TableCell>
        <code className="bg-muted px-2 py-1 rounded-md text-sm">{route.path}</code>
      </TableCell>
      <TableCell>
        <Select value={selectedContent} onValueChange={setSelectedContent}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o conteúdo" />
          </SelectTrigger>
          <SelectContent>
            {contentOptions.map(opt => (
              <SelectItem key={opt.id} value={opt.id}>{opt.name}</SelectItem>
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