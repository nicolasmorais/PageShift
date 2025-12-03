"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Authority = () => {
  return (
    <section className="mb-12 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src="https://i.pravatar.cc/150?u=dr-yano"
            alt="Dr. Roberto Yano"
          />
          <AvatarFallback>RY</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg">
            Quem afirma isso é o{" "}
            <span className="font-bold">Dr. Roberto Kazushigue Yano</span>,
            figura importante da medicina brasileira, ativo em redes sociais
            contando com mais de 7 milhões de seguidores, com cerca de 26
            anos de experiência em medicina alternativa integrativa.
          </p>
        </div>
      </div>
      <blockquote className="mt-6 border-l-4 border-red-500 pl-4 italic text-lg text-gray-700 dark:text-gray-300">
        <p className="font-semibold">Dr. Yano:</p>
        "Depois de acompanhar centenas de pacientes, tantas amputações que
        poderiam ter sido evitadas, tantos casos de cegueira parcial ou
        completa... vi com meus próprios olhos: os medicamentos só empurram
        a glicose para dentro das células à força!!!"
      </blockquote>
    </section>
  );
};