import { NextResponse, NextRequest } from 'next/server';
import { getDb } from '@/lib/database';
import { CustomAdvertorial } from '@/lib/advertorial-types';
import { v4 as uuidv4 } from 'uuid';

// GET: Fetch all custom advertorials
export async function GET(): Promise<NextResponse> {
  try {
    const db = await getDb();
    
    // Se estiver usando PostgreSQL, buscar da tabela custom_advertorials
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      const result = await client.query('SELECT id, name, data FROM custom_advertorials ORDER BY name');
      
      // Transformar os dados para o formato esperado
      const advertorials: CustomAdvertorial[] = result.rows.map(row => ({
        id: row.id,
        name: row.name,
        ...row.data
      }));
      
      return NextResponse.json(advertorials);
    }
    
    // Fallback para lowdb (não deve acontecer)
    const advertorials: CustomAdvertorial[] = db.data.customAdvertorials;
    return NextResponse.json(advertorials);
  } catch (error) {
    console.error('Failed to get custom advertorials:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}

// POST: Create or Update a custom advertorial
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const payload: CustomAdvertorial = await req.json();
    const db = await getDb();

    if (!payload.name || !payload.header || !payload.blocks) {
      return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 });
    }

    // Se estiver usando PostgreSQL, manipular a tabela custom_advertorials
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      
      if (payload.id) {
        // Update existing advertorial
        const { id, ...data } = payload;
        await client.query(
          'UPDATE custom_advertorials SET name = $1, data = $2 WHERE id = $3',
          [payload.name, JSON.stringify(data), payload.id]
        );
        
        return NextResponse.json({ message: 'Advertorial atualizado com sucesso', advertorial: payload });
      } else {
        // Create new advertorial
        const newId = uuidv4();
        const { id, ...data } = payload;
        
        await client.query(
          'INSERT INTO custom_advertorials (id, name, data) VALUES ($1, $2, $3)',
          [newId, payload.name, JSON.stringify(data)]
        );
        
        const newAdvertorial = { ...payload, id: newId };
        return NextResponse.json({ message: 'Advertorial criado com sucesso', advertorial: newAdvertorial });
      }
    }
    
    // Fallback para lowdb (não deve acontecer)
    let advertorial: CustomAdvertorial;
    
    if (payload.id) {
      // Update existing advertorial
      const index = db.data.customAdvertorials.findIndex((a: CustomAdvertorial) => a.id === payload.id);
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