import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - PageShift',
};

export default function LoginPage() {
  // URL da imagem de fundo fornecida no HTML
  const backgroundImageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHiqqY497KRwoMdXK0SCpKRekBjDjw7A6qvw6cv1tzqZkGJYcuqxOM8dgxPIxji09MoiLxO5KWW7Ord-fWy0UNuwJevo6lclD--1CTlYVN9bCW5btNBU1MzoT-XNUplDHs1qbqPhB9t_D81THIzNayeADaY9vZNKw80X4kvauRnkvKiA9qa9TtP1zcJGuUN8G7x0ZF4-thy9y1LBaK0WjwdR1jXfoGFk5ZvkeEMVSN6iCJbCHf0tRyKKSg2jTIxVC0Z_8jrVEMemXW';

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#101622] font-sans">
      {/* Background Image with Blur and Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 h-full w-full bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('${backgroundImageUrl}')`, 
          filter: 'blur(32px) brightness(0.5)',
        }}
      />
      
      {/* Main Content Card */}
      <main className="relative z-10 flex w-full max-w-md flex-col rounded-xl bg-white/5 p-8 backdrop-blur-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-white">
            Bem-vindo de volta!
          </h1>
          <p className="text-base font-normal leading-normal text-[#9da6b9]">
            Faça seu login para continuar
          </p>
        </div>
        
        <LoginForm />
      </main>
    </div>
  );
}