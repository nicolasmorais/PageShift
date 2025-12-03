"use client";

import { BookOpen, Video, FileText, Calendar } from "lucide-react";

const productItems = [
  {
    icon: BookOpen,
    title: "MANUAL COMPLETO DO CHÁ JAPONÊS (E-book PDF - 58 páginas)",
    description:
      "A fórmula secreta completa revelada, métodos de preparo, onde comprar os ingredientes e muito mais.",
  },
  {
    icon: Video,
    title: "VÍDEO-AULA EXCLUSIVA: Preparo Tradicional Japonês (22 minutos)",
    description:
      "Dr. Yano mostra na prática o passo a passo do ritual de preparo do chá medicinal.",
  },
  {
    icon: FileText,
    title: "DIÁRIO DE CONTROLE GLICÊMICO (PDF Editável)",
    description:
      "Acompanhe sua evolução diária e veja sua glicose baixando semana após semana.",
  },
  {
    icon: BookOpen,
    title: "GUIA ALIMENTAR SINÉRGICO (E-book PDF - 34 páginas)",
    description:
      "Lista de alimentos que potencializam o efeito do chá, cardápio sugestivo e receitas.",
  },
  {
    icon: Calendar,
    title: "PROTOCOLO DE 90 DIAS (Cronograma Completo)",
    description:
      "Um plano estruturado, dia a dia, mostrando exatamente o que fazer em cada fase do tratamento.",
  },
];

export const Offer = () => {
  return (
    <section
      id="offer"
      className="my-12 space-y-8 text-xl leading-relaxed"
    >
      <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <img
          src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%203%20de%20dez.%20de%202025%2C%2019_16_42-chAkYbYIm1134REeZ26ZWHwreF1Pdi.png"
          alt="Visualização do conteúdo do Protocolo do Chá Japonês"
          className="w-full max-w-lg mx-auto rounded-lg shadow-xl mb-8"
        />
        <h2 className="text-3xl font-extrabold font-sans">
          O Protocolo do Chá Japonês agora está disponível em formato digital
        </h2>
        <p className="text-2xl mt-2">
          Acesso imediato por apenas R$ 29,90
        </p>
        <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-4 font-sans">
          Protocolo do Chá Japonês Regenerativo
        </p>
      </div>

      <div className="p-6 border rounded-lg">
        <h3 className="text-2xl font-bold mb-6 font-sans text-center">
          O QUE VOCÊ RECEBE IMEDIATAMENTE:
        </h3>
        <div className="space-y-6">
          {productItems.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <item.icon className="h-8 w-8 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold font-sans">{item.title}</p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
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