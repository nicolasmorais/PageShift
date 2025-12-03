"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export const Comparison = () => {
  return (
    <section className="mb-12">
      <h3 className="text-3xl font-bold text-center mb-8">
        Compare: Remédios vs. Protocolo Natural
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">
              💊 Tratamento com Remédios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="flex items-center gap-2">
              <XCircle className="text-red-500" /> Custo mensal: R$ 150-400
            </p>
            <p className="flex items-center gap-2">
              <XCircle className="text-red-500" /> Efeitos colaterais
              frequentes
            </p>
            <p className="flex items-center gap-2">
              <XCircle className="text-red-500" /> Sobrecarga nos rins e
              fígado
            </p>
            <p className="flex items-center gap-2">
              <XCircle className="text-red-500" /> Trata apenas sintomas
            </p>
          </CardContent>
        </Card>
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="text-green-600 dark:text-green-400">
              🍵 Protocolo do Chá Japonês
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="flex items-center gap-2">
              <CheckCircle className="text-green-500" /> Investimento
              único: R$ 29,90
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="text-green-500" /> Zero efeitos
              colaterais
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="text-green-500" /> 100% natural
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="text-green-500" /> Trabalha a causa
              raiz
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="text-center mt-6 text-xl font-bold bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg">
        ECONOMIA: Até R$ 4.170 por ano!
      </div>
    </section>
  );
};