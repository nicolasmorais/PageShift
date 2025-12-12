"use client";

import { useState, useEffect } from 'react';
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
import { BarChart, TrendingUp, LayoutGrid, MapPin, Route } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageViewEvent, RouteMapping, CustomAdvertorial } from '@/lib/advertorial-types';
import { DateRangePicker } from '@/components/dashboard/DateRangePicker';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

interface AnalyticsData {
    contentId: string;
    name: string;
    totalViews: number;
    paths: { path: string; views: number }[];
    regions: { regionName: string; views: number }[]; // NEW
}

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <Card className="bg-white border-gray-200 dark:bg-[#1e293b] dark:border-[#334155]"><CardHeader><Skeleton className="h-6 w-1/4 bg-gray-200 dark:bg-[#334155]" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /></CardContent></Card>
  </div>
);

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const fetchAnalytics = async (range?: DateRange) => {
    setIsLoading(true);
    
    let url = '/api/analytics/views';
    const params = new URLSearchParams();

    if (range?.from) {
        // Formato ISO para o backend
        params.append('startDate', format(range.from, 'yyyy-MM-dd'));
    }
    if (range?.to) {
        params.append('endDate', format(range.to, 'yyyy-MM-dd'));
    }
    
    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    try {
      const [viewsRes, routesRes, customAdvRes] = await Promise.all([
        fetch(url),
        fetch('/api/routes'),
        fetch('/api/custom-advertorials'),
      ]);

      if (!viewsRes.ok || !routesRes.ok || !customAdvRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const viewsData: PageViewEvent[] = await viewsRes.json();
      const routesData: RouteMapping[] = await routesRes.json();
      const customAdvData: CustomAdvertorial[] = await customAdvRes.json();

      // Mapeamento de ContentId para Nome
      const contentMap = new Map<string, string>();
      contentMap.set('v1', 'Advertorial V1 (Hardcoded)');
      contentMap.set('v2', 'Advertorial V2 (Hardcoded)');
      contentMap.set('v3', 'Advertorial V3 (Hardcoded)');
      contentMap.set('ap', 'Página de Aprovação (AP)');
      customAdvData.forEach(adv => contentMap.set(adv.id, adv.name));

      // Agrupar visualizações por ContentId, Path e Região
      const groupedData = viewsData.reduce((acc, event) => {
        const { contentId, path, regionName } = event;
        
        if (!acc[contentId]) {
          acc[contentId] = {
            contentId,
            name: contentMap.get(contentId) || `Conteúdo Desconhecido (${contentId})`,
            totalViews: 0,
            paths: {},
            regions: {}, // NEW
          };
        }
        
        acc[contentId].totalViews += 1;
        acc[contentId].paths[path] = (acc[contentId].paths[path] || 0) + 1;
        
        // Agrupar por região
        const region = regionName || 'Desconhecido';
        acc[contentId].regions[region] = (acc[contentId].regions[region] || 0) + 1;

        return acc;
      }, {} as Record<string, Omit<AnalyticsData, 'paths' | 'regions'> & { paths: Record<string, number>, regions: Record<string, number> }>);

      // Formatar para o estado final
      const formattedAnalytics: AnalyticsData[] = Object.values(groupedData).map(item => ({
        ...item,
        paths: Object.entries(item.paths).map(([path, views]) => ({ path, views })).sort((a, b) => b.views - a.views),
        regions: Object.entries(item.regions).map(([regionName, views]) => ({ regionName, views })).sort((a, b) => b.views - a.views), // NEW
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

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const textColor = 'text-gray-900 dark:text-white';
  const secondaryTextColor = 'text-gray-500 dark:text-zinc-400';

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
          analytics.map((item) => (
            <Card key={item.contentId} className={cn(cardBg, borderColor, textColor)}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <LayoutGrid className="h-5 w-5 text-blue-500" />
                        {item.name}
                    </CardTitle>
                    <CardDescription className={secondaryTextColor}>
                        ID: <code className="text-sm bg-gray-100 dark:bg-[#020617] px-1 rounded">{item.contentId}</code>
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-3xl font-bold text-green-600 dark:text-green-400">
                    <TrendingUp className="h-6 w-6" />
                    {item.totalViews}
                    <span className="text-base font-normal text-gray-500 dark:text-zinc-400">visualizações</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Coluna 1: Visualizações por Rota */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                            <Route className="h-4 w-4" /> Visualizações por Rota (Path)
                        </h3>
                        <Table>
                            <TableHeader>
                                <TableRow className={cn(borderColor, "hover:bg-transparent")}>
                                    <TableHead className="text-gray-500 dark:text-zinc-400">Caminho</TableHead>
                                    <TableHead className="text-right text-gray-500 dark:text-zinc-400">Visualizações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {item.paths.map((pathItem, index) => (
                                    <TableRow key={index} className={cn(borderColor, "hover:bg-gray-50 dark:hover:bg-[#0f172a]")}>
                                        <TableCell className="font-mono text-sm text-blue-600 dark:text-blue-400">{pathItem.path}</TableCell>
                                        <TableCell className="text-right font-bold">{pathItem.views}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Coluna 2: Distribuição Geográfica */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> Distribuição por Região
                        </h3>
                        <Table>
                            <TableHeader>
                                <TableRow className={cn(borderColor, "hover:bg-transparent")}>
                                    <TableHead className="text-gray-500 dark:text-zinc-400">Região/Estado</TableHead>
                                    <TableHead className="text-right text-gray-500 dark:text-zinc-400">Visualizações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {item.regions.map((regionItem, index) => (
                                    <TableRow key={index} className={cn(borderColor, "hover:bg-gray-50 dark:hover:bg-[#0f172a]")}>
                                        <TableCell className="font-medium">{regionItem.regionName}</TableCell>
                                        <TableCell className="text-right font-bold">{regionItem.views}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  );
}