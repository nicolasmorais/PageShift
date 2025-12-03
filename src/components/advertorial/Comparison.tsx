"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const Comparison = () => {
  return (
    <section className="my-12 space-y-12">
      <div className="w-full overflow-x-auto">
        <h2 className="text-3xl font-bold text-center mb-6 font-sans">
          COMPARE: Remédios vs. Protocolo Natural
        </h2>
        <table className="w-full min-w-max text-left text-lg">
          <thead>
            <tr className="border-b">
              <th className="p-4 bg-gray-100 dark:bg-gray-800 rounded-tl-lg">
                💊 Tratamento com Remédios
              </th>
              <th className="p-4 bg-gray-100 dark:bg-gray-800 rounded-tr-lg">
                🍵 Protocolo do Chá Japonês
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4">❌ Custo mensal: R$ 150-400</td>
              <td className="p-4">✅ Custo mensal: R$ 30-50</td>
            </tr>
            <tr className="border-b">
              <td className="p-4">❌ Efeitos colaterais</td>
              <td className="p-4">✅ Zero efeitos colaterais</td>
            </tr>
            <tr className="border-b">
              <td className="p-4">❌ Sobrecarga nos rins e fígado</td>
              <td className="p-4">✅ 100% natural</td>
            </tr>
            <tr className="border-b">
              <td className="p-4">❌ Trata apenas sintomas</td>
              <td className="p-4">✅ Trabalha a causa raiz</td>
            </tr>
            <tr>
              <td className="p-4">❌ Não regenera o pâncreas</td>
              <td className="p-4">✅ Regenera células beta</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-500">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertTitle className="font-bold text-red-800 dark:text-red-200">
          ATENÇÃO: quem espera demais, pode não ter uma segunda chance...
        </AlertTitle>
        <AlertDescription className="text-red-700 dark:text-red-300 text-lg">
          A demora no tratamento adequado pode levar a complicações graves e
          irreversíveis. Você está vivendo com uma bomba-relógio prestes a
          explodir: Amputações, Cegueira progressiva, Insuficiência renal,
          Derrame, Infarto silencioso. Essas são as próximas fases da doença.
        </AlertDescription>
      </Alert>
    </section>
  );
};