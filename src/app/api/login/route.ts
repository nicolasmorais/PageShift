import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'auth_session';
const SESSION_EXPIRY_SECONDS = 60 * 60 * 24; // 24 hours

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { password } = await req.json() as { password: string };
    
    if (!password) {
      return NextResponse.json({ message: 'Senha é obrigatória' }, { status: 400 });
    }

    const db = await getDb();
    let storedHash = '';
    
    // Se estiver usando PostgreSQL, buscar da tabela settings
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      const result = await client.query('SELECT value FROM settings WHERE key = $1', ['auth']);
      
      if (result.rows.length > 0) {
        const authData = result.rows[0].value;
        storedHash = authData.passwordHash || '';
      }
    } else {
      // Fallback para lowdb
      storedHash = db.data.auth.passwordHash;
    }

    // Se não houver hash, redireciona para setup
    if (!storedHash) {
      return NextResponse.json({ 
        message: 'Sistema não configurado. Configure uma senha primeiro.',
        needsSetup: true 
      }, { status: 422 });
    }

    // Verifica a senha
    const isMatch = await bcrypt.compare(password, storedHash);
    if (!isMatch) {
      return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
    }

    // Define o cookie de sessão
    (await cookies()).set(SESSION_COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_EXPIRY_SECONDS,
      path: '/',
      sameSite: 'lax'
    });

    return NextResponse.json({ success: true, message: 'Login bem-sucedido' });

  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}