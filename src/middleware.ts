import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'auth_session';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get(SESSION_COOKIE_NAME)?.value === 'true';
  const pathname = request.nextUrl.pathname;

  // Se tentar acessar o dashboard sem estar autenticado, redireciona para login
  if (pathname.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se estiver autenticado e tentar acessar login, redireciona para dashboard
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};