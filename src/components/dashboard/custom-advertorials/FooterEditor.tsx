"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Settings, Plus, MinusCircle } from 'lucide-react';
import { CustomAdvertorialFooter, Policy, Disclaimer } from '@/lib/advertorial-types';
import { cn } from '@/lib/utils';
import { DashboardSwitch } from '@/components/dashboard/DashboardSwitch';

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
    // Cores Dinâmicas
    const cardBg = 'bg-white dark:bg-[#1e293b]';
    const borderColor = 'border-gray-200 dark:border-[#334155]';
    const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
    const primaryButtonClasses = 'bg-[#38bdf8] hover:bg-[#0ea5e9] text-white';
    const textColor = 'text-gray-900 dark:text-white';
    const labelColor = 'text-gray-600 dark:text-zinc-300';

    return (
        <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader><CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> Configurações do Rodapé</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                
                {/* Visibility Toggles */}
                <div className={cn("space-y-3 p-4 rounded-md", borderColor, "border bg-gray-50 dark:bg-[#0f172a]")}>
                    <h3 className="font-semibold text-lg">Visibilidade das Seções</h3>
                    <div className="flex items-center justify-between">
                        <Label className={labelColor}>Ocultar Avisos/Isenções</Label>
                        <DashboardSwitch 
                            checked={footer.hideDisclaimers} 
                            onCheckedChange={(checked) => handleFooterChange('hideDisclaimers', 'hideDisclaimers', checked)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label className={labelColor}>Ocultar Informações da Empresa</Label>
                        <DashboardSwitch 
                            checked={footer.hideCompanyInfo} 
                            onCheckedChange={(checked) => handleFooterChange('hideCompanyInfo', 'hideCompanyInfo', checked)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label className={labelColor}>Ocultar Links de Políticas</Label>
                        <DashboardSwitch 
                            checked={footer.hidePolicies} 
                            onCheckedChange={(checked) => handleFooterChange('hidePolicies', 'hidePolicies', checked)}
                        />
                    </div>
                </div>

                {/* Company Info */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg">Informações da Empresa</h3>
                    <div><Label className={labelColor}>Nome da Empresa</Label><Input className={cn(inputBg, borderColor, textColor)} value={footer.companyInfo.name} onChange={e => handleFooterChange('companyInfo', 'name', e.target.value)} /></div>
                    <div><Label className={labelColor}>Endereço</Label><Input className={cn(inputBg, borderColor, textColor)} value={footer.companyInfo.address} onChange={e => handleFooterChange('companyInfo', 'address', e.target.value)} /></div>
                    <div><Label className={labelColor}>CNPJ</Label><Input className={cn(inputBg, borderColor, textColor)} value={footer.companyInfo.cnpj} onChange={e => handleFooterChange('companyInfo', 'cnpj', e.target.value)} /></div>
                    <div><Label className={labelColor}>Contato</Label><Input className={cn(inputBg, borderColor, textColor)} value={footer.companyInfo.contact} onChange={e => handleFooterChange('companyInfo', 'contact', e.target.value)} /></div>
                </div>

                {/* Disclaimers */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg">Avisos e Isenções</h3>
                    {footer.disclaimers.map((disclaimer, index) => (
                        <div key={index} className={cn("space-y-2 p-2 rounded-md relative bg-gray-50 dark:bg-[#0f172a]", borderColor, "border")}>
                            <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveFooterItem('disclaimers', index)}><MinusCircle className="h-4 w-4" /></Button>
                            <div><Label className={labelColor}>Título do Aviso {index + 1}</Label><Input className={cn(inputBg, borderColor, textColor)} value={disclaimer.title} onChange={e => handleFooterArrayChange<Disclaimer>('disclaimers', index, 'title', e.target.value)} /></div>
                            <div><Label className={labelColor}>Texto do Aviso {index + 1}</Label><Textarea className={cn(inputBg, borderColor, textColor)} value={disclaimer.text} onChange={e => handleFooterArrayChange<Disclaimer>('disclaimers', index, 'text', e.target.value)} rows={3} /></div>
                        </div>
                    ))}
                </div>

                {/* Policies */}
                <div className={cn("space-y-4 p-4 rounded-md", borderColor, "border")}>
                    <h3 className="font-semibold text-lg">Políticas (Links Modais)</h3>
                    {footer.policies.map((policy, index) => (
                        <div key={index} className={cn("space-y-2 p-2 rounded-md relative bg-gray-50 dark:bg-[#0f172a]", borderColor, "border")}>
                            <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveFooterItem('policies', index)}><MinusCircle className="h-4 w-4" /></Button>
                            <div><Label className={labelColor}>Título da Política {index + 1}</Label><Input className={cn(inputBg, borderColor, textColor)} value={policy.title} onChange={e => handleFooterArrayChange<Policy>('policies', index, 'title', e.target.value)} /></div>
                            <div><Label className={labelColor}>Texto do Gatilho (Link) {index + 1}</Label><Input className={cn(inputBg, borderColor, textColor)} value={policy.trigger} onChange={e => handleFooterArrayChange<Policy>('policies', index, 'trigger', e.target.value)} /></div>
                            <div><Label className={labelColor}>Conteúdo da Política {index + 1}</Label><Textarea className={cn(inputBg, borderColor, textColor)} value={policy.content} onChange={e => handleFooterArrayChange<Policy>('policies', index, 'content', e.target.value)} rows={8} /></div>
                        </div>
                    ))}
                </div>
                
                {/* Copyright */}
                <div><Label className={labelColor}>Direitos Autorais</Label><Input className={cn(inputBg, borderColor, textColor)} value={footer.copyright} onChange={e => handleFooterChange('copyright', 'copyright', e.target.value)} /></div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={onSave} disabled={isSaving || !name} className={primaryButtonClasses}>
                    {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
            </CardFooter>
        </Card>
    );
}