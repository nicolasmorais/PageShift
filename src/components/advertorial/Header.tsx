"use client";

export const Header = () => {
  return (
    <header className="text-center py-16 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="inline-block px-4 py-1.5 rounded-full bg-red-50 border border-red-100 mb-6">
            <p className="text-xs text-red-600 font-black uppercase tracking-[0.2em]">
                Reportagem Especial: Saúde & Bem-Estar
            </p>
        </div>
        <h1 className="text-4xl md:text-6xl text-slate-900 dark:text-white leading-[1.1] font-black tracking-tight">
          Dr. Roberto Yano afirma: 7 em cada 10 diabéticos tipo 2 estão sendo
          tratados de forma errada no Brasil.
        </h1>
        <h2 className="mt-8 text-xl md:text-2xl font-medium text-slate-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed italic">
          "A Metformina está sufocando o seu pâncreas e impedindo a sua regeneração natural".
        </h2>
      </div>
    </header>
  );
};