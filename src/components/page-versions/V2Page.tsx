import { HeaderV2 } from "@/components/advertorial-v2/HeaderV2";
import { IntroductionV2 } from "@/components/advertorial-v2/IntroductionV2";
import { GuideContentsV2 } from "@/components/advertorial-v2/GuideContentsV2";
import { OfferV2 } from "@/components/advertorial-v2/OfferV2";
import { PricingV2 } from "@/components/advertorial-v2/PricingV2";
import { DisclaimerV2 } from "@/components/advertorial-v2/DisclaimerV2";
import { FooterV2 } from "@/components/advertorial-v2/FooterV2";
import { usePageTracker } from '@/hooks/use-page-tracker';

// Componente Cliente que usa o hook e renderiza o conteúdo
function V2PageClient() {
  usePageTracker('v2'); // Rastreia a visualização para o contentId 'v2'
  
  return (
    <div className="bg-white text-gray-800 font-merriweather">
      <div className="bg-gray-100 text-center py-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
          Advertorial
        </p>
      </div>
      <HeaderV2 />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IntroductionV2 />
        <GuideContentsV2 />
        <OfferV2 />
        <PricingV2 />
        <DisclaimerV2 />
      </main>
      <FooterV2 />
    </div>
  );
}
V2PageClient.displayName = 'V2PageClient';
(V2PageClient as any).isClientComponent = true;

// Componente Servidor que exporta o Client Component
export function V2Page() {
  return <V2PageClient />;
}