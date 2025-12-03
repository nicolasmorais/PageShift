"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const FinalCta = () => {
  return (
    <section className="text-center py-12">
      <Alert variant="destructive" className="max-w-3xl mx-auto">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="font-bold">
          ATENÇÃO: quem espera demais, pode não ter uma segunda chance...
        </AlertTitle>
        <AlertDescription>
          <p>
            A demora no tratamento adequado pode levar a complicações graves e
            irreversíveis. Você está vivendo com uma bomba-relógio prestes a
            explodir: Amputações, Cegueira progressiva, Insuficiência renal,
            Derrame, Infarto silencioso. Essas são as próximas fases da doença.
          </p>
        </AlertDescription>
      </Alert>

      <h3 className="text-2xl font-bold">
        Chegou a Hora de Escolher Seu Futuro...
      </h3>
      <p className="text-lg max-w-3xl mx-auto">
        Você pode fechar esta página e continuar apostando que “dessa vez vai
        melhorar”, ou pode tomar a decisão que milhares de pessoas tomaram antes
        de você. A decisão que transformou histórias, evitou amputações e salvou
        famílias.
      </p>
      <Button
        size="lg"
        className="w-full max-w-md mx-auto h-16 text-2xl font-bold animate-pulse"
      >
        EU ESCOLHO VENCER A DIABETES!
      </Button>
    </section>
  );
};