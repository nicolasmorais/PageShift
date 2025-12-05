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
        <div className="space-y-4">
          <p>
            Ao acessar este site, o usuário concorda que todo o conteúdo
            exibido — incluindo textos, imagens, vídeos e informações — possui
            caráter exclusivamente informativo.
          </p>
          <p>
            Os produtos apresentados não substituem consultas, diagnósticos ou
            recomendações de profissionais da saúde.
          </p>
          <p>
            As informações sobre preços, disponibilidade, frete e políticas
            comerciais podem ser modificadas a qualquer momento, sem aviso
            prévio.
          </p>
          <p>
            O uso dos produtos adquiridos é de responsabilidade do consumidor,
            que deve sempre seguir as orientações descritas na embalagem ou no
            material que acompanha o produto.
          </p>
        </div>
      ),
    },
    {
      title: "Política de Privacidade",
      trigger: "Política de Privacidade",
      content: (
        <div className="space-y-4">
          <p>
            Valorizamos sua privacidade. Todas as informações fornecidas
            voluntariamente pelo usuário — como nome, e-mail ou dados inseridos
            em formulários — são utilizadas apenas para fins de atendimento,
            envio de comunicações solicitadas ou suporte relacionado aos
            produtos oferecidos.
          </p>
          <p>
            Não compartilhamos, vendemos ou divulgamos dados a terceiros sem
            autorização do usuário, exceto quando exigido por lei.
          </p>
          <p>
            O usuário pode solicitar a remoção ou alteração de seus dados a
            qualquer momento por meio de nossos canais de suporte. Consulte
            esta página regularmente, pois nossa Política de Privacidade pode
            ser atualizada conforme necessário.
          </p>
        </div>
      ),
    },
    {
      title: "Política de Trocas e Devoluções",
      trigger: "Trocas e Devoluções",
      content: (
        <div className="space-y-4">
          <p>
            Em conformidade com o Código de Defesa do Consumidor, o cliente tem
            o direito de solicitar devolução ou reembolso em até 7 dias
            corridos após o recebimento do produto.
          </p>
          <p>
            Para iniciar o processo, basta entrar em contato com nossa equipe
            de suporte informando o número do pedido e o motivo da solicitação.
          </p>
          <p>
            O produto deve ser devolvido em condições adequadas, e o reembolso
            será processado após a conferência do item.
          </p>
          <p>
            Nosso objetivo é garantir uma experiência segura, transparente e
            satisfatória em todas as etapas da compra.
          </p>
        </div>
      ),
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          {/* Disclaimers Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">
              Avisos e Isenções de Responsabilidade
            </h3>
            <div className="text-sm space-y-3">
              <div>
                <p className="font-medium text-gray-300">
                  Isenção de Responsabilidade
                </p>
                <p>
                  Este conteúdo tem caráter exclusivamente informativo e
                  educacional. Não oferece diagnóstico, tratamento ou cura de
                  condições de saúde. Os resultados podem variar de pessoa para
                  pessoa. Sempre consulte um profissional de saúde qualificado
                  antes de iniciar qualquer mudança na dieta, no consumo de
                  chás, suplementos ou rotina de bem-estar.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-300">
                  Declaração de Risco
                </p>
                <p>
                  O uso de qualquer produto natural deve ser feito com
                  responsabilidade. Pessoas com condições médicas
                  pré-existentes, gestantes, lactantes ou usuários de
                  medicamentos devem buscar orientação profissional antes do
                  consumo.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-300">Aviso de Idade</p>
                <p>Conteúdo destinado a maiores de 18 anos.</p>
              </div>
            </div>
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