import { HeaderV3 } from "@/components/advertorial-v3/HeaderV3";
import { IntroductionV3 } from "@/components/advertorial-v3/IntroductionV3";
import { WhyItWorksV3 } from "@/components/advertorial-v3/WhyItWorksV3";
import { RitualV3 } from "@/components/advertorial-v3/RitualV3";
import { GuideContentsV3 } from "@/components/advertorial-v3/GuideContentsV3";
import { TestimonialsV3 } from "@/components/advertorial-v3/TestimonialsV3";
import { PricingV3 } from "@/components/advertorial-v3/PricingV3";
import { DisclaimerV3 } from "@/components/advertorial-v3/DisclaimerV3";
import { FooterV3 } from "@/components/advertorial-v3/FooterV3";

export function V3Page() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-merriweather">
      <HeaderV3 />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IntroductionV3 />
        <WhyItWorksV3 />
        <RitualV3 />
        <GuideContentsV3 />
        <TestimonialsV3 />
        <PricingV3 />
        <DisclaimerV3 />
      </main>
      <FooterV3 />
    </div>
  );
}