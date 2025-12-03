"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

export const Guarantee = () => {
  return (
    <section className="mb-12">
      <Alert className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/30">
        <ShieldCheck className="h-6 w-6 text-blue-500" />
        <AlertTitle className="text-xl font-bold text-blue-800 dark:text-blue-200">
          GARANTIA INCONDICIONAL DE 7 DIAS
        </AlertTitle>
        <AlertDescription className="text-lg">
          Você não tem absolutamente NENHUM RISCO. Se em 7 dias você achar
          que o conteúdo não vale nem os R$ 29,90, basta enviar um único
          e-mail e devolvemos 100% do seu dinheiro. Sem perguntas. Sem
          burocracia.
        </AlertDescription>
      </Alert>
    </section>
  );
};