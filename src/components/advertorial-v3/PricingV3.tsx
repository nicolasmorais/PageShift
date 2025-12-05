"use client";

import { Button } from "@/components/ui/button";

export const PricingV3 = () => {
  return (
    <section className="my-12 text-center space-y-8 py-8">
      <Button
        size="lg"
        className="w-full max-w-2xl mx-auto h-20 text-xl md:text-2xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-lg whitespace-normal text-center leading-tight"
      >
        👉 Acesse aqui o material completo e veja como funciona o ritual
        japonês adotado por muitos brasileiros.
      </Button>
    </section>
  );
};