"use client";

import React, { useMemo } from 'react';
import { ContentBlock } from '@/lib/advertorial-types';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle, Image, Text, DollarSign, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlockEditorComponentProps {
    block: ContentBlock;
    index: number;
    onUpdate: (index: number, newBlock: ContentBlock) => void;
    onDelete: (index: number) => void;
}

export const BlockEditorComponent = ({ block, index, onUpdate, onDelete }: BlockEditorComponentProps) => {
    const Icon = useMemo(() => {
        switch (block.type) {
            case 'text': return Text;
            case 'image': return Image;
            case 'alert': return AlertTriangle;
            case 'pricing': return DollarSign;
            case 'html': return Code;
            default: return Text;
        }
    }, [block.type]);

    const handleValueChange = (field: keyof ContentBlock, value: string) => {
        onUpdate(index, { ...block, [field]: value });
    };

    // Cores Dinâmicas
    const blockBg = 'bg-gray-50 dark:bg-[#0f172a]';
    const inputBg = 'bg-white dark:bg-[#020617]'; 
    const borderColor = 'border-gray-200 dark:border-[#334155]';
    const selectContentBg = 'bg-white dark:bg-[#1e293b]'; 
    const textColor = 'text-gray-900 dark:text-white';
    const labelColor = 'text-gray-600 dark:text-zinc-400';

    return (
        <div className={cn("p-4 border rounded-md space-y-3", borderColor, blockBg)}>
            <div className="flex items-center justify-between">
                <div className={cn("flex items-center gap-2 font-semibold", labelColor)}>
                    <Icon className="h-5 w-5" />
                    <span className="capitalize">{block.type}</span>
                </div>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(index)}
                    className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20" 
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Common Fields */}
            {block.type !== 'pricing' && (
                <div>
                    <Label className={labelColor}>Conteúdo Principal ({block.type === 'image' ? 'URL' : block.type === 'html' ? 'Código HTML' : 'Texto'})</Label>
                    {block.type === 'text' || block.type === 'alert' || block.type === 'html' ? (
                        <Textarea 
                            className={cn(inputBg, borderColor, textColor, "font-mono text-sm")} 
                            value={block.value} 
                            onChange={e => handleValueChange('value', e.target.value)} 
                            rows={block.type === 'html' ? 8 : 4}
                        />
                    ) : (
                        <Input 
                            className={cn(inputBg, borderColor, textColor)} 
                            value={block.value} 
                            onChange={e => handleValueChange('value', e.target.value)} 
                        />
                    )}
                </div>
            )}
            
            {/* Image Specific Fields (Caption) */}
            {block.type === 'image' && (
                <div>
                    <Label className={labelColor}>Legenda da Imagem (Opcional)</Label>
                    <Input 
                        className={cn(inputBg, borderColor, textColor)} 
                        value={block.caption || ''} 
                        onChange={e => handleValueChange('caption', e.target.value)} 
                    />
                </div>
            )}

            {/* Text Specific Fields (Font Size) */}
            {block.type === 'text' && (
                <div>
                    <Label className={labelColor}>Tamanho da Fonte (ex: xl, 2xl, 16px)</Label>
                    <Input 
                        className={cn(inputBg, borderColor, textColor)} 
                        value={block.fontSize || 'xl'} 
                        onChange={e => handleValueChange('fontSize', e.target.value)} 
                    />
                </div>
            )}

            {/* Alert Specific Fields */}
            {block.type === 'alert' && (
                <>
                    <div>
                        <Label className={labelColor}>Título do Alerta</Label>
                        <Input 
                            className={cn(inputBg, borderColor, textColor)} 
                            value={block.alertTitle || ''} 
                            onChange={e => handleValueChange('alertTitle', e.target.value)} 
                        />
                    </div>
                    <div>
                        <Label className={labelColor}>Variante</Label>
                        <Select 
                            value={block.alertVariant} 
                            onValueChange={(v) => handleValueChange('alertVariant', v)}
                        >
                            <SelectTrigger className={cn(inputBg, borderColor, textColor)}>
                                <SelectValue placeholder="Selecione a variante" />
                            </SelectTrigger>
                            <SelectContent className={cn(selectContentBg, textColor, borderColor)}>
                                <SelectItem value="default" className="focus:bg-gray-100 dark:focus:bg-[#1e293b]">Padrão (Cinza/Azul)</SelectItem>
                                <SelectItem value="destructive" className="focus:bg-gray-100 dark:focus:bg-[#1e293b]">Destrutivo (Vermelho)</SelectItem>
                                <SelectItem value="warning" className="focus:bg-gray-100 dark:focus:bg-[#1e293b]">Aviso (Amarelo)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </>
            )}

            {/* Pricing Specific Fields */}
            {block.type === 'pricing' && (
                <>
                    <div><Label className={labelColor}>Texto Acima do Preço</Label><Input className={cn(inputBg, borderColor, textColor)} value={block.prePriceText || ''} onChange={e => handleValueChange('prePriceText', e.target.value)} /></div>
                    <div><Label className={labelColor}>Preço</Label><Input className={cn(inputBg, borderColor, textColor)} value={block.price || ''} onChange={e => handleValueChange('price', e.target.value)} /></div>
                    <div><Label className={labelColor}>Texto de Pagamento</Label><Input className={cn(inputBg, borderColor, textColor)} value={block.paymentType || ''} onChange={e => handleValueChange('paymentType', e.target.value)} /></div>
                    <div><Label className={labelColor}>Texto do Botão</Label><Input className={cn(inputBg, borderColor, textColor)} value={block.buttonText || ''} onChange={e => handleValueChange('buttonText', e.target.value)} /></div>
                    <div><Label className={labelColor}>URL do Botão (Legado)</Label><Input className={cn(inputBg, borderColor, textColor)} value={block.buttonUrl || ''} onChange={e => handleValueChange('buttonUrl', e.target.value)} /></div>
                    {/* NOVO CAMPO AQUI */}
                    <div>
                        <Label className={labelColor}>URL do Checkout (Base para UTMs)</Label>
                        <Input 
                            className={cn(inputBg, borderColor, textColor)} 
                            value={block.checkoutUrl || ''} 
                            onChange={e => handleValueChange('checkoutUrl', e.target.value)} 
                            placeholder="https://seusite.com/checkout"
                        />
                        <p className="text-xs text-gray-500 dark:text-zinc-500 mt-1">
                            As UTMs da URL atual (ex: utm_source, utm_medium) serão automaticamente anexadas a este link.
                        </p>
                    </div>
                    <div><Label className={labelColor}>Texto Abaixo do Botão</Label><Input className={cn(inputBg, borderColor, textColor)} value={block.postButtonText || ''} onChange={e => handleValueChange('postButtonText', e.target.value)} /></div>
                </>
            )}
        </div>
    );
}