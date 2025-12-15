import { NextResponse, NextRequest } from 'next/server';
import { getDb } from '@/lib/database';
import { CustomAdvertorial } from '@/lib/advertorial-types';
import { Client } from 'pg';
import { validate as isUUID } from 'uuid';

// GET: Fetch a single custom advertorial by ID
export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    // Validação de segurança: só busca por UUIDs válidos para evitar erros de SQL
    if (!isUUID(id)) {
      return NextResponse.json({ message: 'ID de advertorial inválido. Deve ser um UUID.' }, { status: 400 });
    }

    const client: Client = await getDb();
    
    // Buscar da tabela custom_advertorials
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

    // Validação de segurança: só deleta por UUIDs válidos
    if (!isUUID(id)) {
      return NextResponse.json({ message: 'ID de advertorial inválido. Deve ser um UUID.' }, { status: 400 });
    }

    const client: Client = await getDb();
    
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
  } catch (error) {
    console.error('Failed to delete custom advertorial:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}