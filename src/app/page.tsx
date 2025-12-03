import { Header } from "@/components/advertorial/Header";
import { Problem } from "@/components/advertorial/Problem";
import { CaseStudy } from "@/components/advertorial/CaseStudy";
import { Solution } from "@/components/advertorial/Solution";
import { Offer } from "@/components/advertorial/Offer";
import { Pricing } from "@/components/advertorial/Pricing";
import { Guarantee } from "@/components/advertorial/Guarantee";
import { Testimonials } from "@/components/advertorial/Testimonials";
import { Comparison } from "@/components/advertorial/Comparison";
import { Footer } from "@/components/advertorial/Footer";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-merriweather">
        <Problem />
        <CaseStudy />
        <Solution />
        <Offer />
        <Pricing />
        <Guarantee />
        <Testimonials />
        <Comparison />
      </main>
      <Footer />
    </div>
  );
}