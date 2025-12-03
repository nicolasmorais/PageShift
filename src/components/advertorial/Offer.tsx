"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  PlayCircle,
  FileText,
  CalendarDays,
  Gift,
} from "lucide-react";

const offerItems = [
  {
    icon: BookOpen,
    title: "MANUAL COMPLETO DO CHÁ JAPONÊS",
    desc: "E-book PDF com a fórmula exata, métodos de preparo e onde comprar.",
  },
  {
    icon: PlayCircle,
    title: "VÍDEO-AULA EXCLUSIVA",
    desc: "Dr. Yano mostra na prática o preparo tradicional japonês.",
  },
  {
    icon: FileText,
    title: "DIÁRIO DE CONTROLE GLICÊMICO",
    desc: "PDF Editável para acompanhar sua evolução diária.",
  },
  {
    icon: CalendarDays,
    title: "PROTOCOLO DE 90 DIAS",
    desc: "Cronograma completo com 4 fases de tratamento.",
  },
];

const bonusItems = [
  "Áudio de Meditação Guiada Anti-Estresse (MP3)",
  "Checklist Visual de Sintomas da Diabetes (PDF)",
  "Guia Ilustrado de Exercícios para Diabéticos (PDF)",
  "Tabela de Índice Glicêmico de 200 Alimentos (PDF)",
  'Vídeo "Como Conversar com seu Médico sobre o Protocolo"',
];

export const Offer = () => {
  return (
    <section
      id="offer"
      className="mb-12 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-2xl border-2 border-green-500"
    >
      <h3 className="text-3xl font-extrabold text-center mb-2">
        O Protocolo do Chá Japonês agora está disponível em formato digital
      </h3>
      <p className="text-xl text-center mb-6">
        Acesso imediato por apenas R$ 29,90
      </p>

      <Card className="bg-white dark:bg-gray-800/50">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            O QUE VOCÊ RECEBE IMEDIATAMENTE:
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg">
          {offerItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <item.icon className="text-green-500 mt-1 h-6 w-6 flex-shrink-0" />
              <div>
                <span className="font-bold">{item.title}:</span> {item.desc}
              </div>
            </div>
          ))}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-bold text-xl text-center mb-4 flex items-center justify-center gap-2">
              <Gift className="h-6 w-6" /> BÔNUS EXCLUSIVOS:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {bonusItems.map((bonus, index) => (
                <li key={index}>{bonus}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="text-center my-8">
        <p className="text-lg">INVESTIMENTO ÚNICO DE APENAS:</p>
        <p className="text-2xl line-through text-gray-500">De R$ 127,00</p>
        <p className="text-6xl font-extrabold text-green-600 dark:text-green-400 my-2">
          R$ 29,90
        </p>
        <p className="font-semibold">✅ Pagamento único via PIX</p>
        <p className="font-semibold">✅ Acesso vitalício ao material</p>
      </div>

      <Button
        size="lg"
        className="w-full h-16 text-2xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg animate-pulse"
      >
        QUERO ACESSO IMEDIATO AGORA!
      </Button>
    </section>
  );
};