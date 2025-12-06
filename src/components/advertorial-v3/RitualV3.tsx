"use client";

import { Leaf } from "lucide-react";

const benefits = [
  "Sensação de leveza após refeições",
  "Rotina mais equilibrada",
  "Bem-estar diário",
  "Hidratação e cuidado natural",
];

export const RitualV3 = () => {
  return (
    <section className="my-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <h2 className="text-3xl font-bold font-sans mb-6">
        A combinação de ervas que mais chamou atenção
      </h2>
      <p className="text-xl leading-relaxed mb-6">
        O guia citado na reportagem apresenta um blend natural de ervas que,
        segundo entusiastas, pode ser usado por quem deseja apoiar:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {benefits.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <Leaf className="h-6 w-6 text-green-600 flex-shrink-0" />
            <span className="text-xl">{item}</span>
          </div>
        ))}
      </div>
      <p className="text-xl leading-relaxed">
        O material explica passo a passo como preparar o chá, a quantidade
        recomendada, horários sugeridos e como integrá-lo à rotina — tudo dentro
        de um contexto de estilo de vida, não como substituto de tratamentos.
      </p>
    </section>
  );
};