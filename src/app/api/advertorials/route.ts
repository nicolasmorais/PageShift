import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    const db = await getDb();
    const advertorials = db.data.customAdvertorials;
    return NextResponse.json(advertorials);
  } catch (error) {
    console.error('Failed to get advertorials:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, content } = await req.json();
    if (!name || !content) {
      return NextResponse.json({ message: 'Nome e conteúdo são obrigatórios' }, { status: 400 });
    }

    const db = await getDb();
    
    const newAdvertorial = {
      id: randomUUID(),
      name,
      content,
    };

    db.data.customAdvertorials.push(newAdvertorial);
    await db.write();

    return NextResponse.json({ message: 'Advertorial salvo com sucesso', advertorial: newAdvertorial }, { status: 201 });
  } catch (error) {
    console.error('Failed to save advertorial:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}