import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

// Define a chave do cookie de sessão e o tempo de expiração (1 dia)
const SESSION_COOKIE_NAME = 'auth_session';
const SESSION_EXPIRY_SECONDS = 60 * 60 * 24; // 24 hours

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    
    if (!password) {
      return NextResponse.json({ message: 'Senha é obrigatória' }, { status: 400 });
    }

    const db = await getDb();
    const storedHash = db.data.auth.passwordHash;

    if (!storedHash) {
        // Se não houver hash armazenado, inicializa com a senha padrão (84740949)
        // Isso só deve acontecer na primeira execução.
        const defaultPassword = '84740949';
        const newHash = await bcrypt.hash(defaultPassword, 10);
        db.data.auth.passwordHash = newHash;
        await db.write();
        
        // Tenta autenticar com a senha padrão
        const isMatch = await bcrypt.compare(password, newHash);
        if (!isMatch) {
            return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
        }
    } else {
        // Compara com o hash existente
        const isMatch = await bcrypt.compare(password, storedHash);
        if (!isMatch) {
            return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
        }
    }

    // Se a senha estiver correta, define o cookie de sessão
    cookies().set(SESSION_COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_EXPIRY_SECONDS,
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'Login bem-sucedido' });

  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}