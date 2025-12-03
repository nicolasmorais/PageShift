"use client";

import { ShieldCheck } from "lucide-react";

export const Guarantee = () => {
  return (
    <section className="my-12">
      <div className="border-2 border-green-500 bg-green-50 dark:bg-green-900/30 p-6 rounded-lg text-center">
        <ShieldCheck className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 font-sans">
          GARANTIA INCONDICIONAL DE 7 DIAS
        </h3>
        <div className="text-xl leading-relaxed mt-4 text-green-700 dark:text-green-300">
          <p>
            Você não tem absolutamente NENHUM RISCO. Se em 7 dias você achar que
            o conteúdo não vale nem os R$ 29,90, basta enviar um único e-mail e
            devolvemos 100% do seu dinheiro. Sem perguntas. Sem burocracia.
          </p>
          <p className="italic mt-4">
            “Se esse protocolo não agregar valor à sua vida, ele não merece
            ficar com o seu dinheiro.” – Dr. Yano.
          </p>
        </div>
      </div>
    </section>
  );
};