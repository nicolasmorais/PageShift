"use client";

import { Badge } from "@/components/ui/badge";
import { Leaf, Dna, Globe, Check, ShieldCheck, Microscope } from "lucide-react";

export const Solution = () => {
  return (
    <section className="my-20 space-y-12 text-xl leading-relaxed">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          O Pâncreas Não Está Morto. Ele Está <span className="text-blue-600 underline decoration-blue-500/30 decoration-8 underline-offset-4">Adormecido.</span>
        </h2>
        <p className="text-2xl mt-6 text-slate-500 font-medium italic">
          Existe uma forma natural de estimular a regeneração dessas células.
        </p>
      </div>

      <div className="p-10 border border-slate-100 rounded-[3rem] bg-white shadow-2xl space-y-8">
        <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%203%20de%20dez.%20de%202025%2C%2020_24_07-CegP8MFAadFJUCgpK40pYN2w5o7Ilv.png"
              alt="Bebida ancestral"
              className="w-full h-auto"
            />
        </div>
        <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4">
          <div className="bg-green-600 p-2 rounded-xl text-white">
            <Leaf className="h-7 w-7" />
          </div>
          Protocolo Oriental Validado
        </h3>
        <p className="text-slate-700">
          Dr. Yano revelou uma <span className="font-black text-slate-900">bebida medicinal japonesa ancestral</span> que age em três pilares fundamentais:
        </p>
        <div className="grid gap-4">
          {[
            "Desinflama o tecido pancreático e as células beta",
            "Reativa a produção endógena de insulina",
            "Estabiliza os níveis glicêmicos sem efeitos colaterais"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-5 bg-green-50 rounded-2xl border border-green-100">
              <Check className="h-6 w-6 text-green-600" />
              <span className="font-bold text-green-800">{item}</span>
            </div>
          ))}
        </div>
        <div className="p-6 bg-slate-900 text-white rounded-2xl text-center">
            <p className="font-bold text-xl">Em 28 dias, os exames de Manoel se normalizaram: 98 mg/dL.</p>
        </div>
      </div>

      <div className="p-10 border border-slate-100 rounded-[3rem] bg-slate-50 space-y-8">
        <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%203%20de%20dez.%20de%202025%2C%2021_10_34-NTd4IPZ5iz7r2y4Z8tthkLa05ZVN6Y.png"
              alt="Gráfico científico"
              className="w-full h-auto"
            />
        </div>
        <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <Microscope className="h-7 w-7" />
          </div>
          Evidências Científicas
        </h3>
        <p>
          Pesquisas no <span className="italic font-bold">Journal of Medicinal Food</span> confirmam que os compostos ativos do chá reduzem marcadores inflamatórios e aumentam a sensibilidade celular à insulina.
        </p>
        <Badge
          className="text-xl p-8 font-black w-full text-center bg-blue-600 text-white rounded-2xl shadow-xl hover:bg-blue-700 transition-colors block"
        >
          Mais de 82% dos pacientes estabilizaram abaixo de 100 mg/dL em 3 semanas.
        </Badge>
      </div>

      <div className="p-10 border border-slate-200 rounded-[3rem] bg-white shadow-sm">
        <h3 className="text-3xl font-black mb-8 text-slate-900 flex items-center gap-4">
          <div className="bg-purple-600 p-2 rounded-xl text-white">
            <Globe className="h-7 w-7" />
          </div>
          Alcance Global
        </h3>
        <p className="mb-8">
          Mais de 26 mil brasileiros já testaram o protocolo com resultados surpreendentes:
        </p>
        <div className="space-y-4">
          {[
            { t: "7 em cada 10 usuários", d: "eliminaram o uso de insulina em 90 dias." },
            { t: "91% de melhora", d: "na fadiga, tonturas e formigamentos." },
            { t: "84% de melhora", d: "expressiva na cicatrição e pressão arterial." }
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-slate-100 hover:border-purple-200 transition-colors">
              <ShieldCheck className="h-8 w-8 text-purple-600 mt-1 flex-shrink-0" />
              <p className="text-slate-700">
                <span className="font-black text-slate-900">{item.t}</span> {item.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};