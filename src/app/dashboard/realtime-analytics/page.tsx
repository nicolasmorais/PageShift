"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster, toast } from "sonner";
import { Map, Users, Clock, Globe, Smartphone, Monitor, RefreshCw, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VisitData } from '@/lib/advertorial-types';
import { RealtimeMap } from '@/components/analytics/RealtimeMap';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';

// Limite de itens na lista em tempo real
const REALTIME_LIST_LIMIT = 10;

// Cores Dinâmicas
const cardBg = 'bg-white dark:bg-[#1e293b]';
const borderColor = 'border-gray-200 dark:border-[#334155]';
const textColor = 'text-gray-900 dark:text-white';
const secondaryTextColor = 'text-gray-500 dark:text-zinc-400';

export default function RealtimeAnalyticsPage() {
    const [activeVisitors, setActiveVisitors] = useState<number>(0);
    const [realtimeVisits, setRealtimeVisits] = useState<VisitData[]>([]);
    const [historicalVisits, setHistoricalVisits] = useState<VisitData[]>([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);

    // Função para adicionar nova visita à lista em tempo real
    const handleNewVisit = (visit: VisitData) => {
        setRealtimeVisits(prev => {
            const newVisits = [visit, ...prev];
            return newVisits.slice(0, REALTIME_LIST_LIMIT);
        });
    };

    // Função para buscar o histórico (últimas 50 visitas)
    const fetchHistoricalVisits = async () => {
        setIsHistoryLoading(true);
        try {
            const res = await fetch('/api/analytics/visits?limit=50');
            if (!res.ok) throw new Error('Failed to fetch history');
            const data: VisitData[] = await res.json();
            setHistoricalVisits(data);
        } catch (error) {
            toast.error("Falha ao carregar o histórico de visitas.");
            console.error(error);
        } finally {
            setIsHistoryLoading(false);
        }
    };

    useEffect(() => {
        fetchHistoricalVisits();
    }, []);

    // Formatação de dados para o gráfico de acessos por minuto (simples)
    const visitsPerMinute = useMemo(() => {
        // Agrupa visitas por minuto (últimos 30 minutos)
        const now = Date.now();
        const thirtyMinutesAgo = now - 30 * 60 * 1000;
        
        const minuteCounts: Record<string, number> = {};
        
        // Combina visitas em tempo real e históricas recentes
        const relevantVisits = [...realtimeVisits, ...historicalVisits].filter(visit => {
            const timestamp = new Date(visit.createdAt).getTime();
            return timestamp > thirtyMinutesAgo;
        });

        relevantVisits.forEach(visit => {
            const minuteKey = format(new Date(visit.createdAt), 'HH:mm', { locale: ptBR });
            minuteCounts[minuteKey] = (minuteCounts[minuteKey] || 0) + 1;
        });

        // Cria uma série de dados para os últimos 30 minutos (para preencher vazios)
        const dataSeries = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date(now - i * 60 * 1000);
            const minuteKey = format(date, 'HH:mm', { locale: ptBR });
            dataSeries.push({
                name: minuteKey,
                views: minuteCounts[minuteKey] || 0,
            });
        }
        
        return dataSeries;
    }, [realtimeVisits, historicalVisits]);


    return (
        <>
            <Toaster richColors />
            <div className="space-y-6">
                <div className="flex items-center justify-between sticky top-0 z-10 py-4 bg-background border-b border-gray-100 dark:border-gray-800">
                    <div>
                        <h1 className={cn("text-2xl font-bold", textColor)}>Analytics em Tempo Real</h1>
                        <p className={secondaryTextColor}>Visualização de visitantes ao vivo e histórico recente.</p>
                    </div>
                    <div className="flex space-x-2">
                        <a href="/dashboard/analytics">
                            <Button variant="outline" className={cn(borderColor, "hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-900 dark:text-white")}>
                                <BarChart className="mr-2 h-4 w-4" />
                                Ver Histórico Agregado
                            </Button>
                        </a>
                        <Button onClick={fetchHistoricalVisits} disabled={isHistoryLoading} variant="outline" className={cn(borderColor, "hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-900 dark:text-white")}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {isHistoryLoading ? "Carregando..." : "Recarregar Histórico"}
                        </Button>
                    </div>
                </div>

                {/* Métricas em Tempo Real */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className={cn(cardBg, borderColor, textColor)}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Visitantes Ativos (Socket)</CardTitle>
                            <Users className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-blue-600">{activeVisitors}</div>
                            <p className="text-xs text-gray-500 mt-1">Conexões ativas no servidor Socket.IO.</p>
                        </CardContent>
                    </Card>
                    
                    <Card className={cn(cardBg, borderColor, textColor)}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Última Visita</CardTitle>
                            <Clock className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold">
                                {realtimeVisits.length > 0 
                                    ? format(new Date(realtimeVisits[0].createdAt), 'HH:mm:ss', { locale: ptBR })
                                    : 'Aguardando...'}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {realtimeVisits.length > 0 
                                    ? `${realtimeVisits[0].city}, ${realtimeVisits[0].region}`
                                    : 'Nenhuma visita recente.'}
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card className={cn(cardBg, borderColor, textColor)}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Acessos por Minuto (Últimos 30m)</CardTitle>
                            <BarChart className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            {/* Gráfico simples (usando Recharts, se necessário, mas por simplicidade, vou apenas mostrar o pico) */}
                            <div className="text-4xl font-bold text-green-600">
                                {Math.max(...visitsPerMinute.map(v => v.views))}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Pico de views no último minuto.</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Mapa e Lista */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Mapa (2/3) */}
                    <Card className={cn(cardBg, borderColor, textColor, "lg:col-span-2")}>
                        <CardHeader><CardTitle className="flex items-center gap-2"><Map className="h-5 w-5 text-purple-500" /> Mapa de Visitantes ao Vivo</CardTitle></CardHeader>
                        <CardContent>
                            <RealtimeMap 
                                onNewVisit={handleNewVisit} 
                                onActiveVisitorsChange={setActiveVisitors} 
                            />
                        </CardContent>
                    </Card>

                    {/* Lista em Tempo Real (1/3) */}
                    <Card className={cn(cardBg, borderColor, textColor, "lg:col-span-1")}>
                        <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-orange-500" /> Últimos {REALTIME_LIST_LIMIT} Acessos</CardTitle></CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className={cn(borderColor, "hover:bg-transparent")}>
                                        <TableHead className="text-gray-500 dark:text-zinc-400">Local</TableHead>
                                        <TableHead className="text-right text-gray-500 dark:text-zinc-400">Dispositivo</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {realtimeVisits.map((visit) => (
                                        <TableRow key={visit.id} className={cn(borderColor, "hover:bg-gray-50 dark:hover:bg-[#0f172a]")}>
                                            <TableCell>
                                                <div className="font-medium text-sm">{visit.city} ({visit.region})</div>
                                                <div className="text-xs text-gray-500 dark:text-zinc-400">{format(new Date(visit.createdAt), 'HH:mm:ss', { locale: ptBR })}</div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1 text-sm">
                                                    {visit.deviceType === 'mobile' || visit.deviceType === 'tablet' ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                                                    {visit.os}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {realtimeVisits.length === 0 && (
                                        <TableRow className={cn(borderColor, "hover:bg-transparent")}>
                                            <TableCell colSpan={2} className="text-center text-gray-500 dark:text-zinc-500">
                                                Aguardando novos acessos...
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Histórico de Visitas (Tabela Paginada Simples) */}
                <Card className={cn(cardBg, borderColor, textColor)}>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-blue-500" /> Histórico Recente de Visitas</CardTitle></CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className={cn(borderColor, "hover:bg-transparent")}>
                                    <TableHead className="text-gray-500 dark:text-zinc-400">Horário</TableHead>
                                    <TableHead className="text-gray-500 dark:text-zinc-400">Localização</TableHead>
                                    <TableHead className="text-gray-500 dark:text-zinc-400">Dispositivo</TableHead>
                                    <TableHead className="text-gray-500 dark:text-zinc-400">Navegador/OS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isHistoryLoading ? (
                                    <TableRow className={cn(borderColor, "hover:bg-transparent")}>
                                        <TableCell colSpan={4} className="text-center text-gray-500 dark:text-zinc-500">
                                            Carregando histórico...
                                        </TableCell>
                                    </TableRow>
                                ) : historicalVisits.length === 0 ? (
                                    <TableRow className={cn(borderColor, "hover:bg-transparent")}>
                                        <TableCell colSpan={4} className="text-center text-gray-500 dark:text-zinc-500">
                                            Nenhum histórico encontrado.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    historicalVisits.map((visit) => (
                                        <TableRow key={visit.id} className={cn(borderColor, "hover:bg-gray-50 dark:hover:bg-[#0f172a]")}>
                                            <TableCell className="text-sm">
                                                {format(new Date(visit.createdAt), 'dd/MM HH:mm:ss', { locale: ptBR })}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {visit.city}, {visit.region}, {visit.country}
                                            </TableCell>
                                            <TableCell className="text-sm capitalize">
                                                {visit.deviceType}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {visit.browser} ({visit.os})
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}