"use client";

import { ContentBlock } from '@/lib/database';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlockRendererProps {
  block: ContentBlock;
}

const TextBlock = ({ value }: { value: string }) => {
    // Processa o texto para substituir *texto* por <strong>texto</strong> e novas linhas por <br>
    const formattedText = value
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br />');

    return (
        <div className="prose prose-xl max-w-none text-gray-800 dark:text-gray-200 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: formattedText }} />
        </div>
    );
};

const ImageBlock = ({ value }: { value: string }) => {
    return (
        <img
            src={value}
            alt="Imagem do advertorial"
            className="w-full h-auto rounded-lg my-6 shadow-md"
        />
    );
};

const AlertBlock = ({ block }: { block: ContentBlock }) => {
    const isDestructive = block.alertVariant === 'destructive';
    
    return (
        <Alert 
            variant={block.alertVariant || 'default'} 
            className={isDestructive ? "bg-red-50 dark:bg-red-900/20 border-red-500 text-left" : "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-left"}
        >
            <AlertTriangle className={`h-5 w-5 ${isDestructive ? 'text-red-600' : 'text-blue-600'}`} />
            <AlertTitle className={`font-bold text-2xl mb-2 ${isDestructive ? 'text-red-800 dark:text-red-200' : 'text-blue-800 dark:text-blue-200'}`}>
                {block.alertTitle || 'Aviso'}
            </AlertTitle>
            <AlertDescription className={`text-xl ${isDestructive ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'}`}>
                {block.value}
            </AlertDescription>
        </Alert>
    );
};

const PricingBlock = ({ block }: { block: ContentBlock }) => {
    return (
        <div className="my-12 text-center space-y-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border-2 border-green-500 rounded-xl shadow-2xl p-8 space-y-6">
                <p className="text-xl font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                    {block.prePriceText}
                </p>
                <div className="flex items-baseline justify-center gap-4">
                    <p className="text-8xl font-extrabold text-green-600">{block.price}</p>
                </div>
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                    {block.paymentType}
                </p>

                <a href={block.buttonUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                        size="lg"
                        className="w-full h-20 text-2xl font-bold animate-pulse bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-lg"
                    >
                        <Zap className="mr-4 h-8 w-8" />
                        {block.buttonText}
                    </Button>
                </a>

                <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    {block.postButtonText}
                </p>
            </div>
        </div>
    );
};


export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'text':
      return <TextBlock value={block.value} />;
    case 'image':
      return <ImageBlock value={block.value} />;
    case 'alert':
      return <AlertBlock block={block} />;
    case 'pricing':
      return <PricingBlock block={block} />;
    default:
      return <div className="text-red-500">Tipo de bloco desconhecido: {block.type}</div>;
  }
}