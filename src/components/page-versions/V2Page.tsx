import { HeaderV2 } from "@/components/advertorial-v2/HeaderV2";
import { IntroductionV2 } from "@/components/advertorial-v2/IntroductionV2";
import { GuideContentsV2 } from "@/components/advertorial-v2/GuideContentsV2";
import { OfferV2 } from "@/components/advertorial-v2/OfferV2";
import { PricingV2 } from "@/components/advertorial-v2/PricingV2";
import { DisclaimerV2 } from "@/components/advertorial-v2/DisclaimerV2";
import { FooterV2 } from "@/components/advertorial-v2/FooterV2";

export function V2Page() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="bg-gray-100 dark:bg-gray-800 text-center py-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
          Advetorial
        </p>
      </div>
      <HeaderV2 />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-merriweather">
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