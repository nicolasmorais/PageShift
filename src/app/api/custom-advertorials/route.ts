import { NextResponse } from 'next/server';
import { getDb, CustomAdvertorial } from '@/lib/database';
import { v4 as uuidv4 } from 'uuid';

// GET: Fetch all custom advertorials
export async function GET() {
  try {
    const db = await getDb();
    const advertorials = db.data.customAdvertorials;
    return NextResponse.json(advertorials);
  } catch (error) {
    console.error('Failed to get custom advertorials:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}

// POST: Create or Update a custom advertorial
export async function POST(req: Request) {
  try {
    const payload: CustomAdvertorial = await req.json();
    const db = await getDb();

    if (!payload.name || !payload.header || !payload.blocks) {
      return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 });
    }

    let advertorial: CustomAdvertorial;
    
    if (payload.id) {
      // Update existing advertorial
      const index = db.data.customAdvertorials.findIndex(a => a.id === payload.id);
      if (index === -1) {
        return NextResponse.json({ message: 'Advertorial não encontrado' }, { status: 404 });
      }
      db.data.customAdvertorials[index] = payload;
      advertorial = payload;
    } else {
      // Create new advertorial
      const newId = uuidv4();
      advertorial = { ...payload, id: newId };
      db.data.customAdvertorials.push(advertorial);
    }

    await db.write();

    return NextResponse.json({ message: 'Advertorial salvo com sucesso', advertorial });
  } catch (error) {
    console.error('Failed to save custom advertorial:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}