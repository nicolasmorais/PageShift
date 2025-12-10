import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'auth_session';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get(SESSION_COOKIE_NAME)?.value === 'true';
  const pathname = request.nextUrl.pathname;

  // 1. Se o usuário tentar acessar o dashboard sem autenticação, redireciona para o login.
  if (pathname.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Se o usuário estiver autenticado e tentar acessar a página de login, redireciona para o dashboard.
  if (pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};