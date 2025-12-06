"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap } from "lucide-react";

export const PricingV3 = () => {
  return (
    <section className="my-12 text-center space-y-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border-2 border-green-500 rounded-xl shadow-2xl p-8 space-y-6">
        <p className="text-xl font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
          Acesso ao Guia Completo
        </p>
        <div className="flex items-baseline justify-center gap-4">
          <p className="text-8xl font-extrabold text-green-600">R$ 29,90</p>
        </div>
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Pagamento Único
        </p>

        <a href="https://oneconversion.pro/checkout?product_id=8c458bcc-a121-4e3b-8bd7-f35cef65bd97">
          <Button
            size="lg"
            className="w-full h-20 text-2xl font-bold animate-pulse bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-lg"
          >
            <Zap className="mr-4 h-8 w-8" />
            COMPRAR ACESSO
          </Button>
        </a>

        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          Compra segura e acesso imediato.
        </p>
      </div>
    </section>
  );
};