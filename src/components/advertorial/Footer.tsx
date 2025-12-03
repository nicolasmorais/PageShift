"use client";

import { Lock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="text-center text-xs text-gray-500 dark:text-gray-400 pt-8 border-t">
      <p className="mb-4">
        <Lock className="inline h-4 w-4 mr-1" />
        Compra 100% Segura e Garantida. Seus dados estão protegidos.
      </p>
      <p>
        Este é um produto informacional digital. Nenhum produto físico será
        enviado. O acesso é 100% online. Resultados podem variar. Este
        material não substitui acompanhamento médico.
      </p>
    </footer>
  );
};