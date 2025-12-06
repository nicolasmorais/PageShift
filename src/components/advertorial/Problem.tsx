"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown } from "lucide-react";

export const Problem = () => {
  return (
    <section className="space-y-8 text-xl leading-relaxed">
      <p>
        Você já parou para pensar o por que da sua glicose continuar alta, mesmo
        tomando os remédios receitados corretamente, fazendo o que os médicos
        pedem e até mesmo comendo um pouco menos açúcar?
      </p>
      <img
        src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/metformina-6DhI93KiQK2MaPncdPNDTznhGiePYK.jpg"
        alt="Médico apontando para uma caixa de Metformina com um X vermelho sobre ela"
        className="w-full h-auto rounded-lg my-6 shadow-md"
      />
      <p className="font-bold">Pois saiba que isso não é sua culpa.</p>
      <Alert className="bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500 border-l-4 p-6">
        <AlertTriangle className="h-7 w-7 text-yellow-600" />
        <AlertTitle className="font-bold text-yellow-800 dark:text-yellow-200 text-2xl mb-2">
          Atenção
        </AlertTitle>
        <AlertDescription className="text-yellow-700 dark:text-yellow-300 text-xl">
          Este pode ser o texto mais importante que você já leu sobre a Diabetes
          Tipo 2. O que você fará nos próximos 5 minutos pode decidir se você
          irá vencer essa doença silenciosa ou continuar rumo a amputações,
          cegueira e dependência eterna de remédios. Leia com atenção.
        </AlertDescription>
      </Alert>
      <p>
        <strong>
          Um novo estudo conduzido por pesquisadores Japoneses
        </strong>{" "}
        na Universidade de Tóquio (Bunkyō), foi recebido pela Universidade de
        São Paulo (USP) aqui no brasil, e{" "}
        <strong>
          revelou que 7 em cada 10 pacientes diabéticos tipo 2 estão seguindo um
          protocolo de tratamento ultrapassado
        </strong>
        , ineficaz — e em muitos casos, perigoso.
      </p>
      <img
        src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/1_20250716143121-jkwImCoFGKN9UfW8l7MpZ8MkwC7a2S.jpg"
        alt="Gráfico mostrando a ineficácia de tratamentos convencionais para diabetes tipo 2"
        className="w-full h-auto rounded-lg my-6 shadow-md"
      />
      <h2 className="text-3xl font-bold text-center py-4 font-sans">
        O nome disso? Erro médico sistemático.
      </h2>
      <p>
        Os remédios receitados como Metformina, Glifage, Glicazida por vezes
        trazem aquela falsa sensação de que você está fazendo a coisa certa,
        parecem controlar momentaneamente o problema, mas por dentro você sabe:
        seu corpo continua entrando em colapso.
      </p>
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <img
          src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/enhanced_441b7b5d-8850-444d-af70-488f594d5c22-aBTZK4gzJYBzRRy8spjG8H089khVpA.png"
          alt="Dr. Roberto Kazushigue Yano"
          className="w-full h-auto rounded-lg mb-4 shadow-md"
        />
        <p>
          Quem afirma isso é o{" "}
          <span className="font-bold">Dr. Roberto Kazushigue Yano</span>, figura
          importante da medicina brasileira, ativo em redes sociais contando com
          mais de 7 milhões de seguidores, com cerca de 26 anos de experiência
          em medicina alternativa integrativa, reconhecido tanto no Brasil
          quanto internacionalmente, onde já participou de estudos avançados
          sobre diabetes tipo 2 e regeneração pancreática.
        </p>
        <blockquote className="mt-4 border-l-4 border-blue-500 pl-4 italic">
          <p>
            "Depois de acompanhar centenas de pacientes, tantas amputações que
            poderiam ter sido evitadas, tantos casos de cegueira parcial ou
            completa... vi com meus próprios olhos: os medicamentos só empurram
            a glicose para dentro das células à força!!!"
          </p>
          <cite className="mt-2 block not-italic font-semibold">— Dr. Yano</cite>
        </blockquote>
      </div>
      <p>
        O problema é que a maioria das pessoas no fundo sabem que não, mas são
        forçadas pelo sistema a acreditarem que sim. Porque foi o que o médico
        indicou. Porque “é assim mesmo”. Porque “diabetes não tem cura”.
      </p>
      <p className="font-bold">
        Mas e se essa história estiver errada desde o começo?
      </p>
      <div className="p-6 border-t border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-center mb-6 font-sans">
          O erro de foco no seu tratamento que ninguém te contou...
        </h3>
        <p className="mb-4">
          A medicina tradicional foca obsessivamente em baixar os níveis de
          glicose no sangue. Mas a glicose alta não é a causa da doença, e sim a{" "}
          <span className="font-bold">
            consequência de algo muito mais profundo
          </span>{" "}
          que está acontecendo no seu pâncreas.
        </p>
        <p className="mb-6">
          Medicamentos tradicionais forçam o corpo a empurrar a glicose para
          dentro das células com “brutalidade bioquímica”, mas não tratam a
          inflamação nem desbloqueiam as células beta. Pelo contrário: vão
          sobrecarregando o sistema do seu corpo a cada dose. E isso leva ao
          efeito dominó:
        </p>
        <div className="space-y-3">
          {[
            "Glicose descontrolada",
            "Ganho de peso e gordura visceral",
            "Substituição por insulina",
            "Complicações circulatórias",
            "Neuropatia, amputações, cegueira",
            'E a pior frase de todas: "você vai ter que conviver com isso pra sempre"',
          ].map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              <TrendingDown className="h-6 w-6 text-red-500 flex-shrink-0" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};