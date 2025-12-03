"use client";

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

export const Faq = () => {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-center mb-8 font-sans">
        Perguntas Frequentes
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-xl text-left font-semibold">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-lg leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};