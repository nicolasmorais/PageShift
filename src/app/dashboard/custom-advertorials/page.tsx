"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Trash2, Edit, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomAdvertorial {
  id: string;
  name: string;
}

export default function CustomAdvertorialsPage() {
  const [advertorials, setAdvertorials] = useState<CustomAdvertorial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdvertorials = () => {
    setIsLoading(true);
    fetch('/api/custom-advertorials')
      .then((res) => res.json())
      .then((data) => {
        setAdvertorials(data);
      })
      .catch(() => {
        toast.error("Falha ao carregar os advertoriais.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAdvertorials();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o advertorial: "${name}"? Todas as rotas associadas também serão removidas.`)) {
      return;
    }
    try {
      const response = await fetch(`/api/custom-advertorials/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      toast.success(`Advertorial "${name}" excluído com sucesso!`);
      fetchAdvertorials();
    } catch (error) {
      toast.error(`Falha ao excluir o advertorial "${name}".`);
    }
  };

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const hoverBg = 'hover:bg-gray-100 dark:hover:bg-[#1e293b]';
  const skeletonBg = 'bg-gray-200 dark:bg-[#334155]';
  const primaryButtonClasses = 'bg-[#38bdf8] hover:bg-[#0ea5e9] text-white';
  const codeBg = 'bg-gray-100 dark:bg-[#020617]'; 
  const textColor = 'text-gray-900 dark:text-white';
  const secondaryTextColor = 'text-gray-500 dark:text-zinc-400';

  return (
    <>
      <Toaster richColors />
      <div className="flex items-center justify-between py-4">
        <div>
          <h1 className={cn("text-2xl font-bold", textColor)}>Meus Advertoriais</h1>
          <p className={secondaryTextColor}>Crie e gerencie conteúdos de página usando blocos dinâmicos.</p>
        </div>
        <Link href="/dashboard/custom-advertorials/new">
          <Button className={primaryButtonClasses}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Advertorial
          </Button>
        </Link>
      </div>

      <Card className={cn(cardBg, borderColor, textColor)}>
        <CardHeader>
          <CardTitle>Advertoriais Criados</CardTitle>
          <CardDescription className={secondaryTextColor}>
            Lista de todos os conteúdos dinâmicos disponíveis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className={cn(borderColor, hoverBg)}>
                <TableHead className="text-gray-500 dark:text-zinc-400">Nome</TableHead>
                <TableHead className="text-gray-500 dark:text-zinc-400">ID de Conteúdo</TableHead>
                <TableHead className="text-right text-gray-500 dark:text-zinc-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={i} className={borderColor}>
                    <TableCell><Skeleton className={cn("h-5 w-3/4", skeletonBg)} /></TableCell>
                    <TableCell><Skeleton className={cn("h-5 w-1/2", skeletonBg)} /></TableCell>
                    <TableCell className="text-right"><Skeleton className={cn("h-10 w-32 ml-auto", skeletonBg)} /></TableCell>
                  </TableRow>
                ))
              ) : advertorials.length === 0 ? (
                <TableRow className={borderColor}>
                  <TableCell colSpan={3} className="text-center text-gray-500 dark:text-zinc-500">
                    Nenhum advertorial dinâmico encontrado. Crie um novo!
                  </TableCell>
                </TableRow>
              ) : (
                advertorials.map(adv => (
                  <TableRow key={adv.id} className={cn(borderColor, hoverBg)}>
                    <TableCell>
                      <div className="font-medium">{adv.name}</div>
                    </TableCell>
                    <TableCell>
                      <code className={cn(codeBg, "text-gray-700 dark:text-zinc-300 px-2 py-1 rounded-md text-sm")}>{adv.id}</code>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/dashboard/custom-advertorials/${adv.id}`}>
                        <Button variant="outline" size="sm" className={cn(borderColor, "hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-900 dark:text-white")}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </Link>
                      <Link href={`/${adv.id}`} target="_blank">
                        <Button variant="outline" size="sm" className={cn(borderColor, "hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-900 dark:text-white")}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleDelete(adv.id, adv.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}