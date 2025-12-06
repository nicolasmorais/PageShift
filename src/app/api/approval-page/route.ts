import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';

export async function GET() {
  try {
    const db = await getDb();
    const content = db.data.approvalPageContent;
    return NextResponse.json(content);
  } catch (error) {
    console.error('Failed to get approval page content:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const newContent = await req.json();
    if (!newContent) {
      return NextResponse.json({ message: 'O conteúdo é obrigatório' }, { status: 400 });
    }

    const db = await getDb();
    db.data.approvalPageContent = newContent;
    await db.write();

    return NextResponse.json({ message: 'Conteúdo atualizado com sucesso', content: db.data.approvalPageContent });
  } catch (error) {
    console.error('Failed to update approval page content:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}