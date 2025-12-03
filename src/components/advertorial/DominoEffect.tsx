"use client";

import { XCircle } from "lucide-react";

export const DominoEffect = () => {
  return (
    <section className="mb-12">
      <h3 className="text-3xl font-bold text-center mb-6">
        O erro de foco no seu tratamento que ninguém te contou...
      </h3>
      <p className="text-lg mb-4">
        A glicose alta não é a causa da doença, mas sim a consequência de
        algo muito mais profundo. A maioria dos medicamentos apenas obriga o
        corpo a baixar a glicose, sem resolver a inflamação crônica e os
        bloqueios celulares no pâncreas.
      </p>
      <h4 className="text-2xl font-bold text-center my-6 text-red-600 dark:text-red-400">
        E isso leva ao efeito dominó:
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
        {[
          "Glicose descontrolada",
          "Ganho de peso e gordura visceral",
          "Substituição por insulina",
          "Complicações circulatórias",
          "Neuropatia, amputações, cegueira",
          'E a pior frase de todas: "você vai ter que conviver com isso pra sempre"',
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <XCircle className="text-red-500" /> {item}
          </div>
        ))}
      </div>
    </section>
  );
};