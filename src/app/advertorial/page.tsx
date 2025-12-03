"use client";

import { Authority } from "@/components/advertorial/Authority";
import { CaseStudy } from "@/components/advertorial/CaseStudy";
import { Comparison } from "@/components/advertorial/Comparison";
import { DominoEffect } from "@/components/advertorial/DominoEffect";
import { Faq } from "@/components/advertorial/Faq";
import { FinalCta } from "@/components/advertorial/FinalCta";
import { Footer } from "@/components/advertorial/Footer";
import { Guarantee } from "@/components/advertorial/Guarantee";
import { Header } from "@/components/advertorial/Header";
import { Offer } from "@/components/advertorial/Offer";
import { ProblemAlert } from "@/components/advertorial/ProblemAlert";
import { Solution } from "@/components/advertorial/Solution";
import { Testimonials } from "@/components/advertorial/Testimonials";

const testimonialsData = [
  {
    name: "João Oliveira, 62 anos",
    text: "Recebi tudo no e-mail em 3 minutos! O vídeo é excelente, mostra cada detalhe. Comprei as folhas numa loja de produtos naturais aqui perto de casa, gastei R$ 45 e já fiz para o mês inteiro. Em 2 semanas minha glicemia caiu de 240 para 130. Estou impressionado e muito feliz!",
    time: "há 2 horas",
  },
  {
    name: "Renata Tanaka, 54 anos",
    text: "Eu era cética com essas coisas naturais, mas por R$ 29,90 resolvi tentar. Melhor decisão da minha vida! O chá é gostoso, fácil de fazer e realmente funciona. Já estou na terceira semana e minha glicose baixou 90 pontos. Meu médico ficou boquiaberto com os exames!",
    time: "há 5 horas",
  },
  {
    name: "Taiane F., 47 anos",
    text: "Gente, que protocolo maravilhoso! Super fácil de seguir, o material é muito bem explicado. Os ingredientes são baratos e fáceis de achar. Minha glicemia que era 320 agora tá em 105! Nem acredito que consegui isso de forma natural!",
    time: "há 1 dia",
  },
  {
    name: "Sérgio Vaz, 58 anos",
    text: "Achei que ia ser complicado, mas é muito simples! O vídeo mostra tudo passo a passo, qualquer pessoa consegue fazer. Já não sinto mais aquele formigamento terrível nas pernas. O chá virou parte da minha rotina. Vale MUITO a pena!",
    time: "há 1 dia",
  },
];

export default function AdvertorialPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-[family-name:var(--font-geist-sans)]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        <ProblemAlert />
        <Authority />
        <DominoEffect />
        <CaseStudy />
        <Solution />
        <Offer />
        <Guarantee />
        <Comparison />
        <Testimonials testimonials={testimonialsData} />
        <Faq />
        <FinalCta />
        <Footer />
      </div>
    </div>
  );
}