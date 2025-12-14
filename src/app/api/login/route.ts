import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

// Define a chave do cookie de sessão e o tempo de expiração (1 dia)
const SESSION_COOKIE_NAME = 'auth_session';
const SESSION_EXPIRY_SECONDS = 60 * 60 * 24; // 24 hours

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { password } = await req.json() as { password: string };
    
    if (!password) {
      return NextResponse.json({ message: 'Senha é obrigatória' }, { status: 400 });
    }

    const db = await getDb();
    
    // Se estiver usando PostgreSQL, buscar da tabela settings
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      const result = await client.query('SELECT value FROM settings WHERE key = $1', ['auth']);
      
      let storedHash = '';
      if (result.rows.length > 0) {
        const authData = result.rows[0].value;
        storedHash = authData.passwordHash || '';
      }
      
      if (!storedHash) {
        // Se não houver hash armazenado, inicializa com a senha padrão (84740949)
        const defaultPassword = '84740949';
        const newHash = await bcrypt.hash(defaultPassword, 10);
        
        await client.query(
          'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
          ['auth', JSON.stringify({ passwordHash: newHash })]
        );
        
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
    } else {
      // Fallback para lowdb (não deve acontecer)
      const storedHash = db.data.auth.passwordHash;

      if (!storedHash) {
        // Se não houver hash armazenado, inicializa com a senha padrão (84740949)
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
    }

    // Se a senha estiver correta, define o cookie de sessão
    (await cookies()).set(SESSION_COOKIE_NAME, 'true', {
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