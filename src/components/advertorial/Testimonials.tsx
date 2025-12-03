"use client";

const testimonials = [
  {
    name: "João Oliveira, 62 anos",
    text: "Recebi tudo no e-mail em 3 minutos! O vídeo é excelente. Comprei as folhas numa loja aqui perto, gastei R$ 45 para o mês inteiro. Em 2 semanas minha glicemia caiu de 240 para 130. Estou impressionado!",
    time: "há 2 horas",
  },
  {
    name: "Renata Tanaka, 54 anos",
    text: "Eu era cética, mas por R$ 29,90 resolvi tentar. Melhor decisão! O chá é gostoso e funciona. Já estou na terceira semana e minha glicose baixou 90 pontos. Meu médico ficou boquiaberto!",
    time: "há 5 horas",
  },
  {
    name: "Sérgio Vaz, 58 anos",
    text: "Achei que ia ser complicado, mas é muito simples! O vídeo mostra tudo passo a passo. Já não sinto mais aquele formigamento terrível nas pernas. Vale MUITO a pena!",
    time: "há 1 dia",
  },
  {
    name: "Eduardo Reis, 65 anos",
    text: "Comprei pelo PIX e recebi na hora! Comecei no mesmo dia. Estou fazendo há 1 mês e minha glicose tá estável entre 90-100. Antes era sempre acima de 250!",
    time: "há 2 dias",
  },
];

export const Testimonials = () => {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-8 text-center font-sans">
        Veja o que quem já está usando o protocolo diz:
      </h2>
      <div className="space-y-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="bg-gray-300 dark:bg-gray-700 rounded-full h-12 w-12 flex-shrink-0"></div>
            <div className="w-full">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="font-bold text-gray-800 dark:text-gray-200">
                  {testimonial.name}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {testimonial.text}
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 pl-4">
                <span>{testimonial.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};