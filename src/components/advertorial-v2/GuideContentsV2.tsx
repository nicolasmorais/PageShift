"use client";

import { CheckCircle } from "lucide-react";

const guideContents = [
  "Como preparar o chá da forma tradicional japonesa",
  "Quais ingredientes são utilizados",
  "Como inserir a prática no dia a dia",
  "Dicas de bem-estar que podem apoiar sua rotina",
  "Um diário para acompanhar seus hábitos diariamente",
];

export const GuideContentsV2 = () => {
  return (
    <section className="my-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <h2 className="text-3xl font-bold mb-6 font-sans text-center">
        O guia criado pelo Dr. Yano mostra:
      </h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        {guideContents.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
            <span className="text-xl">{item}</span>
          </div>
        ))}
      </div>
      <p className="text-center mt-6 text-lg">
        Todo o conteúdo foi organizado em um formato simples, acessível e
        pensado para quem deseja incluir práticas naturais complementares no
        cotidiano.
      </p>
    </section>
  );
};