"use client";

import React, { useMemo } from 'react';
import { ContentBlock } from '@/lib/advertorial-types'; // NEW: Import type from here
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2, AlertTriangle, Image, Text, DollarSign } from 'lucide-react';

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
            default: return Text;
        }
    }, [block.type]);

    const handleValueChange = (field: keyof ContentBlock, value: string) => {
        onUpdate(index, { ...block, [field]: value });
    };

    return (
        <div className="p-4 border border-zinc-700 rounded-md bg-zinc-800/50 space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-300">
                    <Icon className="h-5 w-5" />
                    <span className="capitalize font-semibold">{block.type}</span>
                </div>
                <Button variant="destructive" size="icon" onClick={() => onDelete(index)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Common Fields */}
            {block.type !== 'pricing' && (
                <div>
                    <Label className="text-zinc-400">Conteúdo Principal ({block.type === 'image' ? 'URL' : 'Texto'})</Label>
                    {block.type === 'text' || block.type === 'alert' ? (
                        <Textarea 
                            className="bg-zinc-900 border-zinc-700 text-white" 
                            value={block.value} 
                            onChange={e => handleValueChange('value', e.target.value)} 
                            rows={4}
                        />
                    ) : (
                        <Input 
                            className="bg-zinc-900 border-zinc-700 text-white" 
                            value={block.value} 
                            onChange={e => handleValueChange('value', e.target.value)} 
                        />
                    )}
                </div>
            )}
            
            {/* Image Specific Fields (Caption) */}
            {block.type === 'image' && (
                <div>
                    <Label className="text-zinc-400">Legenda da Imagem (Opcional)</Label>
                    <Input 
                        className="bg-zinc-900 border-zinc-700 text-white" 
                        value={block.caption || ''} 
                        onChange={e => handleValueChange('caption', e.target.value)} 
                    />
                </div>
            )}

            {/* Text Specific Fields (Font Size) */}
            {block.type === 'text' && (
                <div>
                    <Label className="text-zinc-400">Tamanho da Fonte (ex: xl, 2xl, 16px)</Label>
                    <Input 
                        className="bg-zinc-900 border-zinc-700 text-white" 
                        value={block.fontSize || 'xl'} 
                        onChange={e => handleValueChange('fontSize', e.target.value)} 
                    />
                </div>
            )}

            {/* Alert Specific Fields */}
            {block.type === 'alert' && (
                <>
                    <div>
                        <Label className="text-zinc-400">Título do Alerta</Label>
                        <Input 
                            className="bg-zinc-900 border-zinc-700 text-white" 
                            value={block.alertTitle || ''} 
                            onChange={e => handleValueChange('alertTitle', e.target.value)} 
                        />
                    </div>
                    <div>
                        <Label className="text-zinc-400">Variante</Label>
                        <Select 
                            value={block.alertVariant} 
                            onValueChange={(v) => handleValueChange('alertVariant', v)}
                        >
                            <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                                <SelectValue placeholder="Selecione a variante" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                                <SelectItem value="default">Padrão (Cinza/Azul)</SelectItem>
                                <SelectItem value="destructive">Destrutivo (Vermelho)</SelectItem>
                                <SelectItem value="warning">Aviso (Amarelo)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </>
            )}

            {/* Pricing Specific Fields */}
            {block.type === 'pricing' && (
                <>
                    <div><Label className="text-zinc-400">Texto Acima do Preço</Label><Input className="bg-zinc-900 border-zinc-700 text-white" value={block.prePriceText || ''} onChange={e => handleValueChange('prePriceText', e.target.value)} /></div>
                    <div><Label className="text-zinc-400">Preço</Label><Input className="bg-zinc-900 border-zinc-700 text-white" value={block.price || ''} onChange={e => handleValueChange('price', e.target.value)} /></div>
                    <div><Label className="text-zinc-400">Texto de Pagamento</Label><Input className="bg-zinc-900 border-zinc-700 text-white" value={block.paymentType || ''} onChange={e => handleValueChange('paymentType', e.target.value)} /></div>
                    <div><Label className="text-zinc-400">Texto do Botão</Label><Input className="bg-zinc-900 border-zinc-700 text-white" value={block.buttonText || ''} onChange={e => handleValueChange('buttonText', e.target.value)} /></div>
                    <div><Label className="text-zinc-400">URL do Botão</Label><Input className="bg-zinc-900 border-zinc-700 text-white" value={block.buttonUrl || ''} onChange={e => handleValueChange('buttonUrl', e.target.value)} /></div>
                    <div><Label className="text-zinc-400">Texto Abaixo do Botão</Label><Input className="bg-zinc-900 border-zinc-700 text-white" value={block.postButtonText || ''} onChange={e => handleValueChange('postButtonText', e.target.value)} /></div>
                </>
            )}
        </div>
    );
};