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
    
    // Se estiver usando PostgreSQL, buscar da tabela custom_advertorials
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      const result = await client.query('SELECT id, name, data FROM custom_advertorials WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return NextResponse.json({ message: 'Advertorial não encontrado' }, { status: 404 });
      }
      
      const row = result.rows[0];
      const advertorial: CustomAdvertorial = {
        id: row.id,
        name: row.name,
        ...row.data
      };
      
      return NextResponse.json(advertorial);
    }
    
    // Fallback para lowdb (não deve acontecer)
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
    
    // Se estiver usando PostgreSQL, manipular a tabela custom_advertorials
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      
      // Verificar se o advertorial existe
      const existingAdvertorial = await client.query('SELECT id FROM custom_advertorials WHERE id = $1', [id]);
      if (existingAdvertorial.rows.length === 0) {
        return NextResponse.json({ message: 'Advertorial não encontrado' }, { status: 404 });
      }
      
      // Deletar o advertorial
      await client.query('DELETE FROM custom_advertorials WHERE id = $1', [id]);
      
      // Remover qualquer rota que aponte para este content_id
      await client.query('DELETE FROM routes WHERE content_id = $1', [id]);
      
      return NextResponse.json({ message: 'Advertorial excluído com sucesso' });
    }
    
    // Fallback para lowdb (não deve acontecer)
    const initialLength = db.data.customAdvertorials.length;
    
    db.data.customAdvertorials = db.data.customAdvertorials.filter((a: CustomAdvertorial) => a.id !== id);

    if (db.data.customAdvertorials.length === initialLength) {
      return NextResponse.json({ message: 'Advertorial não encontrado' }, { status: 404 });
    }

    // Also remove any route mapping pointing to this content ID
    db.data.routes = db.data.routes.filter(r => r.contentId !== id);

    await db.write();

    return NextResponse.json({ message: 'Advertorial excluído com sucesso' });
  } catch (error) {
    console.error('Failed to delete custom advertorial:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}