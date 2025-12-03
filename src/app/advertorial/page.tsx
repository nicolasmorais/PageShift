"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  Leaf,
  ShieldCheck,
  Star,
  AlertTriangle,
  Info,
  XCircle,
} from "lucide-react";

const testimonials = [
  {
    name: "João Oliveira",
    text: "Material super completo! Recebi tudo no e-mail em 3 minutos. Já comecei a fazer o composto e em 2 semanas minha glicemia caiu de 240 para 130. Valeu cada centavo!",
    time: "há 2 horas",
    rating: 5,
  },
  {
    name: "Renata Tanaka",
    text: "Eu estava cética, mas por R$ 29,90 resolvi tentar. Melhor decisão! O vídeo ensina tudo direitinho e o e-book é muito fácil de entender. Já estou na terceira semana e me sentindo MUITO melhor!",
    time: "há 5 horas",
    rating: 5,
  },
  {
    name: "Taiane F.",
    text: "Gente, que protocolo incrível! Super fácil de seguir e os ingredientes são baratos de achar. Minha glicemia já baixou 80 pontos em 3 semanas. Recomendo demais!",
    time: "há 1 dia",
    rating: 5,
  },
  {
    name: "Sérgio Vaz",
    text: "Achei que ia ser complicado, mas é muito simples! O vídeo mostra tudo passo a passo. Já não sinto mais aquele formigamento nas pernas. Vale muito a pena!",
    time: "há 1 dia",
    rating: 5,
  },
];

export default function AdvertorialPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-[family-name:var(--font-geist-sans)]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <header className="text-center py-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-red-700 dark:text-red-500 leading-tight">
            Dr. Roberto Yano afirma: 7 em cada 10 diabéticos tipo 2 estão sendo
            tratados de forma errada no Brasil.
          </h1>
          <h2 className="mt-4 text-2xl md:text-4xl font-bold text-gray-900 dark:text-white">
            "A Metformina está sufocando o seu pâncreas".
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
            Você já parou para pensar o por que da sua glicose continuar alta,
            mesmo tomando os remédios receitados corretamente, fazendo o que os
            médicos pedem e até mesmo comendo um pouco menos açúcar?
          </p>
          <p className="mt-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
            Pois saiba que isso não é sua culpa.
          </p>
        </header>

        <Alert variant="destructive" className="mb-12">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Atenção!</AlertTitle>
          <AlertDescription>
            Este pode ser o texto mais importante que você já leu sobre a
            Diabetes Tipo 2. O que você fará nos próximos 5 minutos pode decidir
            se você irá vencer essa doença silenciosa ou continuar rumo a
            amputações, cegueira e dependência eterna de remédios. Leia com
            atenção.
          </AlertDescription>
        </Alert>

        {/* The Problem Section */}
        <section className="mb-12">
          <p className="text-lg mb-4">
            Um novo estudo conduzido por pesquisadores Japoneses na Universidade
            de Tóquio (Bunkyō), foi recebido pela Universidade de São Paulo
            (USP) aqui no brasil, e revelou que 7 em cada 10 pacientes
            diabéticos tipo 2 estão seguindo um protocolo de tratamento
            ultrapassado, ineficaz — e em muitos casos, perigoso.
          </p>
          <h3 className="text-3xl font-bold text-center my-6">
            O nome disso? Erro médico sistemático.
          </h3>
          <p className="text-lg mb-4">
            Os remédios receitados como Metformina, Glifage, Glicazida por vezes
            trazem aquela falsa sensação de que você está fazendo a coisa certa,
            parecem controlar momentaneamente o problema, mas por dentro você
            sabe: seu corpo continua entrando em colapso.
          </p>
        </section>

        {/* Authority Section */}
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
                anos de experiência em medicina alternativa integrativa,
                reconhecido tanto no Brasil quanto internacionalmente, onde já
                participou de estudos avançados sobre diabetes tipo 2 e
                regeneração pancreática.
              </p>
            </div>
          </div>
          <blockquote className="mt-6 border-l-4 border-red-500 pl-4 italic text-lg text-gray-700 dark:text-gray-300">
            <p className="font-semibold">Dr. Yano:</p>
            "Depois de acompanhar centenas de pacientes, tantas amputações que
            poderiam ter sido evitadas, tantos casos de cegueira parcial ou
            completa, tantos casos de diagnósticos errados e casos
            negligenciados, vi com meus próprios olhos: os medicamentos só
            empurram a glicose para dentro das células à força!!!"
          </blockquote>
        </section>

        {/* The Deeper Problem */}
        <section className="mb-12">
          <p className="text-lg mb-4">
            Não estou aqui para tentar te convencer de que você está sendo
            enganado, que o seu "médico de confiança" na verdade pode não ter
            sido 100% sincero com você, ou que a sua doença é completamente
            reversível.
          </p>
          <p className="text-xl font-bold text-center my-6">
            O que eu quero aqui na verdade, é fazer você se perguntar: será que
            eu estou realmente tratando a tipo 2 da forma correta?
          </p>
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <p className="text-lg mb-4">
                O problema é que a maioria das pessoas no fundo sabem que não,
                mas são forçadas pelo sistema a acreditarem que sim.
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Porque foi o que o médico indicou.</li>
                <li>Porque "é assim mesmo".</li>
                <li>Porque "diabetes não tem cura".</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Domino Effect */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-6">
            O erro de foco no seu tratamento que ninguém te contou...
          </h3>
          <p className="text-lg mb-4">
            A glicose alta não é a causa da doença, mas sim a consequência de
            algo muito mais profundo que está acontecendo no seu corpo. Mais
            especificamente, no seu pâncreas.
          </p>
          <p className="text-lg mb-4">
            O que os medicamentos tradicionais fazem? Forçam o corpo a empurrar
            a glicose para dentro das células com "brutalidade bioquímica". Mas
            isso não trata a inflamação, nem desbloqueia as células beta. Pelo
            contrário: vai sobrecarregando o sistema do seu corpo a cada dose.
          </p>
          <h4 className="text-2xl font-bold text-center my-6 text-red-600 dark:text-red-400">
            E isso leva ao efeito dominó:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
              <XCircle className="text-red-500" /> Glicose descontrolada
            </div>
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
              <XCircle className="text-red-500" /> Ganho de peso e gordura
              visceral
            </div>
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
              <XCircle className="text-red-500" /> Substituição por insulina
            </div>
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
              <XCircle className="text-red-500" /> Complicações circulatórias
            </div>
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow">
              <XCircle className="text-red-500" /> Neuropatia, amputações,
              cegueira
            </div>
            <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow col-span-1 md:col-span-2">
              <XCircle className="text-red-500" /> E a pior frase de todas: "você
              vai ter que conviver com isso pra sempre"
            </div>
          </div>
        </section>

        {/* Case Study: Manoel */}
        <section className="mb-12">
          <Card className="overflow-hidden">
            <CardHeader className="bg-blue-100 dark:bg-blue-900/50">
              <CardTitle className="text-2xl text-blue-800 dark:text-blue-200">
                Manoel — o diabético que fez "tudo certo"... mas quase parou em
                uma máquina de hemodiálise
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4">
                Seu Manoel, 64 anos, aposentado, morava no interior de Goiás.
                Diagnosticado com diabetes tipo 2 há mais de 22 anos. Estava com
                a glicose em 290 mg/dL, sentia tonturas, visão embaçada, urinava
                5x por noite e seus pés começaram a perder a sensibilidade.
              </p>
              <p className="mb-4">
                O diagnóstico era: nefropatia diabética. Mesmo seguindo tudo que
                o seu endocrinologista mandava, a glicose nunca ficava
                totalmente sob controle.
              </p>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>A sorte é que ele foi salvo no limite!</AlertTitle>
                <AlertDescription>
                  Na terceira semana de internação, ele procurou uma segunda
                  opinião. O que eu o ofereci foi um protocolo totalmente
                  diferente, sem Metformina, sem insulina, sem efeitos
                  colaterais.
                </AlertDescription>
              </Alert>
              <blockquote className="mt-6 border-l-4 border-blue-500 pl-4 italic text-lg">
                "O seu corpo ainda é capaz de controlar a glicose naturalmente.
                O que falta não é remédio. O que falta é desbloquear o que está
                travado dentro de você."
              </blockquote>
            </CardContent>
          </Card>
        </section>

        {/* The Solution */}
        <section className="mb-12 text-center">
          <h3 className="text-3xl font-bold mb-2">
            O pâncreas de um diabético tipo 2 não está morto.
          </h3>
          <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6">
            Ele está adormecido.
          </h3>
          <p className="text-lg mb-8">
            E sim: existe uma forma de estimular essas células a voltarem a
            funcionar — sem química, sem agressão ao organismo e é isso que eu
            vou mostrar a vocês agora…
          </p>

          <h4 className="text-2xl font-bold mb-6">
            Um protocolo natural, validado pela medicina oriental e adaptado à
            realidade brasileira
          </h4>
          <Card>
            <CardHeader>
              <CardTitle>
                A Fórmula Fitoterápica Oriental — A base do protocolo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-lg">
                O protocolo tem como base uma combinação ancestral de 6 ervas
                medicinais orientais, que age em três pontos-chave do organismo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                {[
                  "Chlorella Vulgaris",
                  "Feno Grego",
                  "Folha de Amora",
                  "Canela do Ceilão",
                  "Gymnema Sylvestre",
                  "Pata de Vaca",
                ].map((herb) => (
                  <div
                    key={herb}
                    className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-md"
                  >
                    <Leaf className="text-green-500 h-6 w-6 flex-shrink-0" />
                    <span className="font-semibold">{herb}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* The Offer */}
        <section
          id="offer"
          className="mb-12 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-2xl border-2 border-green-500"
        >
          <h3 className="text-3xl font-extrabold text-center mb-2">
            Agora o Protocolo Completo está disponível em formato digital
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
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <span className="font-bold">E-BOOK COMPLETO:</span> Protocolo
                  Glicelidina Regenerativo (PDF)
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <span className="font-bold">VÍDEO-AULA:</span> Como Preparar o
                  Composto Regenerativo
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <span className="font-bold">TABELA DE CONTROLE GLICÊMICO</span>{" "}
                  (PDF Editável)
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <span className="font-bold">GUIA RÁPIDO:</span> Alimentos que
                  Potencializam o Protocolo
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-xl text-center mb-4">
                  🎁 BÔNUS EXCLUSIVOS (por tempo limitado):
                </h4>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <span className="font-bold">BÔNUS #1:</span> Áudio de
                    Meditação Guiada Anti-Estresse (MP3)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <span className="font-bold">BÔNUS #2:</span> Checklist de
                    Sintomas da Diabetes
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <span className="font-bold">BÔNUS #3:</span> Guia de
                    Exercícios para Diabéticos (PDF)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center my-8">
            <p className="text-lg">INVESTIMENTO ÚNICO DE APENAS:</p>
            <p className="text-2xl line-through text-gray-500">De R$ 97,00</p>
            <p className="text-6xl font-extrabold text-green-600 dark:text-green-400 my-2">
              R$ 29,90
            </p>
            <p className="font-semibold">✅ Pagamento único via PIX</p>
            <p className="font-semibold">✅ Acesso imediato após confirmação</p>
          </div>

          <Button
            size="lg"
            className="w-full h-16 text-2xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg animate-pulse"
          >
            QUERO ACESSO IMEDIATO AGORA!
          </Button>
        </section>

        {/* Guarantee Section */}
        <section className="mb-12">
          <Alert className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/30">
            <ShieldCheck className="h-6 w-6 text-blue-500" />
            <AlertTitle className="text-xl font-bold text-blue-800 dark:text-blue-200">
              GARANTIA INCONDICIONAL DE 7 DIAS
            </AlertTitle>
            <AlertDescription className="text-lg">
              Você não tem absolutamente NENHUM RISCO. Se em 7 dias você achar
              que o conteúdo não vale nem os R$ 29,90, basta enviar um único
              e-mail e devolvemos 100% do seu dinheiro. Sem perguntas. Sem
              burocracia. Sem enrolação.
            </AlertDescription>
          </Alert>
        </section>

        {/* Urgency Section */}
        <section className="mb-12">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="text-xl font-bold">
              ATENÇÃO: quem espera demais, pode não ter uma segunda chance...
            </AlertTitle>
            <AlertDescription className="text-lg mt-2">
              A demora no tratamento adequado do diabetes pode levar a
              complicações graves e irreversíveis. Você está vivendo com uma
              bomba-relógio prestes a explodir. As próximas fases: Amputações,
              Cegueira progressiva, Insuficiência renal, Derrame, Infarto
              silencioso. Isso não é uma ameaça. É a linha do tempo real de quem
              "deixa pra depois".
            </AlertDescription>
          </Alert>
        </section>

        {/* Testimonials Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">
            Veja o que quem já adquiriu está dizendo:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="italic mb-4">"{testimonial.text}"</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <p className="font-bold text-gray-800 dark:text-gray-200">
                      {testimonial.name}
                    </p>
                    <span>{testimonial.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">
            Perguntas Frequentes
          </h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">
                Como recebo o material após o pagamento?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Assim que o PIX for confirmado (geralmente em 1 a 5 minutos),
                você recebe automaticamente no seu e-mail um link de acesso para
                baixar todo o conteúdo. Você pode salvar no seu celular, tablet
                ou computador.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">
                Posso usar junto com meus medicamentos?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Sim! O protocolo é 100% natural e não interfere com
                medicamentos tradicionais. Mas NUNCA abandone seu tratamento
                médico sem orientação do seu endocrinologista.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">
                Quanto tempo até ver resultados?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                A maioria dos usuários relata melhoras nos primeiros 7 a 14
                dias. Mas o protocolo completo é de 90 dias para regeneração
                celular profunda.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">
                Funciona para pré-diabetes também?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                SIM! Inclusive é IDEAL para quem está no estágio de
                pré-diabetes, pois pode reverter o quadro antes de precisar de
                medicamentos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="text-center py-12">
          <h3 className="text-3xl font-bold mb-4">
            Chegou a hora de escolher seu futuro...
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Você pode fechar essa página agora, voltar à rotina… ou pode tomar a
            decisão que milhares de pessoas tomaram antes de você. A decisão que
            transformou histórias, evitou amputações, salvou famílias.
          </p>
          <p className="text-4xl font-extrabold text-green-600 dark:text-green-400 mb-8">
            São apenas R$ 29,90 que podem salvar sua vida.
          </p>
          <Button
            size="lg"
            className="w-full max-w-md mx-auto h-16 text-2xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg"
          >
            ✅ SIM, QUERO VENCER A DIABETES!
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            Pagamento único • Acesso imediato • Garantia total
          </p>
        </section>

        <footer className="text-center text-xs text-gray-500 dark:text-gray-400 pt-8 border-t">
          <p>
            Este é um produto digital (e-book + vídeos + bônus em PDF/MP4).
            Nenhum produto físico será enviado. O acesso é 100% online.
            Resultados podem variar de pessoa para pessoa. Este material não
            substitui acompanhamento médico. Sempre consulte seu
            endocrinologista antes de alterar seu tratamento.
          </p>
        </footer>
      </div>
    </div>
  );
}