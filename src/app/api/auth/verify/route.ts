import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

// Senha padrão já hasheada: 84740949
const DEFAULT_PASSWORD_HASH = '$2a$10$N.zq.r3/k3GqGZd1J7A2jOhYv5i8w6J2J.LK/Pxv9Jz8Q/8q.G.w.K';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { password } = await req.json() as { password: string };
    
    if (!password) {
      return NextResponse.json({ message: 'Senha é obrigatória' }, { status: 400 });
    }

    // Tenta verificar a senha padrão primeiro
    const isDefaultCorrect = await bcrypt.compare(password, DEFAULT_PASSWORD_HASH);
    
    if (isDefaultCorrect) {
      // Cria um cookie de sessão especial para modo offline
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login bem-sucedido (modo offline)',
        offlineMode: true 
      });
      
      response.cookies.set('auth_session', 'offline_mode', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return response;
    }

    // Se não for a senha padrão, tenta com o banco
    try {
      const { getDb } = await import('@/lib/database');
      const client = await getDb();
      
      const result = await client.query('SELECT value FROM settings WHERE key = $1', ['auth']);
      let storedHash = '';
      
      if (result.rows.length > 0) {
        const authData = result.rows[0].value;
        if (authData && typeof authData === 'object') {
          storedHash = authData.passwordHash || '';
        }
      }

      const isMatch = await bcrypt.compare(password, storedHash);
      
      if (!isMatch) {
        return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 });
      }

      const response = NextResponse.json({ 
        success: true, 
        message: 'Login bem-sucedido (modo online)',
        offlineMode: false 
      });

      response.cookies.set('auth_session', 'online_mode', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      return response;

    } catch (dbError) {
      console.error('Erro ao acessar banco para autenticação:', dbError);
      
      // Se o banco falhar, não permite login nem mesmo com senha correta
      return NextResponse.json({ 
        message: 'Banco de dados indisponível. Use a senha padrão ou configure o banco primeiro.' 
      }, { status: 503 });
    }

  } catch (error) {
    console.error('Login failed:', error);
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}