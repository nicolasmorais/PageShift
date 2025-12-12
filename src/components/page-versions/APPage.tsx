import { HeaderAP } from "@/components/advertorial-ap/HeaderAP";
import { ContentAP } from "@/components/advertorial-ap/ContentAP";
import { PricingAP } from "@/components/advertorial-ap/PricingAP";
import { GuaranteeAP } from "@/components/advertorial-ap/GuaranteeAP";
import { FooterAP } from "@/components/advertorial-ap/FooterAP";
import { getDb } from "@/lib/database";
import type { Metadata } from "next";
import { PixelInjector } from '@/components/tracking/PixelInjector';
import { usePageTracker } from '@/hooks/use-page-tracker';
import { ApprovalPageContent } from '@/lib/advertorial-types'; // Importando o tipo

// Função para gerar metadados dinamicamente
export async function generateMetadata(): Promise<Metadata> {
  const db = await getDb();
  const content = db.data.approvalPageContent;
  return {
    title: content.header.title || "Página de Aprovação",
  };
}

// Wrapper Client Component (Deve ser definido em um arquivo separado, mas mantido aqui por simplicidade)
// O uso de 'use client' garante que este componente e seus filhos rodem no cliente.
function APPageClient({ content, contentBodyProps, guaranteeText, pixelScripts }: { content: ApprovalPageContent, contentBodyProps: any, guaranteeText: string, pixelScripts: React.ReactNode }) {
    // Este hook só pode ser chamado em Client Components
    usePageTracker('ap'); 
    
    return (
        <>
            {/* Injeta os scripts de pixel no head (passados como prop) */}
            <head>
                {pixelScripts}
            </head>
            <div className="bg-white text-gray-800 font-merriweather">
                <div className="bg-gray-100 text-center py-2">
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                        Advertorial
                    </p>
                </div>
                <HeaderAP {...content.header} />
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-4">
                    <ContentAP {...contentBodyProps} />
                    <PricingAP {...content.pricing} />
                    <GuaranteeAP guaranteeText={guaranteeText} />
                </main>
                <FooterAP {...content.footer} />
            </div>
        </>
    );
}
APPageClient.displayName = 'APPageClient';
(APPageClient as any).isClientComponent = true; // Marcação para o Next.js

// Server Component principal
export async function APPage() {
  // Busca de dados no servidor
  const db = await getDb();
  const content: ApprovalPageContent = db.data.approvalPageContent;

  // Extrai guaranteeText do body
  const { guaranteeText, ...contentBodyProps } = content.body;

  // Renderiza o PixelInjector (Server Component)
  const pixelScripts = await PixelInjector({ pagePixels: content.pixels });

  // Passa os dados e os scripts injetados para o Client Component
  return <APPageClient content={content} contentBodyProps={contentBodyProps} guaranteeText={guaranteeText} pixelScripts={pixelScripts} />;
}