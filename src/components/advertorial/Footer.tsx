"use client";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="bg-gray-900 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-gray-400 space-y-3">
          <p>
            <strong>AVISO LEGAL:</strong> Este produto não substitui o parecer
            médico profissional. Sempre consulte um profissional da saúde para
            tratar de assuntos relativos à saúde. Os resultados podem variar de
            pessoa para pessoa.
          </p>
          <p>Todos os direitos reservados © 2024</p>
        </div>
      </div>
    </footer>
  );
};