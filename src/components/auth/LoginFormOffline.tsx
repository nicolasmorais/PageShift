"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ArrowRight, Database, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const LoginFormOffline = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingDb, setIsCheckingDb] = useState(false);
  const [dbStatus, setDbStatus] = useState<'unknown' | 'online' | 'offline'>('unknown');

  const checkDbStatus = async () => {
    setIsCheckingDb(true);
    try {
      const response = await fetch('/api/simple-db-test');
      const data = await response.json();
      setDbStatus(data.success ? 'online' : 'offline');
    } catch (error) {
      setDbStatus('offline');
    } finally {
      setIsCheckingDb(false);
    }
  };

  React.useEffect(() => {
    checkDbStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Senha incorreta.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Classes dinâmicas
  const inputClasses = "flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl h-16 p-4 text-xl font-normal leading-normal border-none";
  const inputThemeClasses = "bg-gray-100 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#6B16ED] focus:border-[#6B16ED] dark:bg-[#1e293b] dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-[#6B16ED]/50 dark:focus:border-[#6B16ED]";
  const primaryButtonClasses = 'bg-[#6B16ED] hover:bg-[#5512C7] text-white';

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {/* Status do Banco */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#0f172a] rounded-lg border border-gray-200 dark:border-[#334155]">
        <span className="text-sm text-gray-600 dark:text-zinc-400">
          {isCheckingDb ? (
            <>
              <Database className="inline h-4 w-4 animate-spin mr-2" />
              Verificando banco...
            </>
          ) : dbStatus === 'online' ? (
            <>
              <Database className="inline h-4 w-4 text-green-500 mr-2" />
              Banco Online
            </>
          ) : (
            <>
              <AlertTriangle className="inline h-4 w-4 text-yellow-500 mr-2" />
              Banco Offline - Senha Padrão
            </>
          )}
        </span>
        {dbStatus !== 'unknown' && (
          <button
            type="button"
            onClick={checkDbStatus}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Verificar novamente
          </button>
        )}
      </div>

      {/* Campo de Senha */}
      <label className="flex flex-col w-full">
        <div className="flex w-full flex-1 items-stretch rounded-lg relative">
          <Input
            className={cn(inputClasses, inputThemeClasses, "pr-12")}
            placeholder="Senha"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-4">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-full w-full text-gray-500 hover:bg-transparent hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </label>

      {/* Botão de Submit */}
      <Button
        type="submit"
        className={cn(
          "h-16 px-6 text-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B16ED] rounded-xl",
          primaryButtonClasses,
          isSubmitting && "opacity-70 cursor-not-allowed"
        )}
        disabled={isSubmitting}
      >
        <span className="truncate flex items-center gap-2">
          {isSubmitting ? 'Acessando...' : 'Acessar sua conta'}
          {!isSubmitting && <ArrowRight className="h-5 w-5" />}
        </span>
      </Button>

      {/* Informações de Ajuda */}
      {dbStatus === 'offline' && (
        <div className="text-center text-sm text-gray-500 dark:text-zinc-400">
          <p>Use a senha padrão ou</p>
          <a href="/init-database" className="text-blue-600 dark:text-blue-400 hover:underline">
            configure o banco de dados
          </a>
        </div>
      )}
    </form>
  );
};