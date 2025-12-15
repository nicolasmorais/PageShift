"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function SetupPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlreadySetup, setIsAlreadySetup] = useState(false);

  useEffect(() => {
    checkIfSetup();
  }, []);

  const checkIfSetup = async () => {
    try {
      const response = await fetch('/api/auth/setup');
      const data = await response.json();
      
      if (data.isSetup) {
        setIsAlreadySetup(true);
        router.push('/login');
      }
    } catch (error) {
      console.error('Error checking setup:', error);
    }
  };

  const validatePassword = (pwd: string): { isValid: boolean; message: string } => {
    if (pwd.length < 8) {
      return { isValid: false, message: 'Mínimo de 8 caracteres' };
    }
    if (!/[A-Z]/.test(pwd)) {
      return { isValid: false, message: 'Pelo menos uma letra maiúscula' };
    }
    if (!/[a-z]/.test(pwd)) {
      return { isValid: false, message: 'Pelo menos uma letra minúscula' };
    }
    if (!/[0-9]/.test(pwd)) {
      return { isValid: false, message: 'Pelo menos um número' };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      return { isValid: false, message: 'Pelo menos um caractere especial' };
    }
    return { isValid: true, message: 'Senha forte!' };
  };

  const passwordValidation = validatePassword(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordValidation.isValid) {
      toast.error('Senha não atende aos requisitos de segurança');
      return;
    }
    
    if (!passwordsMatch) {
      toast.error('As senhas não coincidem');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success('Senha configurada com sucesso!');
        router.push('/login');
      } else {
        toast.error(data.message || 'Erro ao configurar senha');
      }
    } catch (error) {
      toast.error('Erro de conexão');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAlreadySetup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="mx-auto h-12 w-12 text-green-600 mb-4" />
            <CardTitle>Já Configurado</CardTitle>
            <CardDescription>
              O sistema já foi configurado. Redirecionando para o login...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Lock className="mx-auto h-12 w-12 text-blue-600 mb-4" />
          <CardTitle className="text-2xl">Configurar Senha</CardTitle>
          <CardDescription>
            Crie uma senha forte para proteger o acesso ao dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nova Senha</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Validação da senha */}
              {password && (
                <div className="space-y-1">
                  <div className={cn(
                    "flex items-center gap-2 text-sm",
                    passwordValidation.isValid ? "text-green-600" : "text-red-600"
                  )}>
                    {passwordValidation.isValid ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <span>{passwordValidation.message}</span>
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className={cn(/[A-Z]/.test(password) ? "text-green-600" : "text-gray-400")}>
                      ✓ Letra maiúscula
                    </div>
                    <div className={cn(/[a-z]/.test(password) ? "text-green-600" : "text-gray-400")}>
                      ✓ Letra minúscula
                    </div>
                    <div className={cn(/[0-9]/.test(password) ? "text-green-600" : "text-gray-400")}>
                      ✓ Número
                    </div>
                    <div className={cn(/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-600" : "text-gray-400")}>
                      ✓ Caractere especial
                    </div>
                    <div className={cn(password.length >= 8 ? "text-green-600" : "text-gray-400")}>
                      ✓ Mínimo 8 caracteres
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirmar Senha</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme sua senha"
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {confirmPassword && (
                <div className={cn(
                  "flex items-center gap-2 text-sm",
                  passwordsMatch ? "text-green-600" : "text-red-600"
                )}>
                  {passwordsMatch ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span>{passwordsMatch ? 'Senhas coincidem' : 'Senhas não coincidem'}</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!passwordValidation.isValid || !passwordsMatch || isSubmitting}
            >
              {isSubmitting ? 'Configurando...' : 'Configurar Senha'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Importante:</strong> Esta senha será usada para acessar o dashboard. 
              Guarde-a em um local seguro.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}