"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { ContentBlock, CustomAdvertorialHeader, CustomAdvertorial, BlockType, CustomAdvertorialFooter } from '@/lib/database';
import { Plus, Trash2, GripVertical, AlertTriangle, Image, Text, DollarSign, Settings, MinusCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch'; // Importando Switch

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

const FONT_OPTIONS = [
    { value: 'merriweather', label: 'Merriweather (Serif)' },
    { value: 'sans', label: 'Default Sans (Space Grotesk)' },
    { value: 'roboto', label: 'Roboto' },
    { value: 'open-sans', label: 'Open Sans' },
];

// Default block content based on type
const getDefaultBlock = (type: BlockType): ContentBlock => {
    const id = generateId();
    switch (type) {
        case 'text':
            return { id, type, value: "Novo parágrafo de texto. Use **asteriscos** para negrito.", fontSize: 'xl' };
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

export default function CustomAdvertorialEditor() {
    const params = useParams();
    const router = useRouter();
    
    // FIX 2: Ensure params is not null before accessing id
    const advertorialId = (params?.id as string) || 'new';
    const isNew = advertorialId === 'new';

    const [advertorial, setAdvertorial] = useState<CustomAdvertorial | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState('');
    const [header, setHeader] = useState<CustomAdvertorialHeader>({ preTitle: '', title: '', subheadline: '', fontFamily: 'sans' });
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);
    const [footer, setFooter] = useState<CustomAdvertorialFooter | null>(null);

    // Default footer structure (copied from database.ts default)
    const defaultFooter: CustomAdvertorialFooter = useMemo(() => ({
        disclaimers: [
            { title: "Isenção de Responsabilidade", text: "Este conteúdo tem caráter exclusivamente informativo e educacional. Não oferece diagnóstico, tratamento ou cura de condições de saúde. Os resultados podem variar de pessoa para pessoa. Sempre consulte um profissional de saúde qualificado antes de iniciar qualquer mudança na dieta, no consumo de chás, suplementos ou rotina de bem-estar." },
            { title: "Declaração de Risco", text: "O uso de qualquer produto natural deve ser feito com responsabilidade. Pessoas com condições médicas pré-existentes, gestantes, lactantes ou usuários de medicamentos devem buscar orientação profissional antes do consumo." },
            { title: "Aviso de Idade", text: "Conteúdo destinado a maiores de 18 anos." }
        ],
        companyInfo: {
            name: "OneConversion Soluções Digitais",
            address: "Av. Digital, 123, Sala 4, Aparecida de Goiania - GO",
            cnpj: "60.357.932/0001-18",
            contact: "suporte@oneconversion.pro"
        },
        policies: [
            { title: "Termos e Condições", trigger: "Termos e Condições", content: "Ao acessar este site, o usuário concorda que todo o conteúdo exibido — incluindo textos, imagens, vídeos e informações — possui caráter exclusivamente informativo. Os produtos apresentados não substituem consultas, diagnósticos ou recomendações de profissionais da saúde. As informações sobre preços, disponibilidade, frete e políticas comerciais podem ser modificadas a qualquer momento, sem aviso prévio. O uso dos produtos adquiridos é de responsabilidade do consumidor, que deve sempre seguir as orientações descritas na embalagem ou no material que acompanha o produto." },
            { title: "Política de Privacidade", trigger: "Política de Privacidade", content: "Valorizamos sua privacidade. Todas as informações fornecidas voluntariamente pelo usuário — como nome, e-mail ou dados inseridos em formulários — são utilizadas apenas para fins de atendimento, envio de comunicações solicitadas ou suporte relacionado aos produtos oferecidos. Não compartilhamos, vendemos ou divulgamos dados a terceiros sem autorização do usuário, exceto quando exigido por lei. O usuário pode solicitar a remoção ou alteração de seus dados a qualquer momento por meio de nossos canais de suporte. Consulte esta página regularmente, pois nossa Política de Privacidade pode ser atualizada conforme necessário." },
            { title: "Política de Reembolso", trigger: "Política de Reembolso", content: "Por se tratar de um produto digital, o acesso ao conteúdo é liberado imediatamente após a confirmação do pagamento. Ainda assim, oferecemos uma política de reembolso transparente para garantir a satisfação do cliente. Você pode solicitar o reembolso em até 7 dias corridos após a compra, conforme o Código de Defesa do Consumidor..." }
        ],
        copyright: "Todos os direitos reservados © 2024 - OneConversion Soluções Digitais",
        hideDisclaimers: false,
        hideCompanyInfo: false,
        hidePolicies: false,
    }), []);


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
                    setHeader({ ...data.header, fontFamily: data.header.fontFamily || 'sans' });
                    setBlocks(data.blocks.map((b: ContentBlock) => {
                        const { fontFamily, ...rest } = b;
                        return rest;
                    }));
                    // Initialize footer, merging existing data with defaults/toggles
                    setFooter({
                        ...defaultFooter,
                        ...(data.footer || {}),
                        hideDisclaimers: data.footer?.hideDisclaimers ?? false,
                        hideCompanyInfo: data.footer?.hideCompanyInfo ?? false,
                        hidePolicies: data.footer?.hidePolicies ?? false,
                    });
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
                subheadline: 'Subtítulo chamativo aqui.',
                fontFamily: 'sans'
            });
            setBlocks([getDefaultBlock('text'), getDefaultBlock('pricing')]);
            setFooter(defaultFooter);
            setIsLoading(false);
        }
    }, [advertorialId, isNew, router, defaultFooter]);

    // FIX 3, 4, 5, 6: Correcting handleFooterChange signature and logic
    const handleFooterChange = (section: keyof CustomAdvertorialFooter | 'copyright' | 'hideDisclaimers' | 'hideCompanyInfo' | 'hidePolicies', field: string, value: any) => {
        setFooter(prev => {
            if (!prev) return null;
            const newFooter = { ...prev };
            
            if (section === 'companyInfo') {
                newFooter.companyInfo = { ...newFooter.companyInfo, [field]: value };
            } else if (section === 'copyright') {
                newFooter.copyright = value;
            } else if (section.startsWith('hide')) {
                (newFooter as any)[section] = value;
            }
            return newFooter;
        });
    };

    const handleFooterArrayChange = <T extends object>(
        arrayName: 'disclaimers' | 'policies', 
        index: number, 
        field: keyof T, 
        value: string
    ) => {
        setFooter(prev => {
            if (!prev) return null;
            const newFooter = { ...prev };
            const array = (newFooter as any)[arrayName] as T[];
            array[index] = { ...array[index], [field]: value };
            return newFooter;
        });
    };

    const handleAddFooterItem = (arrayName: 'disclaimers' | 'policies') => {
        setFooter(prev => {
            if (!prev) return null;
            const newFooter = { ...prev };
            if (arrayName === 'disclaimers') {
                newFooter.disclaimers.push({ title: `Novo Aviso ${newFooter.disclaimers.length + 1}`, text: 'Texto do novo aviso.' });
            } else if (arrayName === 'policies') {
                newFooter.policies.push({ title: `Nova Política ${newFooter.policies.length + 1}`, trigger: `Política ${newFooter.policies.length + 1}`, content: 'Conteúdo da nova política.' });
            }
            return newFooter;
        });
    };

    const handleRemoveFooterItem = (arrayName: 'disclaimers' | 'policies', index: number) => {
        setFooter(prev => {
            if (!prev) return null;
            const newFooter = { ...prev };
            (newFooter as any)[arrayName] = (newFooter as any)[arrayName].filter((_: any, i: number) => i !== index);
            return newFooter;
        });
    };


    const handleSave = async () => {
        if (!name || blocks.length === 0 || !footer) {
            toast.error("O nome, blocos de conteúdo e rodapé são obrigatórios.");
            return;
        }

        setIsSaving(true);
        const payload: CustomAdvertorial = {
            id: isNew ? '' : advertorialId,
            name,
            header,
            blocks,
            footer,
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

    if (isLoading || !footer) return <Skeleton className="h-screen w-full bg-zinc-900" />;

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
                                <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 text-white">
                                    Visualizar Rota
                                </Button>
                            </Link>
                        )}
                        <Button onClick={handleSave} disabled={isSaving || !name}>
                            {isSaving ? "Salvando..." : "Salvar Advertorial"}
                        </Button>
                    </div>
                </div>

                {/* HEADER CARD */}
                <Card className="bg-zinc-900/50 border-zinc-800 text-white">
                    <CardHeader><CardTitle>Informações Básicas</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div><Label className="text-zinc-300">Nome Interno</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={name} onChange={e => setName(e.target.value)} /></div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div><Label className="text-zinc-300">Pré-Título</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={header.preTitle} onChange={e => handleHeaderChange('preTitle', e.target.value)} /></div>
                            <div><Label className="text-zinc-300">Família da Fonte (Global)</Label>
                                <Select 
                                    value={header.fontFamily || 'sans'} 
                                    onValueChange={(v) => handleHeaderChange('fontFamily', v)}
                                >
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                        <SelectValue placeholder="Selecione a fonte" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 text-white border-zinc-800">
                                        {FONT_OPTIONS.map(opt => (
                                            <SelectItem key={opt.value} value={opt.value} className={`font-${opt.value}`}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        <div><Label className="text-zinc-300">Título Principal</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={header.title} onChange={e => handleHeaderChange('title', e.target.value)} /></div>
                        <div><Label className="text-zinc-300">Sub-headline</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={header.subheadline} onChange={e => handleHeaderChange('subheadline', e.target.value)} /></div>
                    </CardContent>
                </Card>

                {/* BLOCKS CARD */}
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

                {/* FOOTER CARD */}
                <Card className="bg-zinc-900/50 border-zinc-800 text-white">
                    <CardHeader><CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> Configurações do Rodapé</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                        
                        {/* Visibility Toggles */}
                        <div className="space-y-3 p-4 border border-zinc-700 rounded-md">
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
                        <div className="space-y-4 p-4 border border-zinc-700 rounded-md">
                            <h3 className="font-semibold text-lg">Informações da Empresa</h3>
                            <div><Label className="text-zinc-300">Nome da Empresa</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={footer.companyInfo.name} onChange={e => handleFooterChange('companyInfo', 'name', e.target.value)} /></div>
                            <div><Label className="text-zinc-300">Endereço</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={footer.companyInfo.address} onChange={e => handleFooterChange('companyInfo', 'address', e.target.value)} /></div>
                            <div><Label className="text-zinc-300">CNPJ</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={footer.companyInfo.cnpj} onChange={e => handleFooterChange('companyInfo', 'cnpj', e.target.value)} /></div>
                            <div><Label className="text-zinc-300">Contato</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={footer.companyInfo.contact} onChange={e => handleFooterChange('companyInfo', 'contact', e.target.value)} /></div>
                        </div>

                        {/* Disclaimers */}
                        <div className="space-y-4 p-4 border border-zinc-700 rounded-md">
                            <h3 className="font-semibold text-lg flex items-center justify-between">
                                Avisos e Isenções
                                <Button size="sm" onClick={() => handleAddFooterItem('disclaimers')}><Plus className="h-4 w-4 mr-2" /> Adicionar Aviso</Button>
                            </h3>
                            {footer.disclaimers.map((disclaimer, index) => (
                                <div key={index} className="space-y-2 p-2 border border-zinc-800 rounded-md relative">
                                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveFooterItem('disclaimers', index)}><MinusCircle className="h-4 w-4" /></Button>
                                    <div><Label className="text-zinc-300">Título do Aviso {index + 1}</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={disclaimer.title} onChange={e => handleFooterArrayChange<{ title: string, text: string }>('disclaimers', index, 'title', e.target.value)} /></div>
                                    <div><Label className="text-zinc-300">Texto do Aviso {index + 1}</Label><Textarea className="bg-zinc-800 border-zinc-700 text-white" value={disclaimer.text} onChange={e => handleFooterArrayChange<{ title: string, text: string }>('disclaimers', index, 'text', e.target.value)} rows={3} /></div>
                                </div>
                            ))}
                        </div>

                        {/* Policies */}
                        <div className="space-y-4 p-4 border border-zinc-700 rounded-md">
                            <h3 className="font-semibold text-lg flex items-center justify-between">
                                Políticas (Links Modais)
                                <Button size="sm" onClick={() => handleAddFooterItem('policies')}><Plus className="h-4 w-4 mr-2" /> Adicionar Política</Button>
                            </h3>
                            {footer.policies.map((policy, index) => (
                                <div key={index} className="space-y-2 p-2 border border-zinc-800 rounded-md relative">
                                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => handleRemoveFooterItem('policies', index)}><MinusCircle className="h-4 w-4" /></Button>
                                    <div><Label className="text-zinc-300">Título da Política {index + 1}</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={policy.title} onChange={e => handleFooterArrayChange<{ title: string, trigger: string, content: string }>('policies', index, 'title', e.target.value)} /></div>
                                    <div><Label className="text-zinc-300">Texto do Gatilho (Link) {index + 1}</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={policy.trigger} onChange={e => handleFooterArrayChange<{ title: string, trigger: string, content: string }>('policies', index, 'trigger', e.target.value)} /></div>
                                    <div><Label className="text-zinc-300">Conteúdo da Política {index + 1}</Label><Textarea className="bg-zinc-800 border-zinc-700 text-white" value={policy.content} onChange={e => handleFooterArrayChange<{ title: string, trigger: string, content: string }>('policies', index, 'content', e.target.value)} rows={8} /></div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Copyright */}
                        <div><Label className="text-zinc-300">Direitos Autorais</Label><Input className="bg-zinc-800 border-zinc-700 text-white" value={footer.copyright} onChange={e => handleFooterChange('copyright', 'copyright', e.target.value)} /></div>
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