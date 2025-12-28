import { LoginFormOffline } from '@/components/auth/LoginFormOffline';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Login - PageShift',
  description: 'Acesse o painel de gerenciamento de advertoriais',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function LoginPage() {
  const logoUrl = "https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/94e94392-0815-4bb4-9f
<dyad-write path="src/app/login/page.tsx">
import { LoginFormOffline } from '@/components/auth/LoginFormOffline';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Login - PageShift',
  description: 'Acesse o painel de gerenciamento de advertoriais',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function LoginPage() {
  const logoUrl = "https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/94e94392-0815-4bb4-9cfa-ca4362c3495f%20%281%29%20%281%29-cWKpykzfXjyKf02ITuUtmE2iq5JYZn.png";

  return (
    <>
      <Toaster richColors />
      <div className={cn("relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6 bg-background")}>
        
        <div className="w-full max-w-sm mx-auto space-y-8">
          
          <div className="mb-8 flex justify-start">
            <Image
              src={logoUrl}
              alt="PageShift Logo"
              width={150}
              height={50}
              className="h-[50px] w-auto"
              priority
            />
          </div>

          <div className="mb-8">
            <h1 className="text-gray-900 dark:text-white text-4xl font-bold leading-tight tracking-[-0.015em] text-left">
              Acesse sua conta
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-normal leading-normal mt-2">
              Insira a senha para acessar o painel
            </p>
          </div>
          
          <LoginFormOffline />

          <div className="pt-4 text-center">
            <a 
              href="/init-database" 
              className="text-sm text-gray-500 hover:text-[#6B16ED] transition-colors"
            >
              Configurar banco de dados
            </a>
          </div>
        </div>
      </div>
    </>
  );
}