"use client";

import { Check, BookOpen, Video, FileText, Calendar, Gift } from "lucide-react";

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

const bonusItems = [
  "Áudio de Meditação Guiada Anti-Estresse (MP3 - 15 min)",
  "Checklist Visual de Sintomas da Diabetes (PDF)",
  "Guia Ilustrado de Exercícios para Diabéticos (PDF - 22 páginas)",
  "Tabela de Índice Glicêmico de 200 Alimentos (PDF)",
  'Vídeo "Como Conversar com seu Médico sobre o Protocolo" (12 min)',
];

export const Offer = () => {
  return (
    <section
      id="offer"
      className="my-12 space-y-8 text-xl leading-relaxed"
    >
      <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
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

      <div className="p-6 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
        <h3 className="text-2xl font-bold mb-4 font-sans flex items-center gap-2">
          <Gift className="h-7 w-7" />
          BÔNUS EXCLUSIVOS (Liberados Imediatamente):
        </h3>
        <ul className="space-y-2">
          {bonusItems.map((bonus, i) => (
            <li key={i} className="flex items-center gap-3">
              <Check className="h-6 w-6 text-green-600" />
              <span>{bonus}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};