import { HeaderAP } from "@/components/advertorial-ap/HeaderAP";
import { ContentAP } from "@/components/advertorial-ap/ContentAP";
import { PricingAP } from "@/components/advertorial-ap/PricingAP";
import { GuaranteeAP } from "@/components/advertorial-ap/GuaranteeAP";
import { FooterAP } from "@/components/advertorial-ap/FooterAP";
import { getDb } from '@/lib/database';
import type { Metadata } from "next";
import { PixelInjector } from '@/components/tracking/PixelInjector';
import { PageTracker } from "./PageTracker";
import { ApprovalPageContent } from '@/lib/advertorial-types';
import { Client } from 'pg';

// Função auxiliar para buscar o conteúdo da página de aprovação
async function fetchApprovalPageContent(db: Client): Promise<ApprovalPageContent> {
    const result = await db.query('SELECT value FROM settings WHERE key = $1', ['approvalPageContent']);
    if (result.rows.length === 0) {
        throw new Error("Approval page content not found in settings.");
    }
    return result.rows[0].value as ApprovalPageContent;
}

// Função para gerar metadados dinamicamente
export async function generateMetadata(): Promise<Metadata> {
  const db = await getDb();
  const content = await fetchApprovalPageContent(db);
  return {
    title: content.header.title || "Página de Aprovação",
  };
}

// Server Component principal
export async function APPage() {
  // Busca de dados no servidor
  const db = await getDb();
  const content: ApprovalPageContent = await fetchApprovalPageContent(db);

  // Extrai guaranteeText do body
  const { guaranteeText, ...contentBodyProps } = content.body;

  // Renderiza o PixelInjector (Server Component)
  const pixelScripts = await PixelInjector({ pagePixels: content.pixels });

  return (
    <>
      <PageTracker contentId="ap" />
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