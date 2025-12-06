import { HeaderAP } from "@/components/advertorial-ap/HeaderAP";
import { ContentAP } from "@/components/advertorial-ap/ContentAP";
import { PricingAP } from "@/components/advertorial-ap/PricingAP";
import { FooterAP } from "@/components/advertorial-ap/FooterAP";
import { getDb } from "@/lib/database";
import type { Metadata } from "next";

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

  return (
    <div className="bg-white text-gray-800 font-merriweather">
      <div className="bg-gray-100 text-center py-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
          Advertorial
        </p>
      </div>
      <HeaderAP {...content.header} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ContentAP {...content.body} />
        <PricingAP {...content.pricing} />
      </main>
      <FooterAP {...content.footer} />
    </div>
  );
}