"use client";

import { ContentBlock } from '@/lib/advertorial-types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface BlockRendererProps {
  block: ContentBlock;
}

// Lista de macros do Taboola que devem ser passadas adiante
const TABOOLA_MACROS = [
    'creative_name', 'custom_id', 'site', 'site_id', 'site_domain', 
    'thumbnail', 'title', 'timestamp', 'cachebuster', 'platform', 
    'campaign_id', 'campaign_name', 'campaign_item_id', 'cpc', 
    'GDPR', 'GDPR_CONSENT_XXXXX'
];

// Lista de UTMs comuns
const UTM_PARAMS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'
];

// Função para verificar se um valor é uma macro do Taboola
const isTaboolaMacro = (value: string) => {
    return value.startsWith('{') && value.endsWith('}');
};

// Função para construir o link final com base na URL atual
const buildFinalLink = (baseLink: string, currentSearchParams: URLSearchParams | null): string => {
    if (!baseLink) return '#';

    // Se não houver parâmetros de busca, retorna o link base
    if (!currentSearchParams) return baseLink;

    try {
        const url = new URL(baseLink);
        
        // 1. Coleta todos os parâmetros da URL atual que são UTMs ou Macros do Taboola
        const paramsToForward: Record<string, string> = {};
        
        [...UTM_PARAMS, ...TABOOLA_MACROS].forEach(key => {
            const value = currentSearchParams.get(key);
            if (value) {
                paramsToForward[key] = value;
            }
        });

        // 2. Anexa os parâmetros coletados ao link base
        Object.entries(paramsToForward).forEach(([key, value]) => {
            // Se o valor for uma macro (ex: {site}), anexa diretamente
            if (isTaboolaMacro(value)) {
                url.searchParams.set(key, value);
            } else {
                // Se for um valor fixo (ex: Taboola), anexa
                url.searchParams.set(key, value);
            }
        });

        // 3. Retorna a URL como string, garantindo que as macros não sejam codificadas
        let finalUrl = url.toString();
        finalUrl = finalUrl.replace(/%7B/g, '{').replace(/%7D/g, '}');
        
        return finalUrl;

    } catch (e) {
        console.error("Erro ao construir o link final:", e);
        return baseLink; // Retorna o link base em caso de erro
    }
};


export const BlockRenderer = ({ block }: BlockRendererProps) => {
    const searchParams = useSearchParams();
    const [finalLink, setFinalLink] = useState(block.buttonUrl || '#');

    // Recalcula o link final sempre que o bloco ou os parâmetros de busca mudarem
    useEffect(() => {
        if (block.type === 'pricing' && block.checkoutUrl) {
            setFinalLink(buildFinalLink(block.checkoutUrl, searchParams));
        } else if (block.type === 'pricing' && block.buttonUrl) {
            // Fallback para o campo buttonUrl se checkoutUrl não estiver definido
            setFinalLink(block.buttonUrl);
        }
    }, [block, searchParams]);

    // Cores Dinâmicas
    const textColor = 'text-gray-900 dark:text-white';
    const primaryButtonClasses = 'bg-[#6B16ED] hover:bg-[#5512C7] text-white';

    switch (block.type) {
        case 'text':
            const formattedText = (block.value || '')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br />');
            
            const fontSizeClass = block.fontSize ? `text-${block.fontSize}` : 'text-xl';
            
            return (
                <div className={cn("space-y-4 leading-relaxed", fontSizeClass, textColor)} dangerouslySetInnerHTML={{ __html: formattedText }} />
            );

        case 'image':
            // Se não houver valor, não renderiza para evitar erro 400
            if (!block.value || block.value === '') return null;
            
            return (
                <div className="space-y-2">
                    <img
                        src={block.value}
                        alt={block.caption || "Imagem ilustrativa"}
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                    {block.caption && (
                        <p className="text-sm text-center text-gray-500 dark:text-zinc-400 italic">{block.caption}</p>
                    )}
                </div>
            );

        case 'alert':
            const variantClasses = {
                default: "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-200",
                destructive: "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200",
                warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-200",
            };
            const currentVariant = block.alertVariant || 'default';

            return (
                <Alert 
                    variant={currentVariant === 'destructive' ? 'destructive' : 'default'} 
                    className={cn("border-l-4 p-6", variantClasses[currentVariant])}
                >
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle className="font-bold text-2xl">{block.alertTitle || 'Atenção'}</AlertTitle>
                    <AlertDescription className="text-xl mt-2">
                        {block.value}
                    </AlertDescription>
                </Alert>
            );

        case 'pricing':
            return (
                <section className="my-12 text-center space-y-8">
                    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border-2 border-green-500 rounded-xl shadow-2xl p-8 space-y-6">
                        <p className="text-xl font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                            {block.prePriceText || 'OFERTA ESPECIAL'}
                        </p>
                        <div className="flex items-baseline justify-center gap-4">
                            <p className="text-8xl font-extrabold text-green-600">{block.price || block.value || 'R$ 0,00'}</p>
                        </div>
                        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                            {block.paymentType || 'Pagamento Único'}
                        </p>

                        <Link href={finalLink} target="_blank" rel="noopener noreferrer">
                            <Button
                                size="lg"
                                className={cn(
                                    "w-full h-20 text-2xl font-bold animate-pulse shadow-lg rounded-lg",
                                    primaryButtonClasses
                                )}
                            >
                                <Zap className="mr-4 h-8 w-8" />
                                {block.buttonText || 'COMPRAR AGORA'}
                            </Button>
                        </Link>

                        <p className="text-sm text-gray-500 dark:text-zinc-400 flex items-center justify-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            {block.postButtonText || 'Compra segura e acesso imediato.'}
                        </p>
                    </div>
                </section>
            );
            
        case 'html':
            if (!block.value) return null;
            return (
                <div className="my-8" dangerouslySetInnerHTML={{ __html: block.value }} />
            );

        default:
            return <div className="p-4 bg-red-100 text-red-800 rounded">Tipo de bloco desconhecido: {block.type}</div>;
    }
};