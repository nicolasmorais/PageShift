"use client";

import { Authority } from "@/components/advertorial/Authority";
import { CaseStudy } from "@/components/advertorial/CaseStudy";
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
import { TopBar } from "@/components/advertorial/TopBar";

const testimonialsData = [
  {
    name: "João Oliveira",
    text: "Eu uso a 2 meses e meio, eu comprei o kit com 6 chegou menos de uma semana, realmente estou conseguindo manter o nível de glicemia abaixo de 100 como prometido sem precisar de jejum e receitas malucas kkk, só tenho a agradecer e quando acabar aqui eu já vou pegar mais kkk",
    time: "45 min",
  },
  {
    name: "Renata Tanaka",
    text: "no meu nao foi assim, eu tive que esperar mais de 10 dias para começar a ter resultado significativo, sai de 370mg para 100 hoje em dia. Graças ao Glicelidina",
    time: "12 min",
  },
  {
    name: "Taiane F.",
    text: "Esse foi o meu resultado com um mês de uso, só tenho a agradecer por tudo e pela reportagem, agora já estou voltando a comer o que gosto sem me preocupar com glicemia acima de 200 mesmo estando de jejum pela manhã",
    time: "10 min",
  },
  {
    name: "Sérgio Vaz",
    text: "Estou impressionado com os resultados. Antes, fiquei com medo de não chegar e não funcionar, mas te contar chegou em menos de uma semana e valeu a pena cada centavo, eu já não estou sentindo mais formigamento e nem aquela visão turva",
    time: "58 min",
  },
  {
    name: "Eduardo Reis",
    text: "eu comprei tem um mês e estou gostando minha glicemia fica entre 100 pra quem tinha mais de 250 melhorou foi muito",
    time: "58 min",
  },
  {
    name: "Fábio Faria",
    text: "É verdade! É um produto muito eficaz para diabetes! Meu nível de açúcar no sangue agora se estabiliza em 80 mg/dl.",
    time: "1h",
  },
  {
    name: "Yani Prado",
    text: "Eu não tive problemas nenhum desde o processo de compra até o momento de receber o produto. Eu comprei pelo cartão de credito então no mesmo segundo praticamente já tinha chegado no email o código de rastreio. Chegou na minha casa tem 3 dias e já comecei a tomar!",
    time: "46 min",
  },
];

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <TopBar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        <ProblemAlert />
        <Authority />
        <DominoEffect />
        <CaseStudy />
        <Solution />
        <Offer />
        <Guarantee />
        <Testimonials testimonials={testimonialsData} />
        <Faq />
        <FinalCta />
        <Footer />
      </div>
    </div>
  );
}