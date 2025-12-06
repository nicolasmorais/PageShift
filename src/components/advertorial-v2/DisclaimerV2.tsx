"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const DisclaimerV2 = () => {
  return (
    <section className="my-12">
      <Alert
        variant="destructive"
        className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-left"
      >
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <AlertTitle className="font-bold text-yellow-800 dark:text-yellow-200 text-2xl">
          Aviso Importante
        </AlertTitle>
        <AlertDescription className="text-yellow-700 dark:text-yellow-300 text-lg mt-2">
          Este conteúdo tem finalidade informativa e não substitui avaliação,
          diagnóstico ou tratamento médico. Sempre consulte um profissional de
          saúde antes de iniciar qualquer prática complementar.
        </AlertDescription>
      </Alert>
    </section>
  );
};