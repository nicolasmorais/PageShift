"use client";

import { BookOpen, Video, FileText, Calendar, ClipboardList } from "lucide-react";

const productItems = [
  { icon: BookOpen, title: "A prática japonesa original" },
  { icon: ClipboardList, title: "As ervas utilizadas" },
  { icon: Video, title: "Como preparar o blend" },
  { icon: Calendar, title: "Como incluir o ritual ao longo do dia" },
  { icon: FileText, title: "Dicas de alimentação que acompanham a prática" },
];

export const GuideContentsV3 = () => {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-6 font-sans text-center">
        Onde encontrar o guia mencionado?
      </h2>
      <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-xl text-center mb-6">O guia completo explica:</p>
        <div className="space-y-6 max-w-2xl mx-auto">
          {productItems.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <item.icon className="h-8 w-8 text-blue-500 flex-shrink-0" />
              <p className="font-semibold text-2xl">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};