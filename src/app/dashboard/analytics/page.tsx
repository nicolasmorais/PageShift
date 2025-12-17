"use client";

import { useState, useEffect, useMemo } from 'react';
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
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, TrendingUp, LayoutGrid, MapPin, Route, Filter } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/dashboard/DateRangePicker';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PageViewEvent, RouteMapping, CustomAdvertorial } from '@/lib/advertorial-types';

interface AnalyticsData {
    contentId: string;
    name: string;
    totalViews: number;
    paths: { path: string; views: number }[];
    regions: { regionName: string; views: number }[];
}

interface ContentOption {
    id: string;
    name: string;
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {Array.from({ length: 4 }).map((_, i: number) => (
      <Card key={i} className="bg-white border-gray-200 dark:bg-[#1e293b] dark:border-[#334155]"><CardHeader><Skeleton className="h-6 w-1/4 bg-gray-200 dark:bg-[#334155]" /></CardHeader><CardContent><Skeleton className="h-40 w-full bg-gray-200 dark:bg-[#334155]" /></CardContent></Card>
    ))}
  </div>
);

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [contentOptions, setContentOptions] = useState<ContentOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedContentId, setSelectedContentId] = useState<string>('all');

  const baseContentOptions: ContentOption[] = [
    { id: 'v1', name: 'Advertorial V1' },
    { id: 'v2', name: 'Advertorial V2' },
    { id: 'v3', name: 'Advertorial V3' },
    { id: 'ap', name: 'Página de Aprovação (AP)' },
  ];

  const fetchAnalytics = async (range?: DateRange): Promise<void> => {
    setIsLoading(true);
    
    let url = '/api/analytics/views';
    const params = new URLSearchParams();

    if (range?.from) {
        params.append('startDate', format(range.from, 'yyyy-MM-dd'));
    }
    if (range?.to) {
        params.append('endDate', format(range.to, 'yyyy-MM-dd'));
    }
    
    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    try {
      const [viewsRes, customAdvRes] = await Promise.all([
        fetch(url),
        fetch('/api/custom-advertorials'),
      ]);

      if (!viewsRes.ok || !customAdvRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const viewsData: PageViewEvent[] = await viewsRes.json();
      const customAdvData: CustomAdvertorial[] = await customAdvRes.json();

      // Mapeamento de ContentId para Nome
      const contentMap = new Map<string, string>();
      baseContentOptions.forEach((opt: ContentOption) => contentMap.set(opt.id, opt.name));
      customAdvData.forEach((adv: CustomAdvertorial) => contentMap.set(adv.id, `Dinâmico: ${adv.name}`));
      
      // Atualiza as opções de filtro
      setContentOptions([...baseContentOptions, ...customAdvData.map((adv: CustomAdvertorial) => ({ id: adv.id, name: `Dinâmico: ${adv.name}` }))]);

      type GroupedItem = Omit<AnalyticsData, 'paths' | 'regions'> & { paths: Record<string, number>, regions: Record<string, number> };
      
      // Agrupar visualizações por ContentId, Path e Região
      const groupedData = viewsData.reduce((acc: Record<string, GroupedItem>, event: PageViewEvent) => {
        const { contentId, path, regionName } = event;
        
        if (!acc[contentId]) {
          acc[contentId] = {
            contentId,
            name: contentMap.get(contentId) || `Conteúdo Desconhecido (${contentId})`,
            totalViews: 0,
            paths: {},
            regions: {},
          };
        }
        
        acc[contentId].totalViews += 1;
        acc[contentId].paths[path] = (acc[contentId].paths[path] || 0) + 1;
        
        // Agrupar por região
        const region = regionName || 'Desconhecido';
        acc[contentId].regions[region] = (acc[contentId].regions[region] || 0) + 1;

        return acc;
      }, {} as Record<string, GroupedItem>);

      // Formatar para o estado final
      const formattedAnalytics: AnalyticsData[] = Object.values(groupedData).map((item: GroupedItem) => ({
        ...item,
        paths: Object.entries(item.paths).map(([path, views]) => ({ path, views })).sort((a, b) => b.views - a.views),
        regions: Object.entries(item.regions).map(([regionName, views]) => ({ regionName, views })).sort((a, b) => b.views - a.views),
      })).sort((a, b) => b.totalViews - a.totalViews);

      setAnalytics(formattedAnalytics);

    } catch (error) {
      toast.error("Falha ao carregar dados de analytics.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Recarrega os dados sempre que o intervalo de datas muda
  useEffect(() => {
    fetchAnalytics(dateRange);
  }, [dateRange]);

  // Filtra os dados de região para o Card 2
  const filteredRegions = useMemo(() => {
    if (selectedContentId === 'all') {
        // Agrupa todas as regiões de todos os advertoriais
        const allRegions: Record<string, number> = {};
        analytics.forEach((adv: AnalyticsData) => {
            adv.regions.forEach((region: { regionName: string; views: number }) => {
                allRegions[region.regionName] = (allRegions[region.regionName] || 0) + region.views;
            });
        });
        return Object.entries(allRegions).map(([regionName, views]) => ({ regionName, views })).sort((a, b) => b.views - a.views);
    }
    
    const selectedAdv = analytics.find((adv: AnalyticsData) => adv.contentId === selectedContentId);
    return selectedAdv ? selectedAdv.regions : [];
  }, [analytics, selectedContentId]);

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const textColor = 'text-gray-900 dark:text-white';
  const secondaryTextColor = 'text-gray-500 dark:text-zinc-400';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
  const selectContentBg = 'bg-white dark:bg-[#1e293b]'; 

  return (
    <>
      <Toaster richColors />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sticky top-0 z-10 py-4 bg-background border-b border-gray-100 dark:border-gray-800">
          <div>
            <h1 className={cn("text-2xl font-bold", textColor)}>Analytics de Visualizações</h1>
            <p className={secondaryTextColor}>Visualizações de página rastreadas por conteúdo.</p>
          </div>
          <div className="mt-4 sm:mt-0 w-full sm:w-64">
            <DateRangePicker date={dateRange} setDate={setDateRange} />
          </div>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : analytics.length === 0 ? (
          <Card className={cn(cardBg, borderColor, "col-span-full text-center p-8 text-gray-500 dark:text-zinc-400")}>
            <CardTitle className="text-xl text-gray-900 dark:text-white">Nenhum dado de visualização encontrado</CardTitle>
            <CardDescription className="mt-2 text-gray-500 dark:text-zinc-500">Ajuste o filtro de data ou visite suas rotas para começar a rastrear.</CardDescription>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* CARD 1: Visualizações por Advertorial (Conteúdo Final) */}
            <Card className={cn(cardBg, borderColor, textColor, "lg:col-span-1")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <LayoutGrid className="h-5 w-5 text-blue-500" />
                    Visualizações por Conteúdo (Advertorial)
                </CardTitle>
                <CardDescription className={secondaryTextColor}>
                    Total de acessos agrupados pelo conteúdo final exibido.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className={cn(borderColor, "hover:bg-transparent")}>
                            <TableHead className="text-gray-500 dark:text-zinc-400">Conteúdo</TableHead>
                            <TableHead className="text-right text-gray-500 dark:text-zinc-400">Total de Views</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {analytics.map((item: AnalyticsData) => (
                            <TableRow key={item.contentId} className={cn(borderColor, "hover:bg-gray-50 dark:hover:bg-[#0f172a]")}>
                                <TableCell>
                                    <div className="font-medium">{item.name}</div>
                                    <code className="text-xs bg-gray-100 dark:bg-[#020617] px-1 rounded text-gray-500 dark:text-zinc-400">{item.contentId}</code>
                                </TableCell>
                                <TableCell className="text-right text-xl font-bold text-green-600 dark:text-green-400">{item.totalViews}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* CARD 2: Distribuição Geográfica Filtrável */}
            <Card className={cn(cardBg, borderColor, textColor, "lg:col-span-1")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <MapPin className="h-5 w-5 text-purple-500" />
                    Acesso por Estados (Distribuição Geográfica)
                </CardTitle>
                <CardDescription className={secondaryTextColor}>
                    Filtre para ver a distribuição de visualizações por estado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filtro de Conteúdo */}
                <div className="mb-4">
                    <Select value={selectedContentId} onValueChange={setSelectedContentId}>
                        <SelectTrigger className={cn(inputBg, borderColor, textColor)}>
                            <Filter className="h-4 w-4 mr-2 text-gray-500 dark:text-zinc-400" />
                            <SelectValue placeholder="Filtrar por Advertorial" />
                        </SelectTrigger>
                        <SelectContent className={cn(selectContentBg, textColor, borderColor)}>
                            <SelectItem value="all" className="focus:bg-gray-100 dark:focus:bg-[#1e293b]">Todos os Conteúdos ({analytics.reduce((sum: number, item: AnalyticsData) => sum + item.totalViews, 0)})</SelectItem>
                            {contentOptions.map((opt: ContentOption) => {
                                const views = analytics.find((a: AnalyticsData) => a.contentId === opt.id)?.totalViews || 0;
                                return (
                                    <SelectItem key={opt.id} value={opt.id} className="focus:bg-gray-100 dark:focus:bg-[#1e293b]">
                                        {opt.name} ({views})
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                {/* Tabela de Regiões */}
                <Table>
                    <TableHeader>
                        <TableRow className={cn(borderColor, "hover:bg-transparent")}>
                            <TableHead className="text-gray-500 dark:text-zinc-400">Região/Estado</TableHead>
                            <TableHead className="text-right text-gray-500 dark:text-zinc-400">Visualizações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRegions.length === 0 ? (
                            <TableRow className={cn(borderColor, "hover:bg-transparent")}>
                                <TableCell colSpan={2} className="text-center text-gray-500 dark:text-zinc-500">
                                    Nenhuma visualização encontrada para este filtro.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredRegions.map((regionItem: { regionName: string; views: number }, index: number) => (
                                <TableRow key={index} className={cn(borderColor, "hover:bg-gray-50 dark:hover:bg-[#0f172a]")}>
                                    <TableCell className="font-medium">{regionItem.regionName}</TableCell>
                                    <TableCell className="text-right font-bold">{regionItem.views}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* CARD 3: Visualizações por Rota (Mantido, mas agora em uma coluna separada) */}
            {analytics.map((item: AnalyticsData) => (
                <Card key={`paths-${item.contentId}`} className={cn(cardBg, borderColor, textColor, "lg:col-span-2")}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Route className="h-5 w-5 text-orange-500" />
                            Rotas de Acesso para: {item.name}
                        </CardTitle>
                        <CardDescription className={secondaryTextColor}>
                            Quais URLs foram usadas para acessar este conteúdo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className={cn(borderColor, "hover:bg-transparent")}>
                                    <TableHead className="text-gray-500 dark:text-zinc-400">Caminho</TableHead>
                                    <TableHead className="text-right text-gray-500 dark:text-zinc-400">Visualizações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {item.paths.map((pathItem: { path: string; views: number }, index: number) => (
                                    <TableRow key={index} className={cn(borderColor, "hover:bg-gray-50 dark:hover:bg-[#0f172a]")}>
                                        <TableCell className="font-mono text-sm text-blue-600 dark:text-blue-400">{pathItem.path}</TableCell>
                                        <TableCell className="text-right font-bold">{pathItem.views}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}