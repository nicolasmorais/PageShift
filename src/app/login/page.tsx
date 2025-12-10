import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Login - PageShift',
};

export default function LoginPage() {
  // Cores do novo design: background-dark: #0f172a, form-background: #1e293b
  const sidebarBg = 'bg-[#0f172a]';
  const formBg = 'bg-[#1e293b]';

  return (
    <div className={cn("relative flex h-auto min-h-screen w-full flex-col overflow-hidden", sidebarBg)}>
      <div className="flex flex-1 w-full h-full">
        
        {/* Left Sidebar (Hidden on mobile, visible on large screens) */}
        <div className={cn(
          "hidden lg:flex flex-col flex-1 justify-center items-center p-12",
          "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] animate-gradient-move bg-[size:200%_200%]"
        )}>
          <div className="max-w-lg w-full text-left">
            <h1 className="text-white tracking-light text-[32px] font-bold leading-tight">
              Gerencie seus Advertoriais com Precisão.
            </h1>
            <p className="text-gray-400 text-lg font-normal leading-normal mt-4">
              Acesse sua conta para continuar.
            </p>
          </div>
        </div>
        
        {/* Right Form Area */}
        <div className={cn(
          "flex flex-1 flex-col justify-center items-center w-full lg:max-w-xl xl:max-w-2xl p-6 sm:p-12",
          formBg
        )}>
          <div className="w-full max-w-sm mx-auto">
            <div className="mb-8">
              <h1 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-left">
                Login
              </h1>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}