"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const ProblemAlert = () => {
  return (
    <>
      <Alert variant="destructive" className="mb-12">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Atenção!</AlertTitle>
        <AlertDescription>
          Este pode ser o texto mais importante que você já leu sobre a
          Diabetes Tipo 2. O que você fará nos próximos 5 minutos pode decidir
          se você irá vencer essa doença silenciosa ou continuar rumo a
          amputações, cegueira e dependência eterna de remédios. Leia com
          atenção.
        </AlertDescription>
      </Alert>
      <section className="mb-12">
        <p className="text-lg mb-4">
          Um novo estudo conduzido por pesquisadores Japoneses na Universidade
          de Tóquio (Bunkyō), foi recebido pela Universidade de São Paulo
          (USP) aqui no brasil, e revelou que 7 em cada 10 pacientes
          diabéticos tipo 2 estão seguindo um protocolo de tratamento
          ultrapassado, ineficaz — e em muitos casos, perigoso.
        </p>
        <h3 className="text-3xl font-bold text-center my-6">
          O nome disso? Erro médico sistemático.
        </h3>
        <p className="text-lg mb-4">
          Os remédios receitados como Metformina, Glifage, Glicazida por vezes
          trazem aquela falsa sensação de que você está fazendo a coisa certa,
          parecem controlar momentaneamente o problema, mas por dentro você
          sabe: seu corpo continua entrando em colapso.
        </p>
      </section>
    </>
  );
};