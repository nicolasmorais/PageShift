import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(): Promise<NextResponse> {
  try {
    // Remove o cookie de sessão
    (await cookies()).delete('auth_session');
    
    return NextResponse.json({ success: true, message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error('Logout failed:', error);
    return NextResponse.json({ message: 'Erro ao fazer logout' }, { status: 500 });
  }
}