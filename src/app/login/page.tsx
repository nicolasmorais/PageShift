import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Acesso - PageShift',
};

export default function LoginPage() {
  const logoUrl = "https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/94e94392-0815-4bb4-9cfa-ca4362c3495f%20%281%29-cQ9d9YZNOknrfYOmNv38Sj0LQVfjHp.png";

  return (
    <div className={cn("relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6 bg-background")}>
      <div className="w-full max-w-sm mx-auto space-y-8">
        <div className="mb-8">
          <img
            src={logoUrl}
            alt="PageShift Logo"
            className="h-10 w-auto"
          />
        </div>

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
  );
}