"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2 } from 'lucide-react';

interface ApprovalPageContent {
  header: { preTitle: string; title: string; };
  content: { intro: string; pillarsTitle: string; pillars: string[]; outro: string; };
  footer: { disclaimer: string; copyright: string; };
}

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader><Skeleton className="h-6 w-1/4 bg-zinc-800" /></CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full bg-zinc-800" />
        <Skeleton className="h-10 w-full bg-zinc-800" />
      </CardContent>
    </Card>
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader><Skeleton className="h-6 w-1/4 bg-zinc-800" /></CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-20 w-full bg-zinc-800" />
        <Skeleton className="h-6 w-1/3 bg-zinc-800" />
        <Skeleton className="h-10 w-full bg-zinc-800" />
        <Skeleton className="h-10 w-full bg-zinc-800" />
        <Skeleton className="h-20 w-full bg-zinc-800" />
      </CardContent>
    </Card>
  </div>
);

export default function ApprovalPageEditor() {
  const [content, setContent] = useState<ApprovalPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/approval-page')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Falha ao carregar o conteúdo da página.");
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (section: keyof ApprovalPageContent, field: string, value: string) => {
    setContent(prev => {
      if (!prev) return null;
      return { ...prev, [section]: { ...prev[section], [field]: value } };
    });
  };

  const handlePillarChange = (index: number, value: string) => {
    setContent(prev => {
      if (!prev) return null;
      const newPillars = [...prev.content.pillars];
      newPillars[index] = value;
      return { ...prev, content: { ...prev.content, pillars: newPillars } };
    });
  };

  const addPillar = () => {
    setContent(prev => {
      if (!prev) return null;
      return { ...prev, content: { ...prev.content, pillars: [...prev.content.pillars, "Novo Pilar"] } };
    });
  };

  const removePillar = (index: number) => {
    setContent(prev => {
      if (!prev) return null;
      const newPillars = prev.content.pillars.filter((_, i) => i !== index);
      return { ...prev, content: { ...prev.content, pillars: newPillars } };
    });
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/approval-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!response.ok) throw new Error('Failed to save');
      toast.success("Conteúdo salvo com sucesso!");
    } catch (error) {
      toast.error("Falha ao salvar o conteúdo.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (!content) return <p className="text-white">Não foi possível carregar o conteúdo. Por favor, tente atualizar a página.</p>;

  return (
    <>
      <Toaster richColors />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Editor da Página de Aprovação</h1>
            <p className="text-zinc-400">Modifique o conteúdo exibido na página de aprovação.</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>

        <Card className="bg-zinc-900/50 border-zinc-800 text-white">
          <CardHeader><CardTitle>Cabeçalho</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-zinc-300">Pré-Título</Label>
              <Input className="bg-zinc-800 border-zinc-700 text-white" value={content.header.preTitle} onChange={e => handleInputChange('header', 'preTitle', e.target.value)} />
            </div>
            <div>
              <Label className="text-zinc-300">Título Principal</Label>
              <Input className="bg-zinc-800 border-zinc-700 text-white" value={content.header.title} onChange={e => handleInputChange('header', 'title', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800 text-white">
          <CardHeader><CardTitle>Conteúdo Principal</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-zinc-300">Parágrafo de Introdução</Label>
              <Textarea className="bg-zinc-800 border-zinc-700 text-white" value={content.content.intro} onChange={e => handleInputChange('content', 'intro', e.target.value)} rows={3} />
            </div>
            <div>
              <Label className="text-zinc-300">Título da Seção de Pilares</Label>
              <Input className="bg-zinc-800 border-zinc-700 text-white" value={content.content.pillarsTitle} onChange={e => handleInputChange('content', 'pillarsTitle', e.target.value)} />
            </div>
            <div>
              <Label className="text-zinc-300">Pilares</Label>
              <div className="space-y-2">
                {content.content.pillars.map((pillar, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input className="bg-zinc-800 border-zinc-700 text-white" value={pillar} onChange={e => handlePillarChange(index, e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removePillar(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={addPillar} className="mt-2 bg-transparent border-zinc-700 hover:bg-zinc-800">Adicionar Pilar</Button>
            </div>
            <div>
              <Label className="text-zinc-300">Parágrafo de Conclusão</Label>
              <Textarea className="bg-zinc-800 border-zinc-700 text-white" value={content.content.outro} onChange={e => handleInputChange('content', 'outro', e.target.value)} rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800 text-white">
          <CardHeader><CardTitle>Rodapé</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-zinc-300">Aviso Legal</Label>
              <Input className="bg-zinc-800 border-zinc-700 text-white" value={content.footer.disclaimer} onChange={e => handleInputChange('footer', 'disclaimer', e.target.value)} />
            </div>
            <div>
              <Label className="text-zinc-300">Direitos Autorais</Label>
              <Input className="bg-zinc-800 border-zinc-700 text-white" value={content.footer.copyright} onChange={e => handleInputChange('footer', 'copyright', e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
             <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}