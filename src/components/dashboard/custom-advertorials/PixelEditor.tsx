"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Zap, Code } from 'lucide-react';
import { PagePixelConfig } from '@/lib/advertorial-types';
import { cn } from '@/lib/utils';
import { DashboardSwitch } from '@/components/dashboard/DashboardSwitch';

interface PixelEditorProps {
    pixels: PagePixelConfig;
    handlePixelChange: (field: keyof PagePixelConfig, value: string | boolean) => void;
}

export const PixelEditor = ({ pixels, handlePixelChange }: PixelEditorProps) => {
    // Cores Dinâmicas
    const cardBg = 'bg-white dark:bg-[#1e293b]';
    const borderColor = 'border-gray-200 dark:border-[#334155]';
    const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
    const textColor = 'text-gray-900 dark:text-white';
    const labelColor = 'text-gray-600 dark:text-zinc-300';
    const descriptionColor = 'text-gray-500 dark:text-zinc-400';

    return (
        <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader><CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-blue-500" /> Rastreamento (Pixels)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                
                <div className={cn("flex items-center justify-between p-3 rounded-md", borderColor, "border bg-gray-50 dark:bg-[#0f172a]")}>
                    <Label className={labelColor}>Usar Configurações Globais?</Label>
                    <DashboardSwitch 
                        checked={pixels.useGlobalPixels} 
                        onCheckedChange={(checked) => handlePixelChange('useGlobalPixels', checked)}
                    />
                </div>
                
                <p className={descriptionColor}>Se a opção acima estiver desativada, use os campos abaixo. Se estiver ativada, os campos abaixo *substituirão* os globais se preenchidos.</p>

                <div>
                    <Label className={labelColor}>Meta Pixel ID (Local)</Label>
                    <Input 
                        className={cn(inputBg, borderColor, textColor)} 
                        value={pixels.metaPixelId} 
                        onChange={e => handlePixelChange('metaPixelId', e.target.value)} 
                        placeholder="Deixe vazio para usar o global"
                    />
                </div>
                
                <div>
                    <Label className={labelColor}>Taboola Pixel ID (Local)</Label>
                    <Input 
                        className={cn(inputBg, borderColor, textColor)} 
                        value={pixels.taboolaPixelId} 
                        onChange={e => handlePixelChange('taboolaPixelId', e.target.value)} 
                        placeholder="Deixe vazio para usar o global"
                    />
                </div>
                
                <div className="pt-2">
                    <Label className={labelColor}>Scripts Adicionais (Local)</Label>
                    <Textarea 
                        className={cn(inputBg, borderColor, textColor, "font-mono text-sm")} 
                        value={pixels.customScripts} 
                        onChange={e => handlePixelChange('customScripts', e.target.value)} 
                        rows={5}
                        placeholder="<!-- Scripts específicos desta página -->"
                    />
                </div>
            </CardContent>
        </Card>
    );
};