import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import bcrypt from 'bcrypt';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { password } = await req.json() as { password: string };
    
    if (!password || password.length < 8) {
      return NextResponse.json({ 
        message: 'Senha deve ter pelo menos 8 caracteres' 
      }, { status: 400 });
    }

    const db = await getDb();
    
    // Verifica se já existe uma senha configurada
    let hasExistingPassword = false;
    
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      const result = await client.query('SELECT value FROM settings WHERE key = $1', ['auth']);
      
      if (result.rows.length > 0) {
        const authData = result.rows[0].value;
        hasExistingPassword = !!authData.passwordHash;
      }
    } else {
      hasExistingPassword = !!db.data.auth.passwordHash;
    }
    
    if (hasExistingPassword) {
      return NextResponse.json({ 
        message: 'Senha já configurada. Use a página de login.' 
      }, { status: 400 });
    }

    // Cria o hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 12); // Salt rounds aumentado para 12
    
    // Salva no banco
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      await client.query(
        'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
        ['auth', JSON.stringify({ passwordHash: hashedPassword, isSetup: true })]
      );
    } else {
      db.data.auth.passwordHash = hashedPassword;
      db.data.auth.isSetup = true;
      await db.write();
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Senha configurada com sucesso!' 
    });

  } catch (error) {
    console.error('Setup failed:', error);
    return NextResponse.json({ 
      message: 'Erro ao configurar senha' 
    }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const db = await getDb();
    let isSetup = false;
    
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      const result = await client.query('SELECT value FROM settings WHERE key = $1', ['auth']);
      
      if (result.rows.length > 0) {
        const authData = result.rows[0].value;
        isSetup = authData.isSetup || !!authData.passwordHash;
      }
    } else {
      isSetup = db.data.auth.isSetup || !!db.data.auth.passwordHash;
    }
    
    return NextResponse.json({ isSetup });
  } catch (error) {
    return NextResponse.json({ isSetup: false });
  }
}