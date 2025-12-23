"use client";

import React from 'react';
import { 
  Check, 
  AlertCircle, 
  Heart, 
  Zap, 
  ShieldCheck, 
  Users, 
  HelpCircle, 
  ArrowRight,
  Smile,
  Clock,
  Star,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { PageTracker } from "./PageTracker";

export function MenopausePage() {
  return (
    <>
      <PageTracker contentId="menopausa" />
      <div className="bg-white text-gray-900 font-open-sans selection:bg-pink-100">
        
        {/* Top Bar */}
        <div className="bg-pink-600 text-white text-center py-2 px-4 text-sm font-medium">
          ⚠️ Oferta por tempo limitado: Comece agora por apenas R$ 1,99
        </div>

        {/* SECTION 1 - HERO */}
        <header className="relative overflow-hidden bg-gradient-to-b from-pink-50 to-white pt-16 pb-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="font-roboto font-black text-4xl md:text-5xl text-gray-900 leading-tight mb-6">
              Chega de calorão, insônia e sofrimento. <br />
              <span className="text-pink-600">Nosso guia te ajuda a retomar o controle da sua vida — mesmo sem médico</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Alivie os principais sintomas em até 7 dias, com orientações simples que você pode aplicar em casa, sem médico.
            </p>

            {/* Imagem do Hero */}
            <div className="mb-10 max-w-2xl mx-auto">
              <img 
                src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%2022%20de%20dez.%20de%202025%2C%2023_11_16%20%281%29-YiIF5Dx6Ex8EfF18VGsiRtoYLJUhpE.png" 
                alt="Mulher sorrindo e aproveitando a vida" 
                className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white"
              />
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-pink-100 inline-block text-left max-w-lg w-full mb-10">
              <p className="font-bold text-lg mb-4 text-pink-700">Você sente:</p>
              <ul className="space-y-4">
                {[
                  "Calorões que surgem do nada e parecem não ter fim",
                  "Tristeza, irritação e cansaço que ninguém entende",
                  "A sensação de estar sozinha, abandonada e sem solução"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-pink-100 rounded-full p-1">
                      <Minus className="h-4 w-4 text-pink-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-2xl font-bold mb-6">
                Isso não é frescura. <br />
                <span className="text-pink-600">E não precisa continuar assim.</span>
              </p>
              <Button 
                size="lg" 
                className="bg-pink-600 hover:bg-pink-700 text-white text-xl py-8 px-10 rounded-2xl shadow-2xl shadow-pink-200 animate-pulse w-full max-w-md"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                👉 Comece agora por apenas R$1,99
              </Button>
            </div>
          </div>
        </header>

        {/* SECTION 2 - O PROBLEMA */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block p-3 bg-red-100 rounded-2xl mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="font-roboto text-3xl md:text-4xl font-black mb-4">Você já passou por isso?</h2>
            </div>
            
            {/* Imagem do Problema */}
            <div className="mb-10">
              <img 
                src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%2022%20de%20dez.%20de%202025%2C%2023_22_45%20%282%29-5Mq5Tv2MbDtdy5EOR55c9k8LNw1OiD.png" 
                alt="Ilustração de sintomas e incômodos da menopausa" 
                className="w-full h-auto rounded-3xl shadow-lg mb-8"
              />
            </div>

            <div className="space-y-6">
              {[
                "Foi a uma consulta rápida onde o médico mal olhou para você?",
                "Ouviu “isso é normal da idade” enquanto continua sofrendo todos os dias?",
                "Se perguntou se está ficando fraca, louca ou sem controle do próprio corpo?"
              ].map((text, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 flex gap-4 items-center">
                  <div className="h-3 w-3 rounded-full bg-red-400 shrink-0" />
                  <p className="text-lg text-gray-700">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-2xl font-bold text-gray-800 leading-relaxed">
                Nada disso é culpa sua. <br />
                <span className="bg-pink-100 px-2">Você não está sozinha.</span> Milhares de mulheres acima dos 40 estão vivendo exatamente essa realidade.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3 - TRANSFORMAÇÃO */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-pink-900 rounded-[3rem] p-8 md:p-16 text-white text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Smile size={200} />
              </div>
              
              <h2 className="font-roboto text-3xl md:text-5xl font-black mb-10 relative z-10">
                Imagine acordar e:
              </h2>

              {/* Imagem da Transformação (conforme o print) */}
              <div className="mb-10 relative z-10 max-w-xl mx-auto">
                <img 
                  src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%2022%20de%20dez.%20de%202025%2C%2023_28_04%20%281%29-K5eDlKovVcScONN51oldmatjmk2e2p.png" 
                  alt="Visão de futuro e bem-estar" 
                  className="w-full h-auto rounded-2xl shadow-xl"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left relative z-10 mb-10">
                {[
                  "Não sentir aquele calor sufocante logo cedo",
                  "Ter mais ânimo para levantar da cama e viver o dia",
                  "Parar de achar que está enlouquecendo ou “quebrada”",
                  "Voltar a se sentir normal, confiante e no controle"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                    <Check className="h-5 w-5 text-pink-400 shrink-0" />
                    <span className="text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xl leading-relaxed font-medium relative z-10">
                Você pode reverter isso, e começa com orientações simples aplicadas no seu dia a dia.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 - O QUE VOCÊ RECEBE */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-roboto text-4xl font-black mb-4">O que você recebe</h2>
              <p className="text-gray-600 text-lg italic">Acesso imediato para começar sua transformação</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl border-2 border-pink-500 shadow-xl">
                  <span className="bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                    Produto Principal
                  </span>
                  <h3 className="text-2xl font-black mb-4">Menopausa Sem Médico</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Um guia prático que mostra como aliviar os principais sintomas da menopausa em casa, mesmo sem consulta, mesmo sem dinheiro.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-xl flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Como Funciona
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Você garante o acesso agora",
                      "Recebe o conteúdo imediatamente",
                      "Aplica ajustes simples no dia a dia",
                      "Começa a sentir alívio em até 7 dias"
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700">
                        <span className="bg-pink-100 text-pink-700 font-bold h-6 w-6 flex items-center justify-center rounded-full text-xs shrink-0">{i+1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-xl flex items-center gap-2">
                  <Star className="h-5 w-5 text-pink-500" />
                  Bônus Inclusos
                </h4>
                <div className="space-y-4">
                  {[
                    { title: "Bônus 1 — O Que Fazer nos Dias de Crise", desc: "Como agir quando o calorão, a fraqueza ou a tristeza aparecem de repente." },
                    { title: "Bônus 2 — Alimentos que Ajudam x Alimentos que Pioram", desc: "Sem dieta complicada. Apenas o que evitar e o que priorizar." },
                    { title: "Bônus 3 — Não É Loucura, É Fase", desc: "Para aliviar o peso emocional e acabar com a culpa silenciosa." }
                  ].map((bonus, i) => (
                    <div key={i} className="bg-pink-50 p-5 rounded-2xl border border-pink-100">
                      <p className="font-bold text-pink-800 mb-1">{bonus.title}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{bonus.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 - DIFERENCIAL */}
        <section className="py-20 bg-pink-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-roboto text-3xl font-black mb-12">Por que este método é diferente?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white p-8 rounded-3xl">
                <p className="text-red-500 font-bold mb-4 uppercase text-xs tracking-widest">Outras Soluções</p>
                <ul className="space-y-4 text-gray-400">
                  <li className="flex gap-2">❌ <span>Hormônios e remédios fortes</span></li>
                  <li className="flex gap-2">❌ <span>Consultas extremamente caras</span></li>
                  <li className="flex gap-2">❌ <span>Linguagem médica confusa</span></li>
                </ul>
              </div>
              <div className="bg-pink-600 p-8 rounded-3xl text-white shadow-xl">
                <p className="text-pink-200 font-bold mb-4 uppercase text-xs tracking-widest">Nossa Solução</p>
                <ul className="space-y-4">
                  <li className="flex gap-2 font-medium">✅ <span>Simples e Natural</span></li>
                  <li className="flex gap-2 font-medium">✅ <span>Direto ao ponto</span></li>
                  <li className="flex gap-2 font-medium">✅ <span>Sem efeitos colaterais</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 - BENEFÍCIOS */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-roboto text-3xl font-black text-center mb-12">Resultados que você verá</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Menos calorões", result: "Mais conforto ao longo do dia" },
                { title: "Mais energia", result: "Menos sensação de fraqueza extrema" },
                { title: "Sono melhor", result: "Menos irritação e cansaço emocional" },
                { title: "Clareza mental", result: "Menos medo de “perder o controle”" },
                { title: "Autonomia", result: "Menos dependência de médicos e remédios" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border rounded-2xl">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold leading-tight">{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7 - PROVA SOCIAL */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />)}
              </div>
              <h2 className="font-roboto text-3xl font-black">Mais de 3.000 mulheres já começaram</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Maria L., 52 anos", quote: "Achei que estava ficando louca. Em poucos dias me senti mais calma e confiante." },
                { name: "Sandra P., 48 anos", quote: "Não tinha dinheiro pra médico. Isso me deu direção e esperança." },
                { name: "Cláudia R., 55 anos", quote: "Só quem passa sabe. Me senti acolhida e orientada pela primeira vez." }
              ].map((t, i) => (
                <Card key={i} className="rounded-2xl border-none shadow-sm">
                  <CardContent className="pt-6">
                    <div className="mb-4 text-pink-500"><Users size={24} /></div>
                    <p className="italic text-gray-700 mb-4">"{t.quote}"</p>
                    <p className="font-bold text-sm text-gray-900">— {t.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 - PRICING */}
        <section id="pricing" className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-roboto text-4xl font-black mb-4">Escolha seu acesso</h2>
              <p className="text-gray-500">Comece hoje mesmo a transformar sua vida.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Plano Básico */}
              <div className="bg-white border-2 border-gray-200 rounded-[2rem] p-10 flex flex-col items-center text-center">
                <h3 className="text-xl font-bold mb-6">Plano Básico</h3>
                <div className="mb-8">
                  <span className="text-gray-400 text-lg">Por apenas</span>
                  <div className="text-5xl font-black text-gray-900">R$ 1,99</div>
                </div>
                <ul className="space-y-3 text-gray-600 mb-10 text-left w-full">
                  <li className="flex items-center gap-2"><Check size={18} className="text-pink-500" /> Guia Menopausa Sem Médico</li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-pink-500" /> Acesso imediato</li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-pink-500" /> Aplicação simples</li>
                </ul>
                <Button className="w-full h-16 text-lg font-bold bg-gray-900 hover:bg-black text-white rounded-2xl mt-auto">
                  EU QUERO O BÁSICO
                </Button>
              </div>

              {/* Plano Completo */}
              <div className="bg-pink-600 border-4 border-pink-400 rounded-[2rem] p-10 flex flex-col items-center text-center text-white shadow-2xl scale-105 relative">
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  MAIS POPULAR ⭐
                </div>
                <h3 className="text-xl font-bold mb-6">Plano Completo</h3>
                <div className="mb-8">
                  <span className="text-pink-200 text-lg">Por apenas</span>
                  <div className="text-5xl font-black text-white">R$ 7,99</div>
                </div>
                <ul className="space-y-3 text-pink-50 mb-10 text-left w-full">
                  <li className="flex items-center gap-2"><Check size={18} className="text-yellow-400" /> <strong>Guia principal</strong></li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-yellow-400" /> <strong>3 bônus exclusivos</strong></li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-yellow-400" /> Conteúdo emocional + prático</li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-yellow-400" /> Mais suporte e clareza</li>
                </ul>
                <Button className="w-full h-16 text-lg font-bold bg-white hover:bg-pink-50 text-pink-600 rounded-2xl mt-auto">
                  ACESSO COMPLETO AGORA
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9 - GARANTIA */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="mb-8 flex justify-center">
              <ShieldCheck size={80} className="text-pink-500" />
            </div>
            <h2 className="text-3xl font-black mb-6">Risco Zero: Garantia Incondicional</h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-10">
              Você tem <strong>7 dias de garantia total</strong>. <br />
              Sem perguntas. Sem letras miúdas. <br />
              Se não fizer sentido para você, seu dinheiro é devolvido.
            </p>
          </div>
        </section>

        {/* SECTION 10 - FAQ */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <HelpCircle size={40} className="mx-auto text-pink-600 mb-4" />
              <h2 className="font-roboto text-3xl font-black">Dúvidas Frequentes</h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Isso substitui o médico?", a: "Não. É uma orientação prática para quem não tem acesso ou precisa de alívio imediato através de ajustes no dia a dia." },
                { q: "Funciona para qualquer idade?", a: "Sim, especialmente para mulheres acima dos 40 anos que estão na pré-menopausa ou menopausa." },
                { q: "Preciso fazer academia ou dieta?", a: "Não. São ajustes simples e possíveis de serem realizados na sua rotina atual." },
                { q: "É seguro?", a: "Sim. O método foca em orientações naturais e comportamentais, sem uso de hormônios ou medicamentos." },
                { q: "Quando vejo resultados?", a: "Muitas mulheres relatam alívio significativo nos principais sintomas em até 7 dias de aplicação." },
                { q: "Como recebo o conteúdo?", a: "O acesso é digital e imediato após a confirmação do pagamento. Você receberá as instruções por e-mail." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b-pink-100">
                  <AccordionTrigger className="text-left font-bold text-gray-800 hover:text-pink-600">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* SECTION 11 - CTA FINAL */}
        <section className="py-20 bg-gradient-to-b from-white to-pink-50">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-xs font-black mb-6 uppercase tracking-widest">
              Atenção: Oferta Limitada
            </div>
            <h2 className="font-roboto text-4xl font-black mb-6">Pronta para recuperar seu bem-estar?</h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Essa oferta é limitada para manter o preço simbólico. 
              Você ainda está protegida pela garantia total de 7 dias.
            </p>
            
            <Button 
                size="lg" 
                className="bg-pink-600 hover:bg-pink-700 text-white text-2xl py-10 px-12 rounded-[2rem] shadow-2xl shadow-pink-300 w-full mb-6 font-black"
            >
              QUERO ALÍVIO AGORA <ArrowRight className="ml-4 h-8 w-8" />
            </Button>
            
            <p className="text-gray-500 font-medium">
              Comece agora por apenas R$1,99
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Alivie os sintomas da menopausa sem médico, sem humilhação e sem sofrer sozinha.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 bg-white border-t border-gray-100 text-center text-gray-400 text-sm">
          <div className="max-w-4xl mx-auto px-6">
            <p className="mb-4">© 2024 Menopausa Nunca Mais. Todos os direitos reservados.</p>
            <p className="max-w-2xl mx-auto text-xs opacity-60">
              AVISO LEGAL: As informações contidas neste site e guia não substituem o aconselhamento de um profissional de saúde. 
              Os resultados podem variar de pessoa para pessoa.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}