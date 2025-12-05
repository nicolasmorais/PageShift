"use client";

import { CheckCircle } from "lucide-react";

const reasons = [
  "Aprender um método tradicional japonês de preparo",
  "Criar uma rotina mais consistente no dia a dia",
  "Registrar hábitos e acompanhar sua organização",
  "Aumentar o cuidado pessoal de forma simples e natural",
  "Explorar ingredientes facilmente encontrados no Brasil",
];

export const WhyItWorksV3 = () => {
  return (
    <section className="my-12 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-6 font-sans">
        🔎 Por que tantas pessoas se interessaram?
      </h2>
      <p className="text-xl leading-relaxed mb-6">
        Segundo especialistas em hábitos saudáveis, chás tradicionais fazem
        parte de culturas antigas há séculos e são apreciados pelo sabor, pela
        simplicidade e por ajudarem a criar momentos de pausa e atenção ao
        próprio corpo.
      </p>
      <p className="text-xl leading-relaxed mb-6 font-semibold">
        O guia reúne orientações culturais e práticas para quem deseja:
      </p>
      <div className="space-y-4">
        {reasons.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle className="h-7 w-7 text-green-600 flex-shrink-0 mt-1" />
            <span className="text-xl">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
};