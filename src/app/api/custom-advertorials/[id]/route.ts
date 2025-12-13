import { NextResponse, NextRequest } from 'next/server';
import { getDb } from '@/lib/database';
import { CustomAdvertorial } from '@/lib/advertorial-types';

// GET: Fetch a single custom advertorial by ID
export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const db = await getDb();
    // Explicitly typing the parameter in find
    const advertorial = db.data.customAdvertorials.find((a: CustomAdvertorial) => a.id === id);

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
export async function DELETE(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const db = await getDb();
    
    const initialLength = db.data.customAdvertorials.length;
    
    // Explicitly typing the parameter in filter
    db.data.customAdvertorials = db.data.customAdvertorials.filter((a: CustomAdvertorial) => a.id !== id);

    if (db.data.customAdvertorials.length === initialLength) {
      return NextResponse.json({ message: 'Advertorial não encontrado' }, { status: 404 });
    }

    // Also remove any route mapping pointing to this content ID
    // Explicitly typing the parameter in filter
    db.data.routes = db.data.routes.filter(r => r.contentId !== id);

    await db.write();

    return NextResponse.json({ message: 'Advertorial excluído com sucesso' });
  } catch (error) {
    console.error('Failed to delete custom advertorial:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}