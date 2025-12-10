"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomAdvertorialHeader } from '@/lib/advertorial-types';
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderEditorProps {
    name: string;
    header: CustomAdvertorialHeader;
    setName: (name: string) => void;
    handleHeaderChange: (field: keyof CustomAdvertorialHeader, value: string) => void;
}

const FONT_OPTIONS = [
    { value: 'merriweather', label: 'Merriweather (Serif)' },
    { value: 'sans', label: 'Default Sans (Space Grotesk)' },
    { value: 'roboto', label: 'Roboto' },
    { value: 'open-sans', label: 'Open Sans' },
];

export const HeaderEditor = ({ name, header, setName, handleHeaderChange }: HeaderEditorProps) => {
    // Cores ajustadas
    const cardBg = 'bg-[#0f172a]';
    const borderColor = 'border-[#1e293b]';
    const inputBg = 'bg-[#1e293b]'; // Alterado para #1e293b
    const selectContentBg = 'bg-[#1e293b]'; // Alterado para #1e293b

    return (
        <Card className={cn(cardBg, borderColor, "text-white")}>
            <CardHeader><CardTitle>Informações Básicas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div><Label className="text-zinc-300">Nome Interno</Label><Input className={cn(inputBg, borderColor, "text-white")} value={name} onChange={e => setName(e.target.value)} /></div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div><Label className="text-zinc-300">Pré-Título</Label><Input className={cn(inputBg, borderColor, "text-white")} value={header.preTitle} onChange={e => handleHeaderChange('preTitle', e.target.value)} /></div>
                    <div><Label className="text-zinc-300">Família da Fonte (Global)</Label>
                        <Select 
                            value={header.fontFamily || 'sans'} 
                            onValueChange={(v) => handleHeaderChange('fontFamily', v)}
                        >
                            <SelectTrigger className={cn(inputBg, borderColor, "text-white")}>
                                <SelectValue placeholder="Selecione a fonte" />
                            </SelectTrigger>
                            <SelectContent className={cn(selectContentBg, "text-white", borderColor)}>
                                {FONT_OPTIONS.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value} className={`focus:bg-[#0f172a] font-${opt.value}`}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <div><Label className="text-zinc-300">Título Principal</Label><Input className={cn(inputBg, borderColor, "text-white")} value={header.title} onChange={e => handleHeaderChange('title', e.target.value)} /></div>
                <div><Label className="text-zinc-300">Sub-headline</Label><Input className={cn(inputBg, borderColor, "text-white")} value={header.subheadline} onChange={e => handleHeaderChange('subheadline', e.target.value)} /></div>
            </CardContent>
        </Card>
    );
};