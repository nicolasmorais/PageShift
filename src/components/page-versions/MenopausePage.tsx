"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  Star, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle, 
  Users, 
  AlertCircle,
  BookOpen,
  Moon,
  Zap,
  Smile,
  Gift,
  CheckCircle2,
  TrendingUp,
  Gem
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PageTracker } from "./PageTracker";
import { cn } from '@/lib/utils';

const TESTIMONIAL_VIDEOS = [
  {
    type: 'video',
    url: "https://ydo1oposreyoyzh5.public.blob.vercel-storage.com/729b9773-837a-4701-be78-26a8f00395be-DP3.mp4",
    poster: "https://ydo1oposreyoyzh5.public.blob.vercel-storage.com/depoimento1-poster-8a7b3c5d2e9f4b6a1c2d3e4f5a6b7c8d9e0f1.jpg"
  },
  {
    type: 'iframe',
    url: "http://vhost-vhost-7d0xji-b4fbf4-147-93-179-152.traefik.me/video/dp-menopausa-001.mp4",
    poster: ""
  },
  {
    type: 'video',
    url: "https://ydo1oposreyoyzh5.public.blob.vercel-storage.com/bfb848bc-e1f8-4c87-a126-5a8bb2d16495-DP2.mp4",
    poster: "https://ydo1oposreyoyzh5.public.blob.vercel-storage.com/depoimento3-poster-5d6e7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4.jpg"
  }
];

const VideoPlayer = ({ video, index }: { video: any, index: number }) => {
  return (
    <div className="group w-full max-w-[300px] animate-in fade-in zoom-in duration-700" style={{ animationDelay: `${index * 150}ms` }}>
      <div className="relative aspect-[9/16] w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-[6px] border-white bg-slate-900 transition-transform hover:scale-[1.02]">
        {video.type === 'iframe' ? (
          <iframe 
            src={video.url} 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            allowFullScreen
            style={{ border: 'none', background: 'black', aspectRatio: '9/16' }}
          ></iframe>
        ) : (
          <video
            className="w-full h-full object-cover"
            poster={video.poster}
            controls
            playsInline
            preload="metadata"
          >
            <source src={video.url} type="video/mp4" />
          </video>
        )}
        <div className="absolute top-4 left-4 bg-pink-600/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 pointer-events-none">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div> AO VIVO
        </div>
      </div>
      <div className="mt-6 text-center space-y-2">
        <div className="flex justify-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
        </div>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
           Depoimento Verificado
        </p>
      </div>
    </div>
  );
};

export function MenopausePage() {
  const [timeLeft, setTimeLeft] = useState(1187);

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
      
      <div className="bg-white text-slate-900 font-sans selection:bg-pink-100 antialiased">
        
        {/* TOP BAR URGÊNCIA */}
        <div className="bg-slate-900 text-white py-3 px-4 sticky top-0 z-50 shadow-2xl">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-pink-500">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
                    142 pessoas vendo agora
                </span>
                <span className="hidden md:inline opacity-20">|</span>
                <span className="flex items-center gap-2">
                    <Users size={14} className="text-blue-400" />
                    23 vagas restantes
                </span>
            </div>
            <div className="bg-red-600 px-4 py-1 rounded-full flex items-center gap-2 shadow-lg shadow-red-600/20">
              <Clock className="h-3 w-3" />
              OFERTA EXPIRA EM: <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <header className="relative pt-16 pb-24 px-6 overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-50 via-white to-white">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-100/30 to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-pink-200">
                Protocolo Revelado 2024
            </span>
            <h1 className="text-3xl md:text-6xl lg:text-7xl text-slate-900 leading-[1.1] font-black tracking-tight mb-8">
              Diga <span className="text-pink-600 italic">Adeus</span> aos Calorões da Menopausa em 7 Dias — <span className="underline decoration-pink-600/20 underline-offset-8">Naturalmente</span>.
            </h1>
            <p className="text-lg md:text-2xl text-slate-500 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
              Em apenas 7 dias, você dorme melhor, controla o humor e acaba com o suor noturno — tudo com um guia simples e 100% natural.
            </p>

            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <img 
                src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%2022%20de%20dez.%20de%202025%2C%2023_11_16%20%281%29-YiIF5Dx6Ex8EfF18VGsiRtoYLJUhpE.png" 
                alt="Transformação Menopausa" 
                className="rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-8 border-white relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-400 text-slate-900 p-6 rounded-3xl shadow-2xl z-20 font-black text-sm rotate-6 hidden md:flex flex-col items-center gap-1 border-4 border-white">
                <ShieldCheck size={32} />
                <span>ALÍVIO <br /> GARANTIDO</span>
              </div>
            </div>
          </div>
        </header>

        {/* DEPOIMENTOS EM VÍDEO */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                Elas Voltaram a Sorrir
              </h2>
              <div className="h-2 w-24 bg-pink-600 mx-auto rounded-full"></div>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium italic">
                "Nunca imaginei que algo tão simples pudesse devolver minha liberdade."
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              {TESTIMONIAL_VIDEOS.map((video, i) => (
                <VideoPlayer key={i} video={video} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* DOR AMPLIFICADA */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-widest text-slate-400">Me responda com sinceridade:</h2>
            
            <div className="relative mb-20 group">
                <div className="absolute inset-0 bg-red-600 rounded-[3rem] blur-3xl opacity-5"></div>
                <img 
                    src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%2022%20de%20dez.%20de%202025%2C%2023_22_45%20%282%29-5Mq5Tv2MbDtdy5EOR55c9k8LNw1OiD.png" 
                    alt="Sintomas da Menopausa" 
                    className="w-full h-auto rounded-[3rem] shadow-2xl border border-slate-100 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
            </div>

            <div className="space-y-6">
              {[
                "Você já acordou encharcada de suor às 3h da manhã, sentindo que seu corpo está pegando fogo por dentro?",
                "Já teve que sair correndo de uma conversa porque o calorão veio do nada e você sentiu vergonha?",
                "Já chorou sem motivo, gritou com quem você ama, e depois se perguntou: 'O que está acontecendo comigo?'",
                "Já ouviu do médico: 'Isso é normal da idade. Você vai ter que aprender a conviver'?"
              ].map((text, i) => (
                <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="shrink-0"><AlertCircle className="h-8 w-8 text-red-500" /></div>
                  <p className="text-xl text-slate-700 leading-relaxed font-bold">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 bg-red-600 text-white p-12 rounded-[3.5rem] text-center shadow-[0_32px_64px_-16px_rgba(220,38,38,0.3)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><AlertTriangle size={120} /></div>
                <p className="text-3xl font-black leading-tight mb-6 relative z-10 tracking-tight">Não deveria ser assim.</p>
                <p className="text-xl opacity-90 font-medium relative z-10">Sua menopausa está fora de controle porque ninguém te ensinou o básico que seu corpo precisa nessa fase.</p>
            </div>
          </div>
        </section>

        {/* PROMESSA */}
        <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-pink-900 to-pink-950 text-white rounded-[4rem] p-10 md:p-20 shadow-2xl relative overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Smile size={240} />
                </div>
                
                <div className="text-center mb-16 relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-none">Imagine acordar daqui 3 dias e...</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-pink-500 rounded-[3rem] blur-2xl opacity-20"></div>
                        <img 
                            src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%2022%20de%20dez.%20de%202025%2C%2023_28_04%20%281%29-K5eDlKovVcScONN51oldmatjmk2e2p.png" 
                            alt="Vida Renovada" 
                            className="w-full h-auto rounded-[3rem] shadow-2xl border-4 border-white/10"
                        />
                    </div>
                    <div className="space-y-6">
                        {[
                            { icon: Zap, text: "Passar o dia inteiro sem um único calorão que te faça suar ou te envergonhar" },
                            { icon: Moon, text: "Dormir a noite toda sem acordar com o corpo em chamas ou lençóis molhados" },
                            { icon: TrendingUp, text: "Ter energia de verdade - disposição natural para viver o seu dia" },
                            { icon: Smile, text: "Se sentir calma e no controle em vez de explodir por qualquer coisa" },
                            { icon: Gem, text: "Voltar a se reconhecer quando olha no espelho" }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md hover:bg-white/10 transition-colors group">
                                <div className="shrink-0 bg-pink-600 p-2.5 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform"><item.icon size={24} /></div>
                                <p className="text-white font-black text-lg leading-tight flex items-center">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* O QUE VOCÊ RECEBE */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-pink-600 font-black text-xs uppercase tracking-[0.4em] mb-4 block">Conteúdo Exclusivo</span>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Menopausa Sob Controle</h2>
              <p className="text-slate-400 text-xl font-bold uppercase tracking-widest">O Guia Prático da Mulher Independente</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-inner">
                  <h3 className="text-3xl font-black mb-10 text-slate-900 flex items-center gap-4">
                    <div className="bg-slate-900 p-2 rounded-xl text-white"><BookOpen /></div> O Que Você Descobre:
                  </h3>
                  <div className="space-y-8">
                    {[
                      { t: "O Protocolo 3-5-7", d: "Os 3 ajustes de 5 minutos que você faz em 7 dias para zerar os calorões (Página 12)." },
                      { t: "A Lista Vermelha", d: "Os 8 alimentos que você come TODO DIA e que estão jogando gasolina no fogo (Página 23)." },
                      { t: "SOS Calorão", d: "O que fazer nos primeiros 90 segundos quando o calor chega (Página 31)." },
                      { t: "O Segredo do Sono", d: "A rotina noturna de 7 minutos que corrige seu despertar (Página 41)." },
                      { t: "Dose Certa de Movimento", d: "Exercícios de 5 minutos que regulam hormônios naturalmente (Página 56)." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="h-6 w-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 mt-1 font-black text-xs">0{i+1}</div>
                        <div>
                            <p className="font-black text-slate-900 text-xl mb-1 group-hover:text-pink-600 transition-colors">{item.t}</p>
                            <p className="text-slate-500 text-lg leading-relaxed">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-widest">
                    <Gift className="text-pink-600" /> BÔNUS EXCLUSIVOS
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { val: "R$ 27", t: "Kit Emergência Anti-Calorão", d: "5 técnicas que funcionam em qualquer lugar." },
                    { val: "R$ 37", t: "Cardápio Amigo da Menopausa", d: "21 refeições simples que acalmam seu corpo." },
                    { val: "R$ 17", t: "Diário de Transformação", d: "O mapa do seu sucesso dia após dia." },
                    { val: "R$ 12", t: "Checklist de Resultados", d: "Sinais claros de que seu corpo respondeu." }
                  ].map((bonus, i) => (
                    <div key={i} className="flex justify-between items-center bg-white border-2 border-slate-100 p-6 rounded-3xl hover:border-pink-200 transition-all shadow-sm group">
                      <div className="flex gap-4 items-center">
                        <div className="bg-pink-50 p-3 rounded-2xl text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all"><Check size={20} /></div>
                        <div>
                            <p className="font-black text-slate-900 text-lg">{bonus.t}</p>
                            <p className="text-sm text-slate-400 font-medium">{bonus.d}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-300 line-through font-bold">{bonus.val}</span>
                        <p className="font-black text-green-600 text-sm uppercase tracking-widest">Grátis</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-pink-600 p-8 rounded-[2.5rem] text-white text-center shadow-2xl shadow-pink-600/20">
                  <p className="font-black text-sm opacity-70 uppercase tracking-widest mb-2">Valor Total dos Bônus: R$ 93,00</p>
                  <p className="text-3xl font-black">HOJE: GRÁTIS</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROVA SOCIAL */}
        <section className="py-32 px-6 bg-pink-50 relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-24 space-y-6">
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                Confiança de quem <br /> <span className="text-pink-600">já transformou</span> a vida.
              </h2>
              <div className="flex justify-center gap-1.5 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={32} fill="currentColor" />)}
              </div>
              <p className="text-slate-500 font-black text-xl tracking-tight uppercase">Média 4.9/5 • 3.127 relatos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { n: "Marina Costa, 51 anos", t: "No 5º dia eu acordei e percebi: 'Espera... não tive calorão ontem!' Chorei de alívio.", img: "32" },
                { n: "Roberta Almeida, 47 anos", t: "Meu marido disse que eu 'voltei'. Voltei a sorrir, voltei a ter paciência, voltei a ser EU.", img: "45" },
                { n: "Cláudia Pereira, 54 anos", t: "Economizei mais de R$ 800 em consultas. E funcionou DE VERDADE.", img: "21" },
                { n: "Patrícia Lima, 52 anos", t: "Na primeira semana, dormi 7h sem acordar. MILAGRE.", img: "12" }
              ].map((test, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl border border-white flex flex-col gap-6 relative group transition-all hover:-translate-y-2">
                  <div className="absolute -top-6 -left-6 text-pink-100 text-9xl font-serif select-none pointer-events-none group-hover:text-pink-200 transition-colors opacity-40">“</div>
                  <p className="italic text-slate-600 text-xl font-medium leading-relaxed relative z-10">"{test.t}"</p>
                  <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                    <img src={`https://i.pravatar.cc/150?img=${test.img}`} className="h-14 w-14 rounded-2xl object-cover shadow-lg" alt={test.n} />
                    <div>
                      <p className="font-black text-slate-900 text-lg flex items-center gap-2">
                        {test.n}
                        <CheckCircle2 size={16} className="text-blue-500" />
                      </p>
                      <div className="flex gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, idx) => <Star key={idx} size={10} fill="currentColor" />)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARAÇÃO */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-20 tracking-tighter text-slate-900 leading-tight">Por Que Outras <br /> Soluções <span className="text-red-500">Falharam?</span></h2>
            <div className="bg-white border-[6px] border-slate-900 rounded-[3.5rem] overflow-hidden shadow-[0_48px_80px_-16px_rgba(0,0,0,0.2)]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-8 text-left text-xs font-black uppercase tracking-[0.3em]">Caminho</th>
                    <th className="p-8 text-center text-xs font-black uppercase tracking-[0.3em] opacity-50">Dificuldades</th>
                    <th className="p-8 text-center text-xs font-black uppercase tracking-[0.3em] bg-pink-600">Nosso Método</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { s: "Médico Particular", d: "R$ 400+ por consulta", o: "R$ 19,90" },
                    { s: "TRH (Hormônios)", d: "Riscos e Colaterais", o: "Zero Hormônios" },
                    { s: "Chás e Simpatias", d: "Sem base e Inconstante", o: "Base Científica" }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                      <td className="p-8 font-black text-slate-900 text-lg">{row.s}</td>
                      <td className="p-8 text-center text-slate-400 font-bold text-sm">❌ {row.d}</td>
                      <td className="p-8 text-center font-black text-pink-700 bg-pink-50/50">✅ {row.o}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PRECIFICAÇÃO */}
        <section id="pricing" className="py-32 px-6 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-transparent opacity-50"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">OFERTA ESPECIAL</h2>
            <p className="text-pink-400 text-xl font-bold mb-16 uppercase tracking-[0.3em] animate-pulse">Expira em {formatTime(timeLeft)}</p>
            
            <div className="bg-white text-slate-900 rounded-[4rem] p-10 md:p-20 shadow-[0_64px_128px_-24px_rgba(219,39,119,0.3)] relative border-[8px] border-white">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 px-10 py-3 rounded-full font-black text-sm tracking-[0.3em] shadow-2xl shadow-amber-400/20 border-4 border-white">
                ÚNICA OPORTUNIDADE
              </div>
              
              <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-16">
                <div className="text-center md:text-right space-y-2">
                  <p className="text-slate-300 line-through text-4xl font-black">R$ 147,00</p>
                  <p className="text-pink-600/30 line-through text-2xl font-bold">R$ 47,00</p>
                </div>
                <div className="flex flex-col items-center leading-none">
                    <span className="text-slate-400 text-xs font-black uppercase tracking-[0.4em] mb-4">Apenas 1x de:</span>
                    <div className="text-slate-900 text-8xl md:text-9xl font-black tracking-tighter flex items-start">
                    <span className="text-3xl font-black mt-6 mr-2">R$</span>19<span className="text-5xl mt-6">,90</span>
                    </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-16 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                {["Guia Completo Sob Controle", "Protocolo 3-5-7 Integrado", "4 Bônus Exclusivos (R$ 93)", "Acesso Imediato", "Garantia de 7 Dias"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-black text-slate-700 text-sm tracking-tight">
                    <div className="bg-green-100 p-1 rounded-full text-green-600"><Check size={16} /></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <a href="https://oneconversion.pro/checkout?product_id=26455e6c-ddf9-4304-a72e-66a7ffa6beac" target="_blank" rel="noopener noreferrer">
                <Button className="w-full h-28 bg-green-600 hover:bg-green-700 text-white text-2xl md:text-4xl font-black rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(22,163,74,0.4)] transition-all hover:scale-[1.03] active:scale-95 group">
                    <div className="flex flex-col items-center">
                        <span className="flex items-center gap-4">QUERO MEU ACESSO AGORA <ArrowRight className="h-10 w-10 group-hover:translate-x-2 transition-transform" /></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mt-2">Acesso imediato no seu e-mail</span>
                    </div>
                </Button>
              </a>
              
              <div className="flex flex-wrap justify-center gap-10 mt-12 opacity-30 grayscale">
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest"><ShieldCheck size={20} /> COMPRA SEGURA</div>
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest"><Zap size={20} /> ACESSO EM 2 MIN</div>
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest"><CreditCard size={20} /> PIX OU CARTÃO</div>
              </div>
            </div>
          </div>
        </section>

        {/* GARANTIA REVERSA */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-50 border-[6px] border-dashed border-pink-500 p-12 md:p-24 rounded-[4rem] text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full -mr-32 -mt-32 opacity-50"></div>
              <ShieldCheck className="mx-auto h-32 w-32 text-pink-600 mb-10 drop-shadow-xl" />
              <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter leading-tight text-slate-900">Risco Zero: <br /> <span className="text-pink-600">Ou Funciona, Ou Eu Te Pago!</span></h2>
              <p className="text-2xl text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto font-medium italic">
                Teste o <strong>Protocolo 3-5-7</strong> por 7 dias. Se você não sentir melhora, eu devolvo seus R$ 19,90 e <strong className="text-pink-600 underline decoration-pink-600/30 decoration-8 underline-offset-4">te pago R$ 10 pelo seu tempo</strong>. Você literalmente sai no lucro se o meu método falhar.
              </p>
              <div className="inline-block px-8 py-2 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-[0.4em]">Selo de Compromisso Total</div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-32 px-6 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-center mb-24 tracking-tighter text-slate-900">Dúvidas Frequentes</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "Isso realmente funciona ou é mais uma promessa?", a: "São R$ 19,90 com garantia TOTAL. Se não funcionar, você recebe de volta + R$ 10. Mais de 3.000 mulheres já testaram e aprovaram." },
                { q: "Preciso de médico? Substitui meu tratamento?", a: "Não substitui nada. É um COMPLEMENTO educacional. Vai te dar autonomia enquanto busca ajuda profissional se quiser." },
                { q: "Tenho 58 anos, funciona pra mim?", a: "Funciona para qualquer mulher em menopausa ou pré-menopausa. Os 3 sistemas que você vai equilibrar funcionam em QUALQUER idade." },
                { q: "Sou péssima com tecnologia. Como acesso?", a: "É um PDF simples. Você recebe por email, clica e pronto. Se travar, nosso suporte te ajuda em menos de 1 hora." },
                { q: "Por que tão barato? Tem pegadinha?", a: "Zero pegadinha. O preço é simbólico porque quero que TODAS tenham acesso. Quando funcionar pra você, vai recomendar pras amigas." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-none bg-white rounded-3xl px-8 shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left font-black text-slate-900 hover:text-pink-600 text-xl py-6 no-underline hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 text-lg leading-relaxed pb-8">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-24 bg-white border-t border-slate-100 text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="flex justify-center gap-12 text-slate-300">
              <Lock size={32} strokeWidth={1} /> <ShieldCheck size={32} strokeWidth={1} /> <Users size={32} strokeWidth={1} />
            </div>
            <div className="space-y-4">
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">© 2024 Menopausa Sob Controle. Todos os direitos reservados.</p>
                <p className="text-slate-300 text-[10px] leading-relaxed uppercase tracking-[0.15em] max-w-3xl mx-auto border-t border-slate-50 pt-8 italic">
                AVISO LEGAL: Este conteúdo é exclusivamente educacional e informativo. Não substitui o parecer médico profissional, diagnósticos ou tratamentos. Sempre consulte seu médico antes de realizar qualquer mudança significativa na sua rotina de saúde ou suplementação natural. Os resultados podem variar de pessoa para pessoa.
                </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}