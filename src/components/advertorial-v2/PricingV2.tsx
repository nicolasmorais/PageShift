"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap } from "lucide-react";

export const PricingV2 = () => {
  return (
    <section className="my-12 text-center space-y-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border-2 border-green-500 rounded-xl shadow-2xl p-8 space-y-6">
        <p className="text-xl font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
          Contribuição Simbólica
        </p>
        <div className="flex items-baseline justify-center gap-4">
          <span className="text-4xl font-bold text-gray-500">Acesso por</span>
          <p className="text-8xl font-extrabold text-green-600">R$ 29,90</p>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Acesso imediato após o pagamento.
        </p>

        <Button
          size="lg"
          className="w-full h-20 text-2xl font-bold animate-pulse bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-lg"
        >
          <Zap className="mr-4 h-8 w-8" />
          QUERO ACESSAR O GUIA
        </Button>

        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          Compra segura e acesso instantâneo.
        </p>
      </div>
    </section>
  );
};