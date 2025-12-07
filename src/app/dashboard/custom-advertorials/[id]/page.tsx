"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { ContentBlock, CustomAdvertorialHeader, CustomAdvertorial, BlockType } from '@/lib/database';
import { Plus, Trash2, GripVertical, AlertTriangle, Image, Text, DollarSign } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Default block content based on type
const getDefaultBlock = (type: BlockType): ContentBlock => {
    const id = generateId();
    switch (type) {
        case 'text':
            return { id, type, value: "Novo parágrafo de texto. Use **asteriscos** para negrito." };
        case 'image':
            return { id, type, value: "https://via.placeholder.com/800x400.png?text=Nova+Imagem" };
        case 'alert':
            return { id, type, value: "Este é o texto do alerta.", alertTitle: "Atenção!", alertVariant: 'destructive' };
        case 'pricing':
            return { 
                id, 
                type, 
                value: "R$ 29,90", 
                price: "R$ 29,90", 
                buttonText: "COMPRAR AGORA", 
                buttonUrl: "#",
                prePriceText: "OFERTA ESPECIAL",
                paymentType: "Pagamento Único",
                postButtonText: "Acesso imediato."
            };
        default:
            return { id, type: 'text', value: "Bloco desconhecido." };
    }
};

// Component to render the editor for a single block
const BlockEditor = ({ block, index, onUpdate, onDelete }: { block: ContentBlock, index: number, onUpdate: (index: number, newBlock: ContentBlock) => void, onDelete: (index: number) => void }) => {
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
                    {block.type === 'text' ? (
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
                                <SelectItem value="destructive">Destrutivo (Vermelho/Amarelo)</SelectItem>
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

export default function CustomAdvertorialEditor() {
    const params = useParams();
    const router = useRouter();
    const advertorialId = params.id as string;
    const isNew = advertorialId === 'new';

    const [advertorial, setAdvertorial] = useState<CustomAdvertorial | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState('');
    const [header, setHeader] = useState<CustomAdvertorialHeader>({ preTitle: '', title: '', subheadline: '' });
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/custom-advertorials/${advertorialId}`)
                .then(res => {
                    if (!res.ok) throw new Error('Not found');
                    return res.json();
                })
                .then(data => {
                    setAdvertorial(data);
                    setName(data.name);
                    setHeader(data.header);
                    setBlocks(data.blocks);
                })
                .catch(() => {
                    toast.error("Advertorial não encontrado ou falha ao carregar.");
                    router.push('/dashboard/custom-advertorials');
                })
                .finally(() => setIsLoading(false));
        } else {
            // Default content for new advertorial
            setName('Novo Advertorial Dinâmico');
            setHeader({
                preTitle: 'Reportagem Especial',
                title: 'Título do Novo Advertorial',
                subheadline: 'Subtítulo chamativo aqui.'
            });
            setBlocks([getDefaultBlock('text'), getDefaultBlock('pricing')]);
            setIsLoading(false);
        }
    }, [advertorialId, isNew, router]);

    const handleHeaderChange = (field: keyof CustomAdvertorialHeader, value: string) => {
        setHeader(prev => ({ ...prev, [field]: value }));
    };

    const handleBlockUpdate = (index: number, newBlock: ContentBlock) => {
        setBlocks(prev => prev.map((b, i) => (i === index ? newBlock : b)));
    };

    const handleBlockDelete = (index: number) => {
        setBlocks(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddBlock = (type: BlockType) => {
        setBlocks(prev => [...prev, getDefaultBlock(type)]);
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const items = Array.from(blocks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setBlocks(items);
    };

    const handleSave = async () => {
        if (!name || blocks.length === 0) {
            toast.error("O nome e pelo menos um bloco de conteúdo são obrigatórios.");
            return;
        }

        setIsSaving(true);
        const payload: CustomAdvertorial = {
            id: isNew ? '' : advertorialId,
            name,
            header,
            blocks,
        };

        try {
            const response = await fetch('/api/custom-advertorials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to save');
            
            const result = await response.json();
            toast.success("Advertorial salvo com sucesso!");

            if (isNew) {
                // Redirect to the edit page of the newly created advertorial
                router.replace(`/dashboard/custom-advertorials/${result.advertorial.id}`);
            }
        } catch (error) {
            toast.error("Falha ao salvar o advertorial.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <Skeleton className="h-screen w-full bg-zinc-900" />;

    return (
        <>
            <Toaster richColors />
            <div className="space-y-6">
                <div className="flex items-center justify-between sticky top-0 z-20 py-4 bg-[#101010]">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{isNew ? "Criar Novo Advertorial" : `Editando: ${name}`}</h1>
                        <p className="text-zinc-400">ID: {isNew ? 'Novo' : advertorialId}</p>
                    </div>
                    <div className="flex space-x-2">
                        {!isNew && (
                            <Link href={`/${advertorialId}`} target="_blank">
                                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800">
                                    Visualizar Rota
                                </Button>
                            </Link>
                        )}
                        <Button onClick={handleSave} disabled={isSaving || !name}>
                            {isSaving ? "Salvando..." : "Salvar Advertorial"}
                        </Button>
                    </div>
                </div>

                <Card className="bg-zinc-900/50 border-zinc-800 text-white">
                    <CardHeader><CardTitle>Informações Básicas</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div><Label className="text-zinc-300">Nome Interno</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={name} onChange={e => setName(e.target.value)} /></div>
                        <div><Label className="text-zinc-300">Pré-Título</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={header.preTitle} onChange={e => handleHeaderChange('preTitle', e.target.value)} /></div>
                        <div><Label className="text-zinc-300">Título Principal</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={header.title} onChange={e => handleHeaderChange('title', e.target.value)} /></div>
                        <div><Label className="text-zinc-300">Sub-headline</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={header.subheadline} onChange={e => handleHeaderChange('subheadline', e.target.value)} /></div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900/50 border-zinc-800 text-white">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Blocos de Conteúdo ({blocks.length})</CardTitle>
                        <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleAddBlock('text')} className="border-zinc-700 hover:bg-zinc-800"><Text className="h-4 w-4 mr-2" /> Texto</Button>
                            <Button size="sm" variant="outline" onClick={() => handleAddBlock('image')} className="border-zinc-700 hover:bg-zinc-800"><Image className="h-4 w-4 mr-2" /> Imagem</Button>
                            <Button size="sm" variant="outline" onClick={() => handleAddBlock('alert')} className="border-zinc-700 hover:bg-zinc-800"><AlertTriangle className="h-4 w-4 mr-2" /> Alerta</Button>
                            <Button size="sm" variant="outline" onClick={() => handleAddBlock('pricing')} className="border-zinc-700 hover:bg-zinc-800"><DollarSign className="h-4 w-4 mr-2" /> Preço</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="blocks">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                                        {blocks.map((block, index) => (
                                            <Draggable key={block.id} draggableId={block.id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className="flex items-start gap-2"
                                                    >
                                                        <div {...provided.dragHandleProps} className="p-4 cursor-grab text-zinc-500 hover:text-white transition-colors">
                                                            <GripVertical className="h-5 w-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <BlockEditor 
                                                                block={block} 
                                                                index={index} 
                                                                onUpdate={handleBlockUpdate} 
                                                                onDelete={handleBlockDelete} 
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        {blocks.length === 0 && (
                            <p className="text-center text-zinc-500 mt-4">Adicione o primeiro bloco de conteúdo.</p>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button onClick={handleSave} disabled={isSaving || !name}>
                            {isSaving ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}