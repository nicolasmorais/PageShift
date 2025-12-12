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
import { cn } from '@/lib/utils';
import { Database, CheckCircle, XCircle, Clock, Route, LayoutGrid, TrendingUp, Lock } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button'; // Adicionando importação do Button

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
    {Array.from({ length: 4 }).map((_, i) => (
      <Card key={i} className="bg-white border-gray-200 dark:bg-[#1e293b] dark:border-[#334155]"><CardHeader><Skeleton className="h-6 w-1/2 bg-gray-200 dark:bg-[#334155]" /></CardHeader><CardContent><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /></CardContent></Card>
    ))}
  </div>
);

const StatusIndicator = ({ status }: { status: 'OK' | 'ERROR' | 'Configurado' | 'Padrão/Não Configurado' | 'DOWN' }) => {
    const isOk = status === 'OK' || status === 'Configurado';
    const Icon = isOk ? CheckCircle : XCircle;
    const color = isOk ? 'text-green-500' : 'text-red-500';
    const text = isOk ? status : (status === 'DOWN' ? 'Fora do Ar' : 'Atenção');
    
    return (
        <div className={cn("flex items-center gap-2 font-semibold", color)}>
            <Icon className="h-5 w-5" />
            {text}
        </div>
    );
};

export default function StatusPage() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      if (!res.ok) {
        // Se o status HTTP for erro, mas o JSON vier, use-o
        setStatus(data);
        toast.error(data.message || "Falha ao verificar o status do sistema.");
      } else {
        setStatus(data);
      }
    } catch (error) {
      setStatus({
        status: 'ERROR',
        database: 'DOWN',
        authStatus: 'Padrão/Não Configurado',
        metrics: { routes: 0, advertorials: 0, pageViews: 0, lastPageView: 'N/A' },
        timestamp: new Date().toISOString(),
        message: 'Erro de conexão com o servidor de status.',
      });
      toast.error("Erro de conexão com o servidor de status.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Opcional: Recarregar a cada 60 segundos
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const textColor = 'text-gray-900 dark:text-white';
  const secondaryTextColor = 'text-gray-500 dark:text-zinc-400';

  if (isLoading) return <LoadingSkeleton />;
  if (!status) return <p className={textColor}>Não foi possível carregar o status.</p>;

  const lastViewTime = status.metrics.lastPageView !== 'N/A' 
    ? formatDistanceToNow(parseISO(status.metrics.lastPageView), { addSuffix: true, locale: ptBR })
    : 'Nunca';

  return (
    <>
      <Toaster richColors />
      <div className="space-y-6">
        <div className="flex items-center justify-between sticky top-0 z-10 py-4 bg-background border-b border-gray-100 dark:border-gray-800">
          <div>
            <h1 className={cn("text-2xl font-bold", textColor)}>Status do Sistema</h1>
            <p className={secondaryTextColor}>Monitoramento em tempo real da saúde da aplicação.</p>
          </div>
          <Button onClick={fetchStatus} disabled={isLoading} className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-[#334155] dark:hover:bg-[#475569] dark:text-white">
            <Clock className="mr-2 h-4 w-4" />
            {isLoading ? "Atualizando..." : "Atualizar Agora"}
          </Button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Status Geral */}
          <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status Geral</CardTitle>
              <Clock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <StatusIndicator status={status.status} />
              <p className="text-xs text-gray-500 mt-1">Última verificação: {formatDistanceToNow(parseISO(status.timestamp), { addSuffix: true, locale: ptBR })}</p>
            </CardContent>
          </Card>

          {/* Status do Banco de Dados */}
          <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Banco de Dados (lowdb)</CardTitle>
              <Database className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <StatusIndicator status={status.database === 'OK' ? 'OK' : 'DOWN'} />
              <p className="text-xs text-gray-500 mt-1">Armazenamento de dados persistente.</p>
            </CardContent>
          </Card>
          
          {/* Status de Autenticação */}
          <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Autenticação</CardTitle>
              <Lock className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <StatusIndicator status={status.authStatus} />
              <p className="text-xs text-gray-500 mt-1">Senha de acesso ao dashboard.</p>
            </CardContent>
          </Card>

          {/* Última Visualização */}
          <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Visualização</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{lastViewTime}</div>
              <p className="text-xs text-gray-500 mt-1">Evento de PageView mais recente.</p>
            </CardContent>
          </Card>
        </div>

        {/* Metrics Card */}
        <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader><CardTitle>Métricas de Conteúdo</CardTitle></CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-lg font-semibold text-blue-500"><Route className="h-5 w-5" /> Rotas Mapeadas</div>
                        <p className="text-4xl font-bold">{status.metrics.routes}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-lg font-semibold text-purple-500"><LayoutGrid className="h-5 w-5" /> Advertoriais Dinâmicos</div>
                        <p className="text-4xl font-bold">{status.metrics.advertorials}</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-lg font-semibold text-green-500"><TrendingUp className="h-5 w-5" /> Total de PageViews</div>
                        <p className="text-4xl font-bold">{status.metrics.pageViews}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        
        {status.message && (
            <Card className={cn(cardBg, borderColor, "border-red-500")}>
                <CardHeader><CardTitle className="text-red-500">Mensagem de Erro</CardTitle></CardHeader>
                <CardContent><p className="text-red-700 dark:text-red-300">{status.message}</p></CardContent>
            </Card>
        )}
      </div>
    </>
  );
}