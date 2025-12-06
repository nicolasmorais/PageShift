import { Header } from "@/components/advertorial/Header";
import { Problem } from "@/components/advertorial/Problem";
import { CaseStudy } from "@/components/advertorial/CaseStudy";
import { Solution } from "@/components/advertorial/Solution";
import { Offer } from "@/components/advertorial/Offer";
import { Pricing } from "@/components/advertorial/Pricing";
import { Testimonials } from "@/components/advertorial/Testimonials";
import { Footer } from "@/components/advertorial/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertorial - V1",
};

export function V1Page() {
  return (
    <div className="bg-white text-gray-800 font-merriweather">
      <div className="bg-gray-100 text-center py-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">
          Advertorial
        </p>
      </div>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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