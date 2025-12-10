"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulação de login
    console.log('Attempting login with:', { email, password });
    
    // Aqui você faria a chamada real à API de autenticação
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirecionar após o login (ex: para o dashboard)
      // router.push('/dashboard');
    }, 1500);
  };

  // Estilos baseados no novo HTML fornecido
  const inputClasses = "flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-blue-600/50 border border-slate-700 bg-[#0f172a] focus:border-blue-600 h-14 placeholder:text-slate-400 p-4 text-base font-normal leading-normal";
  const labelTextClasses = "text-white text-base font-medium leading-normal pb-2";

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {/* Email Input */}
      <label className="flex flex-col w-full">
        <p className={labelTextClasses}>Email</p>
        <div className="flex w-full flex-1 items-stretch rounded-lg">
          <Input
            className={inputClasses}
            placeholder="Digite seu email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </label>

      {/* Password Input */}
      <label className="flex flex-col w-full">
        <p className={labelTextClasses}>Senha</p>
        <div className="flex w-full flex-1 items-stretch rounded-lg relative">
          <Input
            className={cn(inputClasses, "pr-12")}
            placeholder="Digite sua senha"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="absolute inset-y-0 right-0 text-slate-400 flex items-center justify-center pr-4">
            <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-full w-full text-slate-400 hover:bg-transparent hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </label>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <Link href="#" className="text-blue-600 text-sm font-medium hover:underline">
          Esqueceu sua senha?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className={cn(
          "h-14 px-6 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1e293b] focus:ring-blue-600",
          isSubmitting && "opacity-70 cursor-not-allowed"
        )}
        disabled={isSubmitting}
      >
        <span className="truncate">{isSubmitting ? 'Entrando...' : 'Entrar'}</span>
      </Button>
    </form>
  );
};