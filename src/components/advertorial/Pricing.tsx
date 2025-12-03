"use client";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export const Pricing = () => {
  return (
    <section className="my-12 text-center space-y-8">
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <h3 className="text-2xl font-bold font-sans">
          Por que esse preço tão acessível?
        </h3>
        <p className="text-xl leading-relaxed mt-4">
          "Eu poderia vender esse protocolo por R$ 297, R$ 497 ou até mais. Mas
          meu objetivo não é ganhar dinheiro com a sua dor. Meu objetivo é
          salvar vidas. Por isso, decidi oferecer por um valor simbólico de
          menos de R$ 30 reais." - Dr. Yano
        </p>
      </div>
      <div className="space-y-4">
        <p className="text-lg">INVESTIMENTO ÚNICO DE APENAS:</p>
        <p className="text-gray-500 line-through">De R$ 127,00</p>
        <p className="text-7xl font-extrabold text-green-600">R$ 29,90</p>
        <p className="font-semibold">✅ Pagamento único via PIX</p>
        <p className="font-semibold">✅ Acesso imediato e vitalício</p>
      </div>
      <Button
        size="lg"
        className="w-full max-w-2xl mx-auto h-20 text-2xl font-bold animate-pulse bg-green-600 hover:bg-green-700 text-white"
        onClick={() => {
          /* Ação de clique */
        }}
      >
        <Zap className="mr-3 h-8 w-8" />
        QUERO ACESSO IMEDIATO AO PROTOCOLO COMPLETO!
      </Button>
      <p className="text-sm text-gray-500">
        Compra 100% segura. Acesso liberado em até 5 minutos no seu e-mail.
      </p>
    </section>
  );
};