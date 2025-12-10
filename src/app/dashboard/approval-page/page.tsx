"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils'; // Import cn

interface Policy { title: string; trigger: string; content: string; }
interface Disclaimer { title: string; text: string; }
interface CompanyInfo { name: string; address: string; cnpj: string; contact: string; }
interface ApprovalPageFooter { disclaimers: Disclaimer[]; companyInfo: CompanyInfo; policies: Policy[]; copyright: string; }
interface ApprovalPageContent {
  header: { preTitle: string; title: string; subheadline: string; };
  body: { imageUrl1: string; advertorialText: string; imageUrl2: string; guaranteeText: string; };
  pricing: { prePriceText: string; price: string; paymentType: string; buttonText: string; buttonUrl: string; postButtonText: string; };
  footer: ApprovalPageFooter;
}

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <Card className="bg-[#0f172a] border-[#1e293b]"><CardHeader><Skeleton className="h-6 w-1/4 bg-[#1e293b]" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-10 w-full bg-[#1e293b]" /><Skeleton className="h-10 w-full bg-[#1e293b]" /></CardContent></Card>
    <Card className="bg-[#0f172a] border-[#1e293b]"><CardHeader><Skeleton className="h-6 w-1/4 bg-[#1e293b]" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-20 w-full bg-[#1e293b]" /><Skeleton className="h-6 w-1/3 bg-[#1e293b]" /><Skeleton className="h-10 w-full bg-[#1e293b]" /><Skeleton className="h-10 w-full bg-[#1e293b]" /><Skeleton className="h-20 w-full bg-[#1e293b]" /></CardContent></Card>
    <Card className="bg-[#0f172a] border-[#1e293b]"><CardHeader><Skeleton className="h-6 w-1/4 bg-[#1e293b]" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-10 w-full bg-[#1e293b]" /><Skeleton className="h-10 w-full bg-[#1e293b]" /><Skeleton className="h-10 w-full bg-[#1e293b]" /><Skeleton className="h-10 w-full bg-[#1e293b]" /></CardContent></Card>
  </div>
);

export default function ApprovalPageEditor() {
  const [content, setContent] = useState<ApprovalPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/approval-page').then(res => res.json()).then(data => { setContent(data); setIsLoading(false); }).catch(() => { toast.error("Falha ao carregar o conteúdo da página."); setIsLoading(false); });
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

  // Cores ajustadas
  const cardBg = 'bg-[#0f172a]';
  const borderColor = 'border-[#1e293b]';
  const inputBg = 'bg-[#00030a]';
  const primaryButtonClasses = 'bg-[#0bc839] hover:bg-[#09a82e] text-white';

  if (isLoading) return <LoadingSkeleton />;
  if (!content) return <p className="text-white">Não foi possível carregar o conteúdo. Por favor, tente atualizar a página.</p>;

  return (
    <>
      <Toaster richColors />
      <div className="space-y-6">
        <div className="flex items-center justify-between sticky top-4 z-10 py-2">
          <div>
            <h1 className="text-2xl font-bold text-white">Editor da Página de Aprovação</h1>
            <p className="text-zinc-400">Modifique o conteúdo exibido na página de aprovação.</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className={primaryButtonClasses}>{isSaving ? "Salvando..." : "Salvar Alterações"}</Button>
        </div>

        <Card className={cn(cardBg, borderColor, "text-white")}><CardHeader><CardTitle>Cabeçalho</CardTitle></CardHeader><CardContent className="space-y-4"><div><Label className="text-zinc-300">Pré-Título</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.header.preTitle} onChange={e => handleInputChange('header', 'preTitle', e.target.value)} /></div><div><Label className="text-zinc-300">Título Principal</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.header.title} onChange={e => handleInputChange('header', 'title', e.target.value)} /></div><div><Label className="text-zinc-300">Sub-headline</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.header.subheadline || ''} onChange={e => handleInputChange('header', 'subheadline', e.target.value)} /></div></CardContent></Card>
        
        <Card className={cn(cardBg, borderColor, "text-white")}>
          <CardHeader><CardTitle>Corpo do Advertorial</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label className="text-zinc-300">URL da Imagem 1</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.body.imageUrl1} onChange={e => handleInputChange('body', 'imageUrl1', e.target.value)} /></div>
            <div><Label className="text-zinc-300">Texto do Advertorial</Label><Textarea className={cn(inputBg, borderColor, "text-white")} value={content.body.advertorialText} onChange={e => handleInputChange('body', 'advertorialText', e.target.value)} rows={10} /></div>
            <div><Label className="text-zinc-300">URL da Imagem 2</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.body.imageUrl2} onChange={e => handleInputChange('body', 'imageUrl2', e.target.value)} /></div>
            <div><Label className="text-zinc-300">Texto de Garantia</Label><Textarea className={cn(inputBg, borderColor, "text-white")} value={content.body.guaranteeText} onChange={e => handleInputChange('body', 'guaranteeText', e.target.value)} rows={3} /></div>
          </CardContent>
        </Card>

        <Card className={cn(cardBg, borderColor, "text-white")}>
          <CardHeader><CardTitle>Seção de Preço</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label className="text-zinc-300">Texto Acima do Preço</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.pricing.prePriceText} onChange={e => handleInputChange('pricing', 'prePriceText', e.target.value)} /></div>
            <div><Label className="text-zinc-300">Preço (ex: R$ 29,90)</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.pricing.price} onChange={e => handleInputChange('pricing', 'price', e.target.value)} /></div>
            <div><Label className="text-zinc-300">Texto de Pagamento</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.pricing.paymentType} onChange={e => handleInputChange('pricing', 'paymentType', e.target.value)} /></div>
            <div><Label className="text-zinc-300">Texto do Botão</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.pricing.buttonText} onChange={e => handleInputChange('pricing', 'buttonText', e.target.value)} /></div>
            <div><Label className="text-zinc-300">URL do Botão</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.pricing.buttonUrl} onChange={e => handleInputChange('pricing', 'buttonUrl', e.target.value)} /></div>
            <div><Label className="text-zinc-300">Texto Abaixo do Botão</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.pricing.postButtonText} onChange={e => handleInputChange('pricing', 'postButtonText', e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card className={cn(cardBg, borderColor, "text-white")}>
            <CardHeader><CardTitle>Rodapé</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                {/* Company Info */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg">Informações da Empresa</h3>
                    <div><Label className="text-zinc-300">Nome da Empresa</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.footer.companyInfo.name} onChange={e => handleNestedInputChange('footer', 'companyInfo', 'name', e.target.value)} /></div>
                    <div><Label className="text-zinc-300">Endereço</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.footer.companyInfo.address} onChange={e => handleNestedInputChange('footer', 'companyInfo', 'address', e.target.value)} /></div>
                    <div><Label className="text-zinc-300">CNPJ</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.footer.companyInfo.cnpj} onChange={e => handleNestedInputChange('footer', 'companyInfo', 'cnpj', e.target.value)} /></div>
                    <div><Label className="text-zinc-300">Contato</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.footer.companyInfo.contact} onChange={e => handleNestedInputChange('footer', 'companyInfo', 'contact', e.target.value)} /></div>
                </div>

                {/* Disclaimers */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg">Avisos e Isenções</h3>
                    {content.footer.disclaimers.map((disclaimer, index) => (
                        <div key={index} className={cn("space-y-2 p-2 border-b", borderColor)}>
                            <div><Label className="text-zinc-300">Título do Aviso {index + 1}</Label><Input className={cn(inputBg, borderColor, "text-white")} value={disclaimer.title} onChange={e => handleArrayChange<Disclaimer>('footer', 'disclaimers', index, 'title', e.target.value)} /></div>
                            <div><Label className="text-zinc-300">Texto do Aviso {index + 1}</Label><Textarea className={cn(inputBg, borderColor, "text-white")} value={disclaimer.text} onChange={e => handleArrayChange<Disclaimer>('footer', 'disclaimers', index, 'text', e.target.value)} rows={3} /></div>
                        </div>
                    ))}
                </div>

                {/* Policies */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg">Políticas</h3>
                    {content.footer.policies.map((policy, index) => (
                        <div key={index} className={cn("space-y-2 p-2 border-b", borderColor)}>
                            <div><Label className="text-zinc-300">Título da Política {index + 1}</Label><Input className={cn(inputBg, borderColor, "text-white")} value={policy.title} onChange={e => handleArrayChange<Policy>('footer', 'policies', index, 'title', e.target.value)} /></div>
                            <div><Label className="text-zinc-300">Texto do Gatilho (Link) {index + 1}</Label><Input className={cn(inputBg, borderColor, "text-white")} value={policy.trigger} onChange={e => handleArrayChange<Policy>('footer', 'policies', index, 'trigger', e.target.value)} /></div>
                            <div><Label className="text-zinc-300">Conteúdo da Política {index + 1}</Label><Textarea className={cn(inputBg, borderColor, "text-white")} value={policy.content} onChange={e => handleArrayChange<Policy>('footer', 'policies', index, 'content', e.target.value)} rows={8} /></div>
                        </div>
                    ))}
                </div>
                
                {/* Copyright */}
                <div><Label className="text-zinc-300">Direitos Autorais</Label><Input className={cn(inputBg, borderColor, "text-white")} value={content.footer.copyright} onChange={e => handleInputChange('footer', 'copyright', e.target.value)} /></div>
            </CardContent>
            <CardFooter className="flex justify-end"><Button onClick={handleSave} disabled={isSaving} className={primaryButtonClasses}>{isSaving ? "Salvando..." : "Salvar Alterações"}</Button></CardFooter>
        </Card>
      </div>
    </>
  );
}