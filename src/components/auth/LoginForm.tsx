"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulação de login
    console.log('Attempting login with:', { email, password, rememberMe });
    
    // Aqui você faria a chamada real à API de autenticação
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirecionar após o login (ex: para o dashboard)
      // router.push('/dashboard');
    }, 1500);
  };

  // Estilos adaptados do HTML fornecido para Tailwind/Shadcn
  const inputClasses = "h-14 min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-r-none border border-r-0 border-[#3b4354] bg-[#1c1f27] p-[15px] pr-2 text-base font-normal leading-normal text-white placeholder:text-[#9da6b9] focus:border-blue-600 focus:outline-0 focus:ring-0";
  const iconContainerClasses = "flex items-center justify-center rounded-r-lg border border-l-0 border-[#3b4354] bg-[#1c1f27] pr-[15px] text-[#9da6b9]";
  const labelTextClasses = "pb-2 text-base font-medium leading-normal text-white";

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {/* Email Input */}
      <div className="flex flex-col flex-1">
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
          <div className={iconContainerClasses}>
            <Mail className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Password Input */}
      <div className="flex flex-col flex-1">
        <p className={labelTextClasses}>Senha</p>
        <div className="flex w-full flex-1 items-stretch rounded-lg">
          <Input
            className={inputClasses}
            placeholder="Digite sua senha"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={iconContainerClasses}>
            <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-full w-full text-[#9da6b9] hover:bg-transparent hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeOff className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Checkbox 
            id="remember-me" 
            checked={rememberMe} 
            onCheckedChange={(checked) => setRememberMe(!!checked)}
            className="h-5 w-5 rounded-md border-2 border-[#3b4354] data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <Label htmlFor="remember-me" className="text-base font-normal leading-normal text-white cursor-pointer">
            Lembrar-me
          </Label>
        </div>
        <Link href="#" className="text-sm font-medium text-[#9da6b9] hover:text-blue-600 transition-colors">
          Esqueceu a senha?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className={cn(
          "h-12 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-5 text-base font-bold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-blue-700",
          isSubmitting && "opacity-70 cursor-not-allowed"
        )}
        disabled={isSubmitting}
      >
        <span className="truncate">{isSubmitting ? 'Entrando...' : 'Entrar'}</span>
      </Button>

      {/* Create Account Link */}
      <div className="text-center">
        <p className="text-sm text-[#9da6b9]">
          Não tem uma conta? 
          <Link href="#" className="font-bold text-white hover:text-blue-600 ml-1 transition-colors">
            Criar conta
          </Link>
        </p>
      </div>
    </form>
  );
};