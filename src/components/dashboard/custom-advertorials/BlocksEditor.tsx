"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { AlertTriangle, Image, Text, DollarSign, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ContentBlock, BlockType } from '@/lib/advertorial-types'; // NEW: Import types from here
import { BlockEditorComponent } from './BlockEditorComponent';
import { getDefaultBlock } from '@/lib/advertorial-utils';

interface BlocksEditorProps {
    blocks: ContentBlock[];
    setBlocks: React.Dispatch<React.SetStateAction<ContentBlock[]>>;
    onSave: () => Promise<void>;
    isSaving: boolean;
    name: string;
}

export const BlocksEditor = ({ blocks, setBlocks, onSave, isSaving, name }: BlocksEditorProps) => {

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

    return (
        <Card className="bg-zinc-900/50 border-zinc-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Blocos de Conteúdo ({blocks.length})</CardTitle>
                <div className="flex space-x-2">
                    <Button size="sm" variant="secondary" onClick={() => handleAddBlock('text')} className="text-white bg-zinc-700 hover:bg-zinc-600"><Text className="h-4 w-4 mr-2" /> Texto</Button>
                    <Button size="sm" variant="secondary" onClick={() => handleAddBlock('image')} className="text-white bg-zinc-700 hover:bg-zinc-600"><Image className="h-4 w-4 mr-2" /> Imagem</Button>
                    <Button size="sm" variant="secondary" onClick={() => handleAddBlock('alert')} className="text-white bg-zinc-700 hover:bg-zinc-600"><AlertTriangle className="h-4 w-4 mr-2" /> Alerta</Button>
                    <Button size="sm" variant="secondary" onClick={() => handleAddBlock('pricing')} className="text-white bg-zinc-700 hover:bg-zinc-600"><DollarSign className="h-4 w-4 mr-2" /> Preço</Button>
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
                                                    <BlockEditorComponent 
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
                <Button onClick={onSave} disabled={isSaving || !name}>
                    {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
            </CardFooter>
        </Card>
    );
};