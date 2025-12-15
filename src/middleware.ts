import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'auth_session';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get(SESSION_COOKIE_NAME)?.value === 'true';
  const pathname = request.nextUrl.pathname;

  // Se não estiver autenticado e tentar acessar o dashboard
  if (pathname.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se estiver autenticado e tentar acessar login ou setup
  if ((pathname.startsWith('/login') || pathname.startsWith('/setup')) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/setup'],
};