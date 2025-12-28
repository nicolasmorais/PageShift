import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// MODO TEMPORÁRIO - SEM HASH para teste
const DEFAULT_PASSWORD = '84740949';
const USE_PLAIN_PASSWORD = true; // Mude para false quando quiser voltar ao hash

// Hash para quando usar bcrypt
const DEFAULT_PASSWORD_HASH = '$2b$10$k2z3Z5M3K7W8N0V3bV/CYr1v5c0N9x2l3K8n5oW7uR4tE3qFyD2e';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { password } = await req.json() as { password: string };
    
    if (!password) {
      return NextResponse.json({ message: 'Senha é obrigatória' }, { status: 400 });
    }

    // MODO TEMPORÁRIO: comparação direta
    let isCorrect = false;
    if (USE_PLAIN_PASSWORD) {
      isCorrect = password === DEFAULT_PASSWORD;
      console.log('MODO TEMPORÁRIO: comparação direta - OK');
    } else {
      isCorrect = await bcrypt.compare(password, DEFAULT_PASSWORD_HASH);
      console.log('MODO BCRYPT: comparação com hash');
    }
    
    if (isCorrect) {
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login bem-sucedido',
        offlineMode: false 
      });
      
      response.cookies.set('auth_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });

  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}