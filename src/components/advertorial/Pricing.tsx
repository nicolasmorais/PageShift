"use client";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Como recebo o material após o pagamento?",
    answer:
      "Assim que o PIX for confirmado (geralmente em 1 a 5 minutos), você recebe automaticamente no seu e-mail um link de acesso para baixar todo o conteúdo. Você pode salvar no seu celular, tablet ou computador.",
  },
  {
    question: "Onde encontro os ingredientes do chá?",
    answer:
      "Todos os ingredientes estão disponíveis em lojas de produtos naturais, farmácias de manipulação ou pela internet. No e-book, você recebe uma lista detalhada com sugestões de onde comprar.",
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
      <div className="space-y-4">
        <p className="text-lg">INVESTIMENTO ÚNICO DE APENAS:</p>
        <p className="text-gray-500 line-through">De R$ 127,00</p>
        <p className="text-7xl font-extrabold text-green-600">R$ 29,90</p>
        <p className="font-semibold">✅ Pagamento único via PIX</p>
        <p className="font-semibold">✅ Acesso imediato e vitalício</p>
      </div>
      <Button
        size="lg"
        className="w-full max-w-2xl mx-auto h-20 text-2xl font-bold animate-pulse bg-green-600 hover:bg-green-700 text-white"
        onClick={() => {
          /* Ação de clique */
        }}
      >
        <Zap className="mr-3 h-8 w-8" />
        QUERO ACESSO IMEDIATO AO PROTOCOLO COMPLETO!
      </Button>
      <p className="text-sm text-gray-500">
        Compra 100% segura. Acesso liberado em até 5 minutos no seu e-mail.
      </p>

      <Accordion type="single" collapsible className="w-full mt-16 text-left">
        {faqItems.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-xl text-left font-semibold hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};