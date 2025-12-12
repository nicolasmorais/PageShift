import { HeaderAP } from "@/components/advertorial-ap/HeaderAP";
import { ContentAP } from "@/components/advertorial-ap/ContentAP";
import { PricingAP } from "@/components/advertorial-ap/PricingAP";
import { GuaranteeAP } from "@/components/advertorial-ap/GuaranteeAP";
import { FooterAP } from "@/components/advertorial-ap/FooterAP";
import { getDb } from "@/lib/database";
import type { Metadata } from "next";
import { PixelInjector } from '@/components/tracking/PixelInjector'; // NEW: Import PixelInjector

// Função para gerar metadados dinamicamente
export async function generateMetadata(): Promise<Metadata> {
  const db = await getDb();
  const content = db.data.approvalPageContent;
  return {
    title: content.header.title || "Página de Aprovação",
  };
}

export async function APPage() {
  const db = await getDb();
  const content = db.data.approvalPageContent;

  // Extrai guaranteeText do body para renderizá-lo separadamente
  const { guaranteeText, ...contentBodyProps } = content.body;

  return (
    <>
      {/* Injeta os pixels específicos da página no head */}
      <head>
        <PixelInjector pagePixels={content.pixels} />
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