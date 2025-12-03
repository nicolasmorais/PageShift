"use client";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-3xl font-bold text-white font-sans">
          Sua Transformação Começa Agora!
        </h2>
        <p className="text-xl mt-4">
          Lembre-se, você tem GARANTIA INCONDICIONAL de 7 dias. Você não tem
          absolutamente nada a perder, apenas uma vida com glicose controlada a
          ganhar!
        </p>
        <Button
          size="lg"
          className="w-full max-w-2xl mx-auto mt-8 h-20 text-2xl font-bold animate-pulse bg-green-600 hover:bg-green-700 text-white"
          onClick={() => {
            /* Ação de clique */
          }}
        >
          <Zap className="mr-3 h-8 w-8" />
          SIM! QUERO VENCER A DIABETES AGORA!
        </Button>
        <p className="text-sm mt-4">
          Pagamento único via PIX • Acesso em minutos • Garantia total
        </p>
      </div>
      <div className="bg-gray-900 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-gray-400 space-y-3">
          <p>
            <strong>AVISO LEGAL:</strong> Este produto não substitui o parecer
            médico profissional. Sempre consulte um profissional da saúde para
            tratar de assuntos relativos à saúde. Os resultados podem variar de
            pessoa para pessoa.
          </p>
          <p>Todos os direitos reservados © 2024</p>
        </div>
      </div>
    </footer>
  );
};