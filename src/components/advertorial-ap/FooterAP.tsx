"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // <-- FIX: Importing cn

interface Policy {
  title: string;
  trigger: string;
  content: string;
}

interface Disclaimer {
  title: string;
  text: string;
}

interface CompanyInfo {
  name: string;
  address: string;
  cnpj: string;
  contact: string;
}

interface FooterAPProps {
  disclaimers: Disclaimer[];
  companyInfo: CompanyInfo;
  policies: Policy[];
  copyright: string;
  // New visibility props
  hideDisclaimers?: boolean;
  hideCompanyInfo?: boolean;
  hidePolicies?: boolean;
}

export const FooterAP = ({ disclaimers, companyInfo, policies, copyright, hideDisclaimers = false, hideCompanyInfo = false, hidePolicies = false }: FooterAPProps) => {
  const showTopSection = !hideDisclaimers || !hideCompanyInfo;
  const showPoliciesSection = !hidePolicies && policies && policies.length > 0;

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {showTopSection && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
            {/* Disclaimers Section */}
            {!hideDisclaimers && disclaimers && disclaimers.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-white">
                  Avisos e Isenções de Responsabilidade
                </h3>
                <div className="text-sm space-y-3">
                  {disclaimers.map((disclaimer, index) => (
                    <div key={index}>
                      <p className="font-medium text-gray-300">{disclaimer.title}</p>
                      <p>{disclaimer.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Company Info Section */}
            {!hideCompanyInfo && companyInfo && (
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-white">
                  Informações da Empresa
                </h3>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium text-gray-300">Empresa:</span>{" "}
                    {companyInfo.name}
                  </p>
                  <p>
                    <span className="font-medium text-gray-300">Endereço:</span>{" "}
                    {companyInfo.address}
                  </p>
                  <p>
                    <span className="font-medium text-gray-300">CNPJ:</span>{" "}
                    {companyInfo.cnpj}
                  </p>
                  <p>
                    <span className="font-medium text-gray-300">Contato:</span>{" "}
                    {companyInfo.contact}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Policies Section */}
        {showPoliciesSection && (
          <div className={showTopSection ? "mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm" : "flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm"}>
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
                    <div className="prose prose-sm text-left" dangerouslySetInnerHTML={{ __html: policy.content.replace(/\n/g, '<br />') }} />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}

        {/* Copyright Bar */}
        <div className={cn("text-center text-sm", (showTopSection || showPoliciesSection) ? "mt-8 pt-8 border-t border-gray-800" : "pt-0 mt-0")}>
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
};