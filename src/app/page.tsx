import { Header } from "@/components/advertorial/Header";
import { Problem } from "@/components/advertorial/Problem";
import { CaseStudy } from "@/components/advertorial/CaseStudy";
import { Solution } from "@/components/advertorial/Solution";
import { Offer } from "@/components/advertorial/Offer";
import { Pricing } from "@/components/advertorial/Pricing";
import { Testimonials } from "@/components/advertorial/Testimonials";
import { Footer } from "@/components/advertorial/Footer";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="bg-gray-100 dark:bg-gray-800 text-center py-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
          Advetorial
        </p>
      </div>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-merriweather">
        <Problem />
        <CaseStudy />
        <Solution />
        <Offer />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}