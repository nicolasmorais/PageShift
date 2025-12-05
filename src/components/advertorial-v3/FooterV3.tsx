"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export const FooterV3 = () => {
  const policies = [
    {
      title: "Termos e Condições",
      trigger: "Termos e Condições",
      content: (
        <>
          <p className="mb-4">
            <strong>Última atualização: [Data]</strong>
          </p>
          <p className="mb-4">
            Bem-vindo aos nossos Termos e Condições. Ao acessar nosso site e
            adquirir nossos produtos, você concorda em cumprir os seguintes
            termos. Leia-os com atenção.
          </p>
          <h3 className="font-bold text-lg mb-2">1. Uso do Site</h3>
          <p className="mb-4">
            Este site destina-se a fornecer informações sobre nossos produtos e
            permitir a sua compra. O conteúdo é para fins informativos e não
            substitui o conselho médico profissional.
          </p>
          <h3 className="font-bold text-lg mb-2">2. Produtos</h3>
          <p className="mb-4">
            Nossos produtos são guias digitais e materiais informativos. Eles
            são entregues eletronicamente. Os resultados do uso de nossos guias
            podem variar de pessoa para pessoa.
          </p>
          <h3 className="font-bold text-lg mb-2">3. Pagamento</h3>
          <p className="mb-4">
            Todos os pagamentos são processados através de uma plataforma segura.
            Ao fornecer suas informações de pagamento, você declara que tem o
            direito de usar o método de pagamento selecionado.
          </p>
          <h3 className="font-bold text-lg mb-2">4. Propriedade Intelectual</h3>
          <p className="mb-4">
            Todo o conteúdo deste site, incluindo textos, gráficos e logos, é
            de nossa propriedade e protegido por leis de direitos autorais.
          </p>
          <p>
            <em>
              [Este é um texto de exemplo. Substitua pelo seus Termos e
              Condições oficiais.]
            </em>
          </p>
        </>
      ),
    },
    {
      title: "Política de Privacidade",
      trigger: "Política de Privacidade",
      content: (
        <>
          <p className="mb-4">
            <strong>Última atualização: [Data]</strong>
          </p>
          <p className="mb-4">
            A sua privacidade é importante para nós. Esta política explica como
            coletamos, usamos e protegemos suas informações pessoais.
          </p>
          <h3 className="font-bold text-lg mb-2">1. Coleta de Informações</h3>
          <p className="mb-4">
            Coletamos informações que você nos fornece durante a compra, como
            nome, e-mail e informações de pagamento. Também podemos coletar
            dados de navegação para melhorar sua experiência.
          </p>
          <h3 className="font-bold text-lg mb-2">2. Uso das Informações</h3>
          <p className="mb-4">
            Usamos suas informações para processar seu pedido, entregar o
            produto digital, enviar comunicações importantes e melhorar nossos
            serviços.
          </p>
          <h3 className="font-bold text-lg mb-2">3. Compartilhamento</h3>
          <p className="mb-4">
            Não vendemos ou alugamos suas informações pessoais a terceiros.
            Podemos compartilhar dados com provedores de serviços que nos
            ajudam a operar nosso negócio (ex: processadores de pagamento).
          </p>
          <h3 className="font-bold text-lg mb-2">4. Segurança</h3>
          <p className="mb-4">
            Implementamos medidas de segurança para proteger suas informações
            pessoais contra acesso não autorizado.
          </p>
          <p>
            <em>
              [Este é um texto de exemplo. Substitua pela sua Política de
              Privacidade oficial.]
            </em>
          </p>
        </>
      ),
    },
    {
      title: "Política de Trocas e Devoluções",
      trigger: "Trocas e Devoluções",
      content: (
        <>
          <p className="mb-4">
            <strong>Última atualização: [Data]</strong>
          </p>
          <p className="mb-4">
            Entenda nossa política para trocas e devoluções de produtos
            digitais.
          </p>
          <h3 className="font-bold text-lg mb-2">1. Produtos Digitais</h3>
          <p className="mb-4">
            Devido à natureza dos produtos digitais (e-books, guias em PDF),
            que são entregues instantaneamente e não podem ser devolvidos
            fisicamente, nossa política de reembolso é baseada no Código de
            Defesa do Consumidor para compras online.
          </p>
          <h3 className="font-bold text-lg mb-2">2. Direito de Arrependimento</h3>
          <p className="mb-4">
            Você tem o direito de solicitar o reembolso total do valor pago em
            até 7 (sete) dias corridos após a confirmação da compra. Para
            solicitar, entre em contato com nosso suporte através do e-mail{" "}
            <strong>suporte@oneconversion.pro</strong> com o assunto "Solicitação
            de Reembolso".
          </p>
          <h3 className="font-bold text-lg mb-2">3. Processamento</h3>
          <p className="mb-4">
            Após a solicitação, o reembolso será processado pela plataforma de
            pagamento e o valor será estornado de acordo com os prazos da sua
            operadora de cartão ou método de pagamento utilizado.
          </p>
          <p>
            <em>
              [Este é um texto de exemplo. Substitua pela sua Política de
              Trocas e Devoluções oficial.]
            </em>
          </p>
        </>
      ),
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          {/* Disclaimer Section */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">
              Aviso Importante
            </h3>
            <p className="text-sm">
              Este produto não substitui o parecer médico profissional. Sempre
              consulte um profissional da saúde para tratar de assuntos
              relativos à saúde.
            </p>
          </div>

          {/* Company Info Section */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">
              Informações da Empresa
            </h3>
            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium text-gray-300">Empresa:</span>{" "}
                OneConversion Soluções Digitais
              </p>
              <p>
                <span className="font-medium text-gray-300">Endereço:</span>{" "}
                Av. Digital, 123, Sala 4, Aparecida de Goiania - GO
              </p>
              <p>
                <span className="font-medium text-gray-300">CNPJ:</span>{" "}
                60.357.932/0001-18
              </p>
              <p>
                <span className="font-medium text-gray-300">Contato:</span>{" "}
                suporte@oneconversion.pro
              </p>
            </div>
          </div>
        </div>

        {/* Policies Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm">
          {policies.map((policy) => (
            <Dialog key={policy.title}>
              <DialogTrigger asChild>
                <button className="hover:text-white transition-colors">
                  {policy.trigger}
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>{policy.title}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[400px] w-full p-4 border rounded-md">
                  <div className="prose prose-sm dark:prose-invert text-left">
                    {policy.content}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>
            Todos os direitos reservados © 2024 - OneConversion Soluções Digitais
          </p>
        </div>
      </div>
    </footer>
  );
};