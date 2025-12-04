"use client";

import { BookOpen, Video, FileText, Calendar, ClipboardList } from "lucide-react";

const productItems = [
  {
    icon: BookOpen,
    title: "Manual do Chá Japonês",
  },
  {
    icon: Video,
    title: "Vídeo de Preparo Passo a Passo",
  },
  {
    icon: FileText,
    title: "Guia Alimentar Complementar",
  },
  {
    icon: ClipboardList,
    title: "Diário de Acompanhamento (PDF)",
  },
  {
    icon: Calendar,
    title: "Plano de 90 dias para organização da rotina",
  },
];

export const OfferV2 = () => {
  return (
    <section className="my-12 space-y-8 text-xl leading-relaxed">
      <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-3xl font-extrabold font-sans">
          O que está incluído no guia
        </h2>
      </div>

      <div className="p-6 border rounded-lg">
        <div className="space-y-6">
          {productItems.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <item.icon className="h-8 w-8 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-bold font-sans text-2xl">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};