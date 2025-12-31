"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  X,
  Star, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle, 
  Users, 
  HelpCircle,
  CreditCard,
  Lock,
  AlertCircle,
  Target,
  BookOpen,
  Bell,
  Moon,
  Dumbbell,
  Zap,
  Smile,
  Video,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { PageTracker } from "./PageTracker";

const TESTIMONIAL_VIDEOS = [
  {
    url: "https://ydo1oposreyoyzh5.public.blob.vercel-storage.com/729b9773-837a-4701-be78-26a8f00395be-DP3.mp4",
    poster: "https://ydo1oposreyoyzh5.public.blob.vercel-storage.com/depoimento1-poster-8a7b3c5d2e9f4b6a1c2d3e4f5a6b7c8d9e0f1.jpg"
  },
  {
    url: "https://ydo1oposreyoyzh5.public.blob.vercel-storage.com/e6acb5f6-e381-4d6d-94e4-81538e8856e8-dp-menopausa-001.mp4",
    poster: "https://ydo1oposreyoyzh5.public.blob.vercel-storage.com/depoimento2-poster-9b8c7d6e3f2a1b4c5d6e7f8a9b0c1d2e3f4.jpg"
  },
  {
    url: "https://ydo1oposreyoyzh5.public.blob.vercel-storage.com/bfb848bc-e1f8-4c87-a126-5a8bb2d16495-DP2.mp4",
    poster: "https://ydo1oposreyoyzh5.public.blob.vercel-storage.com/depoimento3-poster-5d6e7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4.jpg"
  }
];

// Componente para o vídeo com播放 controls
const VideoPlayer = ({ video, index }: { video: typeof TESTIMONIAL_VIDEOS[0], index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Erro ao reproduzir vídeo:', error);
      });
    }
  };

  return (
    <div className="group w-full max-w-[300px]">
      <div className="relative aspect-[9/16] w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-gray-100 bg-gray-900">
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-[2rem]"
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
        >
          <source src={video.url} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
        
        {/* Overlay customizado quando não está tocando */}
        <div 
          className="absolute inset-0 bg-black/30 rounded-[2rem] flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handlePlay}
        >
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl pointer-events-auto">
            <Play className="h-8 w-8 text-pink-600" />
          </div>
        </div>
        
        {/* Efeitos de borda */}
        <div className="absolute inset-0 border-2 border-white/20 rounded-[2rem] pointer-events-none"></div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="flex gap-1 text-yellow-400">
          {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
        </div>
        <span className="text-sm font-black text-gray-400 uppercase tracking-tighter flex items-center gap-2">
          <Video size={14} className="text-pink-600" /> Depoimento Verificado
        </span>
      </div>
    </div>
  );
};

export function MenopausePage() {
  const [timeLeft, setTimeLeft] = useState(1187); // 19:47 em segundos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <PageTracker contentId="menopausa" />
      
      {/* Script do Taboola Pixel - Carregado dinamicamente com PageView padrão */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(t, f, a, x) {
              if (!document.getElementById(x)) {
                t.async = 1; t.src = a; t.id = x;
                f.parentNode.insertBefore(t, f);
              }
            }(document.createElement('script'),
            document.getElementsByTagName('script')[0],
            '//cdn.taboola.com/libtrc/unip/1959176/tfa.js',
            'tb_tfa_script');
          `
        }}
      />
      
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window._tfa = window._tfa || [];
            window._tfa.push({notify: 'event', name: 'page_view', id: 1959176});
          `
        }}
      />
      
      <noscript>
        <img 
          src="https://trc.taboola.com/1959176/log/3/unip?en=page_view" 
          width="0" 
          height="0" 
          style={{ display: 'none' }} 
        />
      </noscript>
      
      <div className="bg-white text-gray-900 font-space-grotesk selection:bg-pink-100 antialiased">
        
        {/* TOP BAR URGÊNCIA */}
        <div className="bg-red-600 text-white text-center py-2 px-4 text-xs md:text-sm font-bold sticky top-0 z-50 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 md:gap-4">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4 animate-pulse" />
              OFERTA EXPIRA EM: {formatTime(timeLeft)}
            </span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              APENAS 23 VAGAS RESTANTES
            </span>
          </div>
        </div>

        {/* HERO SECTION */}
        <header className="bg-gradient-to-b from-pink-50 to-white pt-12 pb-20 px-6 border-b border-pink-100">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-space-grotesk font-black text-2xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mb-6">
              Diga <strong className="text-pink-600">Adeus</strong> aos Calorões da Menopausa em 7 Dias — <strong className="text-pink-600">Naturalmente</strong>, Sem Hormônios e Sem Gastar Fortunas!
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-8 font-medium">
              Em apenas 7 dias, você dorme melhor, controla o humor e acaba com o suor noturno — tudo com um guia simples e 100% natural
            </p>

            {/* IMAGEM DE TRANSFORMAÇÃO (HERO) */}
            <div className="relative max-w-2xl mx-auto mb-10">
              <img 
                src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%2022%20de%20dez.%20de%202025%2C%2023_11_16%20%281%29-YiIF5Dx6Ex8EfF18VGsiRtoYLJUhpE.png" 
                alt="Transformação Menopausa" 
                className="rounded-3xl shadow-2xl border-4 border-white relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-gray-900 p-4 rounded-2xl shadow-xl z-20 font-black text-sm rotate-12 hidden md:block">
                ALÍVIO <br /> GARANTIDO
              </div>
            </div>
          </div>
        </header>

        {/* SEÇÃO DE DEPOIMENTOS EM VÍDEO */}
        <section className="py-20 px-6 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-pink-600 font-black text-sm uppercase tracking-widest bg-pink-50 px-4 py-2 rounded-full border border-pink-100 mb-4 inline-block">
                Resultados Reais
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-4">
                Elas Também Voltaram a Sorrir
              </h2>
              <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                Assista aos depoimentos de mulheres que aplicaram o nosso método e hoje vivem livres dos sintomas da menopausa.
              </p>
            </div>

            {/* Grid com vídeos funcionais */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {TESTIMONIAL_VIDEOS.map((video, i) => (
                <VideoPlayer key={i} video={video} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* DOR AMPLIFICADA */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-black text-center mb-10">Me responda com sinceridade:</h2>
            
            <div className="mb-12">
                <img 
                    src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%2022%20de%20dez.%20de%202025%2C%2023_22_45%20%282%29-5Mq5Tv2MbDtdy5EOR55c9k8LNw1OiD.png" 
                    alt="Sintomas da Menopausa" 
                    className="w-full h-auto rounded-3xl shadow-xl border border-gray-200"
                />
            </div>

            <div className="space-y-6">
              {[
                "Você já acordou encharcada de suor às 3h da manhã, sentindo que seu corpo está pegando fogo por dentro?",
                "Já teve que sair correndo de uma conversa porque o calorão veio do nada e você sentiu vergonha?",
                "Já chorou sem motivo, gritou com quem você ama, e depois se perguntou: 'O que está acontecendo comigo?'",
                "Já ouviu do médico: 'Isso é normal da idade. Você vai ter que aprender a conviver'?"
              ].map((text, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="shrink-0 mt-1"><AlertCircle className="h-6 w-6 text-red-500" /></div>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-red-600 text-white p-8 rounded-3xl text-center shadow-xl">
              <p className="text-xl md:text-2xl font-black leading-tight mb-4">Não deveria ser assim.</p>
              <p className="text-lg opacity-90">Sua menopausa está fora de controle porque ninguém te ensinou o básico que seu corpo precisa nessa fase.</p>
            </div>
          </div>
        </section>

        {/* PROMESSA ✨ */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-pink-900 text-white rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Smile size={180} />
                </div>
                
                <div className="text-center mb-12 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black mb-6">Imagine acordar daqui 3 dias e...</h2>
                </div>

                <div className="mb-12 relative z-10 flex justify-center">
                    <img 
                        src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%2022%20de%20dez.%20de%202025%2C%2023_28_04%20%281%29-K5eDlKovVcScONN51oldmatjmk2e2p.png" 
                        alt="Vida Renovada" 
                        className="max-w-full h-auto rounded-3xl shadow-2xl border-4 border-pink-800"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {[
                    { icon: Zap, text: "Passar o dia inteiro sem um único calorão que te faça suar ou te envergonhar" },
                    { icon: Moon, text: "Dormir a noite toda sem acordar com o corpo em chamas ou lençóis molhados" },
                    { icon: Zap, text: "Ter energia de verdade - disposição natural para viver o seu dia" },
                    { icon: Smile, text: "Se sentir calma e no controle em vez de explodir por qualquer coisa" },
                    { icon: ShieldCheck, text: "Voltar a se reconhecer quando olha no espelho - a mulher forte que você sempre foi" }
                ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="shrink-0 bg-pink-600 p-2 rounded-xl text-white shadow-sm"><item.icon size={24} /></div>
                    <p className="text-gray-100 font-bold leading-tight">{item.text}</p>
                    </div>
                ))}
                </div>
            </div>
          </div>
        </section>

        {/* O QUE VOCÊ RECEBE 📘 */}
        <section className="py-24 bg-gray-900 text-white px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-10"></div>
          <div className="max-w-5_xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-6">Apresento: Menopausa Sob Controle</h2>
              <p className="text-pink-400 text-xl font-bold uppercase tracking-widest">O Guia Prático da Mulher Independente</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                  <h3 className="text-2xl font-black mb-6 text-pink-400 flex items-center gap-2">
                    <BookOpen /> O Que Você Descobre:
                  </h3>
                  <div className="space-y-4">
                    {[
                      { t: "O Protocolo 3-5-7", d: "Os 3 ajustes de 5 minutos que você faz em 7 dias para zerar os calorões (Página 12 - você pode começar HOJE)" },
                      { t: "A Lista Vermelha", d: "Os 8 alimentos que você come TODO DIA e que estão jogando gasolina no fogo (Página 23)" },
                      { t: "SOS Calorão", d: "O que fazer nos primeiros 90 segundos quando o calor chega (Página 31)" },
                      { t: "O Segredo do Sono", d: "A rotina noturna de 7 minutos que corrige seu despertar às 3h (Página 41)" },
                      { t: "Dose Certa de Movimento", d: "Exercícios de 5 minutos que regulam hormônios naturalmente (Página 56)" }
                    ].map((item, i) => (
                      <div key={i} className="border-b border-white/5 pb-4 last:border-0">
                        <p className="font-black text-pink-300 mb-1">🎯 {item.t}</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-black text-center md:text-left mb-6">🎁 BÔNUS EXCLUSIVOS (Ação Imediata)</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { val: "R$ 27", t: "Kit Emergência Anti-Calorão", d: "5 técnicas que funcionam em qualquer lugar em 2 min." },
                    { val: "R$ 37", t: "Cardápio Amigo da Menopausa", d: "21 refeições simples que acalmam seu corpo." },
                    { val: "R$ 17", t: "Diário de Transformação", d: "O mapa do seu sucesso dia após dia." },
                    { val: "R$ 12", t: "Checklist de Resultados", d: "Sinais claros de que seu corpo respondeu." }
                  ].map((bonus, i) => (
                    <div key={i} className="flex justify-between items-center bg-green-900/20 border border-green-500/30 p-4 rounded-2xl">
                      <div>
                        <p className="font-bold text-green-400">{bonus.t}</p>
                        <p className="text-xs text-gray-500">{bonus.d}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-red-400 line-through">{bonus.val}</span>
                        <p className="font-black text-green-500">GRÁTIS</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-pink-600 p-6 rounded-2xl text-center shadow-xl">
                  <p className="font-bold text-sm opacity-80 uppercase mb-1">Valor Total dos Bônus: R$ 93,00</p>
                  <p className="text-2xl font-black">HOJE: GRÁTIS</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROVA SOCIAL ⭐ */}
        <section className="py-24 px-6 bg-pink-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4">O Que Mulheres Como Você Estão Dizendo</h2>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-600 font-bold">Mais de 3.127 vidas transformadas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { n: "Marina Costa, 51 anos", t: "No 5º dia eu acordei e percebi: 'Espera... não tive calorão ontem!' Chorei de alívio." },
                { n: "Roberta Almeida, 47 anos", t: "Meu marido disse que eu 'voltei'. Voltei a sorrir, voltei a ter paciência, voltei a ser EU." },
                { n: "Cláudia Pereira, 54 anos", t: "Economizei mais de R$ 800 em consultas. E funcionou DE VERDADE." },
                { n: "Patrícia Lima, 52 anos", t: "Na primeira semana, dormi 7h sem acordar. MILAGRE." }
              ].map((test, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-md border border-pink-100">
                  <p className="italic text-gray-700 mb-6 text-lg">"{test.t}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-pink-200 rounded-full"></div>
                    <div>
                      <p className="font-black text-sm">{test.n}</p>
                      <div className="flex gap-0.5"><Star size={12} className="fill-yellow-400 text-yellow-400" /><Star size={12} className="fill-yellow-400 text-yellow-400" /><Star size={12} className="fill-yellow-400 text-yellow-400" /><Star size={12} className="fill-yellow-400 text-yellow-400" /><Star size={12} className="fill-yellow-400 text-yellow-400" /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARAÇÃO ⚖️ */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-16">Por Que Outras Soluções Falharam?</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left border-b border-gray-200">Solução</th>
                    <th className="p-4 text-center border-b border-gray-200">Dificuldades</th>
                    <th className="p-4 text-center border-b border-gray-200 bg-pink-600 text-white rounded-t-2xl">Sob Controle</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { s: "Médico Particular", d: "R$ 400+ por consulta / Receita genérica", o: "R$ 19,90 / Você no controle" },
                    { s: "TRH (Hormônios)", d: "Efeitos colaterais / Medo de riscos / Não trata a raiz", o: "Zero hormônios / Atua na causa" },
                    { s: "Chás e Simpatias", d: "Inconstante / Perda de tempo / Sem base", o: "Baseado em ciência / Alívio em 7 dias" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-bold border-b border-gray-100">{row.s}</td>
                      <td className="p-4 text-center text-sm text-gray-500 border-b border-gray-100">❌ {row.d}</td>
                      <td className="p-4 text-center font-black text-pink-700 bg-pink-50 border-b border-pink-100">✅ {row.o}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PRECIFICAÇÃO 🔥 */}
        <section id="pricing" className="py-24 px-6 bg-pink-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">OFERTA ESPECIAL</h2>
            <p className="text-pink-200 text-xl font-bold mb-10">Expira em {formatTime(timeLeft)}</p>
            
            <div className="bg-white text-gray-900 rounded-[3rem] p-10 md:p-16 shadow-2xl relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 px-8 py-2 rounded-full font-black text-sm tracking-widest shadow-lg">
                OFERTA ÚNICA
              </div>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
                <div className="text-center md:text-right">
                  <p className="text-gray-400 line-through text-2xl font-bold">R$ 147,00</p>
                  <p className="text-gray-400 line-through text-xl opacity-50">R$ 47,00</p>
                </div>
                <div className="text-pink-600 text-6xl md:text-7xl font-black">
                  <span className="text-2xl font-bold align-top mt-4 inline-block">R$</span>19,90
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-xl mx-auto mb-10">
                {["Guia Completo Sob Controle", "Protocolo 3-5-7 Integrado", "4 Bônus Exclusivos (R$ 93)", "Acesso Imediato", "Garantia Blindada de 7 Dias"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 font-bold text-gray-700">
                    <Check className="text-green-500 shrink-0" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full h-20 bg-green-600 hover:bg-green-700 text-white text-xl md:text-2xl font-black rounded-[2rem] shadow-2xl mb-6">
                <a href="https://oneconversion.pro/checkout?product_id=26455e6c-ddf9-4304-a72e-66a7ffa6beac" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  QUERO MEU ACESSO AGORA!
                </a>
              </Button>
              <div className="flex flex-wrap justify-center gap-6 opacity-60">
                <div className="flex items-center gap-1 text-xs font-bold"><ShieldCheck size={16} /> COMPRA SEGURA</div>
                <div className="flex items-center gap-1 text-xs font-bold"><Zap size={16} /> ACESSO EM 2 MIN</div>
                <div className="flex items-center gap-1 text-xs font-bold"><CreditCard size={16} /> PIX OU CARTÃO</div>
              </div>
            </div>
          </div>
        </section>

        {/* GARANTIA REVERSA 🛡️ */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-4 border-dashed border-pink-500 p-8 md:p-16 rounded-[3rem] text-center shadow-2xl">
              <ShieldCheck className="mx-auto h-24 w-24 text-pink-600 mb-8" />
              <h2 className="text-3xl md:text-4xl font-black mb-8">Risco Zero: Ou Funciona, Ou Eu Te Pago!</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-10 max-w-2xl mx-auto">
                Teste o <strong>Protocolo 3-5-7</strong> por 7 dias. Se você não sentir melhora, eu devolvo seus R$ 19,90 e <strong className="text-pink-600">te pago R$ 10 pelo seu tempo</strong>. Você literalmente sai no lucro se o meu método falhar.
              </p>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">O Único Risco É Você Não Testar</p>
            </div>
          </div>
        </section>

        {/* FAQ ❓ */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-16">Perguntas Que Estão na Sua Cabeça Agora</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Isso realmente funciona ou é mais uma promessa?", a: "São R$ 19,90 com garantia TOTAL. Se não funcionar, você recebe de volta + R$ 10. Mais de 3.000 mulheres já testaram e aprovaram." },
                { q: "Preciso de médico? Substitui meu tratamento?", a: "Não substitui nada. É um COMPLEMENTO educacional. Vai te dar autonomia enquanto busca ajuda profissional se quiser." },
                { q: "Tenho 58 anos, funciona pra mim?", a: "Funciona para qualquer mulher em menopausa ou pré-menopausa. Os 3 sistemas que você vai equilibrar funcionam em QUALQUER idade." },
                { q: "Sou péssima com tecnologia. Como acesso?", a: "É um PDF simples. Você recebe por email, clica e pronto. Se travar, nosso suporte te ajuda em menos de 1 hora." },
                { q: "Por que tão barato? Tem pegadinha?", a: "Zero pegadinha. O preço é simbólico porque quero que TODAS tenham acesso. Quando funcionar pra você, vai recomendar pras amigas." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b-pink-100">
                  <AccordionTrigger className="text-left font-black text-gray-800 hover:text-pink-600 text-lg">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-lg leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA FINAL ⏰ */}
        <section className="py-24 px-6 bg-pink-50 border-t border-pink-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-8">Qual caminho você escolhe?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
              <div className="p-8 bg-white rounded-3xl border border-gray-100 opacity-60">
                <p className="font-black text-red-500 mb-4">OPÇÃO 1</p>
                <p className="text-sm text-gray-500 italic">Continuar acordando às 3h suando, irritada, cansada e gastando fortunas em consultas sem solução.</p>
              </div>
              <div className="p-8 bg-pink-600 text-white rounded-3xl shadow-xl scale-105 border-4 border-pink-400">
                <p className="font-black mb-4">OPÇÃO 2</p>
                <p className="font-bold">Investir R$ 19,90 agora, zerar os calorões em 3 dias e recuperar sua alegria de viver.</p>
              </div>
            </div>
            
            <Button className="w-full h-20 bg-green-600 hover:bg-green-700 text-white text-xl md:text-2xl font-black rounded-[2rem] shadow-2xl mb-8">
              <a href="https://oneconversion.pro/checkout?product_id=26455e6c-ddf9-4304-a72e-66a7ffa6beac" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                QUERO MEU ACESSO POR R$ 19,90!
              </a>
            </Button>
            
            <div className="space-y-4 text-left max-w-xl mx-auto text-gray-600 font-medium">
              <p>P.S.: Sério, são R$ 19,90. Isso pode mudar TUDO na sua vida.</p>
              <p>P.S.S.: Se não funcionar, você recebe o valor de volta + R$ 10. Você ganha mesmo se não gostar.</p>
              <p>P.S.S.S.: A oferta é limitada. Quando as vagas acabarem, o preço volta para R$ 47,00.</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-16 bg-white border-t border-gray-100 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex justify-center gap-6 mb-8 text-gray-400">
              <Lock size={20} /> <ShieldCheck size={20} /> <Users size={20} />
            </div>
            <p className="mb-4 text-gray-400 text-sm">© 2024 Menopausa Sob Controle. Todos os direitos reservados.</p>
            <p className="text-gray-300 text-[10px] leading-relaxed uppercase tracking-widest max-w-2xl mx-auto">
              AVISO LEGAL: Este conteúdo é educacional e não substitui orientação médica profissional. 
              Consulte seu médico antes de mudanças significativas na rotina de saúde.
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}

// Adicionando tipagem para o objeto global window
declare global {
  interface Window {
    _tfa?: any[];
  }
}