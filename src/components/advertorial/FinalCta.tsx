"use client";

import { Button } from "@/components/ui/button";

export const FinalCta = () => {
  return (
    <section className="text-center py-12">
      <blockquote className="text-xl italic mb-8 max-w-2xl mx-auto">
        "Você está a apenas UMA DECISÃO de distância de transformar sua
        vida. São apenas R$ 29,90. Você gasta isso num almoço. Mas isso pode
        salvar seus rins, sua visão, suas pernas, sua vida."
        <cite className="block not-italic mt-2 font-semibold">
          — Dr. Roberto Yano
        </cite>
      </blockquote>
      <Button
        size="lg"
        className="w-full max-w-md mx-auto h-16 text-2xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg"
      >
        ✅ SIM, QUERO VENCER A DIABETES!
      </Button>
      <p className="mt-4 text-sm text-gray-500">
        Pagamento único • Acesso imediato • Garantia total
      </p>
    </section>
  );
};