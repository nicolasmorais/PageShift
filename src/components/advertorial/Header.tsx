"use client";

export const Header = () => {
  try {
    return (
      <header className="text-center py-10 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm text-red-600 font-semibold uppercase tracking-wider">
            Reportagem Especial: Saúde
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl text-gray-900 dark:text-white leading-tight font-black">
            Dr. Roberto Yano afirma: 7 em cada 10 diabéticos tipo 2 estão sendo
            tratados de forma errada no Brasil.
          </h1>
          <h2 className="mt-4 text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">
            "A Metformina está sufocando o seu pâncreas".
          </h2>
        </div>
      </header>
    );
  } catch (error) {
    console.error("Header: Erro ao renderizar:", error);
    return (
      <header className="text-center py-10 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl text-gray-900 dark:text-white leading-tight font-black">
            Erro ao carregar o cabeçalho
          </h1>
        </div>
      </header>
    );
  }
};