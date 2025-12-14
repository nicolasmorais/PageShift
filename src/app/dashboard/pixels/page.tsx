"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { GlobalPixelConfig } from '@/lib/advertorial-types'; // Corrigido: Usando GlobalPixelConfig
import { Save, Zap, Code } from 'lucide-react';

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <Card className="bg-white border-gray-200 dark:bg-[#1e293b] dark:border-[#334155]"><CardHeader><Skeleton className="h-6 w-1/4 bg-gray-200 dark:bg-[#334155]" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /></CardContent></Card>
    <Card className="bg-white border-gray-200 dark:bg-[#1e293b] dark:border-[#334155]"><CardHeader><Skeleton className="h-6 w-1/4 bg-gray-200 dark:bg-[#334155]" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-40 w-full bg-gray-200 dark:bg-[#334155]" /></CardContent></Card>
  </div>
);

export default function PixelManagerPage() {
  const [config, setConfig] = useState<GlobalPixelConfig | null>(null); // Corrigido: Usando GlobalPixelConfig
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const fetchConfig = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const res: Response = await fetch('/api/pixels');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: GlobalPixelConfig = await res.json();
      setConfig(data);
    } catch (error) {
      toast.error("Falha ao carregar a configuração de pixels.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleInputChange = (field: keyof GlobalPixelConfig, value: string): void => { // Corrigido: Tipagem de field
    setConfig((prev: GlobalPixelConfig | null) => { // Corrigido: Tipagem de prev
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const handleSave = async (): Promise<void> => {
    if (!config) return;
    setIsSaving(true);
    try {
      const response: Response = await fetch('/api/pixels', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(config) 
      });
      if (!response.ok) throw new Error('Failed to save');
      toast.success("Configuração de Pixel salva com sucesso!");
    } catch (error) {
      toast.error("Falha ao salvar a configuração.");
    } finally {
      setIsSaving(false);
    }
  };

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
  const primaryButtonClasses = 'bg-[#38bdf8] hover:bg-[#0ea5e9] text-white';
  const textColor = 'text-gray-900 dark:text-white';
  const labelColor = 'text-gray-600 dark:text-zinc-300';
  const descriptionColor = 'text-gray-500 dark:text-zinc-400';

  if (isLoading) return <LoadingSkeleton />;
  if (!config) return <p className={textColor}>Não foi possível carregar a configuração.</p>;

  return (
    <>
      <Toaster richColors />
      <div className="space-y-6">
        <div className="flex items-center justify-between sticky top-0 z-10 py-4 bg-background">
          <div>
            <h1 className={cn("text-2xl font-bold", textColor)}>Gerenciamento de Pixels</h1>
            <p className={descriptionColor}>Configure os IDs de rastreamento globais para Meta Ads e Taboola.</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className={primaryButtonClasses}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </div>

        <Card className={cn(cardBg, borderColor, textColor)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-blue-500" /> Pixels de Rastreamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className={descriptionColor}>Estes pixels serão injetados em *todas* as páginas do seu site para rastreamento de PageView.</p>
            
            <div>
              <Label className={labelColor}>Meta Pixel ID (Facebook/Instagram)</Label>
              <Input 
                className={cn(inputBg, borderColor, textColor)} 
                value={config.metaPixelId} 
                onChange={e => handleInputChange('metaPixelId', e.target.value)} 
                placeholder="Ex: 123456789012345"
              />
            </div>
            
            <div>
              <Label className={labelColor}>Taboola Pixel ID</Label>
              <Input 
                className={cn(inputBg, borderColor, textColor)} 
                value={config.taboolaPixelId} 
                onChange={e => handleInputChange('taboolaPixelId', e.target.value)} 
                placeholder="Ex: seu_taboola_id"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className={cn(cardBg, borderColor, textColor)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Code className="h-5 w-5 text-purple-500" /> Scripts Globais Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className={descriptionColor}>Insira aqui scripts de rastreamento completos (ex: Google Analytics, TikTok, etc.). O conteúdo será injetado no final do &lt;head&gt;.</p>
            <Textarea 
              className={cn(inputBg, borderColor, textColor, "font-mono text-sm")} 
              value={config.globalScripts} 
              onChange={e => handleInputChange('globalScripts', e.target.value)} 
              rows={10}
              placeholder="<!-- Insira seu script aqui -->"
            />
          </CardContent>
        </Card>

        <div className="flex justify-end pb-4">
          <Button onClick={handleSave} disabled={isSaving} className={primaryButtonClasses}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </div>
      </div>
    </>
  );
}