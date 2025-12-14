import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { RouteMapping } from '@/lib/advertorial-types';

export async function GET(): Promise<NextResponse> {
  try {
    const db = await getDb();
    
    // Se estiver usando PostgreSQL, buscar da tabela routes
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      const result = await client.query('SELECT path, name, content_id as "contentId" FROM routes ORDER BY path');
      
      return NextResponse.json(result.rows);
    }
    
    // Fallback para lowdb (não deve acontecer)
    const routes: RouteMapping[] = db.data.routes;
    return NextResponse.json(routes);
  } catch (error) {
    console.error('Failed to get routes:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { path, contentId, name } = await req.json() as { path: string, contentId: string, name?: string };
    if (!path || !contentId) {
      return NextResponse.json({ message: 'Os campos path e contentId são obrigatórios' }, { status: 400 });
    }

    const db = await getDb();
    
    // Se estiver usando PostgreSQL, manipular a tabela routes
    if (db.constructor.name === 'PgDbSimulator') {
      const client = (db as any).client;
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      
      // Verificar se a rota já existe
      const existingRoute = await client.query('SELECT * FROM routes WHERE path = $1', [normalizedPath]);
      
      if (existingRoute.rows.length > 0) {
        // Atualizar rota existente
        await client.query(
          'UPDATE routes SET name = $1, content_id = $2 WHERE path = $3',
          [name || `Rota Personalizada: ${normalizedPath}`, contentId, normalizedPath]
        );
        
        const updatedRoute = await client.query('SELECT path, name, content_id as "contentId" FROM routes WHERE path = $1', [normalizedPath]);
        return NextResponse.json({ message: 'Rota atualizada com sucesso', route: updatedRoute.rows[0] });
      } else {
        // Criar nova rota
        await client.query(
          'INSERT INTO routes (path, name, content_id) VALUES ($1, $2, $3)',
          [normalizedPath, name || `Rota Personalizada: ${normalizedPath}`, contentId]
        );
        
        const newRoute = await client.query('SELECT path, name, content_id as "contentId" FROM routes WHERE path = $1', [normalizedPath]);
        return NextResponse.json({ message: 'Rota criada com sucesso', route: newRoute.rows[0] }, { status: 201 });
      }
    }
    
    // Fallback para lowdb (não deve acontecer)
    const dbData = db.data as any;
    const routeIndex = dbData.routes.findIndex((r: RouteMapping) => r.path === path);

    if (routeIndex !== -1) {
      // Rota existente: Atualiza contentId (e nome, se fornecido)
      dbData.routes[routeIndex].contentId = contentId;
      if (name) {
        dbData.routes[routeIndex].name = name;
      }
      await db.write();
      return NextResponse.json({ message: 'Rota atualizada com sucesso', route: db.data.routes[routeIndex] });
    } else {
      // Nova rota: Cria uma nova entrada
      const newRoute: RouteMapping = {
        path: path.startsWith('/') ? path : `/${path}`, // Garante que o path comece com /
        contentId,
        name: name || `Rota Personalizada: ${path}`,
      };
      dbData.routes.push(newRoute);
      await db.write();
      return NextResponse.json({ message: 'Rota criada com sucesso', route: newRoute }, { status: 201 });
    }
  } catch (error) {
    console.error('Failed to save route:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}