"use client";

import { CheckCircle } from "lucide-react";

const reasons = [
  "Apoiar o bem-estar diário",
  "Reduzir consumo excessivo de açúcar",
  "Manter rotinas mais leves e equilibradas",
  "Criar rituais que ajudam na disciplina alimentar",
];

export const WhyItWorksV3 = () => {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6 font-sans">
        O que despertou o interesse no Brasil?
      </h2>
      <p className="text-xl leading-relaxed mb-6">
        Pesquisas de comportamento mostram que cada vez mais brasileiros
        procuram práticas naturais para:
      </p>
      <div className="space-y-4 mb-8">
        {reasons.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle className="h-7 w-7 text-green-600 flex-shrink-0 mt-1" />
            <span className="text-xl">{item}</span>
          </div>
        ))}
      </div>
      <p className="text-xl leading-relaxed mb-6">
        Especialistas em estilo de vida afirmam que rituais simples, como beber
        chá após as refeições, podem contribuir para maior atenção ao corpo e à
        alimentação — o que indiretamente favorece quem busca cuidar da saúde de
        forma mais consciente.
      </p>
      <blockquote className="border-l-4 border-gray-500 pl-4 italic bg-gray-50 dark:bg-gray-800/50 p-4 rounded-r-lg">
        <p className="text-xl">
          “Quando uma pessoa cria um ritual, ela tende a prestar mais atenção ao
          que come, nos horários e na própria rotina. Isso gera impacto positivo
          no bem-estar.”
        </p>
        <cite className="mt-2 block not-italic font-semibold">
          — Marina S., pesquisadora de hábitos alimentares
        </cite>
      </blockquote>
    </section>
  );
};