"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { defaultCustomAdvertorialFooter } from '@/lib/database'; // Keep this for default value
import { ContentBlock, CustomAdvertorialHeader, CustomAdvertorial, CustomAdvertorialFooter, BlockType, Policy, Disclaimer } from '@/lib/advertorial-types'; // NEW: Import types from here
import Link from 'next/link';
import { getDefaultBlock } from '@/lib/advertorial-utils';

// Import modular components
import { HeaderEditor } from '@/components/dashboard/custom-advertorials/HeaderEditor';
import { BlocksEditor } from '@/components/dashboard/custom-advertorials/BlocksEditor';
import { FooterEditor } from '@/components/dashboard/custom-advertorials/FooterEditor';


export default function CustomAdvertorialEditor() {
    const params = useParams();
    const router = useRouter();
    
    const advertorialId = (params?.id as string) || 'new';
    const isNew = advertorialId === 'new';

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState('');
    const [header, setHeader] = useState<CustomAdvertorialHeader>({ preTitle: '', title: '', subheadline: '', fontFamily: 'sans' });
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);
    const [footer, setFooter] = useState<CustomAdvertorialFooter | null>(null);

    // Use the default footer structure from database.ts
    const defaultFooter = useMemo(() => defaultCustomAdvertorialFooter, []);


    useEffect(() => {
        if (!isNew) {
            fetch(`/api/custom-advertorials/${advertorialId}`)
                .then(res => {
                    if (!res.ok) throw new Error('Not found');
                    return res.json();
                })
                .then(data => {
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
            // Use imported getDefaultBlock for initialization
            setBlocks([getDefaultBlock('text'), getDefaultBlock('pricing')]); 
            setFooter(defaultFooter);
            setIsLoading(false);
        }
    }, [advertorialId, isNew, router, defaultFooter]);

    // --- Handlers for Header/Name ---
    const handleHeaderChange = (field: keyof CustomAdvertorialHeader, value: string) => {
        setHeader(prev => ({ ...prev, [field]: value }));
    };

    // --- Handlers for Footer ---
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
    // --- End Handlers for Footer ---


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
                <HeaderEditor 
                    name={name} 
                    header={header} 
                    setName={setName} 
                    handleHeaderChange={handleHeaderChange} 
                />

                {/* BLOCKS CARD */}
                <BlocksEditor 
                    blocks={blocks} 
                    setBlocks={setBlocks} 
                    onSave={handleSave} 
                    isSaving={isSaving} 
                    name={name} 
                />

                {/* FOOTER CARD */}
                <FooterEditor 
                    footer={footer}
                    handleFooterChange={handleFooterChange}
                    handleFooterArrayChange={handleFooterArrayChange as any} // Casting due to complex generic types
                    handleAddFooterItem={handleAddFooterItem}
                    handleRemoveFooterItem={handleRemoveFooterItem}
                    onSave={handleSave}
                    isSaving={isSaving}
                    name={name}
                />
            </div>
        </>
    );
}