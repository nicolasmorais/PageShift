"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils'; // Import cn
import { Zap, Code } from 'lucide-react';
import { DashboardSwitch } from '@/components/dashboard/DashboardSwitch';

interface Policy { title: string; trigger: string; content: string; }
interface Disclaimer { title: string; text: string; }
interface CompanyInfo { name: string; address: string; cnpj: string; contact: string; }
interface PagePixelConfig { metaPixelId: string; taboolaPixelId: string; customScripts: string; useGlobalPixels: boolean; }
interface ApprovalPageFooter { disclaimers: Disclaimer[]; companyInfo: CompanyInfo; policies: Policy[]; copyright: string; }
interface ApprovalPageContent {
  header: { preTitle: string; title: string; subheadline: string; };
  body: { imageUrl1: string; advertorialText: string; imageUrl2: string; guaranteeText: string; };
  pricing: { prePriceText: string; price: string; paymentType: string; buttonText: string; buttonUrl: string; postButtonText: string; };
  footer: ApprovalPageFooter;
  pixels: PagePixelConfig; // NEW
}

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <Card className="bg-white border-gray-200 dark:bg-[#1e293b] dark:border-[#334155]"><CardHeader><Skeleton className="h-6 w-1/4 bg-gray-200 dark:bg-[#334155]" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /></CardContent></Card>
    <Card className="bg-white border-gray-200 dark:bg-[#1e293b] dark:border-[#334155]"><CardHeader><Skeleton className="h-6 w-1/4 bg-gray-200 dark:bg-[#334155]" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-20 w-full bg-gray-200 dark:bg-[#334155]" /><Skeleton className="h-6 w-1/3 bg-gray-200 dark:bg-[#334155]" /><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /><Skeleton className="h-20 w-full bg-gray-200 dark:bg-[#334155]" /></CardContent></Card>
    <Card className="bg-white border-gray-200 dark:bg-[#1e293b] dark:border-[#334155]"><CardHeader><Skeleton className="h-6 w-1/4 bg-gray-200 dark:bg-[#334155]" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /></CardContent></Card>
  </div>
);

export default function ApprovalPageEditor() {
  const [content, setContent] = useState<ApprovalPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/approval-page').then(res => res.json()).then(data => { 
        // Garante que o campo pixels exista, se não, usa um default
        if (!data.pixels) {
            data.pixels = { metaPixelId: '', taboolaPixelId: '', customScripts: '', useGlobalPixels: true };
        }
        setContent(data); 
        setIsLoading(false); 
    }).catch(() => { toast.error("Falha ao carregar o conteúdo da página."); setIsLoading(false); });
  }, []);

  const handleInputChange = (section: keyof ApprovalPageContent, field: string, value: string) => {
    setContent(prev => {
      if (!prev) return null;
      const newContent = { ...prev };
      (newContent[section] as any)[field] = value;
      return newContent;
    });
  };
  
  const handleNestedInputChange = (section: keyof ApprovalPageContent, nestedKey: string, field: string, value: string) => {
    setContent(prev => {
        if (!prev) return null;
        const newContent = { ...prev };
        (newContent[section] as any)[nestedKey][field] = value;
        return newContent;
    });
  };

  // Corrigindo a tipagem para arrays aninhados dentro de 'footer'
  const handleArrayChange = <T extends object>(
    section: 'footer', 
    arrayName: 'disclaimers' | 'policies', 
    index: number, 
    field: keyof T, 
    value: string
  ) => {
    setContent(prev => {
        if (!prev) return null;
        const newContent = { ...prev };
        // Acessamos o array dentro do footer e atualizamos o item
        ((newContent[section] as any)[arrayName] as T[])[index][field] = value as any;
        return newContent;
    });
  };
  
  const handlePixelChange = (field: keyof PagePixelConfig, value: string | boolean) => {
    setContent(prev => {
        if (!prev) return null;
        const newContent = { ...prev };
        (newContent.pixels as any)[field] = value;
        return newContent;
    });
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/approval-page', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) });
      if (!response.ok) throw new Error('Failed to save');
      toast.success("Conteúdo salvo com sucesso!");
    } catch (error) {
      toast.error("Falha ao salvar o conteúdo.");
    } finally {
      setIsSaving(false);
    }
  };

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
  const primaryButtonClasses = 'bg-[#6B16ED] hover:bg-[#5512C7] text-white';
  const textColor = 'text-gray-900 dark:text-white';
  const labelColor = 'text-gray-600 dark:text-zinc-300';
  const descriptionColor = 'text-gray-500 dark:text-zinc-400';

  if (isLoading) return <LoadingSkeleton />;
  if (!content) return <p className={textColor}>Não foi possível carregar o conteúdo. Por favor, tente atualizar a página.</p>;

  return (
    <>
      <Toaster richColors />
      <div className="space-y-6">
        <div className="flex items-center justify-between sticky top-0 z-10 py-4 bg-background border-b border-gray-100 dark:border-gray-800">
          <div>
            <h1 className={cn("text-2xl font-bold", textColor)}>Editor da Página de Aprovação</h1>
            <p className={descriptionColor}>Modifique o conteúdo exibido na página de aprovação.</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className={primaryButtonClasses}>{isSaving ? "Salvando..." : "Salvar Alterações"}</Button>
        </div>

        <Card className={cn(cardBg, borderColor, textColor)}><CardHeader><CardTitle>Cabeçalho</CardTitle></CardHeader><CardContent className="space-y-4"><div><Label className={labelColor}>Pré-Título</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.header.preTitle} onChange={e => handleInputChange('header', 'preTitle', e.target.value)} /></div><div><Label className={labelColor}>Título Principal</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.header.title} onChange={e => handleInputChange('header', 'title', e.target.value)} /></div><div><Label className={labelColor}>Sub-headline</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.header.subheadline || ''} onChange={e => handleInputChange('header', 'subheadline', e.target.value)} /></div></CardContent></Card>
        
        <Card className={cn(cardBg, borderColor, textColor)}>
          <CardHeader><CardTitle>Corpo do Advertorial</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label className={labelColor}>URL da Imagem 1</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.body.imageUrl1} onChange={e => handleInputChange('body', 'imageUrl1', e.target.value)} /></div>
            <div><Label className={labelColor}>Texto do Advertorial</Label><Textarea className={cn(inputBg, borderColor, textColor)} value={content.body.advertorialText} onChange={e => handleInputChange('body', 'advertorialText', e.target.value)} rows={10} /></div>
            <div><Label className={labelColor}>URL da Imagem 2</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.body.imageUrl2} onChange={e => handleInputChange('body', 'imageUrl2', e.target.value)} /></div>
            <div><Label className={labelColor}>Texto de Garantia</Label><Textarea className={cn(inputBg, borderColor, textColor)} value={content.body.guaranteeText} onChange={e => handleInputChange('body', 'guaranteeText', e.target.value)} rows={3} /></div>
          </CardContent>
        </Card>

        <Card className={cn(cardBg, borderColor, textColor)}>
          <CardHeader><CardTitle>Seção de Preço</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label className={labelColor}>Texto Acima do Preço</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.pricing.prePriceText} onChange={e => handleInputChange('pricing', 'prePriceText', e.target.value)} /></div>
            <div><Label className={labelColor}>Preço (ex: R$ 29,90)</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.pricing.price} onChange={e => handleInputChange('pricing', 'price', e.target.value)} /></div>
            <div><Label className={labelColor}>Texto de Pagamento</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.pricing.paymentType} onChange={e => handleInputChange('pricing', 'paymentType', e.target.value)} /></div>
            <div><Label className={labelColor}>Texto do Botão</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.pricing.buttonText} onChange={e => handleInputChange('pricing', 'buttonText', e.target.value)} /></div>
            <div><Label className={labelColor}>URL do Botão</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.pricing.buttonUrl} onChange={e => handleInputChange('pricing', 'buttonUrl', e.target.value)} /></div>
            <div><Label className={labelColor}>Texto Abaixo do Botão</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.pricing.postButtonText} onChange={e => handleInputChange('pricing', 'postButtonText', e.target.value)} /></div>
          </CardContent>
        </Card>
        
        {/* PIXEL CONFIGURATION CARD */}
        <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-blue-500" /> Rastreamento (Pixels)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className={cn("flex items-center justify-between p-3 rounded-md", borderColor, "border bg-gray-50 dark:bg-[#0f172a]")}>
                    <Label className={labelColor}>Usar Configurações Globais?</Label>
                    <DashboardSwitch 
                        checked={content.pixels.useGlobalPixels} 
                        onCheckedChange={(checked) => handlePixelChange('useGlobalPixels', checked)}
                    />
                </div>
                
                <p className={descriptionColor}>Se a opção acima estiver desativada, use os campos abaixo. Se estiver ativada, os campos abaixo *substituirão* os globais se preenchidos.</p>

                <div>
                    <Label className={labelColor}>Meta Pixel ID (Local)</Label>
                    <Input 
                        className={cn(inputBg, borderColor, textColor)} 
                        value={content.pixels.metaPixelId} 
                        onChange={e => handlePixelChange('metaPixelId', e.target.value)} 
                        placeholder="Deixe vazio para usar o global"
                    />
                </div>
                
                <div>
                    <Label className={labelColor}>Taboola Pixel ID (Local)</Label>
                    <Input 
                        className={cn(inputBg, borderColor, textColor)} 
                        value={content.pixels.taboolaPixelId} 
                        onChange={e => handlePixelChange('taboolaPixelId', e.target.value)} 
                        placeholder="Deixe vazio para usar o global"
                    />
                </div>
                
                <div className="pt-2">
                    <Label className={labelColor}>Scripts Adicionais (Local)</Label>
                    <Textarea 
                        className={cn(inputBg, borderColor, textColor, "font-mono text-sm")} 
                        value={content.pixels.customScripts} 
                        onChange={e => handlePixelChange('customScripts', e.target.value)} 
                        rows={5}
                        placeholder="<!-- Scripts específicos desta página -->"
                    />
                </div>
            </CardContent>
        </Card>

        <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader><CardTitle>Rodapé</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                {/* Company Info */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg">Informações da Empresa</h3>
                    <div><Label className={labelColor}>Nome da Empresa</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.footer.companyInfo.name} onChange={e => handleNestedInputChange('footer', 'companyInfo', 'name', e.target.value)} /></div>
                    <div><Label className={labelColor}>Endereço</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.footer.companyInfo.address} onChange={e => handleNestedInputChange('footer', 'companyInfo', 'address', e.target.value)} /></div>
                    <div><Label className={labelColor}>CNPJ</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.footer.companyInfo.cnpj} onChange={e => handleNestedInputChange('footer', 'companyInfo', 'cnpj', e.target.value)} /></div>
                    <div><Label className={labelColor}>Contato</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.footer.companyInfo.contact} onChange={e => handleNestedInputChange('footer', 'companyInfo', 'contact', e.target.value)} /></div>
                </div>

                {/* Disclaimers */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg">Avisos e Isenções</h3>
                    {content.footer.disclaimers.map((disclaimer, index) => (
                        <div key={index} className={cn("space-y-2 p-2 border-b", borderColor)}>
                            <div><Label className={labelColor}>Título do Aviso {index + 1}</Label><Input className={cn(inputBg, borderColor, textColor)} value={disclaimer.title} onChange={e => handleArrayChange<Disclaimer>('footer', 'disclaimers', index, 'title', e.target.value)} /></div>
                            <div><Label className={labelColor}>Texto do Aviso {index + 1}</Label><Textarea className={cn(inputBg, borderColor, textColor)} value={disclaimer.text} onChange={e => handleArrayChange<Disclaimer>('footer', 'disclaimers', index, 'text', e.target.value)} rows={3} /></div>
                        </div>
                    ))}
                </div>

                {/* Policies */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg">Políticas</h3>
                    {content.footer.policies.map((policy, index) => (
                        <div key={index} className={cn("space-y-2 p-2 border-b", borderColor)}>
                            <div><Label className={labelColor}>Título da Política {index + 1}</Label><Input className={cn(inputBg, borderColor, textColor)} value={policy.title} onChange={e => handleArrayChange<Policy>('footer', 'policies', index, 'title', e.target.value)} /></div>
                            <div><Label className={labelColor}>Texto do Gatilho (Link) {index + 1}</Label><Input className={cn(inputBg, borderColor, textColor)} value={policy.trigger} onChange={e => handleArrayChange<Policy>('footer', 'policies', index, 'trigger', e.target.value)} /></div>
                            <div><Label className={labelColor}>Conteúdo da Política {index + 1}</Label><Textarea className={cn(inputBg, borderColor, textColor)} value={policy.content} onChange={e => handleArrayChange<Policy>('footer', 'policies', index, 'content', e.target.value)} rows={8} /></div>
                        </div>
                    ))}
                </div>
                
                {/* Copyright */}
                <div><Label className={labelColor}>Direitos Autorais</Label><Input className={cn(inputBg, borderColor, textColor)} value={content.footer.copyright} onChange={e => handleInputChange('footer', 'copyright', e.target.value)} /></div>
            </CardContent>
            <CardFooter className="flex justify-end"><Button onClick={handleSave} disabled={isSaving} className={primaryButtonClasses}>{isSaving ? "Salvando..." : "Salvar Alterações"}</Button></CardFooter>
        </Card>
      </div>
    </>
  );
}