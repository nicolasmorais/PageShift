import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// Vou gerar um novo hash para a senha 84740949
const DEFAULT_PASSWORD_HASH = '$2b$10$B8R1YmFyXlZo5bB1l8HvejK4YjZqQyH8tUk3cXoR8tL9qN4tIe';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { password } = await req.json() as { password: string };
    
    if (!password) {
      return NextResponse.json({ message: 'Senha é obrigatória' }, { status: 400 });
    }

    // Aceita apenas a senha padrão
    const isCorrect = password === '84740949';
    
    if (isCorrect) {
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login bem-sucedido',
        offlineMode: true 
      });
      
      response.cookies.set('auth_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
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