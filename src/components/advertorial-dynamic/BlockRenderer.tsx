import { ContentBlock } from '@/lib/advertorial-types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react'; // Importando hooks do React

interface BlockRendererProps {
  block: ContentBlock;
}

// ... (outros componentes de bloco permanecem os mesmos)

const PricingBlock = ({ block }: { block: ContentBlock }) => {
    // Estado para armazenar a URL final com UTMs
    const [finalCheckoutUrl, setFinalCheckoutUrl] = useState<string>(block.checkoutUrl || block.buttonUrl || '#');

    useEffect(() => {
        // Pega a URL da página atual
        const currentUrl = new URL(window.location.href);
        
        // Extrai todos os parâmetros de busca (UTMs)
        const searchParams = currentUrl.searchParams;
        
        // A URL base do checkout (sem UTMs)
        const baseUrl = block.checkoutUrl || block.buttonUrl || '#';

        // Se não houver UTMs na URL atual, usa a URL base
        if (searchParams.toString() === '') {
            setFinalCheckoutUrl(baseUrl);
            return;
        }

        // Se a URL base já tiver parâmetros, precisamos juntar com '&'
        const separator = baseUrl.includes('?') ? '&' : '?';
        
        // Constrói a URL final com as UTMs
        const urlWithUtm = `${baseUrl}${separator}${searchParams.toString()}`;
        
        setFinalCheckoutUrl(urlWithUtm);

    }, [block.checkoutUrl, block.buttonUrl]); // Recalcula se a URL base mudar

    return (
        <div className="my-12 text-center space-y-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border-2 border-green-500 rounded-xl shadow-2xl p-8 space-y-6">
                
                {/* Pre-Price Text (Offer Highlight) */}
                <p className="text-xl font-extrabold uppercase tracking-wider text-green-600 dark:text-green-400">
                    {block.prePriceText}
                </p>
                
                {/* Price */}
                <div className="flex items-baseline justify-center gap-4">
                    <p className="text-8xl font-extrabold text-green-700 dark:text-green-500 leading-none">
                        {block.price}
                    </p>
                </div>
                
                {/* Payment Type */}
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                    {block.paymentType}
                </p>

                {/* Botão que agora usa a URL final com UTMs */}
                <a href={finalCheckoutUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                        size="lg"
                        className="w-full h-24 text-3xl font-bold animate-pulse bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-lg transition-all duration-300 ease-in-out"
                    >
                        <Zap className="mr-4 h-9 w-9" />
                        {block.buttonText}
                    </Button>
                </a>

                {/* Post Button Text (Security/Access) */}
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    {block.postButtonText}
                </p>
            </div>
        </div>
    );
};

// ... (outros componentes de bloco e a função BlockRenderer permanecem os mesmos)