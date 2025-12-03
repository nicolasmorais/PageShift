"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    value: "item-1",
    trigger: "Onde encontro os ingredientes do chá?",
    content:
      "Todos os ingredientes estão disponíveis em lojas de produtos naturais, farmácias de manipulação ou pela internet. No e-book, tem uma lista completa com links e sugestões de onde comprar.",
  },
  {
    value: "item-2",
    trigger: "Preciso parar meus medicamentos?",
    content:
      "NUNCA pare seus medicamentos por conta própria! Use o protocolo junto com seu tratamento atual. Conforme você melhorar, seu médico é quem decidirá sobre reduzir as doses.",
  },
  {
    value: "item-3",
    trigger: "Funciona para diabetes tipo 1 também?",
    content:
      "SIM! O protocolo foi desenvolvido para diabetes tipo 1 e tipo 2. No manual, tem instruções específicas para cada tipo.",
  },
  {
    value: "item-4",
    trigger: "O material fica salvo para sempre?",
    content:
      "SIM! Você baixa todos os arquivos (PDFs, vídeos, áudios) e eles ficam salvos no seu dispositivo para sempre. É SEU para toda a vida!",
  },
];

export const Faq = () => {
  return (
    <section className="mb-12">
      <h3 className="text-3xl font-bold text-center mb-8">
        Perguntas Frequentes
      </h3>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="text-lg">
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent className="text-base">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};