"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap, AlertTriangle, ShieldCheck } from "lucide-react";

const faqItems = [
  {
    question: "Como recebo o material após o pagamento?",
    answer:
      "Assim que o PIX for confirmado (geralmente em 1 a 5 minutos), você recebe automaticamente no seu e-mail um link de acesso para baixar todo o conteúdo. Você pode salvar no seu celular, tablet ou computador.",
  },
  {
    question: "Onde encontro os ingredientes do chá?",
    answer:
      "Todos os ingredientes estão disponíveis em lojas de produtos naturais, farmácimas de manipulação ou pela internet. No e-book, você recebe uma lista detalhada com sugestões de onde comprar.",
  },
  {
    question: "Preciso parar meus medicamentos?",
    answer:
      "NUNCA pare seus medicamentos por conta própria! Use o protocolo junto com seu tratamento atual. Conforme você melhorar, seu médico é quem decidirá sobre reduzir as doses.",
  },
  {
    question: "É complicado preparar o chá?",
    answer:
      "NÃO! É tão simples quanto fazer um chá comum. O vídeo mostra cada passo de forma clara. Se você consegue ferver água, você consegue fazer o protocolo.",
  },
  {
    question: "Quanto tempo até ver resultados?",
    answer:
      "A maioria dos usuários relata melhoras nos primeiros 7 a 14 dias. A glicemia começa a baixar já na primeira semana. O protocolo completo é de 90 dias para resultados consolidados.",
  },
];

export const Pricing = () => {
  return (
    <section className="my-12 text-center space-y-8">
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <h3 className="text-2xl font-bold font-sans">
          Por que esse preço tão acessível?
        </h3>
        <p className="text-xl leading-relaxed mt-4">
          "Eu poderia vender esse protocolo por R$ 297, R$ 497 ou até mais. Mas
          meu objetivo não é ganhar dinheiro com a sua dor. Meu objetivo é
          salvar vidas. Por isso, decidi oferecer por um valor simbólico de
          menos de R$ 30 reais." - Dr. Yano
        </p>
      </div>

      {/* New Pricing Card */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 border-2 border-green-500 rounded-xl shadow-2xl p-8 space-y-6">
        <p className="text-xl font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
          Investimento Único de Apenas:
        </p>
        <div className="flex items-baseline justify-center gap-4">
          <p className="text-3xl text-gray-500 line-through">De R$ 127,00</p>
          <p className="text-8xl font-extrabold text-green-600">R$ 29,90</p>
        </div>
        <div className="text-left max-w-sm mx-auto space-y-2 text-lg">
          <p className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-green-500 flex-shrink-0" />
            <span>
              Pagamento <span className="font-bold">único via PIX</span>
            </span>
          </p>
          <p className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-green-500 flex-shrink-0" />
            <span>
              Acesso <span className="font-bold">imediato e vitalício</span>
            </span>
          </p>
        </div>

        <Button
          size="lg"
          className="w-full h-24 text-3xl font-bold animate-pulse bg-green-600 hover:bg-green-700 text-white shadow-lg rounded-lg"
          onClick={() => {
            /* Ação de clique */
          }}
        >
          <Zap className="mr-4 h-9 w-9" />
          ADQUIRIR MEU ACESSO
        </Button>

        <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          Compra 100% segura. Acesso liberado em até 5 minutos no seu e-mail.
        </p>
      </div>

      <Alert
        variant="destructive"
        className="bg-red-50 dark:bg-red-900/20 border-red-500 text-left mt-12"
      >
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertTitle className="font-bold text-red-800 dark:text-red-200">
          ATENÇÃO: quem espera demais, pode não ter uma segunda chance...
        </AlertTitle>
        <AlertDescription className="text-red-700 dark:text-red-300 text-lg">
          A demora no tratamento adequado pode levar a complicações graves e
          irreversíveis. Você está vivendo com uma bomba-relógio prestes a
          explodir: Amputações, Cegueira progressiva, Insuficiência renal,
          Derrame, Infarto silencioso. Essas são as próximas fases da doença.
        </AlertDescription>
        <img
          src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ferida-no-pe-diabetico-1024x512%20%281%29-WBhIaxRKCsgD0YUgYr4DpR52RKyiZ2.jpg"
          alt="Pé diabético com ferida, uma complicação grave da diabetes"
          className="w-full h-auto rounded-lg my-4 shadow-md"
        />
      </Alert>

      <div className="w-full mt-16 text-left space-y-6 border-t pt-8">
        <h3 className="text-2xl font-bold text-center mb-4 font-sans">
          Perguntas Frequentes
        </h3>
        {faqItems.map((item, index) => (
          <div key={index}>
            <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {item.question}
            </p>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 mt-2">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};