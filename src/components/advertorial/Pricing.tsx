"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap, AlertTriangle, ShieldCheck, Lock, CreditCard } from "lucide-react";

const faqItems = [
  {
    question: "Como recebo o material após o pagamento?",
    answer: "Imediatamente no seu e-mail após a confirmação. Link de acesso vitalício.",
  },
  {
    question: "Onde encontro os ingredientes do chá?",
    answer: "Lojas de produtos naturais ou internet. Fornecemos uma lista detalhada.",
  },
  {
    question: "Preciso parar meus medicamentos?",
    answer: "NUNCA! Use o protocolo como complemento. Seu médico decidirá reduções.",
  },
];

export const Pricing = () => {
  return (
    <section className="my-24 space-y-12">
      <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] text-center max-w-3xl mx-auto shadow-inner">
        <h3 className="text-2xl font-black text-slate-900 mb-4">
          Contribuição Simbólica
        </h3>
        <p className="text-xl leading-relaxed text-slate-600 font-medium italic">
          "Estabeleci um valor simbólico para que este conhecimento transformador 
          alcance o maior número de brasileiros, cobrindo apenas os custos da pesquisa."
        </p>
      </div>

      {/* Modern High-Conversion Pricing Card */}
      <div className="max-w-3xl mx-auto bg-white border-4 border-green-500 rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] p-12 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <Lock size={120} />
        </div>
        
        <div className="text-center space-y-2">
            <p className="text-xl font-black uppercase tracking-[0.2em] text-slate-400">
              Acesso Completo Por Apenas:
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl font-bold text-slate-300 line-through">R$ 147</span>
              <p className="text-8xl md:text-9xl font-black text-green-600 tracking-tighter">R$ 29,90</p>
            </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 py-4">
          <div className="flex items-center gap-2 font-black text-slate-700">
            <ShieldCheck className="h-6 w-6 text-green-500" />
            <span>PAGAMENTO ÚNICO</span>
          </div>
          <div className="flex items-center gap-2 font-black text-slate-700">
            <Zap className="h-6 w-6 text-green-500" />
            <span>ACESSO IMEDIATO</span>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full h-24 text-3xl font-black animate-pulse bg-green-600 hover:bg-green-700 text-white shadow-[0_20px_40px_-10px_rgba(22,163,74,0.4)] rounded-3xl"
        >
          <Zap className="mr-4 h-9 w-9" />
          QUERO ACESSAR AGORA
        </Button>

        <div className="flex justify-center items-center gap-4 opacity-50">
            <CreditCard size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Compra 100% Segura • SSL Encriptado</span>
        </div>
      </div>

      <Alert variant="destructive" className="bg-red-50 border-red-500 border-l-[8px] p-10 rounded-[2.5rem] shadow-xl">
        <AlertTriangle className="h-8 w-8 text-red-600 mb-6" />
        <AlertTitle className="font-black text-red-900 text-3xl mb-4 tracking-tight">
          ATENÇÃO: RISCO DE COMPLICAÇÕES GRAVES
        </AlertTitle>
        <AlertDescription className="text-red-800 text-xl leading-relaxed font-medium">
          A demora pode ser irreversível. Você está vivendo com uma bomba-relógio: 
          Amputações, Cegueira, Insuficiência renal e Infarto silencioso são as próximas fases.
        </AlertDescription>
        <img
          src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ferida-no-pe-diabetico-1024x512%20%281%29-WBhIaxRKCsgD0YUgYr4DpR52RKyiZ2.jpg"
          alt="Alerta de saúde"
          className="w-full h-auto rounded-2xl my-8 shadow-2xl grayscale-[0.2]"
        />
      </Alert>

      <div className="max-w-3xl mx-auto pt-16 space-y-8">
        <h3 className="text-3xl font-black text-center text-slate-900">Perguntas Frequentes</h3>
        <div className="grid gap-6">
            {faqItems.map((item, index) => (
              <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xl font-black text-slate-900 mb-2">{item.question}</p>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">{item.answer}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};