"use client";

import { CheckCircle } from "lucide-react";

export const ContentAP = () => {
  return (
    <section className="space-y-6 text-xl leading-relaxed py-8">
      <p>
        Descubra práticas e dicas que podem ser incorporadas no seu dia a dia
        para promover mais equilíbrio e bem-estar. Uma rotina bem estruturada é
        o primeiro passo para uma vida mais saudável.
      </p>
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 font-sans">
          Pilares do Bem-Estar
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span>Alimentação Consciente</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span>Hidratação Adequada</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span>Movimento e Atividade Física</span>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span>Descanso e Recuperação</span>
          </li>
        </ul>
      </div>
      <p>
        Nosso guia oferece um olhar aprofundado sobre como pequenas mudanças
        podem gerar grandes resultados na sua saúde e disposição diária.
      </p>
    </section>
  );
};