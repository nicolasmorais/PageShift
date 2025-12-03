"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const CaseStudy = () => {
  return (
    <section className="mb-12">
      <Card className="overflow-hidden">
        <CardHeader className="bg-blue-100 dark:bg-blue-900/50">
          <CardTitle className="text-2xl text-blue-800 dark:text-blue-200">
            Manoel — o diabético que fez "tudo certo"... mas quase parou em
            uma máquina de hemodiálise
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4">
            Seu Manoel, 64 anos, diagnosticado há 22 anos, seguia tudo que o
            médico mandava: tomava 3 comprimidos de Metformina, controlava o
            açúcar, caminhava. Mesmo assim, sua glicose nunca ficava abaixo
            de 240 mg/dL e ele desenvolveu nefropatia diabética.
          </p>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>A sorte é que ele foi salvo no limite!</AlertTitle>
            <AlertDescription>
              Desesperado, ele me procurou. O que eu o ofereci foi um
              protocolo totalmente diferente, baseado em uma bebida
              medicinal japonesa ancestral.
            </AlertDescription>
          </Alert>
          <blockquote className="mt-6 border-l-4 border-blue-500 pl-4 italic text-lg">
            "O seu corpo ainda é capaz de controlar a glicose naturalmente.
            O que falta não é remédio. O que falta é desbloquear o que está
            travado dentro de você."
          </blockquote>
        </CardContent>
      </Card>
    </section>
  );
};