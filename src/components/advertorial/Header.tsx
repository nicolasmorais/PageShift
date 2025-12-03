"use client";

export const Header = () => {
  return (
    <header className="text-center py-12">
      <h1 className="text-3xl md:text-5xl font-extrabold text-red-700 dark:text-red-500 leading-tight">
        Dr. Roberto Yano afirma: 7 em cada 10 diabéticos tipo 2 estão sendo
        tratados de forma errada no Brasil.
      </h1>
      <h2 className="mt-4 text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
        "A Metformina está sufocando o seu pâncreas".
      </h2>
      <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
        Você já parou para pensar o por que da sua glicose continuar alta,
        mesmo tomando os remédios receitados corretamente, fazendo o que os
        médicos pedem e até mesmo comendo um pouco menos açúcar?
      </p>
      <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
        Pois saiba que isso não é sua culpa.
      </p>
    </header>
  );
};