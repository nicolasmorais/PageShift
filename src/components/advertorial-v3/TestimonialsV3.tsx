"use client";

import { Check } from "lucide-react";

const reports = [
  "Reduzir a vontade de “beliscar” doces",
  "Criar uma rotina mais organizada",
  "Melhorar a digestão",
  "Se sentir mais disciplinadas com horários e alimentação",
];

export const TestimonialsV3 = () => {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-8 text-center font-sans">
        Relatos de leitores
      </h2>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
        <p className="text-xl leading-relaxed mb-6">
          Os comentários enviados à redação apontam que muitas pessoas
          começaram a consumir o chá como forma de:
        </p>
        <div className="space-y-4">
          {reports.map((report, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-xl">{report}</span>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-base text-gray-600 dark:text-gray-400">
          Nenhum dos depoimentos faz referência a cura ou tratamento — apenas à
          experiência de incorporar o ritual ao dia a dia.
        </p>
      </div>
    </section>
  );
};