"use client";

import { Badge } from "@/components/ui/badge";
import { Leaf, Dna, Globe, Check } from "lucide-react";

export const Solution = () => {
  return (
    <section className="my-12 space-y-8 text-xl leading-relaxed">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-sans">
          O Pâncreas de um Diabético Tipo 2 Não Está Morto. Ele Está Adormecido.
        </h2>
        <p className="text-2xl mt-2 text-gray-600 dark:text-gray-300">
          E sim: existe uma forma de estimular essas células a voltarem a
          funcionar.
        </p>
      </div>

      <div className="p-6 border rounded-lg overflow-hidden">
        <img
          src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%203%20de%20dez.%20de%202025%2C%2020_24_07-CegP8MFAadFJUCgpK40pYN2w5o7Ilv.png"
          alt="Bebida medicinal japonesa em uma xícara com ingredientes ao redor"
          className="w-full h-auto -m-6 mb-6"
        />
        <h3 className="text-2xl font-bold mb-4 font-sans flex items-center gap-2">
          <Leaf className="h-7 w-7 text-green-600" />
          Um Protocolo Natural, Validado pela Medicina Oriental
        </h3>
        <p>
          Dr. Yano descobriu que existe uma{" "}
          <span className="font-bold">
            bebida medicinal japonesa ancestral
          </span>
          , que age em três pontos-chave do organismo:
        </p>
        <ul className="list-disc list-inside space-y-2 my-4">
          <li>
            Desinflama o tecido pancreático, permitindo que as células beta
            voltem a se regenerar.
          </li>
          <li>
            Reativa a produção natural de insulina, com efeito gradual e
            duradouro.
          </li>
          <li>
            Estabiliza os níveis de glicose no sangue, sem causar hipoglicemia
            ou sobrecarga dos rins e fígado.
          </li>
        </ul>
        <p className="font-bold">
          Em 28 dias, os exames de Seu Manoel se normalizaram e sua glicose
          estabilizou em 98 mg/dL.
        </p>
      </div>

      <div className="p-6 border rounded-lg overflow-hidden">
        <img
          src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%203%20de%20dez.%20de%202025%2C%2021_10_34-NTd4IPZ5iz7r2y4Z8tthkLa05ZVN6Y.png"
          alt="Gráfico mostrando a estabilização da glicose ao longo do tempo"
          className="w-full h-auto -m-6 mb-6"
        />
        <h3 className="text-2xl font-bold mb-4 font-sans flex items-center gap-2">
          <Dna className="h-7 w-7 text-blue-600" />A Validação Científica
        </h3>
        <p>
          Pesquisas publicadas no{" "}
          <span className="italic">Journal of Medicinal Food </span> e no{" "}
          <span className="italic">
            International Journal of Endocrinology
          </span>{" "}
          apontam que o uso regular da combinação de ativos do chá:
        </p>
        <ul className="list-disc list-inside space-y-2 my-4">
          <li>Reduz os marcadores inflamatórios no tecido pancreático.</li>
          <li>Aumenta a sensibilidade à insulina.</li>
          <li>Estimula a regeneração gradual das células beta danificadas.</li>
        </ul>
        <Badge
          variant="secondary"
          className="text-lg p-4 font-bold w-full text-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
        >
          Em estudos de campo, mais de 82% dos pacientes apresentaram
          estabilização glicêmica abaixo de 100 mg/dL nas primeiras 3 semanas.
        </Badge>
      </div>

      <div className="p-6 border rounded-lg">
        <h3 className="text-2xl font-bold mb-4 font-sans flex items-center gap-2">
          <Globe className="h-7 w-7 text-purple-600" />
          Reconhecimento Internacional e Resultados Reais
        </h3>
        <p>
          Nos últimos dois anos, mais de 26 mil pacientes no Brasil testaram o
          protocolo com acompanhamento remoto. Relatórios clínicos apontam que:
        </p>
        <ul className="space-y-3 mt-4">
          <li className="flex items-start gap-3">
            <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <span className="font-bold">7 em cada 10 usuários</span> reduziram
              ou eliminaram o uso de insulina em até 90 dias.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <span className="font-bold">91% relataram melhora</span> em
              sintomas como fadiga, tonturas e formigamento.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
            <span>
              <span className="font-bold">84% tiveram melhora</span> expressiva
              na cicatração e controle da pressão arterial.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};