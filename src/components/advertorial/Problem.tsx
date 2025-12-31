"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown, ArrowRight } from "lucide-react";

export const Problem = () => {
  return (
    <section className="space-y-10 text-xl leading-relaxed text-slate-800 font-normal">
      <p className="first-letter:text-5xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-3 first-letter:float-left">
        Você já parou para pensar o por que da sua glicose continuar alta, mesmo
        tomando os remédios receitados corretamente, fazendo o que os médicos
        pedem e até mesmo comendo um pouco menos açúcar?
      </p>
      
      <div className="group overflow-hidden rounded-3xl shadow-2xl transition-all hover:scale-[1.01]">
          <img
            src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/metformina-6DhI93KiQK2MaPncdPNDTznhGiePYK.jpg"
            alt="Análise de Metformina"
            className="w-full h-auto"
          />
      </div>

      <p className="font-bold text-2xl text-slate-900 border-l-4 border-red-500 pl-6 py-2">Pois saiba que isso não é sua culpa.</p>
      
      <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-500 border-l-[6px] p-8 rounded-2xl shadow-sm">
        <AlertTriangle className="h-8 w-8 text-amber-600 mb-4" />
        <AlertTitle className="font-black text-amber-900 dark:text-amber-200 text-3xl mb-4 tracking-tight">
          LEITURA OBRIGATÓRIA
        </AlertTitle>
        <AlertDescription className="text-amber-800 dark:text-amber-300 text-xl leading-relaxed font-medium">
          Este pode ser o texto mais importante que você já leu sobre a Diabetes
          Tipo 2. O que você fará nos próximos 5 minutos pode decidir se você
          irá vencer essa doença silenciosa ou continuar rumo a amputações,
          cegueira e dependência eterna de remédios. <span className="underline decoration-amber-500/50 decoration-4">Leia com atenção redobrada.</span>
        </AlertDescription>
      </Alert>

      <p>
        <strong className="text-slate-900">Um novo estudo conduzido por pesquisadores Japoneses</strong> na Universidade de Tóquio (Bunkyō), foi recebido pela Universidade de São Paulo (USP) aqui no brasil, e revelou que <strong className="text-slate-900">7 em cada 10 pacientes diabéticos tipo 2 estão seguindo um protocolo de tratamento ultrapassado</strong>, ineficaz — e em muitos casos, perigoso.
      </p>

      <img
        src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/1_20250716143121-jkwImCoFGKN9UfW8l7MpZ8MkwC7a2S.jpg"
        alt="Gráfico de eficácia"
        className="w-full h-auto rounded-3xl shadow-xl border border-slate-100"
      />

      <h2 className="text-4xl font-black text-center py-8 text-slate-900 tracking-tight">
        O nome disso? <span className="text-red-600">Erro médico sistemático.</span>
      </h2>

      <p>
        Os remédios receitados como Metformina, Glifage, Glicazida por vezes
        trazem aquela falsa sensação de que você está fazendo a coisa certa,
        parecem controlar momentaneamente o problema, mas por dentro você sabe:
        seu corpo continua entrando em colapso.
      </p>

      <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-700 shadow-inner">
        <img
          src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/enhanced_441b7b5d-8850-444d-af70-488f594d5c22-aBTZK4gzJYBzRRy8spjG8H089khVpA.png"
          alt="Dr. Roberto Kazushigue Yano"
          className="w-full h-auto rounded-2xl mb-8 shadow-2xl"
        />
        <div className="space-y-4">
            <p className="text-lg">
              Quem afirma isso é o <span className="font-black text-slate-900 underline decoration-blue-500/30 decoration-4">Dr. Roberto Kazushigue Yano</span>, figura importante da medicina brasileira com mais de 7 milhões de seguidores e 26 anos de experiência.
            </p>
            <blockquote className="mt-6 border-l-4 border-blue-600 pl-8 py-2 italic text-2xl text-slate-700 dark:text-slate-300 font-medium">
              "Depois de acompanhar centenas de pacientes, tantas amputações evitáveis... vi com meus próprios olhos: os medicamentos só empurram a glicose para dentro das células à força, sem tratar a causa real."
            </blockquote>
        </div>
      </div>

      <div className="py-12 border-y border-slate-100">
        <h3 className="text-3xl font-black text-center mb-10 text-slate-900 tracking-tight">
          O erro de foco no seu tratamento...
        </h3>
        <p className="mb-8">
          A medicina tradicional foca obsessivamente em baixar os níveis de
          glicose no sangue. Mas a glicose alta não é a causa da doença, e sim a consequence de algo muito mais profundo.
        </p>
        <div className="grid gap-4">
          {[
            "Glicose descontrolada crônica",
            "Ganho de peso e acúmulo de gordura visceral",
            "Dependência progressiva de insulina",
            "Complicações circulatórias graves",
            "Neuropatia, risco de amputações e cegueira",
            'A frase que destrói esperanças: "você vai conviver com isso pra sempre"',
          ].map((step, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-transform hover:translate-x-2">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <TrendingDown className="h-5 w-5" />
              </div>
              <span className="font-bold text-slate-700">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};