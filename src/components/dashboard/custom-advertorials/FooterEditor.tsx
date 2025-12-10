"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Settings, Plus, MinusCircle } from 'lucide-react';
import { CustomAdvertorialFooter, Policy, Disclaimer } from '@/lib/advertorial-types';
import { cn } from '@/lib/utils';

interface FooterEditorProps {
    footer: CustomAdvertorialFooter;
    handleFooterChange: (section: keyof CustomAdvertorialFooter | 'copyright' | 'hideDisclaimers' | 'hideCompanyInfo' | 'hidePolicies', field: string, value: any) => void;
    handleFooterArrayChange: <T extends object>(arrayName: 'disclaimers' | 'policies', index: number, field: keyof T, value: string) => void;
    handleAddFooterItem: (arrayName: 'disclaimers' | 'policies') => void;
    handleRemoveFooterItem: (arrayName: 'disclaimers' | 'policies', index: number) => void;
    onSave: () => Promise<void>;
    isSaving: boolean;
    name: string;
}

export const FooterEditor = ({ 
    footer, 
    handleFooterChange, 
    handleFooterArrayChange, 
    handleAddFooterItem, 
    handleRemoveFooterItem,
    onSave,
    isSaving,
    name
}: FooterEditorProps) => {
    // Cores ajustadas
    const cardBg = 'bg-[#0f172a]';
    const borderColor = 'border-[#1e293b]';
    const inputBg = 'bg-[#00030a]';
    const primaryButtonClasses = 'bg-[#0bc839] hover:bg-[#09a82e] text-white';

    return (
        <Card className={cn(cardBg, borderColor, "text-white")}>
            <CardHeader><CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> Configurações do Rodapé</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                
                {/* Visibility Toggles */}
                <div className={cn("space-y-3 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg">Visibilidade das Seções</h3>
                    <div className="flex items-center justify-between">
                        <Label className="text-zinc-300">Ocultar Avisos/Isenções</Label>
                        <Switch 
                            checked={footer.hideDisclaimers} 
                            onCheckedChange={(checked) => handleFooterChange('hideDisclaimers', 'hideDisclaimers', checked)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label className="text-zinc-300">Ocultar Informações da Empresa</Label>
                        <Switch 
                            checked={footer.hideCompanyInfo} 
                            onCheckedChange={(checked) => handleFooterChange('hideCompanyInfo', 'hideCompanyInfo', checked)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label className="text-zinc-300">Ocultar Links de Políticas</Label>
                        <Switch 
                            checked={footer.hidePolicies} 
                            onCheckedChange={(checked) => handleFooterChange('hidePolicies', 'hidePolicies', checked)}
                        />
                    </div>
                </div>

                {/* Company Info */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg">Informações da Empresa</h3>
                    <div><Label className="text-zinc-300">Nome da Empresa</Label><Input className={cn(inputBg, borderColor, "text-white")} value={footer.companyInfo.name} onChange={e => handleFooterChange('companyInfo', 'name', e.target.value)} /></div>
                    <div><Label className="text-zinc-300">Endereço</Label><Input className={cn(inputBg, borderColor, "text-white")} value={footer.companyInfo.address} onChange={e => handleFooterChange('companyInfo', 'address', e.target.value)} /></div>
                    <div><Label className="text-zinc-300">CNPJ</Label><Input className={cn(inputBg, borderColor, "text-white")} value={footer.companyInfo.cnpj} onChange={e => handleFooterChange('companyInfo', 'cnpj', e.target.value)} /></div>
                    <div><Label className="text-zinc-300">Contato</Label><Input className={cn(inputBg, borderColor, "text-white")} value={footer.companyInfo.contact} onChange={e => handleFooterChange('companyInfo', 'contact', e.target.value)} /></div>
                </div>

                {/* Disclaimers */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg flex items-center justify-between">
                        Avisos e Isenções
                        <Button size="sm" onClick={() => handleAddFooterItem('disclaimers')} className={primaryButtonClasses}><Plus className="h-4 w-4 mr-2" /> Adicionar Aviso</Button>
                    </h3>
                    {footer.disclaimers.map((disclaimer, index) => (
                        <div key={index} className={cn("space-y-2 p-2 rounded-md relative", borderColor, "border")}>
                            <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveFooterItem('disclaimers', index)}><MinusCircle className="h-4 w-4" /></Button>
                            <div><Label className="text-zinc-300">Título do Aviso {index + 1}</Label><Input className={cn(inputBg, borderColor, "text-white")} value={disclaimer.title} onChange={e => handleFooterArrayChange<Disclaimer>('disclaimers', index, 'title', e.target.value)} /></div>
                            <div><Label className="text-zinc-300">Texto do Aviso {index + 1}</Label><Textarea className={cn(inputBg, borderColor, "text-white")} value={disclaimer.text} onChange={e => handleFooterArrayChange<Disclaimer>('disclaimers', index, 'text', e.target.value)} rows={3} /></div>
                        </div>
                    ))}
                </div>

                {/* Policies */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg flex items-center justify-between">
                        Políticas (Links Modais)
                        <Button size="sm" onClick={() => handleAddFooterItem('policies')} className={primaryButtonClasses}><Plus className="h-4 w-4 mr-2" /> Adicionar Política</Button>
                    </h3>
                    {footer.policies.map((policy, index) => (
                        <div key={index} className={cn("space-y-2 p-2 rounded-md relative", borderColor, "border")}>
                            <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveFooterItem('policies', index)}><MinusCircle className="h-4 w-4" /></Button>
                            <div><Label className="text-zinc-300">Título da Política {index + 1}</Label><Input className={cn(inputBg, borderColor, "text-white")} value={policy.title} onChange={e => handleFooterArrayChange<Policy>('policies', index, 'title', e.target.value)} /></div>
                            <div><Label className="text-zinc-300">Texto do Gatilho (Link) {index + 1}</Label><Input className={cn(inputBg, borderColor, "text-white")} value={policy.trigger} onChange={e => handleFooterArrayChange<Policy>('policies', index, 'trigger', e.target.value)} /></div>
                            <div><Label className="text-zinc-300">Conteúdo da Política {index + 1}</Label><Textarea className={cn(inputBg, borderColor, "text-white")} value={policy.content} onChange={e => handleFooterArrayChange<Policy>('policies', index, 'content', e.target.value)} rows={8} /></div>
                        </div>
                    ))}
                </div>
                
                {/* Copyright */}
                <div><Label className="text-zinc-300">Direitos Autorais</Label><Input className={cn(inputBg, borderColor, "text-white")} value={footer.copyright} onChange={e => handleFooterChange('copyright', 'copyright', e.target.value)} /></div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={onSave} disabled={isSaving || !name} className={primaryButtonClasses}>
                    {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
            </CardFooter>
        </Card>
    );
};