import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { CustomAdvertorial } from '@/lib/advertorial-types'; // NEW: Import type from here

interface RouteContext {
  params: { id: string };
}

// GET: Fetch a single custom advertorial by ID
export async function GET(request: Request, context: RouteContext) {
  try {
    const { params } = context;
    const db = await getDb();
    const advertorial = db.data.customAdvertorials.find(a => a.id === params.id);

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
export async function DELETE(request: Request, context: RouteContext) {
  try {
    const { params } = context;
    const db = await getDb();
    const initialLength = db.data.customAdvertorials.length;
    
    db.data.customAdvertorials = db.data.customAdvertorials.filter(a => a.id !== params.id);

    if (db.data.customAdvertorials.length === initialLength) {
      return NextResponse.json({ message: 'Advertorial não encontrado' }, { status: 404 });
    }

    // Also remove any route mapping pointing to this content ID
    db.data.routes = db.data.routes.filter(r => r.contentId !== params.id);

    await db.write();

    return NextResponse.json({ message: 'Advertorial excluído com sucesso' });
  } catch (error) {
    console.error('Failed to delete custom advertorial:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}