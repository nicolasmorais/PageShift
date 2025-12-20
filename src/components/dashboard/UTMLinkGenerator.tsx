"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Link as LinkIcon, Copy, Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface UTMLinkGeneratorProps {
  // Props futuras se necessário
}

// UTMs comuns
const UTM_OPTIONS = [
    { key: 'utm_source', label: 'utm_source', defaultValue: 'taboola' },
    { key: 'utm_medium', label: 'utm_medium', defaultValue: 'cpc' },
    { key: 'utm_campaign', label: 'utm_campaign', defaultValue: '' },
    { key: 'utm_content', label: 'utm_content', defaultValue: '' },
    { key: 'utm_term', label: 'utm_term', defaultValue: '' },
];

// Macros da Taboola
const TABOOLA_OPTIONS = [
    { key: 'site', label: '{site} - Site do publisher', isMacro: true },
    { key: 'site_id', label: '{site_id} - ID exclusivo do site', isMacro: true },
    { key: 'site_domain', label: '{site_domain} - Nome/URL do site', isMacro: true },
    { key: 'thumbnail', label: '{thumbnail} - URL da imagem/vídeo', isMacro: true },
    { key: 'title', label: '{title} - Título do item', isMacro: true },
    { key: 'timestamp', label: '{timestamp} - Horário da oferta', isMacro: true },
    { key: 'platform', label: '{platform} - Plataforma (Desktop/Mobile/Tablet)', isMacro: true },
    { key: 'campaign_id', label: '{campaign_id} - ID exclusivo da campanha', isMacro: true },
    { key: 'campaign_name', label: '{campaign_name} - Nome da campanha', isMacro: true },
    { key: 'campaign_item_id', label: '{campaign_item_id} - ID exclusivo do item', isMacro: true },
];

export function UTMLinkGenerator({ }: UTMLinkGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [baseLink, setBaseLink] = useState('');
  const [selectedParams, setSelectedParams] = useState<Record<string, string | boolean>>({
    utm_source: true,
    utm_medium: true,
  });

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
  const primaryButtonClasses = 'bg-[#6B16ED] hover:bg-[#5512C7] text-white';
  const textColor = 'text-gray-900 dark:text-white';
  const labelColor = 'text-gray-600 dark:text-zinc-300';

  const handleParamToggle = (key: string, isChecked: boolean) => {
    setSelectedParams(prev => {
      const newState = { ...prev };
      if (isChecked) {
        // Se for UTM, usa o valor padrão ou string vazia
        const option = [...UTM_OPTIONS, ...TABOOLA_OPTIONS].find(opt => opt.key === key);
        if (option && 'defaultValue' in option) {
          newState[key] = option.defaultValue;
        } else {
          newState[key] = true; // Para macros
        }
      } else {
        delete newState[key];
      }
      return newState;
    });
  };

  const handleParamValueChange = (key: string, value: string) => {
    setSelectedParams(prev => ({ ...prev, [key]: value }));
  };

  const generatedLink = useMemo(() => {
    if (!baseLink) return 'Preencha o link base para gerar o URL final.';

    try {
      const url = new URL(baseLink);
      
      // Adiciona os parâmetros selecionados
      Object.entries(selectedParams).forEach(([key, value]) => {
        if (value === true) {
          // Macro da Taboola - adiciona sem codificar as chaves
          url.searchParams.set(key, `{${key}}`);
        } else if (typeof value === 'string' && value.trim()) {
          // UTM com valor fixo
          url.searchParams.set(key, value.trim());
        }
      });

      // Retorna a URL como string, garantindo que as macros não sejam codificadas
      let finalUrl = url.toString();
      finalUrl = finalUrl.replace(/%7B/g, '{').replace(/%7D/g, '}');
      
      return finalUrl;

    } catch (error) {
      console.error("Erro ao construir o link:", error);
      return 'Link base inválido. Verifique o formato.';
    }
  }, [baseLink, selectedParams]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link com UTMs e macros copiado para a área de transferência!");
  };

  const isReady = baseLink && generatedLink.startsWith('http');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={primaryButtonClasses}>
          <Plus className="mr-2 h-4 w-4" />
          Gerador de Links UTM
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[800px]", cardBg, borderColor, textColor)}>
        <DialogHeader>
          <DialogTitle>Gerador de Links com UTM e Macros Taboola</DialogTitle>
          <DialogDescription className={labelColor}>
            Crie URLs com parâmetros UTM e macros dinâmicas da Taboola para rastreamento completo.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto">
          
          {/* 1. Link Base */}
          <div className="space-y-2">
            <Label className={labelColor}>Link Base</Label>
            <Input
              value={baseLink}
              onChange={(e) => setBaseLink(e.target.value)}
              placeholder="https://seusite.com/checkout"
              className={cn(inputBg, borderColor, textColor)}
              required
            />
            <p className="text-xs text-gray-500 dark:text-zinc-500">
              URL base para onde os usuários serão redirecionados.
            </p>
          </div>

          {/* 2. Parâmetros UTM */}
          <div className="space-y-4 p-4 border rounded-md bg-gray-50 dark:bg-[#0f172a]">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-blue-500" />
              Parâmetros UTM
            </h3>
            <div className="space-y-3">
              {UTM_OPTIONS.map(option => (
                <div key={option.key} className="flex items-center space-x-3">
                  <Checkbox
                    id={`utm-${option.key}`}
                    checked={!!selectedParams[option.key]}
                    onCheckedChange={(checked) => handleParamToggle(option.key, checked as boolean)}
                  />
                  <Label htmlFor={`utm-${option.key}`} className="flex-1 cursor-pointer font-mono text-sm">
                    {option.label}
                  </Label>
                  {selectedParams[option.key] !== undefined && (
                    <Input
                      value={selectedParams[option.key] as string}
                      onChange={(e) => handleParamValueChange(option.key, e.target.value)}
                      placeholder="Valor Personalizado"
                      className={cn(inputBg, borderColor, textColor, "w-40 h-8 text-sm")}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Macros da Taboola */}
          <div className="space-y-4 p-4 border rounded-md bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Code className="h-5 w-5 text-purple-500" />
              Macros da Taboola
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              Parâmetros dinâmicos que serão substituídos pela Taboola no momento da exibição.
            </p>
            <div className="grid grid-cols-1 gap-3">
              {TABOOLA_OPTIONS.map(option => (
                <div key={option.key} className="flex items-center space-x-3">
                  <Checkbox
                    id={`taboola-${option.key}`}
                    checked={!!selectedParams[option.key]}
                    onCheckedChange={(checked) => handleParamToggle(option.key, checked as boolean)}
                  />
                  <Label htmlFor={`taboola-${option.key}`} className="flex-1 cursor-pointer text-sm">
                    <span className="font-mono bg-white dark:bg-gray-800 px-2 py-1 rounded">
                      {option.label}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Link Gerado */}
          <div className="space-y-2">
            <Label className={labelColor}>Link Gerado</Label>
            <div className="flex items-center gap-2">
              <Input
                value={generatedLink}
                readOnly
                className={cn(inputBg, borderColor, textColor, "font-mono text-sm")}
              />
              <Button 
                type="button" 
                onClick={handleCopy} 
                disabled={!isReady}
                className={primaryButtonClasses}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-zinc-500">
              {isReady ? 'Copie e use este link nas suas campanhas Taboola.' : 'Preencha o link base e selecione os parâmetros.'}
            </p>
          </div>

        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="outline">Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}