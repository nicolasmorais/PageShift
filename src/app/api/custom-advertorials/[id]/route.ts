import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { CustomAdvertorial } from '@/lib/advertorial-types'; // NEW: Import type from here

interface RouteContext {
  params: { id: string };
}

// GET: Fetch a single custom advertorial by ID
export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const db = await getDb();
    // Nota: No modo PostgreSQL, db.data não existe. Precisamos migrar esta lógica.
    // Por enquanto, mantemos a compatibilidade com lowdb.
    const advertorial = (await db).data.customAdvertorials.find(a => a.id === params.id);

    if (!advertorial) {
      return NextResponse.json({ message: 'Advertorial não encontrado' }, { status: 404 });
    }

    return NextResponse.json(advertorial);
  } catch (error) {
    console.error('Failed to get custom advertorial:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}

// DELETE: Delete a custom advertorial by ID
export async function DELETE(request: Request, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const db = await getDb();
    
    // Nota: No modo PostgreSQL, db.data não existe. Precisamos migrar esta lógica.
    // Por enquanto, mantemos a compatibilidade com lowdb.
    const initialLength = (await db).data.customAdvertorials.length;
    
    (await db).data.customAdvertorials = (await db).data.customAdvertorials.filter(a => a.id !== params.id);

    if ((await db).data.customAdvertorials.length === initialLength) {
      return NextResponse.json({ message: 'Advertorial não encontrado' }, { status: 404 });
    }

    // Also remove any route mapping pointing to this content ID
    (await db).data.routes = (await db).data.routes.filter(r => r.contentId !== params.id);

    await (await db).write();

    return NextResponse.json({ message: 'Advertorial excluído com sucesso' });
  } catch (error) {
    console.error('Failed to delete custom advertorial:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}