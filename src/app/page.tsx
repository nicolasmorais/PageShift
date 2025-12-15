import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redireciona para a página de setup/login
  redirect('/login');
}