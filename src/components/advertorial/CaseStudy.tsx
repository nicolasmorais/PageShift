"use client";

import { User, CheckCircle } from "lucide-react";

export const CaseStudy = () => {
  return (
    <section className="my-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <h2 className="text-3xl font-bold mb-6 font-sans flex items-center gap-3">
        <User className="h-8 w-8" />
        Manoel — o diabético que fez "tudo certo"... mas quase parou em uma
        máquina de hemodiálise
      </h2>
      <img
        src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/retrato-de-um-homem-de-meia-idade-usando-um-bone-colorido_335332-742%20%281%29-I7rcgiM28V7I462M9PijjBhrl934F6.jpg"
        alt="Seu Manoel, um homem de meia idade sorrindo"
        className="w-full h-auto rounded-lg my-6 shadow-md"
      />
      <div className="space-y-6 text-xl leading-relaxed">
        <p>
          Seu Manoel, 64 anos, aposentado, morava no interior de Goiás.
          Diagnosticado com diabetes tipo 2 há mais de 22 anos, estava com a
          glicose em 290 mg/dL, sentia tonturas, visão embaçada e seus pés
          começaram a perder a sensibilidade. O diagnóstico era: nefropatia
          diabética, uma complicação severa.
        </p>
        <p className="font-semibold">
          O problema é que ele já seguia tudo que o seu endocrinologista
          mandava:
        </p>
        <img
          src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/urina-com-espuma-scaled-1-kSjxkgXRuOWxUI7AaEm6uWo3FX7ZK2.jpg"
          alt="Urina com espuma, um sintoma de problema renal"
          className="w-full h-auto rounded-lg my-6 shadow-md"
        />
        <ul className="space-y-2 my-4">
          <li className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Tomava 3 comprimidos de Metformina todos os dias (1500mg).
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Controlava o açúcar e caminhava três vezes por semana.
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Evitava alimentos com alto índice glicêmico.
          </li>
        </ul>
        <p>
          Mesmo assim, a glicose nunca ficava totalmente sob controle. Se ele
          não tivesse conhecido um outro caminho, estaria fazendo hemodiálise. A
          sorte é que ele foi salvo no limite!
        </p>
        <img
          src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/qualidade-vida-paciente-hemodialise-q0ctIYihvARlrqUtGTp18yGq0z4hLk.jpg"
          alt="Paciente em máquina de hemodiálise"
          className="w-full h-auto rounded-lg my-6 shadow-md"
        />
        <blockquote className="border-l-4 border-gray-500 pl-4 italic mt-6 bg-white dark:bg-gray-800 p-4 rounded-r-lg">
          <p>
            “O seu corpo ainda é capaz de controlar a glicose naturalmente. O que
            falta não é remédio. O que falta é desbloquear o que está travado
            dentro de você.”
          </p>
          <cite className="mt-2 block not-italic font-semibold">
            — Dr. Yano para Seu Manoel
          </cite>
        </blockquote>
      </div>
    </section>
  );
};