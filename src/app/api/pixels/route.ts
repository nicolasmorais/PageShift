import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { PixelConfig } from '@/lib/advertorial-types';

// GET: Fetch pixel configuration
export async function GET() {
  try {
    const db = await getDb();
    const config = db.data.pixelConfig;
    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to get pixel config:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}

// POST: Update pixel configuration
export async function POST(req: Request) {
  try {
    const newConfig: PixelConfig = await req.json();
    
    if (!newConfig) {
      return NextResponse.json({ message: 'Configuração é obrigatória' }, { status: 400 });
    }

    const db = await getDb();
    db.data.pixelConfig = newConfig;
    await db.write();

    return NextResponse.json({ message: 'Configuração de Pixel atualizada com sucesso', config: db.data.pixelConfig });
  } catch (error) {
    console.error('Failed to update pixel config:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}