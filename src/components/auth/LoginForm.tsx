"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ArrowRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    checkSetup();
  }, []);

  const checkSetup = async () => {
    try {
      const response = await fetch('/api/auth/setup');
      const data = await response.json();
      
      if (!data.isSetup) {
        setNeedsSetup(true);
        router.push('/setup');
      }
    } catch (error) {
      console.error('Error checking setup:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login bem-sucedido!");
        router.push('/dashboard');
      } else if (data.needsSetup) {
        toast.info("Sistema não configurado. Redirecionando...");
        router.push('/setup');
      } else {
        toast.error(data.message || "Senha incorreta.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl h-16 p-4 text-xl font-normal leading-normal border-none";
  const inputThemeClasses = "bg-gray-100 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#38bdf8] focus:border-[#38bdf8] dark:bg-[#1e293b] dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-[#38bdf8]/50 dark:focus:border-[#38bdf8]";
  const primaryButtonClasses = 'bg-[#38bdf8] hover:bg-[#0ea5e9] text-white';
  const focusRingOffset = 'focus:ring-offset-background dark:focus:ring-offset-[#0f172a]';

  if (needsSetup) {
    return (
      <div className="flex flex-col gap-6">
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-md">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Sistema não configurado
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Redirecionando para a configuração...
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={() => router.push('/setup')}
          className={cn("h-16 px-6 text-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38bdf8] rounded-xl", primaryButtonClasses, focusRingOffset)}
        >
          <span className="truncate flex items-center gap-2">
            Configurar Sistema
            <ArrowRight className="h-5 w-5" />
          </span>
        </Button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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

      <Button
        type="submit"
        className={cn(
          "h-16 px-6 text-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38bdf8] rounded-xl",
          primaryButtonClasses,
          focusRingOffset,
          isSubmitting && "opacity-70 cursor-not-allowed"
        )}
        disabled={isSubmitting}
      >
        <span className="truncate flex items-center gap-2">
            {isSubmitting ? 'Acessando...' : 'Acessar sua conta'}
            {!isSubmitting && <ArrowRight className="h-5 w-5" />}
        </span>
      </Button>
    </form>
  );
};