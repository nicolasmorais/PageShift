import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Acesso - PageShift',
};

export default function LoginPage() {
  // Cores do novo design: background-dark: #0f172a
  // Removendo mainBg fixo para usar bg-background
  const logoUrl = "https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/94e94392-0815-4bb4-9cfa-ca4362c3495f%20%281%29-cQ9d9YZNOknrfYOmNv38Sj0LQVfjHp.png";

  return (
    <>
      <Toaster richColors />
      <div className={cn("relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6 bg-background")}>
        
        {/* Main Content Container */}
        <div className="w-full max-w-sm mx-auto space-y-8">
          
          {/* Logo */}
          <div className="mb-8">
            <img
              src={logoUrl}
              alt="One Conversion Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Title and Subtitle */}
          <div className="mb-8">
            <h1 className="text-gray-900 dark:text-white text-4xl font-bold leading-tight tracking-[-0.015em] text-left">
              Acesse sua conta
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-normal leading-normal mt-2">
              Insira a senha para acessar o painel.
            </p>
          </div>
          
          <LoginForm />
        </div>
      </div>
    </>
  );
}