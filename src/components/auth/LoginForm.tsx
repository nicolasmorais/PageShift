"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        toast.success("Login bem-sucedido!");
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

  // Estilos baseados na imagem fornecida (fundo claro, texto escuro)
  const inputClasses = "flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-900 focus:outline-0 focus:ring-2 focus:ring-blue-600/50 border-none bg-gray-200 focus:border-blue-600 h-16 placeholder:text-gray-500 p-4 text-xl font-normal leading-normal";

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {/* Password Input */}
      <label className="flex flex-col w-full">
        <div className="flex w-full flex-1 items-stretch rounded-lg relative">
          <Input
            className={cn(inputClasses, "pr-12")}
            placeholder="Senha"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="absolute inset-y-0 right-0 text-gray-500 flex items-center justify-center pr-4">
            <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-full w-full text-gray-500 hover:bg-transparent hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </label>

      {/* Submit Button */}
      <Button
        type="submit"
        className={cn(
          "h-16 px-6 text-xl font-bold text-white bg-black hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1e293b] focus:ring-black rounded-xl",
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