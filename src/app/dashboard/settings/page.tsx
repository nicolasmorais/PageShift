"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Database, CheckCircle, XCircle, Clock, Route, LayoutGrid, TrendingUp, Lock, RefreshCw, Settings, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

interface StatusMetrics {
    routes: number;
    advertorials: number;
    pageViews: number;
    lastPageView: string;
}

interface SystemStatus {
    status: 'OK' | 'ERROR';
    database: 'OK' | 'DOWN';
    authStatus: 'Configurado' | 'Padrão/Não Configurado';
    metrics: StatusMetrics;
    timestamp: string;
    message?: string;
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: 4 }).map((_, i: number) => (
      <Card key={i} className="bg-white border-gray-200 dark:bg-[#1e293b] dark:border-[#334155]"><CardHeader><Skeleton className="h-6 w-1/2 bg-gray-200 dark:bg-[#334155]" /></CardHeader><CardContent><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /></CardContent></Card>
    ))}
  </div>
);

const StatusIndicator = ({ status }: { status: string }) => {
    const isOk = status === 'OK' || status === 'Configurado';
    const Icon = isOk ? CheckCircle : XCircle;
    const color = isOk ? 'text-green-500' : 'text-red-500';
    const text = status || 'Indefinido';
    
    return (
        <div className={cn("flex items-center gap-2 font-semibold", color)}>
            <Icon className="h-5 w-5" />
            {text}
        </div>
    );
};

export default function SettingsPage() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      
      if (data && typeof data === 'object') {
        setStatus(data);
      } else {
        throw new Error("Resposta inválida do servidor");
      }
      
      if (!res.ok) {
        toast.error(data.message || "Falha ao verificar o status do sistema.");
      }
    } catch (error) {
      console.error("Erro ao carregar status:", error);
      toast.error("Erro de conexão com o servidor de status.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const textColor = 'text-gray-900 dark:text-white';
  const secondaryTextColor = 'text-gray-500 dark:text-zinc-400';

  if (isLoading) return <LoadingSkeleton />;
  
  const safeStatus = status || {
    status: 'ERROR',
    database: 'DOWN',
    authStatus: 'Padrão/Não Configurado',
    metrics: { routes: 0, advertorials: 0, pageViews: 0, lastPageView: 'N/A' },
    timestamp: new Date().toISOString()
  };

  const lastViewTime = (safeStatus.metrics && safeStatus.metrics.lastPageView !== 'N/A') 
    ? formatDistanceToNow(parseISO(safeStatus.metrics.lastPageView), { addSuffix: true, locale: ptBR })
    : 'Nunca';

  return (
    <>
      <Toaster richColors />
      <div className="space-y-6">
        <div className="flex items-center justify-between sticky top-0 z-10 py-4 bg-background border-b border-gray-100 dark:border-gray-800">
          <div>
            <h1 className={cn("text-2xl font-bold", textColor)}>Configurações</h1>
            <p className={secondaryTextColor}>Status da aplicação e configurações do sistema</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={fetchStatus} disabled={isLoading} className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-[#334155] dark:hover:bg-[#475569] dark:text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              {isLoading ? "Atualizando..." : "Atualizar"}
            </Button>
            <Link href="/dashboard/db-test">
              <Button className="bg-[#6B16ED] hover:bg-[#5512C7] text-white">
                <Database className="mr-2 h-4 w-4" />
                Teste de Banco
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status Geral</CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <StatusIndicator status={safeStatus.status} />
              <p className="text-xs text-gray-500 mt-1">Verificação: {safeStatus.timestamp ? formatDistanceToNow(parseISO(safeStatus.timestamp), { addSuffix: true, locale: ptBR }) : 'N/A'}</p>
            </CardContent>
          </Card>

          <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Banco de Dados</CardTitle>
              <Database className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <StatusIndicator status={safeStatus.database === 'OK' ? 'OK' : 'DOWN'} />
            </CardContent>
          </Card>
          
          <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Autenticação</CardTitle>
              <Lock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <StatusIndicator status={safeStatus.authStatus} />
            </CardContent>
          </Card>

          <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Visualização</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{lastViewTime}</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Metrics */}
        <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader><CardTitle>Métricas de Conteúdo</CardTitle></CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-lg font-semibold text-blue-500"><Route className="h-5 w-5" /> Rotas Mapeadas</div>
                        <p className="text-4xl font-bold">{safeStatus.metrics?.routes || 0}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-lg font-semibold text-purple-500"><LayoutGrid className="h-5 w-5" /> Advertoriais Dinâmicos</div>
                        <p className="text-4xl font-bold">{safeStatus.metrics?.advertorials || 0}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-lg font-semibold text-green-500"><TrendingUp className="h-5 w-5" /> Total de PageViews</div>
                        <p className="text-4xl font-bold">{safeStatus.metrics?.pageViews || 0}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        
        {/* System Actions */}
        <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Ações Rápidas
                </CardTitle>
                <CardDescription className={secondaryTextColor}>
                    Ferramentas e atalhos para gerenciamento do sistema
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/dashboard/db-test">
                        <Button variant="outline" className="w-full border-gray-200 dark:border-[#334155] hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-900 dark:text-white">
                            <Database className="mr-2 h-4 w-4" />
                            Teste de Conexão
                        </Button>
                    </Link>
                    <Link href="/dashboard/status">
                        <Button variant="outline" className="w-full border-gray-200 dark:border-[#334155] hover:bg-gray-100 dark:hover:bg-[#1e293b] text-gray-900 dark:text-white">
                            <Clock className="mr-2 h-4 w-4" />
                            Status Detalhado
                        </Button>
                    </Link>
                    <Link href="/init-database">
                        <Button variant="outline" className="w-full border-yellow-500 dark:border-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Inicializar BD
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
        
        {/* Error Message */}
        {safeStatus.message && (
            <Card className={cn(cardBg, borderColor, "border-red-500")}>
                <CardHeader><CardTitle className="text-red-500">Mensagem de Erro</CardTitle></CardHeader>
                <CardContent><p className="text-red-700 dark:text-red-300">{safeStatus.message}</p></CardContent>
            </Card>
        )}
      </div>
    </>
  );
}