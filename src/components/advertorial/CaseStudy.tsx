"use client";

import { User, CheckCircle, ShieldCheck } from "lucide-react";

export const CaseStudy = () => {
  return (
    <section className="my-20 p-10 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-900 rounded-[3rem] border border-blue-100 dark:border-blue-800 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <User size={120} />
      </div>
      
      <h2 className="text-4xl font-black mb-10 text-slate-900 dark:text-white leading-tight tracking-tight flex items-center gap-4">
        <div className="bg-blue-600 p-2 rounded-xl text-white">
            <User className="h-8 w-8" />
        </div>
        Manoel — o diabético que quase parou na hemodiálise
      </h2>

      <img
        src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/retrato-de-um-homem-de-meia-idade-usando-um-bone-colorido_335332-742%20%281%29-I7rcgiM28V7I462M9PijjBhrl934F6.jpg"
        alt="Seu Manoel"
        className="w-full h-auto rounded-3xl my-8 shadow-2xl border-4 border-white dark:border-slate-800"
      />

      <div className="space-y-8 text-xl leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          Seu Manoel, 64 anos, com diabetes há 22 anos. Glicose em 290 mg/dL, visão embaçada e perda de sensibilidade nos pés. O diagnóstico era severo: nefropatia diabética.
        </p>
        
        <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-blue-100 dark:border-blue-700">
            <p className="font-black text-slate-900 dark:text-white mb-6 text-2xl uppercase tracking-tighter">
                Ele seguia o protocolo padrão:
            </p>
            <ul className="space-y-4">
              {[
                "Tomava 3 comprimidos de Metformina (1500mg/dia)",
                "Controlava rigorosamente o açúcar e caminhava",
                "Evitava alimentos com alto índice glicêmico"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 font-bold text-slate-800 dark:text-slate-200">
                  <div className="bg-green-100 p-1 rounded-full text-green-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
        </div>

        <img
          src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/urina-com-espuma-scaled-1-kSjxkgXRuOWxUI7AaEm6uWo3FX7ZK2.jpg"
          alt="Sintoma grave"
          className="w-full h-auto rounded-2xl shadow-lg my-8"
        />

        <p className="text-2xl font-medium">
          Mesmo assim, a glicose nunca estabilizava. Seu Manoel estava a um passo da <span className="text-red-600 font-black">máquina de hemodiálise</span>.
        </p>

        <img
          src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/qualidade-vida-paciente-hemodialise-q0ctIYihvARlrqUtGTp18yGq0z4hLk.jpg"
          alt="Hemodiálise"
          className="w-full h-auto rounded-2xl shadow-lg my-8"
        />

        <blockquote className="border-l-8 border-blue-600 pl-10 italic mt-12 bg-white dark:bg-slate-800 p-10 rounded-r-3xl shadow-sm">
          <p className="text-3xl font-black text-slate-900 dark:text-white mb-4">
            “O seu corpo ainda é capaz de controlar a glicose naturalmente. O que falta é desbloquear o que está travado.”
          </p>
          <cite className="mt-4 block not-italic font-black text-blue-600 uppercase tracking-widest text-sm">
            — Dr. Yano para Seu Manoel
          </cite>
        </blockquote>
      </div>
    </section>
  );
};