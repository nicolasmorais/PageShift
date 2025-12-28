import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { password } = await req.json() as { password: string };
    
    if (!password) {
      return NextResponse.json({ message: 'Senha é obrigatória' }, { status: 400 });
    }
    
    // Gera hash para a senha fornecida
    const hash = await bcrypt.hash(password, 10);
    
    return NextResponse.json({ 
      success: true,
      password: password,
      hash: hash,
      message: 'Hash gerado com sucesso!'
    });
    
  } catch (error) {
    console.error('Error generating hash:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erro ao gerar hash' 
    }, { status: 500 });
  }
}