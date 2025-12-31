"use client";

import { BookOpen, Video, FileText, Calendar, CheckCircle2 } from "lucide-react";

const productItems = [
  {
    icon: BookOpen,
    title: "MANUAL COMPLETO DO CHÁ JAPONÊS",
    description: "PDF Digital - 58 páginas com a fórmula exata revelada.",
  },
  {
    icon: Video,
    title: "VÍDEO-AULA EXCLUSIVA: PREPARO",
    description: "Dr. Yano mostra na prática o ritual de preparo japonês.",
  },
  {
    icon: FileText,
    title: "DIÁRIO DE CONTROLE GLICÊMICO",
    description: "Ferramenta para acompanhar sua evolução diária.",
  },
  {
    icon: BookOpen,
    title: "GUIA ALIMENTAR SINÉRGICO",
    description: "Alimentos que potenciam o efeito regenerativo do chá.",
  },
  {
    icon: Calendar,
    title: "PROTOCOLO DE 90 DIAS",
    description: "Cronograma estruturado para resultados permanentes.",
  },
];

export const Offer = () => {
  return (
    <section id="offer" className="my-24 space-y-12">
      <div className="text-center p-12 bg-slate-900 text-white rounded-[3rem] shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
          O Protocolo do Chá Japonês
        </h2>
        <p className="text-5xl font-black text-blue-400 font-sans tracking-tight">
          Edição Digital Regenerativa
        </p>
      </div>

      <div className="p-10 border border-slate-100 rounded-[3rem] bg-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
            <CheckCircle2 size={180} />
        </div>
        <h3 className="text-2xl font-black mb-10 text-center uppercase tracking-widest text-slate-400">
          O QUE VOCÊ RECEBE IMEDIATAMENTE:
        </h3>
        <div className="grid gap-8">
          {productItems.map((item, i) => (
            <div key={i} className="flex items-start gap-6 group">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <item.icon className="h-8 w-8" />
              </div>
              <div className="py-1">
                <p className="font-black text-xl text-slate-900 mb-1">{item.title}</p>
                <p className="text-lg text-slate-500 font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};