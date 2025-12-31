"use client";

import { CheckCircle2, Star } from "lucide-react";

const testimonials = [
  {
    name: "João Oliveira, 62 anos",
    text: "Recebi tudo no e-mail em 3 minutos! Em 2 semanas minha glicemia caiu de 240 para 130. Estou impressionado com a simplicidade e o resultado!",
    time: "há 2 horas",
  },
  {
    name: "Renata Tanaka, 54 anos",
    text: "Eu era cética, mas resolvi tentar. Melhor decisão! O chá funciona. Minha glicose baixou 90 pontos. Meu médico ficou boquiaberto!",
    time: "há 5 horas",
  },
  {
    name: "Sérgio Vaz, 58 anos",
    text: "Achei que ia ser complicado, mas é muito simples! Já não sinto mais aquele formigamento terrível nas pernas. Vale MUITO a pena!",
    time: "há 1 dia",
  },
];

export const Testimonials = () => {
  return (
    <section className="my-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
          Comunidade & Resultados
        </h2>
        <div className="flex justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
        </div>
        <p className="text-slate-500 font-bold mt-2">Média 4.9/5 estrelas baseada em 2.400+ relatos</p>
      </div>

      <div className="space-y-8 max-w-3xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-slate-200 rounded-full h-14 w-14 flex-shrink-0 border-4 border-white shadow-md"></div>
            <div className="w-full">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-50 relative">
                <div className="flex items-center justify-between mb-3">
                    <p className="font-black text-slate-900 text-lg flex items-center gap-2">
                        {testimonial.name}
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    </p>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{testimonial.time}</span>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};